import * as React from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createSearchParamsCache, parseAsString } from 'nuqs/server';

import { ContactMeetingDetail } from '@/components/dashboard/contacts/details/meetings/contact-meeting-detail';
import { ContactMeetingDetailMenu } from '@/components/dashboard/contacts/details/meetings/contact-meeting-detail-menu';
import { ContactMeetingStatusBadge } from '@/components/dashboard/contacts/details/meetings/contact-meeting-status-badge';
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
import { getContactMeetingFiles } from '@/data/contacts/get-contact-meeting-files';
import { getContactMeetings } from '@/data/contacts/get-contact-meetings';
import { getContactNotes } from '@/data/contacts/get-contact-notes';
import { getContactTasks } from '@/data/contacts/get-contact-tasks';
import { getContactTickets } from '@/data/contacts/get-contact-tickets';
import { getMembers } from '@/data/members/get-members';
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

  const [
    contact,
    allNotes,
    allTasks,
    allMeetings,
    allTickets,
    members,
    files
  ] = await Promise.all([
    getContact({ id: contactId }),
    getContactNotes({ contactId }),
    getContactTasks({ contactId }),
    getContactMeetings({ contactId }),
    getContactTickets({ contactId }),
    getMembers(),
    getContactMeetingFiles({ meetingId })
  ]);

  const linkedNotes = allNotes.filter((n) => n.meetingId === meeting.id);
  const linkedTasks = allTasks.filter((t) => t.meetingId === meeting.id);

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <div className="flex w-full flex-row items-center justify-between gap-4">
            <div className="flex min-w-0 flex-row items-center gap-4">
              <PageBack href={`/dashboard/contacts/${contactId}`} />
              <div className="min-w-0">
                <nav className="mb-1 truncate text-xs text-muted-foreground">
                  <Link
                    href="/dashboard/contacts"
                    className="hover:underline"
                  >
                    CRM
                  </Link>
                  {' · '}
                  <Link
                    href={`/dashboard/contacts/${contactId}`}
                    className="hover:underline"
                  >
                    {contact.name}
                  </Link>
                  {' · '}
                  Meetings
                  {' · '}
                  <span className="font-semibold text-foreground">
                    {meeting.title}
                  </span>
                </nav>
                <PageTitle className="truncate">
                  📅 {meeting.title}
                </PageTitle>
              </div>
            </div>
            <div className="flex shrink-0 flex-row items-center gap-2">
              <ContactMeetingStatusBadge status={meeting.status} />
              <ContactMeetingDetailMenu meeting={meeting} />
            </div>
          </div>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody className="h-full overflow-y-auto">
        <ContactMeetingDetail
          contact={contact}
          meeting={meeting}
          notes={linkedNotes}
          tasks={linkedTasks}
          tickets={allTickets}
          meetings={allMeetings}
          members={members}
          files={files}
        />
      </PageBody>
    </Page>
  );
}
