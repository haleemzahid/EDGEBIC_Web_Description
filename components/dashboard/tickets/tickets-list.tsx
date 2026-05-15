'use client';

import * as React from 'react';
import Link from 'next/link';
import { ContactPriority, ContactTicketStatus } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TicketIcon
} from 'lucide-react';
import { useQueryState } from 'nuqs';

import { searchParams } from '@/components/dashboard/tickets/tickets-search-params';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTransitionContext } from '@/hooks/use-transition-context';
import { cn, getInitials } from '@/lib/utils';
import type { OrganizationTicketRowDto } from '@/types/dtos/contact-ticket-dto';

export type TicketsListProps = {
  tickets: OrganizationTicketRowDto[];
  filteredCount: number;
};

function statusBadge(status: ContactTicketStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case ContactTicketStatus.OPEN:
      return {
        label: 'Open',
        className:
          'border-transparent bg-rose-100 text-rose-800 hover:bg-rose-100'
      };
    case ContactTicketStatus.PENDING:
      return {
        label: 'In progress',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case ContactTicketStatus.RESOLVED:
      return {
        label: 'Resolved',
        className:
          'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
      };
    case ContactTicketStatus.CLOSED:
      return {
        label: 'Closed',
        className: 'border-transparent bg-muted text-muted-foreground'
      };
  }
}

function priorityBadge(priority: ContactPriority): {
  label: string;
  className: string;
} {
  switch (priority) {
    case ContactPriority.HIGH:
      return {
        label: 'High',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case ContactPriority.MEDIUM:
      return {
        label: 'Medium',
        className:
          'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      };
    case ContactPriority.LOW:
      return {
        label: 'Low',
        className: 'border-transparent bg-muted text-foreground hover:bg-muted'
      };
  }
}

export function TicketsList({
  tickets,
  filteredCount
}: TicketsListProps): React.JSX.Element {
  const { startTransition } = useTransitionContext();

  const [pageIndex, setPageIndex] = useQueryState(
    'pageIndex',
    searchParams.pageIndex.withOptions({ startTransition, shallow: false })
  );
  const [pageSize] = useQueryState(
    'pageSize',
    searchParams.pageSize.withOptions({ startTransition, shallow: false })
  );

  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
  const currentPage = pageIndex + 1;
  const start = filteredCount === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, filteredCount);

  return (
    <div className="flex flex-1 flex-col">
      {tickets.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-12 text-center">
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
            />
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 border-t bg-background px-6 py-3 text-xs text-muted-foreground">
        <div>
          {filteredCount === 0
            ? 'No results'
            : `Showing ${start}–${end} of ${filteredCount}`}
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pageIndex === 0}
            onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
          >
            <ChevronLeftIcon className="size-4 shrink-0" />
            Prev
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pageIndex >= totalPages - 1}
            onClick={() => setPageIndex(pageIndex + 1)}
          >
            Next
            <ChevronRightIcon className="size-4 shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function TicketRow({
  ticket
}: {
  ticket: OrganizationTicketRowDto;
}): React.JSX.Element {
  const status = statusBadge(ticket.status);
  const priority = priorityBadge(ticket.priority);
  return (
    <li>
      <Link
        href={`/dashboard/contacts/${ticket.contactId}/tickets/${ticket.id}`}
        className="grid w-full grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 px-6 py-3 text-left transition-colors hover:bg-accent/40"
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
          <div className="mt-0.5 truncate text-xs text-muted-foreground">
            {ticket.contactName}
            {ticket.assigneeName
              ? ` · Assigned to ${ticket.assigneeName}`
              : ' · Unassigned'}
            {' · '}
            {formatDistanceToNow(ticket.updatedAt, { addSuffix: true })}
          </div>
        </div>
        <Badge
          variant="secondary"
          className={cn('hidden text-[11px] sm:inline-flex', status.className)}
        >
          {status.label}
        </Badge>
        <Badge
          variant="secondary"
          className={cn('hidden text-[11px] md:inline-flex', priority.className)}
        >
          {priority.label}
        </Badge>
        <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
      </Link>
    </li>
  );
}
