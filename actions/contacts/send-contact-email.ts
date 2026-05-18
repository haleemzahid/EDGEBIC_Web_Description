'use server';

import { revalidateTag } from 'next/cache';
import { EmailFolder, EmailSenderType } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import {
  htmlToPlainText,
  sanitizeEmailHtml
} from '@/lib/email/sanitize-email-html';
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
    // Keep the joined string only for the single-column DB record below.
    // The mailer must receive the ARRAY — Resend rejects a comma-joined
    // string of multiple addresses (nodemailer tolerates it).
    const toJoined = parsedInput.to.join(', ');
    // The body is rich-text HTML from the compose editor — sanitize once
    // here so the same safe markup is both emailed and persisted, and
    // derive a plain-text preview from it.
    const safeBody = sanitizeEmailHtml(parsedInput.body);
    const previewText = htmlToPlainText(safeBody).slice(0, 500);
    try {
      await sendContactMessageEmail(
        {
          recipient: parsedInput.to,
          recipientName: contact.name,
          subject: parsedInput.subject,
          body: safeBody,
          senderName: session.user.name ?? 'Support',
          senderEmail: session.user.email ?? undefined,
          organizationName: contact.organization?.name
        },
        { cc: parsedInput.cc, bcc: parsedInput.bcc }
      );
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
        preview: previewText,
        // Team-sent → unread BY THE CLIENT so the client-portal sidebar
        // badge lights up (counts folder=SENT + unread). Cleared when the
        // client opens the thread (messages/[threadId]/page.tsx). Mirrors
        // the ticket clientUnread pattern.
        unread: true,
        messages: {
          create: {
            senderType: EmailSenderType.USER,
            senderUserId: session.user.id,
            senderName: session.user.name ?? '',
            senderEmail: session.user.email ?? undefined,
            recipientName: contact.name,
            // Single column holds the To list (joined). Cc/Bcc are delivered
            // but not persisted separately (would need a schema migration).
            recipientEmail: toJoined.slice(0, 255),
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
