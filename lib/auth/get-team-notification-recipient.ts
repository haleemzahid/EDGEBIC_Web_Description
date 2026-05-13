import 'server-only';

import { Role } from '@prisma/client';

import { prisma } from '@/lib/db/prisma';

export type TeamNotificationRecipient = {
  userId: string;
  email: string;
  name: string;
};

/**
 * Find an admin in the organization to receive client-activity emails.
 * Falls back to any non-CLIENT member if no admin exists.
 */
export async function getTeamNotificationRecipient(
  organizationId: string
): Promise<TeamNotificationRecipient | null> {
  const admin = await prisma.user.findFirst({
    where: {
      organizationId,
      role: Role.ADMIN,
      email: { not: null }
    },
    orderBy: { createdAt: 'asc' },
    select: { id: true, name: true, email: true }
  });
  if (admin?.email) {
    return { userId: admin.id, name: admin.name, email: admin.email };
  }
  const member = await prisma.user.findFirst({
    where: {
      organizationId,
      role: Role.MEMBER,
      email: { not: null }
    },
    orderBy: { createdAt: 'asc' },
    select: { id: true, name: true, email: true }
  });
  if (member?.email) {
    return { userId: member.id, name: member.name, email: member.email };
  }
  return null;
}
