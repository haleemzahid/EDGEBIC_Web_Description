import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { verifyAppApiKey } from '@/lib/auth/app-api-key';
import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import { rateLimit } from '@/lib/network/rate-limit';

// Registers a local FCP operator ("seat") under an active license so the
// password-reset flow recognises their email. Called by the desktop app when an
// operator is created / signs in.
//
//   POST { licenseKey, email, name? }
//   Headers: X-Api-Key: <PASSWORD_RESET_API_KEY>
//
// Auth is layered: the shared app key (fail-closed) AND a valid, active license
// key — only a legitimate activated install can register seats, and only under
// its own license.

const registerSchema = z.object({
  licenseKey: z.string().min(1),
  email: z.string().trim().email().max(255),
  name: z.string().trim().max(255).optional()
});

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  // 1. Shared-secret gate (fail-closed when PASSWORD_RESET_API_KEY is unset).
  const auth = verifyAppApiKey(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  // 2. Per-IP rate limit.
  const limiter = rateLimit({ intervalInMs: 60 * 1000 });
  const rl = limiter.check(60, `license-users:${getClientIp(request)}`);
  if (rl.isRateLimited) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { licenseKey, email, name } = registerSchema.parse(body);
    const normalizedEmail = email.toLowerCase();

    // 3. The license key must resolve to an active purchase.
    const licenseKeyHash = LicenseKeyGenerator.hashLicenseKey(licenseKey.trim());
    const purchase = await prisma.purchase.findUnique({
      where: { licenseKeyHash },
      select: { id: true, licenseStatus: true }
    });
    if (!purchase) {
      return NextResponse.json({ error: 'License not found' }, { status: 404 });
    }
    if (purchase.licenseStatus !== 'active') {
      return NextResponse.json({ error: 'License is not active' }, { status: 403 });
    }

    // 4. Upsert the seat (unique on purchase + email). Refresh name/lastSeenAt.
    await prisma.licenseUser.upsert({
      where: { purchaseId_email: { purchaseId: purchase.id, email: normalizedEmail } },
      create: { purchaseId: purchase.id, email: normalizedEmail, name: name ?? null },
      update: { name: name ?? undefined, lastSeenAt: new Date() }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('License user registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register license user' },
      { status: 500 }
    );
  }
}
