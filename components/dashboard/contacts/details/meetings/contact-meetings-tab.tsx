import * as React from 'react';

import { ContactMeetings } from '@/components/dashboard/contacts/details/meetings/contact-meetings';
import { getContactMeetings } from '@/data/contacts/get-contact-meetings';
import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactMeetingsTabProps = {
  contact: ContactDto;
};

export async function ContactMeetingsTab({
  contact
}: ContactMeetingsTabProps): Promise<React.JSX.Element> {
  const meetings = await getContactMeetings({ contactId: contact.id });
  return (
    <ContactMeetings
      contact={contact}
      meetings={meetings}
    />
  );
}
