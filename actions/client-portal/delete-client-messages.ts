'use server';

import { revalidateTag } from 'next/cache';
import { Role } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';
import { ForbiddenError, NotFoundError } from '@/lib/validation/exceptions';
import { deleteClientMessagesSchema } from '@/schemas/client-portal/delete-client-messages-schema';

export const deleteClientMessages = authActionClient
  .metadata({ actionName: 'deleteClientMessages' })
  .schema(deleteClientMessagesSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    if (session.user.role !== Role.CLIENT) {
      throw new ForbiddenError('Only client users can use this action.');
    }

    const link = await getClientContactLink(session.user.id);
    if (!link) {
      throw new NotFoundError(
        'Your client profile is not linked to a CRM contact.'
      );
    }

    // Only delete threads that belong to this client's linked contact.
    const threads = await prisma.contactEmailThread.findMany({
      where: {
        id: { in: parsedInput.ids },
        contactId: link.contactId
      },
      select: { id: true }
    });
    if (threads.length === 0) {
      throw new NotFoundError('Messages not found');
    }

    await prisma.contactEmailThread.deleteMany({
      where: { id: { in: threads.map((t) => t.id) } }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactEmails,
        link.organizationId,
        link.contactId
      )
    );
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactEmails,
        link.organizationId
      )
    );
  });
