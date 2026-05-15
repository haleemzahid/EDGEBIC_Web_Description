'use client';

import * as React from 'react';
import { SearchIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { searchParams } from '@/components/dashboard/client-portal/client-software-search-params';
import { Button } from '@/components/ui/button';
import { InputSearch } from '@/components/ui/input-search';
import { MediaQueries } from '@/constants/media-queries';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTransitionContext } from '@/hooks/use-transition-context';

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
    <div className="mr-auto">
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
  );
}
