'use server';

import { revalidateTag } from 'next/cache';
import { EmailSenderType } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { replyContactEmailSchema } from '@/schemas/contacts/reply-contact-email-schema';

export const replyContactEmail = authActionClient
  .metadata({ actionName: 'replyContactEmail' })
  .schema(replyContactEmailSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const thread = await prisma.contactEmailThread.findFirst({
      where: {
        id: parsedInput.threadId,
        contact: {
          organizationId: session.user.organizationId
        }
      },
      select: {
        id: true,
        contactId: true,
        contact: { select: { name: true, email: true } }
      }
    });
    if (!thread) {
      throw new NotFoundError('Email thread not found');
    }

    await prisma.$transaction([
      prisma.contactEmailMessage.create({
        data: {
          threadId: thread.id,
          senderType: EmailSenderType.USER,
          senderUserId: session.user.id,
          senderName: session.user.name ?? '',
          senderEmail: session.user.email ?? undefined,
          recipientName: thread.contact.name,
          recipientEmail: thread.contact.email ?? undefined,
          body: parsedInput.body
        }
      }),
      prisma.contactEmailThread.update({
        where: { id: thread.id },
        data: {
          preview: parsedInput.body.slice(0, 500),
          unread: false
        }
      })
    ]);

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactEmails,
        session.user.organizationId,
        thread.contactId
      )
    );
  });
