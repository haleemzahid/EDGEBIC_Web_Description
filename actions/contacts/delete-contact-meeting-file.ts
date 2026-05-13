'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { deleteContactMeetingFileSchema } from '@/schemas/contacts/delete-contact-meeting-file-schema';

export const deleteContactMeetingFile = authActionClient
  .metadata({ actionName: 'deleteContactMeetingFile' })
  .schema(deleteContactMeetingFileSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const existing = await prisma.contactMeetingFile.findFirst({
      where: {
        id: parsedInput.id,
        meeting: {
          contact: {
            organizationId: session.user.organizationId
          }
        }
      },
      select: { id: true, meetingId: true }
    });
    if (!existing) {
      throw new NotFoundError('File not found');
    }

    await prisma.contactMeetingFile.delete({
      where: { id: existing.id }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactMeetingFiles,
        session.user.organizationId,
        existing.meetingId
      )
    );
  });
