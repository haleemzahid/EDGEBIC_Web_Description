import * as React from 'react';

import { ContactActionsDropdown } from '@/components/dashboard/contacts/details/contact-actions-dropdown';
import { ContactFavoriteToggle } from '@/components/dashboard/contacts/details/contact-favorite-toggle';
import { ContactInviteUserButton } from '@/components/dashboard/contacts/details/contact-invite-user-button';
import { getProfile } from '@/data/account/get-profile';
import { getContactIsInFavorites } from '@/data/contacts/get-contact-is-in-favorites';
import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactActionsProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  contact: ContactDto;
};

export async function ContactActions({
  contact
}: ContactActionsProps): Promise<React.JSX.Element> {
  const [addedToFavorites, profile] = await Promise.all([
    getContactIsInFavorites({ contactId: contact.id }),
    getProfile()
  ]);

  return (
    <div className="flex flex-row items-center gap-2">
      <ContactInviteUserButton
        contact={contact}
        profile={profile}
      />
      <ContactFavoriteToggle
        contact={contact}
        addedToFavorites={addedToFavorites}
      />
      <ContactActionsDropdown
        contact={contact}
        addedToFavorites={addedToFavorites}
      />
    </div>
  );
}
