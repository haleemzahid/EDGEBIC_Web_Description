'use client';

import * as React from 'react';
import { ContactPriority, ContactTicketStatus } from '@prisma/client';
import {
  CircleDashedIcon,
  CircleDotIcon,
  CircleIcon,
  FlagIcon,
  SearchIcon
} from 'lucide-react';
import { useQueryState } from 'nuqs';

import { searchParams } from '@/components/dashboard/client-portal/client-tickets-search-params';
import { Button } from '@/components/ui/button';
import { InputSearch } from '@/components/ui/input-search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { MediaQueries } from '@/constants/media-queries';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTransitionContext } from '@/hooks/use-transition-context';
import {
  ClientTicketsPriorityAll,
  ClientTicketsStatusAll
} from '@/schemas/client-portal/get-client-tickets-schema';

export function ClientTicketsFilters(): React.JSX.Element {
  const { startTransition } = useTransitionContext();
  const [showMobileSearch, setShowMobileSearch] =
    React.useState<boolean>(false);
  const smUp = useMediaQuery(MediaQueries.SmUp, { fallback: false });

  const [searchQuery, setSearchQuery] = useQueryState(
    'searchQuery',
    searchParams.searchQuery.withOptions({
      startTransition,
      shallow: false
    })
  );

  const [status, setStatus] = useQueryState(
    'status',
    searchParams.status.withOptions({ startTransition, shallow: false })
  );

  const [priority, setPriority] = useQueryState(
    'priority',
    searchParams.priority.withOptions({ startTransition, shallow: false })
  );

  const [pageIndex, setPageIndex] = useQueryState(
    'pageIndex',
    searchParams.pageIndex.withOptions({ startTransition, shallow: false })
  );

  const resetPage = (): void => {
    if (pageIndex !== 0) void setPageIndex(0);
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target?.value || '';
    if (value !== searchQuery) {
      void setSearchQuery(value);
      resetPage();
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={status}
          onValueChange={(value) => {
            void setStatus(value as typeof status);
            resetPage();
          }}
        >
          <SelectTrigger className="h-8 w-auto gap-2 border-dashed px-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ClientTicketsStatusAll}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <CircleDashedIcon className="size-4 shrink-0" />
                All statuses
              </div>
            </SelectItem>
            <SelectItem value={ContactTicketStatus.OPEN}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <CircleDotIcon className="size-4 shrink-0 text-rose-600" />
                Open
              </div>
            </SelectItem>
            <SelectItem value={ContactTicketStatus.PENDING}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <CircleDotIcon className="size-4 shrink-0 text-amber-600" />
                In progress
              </div>
            </SelectItem>
            <SelectItem value={ContactTicketStatus.RESOLVED}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <CircleIcon className="size-4 shrink-0 text-emerald-600" />
                Resolved
              </div>
            </SelectItem>
            <SelectItem value={ContactTicketStatus.CLOSED}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <CircleIcon className="size-4 shrink-0 text-muted-foreground" />
                Closed
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={priority}
          onValueChange={(value) => {
            void setPriority(value as typeof priority);
            resetPage();
          }}
        >
          <SelectTrigger className="h-8 w-auto gap-2 border-dashed px-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ClientTicketsPriorityAll}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <FlagIcon className="size-4 shrink-0" />
                All priorities
              </div>
            </SelectItem>
            <SelectItem value={ContactPriority.HIGH}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <FlagIcon className="size-4 shrink-0 text-amber-600" />
                High
              </div>
            </SelectItem>
            <SelectItem value={ContactPriority.MEDIUM}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <FlagIcon className="size-4 shrink-0 text-yellow-600" />
                Medium
              </div>
            </SelectItem>
            <SelectItem value={ContactPriority.LOW}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <FlagIcon className="size-4 shrink-0 text-muted-foreground" />
                Low
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        {smUp ? (
          <InputSearch
            placeholder="Search by #number or title..."
            className="w-[240px]"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShowMobileSearch(true)}
            >
              <SearchIcon className="size-4 shrink-0" />
            </Button>
            {showMobileSearch && (
              <div className="absolute inset-0 z-30 bg-background pl-3 pr-5">
                <InputSearch
                  autoFocus
                  alwaysShowClearButton
                  placeholder="Search by #number or title..."
                  className="h-12 w-full border-none !ring-0"
                  containerClassName="h-12"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onClear={() => setShowMobileSearch(false)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
