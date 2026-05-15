'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { deleteTicketsSchema } from '@/schemas/tickets/delete-tickets-schema';

export const deleteTickets = authActionClient
  .metadata({ actionName: 'deleteTickets' })
  .schema(deleteTicketsSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    // Only delete tickets that belong to a contact in the admin's organization.
    const tickets = await prisma.contactTicket.findMany({
      where: {
        id: { in: parsedInput.ids },
        contact: { organizationId: session.user.organizationId }
      },
      select: { id: true, contactId: true }
    });
    if (tickets.length === 0) {
      throw new NotFoundError('No tickets found');
    }

    await prisma.contactTicket.deleteMany({
      where: { id: { in: tickets.map((t) => t.id) } }
    });

    // Invalidate per-contact ticket lists for every affected contact, plus the
    // org-wide tag so the new global inbox refreshes too.
    const uniqueContactIds = Array.from(new Set(tickets.map((t) => t.contactId)));
    for (const contactId of uniqueContactIds) {
      revalidateTag(
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactTickets,
          session.user.organizationId,
          contactId
        )
      );
    }
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactTickets,
        session.user.organizationId
      )
    );

    return { deletedCount: tickets.length };
  });
