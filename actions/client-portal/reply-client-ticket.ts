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
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';
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
      select: { id: true, contactId: true, status: true }
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
    const reopening = ticket.status === ContactTicketStatus.RESOLVED;

    const operations: Prisma.PrismaPromise<unknown>[] = [
      prisma.contactTicketMessage.create({
        data: {
          ticketId: ticket.id,
          senderType: TicketMessageSender.CONTACT,
          senderName: link.name,
          body: parsedInput.body,
          isInternalNote: false
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

    return { reopened: reopening };
  });
