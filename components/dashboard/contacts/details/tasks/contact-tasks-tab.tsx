import * as React from 'react';

import { ContactTasks } from '@/components/dashboard/contacts/details/tasks/contact-tasks';
import { getContactMeetings } from '@/data/contacts/get-contact-meetings';
import { getContactTasks } from '@/data/contacts/get-contact-tasks';
import { getMembers } from '@/data/members/get-members';
import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactTasksTabProps = {
  contact: ContactDto;
};

export async function ContactTasksTab({
  contact
}: ContactTasksTabProps): Promise<React.JSX.Element> {
  const [tasks, meetings, members] = await Promise.all([
    getContactTasks({ contactId: contact.id }),
    getContactMeetings({ contactId: contact.id }),
    getMembers()
  ]);
  return (
    <ContactTasks
      contact={contact}
      tasks={tasks}
      meetings={meetings}
      members={members}
    />
  );
}
