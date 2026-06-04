import { timingSafeEqual } from 'crypto';
import { type NextRequest } from 'next/server';

// Shared-secret gate for machine-to-machine endpoints called by the desktop
// app (e.g. the password-reset API). This is defense-in-depth on top of rate
// limiting and generic responses — it stops the endpoint being discovered and
// abused as an email/spam relay by arbitrary internet traffic.
//
// The secret lives in PASSWORD_RESET_API_KEY and is embedded in the desktop
// app build. The app sends it as `X-Api-Key: <key>` (or
// `Authorization: Bearer <key>`).
//
// Fail-closed: if the server has no key configured, every request is rejected.
// A missing secret must never silently open the endpoint.

export const APP_API_KEY_ENV = 'PASSWORD_RESET_API_KEY';

type VerifyResult =
  | { ok: true }
  | { ok: false; status: 401 | 503; error: string };

function resolveProvidedKey(request: NextRequest): string | null {
  const headerKey = request.headers.get('x-api-key');
  if (headerKey && headerKey.trim()) {
    return headerKey.trim();
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const match = /^Bearer\s+(.+)$/i.exec(authHeader.trim());
    if (match && match[1].trim()) {
      return match[1].trim();
    }
  }

  return null;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function verifyAppApiKey(request: NextRequest): VerifyResult {
  const expected = process.env[APP_API_KEY_ENV];
  if (!expected || !expected.trim()) {
    // Fail closed — the operator must configure the key before the endpoint
    // is usable. Surfaced as 503 so it's clearly a server-config problem.
    console.error(
      `${APP_API_KEY_ENV} is not configured — refusing app API request.`
    );
    return {
      ok: false,
      status: 503,
      error: 'API is not configured'
    };
  }

  const provided = resolveProvidedKey(request);
  if (!provided || !safeEqual(provided, expected.trim())) {
    return {
      ok: false,
      status: 401,
      error: 'Invalid or missing API key'
    };
  }

  return { ok: true };
}
