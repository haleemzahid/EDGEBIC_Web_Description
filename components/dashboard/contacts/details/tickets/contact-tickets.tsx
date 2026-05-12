'use client';

import * as React from 'react';
import Link from 'next/link';
import NiceModal from '@ebay/nice-modal-react';
import { ContactPriority, ContactTicketStatus } from '@prisma/client';
import { ChevronRightIcon, TicketIcon } from 'lucide-react';

import { AddContactTicketModal } from '@/components/dashboard/contacts/details/tickets/add-contact-ticket-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsiveScrollArea } from '@/components/ui/scroll-area';
import { MediaQueries } from '@/constants/media-queries';
import { cn } from '@/lib/utils';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ContactTicketDto } from '@/types/dtos/contact-ticket-dto';
import type { MemberDto } from '@/types/dtos/member-dto';

export type ContactTicketsProps = {
  contact: ContactDto;
  tickets: ContactTicketDto[];
  members: MemberDto[];
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
        label: 'Pending',
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

export function ContactTickets({
  contact,
  tickets,
  members
}: ContactTicketsProps): React.JSX.Element {
  const handleNewTicket = (): void => {
    NiceModal.show(AddContactTicketModal, {
      contactId: contact.id,
      members
    });
  };
  return (
    <ResponsiveScrollArea
      breakpoint={MediaQueries.MdUp}
      mediaQueryOptions={{ ssr: true }}
      className="h-full"
    >
      <div className="border-b">
        <div className="flex flex-row items-center justify-between gap-2 px-6 pb-2 pt-4">
          <div>
            <h1 className="text-base font-semibold">Tickets</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Support tickets linked to this contact.
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleNewTicket}
          >
            <TicketIcon className="mr-1 size-3.5 shrink-0" />
            New ticket
          </Button>
        </div>

        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <TicketIcon className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">No tickets</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Support tickets linked to this contact will appear here.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={handleNewTicket}
            >
              + New ticket
            </Button>
          </div>
        ) : (
          <ul className="divide-y">
            {tickets.map((ticket) => (
              <TicketRow
                key={ticket.id}
                contactId={contact.id}
                ticket={ticket}
              />
            ))}
          </ul>
        )}
      </div>
    </ResponsiveScrollArea>
  );
}

type TicketRowProps = {
  contactId: string;
  ticket: ContactTicketDto;
};

function TicketRow({ contactId, ticket }: TicketRowProps): React.JSX.Element {
  const status = statusBadge(ticket.status);
  const priority = priorityBadge(ticket.priority);
  return (
    <li>
      <Link
        href={`/dashboard/contacts/${contactId}/tickets/${ticket.id}`}
        className="grid w-full grid-cols-[1fr_auto_auto_auto] items-center gap-3 px-6 py-3 text-left transition-colors hover:bg-accent/40"
      >
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">
            #{ticket.number} · {ticket.title}
          </div>
          <div className="mt-0.5 truncate text-xs text-muted-foreground">
            {ticket.assigneeName
              ? `Assigned to ${ticket.assigneeName}`
              : 'Unassigned'}
          </div>
        </div>
        <Badge
          variant="secondary"
          className={cn('text-[11px]', status.className)}
        >
          {status.label}
        </Badge>
        <Badge
          variant="secondary"
          className={cn('text-[11px]', priority.className)}
        >
          {priority.label}
        </Badge>
        <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
      </Link>
    </li>
  );
}
