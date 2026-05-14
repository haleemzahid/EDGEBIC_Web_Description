import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { type EmailFolder, EmailSenderType } from '@prisma/client';

import {
  Caching,
  defaultRevalidateTimeInSeconds,
  OrganizationCacheKey
} from '@/data/caching';
import { type ClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';

export type ClientMessageThreadListItemDto = {
  id: string;
  folder: EmailFolder;
  subject: string;
  preview: string;
  unread: boolean;
  updatedAt: Date;
  lastSenderType: EmailSenderType | null;
  lastSenderName: string | null;
};

/**
 * Returns the message threads visible to a client, scoped to their linked contact.
 * Shares cache tags with the admin-side email views so server actions that
 * mutate threads revalidate this view automatically.
 */
export async function getClientMessageThreads(
  link: ClientContactLink
): Promise<ClientMessageThreadListItemDto[]> {
  const raw = await cache(
    async () => {
      return prisma.contactEmailThread.findMany({
        where: { contactId: link.contactId },
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          folder: true,
          subject: true,
          preview: true,
          unread: true,
          updatedAt: true,
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
              senderType: true,
              senderName: true
            }
          }
        }
      });
    },
    Caching.createOrganizationKeyParts(
      OrganizationCacheKey.ContactEmails,
      link.organizationId,
      'client-list',
      link.contactId
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactEmails,
          link.organizationId
        ),
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactEmails,
          link.organizationId,
          link.contactId
        )
      ]
    }
  )();

  return raw.map((r) => {
    const last = r.messages[0];
    return {
      id: r.id,
      folder: r.folder,
      subject: r.subject,
      preview: r.preview,
      unread: r.unread,
      updatedAt: new Date(r.updatedAt),
      lastSenderType: last?.senderType ?? null,
      lastSenderName: last?.senderName ?? null
    };
  });
}
