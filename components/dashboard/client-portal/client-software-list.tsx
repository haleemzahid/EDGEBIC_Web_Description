'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { SoftwareStatus } from '@prisma/client';
import { format } from 'date-fns';
import { BoxIcon, DownloadIcon, ExternalLinkIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { searchParams } from '@/components/dashboard/client-portal/client-software-search-params';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CenteredSpinner } from '@/components/ui/spinner';
import { useTransitionContext } from '@/hooks/use-transition-context';
import { cn } from '@/lib/utils';
import type { ClientSoftwareDto } from '@/data/client-portal/get-client-software';

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

export type ClientSoftwareListProps = {
  software: ClientSoftwareDto[];
  filteredCount: number;
};

function statusBadge(status: SoftwareStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case SoftwareStatus.UP_TO_DATE:
      return {
        label: 'Up to date',
        className:
          'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
      };
    case SoftwareStatus.UPDATE_AVAILABLE:
      return {
        label: 'Update available',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case SoftwareStatus.NEEDS_ATTENTION:
      return {
        label: 'Needs attention',
        className:
          'border-transparent bg-rose-100 text-rose-800 hover:bg-rose-100'
      };
    case SoftwareStatus.TRIAL:
      return {
        label: 'Trial',
        className:
          'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100'
      };
    case SoftwareStatus.NOT_INSTALLED:
      return {
        label: 'Not installed',
        className: 'border-transparent bg-muted text-muted-foreground'
      };
  }
}

export function ClientSoftwareList({
  software,
  filteredCount
}: ClientSoftwareListProps): React.JSX.Element {
  const router = useRouter();
  const { isLoading, startTransition } = useTransitionContext();

  // Auto-refresh so version/status updates from the team appear without a
  // manual reload. Only poll while the tab is visible to keep load light.
  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        router.refresh();
      }
    }, 10_000);
    return () => window.clearInterval(id);
  }, [router]);

  const [pageIndex, setPageIndex] = useQueryState(
    'pageIndex',
    searchParams.pageIndex.withOptions({ startTransition, shallow: false })
  );
  const [pageSize, setPageSize] = useQueryState(
    'pageSize',
    searchParams.pageSize.withOptions({ startTransition, shallow: false })
  );

  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
  const canPrev = pageIndex > 0;
  const canNext = pageIndex < totalPages - 1;

  const handlePageSizeChange = (value: string): void => {
    void setPageSize(Number(value));
    void setPageIndex(0);
  };

  return (
    <div className="relative flex flex-col overflow-hidden">
      {/* 64px (primary bar) + 48px (secondary bar) + 65px (pagination) = 177px */}
      <ScrollArea
        verticalScrollBar
        className="h-[calc(100svh-177px)]"
      >
        {software.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <BoxIcon className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">No software matches these filters</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try clearing filters or changing the search.
              </p>
            </div>
          </div>
        ) : (
          <ul className="divide-y">
            {software.map((s) => (
              <SoftwareRow
                key={s.id}
                software={s}
              />
            ))}
          </ul>
        )}
      </ScrollArea>

      <div className="border-t bg-background">
        <div className="flex flex-row items-center justify-between gap-2 space-x-2 px-6 py-4">
          <div className="flex flex-row items-center gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <Select
                value={`${pageSize}`}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="h-8 w-16">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {PAGE_SIZE_OPTIONS.map((option) => (
                    <SelectItem
                      key={option}
                      value={`${option}`}
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="whitespace-nowrap text-sm font-medium">
                <span className="hidden sm:inline">rows per page</span>
                <span className="sm:hidden">rows</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {pageIndex + 1} of {totalPages}
            </div>
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => setPageIndex(0)}
              disabled={!canPrev}
            >
              <DoubleArrowLeftIcon
                className="size-4 shrink-0"
                aria-hidden="true"
              />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="size-8 p-0"
              onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
              disabled={!canPrev}
            >
              <ChevronLeftIcon
                className="size-4 shrink-0"
                aria-hidden="true"
              />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="size-8 p-0"
              onClick={() => setPageIndex(pageIndex + 1)}
              disabled={!canNext}
            >
              <ChevronRightIcon
                className="size-4 shrink-0"
                aria-hidden="true"
              />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => setPageIndex(totalPages - 1)}
              disabled={!canNext}
            >
              <DoubleArrowRightIcon
                className="size-4 shrink-0"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </div>
      {isLoading && <CenteredSpinner />}
    </div>
  );
}

function SoftwareRow({
  software
}: {
  software: ClientSoftwareDto;
}): React.JSX.Element {
  const status = statusBadge(software.status);
  return (
    <li className="grid w-full grid-cols-[1fr_auto_auto_auto] items-center gap-3 px-6 py-3 text-left transition-colors hover:bg-accent/40">
      {/* Name + version */}
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{software.name}</div>
        <div className="mt-0.5 truncate text-xs text-muted-foreground">
          Version{' '}
          <span className="font-mono">
            {software.installedVersion ?? '—'}
          </span>
          {software.licenseType && (
            <>
              {' · '}
              {software.licenseType}
            </>
          )}
        </div>
      </div>

      {/* Status badge */}
      <Badge
        variant="secondary"
        className={cn('text-[11px]', status.className)}
      >
        {status.label}
      </Badge>

      {/* Date column */}
      <div className="hidden w-28 shrink-0 text-right text-xs text-muted-foreground sm:block">
        {software.installDate ? (
          <>
            <div className="font-medium text-foreground">
              {format(software.installDate, 'MMM d, yyyy')}
            </div>
            <div className="text-[11px]">Installed</div>
          </>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </div>

      {/* Download column */}
      <div className="flex shrink-0 items-center justify-end gap-1">
        {software.downloadUrl ? (
          <a
            href={software.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border bg-card px-2.5 text-xs font-medium hover:bg-accent"
          >
            <DownloadIcon className="size-3.5" />
            Download
            <ExternalLinkIcon className="size-3 text-muted-foreground" />
          </a>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </div>
    </li>
  );
}
