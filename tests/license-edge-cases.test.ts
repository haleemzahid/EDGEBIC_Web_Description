/**
 * Web integration EDGE CASES against a REAL Postgres + the REAL route handlers.
 * Complements license-e2e.test.ts (the happy path) with the awkward branches:
 * seat limits, wrong-device validate, revoked, deactivate-frees-seat, a
 * perpetual (full) license's signed proof, and trial idempotency by email.
 *
 *   DATABASE_URL=postgres://postgres:testpass@localhost:55432/licensetest \
 *     npx tsx tests/license-edge-cases.test.ts
 */
import crypto from 'crypto';

const kp = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
process.env.LICENSE_SIGNING_PRIVATE_KEY = Buffer.from(
  kp.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
  'utf8'
).toString('base64');
process.env.LICENSE_TRIAL_DAYS = process.env.LICENSE_TRIAL_DAYS || '7';
process.env.LICENSE_ENCRYPTION_KEY =
  process.env.LICENSE_ENCRYPTION_KEY || 'edge-encryption-key-at-least-32-chars-xx';

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
import { POST as deactivatePOST } from '@/app/(app)/api/license/deactivate/route';

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, detail?: unknown) {
  if (cond) { passed++; console.log(`  ✓ ${name}`); }
  else { failed++; console.error(`  ✗ ${name}`, detail ?? ''); }
}

function post(url: string, body: Record<string, unknown>, headers: Record<string, string> = {}) {
  return new NextRequest(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body)
  });
}
const dev = (hw: string) => ({ 'x-hardware-info': hw, 'x-timezone': 'UTC' });
const A = 'http://localhost/api/license/activate';
const V = 'http://localhost/api/license/validate';
const D = 'http://localhost/api/license/deactivate';

async function seedLicense(opts: {
  email: string; key: string; seats?: number; status?: string; type?: string;
}) {
  await prisma.purchase.create({
    data: {
      email: opts.email,
      customerName: 'Edge',
      amount: 0,
      currency: 'usd',
      status: 'completed',
      stripeSessionId: `edge-${crypto.randomUUID()}`,
      licenseKey: opts.key,
      licenseKeyHash: LicenseKeyGenerator.hashLicenseKey(opts.key),
      licenseStatus: opts.status ?? 'active',
      licenseType: opts.type ?? 'full',
      seats: opts.seats ?? 1
    }
  });
}

