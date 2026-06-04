import crypto from 'node:crypto';

// Short-lived, HMAC-signed download tokens for installer packages.
//
// Why a token instead of replaying the license key on the download request:
// the FCP desktop updater (FCP.Updater.exe) runs ELEVATED (UAC) and downloads
// the package after the main app has exited. Handing that process the license
// key would mean writing the credential to a plaintext staging file that an
// elevated process then reads. Instead, the already-authenticated
// /api/software/latest call mints a token bound to (file, license, expiry),
// and the updater just GETs the URL — no credential ever leaves the main app.
//
// Format: base64url(payloadJson) + "." + base64url(hmacSha256(payloadJson)).
// Fail-closed: if SOFTWARE_DOWNLOAD_SECRET is unset the token can be neither
// signed nor verified (mirrors the PASSWORD_RESET_API_KEY gate).

const DEFAULT_TTL_MS = 60 * 60 * 1000; // 1 hour

interface TokenPayload {
  // Stored file name under public/uploads/software (e.g. "<uuid>.zip").
  s: string;
  // License key hash the token was minted for (defense-in-depth re-check).
  h: string;
  // Absolute expiry, epoch ms.
  e: number;
}

function getSecret(): string | null {
  const secret = process.env.SOFTWARE_DOWNLOAD_SECRET;
  return secret && secret.trim() ? secret.trim() : null;
}

function base64url(buf: Buffer): string {
  return buf.toString('base64url');
}

function hmac(secret: string, data: string): Buffer {
  return crypto.createHmac('sha256', secret).update(data).digest();
}

/**
 * Mint a token for one stored installer, bound to a license and a TTL.
 * Returns null when the secret is unconfigured (caller falls back / errors).
 */
export function signDownloadToken(
  storedName: string,
  licenseKeyHash: string,
  ttlMs: number = DEFAULT_TTL_MS
): string | null {
  const secret = getSecret();
  if (!secret) return null;

  const payload: TokenPayload = {
    s: storedName,
    h: licenseKeyHash,
    e: Date.now() + ttlMs
  };
  const payloadB64 = base64url(Buffer.from(JSON.stringify(payload), 'utf8'));
  const sig = base64url(hmac(secret, payloadB64));
  return `${payloadB64}.${sig}`;
}

export type VerifiedDownloadToken = {
  storedName: string;
  licenseKeyHash: string;
};

/**
 * Verify a token's signature and expiry. Returns the bound (file, license) on
 * success, or null on any failure (bad shape, bad signature, expired, no
 * secret). Constant-time signature comparison.
 */
export function verifyDownloadToken(
  token: string
): VerifiedDownloadToken | null {
  const secret = getSecret();
  if (!secret) return null;

  const dot = token.indexOf('.');
  if (dot <= 0) return null;

  const payloadB64 = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);

  const expected = hmac(secret, payloadB64);
  let provided: Buffer;
  try {
    provided = Buffer.from(sigB64, 'base64url');
  } catch {
    return null;
  }
  if (
    provided.length !== expected.length ||
    !crypto.timingSafeEqual(provided, expected)
  ) {
    return null;
  }

  let payload: TokenPayload;
  try {
    payload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString('utf8')
    ) as TokenPayload;
  } catch {
    return null;
  }

  if (
    typeof payload.s !== 'string' ||
    typeof payload.h !== 'string' ||
    typeof payload.e !== 'number' ||
    Date.now() > payload.e
  ) {
    return null;
  }

  return { storedName: payload.s, licenseKeyHash: payload.h };
}
