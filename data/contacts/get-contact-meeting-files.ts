import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  Caching,
  defaultRevalidateTimeInSeconds,
  OrganizationCacheKey
} from '@/data/caching';
import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { ValidationError } from '@/lib/validation/exceptions';
import {
  getContactMeetingFilesSchema,
  type GetContactMeetingFilesSchema
} from '@/schemas/contacts/get-contact-meeting-files-schema';
import type { ContactMeetingFileDto } from '@/types/dtos/contact-meeting-file-dto';
import { SortDirection } from '@/types/sort-direction';

export async function getContactMeetingFiles(
  input: GetContactMeetingFilesSchema
): Promise<ContactMeetingFileDto[]> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const result = getContactMeetingFilesSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsedInput = result.data;

  const raw = await cache(
    async () => {
      const files = await prisma.contactMeetingFile.findMany({
        where: {
          meetingId: parsedInput.meetingId,
          meeting: {
            contact: {
              organizationId: session.user.organizationId
            }
          }
        },
        select: {
          id: true,
          meetingId: true,
          name: true,
          contentType: true,
          size: true,
          uploadedById: true,
          createdAt: true,
          uploadedBy: {
            select: { name: true }
          }
        },
        orderBy: {
          createdAt: SortDirection.Desc
        }
      });

      return files.map<ContactMeetingFileDto>((f) => ({
        id: f.id,
        meetingId: f.meetingId,
        name: f.name,
        contentType: f.contentType,
        size: f.size,
        uploadedByUserId: f.uploadedById ?? undefined,
        uploadedByName: f.uploadedBy?.name,
        createdAt: f.createdAt
      }));
    },
    Caching.createOrganizationKeyParts(
      OrganizationCacheKey.ContactMeetingFiles,
      session.user.organizationId,
      parsedInput.meetingId
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactMeetingFiles,
          session.user.organizationId,
          parsedInput.meetingId
        )
      ]
    }
  )();

  return raw.map((f) => ({
    ...f,
    createdAt: new Date(f.createdAt)
  }));
}
