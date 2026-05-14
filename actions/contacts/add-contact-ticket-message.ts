'use server';

import { revalidateTag } from 'next/cache';
import {
  ContactTicketActivityType,
  TicketMessageSender
} from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { sendPortalActivityEmail } from '@/lib/smtp/send-portal-activity-email';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import { NotFoundError } from '@/lib/validation/exceptions';
import { addContactTicketMessageSchema } from '@/schemas/contacts/add-contact-ticket-message-schema';

export const addContactTicketMessage = authActionClient
  .metadata({ actionName: 'addContactTicketMessage' })
  .schema(addContactTicketMessageSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const ticket = await prisma.contactTicket.findFirst({
      where: {
        id: parsedInput.ticketId,
        contact: {
          organizationId: session.user.organizationId
        }
      },
      select: {
        id: true,
        contactId: true,
        number: true,
        title: true,
        contact: {
          select: { name: true, email: true }
        }
      }
    });
    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }

    await prisma.$transaction([
      prisma.contactTicketMessage.create({
        data: {
          ticketId: ticket.id,
          senderType: TicketMessageSender.USER,
          senderUserId: session.user.id,
          senderName: session.user.name ?? '',
          body: parsedInput.body,
          isInternalNote: parsedInput.isInternalNote,
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
          type: parsedInput.isInternalNote
            ? ContactTicketActivityType.NOTE_ADDED
            : ContactTicketActivityType.REPLIED,
          description: parsedInput.isInternalNote
            ? 'Added an internal note'
            : 'Replied to customer',
          userId: session.user.id
        }
      })
    ]);

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactTickets,
        session.user.organizationId,
        ticket.contactId
      )
    );

    // Notify the client when team replies (skip internal notes).
    if (!parsedInput.isInternalNote && ticket.contact.email) {
      void notifyClientOfTicketReply({
        clientEmail: ticket.contact.email,
        clientName: ticket.contact.name,
        ticketNumber: ticket.number,
        ticketId: ticket.id,
        ticketTitle: ticket.title,
        teamName: session.user.name ?? 'Your team',
        body: parsedInput.body
      }).catch((error) => {
        console.error('[Notify client] addContactTicketMessage failed:', error);
      });
    }
  });

async function notifyClientOfTicketReply(args: {
  clientEmail: string;
  clientName: string;
  ticketId: string;
  ticketNumber: number;
  ticketTitle: string;
  teamName: string;
  body: string;
}): Promise<void> {
  const url = `${getBaseUrl()}/dashboard/support/${args.ticketId}`;
  await sendPortalActivityEmail({
    recipient: args.clientEmail,
    recipientName: args.clientName,
    subject: `Reply on ticket #${args.ticketNumber}: ${args.ticketTitle}`,
    heading: `${args.teamName} replied to your ticket`,
    preheader: `Reply on #${args.ticketNumber}: ${args.ticketTitle}`,
    context: `Ticket #${args.ticketNumber} · ${args.ticketTitle}`,
    body: args.body,
    ctaLabel: 'Open ticket',
    ctaUrl: url
  });
}
