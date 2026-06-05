'use server';

import crypto from 'crypto';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { isAdmin } from '@/lib/auth/permissions';
import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import {
  ForbiddenError,
  GatewayError,
  PreConditionError
} from '@/lib/validation/exceptions';
import { approveLicenseRequestsSchema } from '@/schemas/licenses/approve-license-requests-schema';

// Approve a batch of pending desktop license requests by minting ONE key for
// the whole batch. Seats default to the number of approved devices. Every
// requester + operator email is registered on the new license's roster, each
// request is linked to the issued purchase, and the owner is added to CRM.
// Returns the new key so the dashboard can show/copy it.
export const approveLicenseRequests = authActionClient
  .metadata({ actionName: 'approveLicenseRequests' })
  .schema(approveLicenseRequestsSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    if (!(await isAdmin(session.user.id))) {
      throw new ForbiddenError('Only admins can approve license requests.');
    }

    const organizationId = session.user.organizationId;

    const result = await prisma.$transaction(async (tx) => {
      // Re-read inside the transaction so two admins can't double-approve.
      const pending = await tx.licenseRequest.findMany({
        where: { id: { in: parsedInput.requestIds }, status: 'pending' }
      });
      if (pending.length === 0) {
        throw new PreConditionError(
          'None of the selected requests are still pending.'
        );
      }

      const owner = pending[0];
      const ownerEmail = owner.email.trim().toLowerCase();
      const customerName =
        owner.customerName?.trim() || ownerEmail.split('@')[0] || ownerEmail;
      const seats = parsedInput.seats ?? pending.length;

      // Mint a globally-unique key (lookups go by SHA-256 hash).
      let licenseKey = '';
      let licenseKeyHash = '';
      for (let attempt = 0; attempt < 5; attempt++) {
        const candidate = LicenseKeyGenerator.generateLicenseKey(
          crypto.randomUUID(),
          ownerEmail
        );
        const candidateHash = LicenseKeyGenerator.hashLicenseKey(candidate);
        const clash = await tx.purchase.findUnique({
          where: { licenseKeyHash: candidateHash },
          select: { id: true }
        });
        if (!clash) {
          licenseKey = candidate;
          licenseKeyHash = candidateHash;
          break;
        }
      }
      if (!licenseKey) {
        throw new GatewayError(
          'Could not generate a unique license key. Please try again.'
        );
      }

      const purchase = await tx.purchase.create({
        data: {
          email: ownerEmail,
          customerName,
          amount: 0,
          currency: 'usd',
          status: 'completed',
          // Synthesized so the manually-issued license doesn't collide with
          // real Stripe sessions (same convention as add-license).
          stripeSessionId: `manual-${crypto.randomUUID()}`,
          licenseKey,
          licenseKeyHash,
          licenseStatus: 'active',
          seats
        }
      });

      // Pre-register every requester + operator on the roster.
      const rosterEmails = Array.from(
        new Set(
          pending
            .flatMap((p) => [p.email, ...p.operatorEmails])
            .map((e) => e.trim().toLowerCase())
            .filter(Boolean)
        )
      );
      for (const email of rosterEmails) {
        await tx.licenseUser.upsert({
          where: { purchaseId_email: { purchaseId: purchase.id, email } },
          update: {},
          create: { purchaseId: purchase.id, email }
        });
      }

      await tx.licenseRequest.updateMany({
        where: { id: { in: pending.map((p) => p.id) } },
        data: {
          status: 'approved',
          purchaseId: purchase.id,
          reviewedByUserId: session.user.id,
          reviewedAt: new Date()
        }
      });

      // Link the owner to CRM (so the customer is visible + software write-back
      // has a contact). Mirrors actions/inventory/add-license.ts.
      let contactCreated = false;
      const contact = await tx.contact.findFirst({
        where: {
          organizationId,
          email: { equals: ownerEmail, mode: 'insensitive' }
        },
        select: { id: true }
      });
      if (!contact) {
        await tx.contact.create({
          data: { organizationId, name: customerName, email: ownerEmail }
        });
        contactCreated = true;
      }

      return {
        purchaseId: purchase.id,
        licenseKey,
        seats,
        approvedCount: pending.length,
        contactCreated
      };
    });

    if (result.contactCreated) {
      revalidateTag(
        Caching.createOrganizationTag(
          OrganizationCacheKey.Contacts,
          organizationId
        )
      );
    }

    return {
      purchaseId: result.purchaseId,
      licenseKey: result.licenseKey,
      seats: result.seats,
      approvedCount: result.approvedCount
    };
  });
