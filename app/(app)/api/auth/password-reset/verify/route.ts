import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { verifyAppApiKey } from '@/lib/auth/app-api-key';
import { verifyPasswordResetCode } from '@/lib/auth/password-reset-code';
import { prisma } from '@/lib/db/prisma';
import { rateLimit } from '@/lib/network/rate-limit';
import { verifyPasswordResetCodeSchema } from '@/schemas/auth/verify-password-reset-code-schema';

// Step 2 of the desktop-app forgot-password flow.
//   POST { email, code }  ->  verifies the code online and, on success, burns
//                             it (single-use). The desktop app then lets the
//                             user set a new password locally.
//
// The code is checked against the stored HMAC with a timing-safe compare.
// Wrong guesses increment an attempt counter and the code locks after
// maxAttempts, so an online brute-force of the 1,000,000-code space is capped.

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

  const clientIp = getClientIp(request);

  // 2. Per-IP rate limit (in-memory).
  const limiter = rateLimit({ intervalInMs: 60 * 1000 });
  const rl = limiter.check(20, `pw-reset-verify:${clientIp}`);
  if (rl.isRateLimited) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email, code } = verifyPasswordResetCodeSchema.parse(body);
    const normalizedEmail = email.toLowerCase();
    const now = new Date();

    // Newest still-unconsumed code for this address.
    const record = await prisma.passwordResetCode.findFirst({
      where: { email: normalizedEmail, consumedAt: null },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        codeHash: true,
        expires: true,
        attempts: true,
        maxAttempts: true
      }
    });

    if (!record) {
      return NextResponse.json(
        { success: false, verified: false, error: 'Invalid or expired code' },
        { status: 400 }
      );
    }

    if (record.expires <= now) {
      return NextResponse.json(
        { success: false, verified: false, error: 'Code has expired' },
        { status: 400 }
      );
    }

    if (record.attempts >= record.maxAttempts) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: 'Too many incorrect attempts. Request a new code.'
        },
        { status: 429 }
      );
    }

    const matches = verifyPasswordResetCode(
      normalizedEmail,
      code,
      record.codeHash
    );

    if (!matches) {
      const updated = await prisma.passwordResetCode.update({
        where: { id: record.id },
        data: { attempts: { increment: 1 } },
        select: { attempts: true, maxAttempts: true }
      });
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: 'Invalid code',
          attemptsRemaining: Math.max(0, updated.maxAttempts - updated.attempts)
        },
        { status: 400 }
      );
    }

    // Success — burn the code so it can't be reused.
    await prisma.passwordResetCode.update({
      where: { id: record.id },
      data: { consumedAt: now, attempts: { increment: 1 } },
      select: { id: true }
    });

    return NextResponse.json({ success: true, verified: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Password reset verify error:', error);
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    );
  }
}
