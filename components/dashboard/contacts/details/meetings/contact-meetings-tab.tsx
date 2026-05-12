'use client';

import * as React from 'react';
import { addDays, format, subDays } from 'date-fns';
import { CalendarPlusIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsiveScrollArea } from '@/components/ui/scroll-area';
import { MediaQueries } from '@/constants/media-queries';
import { cn, getInitials } from '@/lib/utils';
import type { ContactDto } from '@/types/dtos/contact-dto';

type MeetingStatus = 'CONFIRMED' | 'PENDING' | 'COMPLETED';

type MeetingAttendee = {
  initials: string;
  className: string;
};

type Meeting = {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  attendees: MeetingAttendee[];
  attendeesLabel: string;
  status: MeetingStatus;
};

function buildSampleMeetings(contact: ContactDto): Meeting[] {
  const contactInitials = getInitials(contact.name || 'Contact') || 'CN';
  const meAvatar: MeetingAttendee = {
    initials: 'AB',
    className: 'bg-amber-200 text-amber-900'
  };
  const teamAvatar: MeetingAttendee = {
    initials: 'BB',
    className: 'bg-blue-100 text-blue-800'
  };
  const contactAvatar: MeetingAttendee = {
    initials: contactInitials,
    className: 'bg-teal-700 text-white'
  };
  const now = new Date();
  return [
    {
      id: 'm-demo',
      title: 'EDGEBI demo — heat-map & drag-drop scheduling',
      date: addDays(now, 5),
      startTime: '10:00',
      endTime: '10:45 AM (PKT)',
      location: 'Google Meet',
      attendees: [meAvatar, teamAvatar, contactAvatar],
      attendeesLabel: `Alice, Bob, ${contact.name || 'Contact'}`,
      status: 'CONFIRMED'
    },
    {
      id: 'm-training',
      title: 'Training session (5 users)',
      date: addDays(now, 9),
      startTime: '2:00',
      endTime: '4:00 PM (PKT)',
      location: 'On-site visit',
      attendees: [teamAvatar, contactAvatar],
      attendeesLabel: `Bob + 5 from ${contact.company || contact.name || 'team'}`,
      status: 'PENDING'
    },
    {
      id: 'm-discovery',
      title: 'Discovery call — production-planning needs',
      date: subDays(now, 6),
      startTime: '11:00',
      endTime: '11:30 AM (PKT)',
      location: 'Zoom',
      attendees: [meAvatar, contactAvatar],
      attendeesLabel: `Alice, ${contact.name || 'Contact'}`,
      status: 'COMPLETED'
    }
  ];
}

function statusBadge(status: MeetingStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case 'CONFIRMED':
      return {
        label: 'Confirmed',
        className:
          'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100'
      };
    case 'PENDING':
      return {
        label: 'Pending',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case 'COMPLETED':
      return {
        label: 'Completed',
        className:
          'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
      };
  }
}

function primaryAction(status: MeetingStatus): string {
  switch (status) {
    case 'CONFIRMED':
      return 'Join';
    case 'PENDING':
      return 'Confirm';
    case 'COMPLETED':
      return 'Notes';
  }
}

export type ContactMeetingsTabProps = {
  contact: ContactDto;
};

export function ContactMeetingsTab({
  contact
}: ContactMeetingsTabProps): React.JSX.Element {
  const meetings = React.useMemo(
    () => buildSampleMeetings(contact),
    [contact]
  );
  const now = new Date();
  const upcoming = meetings
    .filter((m) => m.date.getTime() >= now.getTime())
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  const past = meetings
    .filter((m) => m.date.getTime() < now.getTime())
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleSchedule = (): void => {
    toast.info('Schedule meeting — coming soon');
  };

  return (
    <ResponsiveScrollArea
      breakpoint={MediaQueries.MdUp}
      mediaQueryOptions={{ ssr: true }}
      className="h-full"
    >
      <div className="border-b">
        <div className="flex flex-row items-center justify-between gap-2 px-6 pb-2 pt-4">
          <div>
            <h1 className="text-base font-semibold">Meetings</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Calls and on-site visits with this contact.
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleSchedule}
          >
            <CalendarPlusIcon className="mr-1 size-3.5 shrink-0" />
            Schedule
          </Button>
        </div>

        <SectionHeading>Upcoming · {upcoming.length}</SectionHeading>
        {upcoming.length > 0 ? (
          <ul className="divide-y">
            {upcoming.map((meeting) => (
              <MeetingRow
                key={meeting.id}
                meeting={meeting}
              />
            ))}
          </ul>
        ) : (
          <p className="px-6 py-4 text-sm text-muted-foreground">
            No upcoming meetings.
          </p>
        )}

        <SectionHeading>Past · {past.length}</SectionHeading>
        {past.length > 0 ? (
          <ul className="divide-y">
            {past.map((meeting) => (
              <MeetingRow
                key={meeting.id}
                meeting={meeting}
                muted
              />
            ))}
          </ul>
        ) : (
          <p className="px-6 py-4 text-sm text-muted-foreground">
            No past meetings.
          </p>
        )}
      </div>
    </ResponsiveScrollArea>
  );
}

function SectionHeading(
  props: React.PropsWithChildren
): React.JSX.Element {
  return (
    <h4 className="border-y bg-muted/40 px-6 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {props.children}
    </h4>
  );
}

type MeetingRowProps = {
  meeting: Meeting;
  muted?: boolean;
};

function MeetingRow({ meeting, muted }: MeetingRowProps): React.JSX.Element {
  const badge = statusBadge(meeting.status);
  const action = primaryAction(meeting.status);
  return (
    <li
      className={cn(
        'flex flex-row items-center gap-4 px-6 py-3 transition-colors hover:bg-accent/40',
        muted && 'opacity-75'
      )}
    >
      <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-md border bg-background">
        <div className="text-[10px] font-semibold uppercase text-muted-foreground">
          {format(meeting.date, 'MMM')}
        </div>
        <div className="text-base font-bold leading-none">
          {format(meeting.date, 'dd')}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{meeting.title}</div>
        <div className="mt-0.5 truncate text-xs text-muted-foreground">
          {format(meeting.date, 'EEE')} · {meeting.startTime} – {meeting.endTime}{' '}
          · {meeting.location}
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <div className="flex -space-x-1.5">
            {meeting.attendees.map((attendee, idx) => (
              <Avatar
                key={idx}
                className="size-5 rounded-full ring-2 ring-background"
              >
                <AvatarFallback
                  className={cn(
                    'text-[9px] font-semibold',
                    attendee.className
                  )}
                >
                  {attendee.initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="truncate text-[11px] text-muted-foreground">
            {meeting.attendeesLabel}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <Badge
          variant="secondary"
          className={cn('text-[11px]', badge.className)}
        >
          {badge.label}
        </Badge>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={() => toast.info(`${action} — coming soon`)}
        >
          {action}
        </Button>
      </div>
    </li>
  );
}
