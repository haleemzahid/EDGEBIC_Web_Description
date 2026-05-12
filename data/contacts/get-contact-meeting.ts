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
import { NotFoundError, ValidationError } from '@/lib/validation/exceptions';
import {
  getContactMeetingSchema,
  type GetContactMeetingSchema
} from '@/schemas/contacts/get-contact-meeting-schema';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';

export async function getContactMeeting(
  input: GetContactMeetingSchema
): Promise<ContactMeetingDto & { contactId: string }> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const result = getContactMeetingSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsedInput = result.data;

  const raw = await cache(
    async () => {
      const meeting = await prisma.contactMeeting.findFirst({
        where: {
          id: parsedInput.id,
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
        }
      });

      if (!meeting) {
        throw new NotFoundError('Meeting not found');
      }

      return {
        id: meeting.id,
        contactId: meeting.contactId,
        title: meeting.title,
        description: meeting.description ?? undefined,
        startsAt: meeting.startsAt,
        endsAt: meeting.endsAt,
        location: meeting.location ?? undefined,
        status: meeting.status,
        createdAt: meeting.createdAt,
        updatedAt: meeting.updatedAt
      };
    },
    Caching.createOrganizationKeyParts(
      OrganizationCacheKey.ContactMeetings,
      session.user.organizationId,
      'one',
      parsedInput.id
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactMeetings,
          session.user.organizationId
        )
      ]
    }
  )();

  // unstable_cache JSON-serializes the result, so Date objects become ISO
  // strings on cache hits. Re-hydrate them so consumers get real Date instances.
  return {
    ...raw,
    startsAt: new Date(raw.startsAt),
    endsAt: new Date(raw.endsAt),
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt)
  };
}
