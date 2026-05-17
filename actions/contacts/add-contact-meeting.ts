'use server';

import { revalidateTag } from 'next/cache';
import { format } from 'date-fns';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientNotificationRecipient } from '@/lib/auth/get-client-notification-recipient';
import { prisma } from '@/lib/db/prisma';
import { sendPortalActivityEmail } from '@/lib/smtp/send-portal-activity-email';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import { NotFoundError } from '@/lib/validation/exceptions';
import { addContactMeetingSchema } from '@/schemas/contacts/add-contact-meeting-schema';

export const addContactMeeting = authActionClient
  .metadata({ actionName: 'addContactMeeting' })
  .schema(addContactMeetingSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const count = await prisma.contact.count({
      where: {
        id: parsedInput.contactId,
        organizationId: session.user.organizationId
      }
    });
    if (count < 1) {
      throw new NotFoundError('Contact not found');
    }

    const meeting = await prisma.contactMeeting.create({
      data: {
        contactId: parsedInput.contactId,
        title: parsedInput.title,
        description: parsedInput.description || null,
        startsAt: parsedInput.startsAt,
        endsAt: parsedInput.endsAt,
        location: parsedInput.location || null,
        status: parsedInput.status,
        // Surface a "new" badge on the client portal sidebar until the
        // client opens the My Meetings page.
        clientUnread: true
      },
      select: { id: true }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactMeetings,
        session.user.organizationId,
        parsedInput.contactId
      )
    );

    void notifyClientOfMeeting({
      contactId: parsedInput.contactId,
      meetingId: meeting.id,
      title: parsedInput.title,
      description: parsedInput.description ?? null,
      startsAt: parsedInput.startsAt,
      endsAt: parsedInput.endsAt,
      location: parsedInput.location ?? null,
      staffName: session.user.name ?? 'Your team'
    }).catch((error) => {
      console.error('[Notify client] addContactMeeting failed:', error);
    });
  });

async function notifyClientOfMeeting(args: {
  contactId: string;
  meetingId: string;
  title: string;
  description: string | null;
  startsAt: Date;
  endsAt: Date;
  location: string | null;
  staffName: string;
}): Promise<void> {
  const recipient = await getClientNotificationRecipient(args.contactId);
  if (!recipient) return;
  const whenLine = `${format(args.startsAt, 'EEE, MMM d · h:mm a')} – ${format(args.endsAt, 'h:mm a')}`;
  const bodyLines = [whenLine];
  if (args.location) bodyLines.push(`Location: ${args.location}`);
  if (args.description) bodyLines.push('', args.description);
  const subject = `Meeting scheduled: ${args.title}`;
  await sendPortalActivityEmail({
    recipient: recipient.email,
    recipientName: recipient.name,
    subject,
    heading: `${args.staffName} scheduled a meeting with you`,
    preheader: subject,
    context: args.title,
    body: bodyLines.join('\n'),
    ctaLabel: 'View meeting',
    ctaUrl: `${getBaseUrl()}/dashboard/my-meetings/${args.meetingId}`
  });
}
