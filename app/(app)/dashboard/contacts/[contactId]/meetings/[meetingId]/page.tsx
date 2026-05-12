import * as React from 'react';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createSearchParamsCache, parseAsString } from 'nuqs/server';

import { ContactMeetingDetail } from '@/components/dashboard/contacts/details/meetings/contact-meeting-detail';
import {
  Page,
  PageBack,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { getContact } from '@/data/contacts/get-contact';
import { getContactMeeting } from '@/data/contacts/get-contact-meeting';
import { getContactNotes } from '@/data/contacts/get-contact-notes';
import { getContactTasks } from '@/data/contacts/get-contact-tasks';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const paramsCache = createSearchParamsCache({
  contactId: parseAsString.withDefault(''),
  meetingId: parseAsString.withDefault('')
});

export async function generateMetadata({
  params
}: NextPageProps): Promise<Metadata> {
  const { meetingId } = await paramsCache.parse(params);
  if (meetingId) {
    try {
      const meeting = await getContactMeeting({ id: meetingId });
      return { title: createTitle(meeting.title) };
    } catch {
      // fall through
    }
  }
  return { title: createTitle('Meeting') };
}

export default async function ContactMeetingPage({
  params
}: NextPageProps): Promise<React.JSX.Element> {
  const { contactId, meetingId } = await paramsCache.parse(params);
  if (!contactId || !meetingId) {
    return notFound();
  }

  const meeting = await getContactMeeting({ id: meetingId });
  if (meeting.contactId !== contactId) {
    return notFound();
  }

  const [contact, allNotes, allTasks] = await Promise.all([
    getContact({ id: contactId }),
    getContactNotes({ contactId }),
    getContactTasks({ contactId })
  ]);

  const linkedNotes = allNotes.filter((n) => n.meetingId === meeting.id);
  const linkedTasks = allTasks.filter((t) => t.meetingId === meeting.id);

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <div className="flex flex-row items-center gap-4">
            <PageBack href={`/dashboard/contacts/${contactId}`} />
            <PageTitle>{meeting.title}</PageTitle>
          </div>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody className="h-full overflow-y-auto">
        <ContactMeetingDetail
          contact={contact}
          meeting={meeting}
          notes={linkedNotes}
          tasks={linkedTasks}
        />
      </PageBody>
    </Page>
  );
}
