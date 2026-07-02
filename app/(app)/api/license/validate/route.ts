import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import { signLicenseProof } from '@/lib/license/license-signing';

const validateLicenseSchema = z.object({
  licenseKey: z.string().min(1),
  systemFingerprint: z.string().min(1),
  processorId: z.string().min(1)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { licenseKey, systemFingerprint, processorId } =
      validateLicenseSchema.parse(body);

    // Hash the license key for lookup
    const licenseKeyHash = LicenseKeyGenerator.hashLicenseKey(licenseKey);

    // Find purchase by license key hash
    const purchase = await prisma.purchase.findUnique({
      where: { licenseKeyHash }
    });

    if (!purchase) {
      return NextResponse.json(
        { valid: false, error: 'License not found' },
        { status: 404 }
      );
    }

    // Check if license is active
    if (purchase.licenseStatus !== 'active') {
      return NextResponse.json(
        { valid: false, error: 'License is not active' },
        { status: 400 }
      );
    }

    // Expiry gate — a trial (or any dated license) stops validating after its
    // window closes. NULL licenseExpiresAt = perpetual, so this never affects
    // full licenses. Returned with `expiresAt` so the client can message the
    // user ("trial ended"). 403: this device must stop running.
    if (
      purchase.licenseExpiresAt &&
      purchase.licenseExpiresAt.getTime() < Date.now()
    ) {
      return NextResponse.json(
        {
          valid: false,
          error: 'License expired',
          licenseType: purchase.licenseType,
          expiresAt: purchase.licenseExpiresAt
        },
        { status: 403 }
      );
    }

    // Seat-based validation: the calling device is valid if it holds an active
    // seat on this license (matched by fingerprint OR processor id). This
    // replaces the old single-machine check so every seated device on a
    // multi-seat key validates — not just the most recently activated one.
    // Backfilled seats keep legacy single-seat licenses working unchanged.
    const seat = await prisma.licenseSeat.findFirst({
      where: {
        purchaseId: purchase.id,
        status: 'active',
        OR: [{ systemFingerprint }, { processorId }]
      },
      select: { id: true }
    });

    if (!seat) {
      return NextResponse.json(
        { valid: false, error: 'System validation failed' },
        { status: 403 }
      );
    }

    // Tamper-proof proof of validity. The desktop verifies this Ed25519
    // signature with its embedded public key, so a fake/MITM license server
    // can't forge a "valid" response (it has no private key). Omitted only when
    // signing is unconfigured (local dev) — see lib/license/license-signing.ts.
    const proof = signLicenseProof({
      valid: true,
      purchaseId: purchase.id,
      licenseKeyHash,
      licenseType: purchase.licenseType,
      expiresAt: purchase.licenseExpiresAt
        ? purchase.licenseExpiresAt.toISOString()
        : null
    });

    return NextResponse.json({
      valid: true,
      purchaseId: purchase.id,
      activatedAt: purchase.activatedAt,
      customerName: purchase.customerName,
      seats: purchase.seats,
      licenseType: purchase.licenseType,
      expiresAt: purchase.licenseExpiresAt,
      ...(proof ? { proof } : {})
    });
  } catch (error) {
    console.error('License validation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to validate license' },
      { status: 500 }
    );
  }
}
