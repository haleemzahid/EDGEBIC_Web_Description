'use client';

import * as React from 'react';
import {
  ChevronRightIcon,
  LightbulbIcon,
  TicketIcon
} from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsiveScrollArea } from '@/components/ui/scroll-area';
import { MediaQueries } from '@/constants/media-queries';
import { cn } from '@/lib/utils';

type TicketStatus = 'OPEN' | 'PENDING' | 'CLOSED';
type TicketPriority = 'HIGH' | 'MEDIUM' | 'LOW';

type Ticket = {
  id: string;
  number: number;
  title: string;
  meta: string;
  status: TicketStatus;
  priority: TicketPriority;
  incidentRef?: string;
  incidentAffected?: number;
};

const sampleTickets: Ticket[] = [
  {
    id: 't-142',
    number: 142,
    title: 'EDGEBI not loading after login',
    meta: 'Linked to incident INC-12 · Reported 2h ago · Assigned to Bob',
    status: 'OPEN',
    priority: 'HIGH',
    incidentRef: 'INC-12',
    incidentAffected: 47
  }
];

function statusBadge(status: TicketStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case 'OPEN':
      return {
        label: 'Open',
        className: 'border-transparent bg-rose-100 text-rose-800 hover:bg-rose-100'
      };
    case 'PENDING':
      return {
        label: 'Pending',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case 'CLOSED':
      return {
        label: 'Closed',
        className:
          'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
      };
  }
}

function priorityBadge(priority: TicketPriority): {
  label: string;
  className: string;
} {
  switch (priority) {
    case 'HIGH':
      return {
        label: 'High',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case 'MEDIUM':
      return {
        label: 'Medium',
        className:
          'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      };
    case 'LOW':
      return {
        label: 'Low',
        className: 'border-transparent bg-muted text-foreground hover:bg-muted'
      };
  }
}

export function ContactTicketsTab(): React.JSX.Element {
  const tickets = sampleTickets;
  const handleNewTicket = (): void => {
    toast.info('New ticket — coming soon');
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
          </div>
        ) : (
          <>
            <ul className="divide-y">
              {tickets.map((ticket) => (
                <TicketRow
                  key={ticket.id}
                  ticket={ticket}
                />
              ))}
            </ul>
            {tickets.some((t) => t.incidentRef) && (
              <div className="flex items-start gap-2 px-6 py-3 text-xs text-muted-foreground">
                <LightbulbIcon className="mt-0.5 size-3.5 shrink-0 text-amber-500" />
                <span>
                  {tickets
                    .filter((t) => t.incidentRef)
                    .map((t) => (
                      <React.Fragment key={t.id}>
                        Ticket #{t.number} is part of a wider incident. See{' '}
                        <button
                          type="button"
                          className="text-blue-600 underline-offset-2 hover:underline"
                          onClick={() =>
                            toast.info(`Open ${t.incidentRef} — coming soon`)
                          }
                        >
                          incident {t.incidentRef}
                        </button>
                        {t.incidentAffected
                          ? ` — ${t.incidentAffected} customers affected.`
                          : '.'}
                      </React.Fragment>
                    ))}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </ResponsiveScrollArea>
  );
}

type TicketRowProps = {
  ticket: Ticket;
};

function TicketRow({ ticket }: TicketRowProps): React.JSX.Element {
  const status = statusBadge(ticket.status);
  const priority = priorityBadge(ticket.priority);
  return (
    <button
      type="button"
      onClick={() => toast.info(`Open ticket #${ticket.number} — coming soon`)}
      className="grid w-full grid-cols-[1fr_auto_auto_auto] items-center gap-3 px-6 py-3 text-left transition-colors hover:bg-accent/40"
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">
          #{ticket.number} · {ticket.title}
        </div>
        <div className="mt-0.5 truncate text-xs text-muted-foreground">
          {ticket.meta}
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
    </button>
  );
}
