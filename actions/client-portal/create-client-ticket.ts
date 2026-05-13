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
import { prisma } from '@/lib/db/prisma';
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

    return { ticketId: ticket.id, number: ticket.number };
  });
