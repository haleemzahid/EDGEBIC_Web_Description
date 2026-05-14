import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ContactPriority, ContactTicketStatus } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

import { ClientUnlinkedNotice } from '@/components/dashboard/client-portal/client-unlinked-notice';
import { NewClientTicketButton } from '@/components/dashboard/client-portal/new-ticket-button';
import { Badge } from '@/components/ui/badge';
import {
  Page,
  PageActions,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Routes } from '@/constants/routes';
import { getClientTickets } from '@/data/client-portal/get-client-tickets';
import { requireClientRole } from '@/lib/auth/require-client-role';
import { cn, createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Support')
};

export default async function ClientSupportPage(): Promise<React.JSX.Element> {
  const { link } = await requireClientRole();
  if (!link) {
    return <ClientUnlinkedNotice title="Support" />;
  }

  const tickets = await getClientTickets(link);

  const open = tickets.filter(
    (t) =>
      t.status === ContactTicketStatus.OPEN ||
      t.status === ContactTicketStatus.PENDING
  );
  const closed = tickets.filter(
    (t) =>
      t.status === ContactTicketStatus.RESOLVED ||
      t.status === ContactTicketStatus.CLOSED
  );

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Support</PageTitle>
          <PageActions>
            <NewClientTicketButton />
          </PageActions>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <div className="flex w-full flex-col gap-6 p-6">
          <Section title={`Active · ${open.length}`}>
            {open.length === 0 ? (
              <EmptyActive />
            ) : (
              <TicketList tickets={open} />
            )}
          </Section>

          <Section title={`Closed · ${closed.length}`}>
            {closed.length === 0 ? (
              <Empty message="No closed tickets yet." />
            ) : (
              <TicketList
                tickets={closed}
                muted
              />
            )}
          </Section>
        </div>
      </PageBody>
    </Page>
  );
}

type TicketRow = {
  id: string;
  number: number;
  title: string;
  description: string | null;
  status: ContactTicketStatus;
  priority: ContactPriority;
  createdAt: Date;
  updatedAt: Date;
};

function Section({
  title,
  children
}: React.PropsWithChildren<{ title: string }>): React.JSX.Element {
  return (
    <section className="overflow-hidden rounded-lg border bg-card">
      <h2 className="border-b bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Empty({ message }: { message: string }): React.JSX.Element {
  return <p className="px-4 py-6 text-sm text-muted-foreground">{message}</p>;
}

function EmptyActive(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-8 text-center">
      <p className="text-sm text-muted-foreground">No open tickets.</p>
      <NewClientTicketButton />
    </div>
  );
}

function priorityLabel(priority: ContactPriority): string {
  switch (priority) {
    case ContactPriority.LOW:
      return 'Low';
    case ContactPriority.MEDIUM:
      return 'Medium';
    case ContactPriority.HIGH:
      return 'High';
  }
}

function priorityClasses(priority: ContactPriority): string {
  switch (priority) {
    case ContactPriority.LOW:
      return 'border-slate-300 text-slate-600';
    case ContactPriority.MEDIUM:
      return 'border-slate-300 text-slate-700';
    case ContactPriority.HIGH:
      return 'border-rose-300 text-rose-700';
  }
}

function TicketList({
  tickets,
  muted
}: {
  tickets: TicketRow[];
  muted?: boolean;
}): React.JSX.Element {
  return (
    <ul className="divide-y">
      {tickets.map((t) => (
        <li key={t.id}>
          <Link
            href={`${Routes.ClientSupport}/${t.id}`}
            className={cn(
              'flex flex-row items-start gap-4 px-4 py-3 transition-colors hover:bg-accent/40',
              muted && 'opacity-80'
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  #{t.number}
                </span>
                <span className="truncate text-sm font-medium">{t.title}</span>
              </div>
              {t.description && (
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                  {t.description}
                </p>
              )}
              <p className="mt-1 text-[11px] text-muted-foreground">
                Updated {formatDistanceToNow(t.updatedAt, { addSuffix: true })}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <Badge
                variant="secondary"
                className={statusClasses(t.status)}
              >
                {statusLabel(t.status)}
              </Badge>
              {t.priority !== ContactPriority.MEDIUM && (
                <Badge
                  variant="outline"
                  className={cn('text-[10px]', priorityClasses(t.priority))}
                >
                  {priorityLabel(t.priority)}
                </Badge>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function statusLabel(status: ContactTicketStatus): string {
  switch (status) {
    case ContactTicketStatus.OPEN:
      return 'Open';
    case ContactTicketStatus.PENDING:
      return 'In progress';
    case ContactTicketStatus.RESOLVED:
      return 'Resolved';
    case ContactTicketStatus.CLOSED:
      return 'Closed';
  }
}

function statusClasses(status: ContactTicketStatus): string {
  switch (status) {
    case ContactTicketStatus.OPEN:
      return 'border-transparent bg-rose-100 text-rose-800';
    case ContactTicketStatus.PENDING:
      return 'border-transparent bg-amber-100 text-amber-800';
    case ContactTicketStatus.RESOLVED:
      return 'border-transparent bg-emerald-100 text-emerald-800';
    case ContactTicketStatus.CLOSED:
      return 'border-transparent bg-muted text-muted-foreground';
  }
}

