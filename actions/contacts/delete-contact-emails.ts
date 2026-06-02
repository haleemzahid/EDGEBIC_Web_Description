'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { deleteContactEmailsSchema } from '@/schemas/contacts/delete-contact-emails-schema';

export const deleteContactEmails = authActionClient
  .metadata({ actionName: 'deleteContactEmails' })
  .schema(deleteContactEmailsSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    // Per-side soft delete (Gmail-style). The client keeps its own view of
    // the thread unless they had already deleted it too — in which case the
    // row is invisible to everyone and we hard-remove it.
    const threads = await prisma.contactEmailThread.findMany({
      where: {
        id: { in: parsedInput.ids },
        contact: {
          organizationId: session.user.organizationId
        }
      },
      select: { id: true, contactId: true, clientDeleted: true }
    });
    if (threads.length === 0) {
      throw new NotFoundError('Email threads not found');
    }

    const hardDeleteIds = threads
      .filter((t) => t.clientDeleted)
      .map((t) => t.id);
    const softDeleteIds = threads
      .filter((t) => !t.clientDeleted)
      .map((t) => t.id);

    await prisma.$transaction([
      ...(softDeleteIds.length > 0
        ? [
            prisma.contactEmailThread.updateMany({
              where: { id: { in: softDeleteIds } },
              data: { teamDeleted: true }
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

    const contactIds = Array.from(new Set(threads.map((t) => t.contactId)));
    for (const contactId of contactIds) {
      revalidateTag(
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactEmails,
          session.user.organizationId,
          contactId
        )
      );
    }
  });
