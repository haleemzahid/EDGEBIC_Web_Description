import * as React from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createSearchParamsCache, parseAsString } from 'nuqs/server';

import { ContactTicketDetail } from '@/components/dashboard/contacts/details/tickets/contact-ticket-detail';
import { ContactTicketDetailMenu } from '@/components/dashboard/contacts/details/tickets/contact-ticket-detail-menu';
import {
  ContactTicketPriorityBadge,
  ContactTicketStatusBadge
} from '@/components/dashboard/contacts/details/tickets/contact-ticket-status-pills';
import {
  Page,
  PageBack,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { getContact } from '@/data/contacts/get-contact';
import { getContactTicket } from '@/data/contacts/get-contact-ticket';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const paramsCache = createSearchParamsCache({
  contactId: parseAsString.withDefault(''),
  ticketId: parseAsString.withDefault('')
});

export async function generateMetadata({
  params
}: NextPageProps): Promise<Metadata> {
  const { ticketId } = await paramsCache.parse(params);
  if (ticketId) {
    try {
      const ticket = await getContactTicket({ id: ticketId });
      return { title: createTitle(`#${ticket.number} · ${ticket.title}`) };
    } catch {
      // fall through
    }
  }
  return { title: createTitle('Ticket') };
}

export default async function ContactTicketPage({
  params
}: NextPageProps): Promise<React.JSX.Element> {
  const { contactId, ticketId } = await paramsCache.parse(params);
  if (!contactId || !ticketId) {
    return notFound();
  }

  const ticket = await getContactTicket({ id: ticketId });
  if (ticket.contactId !== contactId) {
    return notFound();
  }

  const contact = await getContact({ id: contactId });

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <div className="flex w-full flex-row items-center justify-between gap-4">
            <div className="flex min-w-0 flex-row items-center gap-4">
              <PageBack
                href={`/dashboard/contacts/${contactId}?tab=tickets`}
              />
              <div className="min-w-0">
                <nav className="mb-1 truncate text-xs text-muted-foreground">
                  <Link
                    href="/dashboard/contacts"
                    className="hover:underline"
                  >
                    CRM
                  </Link>
                  {' · '}
                  <Link
                    href={`/dashboard/contacts/${contactId}`}
                    className="hover:underline"
                  >
                    {contact.name}
                  </Link>
                  {' · '}
                  <Link
                    href={`/dashboard/contacts/${contactId}?tab=tickets`}
                    className="hover:underline"
                  >
                    Tickets
                  </Link>
                  {' · '}
                  <span className="font-semibold text-foreground">
                    #{ticket.number}
                  </span>
                </nav>
                <PageTitle className="truncate">
                  🎫 #{ticket.number} · {ticket.title}
                </PageTitle>
              </div>
            </div>
            <div className="flex shrink-0 flex-row items-center gap-2">
              <ContactTicketStatusBadge status={ticket.status} />
              <ContactTicketPriorityBadge priority={ticket.priority} />
              <ContactTicketDetailMenu ticket={ticket} />
            </div>
          </div>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody className="h-full overflow-y-auto">
        <ContactTicketDetail
          contact={contact}
          ticket={ticket}
        />
      </PageBody>
    </Page>
  );
}
