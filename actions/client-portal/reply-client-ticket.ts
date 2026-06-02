'use server';

import { revalidateTag } from 'next/cache';
import {
  ContactTicketActivityType,
  ContactTicketStatus,
  Prisma,
  Role,
  TicketMessageSender
} from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { publishTicketUpdate } from '@/lib/ably/server';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { getTeamNotificationRecipient } from '@/lib/auth/get-team-notification-recipient';
import { prisma } from '@/lib/db/prisma';
import { sendPortalActivityEmail } from '@/lib/smtp/send-portal-activity-email';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import { ForbiddenError, NotFoundError } from '@/lib/validation/exceptions';
import { replyClientTicketSchema } from '@/schemas/client-portal/reply-client-ticket-schema';

export const replyClientTicket = authActionClient
  .metadata({ actionName: 'replyClientTicket' })
  .schema(replyClientTicketSchema)
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
      select: {
        id: true,
        contactId: true,
        status: true,
        createdByClient: true
      }
    });
    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }

    // A reply on a RESOLVED ticket reopens it (the client is saying "no, still
    // broken"). A reply on a CLOSED ticket is rejected — that's the terminal
    // state; client should open a new ticket instead.
    if (ticket.status === ContactTicketStatus.CLOSED) {
      throw new ForbiddenError(
        'This ticket is closed. Please open a new ticket if you need more help.'
      );
    }
    // Replying to a RESOLVED ticket reopens it — a status change the client
    // may only perform on tickets they opened themselves.
    if (
      ticket.status === ContactTicketStatus.RESOLVED &&
      !ticket.createdByClient
    ) {
      throw new ForbiddenError(
        'Only your team can reopen a ticket they opened. Please open a new ticket if you need more help.'
      );
    }
    const reopening = ticket.status === ContactTicketStatus.RESOLVED;

    const operations: Prisma.PrismaPromise<unknown>[] = [
      prisma.contactTicketMessage.create({
        data: {
          ticketId: ticket.id,
          senderType: TicketMessageSender.CONTACT,
          senderName: link.name,
          body: parsedInput.body,
          isInternalNote: false,
          attachments:
            parsedInput.attachments.length > 0
              ? {
                  create: parsedInput.attachments.map((a) => ({
                    fileName: a.fileName,
                    storedName: a.storedName,
                    mimeType: a.mimeType,
                    sizeBytes: a.sizeBytes
                  }))
                }
              : undefined
        }
      }),
      prisma.contactTicketActivity.create({
        data: {
          ticketId: ticket.id,
          type: ContactTicketActivityType.REPLIED,
          description: `${link.name} replied`
        }
      })
    ];

    if (reopening) {
      operations.push(
        prisma.contactTicket.update({
          where: { id: ticket.id },
          data: { status: ContactTicketStatus.OPEN }
        }),
        prisma.contactTicketActivity.create({
          data: {
            ticketId: ticket.id,
            type: ContactTicketActivityType.STATUS_CHANGED,
            description: `${link.name} reopened the ticket`
          }
        })
      );
    } else {
      operations.push(
        prisma.contactTicket.update({
          where: { id: ticket.id },
          data: { updatedAt: new Date() }
        })
      );
    }

    await prisma.$transaction(operations);

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactTickets,
        link.organizationId,
        ticket.contactId
      )
    );

    // Push the "something changed" signal to every open viewer of this ticket
    // (admin + client side). Receivers refetch via router.refresh().
    void publishTicketUpdate(ticket.id);

    // Best-effort notify the team. Don't block on email failures.
    const ticketDetails = await prisma.contactTicket.findUnique({
      where: { id: ticket.id },
      select: { number: true, title: true }
    });
    if (ticketDetails) {
      void notifyTeamOfTicketReply({
        organizationId: link.organizationId,
        contactId: ticket.contactId,
        ticketId: ticket.id,
        ticketNumber: ticketDetails.number,
        ticketTitle: ticketDetails.title,
        clientName: link.name,
        body: parsedInput.body,
        reopened: reopening
      }).catch((error) => {
        console.error('[Notify team] replyClientTicket failed:', error);
      });
    }

    return { reopened: reopening };
  });

async function notifyTeamOfTicketReply(args: {
  organizationId: string;
  contactId: string;
  ticketId: string;
  ticketNumber: number;
  ticketTitle: string;
  clientName: string;
  body: string;
  reopened: boolean;
}): Promise<void> {
  const team = await getTeamNotificationRecipient(args.organizationId);
  if (!team) return;
  const url = `${getBaseUrl()}/dashboard/contacts/${args.contactId}/tickets/${args.ticketId}`;
  const subject = args.reopened
    ? `Ticket #${args.ticketNumber} reopened: ${args.ticketTitle}`
    : `New reply on #${args.ticketNumber}: ${args.ticketTitle}`;
  const heading = args.reopened
    ? `${args.clientName} reopened a ticket`
    : `${args.clientName} replied to a ticket`;
  await sendPortalActivityEmail({
    recipient: team.email,
    recipientName: team.name,
    subject,
    heading,
    preheader: subject,
    context: `Ticket #${args.ticketNumber} · ${args.ticketTitle}`,
    body: args.body,
    ctaLabel: 'Open ticket in CRM',
    ctaUrl: url
  });
}
