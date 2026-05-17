/**
 * Throwaway seed for manually testing POST /api/software/latest.
 *
 * Inserts (idempotently) a dummy active license + a dummy contact + a dummy
 * software row, all linked the same way the real flow links them
 * (licenseKey -> hash -> Purchase -> email -> Contact -> ContactSoftware).
 *
 * Run it yourself:   npx tsx seed-dummy-software-api.ts
 * Then test with the DUMMY_KEY printed at the end.
 *
 * This writes test rows to your dev DB. Cleanup instructions are printed too.
 */
import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';

const DUMMY_KEY = 'TEST-DUMMY-KEY-0001';
const DUMMY_EMAIL = 'dummy-test@example.com';
const DUMMY_PRODUCT = 'Dummy Product';
const DUMMY_DESCRIPTION =
  'Dummy Product is a test entry for the software-update endpoint. ' +
  'This text is returned as the "description" field so you can verify ' +
  'the API surfaces product information correctly.';
const DUMMY_SESSION = 'dummy-session-software-api-test';

async function main() {
  const licenseKeyHash = LicenseKeyGenerator.hashLicenseKey(DUMMY_KEY);

  const organization = await prisma.organization.findFirst({
    select: { id: true }
  });
  if (!organization) {
    console.error(
      'No Organization found in the DB — cannot create a dummy Contact. ' +
        'Create/seed an organization first.'
    );
    process.exit(1);
  }

  // 1. Dummy contact (no unique email constraint, so find-or-create).
  let contact = await prisma.contact.findFirst({
    where: { email: DUMMY_EMAIL, organizationId: organization.id },
    select: { id: true }
  });
  if (!contact) {
    contact = await prisma.contact.create({
      data: {
        organizationId: organization.id,
        name: 'Dummy Test Contact',
        email: DUMMY_EMAIL
      },
      select: { id: true }
    });
  }

  // 2. Dummy software row for that contact.
  const existingSoftware = await prisma.contactSoftware.findFirst({
    where: { contactId: contact.id, name: DUMMY_PRODUCT },
    select: { id: true }
  });
  if (existingSoftware) {
    // Keep the description in sync on re-runs.
    await prisma.contactSoftware.update({
      where: { id: existingSoftware.id },
      data: { notes: DUMMY_DESCRIPTION }
    });
  } else {
    await prisma.contactSoftware.create({
      data: {
        contactId: contact.id,
        name: DUMMY_PRODUCT,
        installedVersion: '9.0.0',
        latestVersion: '9.9.9',
        downloadUrl: 'https://example.com/dummy-setup-9.9.9.exe',
        // Returned as "description" by POST /api/software/latest.
        notes: DUMMY_DESCRIPTION
      }
    });
  }

  // 3. Dummy ACTIVE license whose email matches the dummy contact.
  await prisma.purchase.upsert({
    where: { licenseKeyHash },
    create: {
      email: DUMMY_EMAIL,
      customerName: 'Dummy Tester',
      stripeSessionId: DUMMY_SESSION,
      amount: 0,
      licenseKey: DUMMY_KEY,
      licenseKeyHash,
      licenseStatus: 'active'
    },
    update: {
      licenseStatus: 'active',
      email: DUMMY_EMAIL
    }
  });

  console.log('\nDummy data ready.\n');
  console.log('Test it (PowerShell):');
  console.log(
    `Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/software/latest" -ContentType "application/json" -Body '{ "licenseKey": "${DUMMY_KEY}" }'`
  );
  console.log('\nExpected: software list with the "Dummy Product" entry.\n');
  console.log(
    'Cleanup later (Prisma Studio or SQL): delete the Purchase with ' +
      `stripeSessionId="${DUMMY_SESSION}", the Contact email="${DUMMY_EMAIL}", ` +
      'and its ContactSoftware rows.'
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
