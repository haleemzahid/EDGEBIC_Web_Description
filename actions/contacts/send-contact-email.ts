'use server';

import { revalidateTag } from 'next/cache';
import { EmailFolder, EmailSenderType } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { sendContactMessageEmail } from '@/lib/smtp/send-contact-message-email';
import { GatewayError, NotFoundError } from '@/lib/validation/exceptions';
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
      select: {
        id: true,
        name: true,
        email: true,
        organization: { select: { name: true } }
      }
    });
    if (!contact) {
      throw new NotFoundError('Contact not found');
    }

    // Send the actual email FIRST. If SMTP fails we don't persist a
    // misleading "Sent" record in the DB.
    try {
      await sendContactMessageEmail({
        recipient: parsedInput.to,
        recipientName: contact.name,
        subject: parsedInput.subject,
        body: parsedInput.body,
        senderName: session.user.name ?? 'Support',
        senderEmail: session.user.email ?? undefined,
        organizationName: contact.organization?.name
      });
    } catch (error) {
      throw new GatewayError(
        error instanceof Error
          ? `Email delivery failed: ${error.message}`
          : 'Email delivery failed.'
      );
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
