'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { ContactPriority } from '@prisma/client';
import { FilePlus2Icon } from 'lucide-react';

import { AddContactNoteModal } from '@/components/dashboard/contacts/details/notes/add-contact-note-modal';
import { ContactNotesDataTable } from '@/components/dashboard/contacts/details/notes/contact-notes-data-table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TransitionProvider } from '@/hooks/use-transition-context';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { ContactNoteDto } from '@/types/dtos/contact-note-dto';

export type ContactNotesProps = {
  contact: ContactDto;
  notes: ContactNoteDto[];
  meetings: ContactMeetingDto[];
};

const ALL = '__all__';
const NO_MEETING = 'none';

export function ContactNotes({
  contact,
  notes,
  meetings
}: ContactNotesProps): React.JSX.Element {
  const [priorityFilter, setPriorityFilter] = React.useState<string>(ALL);
  const [authorFilter, setAuthorFilter] = React.useState<string>(ALL);
  const [meetingFilter, setMeetingFilter] = React.useState<string>(ALL);

  const authors = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const note of notes) {
      map.set(note.sender.id, note.sender.name);
    }
    return Array.from(map.entries()).map(([id, name]) => ({
      value: id,
      label: name
    }));
  }, [notes]);

  const filteredNotes = React.useMemo(
    () =>
      notes.filter((note) => {
        if (priorityFilter !== ALL && note.priority !== priorityFilter)
          return false;
        if (authorFilter !== ALL && note.sender.id !== authorFilter)
          return false;
        if (meetingFilter !== ALL) {
          if (meetingFilter === NO_MEETING && note.meetingId) return false;
          if (meetingFilter !== NO_MEETING && note.meetingId !== meetingFilter)
            return false;
        }
        return true;
      }),
    [notes, priorityFilter, authorFilter, meetingFilter]
  );

  const handleShowAddContactNoteModal = (): void => {
    NiceModal.show(AddContactNoteModal, {
      contactId: contact.id,
      meetings
    });
  };

  const handleClear = (): void => {
    setPriorityFilter(ALL);
    setAuthorFilter(ALL);
    setMeetingFilter(ALL);
  };

  const hasActiveFilter =
    priorityFilter !== ALL || authorFilter !== ALL || meetingFilter !== ALL;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-row items-center justify-between gap-2 border-b px-6 pb-2 pt-4">
        <div>
          <h1 className="text-base font-semibold">Notes</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Internal notes only your team can see — never visible to the
            contact.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={handleShowAddContactNoteModal}
        >
          <FilePlus2Icon className="mr-1 size-3.5 shrink-0" />
          Add note
        </Button>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-2 border-b px-6 py-3">
        <FilterSelect
          value={authorFilter}
          onChange={setAuthorFilter}
          placeholder="All authors"
          options={authors}
        />
        <FilterSelect
          value={priorityFilter}
          onChange={setPriorityFilter}
          placeholder="All priorities"
          options={[
            { value: ContactPriority.HIGH, label: 'Important' },
            { value: ContactPriority.MEDIUM, label: 'Normal' },
            { value: ContactPriority.LOW, label: 'Low' }
          ]}
        />
        <FilterSelect
          value={meetingFilter}
          onChange={setMeetingFilter}
          placeholder="All meetings"
          options={[
            { value: NO_MEETING, label: '— No meeting —' },
            ...meetings.map((m) => ({ value: m.id, label: m.title }))
          ]}
        />
        {hasActiveFilter && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={handleClear}
          >
            Clear
          </Button>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {filteredNotes.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <FilePlus2Icon className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">
                {notes.length === 0 ? 'No notes' : 'No matching notes'}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {notes.length === 0
                  ? 'Internal notes linked to this contact will appear here.'
                  : 'Try clearing the filters above.'}
              </p>
            </div>
            {notes.length === 0 ? (
              <Button
                type="button"
                size="sm"
                onClick={handleShowAddContactNoteModal}
              >
                + Add note
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClear}
              >
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <TransitionProvider>
            <ContactNotesDataTable
              data={filteredNotes}
              meetings={meetings}
            />
          </TransitionProvider>
        )}
      </div>
    </div>
  );
}

type FilterSelectProps = {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
};

function FilterSelect({
  value,
  onChange,
  placeholder,
  options
}: FilterSelectProps): React.JSX.Element {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="h-8 w-auto min-w-[140px] text-xs">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{placeholder}</SelectItem>
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
