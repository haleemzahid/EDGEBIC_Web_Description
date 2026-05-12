'use server';

import { revalidateTag } from 'next/cache';
import { ContactTicketActivityType } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
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

    return { ticketId: ticket.id, number: ticket.number };
  });
