'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { dismissContactNotificationsSchema } from '@/schemas/notifications/dismiss-contact-notifications-schema';

// Clears the Contacts-table client-activity badge for one contact by
// dismissing the signed-in user's notifications for it. Once no unread
// notifications remain for the contact, also marks the contact as read so
// the bold/unread row state clears in lockstep with the badge (the bold
// text must only signal genuinely unread activity, never linger after sync).
export const dismissContactNotifications = authActionClient
  .metadata({ actionName: 'dismissContactNotifications' })
  .schema(dismissContactNotificationsSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    await prisma.notification.updateMany({
      where: {
        userId: session.user.id,
        contactId: parsedInput.contactId,
        dismissed: false,
        ...(parsedInput.type ? { type: parsedInput.type } : {})
      },
      data: { dismissed: true, seenAt: new Date() }
    });

    // A specific type may have been cleared while other activity types
    // (e.g. a pending message) are still unread — keep the row bold until
    // every type is seen. Only flip isRead when nothing unread is left.
    const remaining = await prisma.notification.count({
      where: {
        userId: session.user.id,
        contactId: parsedInput.contactId,
        dismissed: false
      }
    });
    if (remaining > 0) {
      return;
    }

    const contact = await prisma.contact.findFirst({
      where: {
        id: parsedInput.contactId,
        organizationId: session.user.organizationId
      },
      select: { id: true, isRead: true }
    });
    if (!contact || contact.isRead) {
      return;
    }

    await prisma.contact.update({
      where: { id: contact.id },
      data: { isRead: true }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Contacts,
        session.user.organizationId
      )
    );
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Contact,
        session.user.organizationId,
        contact.id
      )
    );
  });
