'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { updateContactMeetingSchema } from '@/schemas/contacts/update-contact-meeting-schema';

export const updateContactMeeting = authActionClient
  .metadata({ actionName: 'updateContactMeeting' })
  .schema(updateContactMeetingSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const existing = await prisma.contactMeeting.findFirst({
      where: {
        id: parsedInput.id,
        contact: {
          organizationId: session.user.organizationId
        }
      },
      select: { id: true, contactId: true }
    });
    if (!existing) {
      throw new NotFoundError('Meeting not found');
    }

    await prisma.contactMeeting.update({
      where: { id: existing.id },
      data: {
        title: parsedInput.title,
        description: parsedInput.description || null,
        startsAt: parsedInput.startsAt,
        endsAt: parsedInput.endsAt,
        location: parsedInput.location || null,
        status: parsedInput.status
      }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactMeetings,
        session.user.organizationId,
        existing.contactId
      )
    );
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactNotes,
        session.user.organizationId,
        existing.contactId
      )
    );
  });
