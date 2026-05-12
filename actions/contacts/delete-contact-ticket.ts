'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { deleteContactTicketSchema } from '@/schemas/contacts/delete-contact-ticket-schema';

export const deleteContactTicket = authActionClient
  .metadata({ actionName: 'deleteContactTicket' })
  .schema(deleteContactTicketSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const existing = await prisma.contactTicket.findFirst({
      where: {
        id: parsedInput.id,
        contact: {
          organizationId: session.user.organizationId
        }
      },
      select: { id: true, contactId: true }
    });
    if (!existing) {
      throw new NotFoundError('Ticket not found');
    }

    await prisma.contactTicket.delete({ where: { id: existing.id } });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactTickets,
        session.user.organizationId,
        existing.contactId
      )
    );
  });
