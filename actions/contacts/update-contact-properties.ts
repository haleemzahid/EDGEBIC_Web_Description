'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey, UserCacheKey } from '@/data/caching';
import { updateContactAndCaptureEvent } from '@/lib/db/contact-event-capture';
import { prisma } from '@/lib/db/prisma';
import { syncContactUpdateToHubSpot } from '@/lib/hubspot';
import { NotFoundError } from '@/lib/validation/exceptions';
import { updateContactPropertiesSchema } from '@/schemas/contacts/update-contact-properties-schema';

export const updateContactProperties = authActionClient
  .metadata({ actionName: 'updateContactProperties' })
  .schema(updateContactPropertiesSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const count = await prisma.contact.count({
      where: {
        organizationId: session.user.organizationId,
        id: parsedInput.id
      }
    });
    if (count < 1) {
      throw new NotFoundError('Contact not found');
    }

    await updateContactAndCaptureEvent(
      parsedInput.id,
      {
        record: parsedInput.record,
        name: parsedInput.name,
        email: parsedInput.email || null,
        address: parsedInput.address || null,
        phone: parsedInput.phone || null,
        jobTitle: parsedInput.jobTitle || null,
        company: parsedInput.company || null,
        website: parsedInput.website || null,
        linkedIn: parsedInput.linkedIn || null,
        country: parsedInput.country || null,
        timezone: parsedInput.timezone || null,
        leadSource: parsedInput.leadSource || null,
        leadSourceDate: parsedInput.leadSourceDate ?? null,
        stripeCustomerId: parsedInput.stripeCustomerId || null,
        lastContactedAt: parsedInput.lastContactedAt ?? null,
        lastContactedNote: parsedInput.lastContactedNote || null,
        lastMeetingAt: parsedInput.lastMeetingAt ?? null,
        lastMeetingNote: parsedInput.lastMeetingNote || null
      },
      session.user.id
    );

    // Sync updates to HubSpot (non-blocking)
    if (parsedInput.email) {
      syncContactUpdateToHubSpot(parsedInput.email, {
        name: parsedInput.name,
        email: parsedInput.email,
        phone: parsedInput.phone,
        address: parsedInput.address,
        record: parsedInput.record
      }).catch((error) => {
        console.error('Failed to sync contact update to HubSpot:', error);
      });
    }

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Contacts,
        session.user.organizationId
      )
    );
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Contact,
        session.user.organizationId,
        parsedInput.id
      )
    );
    revalidateTag(
      Caching.createUserTag(UserCacheKey.Favorites, session.user.id)
    );
  });
