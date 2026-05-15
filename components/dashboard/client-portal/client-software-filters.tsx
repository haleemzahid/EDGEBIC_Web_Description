'use client';

import * as React from 'react';
import { SoftwareStatus } from '@prisma/client';
import {
  AlertCircleIcon,
  BoxIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  CircleSlashIcon,
  RefreshCwIcon,
  SearchIcon,
  SparklesIcon
} from 'lucide-react';
import { useQueryState } from 'nuqs';

import { searchParams } from '@/components/dashboard/client-portal/client-software-search-params';
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
import { ClientSoftwareStatusAll } from '@/schemas/client-portal/get-client-software-schema';

export function ClientSoftwareFilters(): React.JSX.Element {
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
            <SelectItem value={ClientSoftwareStatusAll}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <CircleDashedIcon className="size-4 shrink-0" />
                All statuses
              </div>
            </SelectItem>
            <SelectItem value={SoftwareStatus.UP_TO_DATE}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <CircleCheckIcon className="size-4 shrink-0 text-emerald-600" />
                Up to date
              </div>
            </SelectItem>
            <SelectItem value={SoftwareStatus.UPDATE_AVAILABLE}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <RefreshCwIcon className="size-4 shrink-0 text-amber-600" />
                Update available
              </div>
            </SelectItem>
            <SelectItem value={SoftwareStatus.NEEDS_ATTENTION}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <AlertCircleIcon className="size-4 shrink-0 text-rose-600" />
                Needs attention
              </div>
            </SelectItem>
            <SelectItem value={SoftwareStatus.TRIAL}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <SparklesIcon className="size-4 shrink-0 text-blue-600" />
                Trial
              </div>
            </SelectItem>
            <SelectItem value={SoftwareStatus.NOT_INSTALLED}>
              <div className="flex flex-row items-center gap-2 pr-2">
                <CircleSlashIcon className="size-4 shrink-0 text-muted-foreground" />
                Not installed
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        {smUp ? (
          <InputSearch
            placeholder="Search by name or version..."
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
                  placeholder="Search by name or version..."
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
