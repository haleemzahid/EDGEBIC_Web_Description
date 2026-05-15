import * as React from 'react';
import { type Metadata } from 'next';
import { InfoIcon } from 'lucide-react';

import { TicketsEmptyState } from '@/components/dashboard/tickets/tickets-empty-state';
import { TicketsFilters } from '@/components/dashboard/tickets/tickets-filters';
import { TicketsList } from '@/components/dashboard/tickets/tickets-list';
import { searchParamsCache } from '@/components/dashboard/tickets/tickets-search-params';
import {
  Page,
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
import { getMembers } from '@/data/members/get-members';
import { getTickets } from '@/data/tickets/get-tickets';
import { TransitionProvider } from '@/hooks/use-transition-context';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

export const metadata: Metadata = {
  title: createTitle('Tickets')
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TicketsPage({
  searchParams
}: NextPageProps): Promise<React.JSX.Element> {
  const parsedSearchParams = await searchParamsCache.parse(searchParams);

  const [{ tickets, filteredCount, totalCount }, members] = await Promise.all([
    getTickets(parsedSearchParams),
    getMembers()
  ]);

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
                  Total {totalCount} {totalCount === 1 ? 'ticket' : 'tickets'}{' '}
                  in your organization
                </TooltipContent>
              </Tooltip>
            </div>
          </PagePrimaryBar>
          {hasAnyTickets && (
            <PageSecondaryBar>
              <React.Suspense>
                <TicketsFilters members={members} />
              </React.Suspense>
            </PageSecondaryBar>
          )}
        </PageHeader>
        <PageBody disableScroll={hasAnyTickets}>
          {hasAnyTickets ? (
            <React.Suspense>
              <TicketsList
                tickets={tickets}
                filteredCount={filteredCount}
              />
            </React.Suspense>
          ) : (
            <TicketsEmptyState />
          )}
        </PageBody>
      </Page>
    </TransitionProvider>
  );
}
