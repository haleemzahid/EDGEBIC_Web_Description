import * as React from 'react';

import { ContactDetailsSection } from '@/components/dashboard/contacts/details/contact-details-section';
import { ContactStageSection } from '@/components/dashboard/contacts/details/contact-stage-section';
import { ContactTagsSection } from '@/components/dashboard/contacts/details/contact-tags-section';
import { ContactSoftwareTab } from '@/components/dashboard/contacts/details/software/contact-software-tab';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactClientDetailsTabProps = {
  contact: ContactDto;
};

export async function ContactClientDetailsTab({
  contact
}: ContactClientDetailsTabProps): Promise<React.JSX.Element> {
  return (
    <ScrollArea className="h-full">
      <div className="divide-y">
        <ContactDetailsSection contact={contact} />
        <ContactStageSection contact={contact} />
        <ContactTagsSection contact={contact} />
        <Separator />
        <React.Suspense>
          <ContactSoftwareTab contact={contact} />
        </React.Suspense>
      </div>
    </ScrollArea>
  );
}