async function main() {
  console.log('License web edge cases\n');
  const rand = crypto.randomBytes(4).toString('hex');
  const email = `edge+${rand}@test.local`;

  // ── A. Full (perpetual) license: activate + validate + signed proof, no expiry
  const fullKey = `NTCB-FULL-${rand}`;
  await seedLicense({ email, key: fullKey, seats: 1, type: 'full' });

  const a1 = await activatePOST(post(A, { licenseKey: fullKey, email, processorId: 'CPU-1', systemInfo: 'win' }, dev('hw-1')));
  const a1j = await a1.json();
  check('full: activate 200', a1.status === 200, a1j);
  check('full: licenseType full', a1j.licenseType === 'full', a1j.licenseType);
  check('full: expiresAt is null (perpetual)', a1j.expiresAt === null, a1j.expiresAt);
  const fp1 = a1j.systemFingerprint as string;

  const v1 = await validatePOST(post(V, { licenseKey: fullKey, systemFingerprint: fp1, processorId: 'CPU-1' }));
  const v1j = await v1.json();
  check('full: validate valid', v1j.valid === true, v1j);
  check('full: validate expiresAt null', v1j.expiresAt === null, v1j.expiresAt);
  check('full: validate carries a proof', !!v1j.proof, v1j.proof);
  const pub = getLicenseSigningPublicKeyPem();
  if (v1j.proof && pub) {
    check('full: proof verifies (expiresAt empty)', verifyLicenseProof(
      { valid: true, purchaseId: v1j.purchaseId, licenseKeyHash: LicenseKeyGenerator.hashLicenseKey(fullKey), licenseType: 'full', expiresAt: null },
      v1j.proof, pub));
  }

  // ── B. Wrong device can't validate (no seat matches its fingerprint/proc)
  const vWrong = await validatePOST(post(V, { licenseKey: fullKey, systemFingerprint: 'totally-different-fp', processorId: 'CPU-OTHER' }));
  const vWrongJ = await vWrong.json();
  check('wrong-device: validate 403', vWrong.status === 403, vWrong.status);
  check('wrong-device: System validation failed', vWrongJ.error === 'System validation failed', vWrongJ);

  // ── C. Seat limit: the single seat is taken by device 1 → device 2 gets 409
  const a2 = await activatePOST(post(A, { licenseKey: fullKey, email, processorId: 'CPU-2', systemInfo: 'win' }, dev('hw-2')));
  const a2j = await a2.json();
  check('seat-limit: second device 409', a2.status === 409, a2.status);
  check('seat-limit: mentions seats in use', typeof a2j.error === 'string' && /seat/i.test(a2j.error), a2j.error);

  // ── D. Deactivate frees the seat → device 2 can now activate
  const de = await deactivatePOST(post(D, { licenseKey: fullKey, systemFingerprint: fp1, processorId: 'CPU-1' }));
  const deJ = await de.json();
  check('deactivate: 200 released', de.status === 200 && deJ.success === true, deJ);
  const a2b = await activatePOST(post(A, { licenseKey: fullKey, email, processorId: 'CPU-2', systemInfo: 'win' }, dev('hw-2')));
  check('deactivate: freed seat lets a new device activate', a2b.status === 200, a2b.status);

  // ── E. Revoked license blocks activate (403) and validate (400 not active)
  const revKey = `NTCB-REV-${rand}`;
  await seedLicense({ email: `rev+${rand}@test.local`, key: revKey, status: 'revoked' });
  const rAct = await activatePOST(post(A, { licenseKey: revKey, email: `rev+${rand}@test.local`, processorId: 'CPU-9', systemInfo: 'win' }, dev('hw-9')));
  const rActJ = await rAct.json();
  check('revoked: activate 403', rAct.status === 403, rAct.status);
  check('revoked: "License has been revoked"', rActJ.error === 'License has been revoked', rActJ);
  const rVal = await validatePOST(post(V, { licenseKey: revKey, systemFingerprint: 'x', processorId: 'CPU-9' }));
  check('revoked: validate 400 not active', rVal.status === 400, rVal.status);

  // ── F. Unknown key → 404 on activate and validate
  const uAct = await activatePOST(post(A, { licenseKey: 'NTCB-NOPE', email, processorId: 'CPU-1', systemInfo: 'win' }, dev('hw-1')));
  check('unknown key: activate 404', uAct.status === 404, uAct.status);
  const uVal = await validatePOST(post(V, { licenseKey: 'NTCB-NOPE', systemFingerprint: 'x', processorId: 'y' }));
  check('unknown key: validate 404', uVal.status === 404, uVal.status);

  // ── G. Trial idempotency by EMAIL on a different device → same key back
  const temail = `trial-idem+${rand}@test.local`;
  const t1 = await trialPOST(post('http://localhost/api/license/trial', { email: temail, processorId: 'CPU-T1' }, dev('hw-t1')));
  const t1j = await t1.json();
  const t2 = await trialPOST(post('http://localhost/api/license/trial', { email: temail, processorId: 'CPU-T2' }, dev('hw-t2')));
  const t2j = await t2.json();
  check('trial idempotency by email returns the same key', !!t1j.licenseKey && t1j.licenseKey === t2j.licenseKey, { a: t1j.licenseKey, b: t2j.licenseKey });

  // Cleanup everything this run created.
  await prisma.purchase.deleteMany({ where: { OR: [
    { email }, { email: `rev+${rand}@test.local` }, { email: temail }
  ] } });

  console.log(`\n${passed} passed, ${failed} failed`);
  await prisma.$disconnect();
  if (failed > 0) process.exit(1);
}

main().catch(async (err) => {
  console.error('Edge-case run crashed:', err);
  try { await prisma.$disconnect(); } catch { /* ignore */ }
  process.exit(1);
});
