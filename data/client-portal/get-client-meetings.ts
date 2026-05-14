import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { type ContactMeetingStatus } from '@prisma/client';

import {
  Caching,
  defaultRevalidateTimeInSeconds,
  OrganizationCacheKey
} from '@/data/caching';
import { type ClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';

export type ClientMeetingDbDto = {
  id: string;
  title: string;
  description: string | null;
  startsAt: Date;
  endsAt: Date;
  location: string | null;
  status: ContactMeetingStatus;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Returns the DB-stored meetings for this client. The caller is expected to
 * merge in Calendly-sourced meetings separately (those have no cache key
 * since they come from the external API).
 */
export async function getClientMeetings(
  link: ClientContactLink
): Promise<ClientMeetingDbDto[]> {
  const raw = await cache(
    async () => {
      return prisma.contactMeeting.findMany({
        where: { contactId: link.contactId },
        orderBy: { startsAt: 'desc' },
        select: {
          id: true,
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
    },
    Caching.createOrganizationKeyParts(
      OrganizationCacheKey.ContactMeetings,
      link.organizationId,
      'client-list',
      link.contactId
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactMeetings,
          link.organizationId
        ),
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactMeetings,
          link.organizationId,
          link.contactId
        )
      ]
    }
  )();

  return raw.map((r) => ({
    ...r,
    startsAt: new Date(r.startsAt),
    endsAt: new Date(r.endsAt),
    createdAt: new Date(r.createdAt),
    updatedAt: new Date(r.updatedAt)
  }));
}
