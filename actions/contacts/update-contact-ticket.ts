'use server';

import { revalidateTag } from 'next/cache';
import { ContactTicketActivityType, ContactTicketStatus } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientNotificationRecipient } from '@/lib/auth/get-client-notification-recipient';
import { prisma } from '@/lib/db/prisma';
import { sendPortalActivityEmail } from '@/lib/smtp/send-portal-activity-email';
import { getBaseUrl } from '@/lib/urls/get-base-url';
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

    if (existing.status !== parsedInput.status) {
      void notifyClientOfStatusChange({
        contactId: existing.contactId,
        ticketId: existing.id,
        nextStatus: parsedInput.status,
        staffName: session.user.name ?? 'Your team'
      }).catch((error) => {
        console.error('[Notify client] updateContactTicket failed:', error);
      });
    }
  });

async function notifyClientOfStatusChange(args: {
  contactId: string;
  ticketId: string;
  nextStatus: ContactTicketStatus;
  staffName: string;
}): Promise<void> {
  const [recipient, ticket] = await Promise.all([
    getClientNotificationRecipient(args.contactId),
    prisma.contactTicket.findUnique({
      where: { id: args.ticketId },
      select: { number: true, title: true }
    })
  ]);
  if (!recipient || !ticket) return;

  const statusLabel = (() => {
    switch (args.nextStatus) {
      case ContactTicketStatus.OPEN:
        return 'reopened';
      case ContactTicketStatus.PENDING:
        return 'marked in progress';
      case ContactTicketStatus.RESOLVED:
        return 'marked resolved';
      case ContactTicketStatus.CLOSED:
        return 'closed';
    }
  })();
  const subject = `Ticket #${ticket.number} ${statusLabel}: ${ticket.title}`;
  const body =
    args.nextStatus === ContactTicketStatus.RESOLVED
      ? `${args.staffName} marked this ticket resolved. Open the portal to confirm or reply if the issue persists.`
      : `${args.staffName} updated this ticket's status to ${args.nextStatus.toLowerCase()}.`;
  await sendPortalActivityEmail({
    recipient: recipient.email,
    recipientName: recipient.name,
    subject,
    heading: `Your ticket was ${statusLabel}`,
    preheader: subject,
    context: `Ticket #${ticket.number} · ${ticket.title}`,
    body,
    ctaLabel: 'Open ticket',
    ctaUrl: `${getBaseUrl()}/dashboard/support/${args.ticketId}`
  });
}
