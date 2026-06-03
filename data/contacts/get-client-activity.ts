import 'server-only';

import { redirect } from 'next/navigation';

import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';

export type ClientActivityItem = {
  /** Activity type, e.g. 'TICKET' | 'MESSAGE' | 'MEETING'. */
  type: string;
  /** Undismissed notifications of this type for the contact. */
  count: number;
  /** Deep link to the most recent item of this type. */
  link: string;
};

/** Per-contact list of activity items, one entry per type (own badge). */
export type ClientActivityMap = Record<string, ClientActivityItem[]>;

/**
 * Undismissed client-activity notifications for the signed-in team user,
 * keyed by contactId and grouped by type so each type renders its own
 * badge on the Contacts table. Read-only and additive.
 *
 * Pass `contactIds` to scope the query to only the contacts currently
 * visible on the page — otherwise the query loads every undismissed
 * notification for the user, which can be thousands of rows.
 */
export async function getClientActivity(
  contactIds?: string[]
): Promise<ClientActivityMap> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  if (contactIds && contactIds.length === 0) {
    return {};
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userId: session.user.id,
      dismissed: false,
      contactId: contactIds ? { in: contactIds } : { not: null }
    },
    orderBy: { createdAt: 'desc' },
    select: { contactId: true, type: true, link: true }
  });

  const map: ClientActivityMap = {};
  for (const n of notifications) {
    if (!n.contactId) continue;
    const type = n.type ?? 'TICKET';
    const list = map[n.contactId] ?? (map[n.contactId] = []);
    const existing = list.find((i) => i.type === type);
    if (existing) {
      existing.count += 1;
    } else {
      // Ordered desc, so the first of each type is the most recent — use
      // its link for that type's badge.
      list.push({
        type,
        count: 1,
        link: n.link ?? `/dashboard/contacts/${n.contactId}`
      });
    }
  }
  return map;
}
