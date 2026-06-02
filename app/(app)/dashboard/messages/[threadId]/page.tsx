import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { after } from 'next/server';
import { EmailFolder, Role } from '@prisma/client';
import { ChevronLeftIcon } from 'lucide-react';

import { ClientMessageConversation } from '@/components/dashboard/client-portal/client-message-conversation';
import {
  Page,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Routes } from '@/constants/routes';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { dedupedAuth } from '@/lib/auth';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { createTitle } from '@/lib/utils';

type Params = { threadId: string };

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { threadId } = await params;
  const thread = await prisma.contactEmailThread.findUnique({
    where: { id: threadId },
    select: { subject: true }
  });
  return {
    title: createTitle(thread?.subject ?? 'Message')
  };
}

export default async function ClientMessageDetailPage({
  params
}: {
  params: Promise<Params>;
}): Promise<React.JSX.Element> {
  const { threadId } = await params;
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const userFromDb = await prisma.user.findFirst({
    where: { id: session.user.id },
    select: { role: true }
  });
  if (!userFromDb || userFromDb.role !== Role.CLIENT) {
    return redirect(Routes.Home);
  }

  const link = await getClientContactLink(session.user.id);
  if (!link) {
    return redirect(Routes.ClientMessages);
  }

  const thread = await prisma.contactEmailThread.findFirst({
    where: {
      id: threadId,
      contactId: link.contactId,
      // If the client trashed this thread, treat the URL as not-found so
      // they can't deep-link back into a "deleted" conversation.
      clientDeleted: false
    },
    select: {
      id: true,
      folder: true,
      subject: true,
      unread: true,
      createdAt: true,
      messages: {
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          senderType: true,
          senderName: true,
          senderEmail: true,
          body: true,
          createdAt: true,
          attachments: {
            orderBy: { createdAt: 'asc' },
            select: {
              id: true,
              fileName: true,
              storedName: true,
              mimeType: true,
              sizeBytes: true
            }
          }
        }
      }
    }
  });
  if (!thread) {
    notFound();
  }

  // Auto-clear unread only when the client opens a thread the admin sent
  // (folder = SENT from the team's perspective). `unread` semantics is "the
  // recipient hasn't read this yet" — for client-authored threads (folder =
  // INBOX) the admin is the recipient, so the client viewing must NOT clear
  // the flag, otherwise the CRM badge / bold row state goes stale.
  if (thread.unread && thread.folder === EmailFolder.SENT) {
    await prisma.contactEmailThread.update({
      where: { id: thread.id },
      data: { unread: false }
    });
    after(() => {
      revalidateTag(
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactEmails,
          link.organizationId,
          link.contactId
        )
      );
    });
  }

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <div className="flex min-w-0 items-center gap-2">
            <Link
              href={Routes.ClientMessages}
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              title="Back to Messages"
            >
              <ChevronLeftIcon className="size-4" />
            </Link>
            <PageTitle className="truncate">{thread.subject}</PageTitle>
          </div>
          <span className="shrink-0 text-[11px] uppercase tracking-wide text-muted-foreground">
            {thread.folder === EmailFolder.SENT ? 'Outbound' : 'Inbound'}
          </span>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody
        disableScroll
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <div className="flex w-full flex-1 flex-col gap-0 overflow-hidden p-4">
          <ClientMessageConversation
            threadId={thread.id}
            clientName={link.name}
            initialMessages={thread.messages.map((m) => ({
              id: m.id,
              senderType: m.senderType,
              senderName: m.senderName,
              senderEmail: m.senderEmail,
              body: m.body,
              createdAt: m.createdAt,
              attachments: m.attachments.map((a) => ({
                id: a.id,
                fileName: a.fileName,
                storedName: a.storedName,
                mimeType: a.mimeType,
                sizeBytes: a.sizeBytes
              }))
            }))}
          />
        </div>
      </PageBody>
    </Page>
  );
}

