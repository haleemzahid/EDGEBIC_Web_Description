'use server';

import crypto from 'crypto';

import { authActionClient } from '@/actions/safe-action';
import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import { PreConditionError } from '@/lib/validation/exceptions';
import { addLicenseSchema } from '@/schemas/inventory/add-license-schema';

// Lets an admin manually issue a license for a CRM contact. The key is
// typed by the admin (no auto-generation) but still hashed with the same
// LicenseKeyGenerator the Stripe flow uses, so license validation and
// activation keep working unchanged. Stored as a completed Purchase since
// the License Inventory is built from Purchase rows.
export const addLicense = authActionClient
  .metadata({ actionName: 'addLicense' })
  .schema(addLicenseSchema)
  .action(async ({ parsedInput }) => {
    const licenseKey = parsedInput.licenseKey.trim();
    const licenseKeyHash = LicenseKeyGenerator.hashLicenseKey(licenseKey);

    const existing = await prisma.purchase.findUnique({
      where: { licenseKeyHash },
      select: { id: true }
    });
    if (existing) {
      throw new PreConditionError(
        'That license key already exists. Enter a different key.'
      );
    }

    await prisma.purchase.create({
      data: {
        email: parsedInput.email.toLowerCase(),
        customerName: parsedInput.customerName,
        amount: 0,
        currency: 'usd',
        status: 'completed',
        // Required @unique field with no default — synthesize one so the
        // manual license doesn't collide with real Stripe sessions.
        stripeSessionId: `manual-${crypto.randomUUID()}`,
        licenseKey,
        licenseKeyHash,
        licenseStatus: 'active'
      }
    });
  });
