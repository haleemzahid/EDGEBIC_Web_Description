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
  getContactTicketSchema,
  type GetContactTicketSchema
} from '@/schemas/contacts/get-contact-ticket-schema';
import type { ContactTicketWithDetailsDto } from '@/types/dtos/contact-ticket-dto';
import { SortDirection } from '@/types/sort-direction';

export async function getContactTicket(
  input: GetContactTicketSchema
): Promise<ContactTicketWithDetailsDto> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const result = getContactTicketSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsedInput = result.data;

  const raw = await cache(
    async () => {
      const ticket = await prisma.contactTicket.findFirst({
        where: {
          id: parsedInput.id,
          contact: {
            organizationId: session.user.organizationId
          }
        },
        select: {
          id: true,
          number: true,
          contactId: true,
          meetingId: true,
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
          },
          meeting: {
            select: {
              id: true,
              title: true,
              startsAt: true
            }
          },
          messages: {
            select: {
              id: true,
              ticketId: true,
              senderType: true,
              senderUserId: true,
              senderName: true,
              body: true,
              isInternalNote: true,
              createdAt: true,
              senderUser: {
                select: { image: true }
              }
            },
            orderBy: { createdAt: SortDirection.Asc }
          },
          activities: {
            select: {
              id: true,
              ticketId: true,
              type: true,
              description: true,
              userId: true,
              createdAt: true,
              user: {
                select: { name: true }
              }
            },
            orderBy: { createdAt: SortDirection.Desc }
          }
        }
      });

      if (!ticket) {
        throw new NotFoundError('Ticket not found');
      }

      return {
        id: ticket.id,
        number: ticket.number,
        contactId: ticket.contactId,
        title: ticket.title,
        description: ticket.description ?? undefined,
        status: ticket.status,
        priority: ticket.priority,
        assigneeUserId: ticket.assigneeUserId ?? undefined,
        assigneeName: ticket.assignee?.name,
        assigneeImage: ticket.assignee?.image ?? undefined,
        meetingId: ticket.meetingId ?? undefined,
        meetingTitle: ticket.meeting?.title,
        meetingStartsAt: ticket.meeting?.startsAt,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        messages: ticket.messages.map((m) => ({
          id: m.id,
          ticketId: m.ticketId,
          senderType: m.senderType,
          senderUserId: m.senderUserId ?? undefined,
          senderName: m.senderName,
          senderImage: m.senderUser?.image ?? undefined,
          body: m.body,
          isInternalNote: m.isInternalNote,
          createdAt: m.createdAt
        })),
        activities: ticket.activities.map((a) => ({
          id: a.id,
          ticketId: a.ticketId,
          type: a.type,
          description: a.description,
          userId: a.userId ?? undefined,
          userName: a.user?.name,
          createdAt: a.createdAt
        }))
      };
    },
    Caching.createOrganizationKeyParts(
      OrganizationCacheKey.ContactTickets,
      session.user.organizationId,
      'one',
      parsedInput.id
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactTickets,
          session.user.organizationId
        ),
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactTickets,
          session.user.organizationId,
          parsedInput.contactId
        )
      ]
    }
  )();

  // unstable_cache JSON-serializes; re-hydrate Date fields.
  return {
    ...raw,
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
    meetingStartsAt: raw.meetingStartsAt
      ? new Date(raw.meetingStartsAt)
      : undefined,
    messages: raw.messages.map((m) => ({
      ...m,
      createdAt: new Date(m.createdAt)
    })),
    activities: raw.activities.map((a) => ({
      ...a,
      createdAt: new Date(a.createdAt)
    }))
  };
}
