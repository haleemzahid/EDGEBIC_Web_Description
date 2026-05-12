'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { deleteContactMeetingSchema } from '@/schemas/contacts/delete-contact-meeting-schema';

export const deleteContactMeeting = authActionClient
  .metadata({ actionName: 'deleteContactMeeting' })
  .schema(deleteContactMeetingSchema)
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

    await prisma.contactMeeting.delete({
      where: { id: existing.id }
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
