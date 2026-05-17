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
import { prisma } from '@/lib/db/prisma';
import {
  ForbiddenError,
  NotFoundError,
  PreConditionError
} from '@/lib/validation/exceptions';
import { confirmClientTicketSchema } from '@/schemas/client-portal/confirm-client-ticket-schema';

export const confirmClientTicketResolved = authActionClient
  .metadata({ actionName: 'confirmClientTicketResolved' })
  .schema(confirmClientTicketSchema)
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
      select: { id: true, status: true, createdByClient: true }
    });
    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }
    if (!ticket.createdByClient) {
      throw new ForbiddenError(
        'Only your team can change the status of a ticket they opened.'
      );
    }
    if (ticket.status !== ContactTicketStatus.RESOLVED) {
      throw new PreConditionError(
        'Only a resolved ticket can be confirmed closed.'
      );
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
          description: `${link.name} confirmed resolved → closed`
        }
      })
    ]);

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactTickets,
        link.organizationId,
        link.contactId
      )
    );
  });
