import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  Caching,
  defaultRevalidateTimeInSeconds,
  OrganizationCacheKey
} from '@/data/caching';
import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { ValidationError } from '@/lib/validation/exceptions';
import {
  getContactEmailsSchema,
  type GetContactEmailsSchema
} from '@/schemas/contacts/get-contact-emails-schema';
import type {
  ContactEmailMessageDto,
  ContactEmailThreadDto
} from '@/types/dtos/contact-email-dto';
import { SortDirection } from '@/types/sort-direction';

export async function getContactEmails(
  input: GetContactEmailsSchema
): Promise<ContactEmailThreadDto[]> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const result = getContactEmailsSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsedInput = result.data;

  return cache(
    async () => {
      const threads = await prisma.contactEmailThread.findMany({
        where: {
          contactId: parsedInput.contactId,
          contact: {
            organizationId: session.user.organizationId
          }
        },
        select: {
          id: true,
          contactId: true,
          folder: true,
          subject: true,
          preview: true,
          unread: true,
          createdAt: true,
          updatedAt: true,
          messages: {
            select: {
              id: true,
              threadId: true,
              senderType: true,
              senderUserId: true,
              senderName: true,
              senderEmail: true,
              recipientName: true,
              recipientEmail: true,
              body: true,
              createdAt: true,
              senderUser: {
                select: {
                  image: true
                }
              }
            },
            orderBy: {
              createdAt: SortDirection.Asc
            }
          }
        },
        orderBy: {
          updatedAt: SortDirection.Desc
        }
      });

      const mapped: ContactEmailThreadDto[] = threads.map((thread) => {
        const messages: ContactEmailMessageDto[] = thread.messages.map((m) => ({
          id: m.id,
          threadId: m.threadId,
          senderType: m.senderType,
          senderUserId: m.senderUserId ?? undefined,
          senderName: m.senderName,
          senderEmail: m.senderEmail ?? undefined,
          senderImage: m.senderUser?.image ?? undefined,
          recipientName: m.recipientName ?? undefined,
          recipientEmail: m.recipientEmail ?? undefined,
          body: m.body,
          createdAt: m.createdAt
        }));
        return {
          id: thread.id,
          contactId: thread.contactId,
          folder: thread.folder,
          subject: thread.subject,
          preview: thread.preview,
          unread: thread.unread,
          createdAt: thread.createdAt,
          updatedAt: thread.updatedAt,
          messages
        };
      });

      return mapped;
    },
    Caching.createOrganizationKeyParts(
      OrganizationCacheKey.ContactEmails,
      session.user.organizationId,
      parsedInput.contactId
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactEmails,
          session.user.organizationId,
          parsedInput.contactId
        ),
        Caching.createOrganizationTag(
          OrganizationCacheKey.Contact,
          session.user.organizationId,
          parsedInput.contactId
        )
      ]
    }
  )();
}
