/**
 * Finds a REAL license key that the /api/software/latest endpoint will accept.
 *
 * A key works only if ALL of these are true:
 *   1. Purchase.licenseKeyHash exists  (we look it up by hash)
 *   2. Purchase.licenseStatus === 'active'
 *   3. A Contact exists with the same email
 *   4. That Contact has >= 1 ContactSoftware row (else response is { software: [] })
 *
 * Run:  npx tsx scripts/get-real-license-key.ts
 *
 * Pass --seed to create a guaranteed-working test purchase if none qualifies:
 *       npx tsx scripts/get-real-license-key.ts --seed
 */
import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';

async function findUsableKey() {
  // Only purchases that still have the plaintext key stored.
  const purchases = await prisma.purchase.findMany({
    where: { licenseStatus: 'active', licenseKey: { not: null } },
    select: { id: true, email: true, licenseKey: true, systemFingerprint: true, processorId: true }
  });

  for (const p of purchases) {
    const contact = await prisma.contact.findFirst({
      where: { email: { equals: p.email, mode: 'insensitive' } },
      select: { id: true }
    });
    if (!contact) continue;

    const swCount = await prisma.contactSoftware.count({ where: { contactId: contact.id } });
    if (swCount === 0) continue;

    return { key: p.licenseKey!, email: p.email, swCount, bound: !!(p.systemFingerprint || p.processorId) };
  }
  return null;
}

async function seed() {
  const email = `license-test+${Date.now()}@edgebic.test`;

  const contact = await prisma.contact.create({
    data: { name: 'License Test User', email }
  });

  await prisma.contactSoftware.create({
    data: {
      contactId: contact.id,
      name: 'NTClipboard',
      latestVersion: '1.4.2',
      downloadUrl: 'https://downloads.edgebic.com/ntclipboard/1.4.2/setup.exe'
    }
  });

  // Need a purchaseId before the key embeds it — create, then update.
  const purchase = await prisma.purchase.create({
    data: {
      email,
      customerName: 'License Test User',
      stripeSessionId: `seed_${Date.now()}`,
      amount: 0,
      status: 'completed',
      licenseStatus: 'active'
    }
  });

  const licenseKey = LicenseKeyGenerator.generateLicenseKey(purchase.id, email);
  await prisma.purchase.update({
    where: { id: purchase.id },
    data: {
      licenseKey,
      licenseKeyHash: LicenseKeyGenerator.hashLicenseKey(licenseKey)
    }
  });

  return { key: licenseKey, email, swCount: 1, bound: false };
}

async function main() {
  let result = await findUsableKey();

  if (!result && process.argv.includes('--seed')) {
    console.log('No usable key found — seeding a test purchase...\n');
    result = await seed();
  }

  if (!result) {
    console.log(
      'No real key qualifies (need an active purchase whose email has ContactSoftware rows).\n' +
        'Re-run with --seed to create one:  npx tsx scripts/get-real-license-key.ts --seed'
    );
    return;
  }

  console.log('REAL license key:', result.key);
  console.log('Email           :', result.email);
  console.log('Software rows   :', result.swCount);
  if (result.bound) {
    console.log(
      '\nNOTE: this license is machine-bound — you must also send the matching\n' +
        '"processorId" in the body, or call from the original machine.'
    );
  }
  console.log('\nTest it:\n');
  console.log(
    `Invoke-RestMethod -Method Post -Uri "http://localhost:3001/api/software/latest" ` +
      `-ContentType "application/json" -Body '{ "licenseKey": "${result.key}" }'`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
