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
    const threads = await prisma.contactEmailThread.findMany({
      where: {
        id: { in: parsedInput.ids },
        contact: {
          organizationId: session.user.organizationId
        }
      },
      select: { id: true, contactId: true }
    });
    if (threads.length === 0) {
      throw new NotFoundError('Email threads not found');
    }

    await prisma.contactEmailThread.deleteMany({
      where: {
        id: { in: threads.map((t) => t.id) }
      }
    });

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
