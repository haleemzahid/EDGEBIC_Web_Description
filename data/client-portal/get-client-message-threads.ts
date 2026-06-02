import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import {
  EmailFolder,
  EmailSenderType,
  Prisma,
  type EmailFolder as EmailFolderType
} from '@prisma/client';

import {
  Caching,
  defaultRevalidateTimeInSeconds,
  OrganizationCacheKey
} from '@/data/caching';
import { type ClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';
import { ValidationError } from '@/lib/validation/exceptions';
import {
  getClientMessageThreadsSchema,
  MessageFolderOption,
  MessageReadUnread,
  type GetClientMessageThreadsSchema
} from '@/schemas/client-portal/get-client-message-threads-schema';

export type ClientMessageThreadListItemDto = {
  id: string;
  folder: EmailFolderType;
  subject: string;
  preview: string;
  unread: boolean;
  updatedAt: Date;
  lastSenderType: EmailSenderType | null;
  lastSenderName: string | null;
};

/**
 * Returns all message threads visible to a client, scoped to their linked contact.
 * Shares cache tags with the admin-side email views so server actions that
 * mutate threads revalidate this view automatically.
 */
export async function getClientMessageThreads(
  link: ClientContactLink
): Promise<ClientMessageThreadListItemDto[]> {
  const raw = await cache(
    async () => {
      return prisma.contactEmailThread.findMany({
        where: { contactId: link.contactId, clientDeleted: false },
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

export type GetClientMessageThreadsListResult = {
  threads: ClientMessageThreadListItemDto[];
  filteredCount: number;
  totalCount: number;
  inboxUnreadCount: number;
  inboxTotalCount: number;
  sentTotalCount: number;
};

/**
 * Filtered, paginated, search-aware version. Not cached (filters vary).
 * Note: DB `folder` is from the TEAM perspective:
 *   - DB folder SENT  → team sent → client's INBOX
 *   - DB folder INBOX → client started → client's SENT
 */
export async function getClientMessageThreadsList(
  link: ClientContactLink,
  input: GetClientMessageThreadsSchema
): Promise<GetClientMessageThreadsListResult> {
  const result = getClientMessageThreadsSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsed = result.data;

  const baseFilter: Prisma.ContactEmailThreadWhereInput = {
    contactId: link.contactId,
    clientDeleted: false
  };

  const folderFilter: Prisma.ContactEmailThreadWhereInput | undefined =
    parsed.folder === MessageFolderOption.Inbox
      ? { folder: EmailFolder.SENT }
      : parsed.folder === MessageFolderOption.Sent
        ? { folder: EmailFolder.INBOX }
        : undefined;

  const readFilter: Prisma.ContactEmailThreadWhereInput | undefined =
    parsed.readFilter === MessageReadUnread
      ? { unread: true, folder: EmailFolder.SENT }
      : undefined;

  const trimmed = parsed.searchQuery.trim();
  const textSearch: Prisma.ContactEmailThreadWhereInput | undefined = trimmed
    ? {
        OR: [
          { subject: { contains: trimmed, mode: 'insensitive' as const } },
          { preview: { contains: trimmed, mode: 'insensitive' as const } }
        ]
      }
    : undefined;

  const where: Prisma.ContactEmailThreadWhereInput = {
    AND: [
      baseFilter,
      folderFilter ?? {},
      readFilter ?? {},
      textSearch ?? {}
    ]
  };

  const [rows, filteredCount, inboxTotalCount, sentTotalCount, inboxUnreadCount] =
    await prisma.$transaction([
      prisma.contactEmailThread.findMany({
        skip: parsed.pageIndex * parsed.pageSize,
        take: parsed.pageSize,
        where,
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
            select: { senderType: true, senderName: true }
          }
        }
      }),
      prisma.contactEmailThread.count({ where }),
      prisma.contactEmailThread.count({
        where: { ...baseFilter, folder: EmailFolder.SENT }
      }),
      prisma.contactEmailThread.count({
        where: { ...baseFilter, folder: EmailFolder.INBOX }
      }),
      prisma.contactEmailThread.count({
        where: { ...baseFilter, folder: EmailFolder.SENT, unread: true }
      })
    ]);

  return {
    threads: rows.map((r) => {
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
    }),
    filteredCount,
    totalCount: inboxTotalCount + sentTotalCount,
    inboxUnreadCount,
    inboxTotalCount,
    sentTotalCount
  };
}
