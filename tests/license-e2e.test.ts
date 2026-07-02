/**
 * End-to-end licensing flow against a REAL Postgres, driving the REAL Next.js
 * route handlers (no mocks) — trial issue → idempotency → activate → validate
 * (+ signed proof) → expiry enforcement.
 *
 * Point DATABASE_URL at a THROWAWAY local database (never prod) and run:
 *   DATABASE_URL=postgres://postgres:testpass@localhost:5433/licensetest \
 *     npx tsx tests/license-e2e.test.ts
 *
 * The schema must already be pushed to that DB (prisma db push).
 */
import crypto from 'crypto';

// Configure a signing key for this run BEFORE the route/lib modules read it
// (loadPrivateKey reads process.env at call time, so this is enough).
const kp = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
process.env.LICENSE_SIGNING_PRIVATE_KEY = Buffer.from(
  kp.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
  'utf8'
).toString('base64');
process.env.LICENSE_TRIAL_DAYS = process.env.LICENSE_TRIAL_DAYS || '7';
process.env.LICENSE_ENCRYPTION_KEY =
  process.env.LICENSE_ENCRYPTION_KEY || 'e2e-encryption-key-at-least-32-chars-xx';

import { NextRequest } from 'next/server';

import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import {
  getLicenseSigningPublicKeyPem,
  verifyLicenseProof
} from '@/lib/license/license-signing';
import { POST as trialPOST } from '@/app/(app)/api/license/trial/route';
import { POST as activatePOST } from '@/app/(app)/api/license/activate/route';
import { POST as validatePOST } from '@/app/(app)/api/license/validate/route';

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, detail?: unknown) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.error(`  ✗ ${name}`, detail ?? '');
  }
}

function jsonPost(
  url: string,
  body: Record<string, unknown>,
  headers: Record<string, string> = {}
): NextRequest {
  return new NextRequest(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body)
  });
}

async function main() {
  const rand = crypto.randomBytes(4).toString('hex');
  const email = `e2e+${rand}@test.local`;
  const processorId = `TEST-CPU-${rand}`;
  const hwHeaders = { 'x-hardware-info': `hw-${processorId}`, 'x-timezone': 'UTC' };

  console.log('License end-to-end flow\n');

  // Clean slate for this synthetic identity.
  await prisma.purchase.deleteMany({
    where: { OR: [{ email }, { processorId }] }
  });

  // 1. Issue a trial.
  const t1 = await trialPOST(
    jsonPost('http://localhost/api/license/trial', { email, processorId }, hwHeaders)
  );
  const t1j = await t1.json();
  check('trial issue returns 200', t1.status === 200, t1.status);
  check('trial status is "trial"', t1j.status === 'trial', t1j);
  check('trial licenseType is "trial"', t1j.licenseType === 'trial', t1j.licenseType);
  check('trial grants exactly 1 seat', t1j.seats === 1, t1j.seats);
  check('trial has ~7 days remaining', t1j.trialDaysRemaining === 7, t1j.trialDaysRemaining);
  check('trial returns a key', typeof t1j.licenseKey === 'string' && t1j.licenseKey.length > 0);
  const licenseKey: string = t1j.licenseKey;

  // 2. Idempotent re-issue (same device/email) returns the SAME key.
  const t2 = await trialPOST(
    jsonPost('http://localhost/api/license/trial', { email, processorId }, hwHeaders)
  );
  const t2j = await t2.json();
  check('re-requesting a trial returns the SAME key (idempotent)', t2j.licenseKey === licenseKey, t2j.licenseKey);

  // 3. Activate the trial key (consumes the seat).
  const a1 = await activatePOST(
    jsonPost(
      'http://localhost/api/license/activate',
      { licenseKey, email, processorId, systemInfo: 'Windows 11 / e2e' },
      hwHeaders
    )
  );
  const a1j = await a1.json();
  check('activate returns 200', a1.status === 200, a1j);
  check('activate status is active', a1j.status === 'active', a1j.status);
  check('activate reports licenseType trial', a1j.licenseType === 'trial', a1j.licenseType);
  check('activate consumed 1 seat', a1j.seatsUsed === 1, a1j.seatsUsed);
  check('activate echoes a non-null expiresAt (trial)', !!a1j.expiresAt, a1j.expiresAt);
  const systemFingerprint: string = a1j.systemFingerprint;
  const purchaseId: string = a1j.purchaseId ?? '';

  // 4. Validate — must be valid, carry expiry + a verifiable Ed25519 proof.
  const v1 = await validatePOST(
    jsonPost('http://localhost/api/license/validate', {
      licenseKey,
      systemFingerprint,
      processorId
    })
  );
  const v1j = await v1.json();
  check('validate returns 200', v1.status === 200, v1j);
  check('validate says valid=true', v1j.valid === true, v1j);
  check('validate reports licenseType trial', v1j.licenseType === 'trial', v1j.licenseType);
  check('validate carries a signed proof', !!v1j.proof, v1j.proof);

  const publicPem = getLicenseSigningPublicKeyPem();
  if (v1j.proof && publicPem) {
    const fields = {
      valid: true,
      purchaseId: v1j.purchaseId as string,
      licenseKeyHash: LicenseKeyGenerator.hashLicenseKey(licenseKey),
      licenseType: 'trial',
      expiresAt: new Date(v1j.expiresAt).toISOString()
    };
    check(
      'the validate proof verifies against the public key',
      verifyLicenseProof(fields, v1j.proof, publicPem)
    );
  }

  // 5. Force the trial to expire, then re-check the gates.
  await prisma.purchase.update({
    where: { licenseKeyHash: LicenseKeyGenerator.hashLicenseKey(licenseKey) },
    data: { licenseExpiresAt: new Date(Date.now() - 60_000) }
  });

  const v2 = await validatePOST(
    jsonPost('http://localhost/api/license/validate', {
      licenseKey,
      systemFingerprint,
      processorId
    })
  );
  const v2j = await v2.json();
  check('expired trial: validate returns 403', v2.status === 403, v2.status);
  check('expired trial: validate says valid=false', v2j.valid === false, v2j);
  check('expired trial: error is "License expired"', v2j.error === 'License expired', v2j.error);

  const a2 = await activatePOST(
    jsonPost(
      'http://localhost/api/license/activate',
      { licenseKey, email, processorId, systemInfo: 'Windows 11 / e2e' },
      hwHeaders
    )
  );
  const a2j = await a2.json();
  check('expired trial: activate returns 403', a2.status === 403, a2.status);
  check('expired trial: activate error is "License has expired"', a2j.error === 'License has expired', a2j.error);

  // Cleanup.
  await prisma.purchase.deleteMany({ where: { OR: [{ email }, { processorId }] } });
  void purchaseId;

  console.log(`\n${passed} passed, ${failed} failed`);
  await prisma.$disconnect();
  if (failed > 0) process.exit(1);
}

main().catch(async (err) => {
  console.error('E2E run crashed:', err);
  try {
    await prisma.$disconnect();
  } catch {
    /* ignore */
  }
  process.exit(1);
});
