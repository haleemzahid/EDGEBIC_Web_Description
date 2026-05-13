'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { uploadContactMeetingFileSchema } from '@/schemas/contacts/upload-contact-meeting-file-schema';

export const uploadContactMeetingFile = authActionClient
  .metadata({ actionName: 'uploadContactMeetingFile' })
  .schema(uploadContactMeetingFileSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const meeting = await prisma.contactMeeting.findFirst({
      where: {
        id: parsedInput.meetingId,
        contact: {
          organizationId: session.user.organizationId
        }
      },
      select: { id: true }
    });
    if (!meeting) {
      throw new NotFoundError('Meeting not found');
    }

    const data = Buffer.from(parsedInput.dataBase64, 'base64');

    const file = await prisma.contactMeetingFile.create({
      data: {
        meetingId: meeting.id,
        uploadedById: session.user.id,
        name: parsedInput.name,
        contentType: parsedInput.contentType,
        size: parsedInput.size,
        data
      },
      select: { id: true }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactMeetingFiles,
        session.user.organizationId,
        meeting.id
      )
    );

    return { fileId: file.id };
  });
