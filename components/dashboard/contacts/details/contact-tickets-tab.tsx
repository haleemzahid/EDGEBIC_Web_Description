import * as React from 'react';

import { ContactTickets } from '@/components/dashboard/contacts/details/tickets/contact-tickets';
import { getContactTickets } from '@/data/contacts/get-contact-tickets';
import { getMembers } from '@/data/members/get-members';
import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactTicketsTabProps = {
  contact: ContactDto;
};

export async function ContactTicketsTab({
  contact
}: ContactTicketsTabProps): Promise<React.JSX.Element> {
  const [tickets, members] = await Promise.all([
    getContactTickets({ contactId: contact.id }),
    getMembers()
  ]);
  return (
    <ContactTickets
      contact={contact}
      tickets={tickets}
      members={members}
    />
  );
}
