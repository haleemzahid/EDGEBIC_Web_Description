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

    // Per-side soft delete (Gmail-style). Admin retains its own view of the
    // thread unless they had already deleted it too — in which case nobody
    // can see the row anymore and we hard-remove it to keep the table tidy.
    const threads = await prisma.contactEmailThread.findMany({
      where: {
        id: { in: parsedInput.ids },
        contactId: link.contactId
      },
      select: { id: true, teamDeleted: true }
    });
    if (threads.length === 0) {
      throw new NotFoundError('Messages not found');
    }

    const hardDeleteIds = threads.filter((t) => t.teamDeleted).map((t) => t.id);
    const softDeleteIds = threads.filter((t) => !t.teamDeleted).map((t) => t.id);

    await prisma.$transaction([
      ...(softDeleteIds.length > 0
        ? [
            prisma.contactEmailThread.updateMany({
              where: { id: { in: softDeleteIds } },
              data: { clientDeleted: true }
            })
          ]
        : []),
      ...(hardDeleteIds.length > 0
        ? [
            prisma.contactEmailThread.deleteMany({
              where: { id: { in: hardDeleteIds } }
            })
          ]
        : [])
    ]);

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
