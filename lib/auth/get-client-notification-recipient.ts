import 'server-only';

import { Role } from '@prisma/client';

import { prisma } from '@/lib/db/prisma';

export type ClientNotificationRecipient = {
  userId: string | null;
  email: string;
  name: string;
};

/**
 * Find the email address for a client linked to a CRM contact. Prefers the
 * linked CLIENT user (so the email goes to their portal login), falling back
 * to the Contact's own email when no user account is linked yet.
 */
export async function getClientNotificationRecipient(
  contactId: string
): Promise<ClientNotificationRecipient | null> {
  const user = await prisma.user.findFirst({
    where: {
      contactId,
      role: Role.CLIENT,
      email: { not: null }
    },
    select: { id: true, name: true, email: true }
  });
  if (user?.email) {
    return { userId: user.id, name: user.name, email: user.email };
  }
  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
    select: { name: true, email: true }
  });
  if (contact?.email) {
    return { userId: null, name: contact.name, email: contact.email };
  }
  return null;
}
