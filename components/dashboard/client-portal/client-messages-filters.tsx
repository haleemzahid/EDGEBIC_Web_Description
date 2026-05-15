'use client';

import * as React from 'react';
import {
  InboxIcon,
  LayersIcon,
  MailIcon,
  MailOpenIcon,
  SearchIcon,
  SendIcon
} from 'lucide-react';
import { useQueryState } from 'nuqs';

import { searchParams } from '@/components/dashboard/client-portal/client-messages-search-params';
import { Button } from '@/components/ui/button';
import { InputSearch } from '@/components/ui/input-search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  UnderlinedTabs,
  UnderlinedTabsList,
  UnderlinedTabsTrigger
} from '@/components/ui/tabs';
import { MediaQueries } from '@/constants/media-queries';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTransitionContext } from '@/hooks/use-transition-context';
import {
  MessageFolderOption,
  MessageReadAll,
  MessageReadUnread
} from '@/schemas/client-portal/get-client-message-threads-schema';

const folderOptions = [
  {
    label: 'Inbox',
    value: MessageFolderOption.Inbox,
    icon: <InboxIcon className="size-4 shrink-0" />
  },
  {
    label: 'Sent',
    value: MessageFolderOption.Sent,
    icon: <SendIcon className="size-4 shrink-0" />
  },
  {
    label: 'All',
    value: MessageFolderOption.All,
    icon: <LayersIcon className="size-4 shrink-0" />
  }
];

const readOptions = [
  {
    label: 'All messages',
    value: MessageReadAll,
    icon: <MailIcon className="size-4 shrink-0" />
  },
  {
    label: 'Unread only',
    value: MessageReadUnread,
    icon: <MailOpenIcon className="size-4 shrink-0" />
  }
];

export function ClientMessagesFilters(): React.JSX.Element {
  const { startTransition } = useTransitionContext();
  const [showMobileSearch, setShowMobileSearch] =
    React.useState<boolean>(false);
  const smUp = useMediaQuery(MediaQueries.SmUp, { fallback: false });

  const [folder, setFolder] = useQueryState(
    'folder',
    searchParams.folder.withOptions({ startTransition, shallow: false })
  );

  const [readFilter, setReadFilter] = useQueryState(
    'readFilter',
    searchParams.readFilter.withOptions({ startTransition, shallow: false })
  );

  const [searchQuery, setSearchQuery] = useQueryState(
    'searchQuery',
    searchParams.searchQuery.withOptions({ startTransition, shallow: false })
  );

  const [pageIndex, setPageIndex] = useQueryState(
    'pageIndex',
    searchParams.pageIndex.withOptions({ startTransition, shallow: false })
  );

  const resetPage = (): void => {
    if (pageIndex !== 0) void setPageIndex(0);
  };

  const handleFolderChange = (value: string): void => {
    if (value !== folder) {
      void setFolder(value as typeof folder);
      resetPage();
    }
  };

  const handleReadChange = (value: string): void => {
    if (value !== readFilter) {
      void setReadFilter(value as typeof readFilter);
      resetPage();
    }
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
      <div className="flex items-center gap-2">
        <UnderlinedTabs
          value={folder}
          onValueChange={handleFolderChange}
          className="hidden sm:flex"
        >
          <UnderlinedTabsList className="mr-2 h-12 max-h-12 min-h-12 gap-x-2 border-none">
            {folderOptions.map((option) => (
              <UnderlinedTabsTrigger
                key={option.value}
                value={option.value}
                className="mx-0 border-t-4 border-t-transparent"
              >
                <div className="flex flex-row items-center gap-2 rounded-md px-2 py-1 hover:bg-accent">
                  {option.icon}
                  {option.label}
                </div>
              </UnderlinedTabsTrigger>
            ))}
          </UnderlinedTabsList>
        </UnderlinedTabs>
        <Select
          value={folder}
          onValueChange={handleFolderChange}
        >
          <SelectTrigger className="flex sm:hidden">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {folderOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
              >
                <div className="flex flex-row items-center gap-2 pr-2">
                  {option.icon}
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={readFilter}
          onValueChange={handleReadChange}
        >
          <SelectTrigger className="h-8 w-auto gap-2 border-dashed px-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {readOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
              >
                <div className="flex flex-row items-center gap-2 pr-2">
                  {option.icon}
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        {smUp ? (
          <InputSearch
            placeholder="Search by subject or content..."
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
                  placeholder="Search by subject or content..."
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
