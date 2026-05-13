import * as React from 'react';
import {
  ActivityIcon,
  CalendarIcon,
  CheckSquare2Icon,
  FileIcon,
  InboxIcon,
  ReceiptIcon,
  TicketIcon,
  UserIcon
} from 'lucide-react';

import { ContactBillingTab } from '@/components/dashboard/contacts/details/contact-billing-tab';
import { ContactClientDetailsTab } from '@/components/dashboard/contacts/details/contact-client-details-tab';
import { ContactInboxTab } from '@/components/dashboard/contacts/details/contact-inbox-tab';
import { ContactTabsRoot } from '@/components/dashboard/contacts/details/contact-tabs-root';
import { ContactTicketsTab } from '@/components/dashboard/contacts/details/contact-tickets-tab';
import { ContactMeetingsTab } from '@/components/dashboard/contacts/details/meetings/contact-meetings-tab';
import { ContactNotesTab } from '@/components/dashboard/contacts/details/notes/contact-notes-tab';
import { ContactTasksTab } from '@/components/dashboard/contacts/details/tasks/contact-tasks-tab';
import { ContactActivityTab } from '@/components/dashboard/contacts/details/timeline/contact-activity-tab';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ContactDto } from '@/types/dtos/contact-dto';

enum Tab {
  ClientDetails = 'client-details',
  Activity = 'activity',
  Inbox = 'inbox',
  Notes = 'notes',
  Tasks = 'tasks',
  Meetings = 'meetings',
  Tickets = 'tickets',
  Billing = 'billing'
}

const tabList = [
  { icon: UserIcon, label: 'Client details', value: Tab.ClientDetails },
  { icon: ActivityIcon, label: 'Activity', value: Tab.Activity },
  { icon: InboxIcon, label: 'Inbox', value: Tab.Inbox },
  { icon: FileIcon, label: 'Notes', value: Tab.Notes },
  { icon: CheckSquare2Icon, label: 'Tasks', value: Tab.Tasks },
  { icon: CalendarIcon, label: 'Meetings', value: Tab.Meetings },
  { icon: TicketIcon, label: 'Tickets', value: Tab.Tickets },
  { icon: ReceiptIcon, label: 'Billing history', value: Tab.Billing }
];

export type ContactTabsProps = {
  contact: ContactDto;
};

export async function ContactTabs({
  contact
}: ContactTabsProps): Promise<React.JSX.Element> {
  return (
    <ContactTabsRoot
      defaultValue={Tab.ClientDetails}
      allowedValues={Object.values(Tab)}
    >
      {/* Vertical tab sidebar */}
      <TabsList className="flex h-full w-52 min-w-52 flex-col items-stretch justify-start gap-0.5 overflow-y-auto rounded-none border-r bg-muted/30 p-3">
        {tabList.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="flex items-center justify-start gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab content panels */}
      <div className="min-w-0 flex-1 overflow-hidden">
        <TabsContent
          value={Tab.ClientDetails}
          className="m-0 h-full overflow-hidden p-0 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <ContactClientDetailsTab contact={contact} />
        </TabsContent>

        <TabsContent
          value={Tab.Activity}
          className="m-0 h-full overflow-hidden p-0 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <React.Suspense>
            <ContactActivityTab contact={contact} />
          </React.Suspense>
        </TabsContent>

        <TabsContent
          value={Tab.Inbox}
          className="m-0 h-full overflow-hidden p-0 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <React.Suspense>
            <ContactInboxTab contact={contact} />
          </React.Suspense>
        </TabsContent>

        <TabsContent
          value={Tab.Notes}
          className="m-0 h-full overflow-hidden p-0 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <React.Suspense>
            <ContactNotesTab contact={contact} />
          </React.Suspense>
        </TabsContent>

        <TabsContent
          value={Tab.Tasks}
          className="m-0 h-full overflow-hidden p-0 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <React.Suspense>
            <ContactTasksTab contact={contact} />
          </React.Suspense>
        </TabsContent>

        <TabsContent
          value={Tab.Meetings}
          className="m-0 h-full overflow-hidden p-0 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <React.Suspense>
            <ContactMeetingsTab contact={contact} />
          </React.Suspense>
        </TabsContent>

        <TabsContent
          value={Tab.Tickets}
          className="m-0 h-full overflow-hidden p-0 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <React.Suspense>
            <ContactTicketsTab contact={contact} />
          </React.Suspense>
        </TabsContent>

        <TabsContent
          value={Tab.Billing}
          className="m-0 h-full overflow-hidden p-0 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <ContactBillingTab />
        </TabsContent>
      </div>
    </ContactTabsRoot>
  );
}
