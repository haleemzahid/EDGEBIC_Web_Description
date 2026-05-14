'use server';

import { revalidateTag } from 'next/cache';
import { EmailSenderType, Role } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { getTeamNotificationRecipient } from '@/lib/auth/get-team-notification-recipient';
import { prisma } from '@/lib/db/prisma';
import { sendPortalActivityEmail } from '@/lib/smtp/send-portal-activity-email';
import { getBaseUrl } from '@/lib/urls/get-base-url';
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
      select: { id: true, contactId: true, subject: true }
    });
    if (!thread) {
      throw new NotFoundError('Conversation not found');
    }

    const previewBase = parsedInput.body
      ? parsedInput.body
      : parsedInput.attachments
          .map((a) => a.fileName)
          .join(', ');
    await prisma.$transaction([
      prisma.contactEmailMessage.create({
        data: {
          threadId: thread.id,
          senderType: EmailSenderType.CONTACT,
          senderName: link.name,
          senderEmail: link.email,
          body: parsedInput.body,
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

    void notifyTeamOfMessageReply({
      organizationId: link.organizationId,
      contactId: thread.contactId,
      clientName: link.name,
      subject: thread.subject,
      body: parsedInput.body
    }).catch((error) => {
      console.error('[Notify team] replyClientMessage failed:', error);
    });
  });

async function notifyTeamOfMessageReply(args: {
  organizationId: string;
  contactId: string;
  clientName: string;
  subject: string;
  body: string;
}): Promise<void> {
  const team = await getTeamNotificationRecipient(args.organizationId);
  if (!team) return;
  const url = `${getBaseUrl()}/dashboard/contacts/${args.contactId}?tab=inbox`;
  await sendPortalActivityEmail({
    recipient: team.email,
    recipientName: team.name,
    subject: `New reply from ${args.clientName}: ${args.subject}`,
    heading: `${args.clientName} replied to a message`,
    preheader: `New reply: ${args.subject}`,
    context: args.subject,
    body: args.body,
    ctaLabel: 'Open in CRM',
    ctaUrl: url
  });
}
