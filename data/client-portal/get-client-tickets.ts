import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import {
  Prisma,
  type ContactPriority,
  type ContactTicketStatus
} from '@prisma/client';

import {
  Caching,
  defaultRevalidateTimeInSeconds,
  OrganizationCacheKey
} from '@/data/caching';
import { type ClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';
import { ValidationError } from '@/lib/validation/exceptions';
import {
  ClientTicketsPriorityAll,
  ClientTicketsStatusAll,
  getClientTicketsSchema,
  type GetClientTicketsSchema
} from '@/schemas/client-portal/get-client-tickets-schema';

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
 * Returns ALL tickets visible to a client, scoped to their linked contact.
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

  return raw.map((r) => ({
    ...r,
    createdAt: new Date(r.createdAt),
    updatedAt: new Date(r.updatedAt)
  }));
}

export type GetClientTicketsListResult = {
  tickets: ClientTicketListItemDto[];
  filteredCount: number;
  totalCount: number;
};

/**
 * Filtered, paginated, search-aware version of {@link getClientTickets}.
 * Not cached (filters too varied + client polls every 10s for fresh data).
 */
export async function getClientTicketsList(
  link: ClientContactLink,
  input: GetClientTicketsSchema
): Promise<GetClientTicketsListResult> {
  const result = getClientTicketsSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsed = result.data;

  const trimmed = parsed.searchQuery.trim();
  const numberMatch = trimmed.match(/^#?(\d+)$/);
  const searchedNumber = numberMatch ? Number(numberMatch[1]) : null;

  const baseFilter: Prisma.ContactTicketWhereInput = {
    contactId: link.contactId
  };

  const textSearch: Prisma.ContactTicketWhereInput | undefined = trimmed
    ? {
        OR: [
          ...(searchedNumber !== null ? [{ number: searchedNumber }] : []),
          { title: { contains: trimmed, mode: 'insensitive' as const } },
          {
            description: {
              contains: trimmed,
              mode: 'insensitive' as const
            }
          }
        ]
      }
    : undefined;

  const where: Prisma.ContactTicketWhereInput = {
    AND: [
      baseFilter,
      parsed.status === ClientTicketsStatusAll
        ? {}
        : { status: parsed.status },
      parsed.priority === ClientTicketsPriorityAll
        ? {}
        : { priority: parsed.priority },
      textSearch ?? {}
    ]
  };

  const [rows, filteredCount, totalCount] = await prisma.$transaction([
    prisma.contactTicket.findMany({
      skip: parsed.pageIndex * parsed.pageSize,
      take: parsed.pageSize,
      where,
      select: {
        id: true,
        number: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { [parsed.sortBy]: parsed.sortDirection }
    }),
    prisma.contactTicket.count({ where }),
    prisma.contactTicket.count({ where: baseFilter })
  ]);

  return {
    tickets: rows.map((r) => ({
      ...r,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt)
    })),
    filteredCount,
    totalCount
  };
}
