'use server';

import { authActionClient } from '@/actions/safe-action';
import { prisma } from '@/lib/db/prisma';
import { dismissContactNotificationsSchema } from '@/schemas/notifications/dismiss-contact-notifications-schema';

// Clears the Contacts-table client-activity badge for one contact by
// dismissing the signed-in user's notifications for it.
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
  });
