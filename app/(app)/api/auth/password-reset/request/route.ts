import { addMinutes, subHours, subSeconds } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import {
  PASSWORD_RESET_CODE_EXPIRY_MINUTES,
  PASSWORD_RESET_CODE_MAX_ATTEMPTS,
  PASSWORD_RESET_CODE_MAX_PER_HOUR,
  PASSWORD_RESET_CODE_RESEND_COOLDOWN_SECONDS
} from '@/constants/limits';
import { verifyAppApiKey } from '@/lib/auth/app-api-key';
import {
  generatePasswordResetCode,
  hashPasswordResetCode
} from '@/lib/auth/password-reset-code';
import { prisma } from '@/lib/db/prisma';
import { rateLimit } from '@/lib/network/rate-limit';
import { sendPasswordResetCodeEmail } from '@/lib/smtp/send-password-reset-code-email';
import { requestPasswordResetCodeSchema } from '@/schemas/auth/request-password-reset-code-schema';

// Step 1 of the desktop-app forgot-password flow.
//   POST { email }  ->  generates a 6-digit code, stores only its HMAC,
//                       emails the code (Resend) and returns a GENERIC body.
//
// Security posture:
//   - Shared-secret gate (fail-closed) so it can't be hit by arbitrary traffic.
//   - Per-IP + per-email rate limiting to stop flooding / email spraying.
//   - "Known emails only": a code is issued solely for an address the system
//     already recognises (User / Purchase / Contact), never for an arbitrary
//     inbox.
//   - Anti-enumeration: the response is identical whether or not the email is
//     recognised, throttled, or fails to send.

// Identical response for every non-error path so callers (and attackers)
// cannot distinguish registered emails from unknown ones.
const GENERIC_OK = {
  success: true,
  message:
    'If an account exists for that email, a password reset code has been sent.',
  expiresInMinutes: PASSWORD_RESET_CODE_EXPIRY_MINUTES
};

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

// A code is only ever sent to an address the system already knows: a dashboard
// User, a license-holding Purchase, or a CRM Contact. This covers desktop /
// licensed users (who may have no dashboard account) while preventing the
// endpoint being used to spray reset codes at arbitrary inboxes.
async function resolveKnownRecipient(normalizedEmail: string): Promise<{
  name: string;
  userId: string | null;
} | null> {
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, name: true }
  });
  if (user) {
    return { name: user.name, userId: user.id };
  }

  const purchase = await prisma.purchase.findFirst({
    where: { email: { equals: normalizedEmail, mode: 'insensitive' } },
    orderBy: { createdAt: 'desc' },
    select: { customerName: true }
  });
  if (purchase) {
    return { name: purchase.customerName || 'there', userId: null };
  }

  const contact = await prisma.contact.findFirst({
    where: { email: { equals: normalizedEmail, mode: 'insensitive' } },
    orderBy: { createdAt: 'asc' },
    select: { name: true }
  });
  if (contact) {
    return { name: contact.name || 'there', userId: null };
  }

  return null;
}

export async function POST(request: NextRequest) {
  // 1. Shared-secret gate (fail-closed when PASSWORD_RESET_API_KEY is unset).
  const auth = verifyAppApiKey(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const clientIp = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || '';

  // 2. Per-IP rate limit (in-memory; mirrors the software-latest endpoint).
  const limiter = rateLimit({ intervalInMs: 60 * 1000 });
  const rl = limiter.check(10, `pw-reset-request:${clientIp}`);
  if (rl.isRateLimited) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email } = requestPasswordResetCodeSchema.parse(body);
    const normalizedEmail = email.toLowerCase();
    const now = new Date();

    // 3. Per-email throttling (DB-backed so it holds across instances).
    const recentForEmail = await prisma.passwordResetCode.findMany({
      where: {
        email: normalizedEmail,
        createdAt: { gt: subHours(now, 1) }
      },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true }
    });

    // Cooldown — drop a re-request that arrives within the cooldown window.
    if (
      recentForEmail.length > 0 &&
      recentForEmail[0].createdAt >
        subSeconds(now, PASSWORD_RESET_CODE_RESEND_COOLDOWN_SECONDS)
    ) {
      return NextResponse.json(GENERIC_OK);
    }
    // Hourly cap per address.
    if (recentForEmail.length >= PASSWORD_RESET_CODE_MAX_PER_HOUR) {
      return NextResponse.json(GENERIC_OK);
    }

    // 4. Only issue/send for recognised emails. Unknown → generic OK, no email.
    const recipient = await resolveKnownRecipient(normalizedEmail);
    if (!recipient) {
      return NextResponse.json(GENERIC_OK);
    }

    // 5. Generate + persist. Invalidate any still-valid prior codes for this
    //    address first so only the newest code can be used.
    const code = generatePasswordResetCode();
    const codeHash = hashPasswordResetCode(normalizedEmail, code);
    const expires = addMinutes(now, PASSWORD_RESET_CODE_EXPIRY_MINUTES);

    await prisma.$transaction([
      prisma.passwordResetCode.updateMany({
        where: {
          email: normalizedEmail,
          consumedAt: null,
          expires: { gt: now }
        },
        data: { expires: now }
      }),
      prisma.passwordResetCode.create({
        data: {
          email: normalizedEmail,
          userId: recipient.userId,
          requestedName: recipient.name,
          codeHash,
          expires,
          maxAttempts: PASSWORD_RESET_CODE_MAX_ATTEMPTS,
          ipAddress: clientIp,
          userAgent: userAgent.slice(0, 512)
        }
      })
    ]);

    // 6. Email the code. A delivery failure must not leak existence through a
    //    different status/timing — log it and still return the generic body.
    try {
      await sendPasswordResetCodeEmail({
        recipient: normalizedEmail,
        name: recipient.name,
        code,
        expiresInMinutes: PASSWORD_RESET_CODE_EXPIRY_MINUTES
      });
    } catch (emailError) {
      console.error('Failed to send password reset code email:', emailError);
    }

    return NextResponse.json(GENERIC_OK);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
