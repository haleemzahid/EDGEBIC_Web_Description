'use client';

import * as React from 'react';
import Link from 'next/link';
import NiceModal from '@ebay/nice-modal-react';
import { ContactMeetingStatus } from '@prisma/client';
import { format, formatDistanceToNow } from 'date-fns';
import {
  CalendarIcon,
  CheckSquare2Icon,
  ExternalLinkIcon,
  FileTextIcon,
  MapPinIcon,
  PaperclipIcon,
  PencilIcon,
  PinIcon,
  PlusIcon,
  StickyNoteIcon,
  TicketIcon,
  TrashIcon
} from 'lucide-react';

import { ContactMeetingFiles } from '@/components/dashboard/contacts/details/meetings/contact-meeting-files';
import {
  getContactTaskStatusMeta,
  isTaskInactive
} from '@/components/dashboard/contacts/details/tasks/contact-task-status-meta';
import { AddContactNoteModal } from '@/components/dashboard/contacts/details/notes/add-contact-note-modal';
import { DeleteContactNoteModal } from '@/components/dashboard/contacts/details/notes/delete-contact-note-modal';
import { EditContactNoteModal } from '@/components/dashboard/contacts/details/notes/edit-contact-note-modal';
import { AddContactTaskModal } from '@/components/dashboard/contacts/details/tasks/add-contact-task-modal';
import { DeleteContactTaskModal } from '@/components/dashboard/contacts/details/tasks/delete-contact-task-modal';
import { EditContactTaskModal } from '@/components/dashboard/contacts/details/tasks/edit-contact-task-modal';
import { AddContactTicketModal } from '@/components/dashboard/contacts/details/tickets/add-contact-ticket-modal';
import { DeleteContactTicketModal } from '@/components/dashboard/contacts/details/tickets/delete-contact-ticket-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { convertMarkdownToHtml } from '@/lib/markdown/convert-markdown-to-html';
import { cn, getInitials } from '@/lib/utils';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { ContactMeetingFileDto } from '@/types/dtos/contact-meeting-file-dto';
import type { ContactNoteDto } from '@/types/dtos/contact-note-dto';
import type { ContactTaskDto } from '@/types/dtos/contact-task-dto';
import type { ContactTicketDto } from '@/types/dtos/contact-ticket-dto';
import type { MemberDto } from '@/types/dtos/member-dto';

import { ContactMeetingStatusBadge } from './contact-meeting-status-badge';

export type ContactMeetingDetailProps = {
  contact: ContactDto;
  meeting: ContactMeetingDto;
  notes: ContactNoteDto[];
  tasks: ContactTaskDto[];
  tickets: ContactTicketDto[];
  meetings: ContactMeetingDto[];
  members: MemberDto[];
  files: ContactMeetingFileDto[];
};

