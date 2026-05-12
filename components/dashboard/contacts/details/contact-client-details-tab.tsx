import * as React from 'react';

import { ContactActivitySection } from '@/components/dashboard/contacts/details/contact-activity-section';
import { ContactDetailsSection } from '@/components/dashboard/contacts/details/contact-details-section';
import { ContactStageSection } from '@/components/dashboard/contacts/details/contact-stage-section';
import { ContactSubscriptionSection } from '@/components/dashboard/contacts/details/contact-subscription-section';
import { ContactTagsSection } from '@/components/dashboard/contacts/details/contact-tags-section';
import { ContactSoftwareTab } from '@/components/dashboard/contacts/details/software/contact-software-tab';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactClientDetailsTabProps = {
  contact: ContactDto;
};

export async function ContactClientDetailsTab({
  contact
}: ContactClientDetailsTabProps): Promise<React.JSX.Element> {
  return (
    <ScrollArea className="h-full">
      <div className="grid grid-cols-1 gap-0 divide-y lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        {/* Left column: photo + properties + tags */}
        <div className="divide-y">
          <ContactDetailsSection contact={contact} />
          <ContactTagsSection contact={contact} />
        </div>

        {/* Right column: stage + activity + subscription + software */}
        <div className="divide-y">
          <ContactStageSection contact={contact} />
          <ContactActivitySection contact={contact} />
          <React.Suspense>
            <ContactSubscriptionSection
              stripeCustomerId={contact.stripeCustomerId}
            />
          </React.Suspense>
          <React.Suspense>
            <ContactSoftwareTab contact={contact} />
          </React.Suspense>
        </div>
      </div>
    </ScrollArea>
  );
}
