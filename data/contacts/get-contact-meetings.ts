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
  getContactMeetingsSchema,
  type GetContactMeetingsSchema
} from '@/schemas/contacts/get-contact-meetings-schema';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import { SortDirection } from '@/types/sort-direction';

export async function getContactMeetings(
  input: GetContactMeetingsSchema
): Promise<ContactMeetingDto[]> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const result = getContactMeetingsSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsedInput = result.data;

  return cache(
    async () => {
      const meetings = await prisma.contactMeeting.findMany({
        where: {
          contactId: parsedInput.contactId,
          contact: {
            organizationId: session.user.organizationId
          }
        },
        select: {
          id: true,
          contactId: true,
          title: true,
          description: true,
          startsAt: true,
          endsAt: true,
          location: true,
          status: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: {
          startsAt: SortDirection.Desc
        }
      });

      const mapped: ContactMeetingDto[] = meetings.map((m) => ({
        id: m.id,
        contactId: m.contactId,
        title: m.title,
        description: m.description ?? undefined,
        startsAt: m.startsAt,
        endsAt: m.endsAt,
        location: m.location ?? undefined,
        status: m.status,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt
      }));

      return mapped;
    },
    Caching.createOrganizationKeyParts(
      OrganizationCacheKey.ContactMeetings,
      session.user.organizationId,
      parsedInput.contactId
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactMeetings,
          session.user.organizationId,
          parsedInput.contactId
        )
      ]
    }
  )();
}
