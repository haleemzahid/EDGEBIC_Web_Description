'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { ContactMeetingStatus } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarPlusIcon, MoreHorizontalIcon } from 'lucide-react';

import { AddContactMeetingModal } from '@/components/dashboard/contacts/details/meetings/add-contact-meeting-modal';
import { DeleteContactMeetingModal } from '@/components/dashboard/contacts/details/meetings/delete-contact-meeting-modal';
import { EditContactMeetingModal } from '@/components/dashboard/contacts/details/meetings/edit-contact-meeting-modal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ResponsiveScrollArea } from '@/components/ui/scroll-area';
import { MediaQueries } from '@/constants/media-queries';
import { cn, getInitials } from '@/lib/utils';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';

export type ContactMeetingsProps = {
  contact: ContactDto;
  meetings: ContactMeetingDto[];
};

export function ContactMeetings({
  contact,
  meetings
}: ContactMeetingsProps): React.JSX.Element {
  const now = new Date();
  const upcoming = meetings
    .filter((m) => m.startsAt.getTime() >= now.getTime())
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
  const past = meetings
    .filter((m) => m.startsAt.getTime() < now.getTime())
    .sort((a, b) => b.startsAt.getTime() - a.startsAt.getTime());

  const handleSchedule = (): void => {
    NiceModal.show(AddContactMeetingModal, { contactId: contact.id });
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
                contact={contact}
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
                contact={contact}
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

function statusBadge(status: ContactMeetingStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case ContactMeetingStatus.CONFIRMED:
      return {
        label: 'Confirmed',
        className:
          'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100'
      };
    case ContactMeetingStatus.PENDING:
      return {
        label: 'Pending',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case ContactMeetingStatus.COMPLETED:
      return {
        label: 'Completed',
        className:
          'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
      };
    case ContactMeetingStatus.CANCELLED:
      return {
        label: 'Cancelled',
        className: 'border-transparent bg-muted text-muted-foreground'
      };
  }
}

type MeetingRowProps = {
  meeting: ContactMeetingDto;
  contact: ContactDto;
  muted?: boolean;
};

function MeetingRow({
  meeting,
  contact,
  muted
}: MeetingRowProps): React.JSX.Element {
  const badge = statusBadge(meeting.status);
  const handleEdit = (): void => {
    NiceModal.show(EditContactMeetingModal, { meeting });
  };
  const handleDelete = (): void => {
    NiceModal.show(DeleteContactMeetingModal, { meeting });
  };
  return (
    <li
      className={cn(
        'flex flex-row items-center gap-4 px-6 py-3 transition-colors hover:bg-accent/40',
        muted && 'opacity-75'
      )}
    >
      <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-md border bg-background">
        <div className="text-[10px] font-semibold uppercase text-muted-foreground">
          {format(meeting.startsAt, 'MMM')}
        </div>
        <div className="text-base font-bold leading-none">
          {format(meeting.startsAt, 'dd')}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{meeting.title}</div>
        <div className="mt-0.5 truncate text-xs text-muted-foreground">
          {format(meeting.startsAt, 'EEE')} · {format(meeting.startsAt, 'h:mm a')}{' '}
          – {format(meeting.endsAt, 'h:mm a')}
          {meeting.location ? ` · ${meeting.location}` : ''}
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <Avatar className="size-5 rounded-full">
            <AvatarFallback className="bg-teal-700 text-[9px] font-semibold text-white">
              {getInitials(contact.name || 'CN')}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-[11px] text-muted-foreground">
            {contact.name || 'Contact'}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Badge
          variant="secondary"
          className={cn('text-[11px]', badge.className)}
        >
          {badge.label}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              title="Open menu"
            >
              <MoreHorizontalIcon className="size-4 shrink-0" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="!text-destructive"
              onClick={handleDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
