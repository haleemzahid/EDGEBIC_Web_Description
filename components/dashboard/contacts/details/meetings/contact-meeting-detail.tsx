'use client';

import * as React from 'react';
import Link from 'next/link';
import { ContactMeetingStatus } from '@prisma/client';
import { format } from 'date-fns';
import {
  CalendarIcon,
  CheckSquare2Icon,
  ClockIcon,
  FileTextIcon,
  MapPinIcon,
  TicketIcon,
  UserIcon
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, getInitials } from '@/lib/utils';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { ContactNoteDto } from '@/types/dtos/contact-note-dto';
import type { ContactTaskDto } from '@/types/dtos/contact-task-dto';

export type ContactMeetingDetailProps = {
  contact: ContactDto;
  meeting: ContactMeetingDto;
  notes: ContactNoteDto[];
  tasks: ContactTaskDto[];
};

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

export function ContactMeetingDetail({
  contact,
  meeting,
  notes,
  tasks
}: ContactMeetingDetailProps): React.JSX.Element {
  const badge = statusBadge(meeting.status);
  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[280px_1fr]">
      {/* LEFT rail */}
      <aside className="space-y-6">
        <section className="space-y-3 rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold">Properties</h3>
          <dl className="space-y-2 text-xs">
            <PropertyRow label="Date">
              {format(meeting.startsAt, 'EEE, MMM d yyyy')}
            </PropertyRow>
            <PropertyRow label="Time">
              {format(meeting.startsAt, 'h:mm a')} –{' '}
              {format(meeting.endsAt, 'h:mm a')}
            </PropertyRow>
            <PropertyRow label="Where">{meeting.location ?? '—'}</PropertyRow>
            <PropertyRow label="Status">
              <Badge
                variant="secondary"
                className={cn('text-[11px]', badge.className)}
              >
                {badge.label}
              </Badge>
            </PropertyRow>
          </dl>
        </section>

        <section className="space-y-3 rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold">Customer</h3>
          <Link
            href={`/dashboard/contacts/${contact.id}`}
            className="flex items-center gap-3 rounded-md border p-3 transition-colors hover:bg-accent/50"
          >
            <Avatar className="size-9 shrink-0 rounded-full">
              <AvatarImage
                src={contact.image}
                alt={contact.name}
              />
              <AvatarFallback className="bg-teal-700 text-xs font-semibold text-white">
                {getInitials(contact.name) || 'CN'}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{contact.name}</div>
              <div className="truncate text-xs text-muted-foreground">
                {contact.company || contact.email || 'Contact'}
              </div>
            </div>
          </Link>
        </section>
      </aside>

      {/* RIGHT column */}
      <div className="min-w-0">
        <Tabs
          defaultValue="overview"
          className="flex w-full flex-col"
        >
          <TabsList className="w-full justify-start rounded-md border bg-card p-1">
            <TabsTrigger
              value="overview"
              className="text-xs"
            >
              <FileTextIcon className="mr-1.5 size-3.5 shrink-0" />
              Meeting details
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="text-xs"
            >
              <CheckSquare2Icon className="mr-1.5 size-3.5 shrink-0" />
              Tasks
              <span className="ml-1.5 rounded-full bg-muted px-1.5 text-[10px] font-semibold">
                {tasks.length}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="tickets"
              className="text-xs"
            >
              <TicketIcon className="mr-1.5 size-3.5 shrink-0" />
              Tickets
              <span className="ml-1.5 rounded-full bg-muted px-1.5 text-[10px] font-semibold">
                0
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="text-xs"
            >
              <FileTextIcon className="mr-1.5 size-3.5 shrink-0" />
              Notes
              <span className="ml-1.5 rounded-full bg-muted px-1.5 text-[10px] font-semibold">
                {notes.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="overview"
            className="mt-4 space-y-6"
          >
            <section className="rounded-lg border bg-muted/30 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h1 className="text-lg font-semibold">{meeting.title}</h1>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarIcon className="size-3.5 shrink-0" />
                    {format(meeting.startsAt, 'EEEE, MMMM d yyyy')}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <ClockIcon className="size-3.5 shrink-0" />
                    {format(meeting.startsAt, 'h:mm a')} –{' '}
                    {format(meeting.endsAt, 'h:mm a')}
                  </div>
                  {meeting.location && (
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPinIcon className="size-3.5 shrink-0" />
                      {meeting.location}
                    </div>
                  )}
                </div>
                {meeting.status === ContactMeetingStatus.CONFIRMED && (
                  <Button
                    type="button"
                    size="sm"
                  >
                    Join meeting
                  </Button>
                )}
              </div>
            </section>

            {meeting.description && (
              <section className="space-y-2">
                <h3 className="text-sm font-semibold">Description</h3>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                  {meeting.description}
                </p>
              </section>
            )}

            <section className="space-y-2">
              <h3 className="text-sm font-semibold">Customer</h3>
              <Link
                href={`/dashboard/contacts/${contact.id}`}
                className="flex items-center gap-3 rounded-md border p-3 transition-colors hover:bg-accent/50"
              >
                <UserIcon className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {contact.name}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {contact.company || contact.email || 'Contact'}
                  </div>
                </div>
              </Link>
            </section>
          </TabsContent>

          <TabsContent
            value="tasks"
            className="mt-4"
          >
            <div className="rounded-lg border">
              <header className="flex flex-row items-center justify-between border-b px-5 py-3">
                <h2 className="text-sm font-semibold">
                  Tasks from this meeting
                </h2>
                <Button
                  type="button"
                  size="sm"
                  asChild
                >
                  <Link href={`/dashboard/contacts/${contact.id}`}>
                    + Create task
                  </Link>
                </Button>
              </header>
              {tasks.length === 0 ? (
                <p className="px-5 py-6 text-center text-sm text-muted-foreground">
                  No tasks yet — create one from the contact&apos;s Tasks tab
                  and link it to this meeting.
                </p>
              ) : (
                <ul className="divide-y">
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center justify-between gap-3 px-5 py-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">
                          {task.title}
                        </div>
                        <div className="mt-0.5 truncate text-xs text-muted-foreground">
                          {task.assigneeName ?? 'Unassigned'}
                          {task.dueDate
                            ? ` · Due ${format(task.dueDate, 'MMM d, yyyy')}`
                            : ''}
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-[11px]"
                      >
                        {task.status === 'COMPLETED' ? 'Done' : task.priority}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
              <p className="border-t px-5 py-2 text-xs text-muted-foreground">
                ✨ Tasks created here also appear in{' '}
                <Link
                  href={`/dashboard/contacts/${contact.id}`}
                  className="text-blue-600 underline-offset-2 hover:underline"
                >
                  {contact.name}&apos;s Tasks tab
                </Link>
                .
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="tickets"
            className="mt-4"
          >
            <div className="rounded-lg border p-5 text-center text-sm text-muted-foreground">
              Tickets linked to this meeting will appear here. Linkage from
              tickets to meetings is not yet available.
            </div>
          </TabsContent>

          <TabsContent
            value="notes"
            className="mt-4"
          >
            <div className="rounded-lg border">
              <header className="flex flex-row items-center justify-between border-b px-5 py-3">
                <h2 className="text-sm font-semibold">Notes</h2>
                <Button
                  type="button"
                  size="sm"
                  asChild
                >
                  <Link href={`/dashboard/contacts/${contact.id}`}>
                    + Add note
                  </Link>
                </Button>
              </header>
              {notes.length === 0 ? (
                <p className="px-5 py-6 text-center text-sm text-muted-foreground">
                  No notes linked to this meeting yet.
                </p>
              ) : (
                <ul className="divide-y">
                  {notes.map((note) => (
                    <li
                      key={note.id}
                      className="space-y-2 px-5 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6 rounded-full">
                          <AvatarImage
                            src={note.sender.image}
                            alt={note.sender.name}
                          />
                          <AvatarFallback className="text-[10px] font-semibold">
                            {getInitials(note.sender.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-xs">
                          <strong className="font-semibold">
                            {note.sender.name}
                          </strong>
                          <span className="ml-1.5 text-muted-foreground">
                            · {format(note.createdAt, 'MMM d, h:mm a')}
                          </span>
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                        {note.text || (
                          <span className="italic text-muted-foreground">
                            Empty note
                          </span>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <p className="border-t px-5 py-2 text-xs text-muted-foreground">
                ✨ Notes linked from{' '}
                <Link
                  href={`/dashboard/contacts/${contact.id}`}
                  className="text-blue-600 underline-offset-2 hover:underline"
                >
                  {contact.name}&apos;s CRM page
                </Link>{' '}
                show here automatically when the meeting is selected.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function PropertyRow({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}
