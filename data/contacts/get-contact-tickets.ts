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
  getContactTicketsSchema,
  type GetContactTicketsSchema
} from '@/schemas/contacts/get-contact-tickets-schema';
import type { ContactTicketDto } from '@/types/dtos/contact-ticket-dto';
import { SortDirection } from '@/types/sort-direction';

export async function getContactTickets(
  input: GetContactTicketsSchema
): Promise<ContactTicketDto[]> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const result = getContactTicketsSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsedInput = result.data;

  return cache(
    async () => {
      const tickets = await prisma.contactTicket.findMany({
        where: {
          contactId: parsedInput.contactId,
          contact: {
            organizationId: session.user.organizationId
          }
        },
        select: {
          id: true,
          number: true,
          contactId: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          assigneeUserId: true,
          createdAt: true,
          updatedAt: true,
          assignee: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        },
        orderBy: {
          createdAt: SortDirection.Desc
        }
      });

      const mapped: ContactTicketDto[] = tickets.map((t) => ({
        id: t.id,
        number: t.number,
        contactId: t.contactId,
        title: t.title,
        description: t.description ?? undefined,
        status: t.status,
        priority: t.priority,
        assigneeUserId: t.assigneeUserId ?? undefined,
        assigneeName: t.assignee?.name,
        assigneeImage: t.assignee?.image ?? undefined,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt
      }));

      return mapped;
    },
    Caching.createOrganizationKeyParts(
      OrganizationCacheKey.ContactTickets,
      session.user.organizationId,
      parsedInput.contactId
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactTickets,
          session.user.organizationId,
          parsedInput.contactId
        )
      ]
    }
  )();
}
