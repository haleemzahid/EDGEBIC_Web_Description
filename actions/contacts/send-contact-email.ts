'use server';

import { revalidateTag } from 'next/cache';
import { EmailFolder, EmailSenderType } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { sendContactEmailSchema } from '@/schemas/contacts/send-contact-email-schema';

export const sendContactEmail = authActionClient
  .metadata({ actionName: 'sendContactEmail' })
  .schema(sendContactEmailSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const contact = await prisma.contact.findFirst({
      where: {
        id: parsedInput.contactId,
        organizationId: session.user.organizationId
      },
      select: { id: true, name: true, email: true }
    });
    if (!contact) {
      throw new NotFoundError('Contact not found');
    }

    const thread = await prisma.contactEmailThread.create({
      data: {
        contactId: contact.id,
        folder: EmailFolder.SENT,
        subject: parsedInput.subject,
        preview: parsedInput.body.slice(0, 500),
        unread: false,
        messages: {
          create: {
            senderType: EmailSenderType.USER,
            senderUserId: session.user.id,
            senderName: session.user.name ?? '',
            senderEmail: session.user.email ?? undefined,
            recipientName: contact.name,
            recipientEmail: parsedInput.to,
            body: parsedInput.body
          }
        }
      },
      select: { id: true }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactEmails,
        session.user.organizationId,
        contact.id
      )
    );

    return { threadId: thread.id };
  });
