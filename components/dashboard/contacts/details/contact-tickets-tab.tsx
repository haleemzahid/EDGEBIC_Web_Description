import * as React from 'react';

import { ContactTickets } from '@/components/dashboard/contacts/details/tickets/contact-tickets';
import { getContactMeetings } from '@/data/contacts/get-contact-meetings';
import { getContactTickets } from '@/data/contacts/get-contact-tickets';
import { getMembers } from '@/data/members/get-members';
import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactTicketsTabProps = {
  contact: ContactDto;
};

export async function ContactTicketsTab({
  contact
}: ContactTicketsTabProps): Promise<React.JSX.Element> {
  const [tickets, members, meetings] = await Promise.all([
    getContactTickets({ contactId: contact.id }),
    getMembers(),
    getContactMeetings({ contactId: contact.id })
  ]);
  return (
    <ContactTickets
      contact={contact}
      tickets={tickets}
      members={members}
      meetings={meetings}
    />
  );
}
