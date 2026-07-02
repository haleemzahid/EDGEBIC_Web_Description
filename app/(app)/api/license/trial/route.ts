import crypto from 'crypto';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import { SystemFingerprintGenerator } from '@/lib/license/system-fingerprint';
import { rateLimit } from '@/lib/network/rate-limit';

// Public endpoint (no session) — the desktop app self-issues a time-limited
// TRIAL license for the machine it runs on. No admin approval: the user gets a
// working key instantly, valid for LICENSE_TRIAL_DAYS (default 7). The seat
// (max 1) is consumed on the normal /api/license/activate call, and validate /
// software-latest enforce the expiry, so a trial simply stops working after the
// window — no separate "trial mode" code path in the app.
//
// One trial per identity: a device (fingerprint OR processorId) or email that
// already has a trial gets that SAME trial back (idempotent), even after it has
// expired. That stops anyone from minting a fresh 7-day trial on every launch.
// To keep going they must buy / be issued a full license.

const TRIAL_DAYS = (() => {
  const n = parseInt(process.env.LICENSE_TRIAL_DAYS || '7', 10);
  return Number.isFinite(n) && n > 0 ? n : 7;
})();

const trialSchema = z.object({
  email: z.string().email().max(255),
  customerName: z.string().max(255).optional(),
  company: z.string().max(255).optional(),
  product: z.string().max(255).optional(),
  deviceName: z.string().max(255).optional(),
  processorId: z.string().min(1).max(255),
  // Accepted for parity with /api/license/activate; the fingerprint is derived
  // from request headers, not this field.
  systemInfo: z.string().max(2048).optional()
});

const limiter = rateLimit({ intervalInMs: 60_000 });

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function daysRemaining(expiresAt: Date | null): number {
  if (!expiresAt) return 0;
  return Math.max(
    0,
    Math.ceil((expiresAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000))
  );
}

function trialResponse(purchase: {
  licenseKey: string | null;
  seats: number;
  licenseExpiresAt: Date | null;
  licenseType: string;
}) {
  const expired =
    purchase.licenseExpiresAt !== null &&
    purchase.licenseExpiresAt.getTime() < Date.now();
  return {
    licenseKey: purchase.licenseKey,
    licenseType: purchase.licenseType,
    status: expired ? 'expired' : 'trial',
    expiresAt: purchase.licenseExpiresAt,
    seats: purchase.seats,
    trialDaysRemaining: daysRemaining(purchase.licenseExpiresAt)
  };
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const { isRateLimited } = limiter.check(30, `license-trial:${clientIp}`);
    if (isRateLimited) {
      return NextResponse.json(
        { error: 'Too many requests. Try again shortly.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const input = trialSchema.parse(body);
    const email = input.email.trim().toLowerCase();

    const { fingerprint: systemFingerprint } =
      SystemFingerprintGenerator.generateFingerprint(request);

    // One trial per device or email — hand back the existing one (even expired)
    // so re-running never mints a fresh window. Matched by fingerprint OR
    // processorId (device) OR the requesting email.
    const existingTrial = await prisma.purchase.findFirst({
      where: {
        licenseType: 'trial',
        OR: [
          { systemFingerprint },
          { processorId: input.processorId },
          { email }
        ]
      },
      orderBy: { createdAt: 'desc' },
      select: {
        licenseKey: true,
        seats: true,
        licenseExpiresAt: true,
        licenseType: true
      }
    });
    if (existingTrial) {
      return NextResponse.json(trialResponse(existingTrial));
    }

    // Mint a globally-unique key (lookups go by SHA-256 hash).
    let licenseKey = '';
    let licenseKeyHash = '';
    for (let attempt = 0; attempt < 5; attempt++) {
      const candidate = LicenseKeyGenerator.generateLicenseKey(
        crypto.randomUUID(),
        email
      );
      const candidateHash = LicenseKeyGenerator.hashLicenseKey(candidate);
      const clash = await prisma.purchase.findUnique({
        where: { licenseKeyHash: candidateHash },
        select: { id: true }
      });
      if (!clash) {
        licenseKey = candidate;
        licenseKeyHash = candidateHash;
        break;
      }
    }
    if (!licenseKey) {
      return NextResponse.json(
        { error: 'Could not generate a unique trial key. Try again.' },
        { status: 500 }
      );
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
    const customerName =
      input.customerName?.trim() || email.split('@')[0] || email;

    const purchase = await prisma.purchase.create({
      data: {
        email,
        customerName,
        amount: 0,
        currency: 'usd',
        status: 'completed',
        // Synthesized so the trial doesn't collide with real Stripe sessions
        // (same convention as add-license / approve).
        stripeSessionId: `trial-${crypto.randomUUID()}`,
        licenseKey,
        licenseKeyHash,
        licenseStatus: 'active',
        licenseType: 'trial',
        licenseExpiresAt: expiresAt,
        seats: 1,
        // Bind the trial to the requesting device so a re-issue is recognised
        // even before the seat is activated.
        systemFingerprint,
        processorId: input.processorId
      },
      select: {
        licenseKey: true,
        seats: true,
        licenseExpiresAt: true,
        licenseType: true
      }
    });

    // Register the requester on the roster (used by password-reset + shows who
    // owns the trial). Idempotent on (purchaseId, email) — but this is a brand
    // new purchase, so a plain create is fine. Fetch the id first.
    const created = await prisma.purchase.findUnique({
      where: { licenseKeyHash },
      select: { id: true }
    });
    if (created) {
      await prisma.licenseUser.upsert({
        where: { purchaseId_email: { purchaseId: created.id, email } },
        update: { lastSeenAt: now },
        create: { purchaseId: created.id, email, name: input.customerName }
      });
    }

    return NextResponse.json(trialResponse(purchase));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Trial license error:', error);
    return NextResponse.json(
      { error: 'Failed to issue trial license' },
      { status: 500 }
    );
  }
}

// Look up an existing trial for an email (idempotent re-fetch / status poll).
// Returns the same shape as POST. 404 when this email has no trial.
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams
      .get('email')
      ?.trim()
      .toLowerCase();
    if (!email) {
      return NextResponse.json(
        { error: 'email query parameter is required' },
        { status: 400 }
      );
    }

    const { fingerprint: systemFingerprint } =
      SystemFingerprintGenerator.generateFingerprint(request);

    const trial = await prisma.purchase.findFirst({
      where: {
        licenseType: 'trial',
        OR: [{ email }, { systemFingerprint }]
      },
      orderBy: { createdAt: 'desc' },
      select: {
        licenseKey: true,
        seats: true,
        licenseExpiresAt: true,
        licenseType: true
      }
    });

    if (!trial) {
      return NextResponse.json({ status: 'not_found' }, { status: 404 });
    }

    return NextResponse.json(trialResponse(trial));
  } catch (error) {
    console.error('Trial license lookup error:', error);
    return NextResponse.json(
      { error: 'Failed to look up trial license' },
      { status: 500 }
    );
  }
}
