'use server';

import { revalidateTag } from 'next/cache';
import { ContactTicketActivityType } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { updateContactTicketSchema } from '@/schemas/contacts/update-contact-ticket-schema';

export const updateContactTicket = authActionClient
  .metadata({ actionName: 'updateContactTicket' })
  .schema(updateContactTicketSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const existing = await prisma.contactTicket.findFirst({
      where: {
        id: parsedInput.id,
        contact: {
          organizationId: session.user.organizationId
        }
      },
      select: {
        id: true,
        contactId: true,
        status: true,
        priority: true,
        assigneeUserId: true,
        meetingId: true
      }
    });
    if (!existing) {
      throw new NotFoundError('Ticket not found');
    }

    const nextAssigneeId =
      parsedInput.assigneeUserId === '' || parsedInput.assigneeUserId === null
        ? null
        : parsedInput.assigneeUserId;
    const nextMeetingId =
      parsedInput.meetingId === '' || parsedInput.meetingId === null
        ? null
        : (parsedInput.meetingId ?? null);

    await prisma.contactTicket.update({
      where: { id: existing.id },
      data: {
        title: parsedInput.title,
        description: parsedInput.description || null,
        status: parsedInput.status,
        priority: parsedInput.priority,
        assigneeUserId: nextAssigneeId,
        meetingId: nextMeetingId
      }
    });

    const activities: {
      ticketId: string;
      type: ContactTicketActivityType;
      description: string;
      userId: string;
    }[] = [];

    if (existing.status !== parsedInput.status) {
      activities.push({
        ticketId: existing.id,
        type: ContactTicketActivityType.STATUS_CHANGED,
        description: `Status changed from ${existing.status.toLowerCase()} to ${parsedInput.status.toLowerCase()}`,
        userId: session.user.id
      });
    }
    if (existing.priority !== parsedInput.priority) {
      activities.push({
        ticketId: existing.id,
        type: ContactTicketActivityType.PRIORITY_CHANGED,
        description: `Priority changed from ${existing.priority.toLowerCase()} to ${parsedInput.priority.toLowerCase()}`,
        userId: session.user.id
      });
    }
    if ((existing.assigneeUserId ?? null) !== nextAssigneeId) {
      let assigneeLabel = 'Unassigned';
      if (nextAssigneeId) {
        const assignee = await prisma.user.findUnique({
          where: { id: nextAssigneeId },
          select: { name: true }
        });
        assigneeLabel = assignee?.name ?? 'a teammate';
      }
      activities.push({
        ticketId: existing.id,
        type: ContactTicketActivityType.ASSIGNED,
        description:
          nextAssigneeId === null
            ? 'Unassigned'
            : `Assigned to ${assigneeLabel}`,
        userId: session.user.id
      });
    }

    if (activities.length > 0) {
      await prisma.contactTicketActivity.createMany({ data: activities });
    }

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactTickets,
        session.user.organizationId,
        existing.contactId
      )
    );
  });
