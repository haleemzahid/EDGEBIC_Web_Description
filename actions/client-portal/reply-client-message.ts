'use server';

import { revalidateTag } from 'next/cache';
import { EmailSenderType, Role } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { getTeamNotificationRecipient } from '@/lib/auth/get-team-notification-recipient';
import { createTeamNotification } from '@/lib/notifications/create-team-notification';
import {
  htmlToPlainText,
  sanitizeEmailHtml
} from '@/lib/email/sanitize-email-html';
import { prisma } from '@/lib/db/prisma';
import { sendPortalActivityEmail } from '@/lib/smtp/send-portal-activity-email';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import {
  ForbiddenError,
  NotFoundError,
  ValidationError
} from '@/lib/validation/exceptions';
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
      select: { id: true, contactId: true, subject: true }
    });
    if (!thread) {
      throw new NotFoundError('Conversation not found');
    }

    // The body is rich-text HTML from the reply editor — sanitize once and
    // derive a plain-text preview/notification from it. An empty editor still
    // emits markup, so fall back to attachment names when there's no text.
    const safeBody = parsedInput.body
      ? sanitizeEmailHtml(parsedInput.body)
      : '';
    const plainText = safeBody ? htmlToPlainText(safeBody).trim() : '';
    if (!plainText && parsedInput.attachments.length === 0) {
      throw new ValidationError('Message body is required.');
    }
    const previewBase = plainText
      ? plainText
      : parsedInput.attachments.map((a) => a.fileName).join(', ');
    const now = new Date();
    await prisma.$transaction([
      prisma.contactEmailMessage.create({
        data: {
          threadId: thread.id,
          senderType: EmailSenderType.CONTACT,
          senderName: link.name,
          senderEmail: link.email,
          body: plainText ? safeBody : '',
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
          unread: true,
          // A new client reply un-trashes the thread for the team so it
          // reappears in the admin inbox (Gmail-style resurrection).
          teamDeleted: false
        }
      }),
      // Bubble the contact to the top of the CRM and mark unread so the
      // row shows bold (mirrors the ticket flow).
      prisma.contact.update({
        where: { id: thread.contactId },
        data: { createdAt: now, isRead: false }
      })
    ]);

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactEmails,
        link.organizationId,
        thread.contactId
      )
    );
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Contacts,
        link.organizationId
      )
    );

    void notifyTeamOfMessageReply({
      organizationId: link.organizationId,
      contactId: thread.contactId,
      threadId: thread.id,
      clientName: link.name,
      subject: thread.subject,
      body: plainText
    }).catch((error) => {
      console.error('[Notify team] replyClientMessage failed:', error);
    });
  });

async function notifyTeamOfMessageReply(args: {
  organizationId: string;
  contactId: string;
  threadId: string;
  clientName: string;
  subject: string;
  body: string;
}): Promise<void> {
  const team = await getTeamNotificationRecipient(args.organizationId);
  if (!team) return;
  // Deep link to the specific thread so the CRM badge can open it directly
  // when there's a single unread item. When multiple unread items exist,
  // the badge click strips ?threadId and falls back to the inbox list.
  const path = `/dashboard/contacts/${args.contactId}?tab=inbox&threadId=${args.threadId}`;
  const url = `${getBaseUrl()}${path}`;
  const subject = `New reply from ${args.clientName}: ${args.subject}`;
  const heading = `${args.clientName} replied to a message`;
  await sendPortalActivityEmail({
    recipient: team.email,
    recipientName: team.name,
    subject,
    heading,
    preheader: `New reply: ${args.subject}`,
    context: args.subject,
    body: args.body,
    ctaLabel: 'Open in CRM',
    ctaUrl: url
  });

  // Additive: also surface an in-app notification on the Contacts table.
  await createTeamNotification({
    userId: team.userId,
    subject,
    content: `${heading}: ${args.subject}`,
    link: path,
    contactId: args.contactId,
    type: 'MESSAGE'
  }).catch((error) => {
    console.error('[Notify team] in-app reply notification failed:', error);
  });
}
