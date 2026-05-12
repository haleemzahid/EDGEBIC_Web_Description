import * as React from 'react';

import { ContactInbox } from '@/components/dashboard/contacts/details/contact-inbox';
import { getProfile } from '@/data/account/get-profile';
import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactInboxTabProps = {
  contact: ContactDto;
};

export async function ContactInboxTab({
  contact
}: ContactInboxTabProps): Promise<React.JSX.Element> {
  const profile = await getProfile();

  return (
    <ContactInbox
      profile={profile}
      contact={contact}
    />
  );
}
