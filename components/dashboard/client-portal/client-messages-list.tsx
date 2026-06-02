'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { EmailSenderType } from '@prisma/client';
import { format, isThisYear, isToday } from 'date-fns';
import { TrashIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { searchParams } from '@/components/dashboard/client-portal/client-messages-search-params';
import { DeleteClientMessagesModal } from '@/components/dashboard/client-portal/delete-client-messages-modal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CenteredSpinner } from '@/components/ui/spinner';
import { Routes } from '@/constants/routes';
import { useTransitionContext } from '@/hooks/use-transition-context';
import { cn, getInitials } from '@/lib/utils';
import { MessageFolderOption } from '@/schemas/client-portal/get-client-message-threads-schema';

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

export type ClientMessagesListThread = {
  id: string;
  subject: string;
  preview: string;
  unread: boolean;
  updatedAt: Date;
  lastSenderType: EmailSenderType | null;
  lastSenderName: string | null;
};

export type ClientMessagesListProps = {
  threads: ClientMessagesListThread[];
  activeFolder: MessageFolderOption;
  filteredCount: number;
};

function formatThreadTime(date: Date): string {
  if (isToday(date)) return format(date, 'h:mm a');
  if (isThisYear(date)) return format(date, 'MMM d');
  return format(date, 'M/d/yy');
}

function senderLabelFor(
  thread: ClientMessagesListThread,
  activeFolder: MessageFolderOption
): string {
  if (thread.lastSenderType === EmailSenderType.CONTACT) {
    return activeFolder === MessageFolderOption.Sent
      ? 'Me'
      : thread.lastSenderName ?? 'Me';
  }
  if (thread.lastSenderType === EmailSenderType.USER) {
    return thread.lastSenderName ?? 'Your team';
  }
  return activeFolder === MessageFolderOption.Sent ? 'Me' : 'Your team';
}

export function ClientMessagesList({
  threads,
  activeFolder,
  filteredCount
}: ClientMessagesListProps): React.JSX.Element {
  const router = useRouter();
  const { isLoading, startTransition } = useTransitionContext();
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(
    () => new Set()
  );

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

  // Reset selection when the visible thread set changes (e.g., folder switch).
  React.useEffect(() => {
    setSelectedIds(new Set());
  }, [activeFolder, threads.length]);

  const visibleSelectedIds = threads
    .map((t) => t.id)
    .filter((id) => selectedIds.has(id));
  const allSelected =
    threads.length > 0 && visibleSelectedIds.length === threads.length;
  const selectionCount = visibleSelectedIds.length;

  const handleToggleOne = (id: string): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleToggleAll = (): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        for (const t of threads) next.delete(t.id);
      } else {
        for (const t of threads) next.add(t.id);
      }
      return next;
    });
  };
  const handleClear = (): void => setSelectedIds(new Set());

  const handleDeleteOne = (threadId: string, subject: string): void => {
    NiceModal.show(DeleteClientMessagesModal, {
      ids: [threadId],
      subject,
      onDeleted: () => router.refresh()
    });
  };
  const handleBulkDelete = (): void => {
    if (visibleSelectedIds.length === 0) return;
    const ids = [...visibleSelectedIds];
    NiceModal.show(DeleteClientMessagesModal, {
      ids,
      onDeleted: () => {
        setSelectedIds(new Set());
        router.refresh();
      }
    });
  };

  return (
    <div className="relative flex flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b bg-background px-3.5 py-2">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
          <Checkbox
            checked={allSelected}
            onCheckedChange={handleToggleAll}
            aria-label="Select all messages"
            disabled={threads.length === 0}
          />
          {selectionCount > 0 ? (
            <span className="font-medium text-foreground">
              {selectionCount} selected
            </span>
          ) : (
            <span>Select all</span>
          )}
        </label>
        {selectionCount > 0 && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 border-destructive/30 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleBulkDelete}
            >
              <TrashIcon className="mr-1 size-3.5 shrink-0" />
              Delete {selectionCount}
            </Button>
          </div>
        )}
      </div>
      {/* 64px (primary bar) + 48px (secondary bar) + 41px (bulk bar) + 65px (pagination) = 218px */}
      <ScrollArea
        verticalScrollBar
        className="h-[calc(100svh-218px)]"
      >
        {threads.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-muted-foreground">
            No messages match these filters.
          </p>
        ) : (
          <ul className="divide-y">
            {threads.map((t) => {
              const isUnreadRow =
                t.unread && activeFolder !== MessageFolderOption.Sent;
              const isChecked = selectedIds.has(t.id);
              const senderLabel = senderLabelFor(t, activeFolder);
          return (
            <li
              key={t.id}
              className={cn(
                'group flex items-center gap-2 px-3.5 py-2 transition-colors hover:bg-accent/40 hover:shadow-sm',
                isChecked && 'bg-accent/50',
                isUnreadRow && 'bg-background'
              )}
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => handleToggleOne(t.id)}
                aria-label={`Select message: ${t.subject}`}
                  />
              <Link
                href={`${Routes.ClientMessages}/${t.id}`}
                className="flex min-w-0 flex-1 items-center gap-2.5"
              >
                {isUnreadRow ? (
                  <span
                    className="size-2 shrink-0 rounded-full bg-sky-500"
                    aria-label="Unread"
                  />
                ) : (
                  <span className="size-2 shrink-0" aria-hidden />
                )}
                <Avatar className="size-6 shrink-0 rounded-full">
                  <AvatarFallback className="text-[10px] font-semibold">
                    {getInitials(senderLabel) || 'M'}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    'w-40 shrink-0 truncate text-xs',
                    isUnreadRow
                      ? 'font-bold text-foreground'
                      : 'text-foreground'
                  )}
                >
                  {senderLabel}
                </span>
                <span className="min-w-0 flex-1 truncate text-xs">
                  <span
                    className={cn(
                      isUnreadRow
                        ? 'font-bold text-foreground'
                        : 'text-foreground'
                    )}
                  >
                    {t.subject}
                  </span>
                  {t.preview && (
                    <span className="text-muted-foreground">
                      {' — '}
                      {t.preview}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    'shrink-0 text-[11px]',
                    isUnreadRow
                      ? 'font-semibold text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {formatThreadTime(t.updatedAt)}
                </span>
              </Link>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteOne(t.id, t.subject);
                }}
                    aria-label="Delete message"
                title="Delete"
              >
                <TrashIcon className="size-3.5" />
              </Button>
            </li>
          );
            })}
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
