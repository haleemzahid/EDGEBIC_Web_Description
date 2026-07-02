/**
 * License-scoped password reset — web integration against a REAL Postgres + the
 * REAL route handlers. Proves the new rule: a reset code is issued / accepted
 * ONLY when the email is registered under the supplied license key
 * (owner / roster / seat).
 *
 *   DATABASE_URL=postgres://postgres:testpass@localhost:55432/licensetest \
 *     npx tsx tests/password-reset-license.test.ts
 */
// Set secrets BEFORE importing the routes/helpers (read at call time).
process.env.AUTH_SECRET = 'test-auth-secret-for-reset-0123456789';
process.env.PASSWORD_RESET_API_KEY = 'test-reset-api-key';
process.env.LICENSE_ENCRYPTION_KEY =
  process.env.LICENSE_ENCRYPTION_KEY || 'reset-enc-key-at-least-32-chars-long!!';

import crypto from 'crypto';

import { NextRequest } from 'next/server';

import {
  generatePasswordResetCode,
  hashPasswordResetCode
} from '@/lib/auth/password-reset-code';
import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import { POST as requestPOST } from '@/app/(app)/api/auth/password-reset/request/route';
import { POST as verifyPOST } from '@/app/(app)/api/auth/password-reset/verify/route';

const API_KEY = 'test-reset-api-key';
const REQ = 'http://localhost/api/auth/password-reset/request';
const VER = 'http://localhost/api/auth/password-reset/verify';

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, detail?: unknown) {
  if (cond) { passed++; console.log(`  ✓ ${name}`); }
  else { failed++; console.error(`  ✗ ${name}`, detail ?? ''); }
}

function post(url: string, body: Record<string, unknown>, apiKey: string | null = API_KEY) {
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (apiKey) headers['x-api-key'] = apiKey;
  return new NextRequest(url, { method: 'POST', headers, body: JSON.stringify(body) });
}

async function codeCount(email: string): Promise<number> {
  return prisma.passwordResetCode.count({ where: { email: email.toLowerCase() } });
}

async function seedCode(email: string): Promise<string> {
  const code = generatePasswordResetCode();
  await prisma.passwordResetCode.create({
    data: {
      email: email.toLowerCase(),
      codeHash: hashPasswordResetCode(email, code),
      expires: new Date(Date.now() + 15 * 60_000),
      maxAttempts: 5
    }
  });
  return code;
}

async function main() {
  console.log('License-scoped password reset\n');
  const rand = crypto.randomBytes(4).toString('hex');
  const owner = `owner+${rand}@test.local`;
  const operator = `op+${rand}@test.local`;
  const unknownLicEmail = `dunk+${rand}@test.local`;
  const wrongEmail = `outsider+${rand}@test.local`;
  const verifyEmail = `verify+${rand}@test.local`;
  const key = `NTCB-RESET-${rand}`;
  const allEmails = [owner, operator, unknownLicEmail, wrongEmail, verifyEmail];

  // Fresh slate.
  await prisma.passwordResetCode.deleteMany({ where: { email: { in: allEmails.map((e) => e.toLowerCase()) } } });
  await prisma.purchase.deleteMany({ where: { email: owner } });

  const purchase = await prisma.purchase.create({
    data: {
      email: owner, customerName: 'Owner', amount: 0, currency: 'usd', status: 'completed',
      stripeSessionId: `reset-${rand}`, licenseKey: key,
      licenseKeyHash: LicenseKeyGenerator.hashLicenseKey(key),
      licenseStatus: 'active', licenseType: 'full', seats: 1
    }
  });
  // Roster: the operator + the verify email are registered under this license.
  await prisma.licenseUser.createMany({
    data: [
      { purchaseId: purchase.id, email: operator.toLowerCase(), name: 'Operator' },
      { purchaseId: purchase.id, email: verifyEmail.toLowerCase(), name: 'Verifier' }
    ]
  });

  // ── A. Missing API key → 401
  const noKey = await requestPOST(post(REQ, { email: owner, licenseKey: key }, null));
  check('request without X-Api-Key is 401', noKey.status === 401, noKey.status);

  // ── B. Owner email + matching license → a code is issued
  const rB = await requestPOST(post(REQ, { email: owner, licenseKey: key }));
  check('owner + matching license: 200', rB.status === 200, rB.status);
  check('owner + matching license: a code was issued', (await codeCount(owner)) >= 1);

  // ── C. Roster operator + matching license → a code is issued
  await requestPOST(post(REQ, { email: operator, licenseKey: key }));
  check('roster operator + matching license: a code was issued', (await codeCount(operator)) >= 1);

  // ── D. Unknown license key → NO code (even for a plausible email)
  const rD = await requestPOST(post(REQ, { email: unknownLicEmail, licenseKey: 'NTCB-UNKNOWN-KEY' }));
  check('unknown license: still 200 (generic)', rD.status === 200, rD.status);
  check('unknown license: NO code issued', (await codeCount(unknownLicEmail)) === 0);

  // ── E. Valid license but email NOT on it → NO code
  await requestPOST(post(REQ, { email: wrongEmail, licenseKey: key }));
  check('valid license + unassociated email: NO code issued', (await codeCount(wrongEmail)) === 0);

  // ── F. Verify with correct code + matching license → verified, code consumed
  const codeF = await seedCode(verifyEmail);
  const vF = await verifyPOST(post(VER, { email: verifyEmail, code: codeF, licenseKey: key }));
  const vFj = await vF.json();
  check('verify: matching license + correct code → verified', vF.status === 200 && vFj.verified === true, vFj);
  const consumed = await prisma.passwordResetCode.findFirst({
    where: { email: verifyEmail.toLowerCase() }, orderBy: { createdAt: 'desc' }, select: { consumedAt: true }
  });
  check('verify: the code was consumed', consumed?.consumedAt != null, consumed);

  // ── G. Verify with correct code but WRONG license → rejected, NOT consumed
  const codeG = await seedCode(verifyEmail);
  const vG = await verifyPOST(post(VER, { email: verifyEmail, code: codeG, licenseKey: 'NTCB-WRONG-KEY' }));
  const vGj = await vG.json();
  check('verify: wrong license → NOT verified', vGj.verified !== true, vGj);
  const latest = await prisma.passwordResetCode.findFirst({
    where: { email: verifyEmail.toLowerCase() }, orderBy: { createdAt: 'desc' }, select: { consumedAt: true }
  });
  check('verify: wrong license did NOT consume the code', latest?.consumedAt == null, latest);

  // Cleanup.
  await prisma.passwordResetCode.deleteMany({ where: { email: { in: allEmails.map((e) => e.toLowerCase()) } } });
  await prisma.purchase.deleteMany({ where: { email: owner } });

  console.log(`\n${passed} passed, ${failed} failed`);
  await prisma.$disconnect();
  if (failed > 0) process.exit(1);
}

main().catch(async (err) => {
  console.error('Password-reset run crashed:', err);
  try { await prisma.$disconnect(); } catch { /* ignore */ }
  process.exit(1);
});
