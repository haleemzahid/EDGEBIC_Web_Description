'use server';

import { revalidateTag } from 'next/cache';
import {
  ContactPriority,
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
import { ForbiddenError, NotFoundError } from '@/lib/validation/exceptions';
import { createClientTicketSchema } from '@/schemas/client-portal/create-client-ticket-schema';

export const createClientTicket = authActionClient
  .metadata({ actionName: 'createClientTicket' })
  .schema(createClientTicketSchema)
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

    const ticket = await prisma.contactTicket.create({
      data: {
        contactId: link.contactId,
        title: parsedInput.title,
        description: parsedInput.description || null,
        status: ContactTicketStatus.OPEN,
        priority: ContactPriority.MEDIUM
      },
      select: { id: true, number: true }
    });

    await prisma.contactTicketActivity.create({
      data: {
        ticketId: ticket.id,
        type: ContactTicketActivityType.CREATED,
        description: `Ticket #${ticket.number} opened by ${link.name}`
      }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactTickets,
        link.organizationId,
        link.contactId
      )
    );

    // Best-effort notify the team. Don't block on email failures.
    void notifyTeamOfNewTicket({
      organizationId: link.organizationId,
      contactId: link.contactId,
      ticketId: ticket.id,
      ticketNumber: ticket.number,
      clientName: link.name,
      title: parsedInput.title,
      body: parsedInput.description || '(no description)'
    }).catch((error) => {
      console.error('[Notify team] createClientTicket failed:', error);
    });

    return { ticketId: ticket.id, number: ticket.number };
  });

async function notifyTeamOfNewTicket(args: {
  organizationId: string;
  contactId: string;
  ticketId: string;
  ticketNumber: number;
  clientName: string;
  title: string;
  body: string;
}): Promise<void> {
  const team = await getTeamNotificationRecipient(args.organizationId);
  if (!team) return;
  const url = `${getBaseUrl()}/dashboard/contacts/${args.contactId}/tickets/${args.ticketId}`;
  await sendPortalActivityEmail({
    recipient: team.email,
    recipientName: team.name,
    subject: `New ticket #${args.ticketNumber}: ${args.title}`,
    heading: `${args.clientName} opened a new ticket`,
    preheader: `New ticket: ${args.title}`,
    context: `Ticket #${args.ticketNumber} · ${args.title}`,
    body: args.body,
    ctaLabel: 'Open ticket in CRM',
    ctaUrl: url
  });
}
