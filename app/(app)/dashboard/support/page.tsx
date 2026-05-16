import * as React from 'react';
import { type Metadata } from 'next';
import { InfoIcon } from 'lucide-react';

import { ClientTicketsDataTable } from '@/components/dashboard/client-portal/client-tickets-data-table';
import { ClientTicketsEmptyState } from '@/components/dashboard/client-portal/client-tickets-empty-state';
import { ClientTicketsFilters } from '@/components/dashboard/client-portal/client-tickets-filters';
import { searchParamsCache } from '@/components/dashboard/client-portal/client-tickets-search-params';
import { ClientUnlinkedNotice } from '@/components/dashboard/client-portal/client-unlinked-notice';
import { NewClientTicketButton } from '@/components/dashboard/client-portal/new-ticket-button';
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
import { getClientTicketsList } from '@/data/client-portal/get-client-tickets';
import { TransitionProvider } from '@/hooks/use-transition-context';
import { requireClientRole } from '@/lib/auth/require-client-role';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

export const metadata: Metadata = {
  title: createTitle('Tickets')
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ClientSupportPage({
  searchParams
}: NextPageProps): Promise<React.JSX.Element> {
  const { link } = await requireClientRole();
  if (!link) {
    return <ClientUnlinkedNotice title="Tickets" />;
  }

  const parsedSearchParams = await searchParamsCache.parse(searchParams);
  const { tickets, filteredCount, totalCount } = await getClientTicketsList(
    link,
    parsedSearchParams
  );

  const hasAnyTickets = totalCount > 0;

  return (
    <TransitionProvider>
      <Page>
        <PageHeader>
          <PagePrimaryBar>
            <div className="flex flex-row items-center gap-1">
              <PageTitle>Tickets</PageTitle>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <InfoIcon className="hidden size-3 shrink-0 text-muted-foreground sm:inline" />
                </TooltipTrigger>
                <TooltipContent>
                  Total {totalCount} {totalCount === 1 ? 'ticket' : 'tickets'}
                </TooltipContent>
              </Tooltip>
            </div>
            {hasAnyTickets && (
              <PageActions>
                <NewClientTicketButton />
              </PageActions>
            )}
          </PagePrimaryBar>
          {hasAnyTickets && (
            <PageSecondaryBar>
              <React.Suspense>
                <ClientTicketsFilters />
              </React.Suspense>
            </PageSecondaryBar>
          )}
        </PageHeader>
        <PageBody disableScroll={hasAnyTickets}>
          {hasAnyTickets ? (
            <React.Suspense>
              <ClientTicketsDataTable
                data={tickets}
                totalCount={filteredCount}
              />
            </React.Suspense>
          ) : (
            <ClientTicketsEmptyState />
          )}
        </PageBody>
      </Page>
    </TransitionProvider>
  );
}
