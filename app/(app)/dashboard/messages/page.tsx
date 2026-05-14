import * as React from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { EmailFolder } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

import { ClientUnlinkedNotice } from '@/components/dashboard/client-portal/client-unlinked-notice';
import { DeleteClientMessageButton } from '@/components/dashboard/client-portal/delete-client-message-button';
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

          <section className="overflow-hidden rounded-lg border bg-card">
            {visibleThreads.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                {activeTab === 'inbox'
                  ? "Your inbox is empty. When your project team emails you, it'll appear here."
                  : "You haven't sent any messages yet."}
              </p>
            ) : (
              <ul className="divide-y">
                {visibleThreads.map((t) => (
                  <li
                    key={t.id}
                    className={cn(
                      'group relative flex items-stretch transition-colors hover:bg-accent/40',
                      t.unread &&
                        activeTab === 'inbox' &&
                        'bg-sky-50/60 hover:bg-sky-50'
                    )}
                  >
                    <Link
                      href={`${Routes.ClientMessages}/${t.id}`}
                      className="flex min-w-0 flex-1 items-start gap-4 px-4 py-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span
                            className={cn(
                              'truncate text-sm',
                              t.unread && activeTab === 'inbox'
                                ? 'font-semibold'
                                : 'font-medium'
                            )}
                          >
                            {t.subject}
                          </span>
                        </div>
                        {t.preview && (
                          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                            {t.preview}
                          </p>
                        )}
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {formatDistanceToNow(t.updatedAt, {
                            addSuffix: true
                          })}
                        </p>
                      </div>
                      {t.unread && activeTab === 'inbox' && (
                        <span className="mt-1 inline-block size-2 shrink-0 rounded-full bg-sky-500" />
                      )}
                    </Link>
                    <div className="flex items-center pr-3">
                      <DeleteClientMessageButton
                        threadId={t.id}
                        subject={t.subject}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
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
