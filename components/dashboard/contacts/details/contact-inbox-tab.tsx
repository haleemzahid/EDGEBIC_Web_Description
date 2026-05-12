import * as React from 'react';

import { ContactInbox } from '@/components/dashboard/contacts/details/contact-inbox';
import { getProfile } from '@/data/account/get-profile';
import { getContactEmails } from '@/data/contacts/get-contact-emails';
import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactInboxTabProps = {
  contact: ContactDto;
};

export async function ContactInboxTab({
  contact
}: ContactInboxTabProps): Promise<React.JSX.Element> {
  const [profile, threads] = await Promise.all([
    getProfile(),
    getContactEmails({ contactId: contact.id })
  ]);

  return (
    <ContactInbox
      profile={profile}
      contact={contact}
      initialThreads={threads}
    />
  );
}
