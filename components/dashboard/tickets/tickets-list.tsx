'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NiceModal from '@ebay/nice-modal-react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { formatDistanceToNow } from 'date-fns';
import {
  ChevronRightIcon as ChevronRightLucideIcon,
  TicketIcon,
  TrashIcon
} from 'lucide-react';
import { useQueryState } from 'nuqs';

import {
  ContactTicketPriorityBadge,
  ContactTicketStatusBadge
} from '@/components/dashboard/contacts/details/tickets/contact-ticket-status-pills';
import { DeleteTicketsModal } from '@/components/dashboard/tickets/delete-tickets-modal';
import { searchParams } from '@/components/dashboard/tickets/tickets-search-params';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useTransitionContext } from '@/hooks/use-transition-context';
import { cn, getInitials } from '@/lib/utils';
import type { OrganizationTicketRowDto } from '@/types/dtos/contact-ticket-dto';

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

export type TicketsListProps = {
  tickets: OrganizationTicketRowDto[];
  filteredCount: number;
};

export function TicketsList({
  tickets,
  filteredCount
}: TicketsListProps): React.JSX.Element {
  const router = useRouter();
  const { isLoading, startTransition } = useTransitionContext();

  // Auto-refresh so new tickets and replies bubble in without a manual reload.
  // Only poll while the tab is visible to keep the load light.
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

  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(
    () => new Set()
  );

  // Clear selection when the visible page changes (filter/page/page-size).
  const visibleIdsKey = tickets.map((t) => t.id).join(',');
  React.useEffect(() => {
    setSelectedIds(new Set());
  }, [visibleIdsKey]);

  const visibleSelectedIds = tickets
    .map((t) => t.id)
    .filter((id) => selectedIds.has(id));
  const allSelected =
    tickets.length > 0 && visibleSelectedIds.length === tickets.length;
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
        for (const t of tickets) next.delete(t.id);
      } else {
        for (const t of tickets) next.add(t.id);
      }
      return next;
    });
  };
  const handleClearSelection = (): void => setSelectedIds(new Set());

  const handleBulkDelete = (): void => {
    if (visibleSelectedIds.length === 0) return;
    NiceModal.show(DeleteTicketsModal, {
      ids: [...visibleSelectedIds],
      onDeleted: () => {
        setSelectedIds(new Set());
        router.refresh();
      }
    });
  };

  return (
    <div className="relative flex flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b bg-background px-6 py-2">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
          <Checkbox
            checked={allSelected}
            onCheckedChange={handleToggleAll}
            aria-label="Select all tickets"
            disabled={tickets.length === 0}
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
              onClick={handleClearSelection}
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
        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <TicketIcon className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">No tickets match these filters</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try clearing filters or changing the search.
              </p>
            </div>
          </div>
        ) : (
          <ul className="divide-y">
            {tickets.map((t) => (
              <TicketRow
                key={t.id}
                ticket={t}
                checked={selectedIds.has(t.id)}
                onToggle={() => handleToggleOne(t.id)}
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

function TicketRow({
  ticket,
  checked,
  onToggle
}: {
  ticket: OrganizationTicketRowDto;
  checked: boolean;
  onToggle: () => void;
}): React.JSX.Element {
  return (
    <li
      className={cn(
        'group flex items-center gap-3 px-6 py-3 transition-colors hover:bg-accent/40',
        checked && 'bg-accent/50'
      )}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onToggle}
        aria-label={`Select ticket #${ticket.number}`}
      />
      <Link
        href={`/dashboard/contacts/${ticket.contactId}/tickets/${ticket.id}`}
        className="grid min-w-0 flex-1 grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 text-left"
      >
        <Avatar className="size-9 shrink-0">
          <AvatarImage
            src={ticket.contactImage}
            alt={ticket.contactName}
          />
          <AvatarFallback className="text-[11px] font-semibold">
            {getInitials(ticket.contactName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">
            #{ticket.number} · {ticket.title}
          </div>
          {ticket.description && (
            <div className="mt-0.5 truncate text-xs text-foreground/70">
              {ticket.description}
            </div>
          )}
          <div className="mt-0.5 truncate text-xs text-muted-foreground">
            {ticket.contactName}
            {ticket.assigneeName
              ? ` · Assigned to ${ticket.assigneeName}`
              : ' · Unassigned'}
            {' · '}
            {formatDistanceToNow(ticket.updatedAt, { addSuffix: true })}
          </div>
        </div>
        <ContactTicketStatusBadge status={ticket.status} />
        <ContactTicketPriorityBadge priority={ticket.priority} />
        <ChevronRightLucideIcon className="size-4 shrink-0 text-muted-foreground" />
      </Link>
    </li>
  );
}
