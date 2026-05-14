import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { type ContactPriority, type ContactTicketStatus } from '@prisma/client';

import {
  Caching,
  defaultRevalidateTimeInSeconds,
  OrganizationCacheKey
} from '@/data/caching';
import { type ClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';

export type ClientTicketListItemDto = {
  id: string;
  number: number;
  title: string;
  description: string | null;
  status: ContactTicketStatus;
  priority: ContactPriority;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Returns the tickets visible to a client, scoped to their linked contact.
 *
 * Cache key is shared with the admin-side ticket views so server actions that
 * revalidate `OrganizationCacheKey.ContactTickets` (reply, status change, etc.)
 * also invalidate this view automatically.
 */
export async function getClientTickets(
  link: ClientContactLink
): Promise<ClientTicketListItemDto[]> {
  const raw = await cache(
    async () => {
      const rows = await prisma.contactTicket.findMany({
        where: { contactId: link.contactId },
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          number: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return rows;
    },
    Caching.createOrganizationKeyParts(
      OrganizationCacheKey.ContactTickets,
      link.organizationId,
      'client-list',
      link.contactId
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactTickets,
          link.organizationId
        ),
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactTickets,
          link.organizationId,
          link.contactId
        )
      ]
    }
  )();

  // unstable_cache JSON-serializes; re-hydrate Dates.
  return raw.map((r) => ({
    ...r,
    createdAt: new Date(r.createdAt),
    updatedAt: new Date(r.updatedAt)
  }));
}
