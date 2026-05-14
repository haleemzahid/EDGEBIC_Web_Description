'use server';

import { revalidateTag } from 'next/cache';
import {
  ContactTicketActivityType,
  ContactTicketStatus,
  Role
} from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { getTeamNotificationRecipient } from '@/lib/auth/get-team-notification-recipient';
import { prisma } from '@/lib/db/prisma';
import { sendPortalActivityEmail } from '@/lib/smtp/send-portal-activity-email';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import {
  ForbiddenError,
  NotFoundError,
  PreConditionError
} from '@/lib/validation/exceptions';
import { closeClientTicketSchema } from '@/schemas/client-portal/close-client-ticket-schema';

export const closeClientTicket = authActionClient
  .metadata({ actionName: 'closeClientTicket' })
  .schema(closeClientTicketSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });
    if (!user || user.role !== Role.CLIENT) {
      throw new ForbiddenError('Only client users can use this action.');
    }

    const link = await getClientContactLink(session.user.id);
    if (!link) {
      throw new NotFoundError(
        'Your client profile is not linked to a CRM contact.'
      );
    }

    const ticket = await prisma.contactTicket.findFirst({
      where: {
        id: parsedInput.ticketId,
        contactId: link.contactId
      },
      select: { id: true, contactId: true, status: true, number: true, title: true }
    });
    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }
    if (ticket.status === ContactTicketStatus.CLOSED) {
      throw new PreConditionError('This ticket is already closed.');
    }

    await prisma.$transaction([
      prisma.contactTicket.update({
        where: { id: ticket.id },
        data: { status: ContactTicketStatus.CLOSED }
      }),
      prisma.contactTicketActivity.create({
        data: {
          ticketId: ticket.id,
          type: ContactTicketActivityType.STATUS_CHANGED,
          description: `${link.name} closed the ticket`
        }
      })
    ]);

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactTickets,
        link.organizationId,
        ticket.contactId
      )
    );

    void notifyTeamOfClose({
      organizationId: link.organizationId,
      contactId: ticket.contactId,
      ticketId: ticket.id,
      ticketNumber: ticket.number,
      ticketTitle: ticket.title,
      clientName: link.name
    }).catch((error) => {
      console.error('[Notify team] closeClientTicket failed:', error);
    });
  });

async function notifyTeamOfClose(args: {
  organizationId: string;
  contactId: string;
  ticketId: string;
  ticketNumber: number;
  ticketTitle: string;
  clientName: string;
}): Promise<void> {
  const team = await getTeamNotificationRecipient(args.organizationId);
  if (!team) return;
  const url = `${getBaseUrl()}/dashboard/contacts/${args.contactId}/tickets/${args.ticketId}`;
  const subject = `Ticket #${args.ticketNumber} closed by customer: ${args.ticketTitle}`;
  await sendPortalActivityEmail({
    recipient: team.email,
    recipientName: team.name,
    subject,
    heading: `${args.clientName} closed a ticket`,
    preheader: subject,
    context: `Ticket #${args.ticketNumber} · ${args.ticketTitle}`,
    body: 'The customer closed this ticket from the support portal.',
    ctaLabel: 'Open ticket in CRM',
    ctaUrl: url
  });
}
