/**
 * Security-critical unit tests for the new licensing pieces:
 *   - Ed25519 proof signing / verification + tamper & wrong-key rejection
 *   - the canonical proof message is deterministic
 *   - the fixed AES-256-GCM key-payload crypto round-trips and is authenticated
 *   - license-key format + hash stability
 *
 * Run: npx tsx tests/license-signing.test.ts
 * (Pure functions only — no DB. The trial/expiry FLOW is covered by the
 *  end-to-end curl checks against a running server in docs/licensing.)
 */
import crypto from 'crypto';

// Configure a signing key BEFORE importing the signing module so loadPrivateKey
// picks it up. Generate a throwaway ECDSA P-256 pair for the test run.
const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
  namedCurve: 'prime256v1'
});
const privatePem = privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
const publicPem = publicKey.export({ type: 'spki', format: 'pem' }).toString();
process.env.LICENSE_SIGNING_PRIVATE_KEY = Buffer.from(privatePem, 'utf8').toString(
  'base64'
);
process.env.LICENSE_ENCRYPTION_KEY =
  process.env.LICENSE_ENCRYPTION_KEY || 'test-encryption-key-at-least-32-chars-long!!';

import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import {
  buildProofMessage,
  getLicenseSigningPublicKeyPem,
  isLicenseSigningEnabled,
  signLicenseProof,
  verifyLicenseProof,
  type LicenseProofFields
} from '@/lib/license/license-signing';

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.error(`  ✗ ${name}`);
  }
}

console.log('License signing + crypto tests\n');

// ── Signing enabled when a key is configured ──────────────────────────────
check('signing is enabled with a configured key', isLicenseSigningEnabled());
check(
  'derived public key matches the generated public key',
  getLicenseSigningPublicKeyPem()?.trim() === publicPem.trim()
);

// ── Sign / verify round-trip ──────────────────────────────────────────────
const fields: LicenseProofFields = {
  valid: true,
  purchaseId: 'clr_test_123',
  licenseKeyHash: crypto.createHash('sha256').update('NTCB-AAAA').digest('hex'),
  licenseType: 'trial',
  expiresAt: '2026-07-07T12:00:00.000Z'
};

const proof = signLicenseProof(fields, new Date('2026-06-30T12:00:00.000Z'));
check('signLicenseProof returns a proof', proof !== null);
check('proof algorithm is ES256', proof?.alg === 'ES256');
check('proof has a non-empty signature', !!proof && proof.signature.length > 0);
check('valid proof verifies', !!proof && verifyLicenseProof(fields, proof, publicPem));

// ── Tamper detection ──────────────────────────────────────────────────────
if (proof) {
  const tamperedExpiry = { ...fields, expiresAt: '2099-01-01T00:00:00.000Z' };
  check(
    'tampered expiresAt fails verification',
    !verifyLicenseProof(tamperedExpiry, proof, publicPem)
  );

  const tamperedKey = { ...fields, licenseKeyHash: 'deadbeef' };
  check(
    'tampered licenseKeyHash fails verification (proof bound to one key)',
    !verifyLicenseProof(tamperedKey, proof, publicPem)
  );

  const flippedValid = { ...fields, valid: false };
  check(
    'flipping valid=false fails verification',
    !verifyLicenseProof(flippedValid, proof, publicPem)
  );

  // A different keypair must not verify this proof.
  const other = crypto.generateKeyPairSync('ed25519');
  const otherPub = other.publicKey.export({ type: 'spki', format: 'pem' }).toString();
  check(
    'a different public key rejects the proof',
    !verifyLicenseProof(fields, proof, otherPub)
  );

  // Mutating the signature bytes must fail.
  const badSig = { ...proof, signature: Buffer.from('not-a-real-signature').toString('base64') };
  check(
    'a garbage signature is rejected',
    !verifyLicenseProof(fields, badSig, publicPem)
  );
}

// ── Canonical message determinism ─────────────────────────────────────────
const m1 = buildProofMessage(fields, '2026-06-30T12:00:00.000Z', 'abc123');
const m2 = buildProofMessage(fields, '2026-06-30T12:00:00.000Z', 'abc123');
check('canonical proof message is deterministic', m1 === m2);
check(
  'canonical message has the documented prefix',
  m1.startsWith('EDGEBI-LICENSE-PROOF-V1|valid=1|')
);

// ── Fixed AES-256-GCM key payload round-trips (authenticated) ─────────────
// generateLicenseKey internally encrypts; previously this threw / could not
// round-trip because the GCM auth tag was discarded. Exercise it indirectly:
// a generated key must be a well-formed NTCB key and hashing must be stable.
const key = LicenseKeyGenerator.generateLicenseKey(crypto.randomUUID(), 'a@b.com');
check('generated key has the NTCB-XXXX-XXXX-XXXX-XXXX-XXXX shape',
  /^NTCB(-[0-9A-Z]{8}){5}$/.test(key));
const k1 = LicenseKeyGenerator.generateLicenseKey(crypto.randomUUID(), 'a@b.com');
const k2 = LicenseKeyGenerator.generateLicenseKey(crypto.randomUUID(), 'a@b.com');
check('two generated keys are distinct', k1 !== k2);
check('hashLicenseKey is stable',
  LicenseKeyGenerator.hashLicenseKey(key) === LicenseKeyGenerator.hashLicenseKey(key));

// Directly round-trip the fixed AES-256-GCM helpers (reach the private statics
// via the class object — proves the auth tag is captured + verified).
const Gen = LicenseKeyGenerator as unknown as {
  encrypt(t: string): string;
  decrypt(c: string): string;
};
const secret = JSON.stringify({ hello: 'world', n: 42 });
const ciphertext = Gen.encrypt(secret);
check('AES-GCM ciphertext is salt:iv:tag:data (4 hex parts)',
  ciphertext.split(':').length === 4);
check('AES-GCM round-trips back to the plaintext', Gen.decrypt(ciphertext) === secret);
let tamperRejected = false;
try {
  // Flip the last hex nibble of the ciphertext body — GCM must reject it.
  const flipped = ciphertext.slice(0, -1) + (ciphertext.endsWith('0') ? '1' : '0');
  Gen.decrypt(flipped);
} catch {
  tamperRejected = true;
}
check('AES-GCM rejects tampered ciphertext (auth tag enforced)', tamperRejected);

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
