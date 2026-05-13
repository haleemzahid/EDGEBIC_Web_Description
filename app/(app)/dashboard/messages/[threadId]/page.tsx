import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { EmailFolder, EmailSenderType, Role } from '@prisma/client';
import { format } from 'date-fns';
import { ChevronLeftIcon } from 'lucide-react';

import { ClientMessageReply } from '@/components/dashboard/client-portal/client-message-reply';
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
import { cn, createTitle } from '@/lib/utils';

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
      contactId: link.contactId
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
          createdAt: true
        }
      }
    }
  });
  if (!thread) {
    notFound();
  }

  // Fix #3: auto-clear unread when the client opens the thread.
  if (thread.unread) {
    await prisma.contactEmailThread.update({
      where: { id: thread.id },
      data: { unread: false }
    });
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactEmails,
        link.organizationId,
        link.contactId
      )
    );
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
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-0 overflow-hidden p-4">
          <div className="flex-1 space-y-4 overflow-y-auto rounded-t-lg border border-b-0 bg-card p-4">
            {thread.messages.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No messages in this conversation yet.
              </p>
            ) : (
              thread.messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  authorName={m.senderName}
                  authorEmail={m.senderEmail}
                  authorIsClient={m.senderType === EmailSenderType.CONTACT}
                  body={m.body}
                  createdAt={m.createdAt}
                />
              ))
            )}
          </div>
          <div className="rounded-b-lg border bg-card">
            <ClientMessageReply threadId={thread.id} />
          </div>
        </div>
      </PageBody>
    </Page>
  );
}

function MessageBubble({
  authorName,
  authorEmail,
  authorIsClient,
  body,
  createdAt
}: {
  authorName: string;
  authorEmail: string | null;
  authorIsClient: boolean;
  body: string;
  createdAt: Date;
}): React.JSX.Element {
  return (
    <div
      className={cn('flex', authorIsClient ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm',
          authorIsClient
            ? 'bg-primary text-primary-foreground'
            : 'border bg-muted text-foreground'
        )}
      >
        <div
          className={cn(
            'mb-1 flex items-baseline gap-2 text-[11px]',
            authorIsClient
              ? 'text-primary-foreground/70'
              : 'text-muted-foreground'
          )}
        >
          <span className="font-semibold">
            {authorIsClient ? 'You' : authorName}
          </span>
          {!authorIsClient && authorEmail && (
            <span className="truncate">&lt;{authorEmail}&gt;</span>
          )}
          <span>·</span>
          <span>{format(createdAt, 'MMM d, h:mm a')}</span>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
