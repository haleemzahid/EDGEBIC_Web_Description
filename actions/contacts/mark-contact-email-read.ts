'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { markContactEmailReadSchema } from '@/schemas/contacts/mark-contact-email-read-schema';

export const markContactEmailRead = authActionClient
  .metadata({ actionName: 'markContactEmailRead' })
  .schema(markContactEmailReadSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const thread = await prisma.contactEmailThread.findFirst({
      where: {
        id: parsedInput.threadId,
        contact: {
          organizationId: session.user.organizationId
        }
      },
      select: { id: true, contactId: true, unread: true }
    });
    if (!thread) {
      throw new NotFoundError('Email thread not found');
    }
    if (!thread.unread) {
      return;
    }

    await prisma.contactEmailThread.update({
      where: { id: thread.id },
      data: { unread: false }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactEmails,
        session.user.organizationId,
        thread.contactId
      )
    );
  });
