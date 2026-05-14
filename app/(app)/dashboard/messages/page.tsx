import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { EmailFolder } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

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

export default async function ClientMessagesPage(): Promise<React.JSX.Element> {
  const { link } = await requireClientRole();
  if (!link) {
    return <ClientUnlinkedNotice title="Messages" />;
  }

  const threads = await getClientMessageThreads(link);

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
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
          <p className="text-sm text-muted-foreground">
            Email conversations between you and your project team.
          </p>

          <section className="overflow-hidden rounded-lg border bg-card">
            <h2 className="border-b bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {threads.length === 0
                ? 'No messages yet'
                : `${threads.length} thread${threads.length === 1 ? '' : 's'}`}
            </h2>
            {threads.length === 0 ? (
              <p className="px-4 py-6 text-sm text-muted-foreground">
                When your project team emails you, the conversation will
                appear here.
              </p>
            ) : (
              <ul className="divide-y">
                {threads.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`${Routes.ClientMessages}/${t.id}`}
                      className={cn(
                        'flex items-start gap-4 px-4 py-3 transition-colors hover:bg-accent/40',
                        t.unread && 'bg-sky-50/60 hover:bg-sky-50'
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span
                            className={cn(
                              'truncate text-sm',
                              t.unread ? 'font-semibold' : 'font-medium'
                            )}
                          >
                            {t.subject}
                          </span>
                          <span className="ml-auto shrink-0 text-[11px] uppercase tracking-wide text-muted-foreground">
                            {t.folder === EmailFolder.SENT
                              ? 'Sent'
                              : 'Received'}
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
                      {t.unread && (
                        <span className="mt-1 inline-block size-2 shrink-0 rounded-full bg-sky-500" />
                      )}
                    </Link>
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

