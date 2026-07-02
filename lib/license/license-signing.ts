import crypto from 'crypto';

/**
 * Tamper-proof license proofs.
 *
 * The desktop app must not be foolable by a fake license server (a hosts-file
 * redirect, a corporate MITM proxy, a `{ "valid": true }` stub). Returning plain
 * JSON is not enough: anything that can answer the HTTP call can forge a "valid"
 * response. So `/api/license/validate` (and activate) attach an **ECDSA P-256
 * (ES256) signature** over the security-relevant fields. Only the holder of the
 * private key (this server) can produce a signature the desktop's embedded
 * PUBLIC key will accept — a fake server cannot, so an offline/MITM bypass fails
 * closed. ECDSA P-256 is verified natively by .NET's `System.Security.
 * Cryptography.ECDsa` (DER signature format), so the desktop needs no extra
 * crypto dependency.
 *
 * The signed message is a fixed-order, pipe-joined string (same shape as the
 * fingerprint recipe) so the C#/desktop side can reproduce it byte-for-byte:
 *
 *   EDGEBI-LICENSE-PROOF-V1|valid=<0|1>|purchaseId=<id>|licenseKeyHash=<sha256>
 *     |licenseType=<full|trial>|expiresAt=<iso|''>|signedAt=<iso>|nonce=<hex>
 *
 * `licenseKeyHash` binds the proof to ONE license, so a "valid" proof minted for
 * key A can't be replayed for key B. `signedAt` + `nonce` let the client reject
 * stale/replayed proofs (it should require signedAt within a few minutes of now).
 *
 * Signing is OPTIONAL at runtime: if `LICENSE_SIGNING_PRIVATE_KEY` is unset
 * (e.g. local dev) the proof is simply omitted and the endpoints behave as
 * before. Production MUST set the key — see scripts/generate-license-signing-keys.ts.
 */

export const LICENSE_PROOF_VERSION = 'EDGEBI-LICENSE-PROOF-V1';

export interface LicenseProofFields {
  valid: boolean;
  purchaseId: string;
  /** SHA-256 hex of the license key — binds the proof to a single license. */
  licenseKeyHash: string;
  licenseType: string;
  /** ISO-8601 expiry, or null for perpetual licenses. */
  expiresAt: string | null;
}

export interface LicenseProof {
  /** ECDSA P-256 with SHA-256; DER (Rfc3279) signature encoding. */
  alg: 'ES256';
  /** First 8 hex chars of SHA-256(publicKey) — lets a client pin a key id. */
  keyId: string;
  signedAt: string;
  nonce: string;
  signature: string; // base64 of the DER-encoded ECDSA signature
}

/** Fixed-order canonical message. Keep in lock-step with the desktop verifier. */
export function buildProofMessage(
  fields: LicenseProofFields,
  signedAt: string,
  nonce: string
): string {
  return [
    LICENSE_PROOF_VERSION,
    `valid=${fields.valid ? 1 : 0}`,
    `purchaseId=${fields.purchaseId}`,
    `licenseKeyHash=${fields.licenseKeyHash}`,
    `licenseType=${fields.licenseType}`,
    `expiresAt=${fields.expiresAt ?? ''}`,
    `signedAt=${signedAt}`,
    `nonce=${nonce}`
  ].join('|');
}

function loadPrivateKey(): crypto.KeyObject | null {
  const raw = process.env.LICENSE_SIGNING_PRIVATE_KEY?.trim();
  if (!raw) return null;
  try {
    // Accept either a PEM (possibly with escaped \n from a single-line .env)
    // or a base64-encoded PEM blob.
    const pem = raw.includes('BEGIN')
      ? raw.replace(/\\n/g, '\n')
      : Buffer.from(raw, 'base64').toString('utf8');
    return crypto.createPrivateKey(pem);
  } catch (error) {
    console.error('Invalid LICENSE_SIGNING_PRIVATE_KEY — signing disabled:', error);
    return null;
  }
}

function publicKeyFrom(privateKey: crypto.KeyObject): crypto.KeyObject {
  return crypto.createPublicKey(privateKey);
}

function keyIdOf(publicKey: crypto.KeyObject): string {
  const der = publicKey.export({ type: 'spki', format: 'der' });
  return crypto.createHash('sha256').update(der).digest('hex').slice(0, 8);
}

/** True when a signing key is configured (so callers can warn in prod if not). */
export function isLicenseSigningEnabled(): boolean {
  return loadPrivateKey() !== null;
}

/**
 * Sign the proof fields. Returns null when no signing key is configured (dev),
 * so callers can simply spread `...(proof ? { proof } : {})` into the response.
 */
export function signLicenseProof(
  fields: LicenseProofFields,
  now: Date = new Date()
): LicenseProof | null {
  const privateKey = loadPrivateKey();
  if (!privateKey) return null;

  const signedAt = now.toISOString();
  const nonce = crypto.randomBytes(16).toString('hex');
  const message = Buffer.from(buildProofMessage(fields, signedAt, nonce), 'utf8');

  // ECDSA P-256 over SHA-256. Node emits a DER-encoded signature by default,
  // which .NET verifies with DSASignatureFormat.Rfc3279DerSequence.
  const signature = crypto.sign('sha256', message, privateKey).toString('base64');

  return {
    alg: 'ES256',
    keyId: keyIdOf(publicKeyFrom(privateKey)),
    signedAt,
    nonce,
    signature
  };
}

/**
 * Verify a proof against the same fields. Used by tests here and intended to be
 * mirrored on the desktop with the embedded public key. `publicKeyPem` defaults
 * to the public half of the configured signing key.
 */
export function verifyLicenseProof(
  fields: LicenseProofFields,
  proof: LicenseProof,
  publicKeyPem?: string
): boolean {
  try {
    let publicKey: crypto.KeyObject;
    if (publicKeyPem) {
      publicKey = crypto.createPublicKey(publicKeyPem);
    } else {
      const privateKey = loadPrivateKey();
      if (!privateKey) return false;
      publicKey = publicKeyFrom(privateKey);
    }
    const message = Buffer.from(
      buildProofMessage(fields, proof.signedAt, proof.nonce),
      'utf8'
    );
    return crypto.verify(
      'sha256',
      message,
      publicKey,
      Buffer.from(proof.signature, 'base64')
    );
  } catch {
    return false;
  }
}

/**
 * The public key (PEM) to embed in the desktop app. Pulled from
 * `LICENSE_SIGNING_PUBLIC_KEY` if set, else derived from the private key.
 * Returns null when no key is configured.
 */
export function getLicenseSigningPublicKeyPem(): string | null {
  const explicit = process.env.LICENSE_SIGNING_PUBLIC_KEY?.trim();
  if (explicit) {
    try {
      const pem = explicit.includes('BEGIN')
        ? explicit.replace(/\\n/g, '\n')
        : Buffer.from(explicit, 'base64').toString('utf8');
      return crypto.createPublicKey(pem).export({ type: 'spki', format: 'pem' }).toString();
    } catch {
      /* fall through to deriving from the private key */
    }
  }
  const privateKey = loadPrivateKey();
  if (!privateKey) return null;
  return publicKeyFrom(privateKey)
    .export({ type: 'spki', format: 'pem' })
    .toString();
}
