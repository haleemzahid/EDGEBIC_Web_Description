'use server';

import { revalidateTag } from 'next/cache';
import { EmailFolder, EmailSenderType, Role } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { getTeamNotificationRecipient } from '@/lib/auth/get-team-notification-recipient';
import { prisma } from '@/lib/db/prisma';
import { sendPortalActivityEmail } from '@/lib/smtp/send-portal-activity-email';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import { ForbiddenError, NotFoundError } from '@/lib/validation/exceptions';
import { composeClientMessageSchema } from '@/schemas/client-portal/compose-client-message-schema';

export const composeClientMessage = authActionClient
  .metadata({ actionName: 'composeClientMessage' })
  .schema(composeClientMessageSchema)
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

    // From the team's perspective, a thread the client initiates is an
    // incoming conversation → INBOX folder, marked unread so the team sees it.
    const thread = await prisma.contactEmailThread.create({
      data: {
        contactId: link.contactId,
        folder: EmailFolder.INBOX,
        subject: parsedInput.subject,
        preview: parsedInput.body.slice(0, 500),
        unread: true,
        messages: {
          create: {
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
        }
      },
      select: { id: true }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactEmails,
        link.organizationId,
        link.contactId
      )
    );

    void notifyTeamOfMessage({
      organizationId: link.organizationId,
      contactId: link.contactId,
      clientName: link.name,
      subject: parsedInput.subject,
      body: parsedInput.body,
      isNewThread: true
    }).catch((error) => {
      console.error('[Notify team] composeClientMessage failed:', error);
    });

    return { threadId: thread.id };
  });

async function notifyTeamOfMessage(args: {
  organizationId: string;
  contactId: string;
  clientName: string;
  subject: string;
  body: string;
  isNewThread: boolean;
}): Promise<void> {
  const team = await getTeamNotificationRecipient(args.organizationId);
  if (!team) return;
  const url = `${getBaseUrl()}/dashboard/contacts/${args.contactId}?tab=inbox`;
  const subject = args.isNewThread
    ? `New message from ${args.clientName}: ${args.subject}`
    : `New reply from ${args.clientName}: ${args.subject}`;
  const heading = args.isNewThread
    ? `${args.clientName} sent a new message`
    : `${args.clientName} replied to a message`;
  await sendPortalActivityEmail({
    recipient: team.email,
    recipientName: team.name,
    subject,
    heading,
    preheader: subject,
    context: args.subject,
    body: args.body,
    ctaLabel: 'Open in CRM',
    ctaUrl: url
  });
}
