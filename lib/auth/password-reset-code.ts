import { createHmac, randomInt, timingSafeEqual } from 'crypto';

import { PASSWORD_RESET_CODE_LENGTH } from '@/constants/limits';

// Codes are short (6 digits = 1,000,000 possibilities), so a plain SHA hash of
// the code would be trivially brute-forced offline if the database leaked.
// Instead we keep an HMAC keyed with AUTH_SECRET: without the server secret the
// stored `codeHash` cannot be reversed or matched. The email is folded into the
// HMAC input so a code is only ever valid for the address it was issued to.
function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    // Fail loudly server-side rather than silently issuing weakly-bound codes.
    throw new Error(
      'AUTH_SECRET is not set — cannot hash password reset codes securely.'
    );
  }
  return secret;
}

/**
 * Generate a cryptographically-random, zero-padded numeric code
 * (e.g. "048213"). `randomInt` is uniform over the range, so every code —
 * including those with leading zeros — is equally likely.
 */
export function generatePasswordResetCode(): string {
  const max = 10 ** PASSWORD_RESET_CODE_LENGTH; // exclusive upper bound
  const value = randomInt(0, max);
  return value.toString().padStart(PASSWORD_RESET_CODE_LENGTH, '0');
}

/**
 * HMAC-SHA256 of `${normalizedEmail}:${code}`, hex-encoded. Deterministic for
 * a given (email, code) pair so verification is a constant-time hash compare.
 */
export function hashPasswordResetCode(email: string, code: string): string {
  return createHmac('sha256', getSecret())
    .update(`${email.toLowerCase()}:${code}`)
    .digest('hex');
}

/**
 * Timing-safe comparison of a submitted code against a stored hash. Returns
 * false on any malformed input instead of throwing so callers can treat it as
 * a plain "wrong code".
 */
export function verifyPasswordResetCode(
  email: string,
  code: string,
  storedHash: string
): boolean {
  let computed: string;
  try {
    computed = hashPasswordResetCode(email, code);
  } catch {
    return false;
  }

  const a = Buffer.from(computed, 'hex');
  const b = Buffer.from(storedHash, 'hex');
  if (a.length === 0 || a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}
