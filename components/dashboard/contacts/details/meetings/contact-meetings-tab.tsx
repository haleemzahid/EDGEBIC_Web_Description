import * as React from 'react';

import { ContactMeetings } from '@/components/dashboard/contacts/details/meetings/contact-meetings';
import { getCalendlyMeetingsForContact } from '@/data/contacts/get-calendly-meetings-for-contact';
import { getContactMeetings } from '@/data/contacts/get-contact-meetings';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';

export type ContactMeetingsTabProps = {
  contact: ContactDto;
};

export async function ContactMeetingsTab({
  contact
}: ContactMeetingsTabProps): Promise<React.JSX.Element> {
  const [dbMeetings, calendlyMeetings] = await Promise.all([
    getContactMeetings({ contactId: contact.id }),
    getCalendlyMeetingsForContact({
      contactId: contact.id,
      contactEmail: contact.email
    })
  ]);

  const merged: ContactMeetingDto[] = [...calendlyMeetings, ...dbMeetings];

  return (
    <ContactMeetings
      contact={contact}
      meetings={merged}
    />
  );
}
