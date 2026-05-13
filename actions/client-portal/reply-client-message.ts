'use server';

import { revalidateTag } from 'next/cache';
import { EmailSenderType, Role } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';
import { ForbiddenError, NotFoundError } from '@/lib/validation/exceptions';
import { replyClientMessageSchema } from '@/schemas/client-portal/reply-client-message-schema';

export const replyClientMessage = authActionClient
  .metadata({ actionName: 'replyClientMessage' })
  .schema(replyClientMessageSchema)
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

    const thread = await prisma.contactEmailThread.findFirst({
      where: {
        id: parsedInput.threadId,
        contactId: link.contactId
      },
      select: { id: true, contactId: true }
    });
    if (!thread) {
      throw new NotFoundError('Conversation not found');
    }

    await prisma.$transaction([
      prisma.contactEmailMessage.create({
        data: {
          threadId: thread.id,
          senderType: EmailSenderType.CONTACT,
          senderName: link.name,
          senderEmail: link.email,
          body: parsedInput.body
        }
      }),
      prisma.contactEmailThread.update({
        where: { id: thread.id },
        data: {
          preview: parsedInput.body.slice(0, 500),
          unread: true
        }
      })
    ]);

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactEmails,
        link.organizationId,
        thread.contactId
      )
    );
  });
