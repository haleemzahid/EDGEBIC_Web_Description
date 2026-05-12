'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import {
  ContactPriority,
  ContactTaskCategory,
  ContactTaskStatus
} from '@prisma/client';
import { CheckSquare2Icon } from 'lucide-react';

import { AddContactTaskModal } from '@/components/dashboard/contacts/details/tasks/add-contact-task-modal';
import { ContactTaskList } from '@/components/dashboard/contacts/details/tasks/contact-task-list';
import { Button } from '@/components/ui/button';
import { EmptyText } from '@/components/ui/empty-text';
import { ResponsiveScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { MediaQueries } from '@/constants/media-queries';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { ContactTaskDto } from '@/types/dtos/contact-task-dto';
import type { MemberDto } from '@/types/dtos/member-dto';

export type ContactTasksProps = {
  contact: ContactDto;
  tasks: ContactTaskDto[];
  meetings: ContactMeetingDto[];
  members: MemberDto[];
};

const ALL = '__all__';
const NO_MEETING = '__none__';

export function ContactTasks({
  contact,
  tasks,
  meetings,
  members
}: ContactTasksProps): React.JSX.Element {
  const [categoryFilter, setCategoryFilter] = React.useState<string>(ALL);
  const [assigneeFilter, setAssigneeFilter] = React.useState<string>(ALL);
  const [priorityFilter, setPriorityFilter] = React.useState<string>(ALL);
  const [meetingFilter, setMeetingFilter] = React.useState<string>(ALL);

  const filteredTasks = React.useMemo(
    () =>
      tasks.filter((t) => {
        if (categoryFilter !== ALL && t.category !== categoryFilter)
          return false;
        if (assigneeFilter !== ALL && t.assigneeUserId !== assigneeFilter)
          return false;
        if (priorityFilter !== ALL && t.priority !== priorityFilter)
          return false;
        if (meetingFilter !== ALL) {
          if (meetingFilter === NO_MEETING && t.meetingId) return false;
          if (meetingFilter !== NO_MEETING && t.meetingId !== meetingFilter)
            return false;
        }
        return true;
      }),
    [tasks, categoryFilter, assigneeFilter, priorityFilter, meetingFilter]
  );

  const openTasks = filteredTasks.filter(
    (task) => task.status === ContactTaskStatus.OPEN
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === ContactTaskStatus.COMPLETED
  );

  const handleShowAddTaskModal = (): void => {
    NiceModal.show(AddContactTaskModal, {
      contactId: contact.id,
      meetings,
      members
    });
  };

  const handleClear = (): void => {
    setCategoryFilter(ALL);
    setAssigneeFilter(ALL);
    setPriorityFilter(ALL);
    setMeetingFilter(ALL);
  };

  const hasActiveFilter =
    categoryFilter !== ALL ||
    assigneeFilter !== ALL ||
    priorityFilter !== ALL ||
    meetingFilter !== ALL;

  return (
    <ResponsiveScrollArea
      breakpoint={MediaQueries.MdUp}
      mediaQueryOptions={{ ssr: true }}
      className="h-full"
    >
      <div className="border-b">
        <div className="flex flex-row items-center justify-between gap-2 px-6 pb-2 pt-4">
          <div>
            <h1 className="text-base font-semibold">Tasks</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              To-do items linked to this contact.
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleShowAddTaskModal}
          >
            <CheckSquare2Icon className="mr-1 size-3.5 shrink-0" />
            Add task
          </Button>
        </div>

        <div className="flex flex-row flex-wrap items-center gap-2 px-6 pb-3">
          <FilterSelect
            value={categoryFilter}
            onChange={setCategoryFilter}
            placeholder="All categories"
            options={[
              { value: ContactTaskCategory.SALES, label: 'Sales' },
              { value: ContactTaskCategory.ONBOARDING, label: 'Onboarding' },
              { value: ContactTaskCategory.SUPPORT, label: 'Support' },
              { value: ContactTaskCategory.FOLLOW_UP, label: 'Follow-up' }
            ]}
          />
          <FilterSelect
            value={assigneeFilter}
            onChange={setAssigneeFilter}
            placeholder="All assignees"
            options={members.map((m) => ({ value: m.id, label: m.name }))}
          />
          <FilterSelect
            value={priorityFilter}
            onChange={setPriorityFilter}
            placeholder="All priorities"
            options={[
              { value: ContactPriority.HIGH, label: 'High' },
              { value: ContactPriority.MEDIUM, label: 'Medium' },
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

        <SectionHeading>Open · {openTasks.length}</SectionHeading>
        {openTasks.length > 0 ? (
          <ContactTaskList
            tasks={openTasks}
            meetings={meetings}
            members={members}
          />
        ) : (
          <EmptyText className="p-6">
            There is no open task for this contact.
          </EmptyText>
        )}
        <SectionHeading>Done · {completedTasks.length}</SectionHeading>
        {completedTasks.length > 0 ? (
          <ContactTaskList
            tasks={completedTasks}
            meetings={meetings}
            members={members}
          />
        ) : (
          <EmptyText className="p-6">
            There is no completed task for this contact.
          </EmptyText>
        )}
      </div>
    </ResponsiveScrollArea>
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

function SectionHeading(
  props: React.PropsWithChildren
): React.JSX.Element {
  return (
    <h4 className="border-y bg-muted/40 px-6 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {props.children}
    </h4>
  );
}
