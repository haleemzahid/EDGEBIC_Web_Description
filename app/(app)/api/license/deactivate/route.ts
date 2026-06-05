import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import { rateLimit } from '@/lib/network/rate-limit';

// Public endpoint (the license key is the credential). The inverse of
// /api/license/activate: releases THIS machine's seat so the slot frees up for
// reuse. The desktop "revoke" action calls this best-effort and clears its
// local license regardless of the outcome (see FCP LicenseService.RevokeAsync),
// so the route is deliberately IDEMPOTENT — deactivating a device that already
// holds no active seat is still a success (the desired end-state is satisfied).
//
// What it does NOT do, on purpose:
//   • It never deletes the LicenseSeat row — the seat is kept for audit and only
//     flipped active -> released (releasedAt stamped), so the device can later
//     re-activate and reclaim the slot.
//   • It never changes purchase.licenseStatus. Seat occupancy is the source of
//     truth (usedSeats = count(active)); a release that drops usage to 0 leaves
//     the license 'active' but seat-empty, exactly as validate already treats it.
//     This also means it can never un-revoke a license.

const deactivateSchema = z.object({
  licenseKey: z.string().min(1),
  // Device identifiers captured at activation. Either may match the seat
  // (mirrors /api/license/validate). Both optional so a client that only kept
  // one of them can still release.
  systemFingerprint: z.string().min(1).optional(),
  processorId: z.string().min(1).optional()
});

const limiter = rateLimit({ intervalInMs: 60_000 });

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const { isRateLimited } = limiter.check(30, `license-deactivate:${clientIp}`);
    if (isRateLimited) {
      return NextResponse.json(
        { error: 'Too many requests. Try again shortly.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { licenseKey, systemFingerprint, processorId } =
      deactivateSchema.parse(body);

    if (!systemFingerprint && !processorId) {
      return NextResponse.json(
        { error: 'systemFingerprint or processorId is required' },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get('user-agent') || '';

    const licenseKeyHash = LicenseKeyGenerator.hashLicenseKey(licenseKey);
    const purchase = await prisma.purchase.findUnique({
      where: { licenseKeyHash }
    });

    if (!purchase) {
      return NextResponse.json({ error: 'Invalid license key' }, { status: 404 });
    }

    // Match this device's seat the same way validate does: fingerprint OR
    // processorId. Build the OR from whichever identifier(s) were supplied.
    const idMatch = [
      ...(systemFingerprint ? [{ systemFingerprint }] : []),
      ...(processorId ? [{ processorId }] : [])
    ];

    const result = await prisma.$transaction(async (tx) => {
      const seat = await tx.licenseSeat.findFirst({
        where: { purchaseId: purchase.id, status: 'active', OR: idMatch }
      });

      if (!seat) {
        // Idempotent no-op: nothing active to release for this device.
        const seatsUsed = await tx.licenseSeat.count({
          where: { purchaseId: purchase.id, status: 'active' }
        });
        return {
          released: false as const,
          seatsUsed,
          email: null as string | null,
          seatFingerprint: null as string | null
        };
      }

      const now = new Date();
      await tx.licenseSeat.update({
        where: { id: seat.id },
        data: { status: 'released', releasedAt: now, lastSeenAt: now }
      });

      const seatsUsed = await tx.licenseSeat.count({
        where: { purchaseId: purchase.id, status: 'active' }
      });

      return {
        released: true as const,
        seatsUsed,
        email: seat.email,
        seatFingerprint: seat.systemFingerprint
      };
    });

    // Audit trail. A distinct status ('deactivated') keeps this out of the
    // success/failed/blocked buckets the admin detail view counts as activations.
    try {
      await prisma.licenseActivation.create({
        data: {
          purchaseId: purchase.id,
          email: result.email ?? purchase.activatedEmail ?? 'unknown',
          systemFingerprint:
            result.seatFingerprint ?? systemFingerprint ?? 'unknown',
          processorId: processorId ?? null,
          ipAddress: clientIp,
          userAgent,
          status: 'deactivated',
          errorMessage: result.released
            ? 'Seat released (deactivate)'
            : 'Deactivate no-op: no active seat for this device'
        }
      });
    } catch (logError) {
      console.error('Failed to log deactivation:', logError);
    }

    return NextResponse.json({
      success: true,
      status: 'released',
      alreadyReleased: !result.released,
      seats: purchase.seats,
      seatsUsed: result.seatsUsed,
      seatsRemaining: Math.max(0, purchase.seats - result.seatsUsed)
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('License deactivation error:', error);
    return NextResponse.json(
      { error: 'Failed to deactivate license' },
      { status: 500 }
    );
  }
}
