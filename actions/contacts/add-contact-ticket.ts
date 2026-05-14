'use server';

import { revalidateTag } from 'next/cache';
import { ContactTicketActivityType } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientNotificationRecipient } from '@/lib/auth/get-client-notification-recipient';
import { prisma } from '@/lib/db/prisma';
import { sendPortalActivityEmail } from '@/lib/smtp/send-portal-activity-email';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import { NotFoundError } from '@/lib/validation/exceptions';
import { addContactTicketSchema } from '@/schemas/contacts/add-contact-ticket-schema';

export const addContactTicket = authActionClient
  .metadata({ actionName: 'addContactTicket' })
  .schema(addContactTicketSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const contact = await prisma.contact.findFirst({
      where: {
        id: parsedInput.contactId,
        organizationId: session.user.organizationId
      },
      select: { id: true, name: true }
    });
    if (!contact) {
      throw new NotFoundError('Contact not found');
    }

    const ticket = await prisma.contactTicket.create({
      data: {
        contactId: contact.id,
        meetingId: parsedInput.meetingId ? parsedInput.meetingId : null,
        title: parsedInput.title,
        description: parsedInput.description || null,
        status: parsedInput.status,
        priority: parsedInput.priority,
        assigneeUserId: parsedInput.assigneeUserId
          ? parsedInput.assigneeUserId
          : null
      },
      select: { id: true, number: true }
    });

    await prisma.contactTicketActivity.create({
      data: {
        ticketId: ticket.id,
        type: ContactTicketActivityType.CREATED,
        description: `Ticket #${ticket.number} created`,
        userId: session.user.id
      }
    });

    if (parsedInput.assigneeUserId) {
      const assignee = await prisma.user.findUnique({
        where: { id: parsedInput.assigneeUserId },
        select: { name: true }
      });
      if (assignee) {
        await prisma.contactTicketActivity.create({
          data: {
            ticketId: ticket.id,
            type: ContactTicketActivityType.ASSIGNED,
            description: `Assigned to ${assignee.name}`,
            userId: session.user.id
          }
        });
      }
    }

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactTickets,
        session.user.organizationId,
        contact.id
      )
    );

    void notifyClientOfNewTicket({
      contactId: contact.id,
      ticketId: ticket.id,
      ticketNumber: ticket.number,
      ticketTitle: parsedInput.title,
      ticketDescription: parsedInput.description ?? null,
      staffName: session.user.name ?? 'Your team'
    }).catch((error) => {
      console.error('[Notify client] addContactTicket failed:', error);
    });

    return { ticketId: ticket.id, number: ticket.number };
  });

async function notifyClientOfNewTicket(args: {
  contactId: string;
  ticketId: string;
  ticketNumber: number;
  ticketTitle: string;
  ticketDescription: string | null;
  staffName: string;
}): Promise<void> {
  const recipient = await getClientNotificationRecipient(args.contactId);
  if (!recipient) return;
  const subject = `Ticket #${args.ticketNumber} opened: ${args.ticketTitle}`;
  await sendPortalActivityEmail({
    recipient: recipient.email,
    recipientName: recipient.name,
    subject,
    heading: `${args.staffName} opened a ticket for you`,
    preheader: subject,
    context: `Ticket #${args.ticketNumber} · ${args.ticketTitle}`,
    body:
      args.ticketDescription ??
      'Open your support portal to see the details and reply.',
    ctaLabel: 'View ticket',
    ctaUrl: `${getBaseUrl()}/dashboard/support/${args.ticketId}`
  });
}
