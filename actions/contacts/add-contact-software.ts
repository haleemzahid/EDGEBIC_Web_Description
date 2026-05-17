'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientNotificationRecipient } from '@/lib/auth/get-client-notification-recipient';
import { prisma } from '@/lib/db/prisma';
import { sendPortalActivityEmail } from '@/lib/smtp/send-portal-activity-email';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import { addContactSoftwareSchema } from '@/schemas/contacts/add-contact-software-schema';

export const addContactSoftware = authActionClient
  .metadata({ actionName: 'addContactSoftware' })
  .schema(addContactSoftwareSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    await prisma.contactSoftware.create({
      data: {
        contactId: parsedInput.contactId,
        name: parsedInput.name,
        installedVersion: parsedInput.installedVersion || undefined,
        latestVersion: parsedInput.latestVersion || undefined,
        installDate: parsedInput.installDate ?? new Date(),
        status: parsedInput.status,
        githubUrl: parsedInput.githubUrl || undefined,
        docsUrl: parsedInput.docsUrl || undefined,
        downloadUrl: parsedInput.downloadUrl || undefined,
        licenseKey: parsedInput.licenseKey || undefined,
        licenseType: parsedInput.licenseType || undefined,
        seats: parsedInput.seats ?? undefined,
        os: parsedInput.os || undefined,
        database: parsedInput.database || undefined,
        installPath: parsedInput.installPath || undefined,
        notes: parsedInput.notes || undefined,
        // Surface a "new" badge on the client portal sidebar until the
        // client opens the My Software page.
        clientUnread: true
      },
      select: { id: true }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactSoftware,
        session.user.organizationId,
        parsedInput.contactId
      )
    );

    void notifyClientOfSoftware({
      contactId: parsedInput.contactId,
      name: parsedInput.name,
      installedVersion: parsedInput.installedVersion ?? null,
      staffName: session.user.name ?? 'Your team'
    }).catch((error) => {
      console.error('[Notify client] addContactSoftware failed:', error);
    });
  });

async function notifyClientOfSoftware(args: {
  contactId: string;
  name: string;
  installedVersion: string | null;
  staffName: string;
}): Promise<void> {
  const recipient = await getClientNotificationRecipient(args.contactId);
  if (!recipient) return;
  const versionSuffix = args.installedVersion ? ` v${args.installedVersion}` : '';
  const subject = `Software added: ${args.name}${versionSuffix}`;
  await sendPortalActivityEmail({
    recipient: recipient.email,
    recipientName: recipient.name,
    subject,
    heading: `${args.staffName} added a new software entry`,
    preheader: subject,
    context: `${args.name}${versionSuffix}`,
    body: `Open your portal to see installation details, license info, and any setup notes.`,
    ctaLabel: 'View software',
    ctaUrl: `${getBaseUrl()}/dashboard/my-software`
  });
}
