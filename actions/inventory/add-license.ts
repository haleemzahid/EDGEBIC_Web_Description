'use server';

import crypto from 'crypto';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import { PreConditionError } from '@/lib/validation/exceptions';
import { addLicenseSchema } from '@/schemas/inventory/add-license-schema';

// Admin issues a license by email. The key is typed manually (no
// auto-generation) but hashed with the same LicenseKeyGenerator the Stripe
// flow uses, so validation/activation keep working. Licenses live on the
// Purchase model.
//
// - Email already has a license  -> update that license key (no duplicate).
// - Email has no license yet     -> create one directly (CRM match optional;
//                                   if the email exists in CRM we reuse the
//                                   contact's name).
export const addLicense = authActionClient
  .metadata({ actionName: 'addLicense' })
  .schema(addLicenseSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const email = parsedInput.email.trim().toLowerCase();
    const licenseKey = parsedInput.licenseKey.trim();
    const licenseKeyHash = LicenseKeyGenerator.hashLicenseKey(licenseKey);

    // One license per user: reuse any existing license row for this email.
    const existing = await prisma.purchase.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
      select: { id: true, customerName: true }
    });

    // The key hash is globally unique. Block it if another (different)
    // license already uses this exact key.
    const keyOwner = await prisma.purchase.findUnique({
      where: { licenseKeyHash },
      select: { id: true }
    });
    if (keyOwner && keyOwner.id !== existing?.id) {
      throw new PreConditionError(
        'That license key is already assigned to another license. Enter a different key.'
      );
    }

    // Link to a CRM contact by email. If the email isn't in CRM yet, add it
    // directly so the customer is visible in CRM and the software-update
    // write-back has a contact to attach to.
    let contact = await prisma.contact.findFirst({
      where: {
        organizationId: session.user.organizationId,
        email: { equals: email, mode: 'insensitive' }
      },
      select: { id: true, name: true }
    });
    let contactCreated = false;
    if (!contact) {
      const derivedName = email.split('@')[0]?.trim() || email;
      contact = await prisma.contact.create({
        data: {
          organizationId: session.user.organizationId,
          name: derivedName,
          email
        },
        select: { id: true, name: true }
      });
      contactCreated = true;
    }
    const customerName = contact.name || existing?.customerName || email;

    // New CRM contact added — refresh the cached Contacts list so it shows
    // up without a manual reload.
    if (contactCreated) {
      revalidateTag(
        Caching.createOrganizationTag(
          OrganizationCacheKey.Contacts,
          session.user.organizationId
        )
      );
    }

    if (existing) {
      await prisma.purchase.update({
        where: { id: existing.id },
        data: {
          customerName,
          licenseKey,
          licenseKeyHash,
          licenseStatus: 'active',
          status: 'completed'
        }
      });
      return;
    }

    await prisma.purchase.create({
      data: {
        email,
        customerName,
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
