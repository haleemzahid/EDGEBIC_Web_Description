import 'server-only';

import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';

import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { ValidationError } from '@/lib/validation/exceptions';
import {
  AssigneeAll,
  AssigneeMe,
  AssigneeUnassigned,
  getTicketsSchema,
  PriorityAll,
  StatusAll,
  type GetTicketsSchema
} from '@/schemas/tickets/get-tickets-schema';
import type { OrganizationTicketRowDto } from '@/types/dtos/contact-ticket-dto';

export async function getTickets(input: GetTicketsSchema): Promise<{
  tickets: OrganizationTicketRowDto[];
  filteredCount: number;
  totalCount: number;
}> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const result = getTicketsSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsedInput = result.data;

  // "#123" → exact ticket-number lookup; otherwise text search in title/description.
  const hashMatch = parsedInput.searchQuery.match(/^#?(\d+)$/);
  const numberQuery = hashMatch ? parseInt(hashMatch[1], 10) : undefined;
  const textCriteria: Prisma.StringFilter | undefined =
    parsedInput.searchQuery && !numberQuery
      ? { contains: parsedInput.searchQuery, mode: 'insensitive' }
      : undefined;

  const searchVector: Prisma.ContactTicketWhereInput | undefined = numberQuery
    ? { number: numberQuery }
    : textCriteria
      ? {
          OR: [
            { title: textCriteria },
            { description: textCriteria },
            { contact: { name: textCriteria } }
          ]
        }
      : undefined;

  const assigneeFilter: Prisma.ContactTicketWhereInput | undefined =
    parsedInput.assignee === AssigneeAll
      ? undefined
      : parsedInput.assignee === AssigneeMe
        ? { assigneeUserId: session.user.id }
        : parsedInput.assignee === AssigneeUnassigned
          ? { assigneeUserId: null }
          : { assigneeUserId: parsedInput.assignee };

  const baseWhere: Prisma.ContactTicketWhereInput = {
    contact: {
      organizationId: session.user.organizationId
    },
    status:
      parsedInput.status === StatusAll ? undefined : parsedInput.status,
    priority:
      parsedInput.priority === PriorityAll ? undefined : parsedInput.priority,
    ...(assigneeFilter ?? {}),
    ...(searchVector ?? {})
  };

  const totalWhere: Prisma.ContactTicketWhereInput = {
    contact: {
      organizationId: session.user.organizationId
    }
  };

  const [tickets, filteredCount, totalCount] = await prisma.$transaction([
    prisma.contactTicket.findMany({
      skip: parsedInput.pageIndex * parsedInput.pageSize,
      take: parsedInput.pageSize,
      where: baseWhere,
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
        contact: {
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
        }
      },
      orderBy: {
        [parsedInput.sortBy]: parsedInput.sortDirection
      }
    }),
    prisma.contactTicket.count({ where: baseWhere }),
    prisma.contactTicket.count({ where: totalWhere })
  ]);

  const mapped: OrganizationTicketRowDto[] = tickets.map((t) => ({
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
    meetingId: t.meetingId ?? undefined,
    meetingTitle: t.meeting?.title,
    meetingStartsAt: t.meeting?.startsAt,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
    contactName: t.contact.name,
    contactImage: t.contact.image ?? undefined
  }));

  return { tickets: mapped, filteredCount, totalCount };
}
