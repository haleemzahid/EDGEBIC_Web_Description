import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
  ContactTicketStatus,
  Role,
  TicketMessageSender
} from '@prisma/client';
import { format } from 'date-fns';
import { ChevronLeftIcon } from 'lucide-react';

import { ClientTicketReply } from '@/components/dashboard/client-portal/client-ticket-reply';
import { ConfirmResolvedButton } from '@/components/dashboard/client-portal/confirm-resolved-button';
import { Badge } from '@/components/ui/badge';
import {
  Page,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Routes } from '@/constants/routes';
import { dedupedAuth } from '@/lib/auth';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { cn, createTitle } from '@/lib/utils';

type Params = { ticketId: string };

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { ticketId } = await params;
  const ticket = await prisma.contactTicket.findUnique({
    where: { id: ticketId },
    select: { title: true, number: true }
  });
  return {
    title: createTitle(
      ticket ? `#${ticket.number} · ${ticket.title}` : 'Ticket'
    )
  };
}

export default async function ClientTicketDetailPage({
  params
}: {
  params: Promise<Params>;
}): Promise<React.JSX.Element> {
  const { ticketId } = await params;
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const userFromDb = await prisma.user.findFirst({
    where: { id: session.user.id },
    select: { role: true }
  });
  if (!userFromDb || userFromDb.role !== Role.CLIENT) {
    return redirect(Routes.Home);
  }

  const link = await getClientContactLink(session.user.id);
  if (!link) {
    return redirect(Routes.ClientSupport);
  }

  const ticket = await prisma.contactTicket.findFirst({
    where: {
      id: ticketId,
      contactId: link.contactId
    },
    select: {
      id: true,
      number: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      createdAt: true,
      updatedAt: true,
      messages: {
        where: { isInternalNote: false },
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          senderType: true,
          senderName: true,
          body: true,
          createdAt: true
        }
      }
    }
  });
  if (!ticket) {
    notFound();
  }

  const isResolved = ticket.status === ContactTicketStatus.RESOLVED;
  const isClosed = ticket.status === ContactTicketStatus.CLOSED;

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <div className="flex min-w-0 items-center gap-2">
            <Link
              href={Routes.ClientSupport}
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              title="Back to Support"
            >
              <ChevronLeftIcon className="size-4" />
            </Link>
            <PageTitle className="truncate">
              <span className="mr-2 font-mono text-sm text-muted-foreground">
                #{ticket.number}
              </span>
              {ticket.title}
            </PageTitle>
          </div>
          <Badge
            variant="secondary"
            className={statusClasses(ticket.status)}
          >
            {statusLabel(ticket.status)}
          </Badge>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-0 overflow-hidden p-4">
          <div className="flex-1 space-y-4 overflow-y-auto rounded-t-lg border border-b-0 bg-card p-4">
            {ticket.description && (
              <ConversationBubble
                authorName={link.name}
                authorIsClient
                body={ticket.description}
                createdAt={ticket.createdAt}
                isFirst
              />
            )}
            {ticket.messages.map((m) => (
              <ConversationBubble
                key={m.id}
                authorName={m.senderName}
                authorIsClient={m.senderType === TicketMessageSender.CONTACT}
                body={m.body}
                createdAt={m.createdAt}
              />
            ))}
            {ticket.messages.length === 0 && !ticket.description && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No messages yet.
              </p>
            )}
          </div>
          <div className="rounded-b-lg border bg-card">
            {isClosed ? (
              <div className="border-t p-4">
                <p className="text-sm text-muted-foreground">
                  This ticket is closed.{' '}
                  <Link
                    href={Routes.ClientSupport}
                    className="text-primary underline"
                  >
                    Open a new ticket
                  </Link>{' '}
                  if you need more help.
                </p>
              </div>
            ) : (
              <>
                {isResolved && (
                  <div className="flex flex-col gap-3 border-t bg-emerald-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm">
                      <p className="font-semibold text-emerald-900">
                        Your team marked this resolved
                      </p>
                      <p className="mt-0.5 text-xs text-emerald-800/80">
                        Confirm if it&apos;s fixed, or reply below to reopen
                        the ticket.
                      </p>
                    </div>
                    <ConfirmResolvedButton ticketId={ticket.id} />
                  </div>
                )}
                <ClientTicketReply
                  ticketId={ticket.id}
                  reopens={isResolved}
                />
              </>
            )}
          </div>
        </div>
      </PageBody>
    </Page>
  );
}

function ConversationBubble({
  authorName,
  authorIsClient,
  body,
  createdAt,
  isFirst
}: {
  authorName: string;
  authorIsClient: boolean;
  body: string;
  createdAt: Date;
  isFirst?: boolean;
}): React.JSX.Element {
  return (
    <div className={cn('flex', authorIsClient ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm',
          authorIsClient
            ? 'bg-primary text-primary-foreground'
            : 'border bg-muted text-foreground'
        )}
      >
        <div
          className={cn(
            'mb-1 flex items-baseline gap-2 text-[11px]',
            authorIsClient
              ? 'text-primary-foreground/70'
              : 'text-muted-foreground'
          )}
        >
          <span className="font-semibold">
            {authorIsClient ? 'You' : authorName}
          </span>
          <span>·</span>
          <span>{format(createdAt, 'MMM d, h:mm a')}</span>
          {isFirst && (
            <span className="ml-1 uppercase tracking-wide">Original</span>
          )}
        </div>
        <p className="whitespace-pre-wrap leading-relaxed">{body}</p>
      </div>
    </div>
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
