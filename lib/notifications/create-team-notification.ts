import 'server-only';

import { prisma } from '@/lib/db/prisma';

export type TeamNotificationType = 'TICKET' | 'MESSAGE';

export type CreateTeamNotificationArgs = {
  /** The team user (admin/member) that should receive the notification. */
  userId: string;
  subject: string;
  content: string;
  /** In-app relative link, e.g. /dashboard/contacts/<id>/tickets/<id>. */
  link: string;
  /** The CRM contact the client activity happened on. */
  contactId: string;
  type: TeamNotificationType;
};

/**
 * Persist an in-app notification for the team about client activity on a
 * contact. Additive + best-effort — callers invoke it inside their existing
 * best-effort "notify team" path and swallow errors so it never blocks the
 * client action.
 */
export async function createTeamNotification(
  args: CreateTeamNotificationArgs
): Promise<void> {
  await prisma.notification.create({
    data: {
      userId: args.userId,
      subject: args.subject.slice(0, 128),
      content: args.content.slice(0, 8000),
      link: args.link.slice(0, 2000),
      contactId: args.contactId,
      type: args.type
    }
  });
}
