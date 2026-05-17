import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { after } from 'next/server';
import { Role } from '@prisma/client';
import { ChevronLeftIcon } from 'lucide-react';

import { ClientTicketConversation } from '@/components/dashboard/client-portal/client-ticket-conversation';
import { CloseTicketButton } from '@/components/dashboard/client-portal/close-ticket-button';
import {
  ContactTicketPriorityBadge,
  ContactTicketStatusBadge
} from '@/components/dashboard/contacts/details/tickets/contact-ticket-status-pills';
import {
  Page,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Routes } from '@/constants/routes';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { dedupedAuth } from '@/lib/auth';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { createTitle } from '@/lib/utils';

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
      clientUnread: true,
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

  // Auto-clear the "new" flag when the client opens the ticket so the
  // sidebar badge drops. `revalidateTag` can't run during render in Next 15,
  // so defer it via `after()` (mirrors the messages thread page).
  if (ticket.clientUnread) {
    await prisma.contactTicket.update({
      where: { id: ticket.id },
      data: { clientUnread: false }
    });
    after(() => {
      revalidateTag(
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactTickets,
          link.organizationId,
          link.contactId
        )
      );
    });
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
              title="Back to Tickets"
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
            <ContactTicketPriorityBadge priority={ticket.priority} />
            <ContactTicketStatusBadge status={ticket.status} />
            <CloseTicketButton
              ticketId={ticket.id}
              status={ticket.status}
            />
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

