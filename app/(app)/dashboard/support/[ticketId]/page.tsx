import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ContactPriority, ContactTicketStatus, Role } from '@prisma/client';
import { ChevronLeftIcon } from 'lucide-react';

import { ClientTicketConversation } from '@/components/dashboard/client-portal/client-ticket-conversation';
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
          createdAt: true,
          attachments: {
            orderBy: { createdAt: 'asc' },
            select: {
              id: true,
              fileName: true,
              storedName: true,
              mimeType: true,
              sizeBytes: true
            }
          }
        }
      }
    }
  });
  if (!ticket) {
    notFound();
  }

  // (status handled inside ClientTicketConversation)

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
          <div className="flex shrink-0 items-center gap-1.5">
            {ticket.priority !== ContactPriority.MEDIUM && (
              <Badge
                variant="outline"
                className={cn('text-[10px]', priorityClasses(ticket.priority))}
              >
                {priorityLabel(ticket.priority)} priority
              </Badge>
            )}
            <Badge
              variant="secondary"
              className={statusClasses(ticket.status)}
            >
              {statusLabel(ticket.status)}
            </Badge>
          </div>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody
        disableScroll
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <div className="flex w-full flex-1 flex-col gap-0 overflow-hidden p-4">
          <ClientTicketConversation
            ticketId={ticket.id}
            status={ticket.status}
            clientName={link.name}
            description={ticket.description}
            descriptionCreatedAt={ticket.createdAt}
            initialMessages={ticket.messages.map((m) => ({
              id: m.id,
              senderType: m.senderType,
              senderName: m.senderName,
              body: m.body,
              createdAt: m.createdAt,
              attachments: m.attachments.map((a) => ({
                id: a.id,
                fileName: a.fileName,
                storedName: a.storedName,
                mimeType: a.mimeType,
                sizeBytes: a.sizeBytes
              }))
            }))}
          />
        </div>
      </PageBody>
    </Page>
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
