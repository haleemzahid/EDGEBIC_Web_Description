import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import { SystemFingerprintGenerator } from '@/lib/license/system-fingerprint';

const activateLicenseSchema = z.object({
  licenseKey: z.string().min(1),
  email: z.string().email(),
  processorId: z.string().min(1),
  systemInfo: z.string().min(1),
  deviceName: z.string().max(255).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { licenseKey, email, processorId, deviceName } =
      activateLicenseSchema.parse(body);

    const normalizedEmail = email.toLowerCase();
    const clientIP =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    // Device identity. The fingerprint (derived from request headers) is the
    // seat key — the desktop app MUST send stable, machine-distinguishing
    // headers (esp. x-hardware-info) so each physical machine yields a distinct
    // fingerprint. See docs/licensing/LICENSE-API-CONTRACT.md.
    const { fingerprint: systemFingerprint } =
      SystemFingerprintGenerator.generateFingerprint(request);

    const licenseKeyHash = LicenseKeyGenerator.hashLicenseKey(licenseKey);

    const purchase = await prisma.purchase.findUnique({
      where: { licenseKeyHash }
    });

    if (!purchase) {
      await logActivationAttempt('failed', 'License key not found in the system', {
        email: normalizedEmail,
        systemFingerprint,
        processorId,
        clientIP,
        userAgent
      });
      return NextResponse.json({ error: 'Invalid license key' }, { status: 404 });
    }

    // Revoked licenses can never activate, on any device.
    if (purchase.licenseStatus === 'revoked') {
      await logActivationAttempt('blocked', 'License is revoked', {
        purchaseId: purchase.id,
        email: normalizedEmail,
        systemFingerprint,
        processorId,
        clientIP,
        userAgent
      });
      return NextResponse.json(
        { error: 'License has been revoked' },
        { status: 403 }
      );
    }

    // Seat-based binding. A license may activate on up to `purchase.seats`
    // distinct machines. The license key is the shared secret: any email may
    // activate as long as a seat is free, and is auto-registered to the
    // operator roster ("auto include all users"). The seat count is the limit,
    // not the email. This whole block is transactional so two machines racing
    // for the last seat can't both win.
    const now = new Date();
    const seatResult = await prisma.$transaction(async (tx) => {
      const existingSeat = await tx.licenseSeat.findUnique({
        where: {
          purchaseId_systemFingerprint: {
            purchaseId: purchase.id,
            systemFingerprint
          }
        }
      });

      if (existingSeat) {
        // Reclaiming a released seat consumes capacity again — re-check.
        if (existingSeat.status !== 'active') {
          const activeCount = await tx.licenseSeat.count({
            where: { purchaseId: purchase.id, status: 'active' }
          });
          if (activeCount >= purchase.seats) {
            return { ok: false as const, reason: 'full' as const };
          }
        }
        await tx.licenseSeat.update({
          where: { id: existingSeat.id },
          data: {
            status: 'active',
            email: normalizedEmail,
            processorId,
            deviceName: deviceName ?? existingSeat.deviceName,
            lastSeenAt: now,
            releasedAt: null
          }
        });
        return {
          ok: true as const,
          reactivated: existingSeat.status === 'active'
        };
      }

      const activeCount = await tx.licenseSeat.count({
        where: { purchaseId: purchase.id, status: 'active' }
      });
      if (activeCount >= purchase.seats) {
        return { ok: false as const, reason: 'full' as const };
      }

      await tx.licenseSeat.create({
        data: {
          purchaseId: purchase.id,
          email: normalizedEmail,
          systemFingerprint,
          processorId,
          deviceName,
          status: 'active',
          firstActivatedAt: now,
          lastSeenAt: now
        }
      });
      return { ok: true as const, reactivated: false };
    });

    if (!seatResult.ok) {
      await logActivationAttempt(
        'blocked',
        `All ${purchase.seats} seats are in use`,
        {
          purchaseId: purchase.id,
          email: normalizedEmail,
          systemFingerprint,
          processorId,
          clientIP,
          userAgent
        }
      );
      return NextResponse.json(
        {
          error: `License seat limit reached. All ${purchase.seats} seats are in use. Release a seat or increase the seat count.`,
          seats: purchase.seats
        },
        { status: 409 }
      );
    }

    // Register the operator on the roster (used by password-reset + shows who
    // is on each license). Idempotent on (purchaseId, email).
    await prisma.licenseUser.upsert({
      where: {
        purchaseId_email: { purchaseId: purchase.id, email: normalizedEmail }
      },
      update: { lastSeenAt: now },
      create: { purchaseId: purchase.id, email: normalizedEmail }
    });

    // Keep the legacy columns as "most recently activated device" for display.
    const updatedPurchase = await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        licenseStatus: 'active',
        activatedAt: purchase.activatedAt ?? now,
        activatedEmail: normalizedEmail,
        systemFingerprint,
        processorId,
        activationAttempts: purchase.activationAttempts + 1
      }
    });

    const seatsUsed = await prisma.licenseSeat.count({
      where: { purchaseId: purchase.id, status: 'active' }
    });

    await logActivationAttempt(
      'success',
      seatResult.reactivated
        ? 'Reactivation on existing seat'
        : 'License activated on new seat',
      {
        purchaseId: purchase.id,
        email: normalizedEmail,
        systemFingerprint,
        processorId,
        clientIP,
        userAgent
      }
    );

    return NextResponse.json({
      licenseKey,
      email: normalizedEmail,
      status: updatedPurchase.licenseStatus,
      activatedAt: updatedPurchase.activatedAt,
      expiresAt: updatedPurchase.expiresAt ?? null,
      systemFingerprint,
      processorId,
      seats: updatedPurchase.seats,
      seatsUsed,
      seatsRemaining: Math.max(0, updatedPurchase.seats - seatsUsed)
    });
  } catch (error) {
    console.error('License activation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to activate license' },
      { status: 500 }
    );
  }
}

async function logActivationAttempt(
  status: string,
  errorMessage: string | null,
  data: {
    purchaseId?: string;
    email: string;
    systemFingerprint: string;
    processorId: string;
    clientIP: string;
    userAgent: string;
  }
) {
  try {
    await prisma.licenseActivation.create({
      data: {
        purchaseId: data.purchaseId || 'unknown',
        email: data.email,
        systemFingerprint: data.systemFingerprint,
        processorId: data.processorId,
        ipAddress: data.clientIP,
        userAgent: data.userAgent,
        status,
        errorMessage
      }
    });
  } catch (error) {
    console.error('Failed to log activation attempt:', error);
  }
}