export function ContactMeetingDetail({
  contact,
  meeting,
  notes,
  tasks,
  tickets,
  meetings,
  members,
  files
}: ContactMeetingDetailProps): React.JSX.Element {
  const handleAddTask = (): void => {
    NiceModal.show(AddContactTaskModal, {
      contactId: contact.id,
      meetings,
      members,
      defaultMeetingId: meeting.id,
      hideMeetingField: true
    });
  };
  const handleAddTicket = (): void => {
    NiceModal.show(AddContactTicketModal, {
      contactId: contact.id,
      members,
      meetings,
      defaultMeetingId: meeting.id,
      hideMeetingField: true
    });
  };

  const linkedTickets = tickets.filter((t) => t.meetingId === meeting.id);
  const handleAddNote = (): void => {
    NiceModal.show(AddContactNoteModal, {
      contactId: contact.id,
      meetings,
      defaultMeetingId: meeting.id,
      hideMeetingField: true
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[280px_1fr]">
      {/* LEFT rail */}
      <aside className="space-y-6">
        <PropertiesSection meeting={meeting} />
        <AttendeesSection contact={contact} />
        <CustomerSection contact={contact} />
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
              value="files"
              className="text-xs"
            >
              <PaperclipIcon className="mr-1.5 size-3.5 shrink-0" />
              Files
              <CountBadge value={files.length} />
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="text-xs"
            >
              <CheckSquare2Icon className="mr-1.5 size-3.5 shrink-0" />
              Tasks
              <CountBadge value={tasks.length} />
            </TabsTrigger>
            <TabsTrigger
              value="tickets"
              className="text-xs"
            >
              <TicketIcon className="mr-1.5 size-3.5 shrink-0" />
              Tickets
              <CountBadge value={linkedTickets.length} />
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="text-xs"
            >
              <StickyNoteIcon className="mr-1.5 size-3.5 shrink-0" />
              Notes
              <CountBadge value={notes.length} />
            </TabsTrigger>
          </TabsList>

          {/* Meeting details */}
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
                    {format(meeting.startsAt, 'EEEE, MMMM d yyyy')} ·{' '}
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

            <SubSection title="Properties">
              <PropertiesList meeting={meeting} />
            </SubSection>

            <SubSection title="Attendees">
              <AttendeeList contact={contact} />
            </SubSection>

            <SubSection title="Customer">
              <CustomerLinkCard contact={contact} />
            </SubSection>

            {meeting.description && (
              <SubSection title="Description">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                  {meeting.description}
                </p>
              </SubSection>
            )}
          </TabsContent>

          {/* Files */}
          <TabsContent
            value="files"
            className="mt-4"
          >
            <ContactMeetingFiles
              meetingId={meeting.id}
              files={files}
            />
          </TabsContent>

          {/* Tasks */}
          <TabsContent
            value="tasks"
            className="mt-4"
          >
            <div className="overflow-hidden rounded-lg border">
              <header className="flex flex-row items-center justify-between border-b px-5 py-3">
                <h2 className="text-sm font-semibold">
                  Tasks from this meeting
                </h2>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddTask}
                >
                  <PlusIcon className="mr-1 size-3.5 shrink-0" />
                  Create task
                </Button>
              </header>
              {tasks.length === 0 ? (
                <EmptyDashedRow>
                  No tasks yet — create one to track follow-ups from this
                  meeting.
                </EmptyDashedRow>
              ) : (
                <ul className="divide-y">
                  {tasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      meetings={meetings}
                      members={members}
                    />
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
                </Link>{' '}
                and the Activity timeline.
              </p>
            </div>
          </TabsContent>

          {/* Tickets */}
          <TabsContent
            value="tickets"
            className="mt-4"
          >
            <div className="overflow-hidden rounded-lg border">
              <header className="flex flex-row items-center justify-between border-b px-5 py-3">
                <h2 className="text-sm font-semibold">
                  Tickets from this meeting
                </h2>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddTicket}
                >
                  <PlusIcon className="mr-1 size-3.5 shrink-0" />
                  Create ticket
                </Button>
              </header>
              {linkedTickets.length === 0 ? (
                <EmptyDashedRow>
                  No tickets linked to this meeting yet.
                </EmptyDashedRow>
              ) : (
                <ul className="divide-y">
                  {linkedTickets.map((ticket) => (
                    <TicketRow
                      key={ticket.id}
                      ticket={ticket}
                      contactId={contact.id}
                    />
                  ))}
                </ul>
              )}
              <p className="border-t px-5 py-2 text-xs text-muted-foreground">
                ✨ Tickets linked from{' '}
                <Link
                  href={`/dashboard/contacts/${contact.id}`}
                  className="text-blue-600 underline-offset-2 hover:underline"
                >
                  {contact.name}&apos;s CRM page
                </Link>{' '}
                with this meeting selected also show here automatically.
              </p>
            </div>
          </TabsContent>

          {/* Notes */}
          <TabsContent
            value="notes"
            className="mt-4"
          >
            <div className="overflow-hidden rounded-lg border">
              <header className="border-b px-5 py-3">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-sm font-semibold">Notes</h2>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddNote}
                  >
                    <PlusIcon className="mr-1 size-3.5 shrink-0" />
                    Add note
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Internal notes only your team can see — never visible to the
                  customer.
                </p>
              </header>
              {notes.length === 0 ? (
                <EmptyDashedRow>
                  No notes linked to this meeting yet.
                </EmptyDashedRow>
              ) : (
                <ul className="divide-y">
                  {notes.map((note) => (
                    <li
                      key={note.id}
                      className="px-5 py-4"
                    >
                      <NoteRow
                        note={note}
                        meetings={meetings}
                      />
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
                with this meeting selected also show here automatically.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ------------------------------- Sub-sections ----------------------------- */

function SubSection({
  title,
  children
}: React.PropsWithChildren<{ title: string }>): React.JSX.Element {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}

function PropertiesSection({
  meeting
}: {
  meeting: ContactMeetingDto;
}): React.JSX.Element {
  return (
    <section className="space-y-3 rounded-lg border bg-card p-4">
      <h3 className="text-sm font-semibold">Properties</h3>
      <PropertiesList meeting={meeting} />
    </section>
  );
}

function PropertiesList({
  meeting
}: {
  meeting: ContactMeetingDto;
}): React.JSX.Element {
  const rows: Array<{ label: string; value: React.ReactNode }> = [
    { label: 'Date', value: format(meeting.startsAt, 'EEE, MMM d yyyy') },
    {
      label: 'Time',
      value: `${format(meeting.startsAt, 'h:mm a')} – ${format(meeting.endsAt, 'h:mm a')}`
    },
    { label: 'Where', value: meeting.location ?? '—' },
    {
      label: 'Status',
      value: <ContactMeetingStatusBadge status={meeting.status} />
    }
  ];
  return (
    <div className="space-y-2 text-xs">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[80px_1fr] gap-2"
        >
          <div className="text-muted-foreground">{row.label}</div>
          <div className="font-medium">{row.value}</div>
        </div>
      ))}
    </div>
  );
}

function AttendeesSection({
  contact
}: {
  contact: ContactDto;
}): React.JSX.Element {
  return (
    <section className="space-y-3 rounded-lg border bg-card p-4">
      <h3 className="text-sm font-semibold">Attendees</h3>
      <AttendeeList contact={contact} />
    </section>
  );
}

function AttendeeList({
  contact
}: {
  contact: ContactDto;
}): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex items-center gap-2">
        <Avatar className="size-6 rounded-full">
          <AvatarImage
            src={contact.image}
            alt={contact.name}
          />
          <AvatarFallback className="bg-teal-700 text-[10px] font-semibold text-white">
            {getInitials(contact.name) || 'CN'}
          </AvatarFallback>
        </Avatar>
        <span>{contact.name}</span>
      </div>
    </div>
  );
}

function CustomerSection({
  contact
}: {
  contact: ContactDto;
}): React.JSX.Element {
  return (
    <section className="space-y-3 rounded-lg border bg-card p-4">
      <h3 className="text-sm font-semibold">Customer</h3>
      <CustomerLinkCard contact={contact} />
    </section>
  );
}

function CustomerLinkCard({
  contact
}: {
  contact: ContactDto;
}): React.JSX.Element {
  return (
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
  );
}

/* --------------------------------- Helpers -------------------------------- */

function CountBadge({ value }: { value: number }): React.JSX.Element {
  return (
    <span className="ml-1.5 rounded-full bg-muted px-1.5 text-[10px] font-semibold">
      {value}
    </span>
  );
}

function EmptyDashedRow({
  children
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <div className="p-4">
      <div className="rounded-md border border-dashed px-4 py-6 text-center text-xs text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function priorityBadgeClasses(priority: string): string {
  switch (priority) {
    case 'HIGH':
      return 'border-transparent bg-red-100 text-red-800 hover:bg-red-100';
    case 'LOW':
      return 'border-transparent bg-muted text-muted-foreground';
    default:
      return 'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100';
  }
}

function TicketRow({
  ticket,
  contactId
}: {
  ticket: ContactTicketDto;
  contactId: string;
}): React.JSX.Element {
  const handleDelete = (): void => {
    NiceModal.show(DeleteContactTicketModal, { ticket });
  };
  return (
    <li className="flex flex-row items-center justify-between gap-3 px-5 py-3">
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">
          🎫 #{ticket.number} · {ticket.title}
        </div>
        <div className="mt-0.5 truncate text-xs text-muted-foreground">
          {ticket.assigneeName ?? 'Unassigned'}
        </div>
      </div>
      <Badge
        variant="secondary"
        className={cn('text-[11px]', ticketStatusBadgeClasses(ticket.status))}
      >
        {ticketStatusLabel(ticket.status)}
      </Badge>
      <Badge
        variant="secondary"
        className={cn('text-[11px]', priorityBadgeClasses(ticket.priority))}
      >
        {ticket.priority.charAt(0) + ticket.priority.slice(1).toLowerCase()}
      </Badge>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7"
        title="Open ticket"
        asChild
      >
        <Link href={`/dashboard/contacts/${contactId}/tickets/${ticket.id}`}>
          <ExternalLinkIcon className="size-3.5 shrink-0" />
          <span className="sr-only">Open ticket</span>
        </Link>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 text-destructive hover:text-destructive"
        title="Delete ticket"
        onClick={handleDelete}
      >
        <TrashIcon className="size-3.5 shrink-0" />
        <span className="sr-only">Delete ticket</span>
      </Button>
    </li>
  );
}

function ticketStatusLabel(status: ContactTicketDto['status']): string {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function ticketStatusBadgeClasses(status: ContactTicketDto['status']): string {
  switch (status) {
    case 'OPEN':
      return 'border-transparent bg-rose-100 text-rose-800 hover:bg-rose-100';
    case 'PENDING':
      return 'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100';
    case 'RESOLVED':
      return 'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100';
    case 'CLOSED':
      return 'border-transparent bg-muted text-muted-foreground';
    default:
      return 'border-transparent bg-muted text-muted-foreground';
  }
}

function TaskRow({
  task,
  meetings,
  members
}: {
  task: ContactTaskDto;
  meetings: ContactMeetingDto[];
  members: MemberDto[];
}): React.JSX.Element {
  const statusMeta = getContactTaskStatusMeta(task.status);
  const inactive = isTaskInactive(task.status);
  const handleEdit = (): void => {
    NiceModal.show(EditContactTaskModal, {
      task,
      meetings,
      members,
      hideMeetingField: true
    });
  };
  const handleDelete = (): void => {
    NiceModal.show(DeleteContactTaskModal, { task });
  };
  return (
    <li className="flex flex-row items-center justify-between gap-3 px-5 py-3">
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            'truncate text-sm font-medium',
            inactive && 'text-muted-foreground line-through'
          )}
        >
          ✅ {task.title}
        </div>
        <div className="mt-0.5 truncate text-xs text-muted-foreground">
          {task.assigneeName ?? 'Unassigned'}
          {task.dueDate
            ? ` · Due ${format(task.dueDate, 'MMM d, yyyy')}`
            : ''}
          {task.category
            ? ` · ${task.category.charAt(0) + task.category.slice(1).toLowerCase().replace('_', '-')}`
            : ''}
        </div>
      </div>
      <Badge
        variant="secondary"
        className={cn('text-[11px]', statusMeta.className)}
      >
        {statusMeta.label}
      </Badge>
      <Badge
        variant="secondary"
        className={cn('text-[11px]', priorityBadgeClasses(task.priority))}
      >
        {task.priority.charAt(0) + task.priority.slice(1).toLowerCase()}
      </Badge>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7"
        title="Edit task"
        onClick={handleEdit}
      >
        <PencilIcon className="size-3.5 shrink-0" />
        <span className="sr-only">Edit task</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 text-destructive hover:text-destructive"
        title="Delete task"
        onClick={handleDelete}
      >
        <TrashIcon className="size-3.5 shrink-0" />
        <span className="sr-only">Delete task</span>
      </Button>
    </li>
  );
}

function NoteRow({
  note,
  meetings
}: {
  note: ContactNoteDto;
  meetings: ContactMeetingDto[];
}): React.JSX.Element {
  const handleEdit = (): void => {
    NiceModal.show(EditContactNoteModal, {
      note,
      meetings,
      hideMeetingField: true
    });
  };
  const handleDelete = (): void => {
    NiceModal.show(DeleteContactNoteModal, { note });
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar className="size-7 rounded-full">
            <AvatarImage
              src={note.sender.image}
              alt={note.sender.name}
            />
            <AvatarFallback className="text-[11px] font-semibold">
              {getInitials(note.sender.name)}
            </AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <div className="text-xs font-semibold">{note.sender.name}</div>
            <div className="text-[11px] text-muted-foreground">
              {formatDistanceToNow(note.createdAt, { addSuffix: true })}
              {note.edited && ' · edited'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {note.pinned && (
            <Badge
              variant="secondary"
              className="border-transparent bg-amber-200 text-[11px] text-amber-900 hover:bg-amber-200"
            >
              <PinIcon className="mr-1 size-3 shrink-0" />
              Pinned
            </Badge>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7"
            title="Edit note"
            onClick={handleEdit}
          >
            <PencilIcon className="size-3.5 shrink-0" />
            <span className="sr-only">Edit note</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 text-destructive hover:text-destructive"
            title="Delete note"
            onClick={handleDelete}
          >
            <TrashIcon className="size-3.5 shrink-0" />
            <span className="sr-only">Delete note</span>
          </Button>
        </div>
      </div>
      {note.text ? (
        <div
          className="text-wrap break-words text-sm leading-relaxed text-foreground/90 [&_h1]:mb-2 [&_h1]:text-base [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:text-sm [&_h2]:font-bold [&_li]:mx-5 [&_li]:my-0 [&_ol]:mb-2 [&_p:last-child]:mb-0 [&_p]:m-0 [&_p]:mb-2 [&_ul]:mb-2"
          dangerouslySetInnerHTML={{
            __html: convertMarkdownToHtml(note.text)
          }}
        />
      ) : (
        <p className="text-sm italic text-muted-foreground">Empty note</p>
      )}
    </div>
  );
}

