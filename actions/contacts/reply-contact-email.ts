'use server';

import { revalidateTag } from 'next/cache';
import { EmailSenderType } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { sendContactMessageEmail } from '@/lib/smtp/send-contact-message-email';
import {
  GatewayError,
  NotFoundError,
  PreConditionError
} from '@/lib/validation/exceptions';
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
        subject: true,
        contact: {
          select: {
            name: true,
            email: true,
            organization: { select: { name: true } }
          }
        }
      }
    });
    if (!thread) {
      throw new NotFoundError('Email thread not found');
    }
    if (!thread.contact.email) {
      throw new PreConditionError(
        "This contact has no email address — can't send a reply."
      );
    }

    const replySubject = thread.subject.toLowerCase().startsWith('re:')
      ? thread.subject
      : `Re: ${thread.subject}`;

    try {
      await sendContactMessageEmail({
        recipient: thread.contact.email,
        recipientName: thread.contact.name,
        subject: replySubject,
        body: parsedInput.body,
        senderName: session.user.name ?? 'Support',
        senderEmail: session.user.email ?? undefined,
        organizationName: thread.contact.organization?.name
      });
    } catch (error) {
      throw new GatewayError(
        error instanceof Error
          ? `Email delivery failed: ${error.message}`
          : 'Email delivery failed.'
      );
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
          recipientEmail: thread.contact.email,
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
