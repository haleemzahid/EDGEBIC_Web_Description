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
      organizationId: true
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

  const contact = await prisma.contact.findFirst({
    where: {
      organizationId: user.organizationId,
      email: user.email
    },
    select: { id: true }
  });
  if (!contact) return null;

  return {
    userId: user.id,
    organizationId: user.organizationId,
    contactId: contact.id,
    email: user.email,
    name: user.name
  };
}
