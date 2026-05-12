import * as React from 'react';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createSearchParamsCache, parseAsString } from 'nuqs/server';

import { ContactTicketDetail } from '@/components/dashboard/contacts/details/tickets/contact-ticket-detail';
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
          <div className="flex flex-row items-center gap-4">
            <PageBack href={`/dashboard/contacts/${contactId}`} />
            <PageTitle>
              #{ticket.number} · {ticket.title}
            </PageTitle>
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
