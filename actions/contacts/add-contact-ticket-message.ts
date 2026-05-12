'use server';

import { revalidateTag } from 'next/cache';
import {
  ContactTicketActivityType,
  TicketMessageSender
} from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
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
      select: { id: true, contactId: true }
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
          isInternalNote: parsedInput.isInternalNote
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
  });
