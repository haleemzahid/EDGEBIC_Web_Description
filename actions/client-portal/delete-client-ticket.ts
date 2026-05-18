'use server';

import { revalidateTag } from 'next/cache';
import { Role } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';
import { ForbiddenError, NotFoundError } from '@/lib/validation/exceptions';
import { deleteClientTicketSchema } from '@/schemas/client-portal/delete-client-ticket-schema';

export const deleteClientTicket = authActionClient
  .metadata({ actionName: 'deleteClientTicket' })
  .schema(deleteClientTicketSchema)
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
      where: { id: parsedInput.ticketId, contactId: link.contactId },
      select: { id: true, contactId: true, createdByClient: true }
    });
    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }
    // Clients may only delete tickets they opened themselves. Team-opened
    // tickets are managed by the team.
    if (!ticket.createdByClient) {
      throw new ForbiddenError(
        'Only your team can delete a ticket they opened.'
      );
    }

    // Messages and activities cascade-delete with the ticket.
    await prisma.contactTicket.delete({
      where: { id: ticket.id }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactTickets,
        link.organizationId,
        ticket.contactId
      )
    );

    return { ticketId: ticket.id };
  });
