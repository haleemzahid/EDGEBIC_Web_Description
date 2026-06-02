import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { EmailFolder } from '@prisma/client';

import {
  Caching,
  defaultRevalidateTimeInSeconds,
  OrganizationCacheKey
} from '@/data/caching';
import { type ClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';

/**
 * Per-section unseen counts for the client portal sidebar badges.
 *
 * "Unseen" means the team created/replied to something the client hasn't
 * opened yet:
 *   - tickets/meetings/software: `clientUnread` flag (set by the admin
 *     add/reply actions, cleared when the client opens the section)
 *   - messages: existing `ContactEmailThread.unread` on the client's inbox
 *     (DB folder SENT === client inbox — see get-client-message-threads.ts)
 */
export type ClientSidebarCounts = {
  tickets: number;
  messages: number;
  meetings: number;
  software: number;
};

export async function getClientSidebarCounts(
  link: ClientContactLink
): Promise<ClientSidebarCounts> {
  return cache(
    async () => {
      const [tickets, messages, meetings, software] = await Promise.all([
        prisma.contactTicket.count({
          where: { contactId: link.contactId, clientUnread: true }
        }),
        prisma.contactEmailThread.count({
          where: {
            contactId: link.contactId,
            unread: true,
            folder: EmailFolder.SENT,
            clientDeleted: false
          }
        }),
        prisma.contactMeeting.count({
          where: { contactId: link.contactId, clientUnread: true }
        }),
        prisma.contactSoftware.count({
          where: { contactId: link.contactId, clientUnread: true }
        })
      ]);
      return { tickets, messages, meetings, software };
    },
    [`client-sidebar-counts:${link.contactId}`],
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactTickets,
          link.organizationId,
          link.contactId
        ),
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactEmails,
          link.organizationId,
          link.contactId
        ),
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactMeetings,
          link.organizationId,
          link.contactId
        ),
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactSoftware,
          link.organizationId,
          link.contactId
        )
      ]
    }
  )();
}
