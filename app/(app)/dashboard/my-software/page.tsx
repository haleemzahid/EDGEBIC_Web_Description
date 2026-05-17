import * as React from 'react';
import { type Metadata } from 'next';
import { revalidateTag } from 'next/cache';
import { after } from 'next/server';
import { InfoIcon } from 'lucide-react';

import { ClientSoftwareEmptyState } from '@/components/dashboard/client-portal/client-software-empty-state';
import { ClientSoftwareFilters } from '@/components/dashboard/client-portal/client-software-filters';
import { ClientSoftwareList } from '@/components/dashboard/client-portal/client-software-list';
import { searchParamsCache } from '@/components/dashboard/client-portal/client-software-search-params';
import { ClientUnlinkedNotice } from '@/components/dashboard/client-portal/client-unlinked-notice';
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
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientSoftwareList } from '@/data/client-portal/get-client-software';
import { TransitionProvider } from '@/hooks/use-transition-context';
import { requireClientRole } from '@/lib/auth/require-client-role';
import { prisma } from '@/lib/db/prisma';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

export const metadata: Metadata = {
  title: createTitle('My Software')
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ClientSoftwarePage({
  searchParams
}: NextPageProps): Promise<React.JSX.Element> {
  const { link } = await requireClientRole();
  if (!link) {
    return <ClientUnlinkedNotice title="My Software" />;
  }

  // Visiting the list counts as "seen" — clear every unseen software row for
  // this client so the sidebar badge drops. Deferred via `after()` because
  // `revalidateTag` can't run during render in Next 15.
  const cleared = await prisma.contactSoftware.updateMany({
    where: { contactId: link.contactId, clientUnread: true },
    data: { clientUnread: false }
  });
  if (cleared.count > 0) {
    after(() => {
      revalidateTag(
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactSoftware,
          link.organizationId,
          link.contactId
        )
      );
    });
  }

  const parsedSearchParams = await searchParamsCache.parse(searchParams);
  const { software, filteredCount, totalCount } = await getClientSoftwareList(
    link,
    parsedSearchParams
  );

  const hasAnySoftware = totalCount > 0;

  return (
    <TransitionProvider>
      <Page>
        <PageHeader>
          <PagePrimaryBar>
            <div className="flex flex-row items-center gap-1">
              <PageTitle>My Software</PageTitle>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <InfoIcon className="hidden size-3 shrink-0 text-muted-foreground sm:inline" />
                </TooltipTrigger>
                <TooltipContent>
                  Total {totalCount} {totalCount === 1 ? 'product' : 'products'}
                </TooltipContent>
              </Tooltip>
            </div>
          </PagePrimaryBar>
          {hasAnySoftware && (
            <PageSecondaryBar>
              <React.Suspense>
                <ClientSoftwareFilters />
              </React.Suspense>
            </PageSecondaryBar>
          )}
        </PageHeader>
        <PageBody disableScroll={hasAnySoftware}>
          {hasAnySoftware ? (
            <React.Suspense>
              <ClientSoftwareList
                software={software}
                totalCount={filteredCount}
              />
            </React.Suspense>
          ) : (
            <ClientSoftwareEmptyState />
          )}
        </PageBody>
      </Page>
    </TransitionProvider>
  );
}
