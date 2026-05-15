import * as React from 'react';
import { type Metadata } from 'next';
import { InfoIcon } from 'lucide-react';

import { ClientMessagesEmptyState } from '@/components/dashboard/client-portal/client-messages-empty-state';
import { ClientMessagesFilters } from '@/components/dashboard/client-portal/client-messages-filters';
import { ClientMessagesList } from '@/components/dashboard/client-portal/client-messages-list';
import { searchParamsCache } from '@/components/dashboard/client-portal/client-messages-search-params';
import { ClientUnlinkedNotice } from '@/components/dashboard/client-portal/client-unlinked-notice';
import { NewMessageButton } from '@/components/dashboard/client-portal/new-message-button';
import {
  Page,
  PageActions,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageSecondaryBar,
  PageTitle
} from '@/components/ui/page';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { getClientMessageThreadsList } from '@/data/client-portal/get-client-message-threads';
import { TransitionProvider } from '@/hooks/use-transition-context';
import { requireClientRole } from '@/lib/auth/require-client-role';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

export const metadata: Metadata = {
  title: createTitle('Messages')
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ClientMessagesPage({
  searchParams
}: NextPageProps): Promise<React.JSX.Element> {
  const { link } = await requireClientRole();
  if (!link) {
    return <ClientUnlinkedNotice title="Messages" />;
  }

  const parsedSearchParams = await searchParamsCache.parse(searchParams);
  const {
    threads,
    filteredCount,
    inboxTotalCount,
    sentTotalCount,
    inboxUnreadCount
  } = await getClientMessageThreadsList(link, parsedSearchParams);

  const totalCount = inboxTotalCount + sentTotalCount;
  const hasAnyMessages = totalCount > 0;

  return (
    <TransitionProvider>
      <Page>
        <PageHeader>
          <PagePrimaryBar>
            <div className="flex flex-row items-center gap-1">
              <PageTitle>Messages</PageTitle>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <InfoIcon className="hidden size-3 shrink-0 text-muted-foreground sm:inline" />
                </TooltipTrigger>
                <TooltipContent>
                  Total {totalCount} {totalCount === 1 ? 'message' : 'messages'}
                </TooltipContent>
              </Tooltip>
            </div>
            {hasAnyMessages && (
              <PageActions>
                <NewMessageButton />
              </PageActions>
            )}
          </PagePrimaryBar>
          {hasAnyMessages && (
            <PageSecondaryBar>
              <React.Suspense>
                <ClientMessagesFilters />
              </React.Suspense>
            </PageSecondaryBar>
          )}
        </PageHeader>
        <PageBody disableScroll={hasAnyMessages}>
          {hasAnyMessages ? (
            <React.Suspense>
              <ClientMessagesList
                threads={threads}
                activeFolder={parsedSearchParams.folder}
                filteredCount={filteredCount}
              />
            </React.Suspense>
          ) : (
            <ClientMessagesEmptyState />
          )}
        </PageBody>
      </Page>
    </TransitionProvider>
  );
}
