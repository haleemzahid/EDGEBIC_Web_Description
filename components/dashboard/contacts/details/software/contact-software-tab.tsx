import * as React from 'react';

import { ContactSoftwareSection } from '@/components/dashboard/contacts/details/software/contact-software-section';
import { getContactSoftware } from '@/data/contacts/get-contact-software';
import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactSoftwareTabProps = {
  contact: ContactDto;
};

export async function ContactSoftwareTab({
  contact
}: ContactSoftwareTabProps): Promise<React.JSX.Element> {
  const software = await getContactSoftware({ contactId: contact.id });
  return (
    <ContactSoftwareSection
      contactId={contact.id}
      software={software}
    />
  );
}
