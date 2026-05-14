import * as React from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { EmailFolder } from '@prisma/client';

import { ClientMessagesList } from '@/components/dashboard/client-portal/client-messages-list';
import { ClientUnlinkedNotice } from '@/components/dashboard/client-portal/client-unlinked-notice';
import { NewMessageButton } from '@/components/dashboard/client-portal/new-message-button';
import {
  Page,
  PageActions,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Routes } from '@/constants/routes';
import { getClientMessageThreads } from '@/data/client-portal/get-client-message-threads';
import { requireClientRole } from '@/lib/auth/require-client-role';
import { cn, createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Messages')
};

type TabKey = 'inbox' | 'sent';

type SearchParams = { tab?: string };

export default async function ClientMessagesPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}): Promise<React.JSX.Element> {
  const { link } = await requireClientRole();
  if (!link) {
    return <ClientUnlinkedNotice title="Messages" />;
  }

  const { tab } = await searchParams;
  const activeTab: TabKey = tab === 'sent' ? 'sent' : 'inbox';

  const allThreads = await getClientMessageThreads(link);

  // The DB `folder` field is from the team's perspective:
  //   - folder = SENT  → team sent it (so the client RECEIVED it → client's Inbox)
  //   - folder = INBOX → client started it (so it's in the client's Sent)
  const inboxThreads = allThreads.filter((t) => t.folder === EmailFolder.SENT);
  const sentThreads = allThreads.filter((t) => t.folder === EmailFolder.INBOX);

  const visibleThreads = activeTab === 'inbox' ? inboxThreads : sentThreads;
  const inboxUnreadCount = inboxThreads.filter((t) => t.unread).length;

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Messages</PageTitle>
          <PageActions>
            <NewMessageButton />
          </PageActions>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <div className="flex w-full flex-col gap-6 p-6">
          <div className="flex flex-row gap-1 border-b">
            <Tab
              active={activeTab === 'inbox'}
              label="Inbox"
              count={inboxThreads.length}
              badge={inboxUnreadCount}
              href={Routes.ClientMessages}
            />
            <Tab
              active={activeTab === 'sent'}
              label="Sent"
              count={sentThreads.length}
              href={`${Routes.ClientMessages}?tab=sent`}
            />
          </div>

          <ClientMessagesList
            activeTab={activeTab}
            threads={visibleThreads.map((t) => ({
              id: t.id,
              subject: t.subject,
              preview: t.preview,
              unread: t.unread,
              updatedAt: t.updatedAt,
              lastSenderType: t.lastSenderType,
              lastSenderName: t.lastSenderName
            }))}
          />
        </div>
      </PageBody>
    </Page>
  );
}

function Tab({
  active,
  label,
  count,
  badge,
  href
}: {
  active: boolean;
  label: string;
  count: number;
  badge?: number;
  href: string;
}): React.JSX.Element {
  return (
    <Link
      href={href}
      className={cn(
        '-mb-px flex items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors',
        active
          ? 'border-foreground text-foreground'
          : 'border-transparent text-muted-foreground hover:text-foreground'
      )}
    >
      {label}
      <span
        className={cn(
          'rounded-full px-1.5 text-[11px] font-semibold',
          active
            ? 'bg-foreground text-background'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {count}
      </span>
      {badge && badge > 0 ? (
        <span className="rounded-full bg-sky-500 px-1.5 text-[11px] font-semibold text-white">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}
