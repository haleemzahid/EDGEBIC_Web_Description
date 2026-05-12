'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { addContactMeetingSchema } from '@/schemas/contacts/add-contact-meeting-schema';

export const addContactMeeting = authActionClient
  .metadata({ actionName: 'addContactMeeting' })
  .schema(addContactMeetingSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const count = await prisma.contact.count({
      where: {
        id: parsedInput.contactId,
        organizationId: session.user.organizationId
      }
    });
    if (count < 1) {
      throw new NotFoundError('Contact not found');
    }

    await prisma.contactMeeting.create({
      data: {
        contactId: parsedInput.contactId,
        title: parsedInput.title,
        description: parsedInput.description || null,
        startsAt: parsedInput.startsAt,
        endsAt: parsedInput.endsAt,
        location: parsedInput.location || null,
        status: parsedInput.status
      },
      select: { id: true }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactMeetings,
        session.user.organizationId,
        parsedInput.contactId
      )
    );
  });
