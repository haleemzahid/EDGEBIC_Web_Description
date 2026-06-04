import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import { SystemFingerprintGenerator } from '@/lib/license/system-fingerprint';

const activateLicenseSchema = z.object({
  licenseKey: z.string().min(1),
  email: z.string().email(),
  processorId: z.string().min(1),
  systemInfo: z.string().min(1)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { licenseKey, email, processorId, systemInfo } =
      activateLicenseSchema.parse(body);

    const clientIP =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    // Generate system fingerprint
    const { fingerprint: systemFingerprint } =
      SystemFingerprintGenerator.generateFingerprint(request);

    // Hash the license key for lookup
    const licenseKeyHash = LicenseKeyGenerator.hashLicenseKey(licenseKey);

    // Find purchase by license key hash
    const purchase = await prisma.purchase.findUnique({
      where: { licenseKeyHash },
      include: { activations: true }
    });

    if (!purchase) {
      await logActivationAttempt(
        'failed',
        'License key not found in the system',
        {
          licenseKeyHash,
          email,
          systemFingerprint,
          processorId,
          clientIP,
          userAgent
        }
      );
      return NextResponse.json(
        { error: 'Invalid license key' },
        { status: 404 }
      );
    }

    // Verify email matches
    if (purchase.email.toLowerCase() !== email.toLowerCase()) {
      await logActivationAttempt('failed', 'Email mismatch.', {
        purchaseId: purchase.id,
        email,
        systemFingerprint,
        processorId,
        clientIP,
        userAgent
      });
      return NextResponse.json(
        { error: 'Email does not match license' },
        { status: 400 }
      );
    }

    // A license can be `licenseStatus: 'active'` yet never bound to a machine —
    // e.g. issued manually by an admin (actions/inventory/add-license.ts sets
    // 'active' with no systemFingerprint/processorId/activatedAt). "Active"
    // there means "entitled", not "already installed somewhere". Only treat the
    // license as already-activated when it is genuinely bound to a machine;
    // otherwise fall through and bind it to THIS machine below.
    const isBoundToMachine = Boolean(
      purchase.systemFingerprint || purchase.processorId
    );

    if (purchase.licenseStatus === 'active' && isBoundToMachine) {
      // Same machine → idempotent reactivation.
      if (
        purchase.systemFingerprint === systemFingerprint &&
        purchase.processorId === processorId
      ) {
        await logActivationAttempt('success', 'Reactivation on same system', {
          purchaseId: purchase.id,
          email,
          systemFingerprint,
          processorId,
          clientIP,
          userAgent
        });
        return NextResponse.json({
          success: true,
          message: 'License already activated on this system',
          activatedAt: purchase.activatedAt
        });
      }

      // Bound to a different machine → block.
      await logActivationAttempt(
        'blocked',
        'License already active on different system',
        {
          purchaseId: purchase.id,
          email,
          systemFingerprint,
          processorId,
          clientIP,
          userAgent
        }
      );
      return NextResponse.json(
        { error: 'License is already activated on another system' },
        { status: 409 }
      );
    }

    // Check activation attempts
    if (purchase.activationAttempts >= purchase.maxActivationAttempts) {
      await logActivationAttempt(
        'blocked',
        'Maximum activation attempts exceeded',
        {
          purchaseId: purchase.id,
          email,
          systemFingerprint,
          processorId,
          clientIP,
          userAgent
        }
      );
      return NextResponse.json(
        { error: 'Maximum activation attempts exceeded' },
        { status: 429 }
      );
    }

    // Check if license is revoked
    if (purchase.licenseStatus === 'revoked') {
      await logActivationAttempt('blocked', 'License is revoked', {
        purchaseId: purchase.id,
        email,
        systemFingerprint,
        processorId,
        clientIP,
        userAgent
      });
      return NextResponse.json(
        { error: 'License has been fsdf revoked' },
        { status: 403 }
      );
    }

    // Activate license for system
    const now = new Date();
    const updatedPurchase = await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        licenseStatus: 'active',
        activatedAt: now,
        activatedEmail: email,
        systemFingerprint,
        processorId,
        activationAttempts: purchase.activationAttempts + 1
      }
    });

    await logActivationAttempt('success', 'License activated successfully', {
      purchaseId: purchase.id,
      email,
      systemFingerprint,
      processorId,
      clientIP,
      userAgent
    });

    return NextResponse.json({
      licenseKey: licenseKey, // original license key
      email: email,
      status: updatedPurchase.licenseStatus,
      activatedAt: updatedPurchase.activatedAt,
      expiresAt: updatedPurchase.expiresAt ?? null,
      systemFingerprint: updatedPurchase.systemFingerprint,
      processorId: updatedPurchase.processorId
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
    licenseKeyHash?: string;
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
