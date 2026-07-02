/**
 * Emits a genuine server-signed license proof for the cross-language e2e:
 * Node signs it here, the .NET desktop verifier
 * (FCP.Tests LicenseProofVerifierTests.Cross_language_...) verifies it with the
 * EMBEDDED public key. Proves the ES256 / DER signature is byte-compatible
 * across the two runtimes with the real key.
 *
 *   LICENSE_SIGNING_PRIVATE_KEY=<base64 pem> npx tsx scripts/emit-test-proof.ts
 *
 * Prints `FCP_TEST_PROOF_*=...` lines to feed into the .NET test's environment.
 */
import crypto from 'crypto';

import { signLicenseProof } from '@/lib/license/license-signing';

const licenseKey = 'NTCB-XLANG-TEST-0001-AAAA-BBBB';
const fields = {
  valid: true,
  purchaseId: 'clr_xlang_1',
  licenseKeyHash: crypto.createHash('sha256').update(licenseKey).digest('hex'),
  licenseType: 'trial',
  expiresAt: '2026-07-07T12:00:00.000Z'
};

const proof = signLicenseProof(fields);
if (!proof) {
  console.error('LICENSE_SIGNING_PRIVATE_KEY is not set — cannot sign.');
  process.exit(1);
}

/* eslint-disable no-console */
console.log(`FCP_TEST_PROOF_SIGNATURE=${proof.signature}`);
console.log(`FCP_TEST_PROOF_SIGNEDAT=${proof.signedAt}`);
console.log(`FCP_TEST_PROOF_NONCE=${proof.nonce}`);
console.log(`FCP_TEST_PROOF_PURCHASEID=${fields.purchaseId}`);
console.log(`FCP_TEST_PROOF_LICENSEKEY=${licenseKey}`);
console.log(`FCP_TEST_PROOF_LICENSETYPE=${fields.licenseType}`);
console.log(`FCP_TEST_PROOF_EXPIRESAT=${fields.expiresAt}`);
