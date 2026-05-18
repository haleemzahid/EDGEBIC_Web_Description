'use server';

import { revalidateTag } from 'next/cache';
import { EmailSenderType } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import {
  htmlToPlainText,
  sanitizeEmailHtml
} from '@/lib/email/sanitize-email-html';
import { prisma } from '@/lib/db/prisma';
import { sendContactMessageEmail } from '@/lib/smtp/send-contact-message-email';
import {
  GatewayError,
  NotFoundError,
  PreConditionError,
  ValidationError
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

    // The body is rich-text HTML from the reply editor — sanitize once so the
    // same safe markup is emailed and stored, and derive a plain-text
    // preview. An empty editor still emits markup, so require real text or
    // an attachment.
    const safeBody = parsedInput.body
      ? sanitizeEmailHtml(parsedInput.body)
      : '';
    const plainText = safeBody ? htmlToPlainText(safeBody).trim() : '';
    if (!plainText && parsedInput.attachments.length === 0) {
      throw new ValidationError('Message or attachment is required.');
    }

    try {
      await sendContactMessageEmail({
        recipient: thread.contact.email,
        recipientName: thread.contact.name,
        subject: replySubject,
        body: safeBody,
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

    const previewBase = plainText
      ? plainText
      : parsedInput.attachments
          .map((a) => a.fileName)
          .join(', ');
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
          body: safeBody,
          attachments:
            parsedInput.attachments.length > 0
              ? {
                  create: parsedInput.attachments.map((a) => ({
                    fileName: a.fileName,
                    storedName: a.storedName,
                    mimeType: a.mimeType,
                    sizeBytes: a.sizeBytes
                  }))
                }
              : undefined
        }
      }),
      prisma.contactEmailThread.update({
        where: { id: thread.id },
        data: {
          preview: previewBase.slice(0, 500),
          // Team replied → unread BY THE CLIENT so the portal sidebar badge
          // lights up. Cleared when the client opens the thread. Mirrors
          // the ticket clientUnread pattern.
          unread: true
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
