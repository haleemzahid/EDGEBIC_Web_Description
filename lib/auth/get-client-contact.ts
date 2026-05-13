import 'server-only';

import { Role } from '@prisma/client';

import { prisma } from '@/lib/db/prisma';

export type ClientContactLink = {
  userId: string;
  organizationId: string;
  contactId: string;
  email: string;
  name: string;
};

export async function getClientContactLink(
  userId: string
): Promise<ClientContactLink | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      email: true,
      name: true,
      organizationId: true,
      contactId: true
    }
  });
  if (
    !user ||
    user.role !== Role.CLIENT ||
    !user.email ||
    !user.organizationId
  ) {
    return null;
  }

  // Prefer the explicit User.contactId link. Falls back to email match (for
  // users created before the contactId column existed) and, when a match is
  // found that way, persists it back to User.contactId so future calls are
  // O(1) and stable against email changes.
  let contactId = user.contactId;
  if (!contactId) {
    const contact = await prisma.contact.findFirst({
      where: {
        organizationId: user.organizationId,
        email: user.email
      },
      select: { id: true }
    });
    if (!contact) return null;
    contactId = contact.id;
    await prisma.user
      .update({
        where: { id: user.id },
        data: { contactId }
      })
      .catch((error) => {
        console.error(
          '[getClientContactLink] Failed to persist contactId:',
          error
        );
      });
  }

  return {
    userId: user.id,
    organizationId: user.organizationId,
    contactId,
    email: user.email,
    name: user.name
  };
}
