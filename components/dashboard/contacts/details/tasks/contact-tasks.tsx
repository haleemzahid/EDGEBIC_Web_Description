'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { ContactPriority, ContactTaskStatus } from '@prisma/client';
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
import type { ContactTaskDto } from '@/types/dtos/contact-task-dto';

export type ContactTasksProps = {
  contact: ContactDto;
  tasks: ContactTaskDto[];
};

const ALL = '__all__';

export function ContactTasks({
  contact,
  tasks
}: ContactTasksProps): React.JSX.Element {
  const [priorityFilter, setPriorityFilter] = React.useState<string>(ALL);
  const [categoryFilter, setCategoryFilter] = React.useState<string>(ALL);
  const [assigneeFilter, setAssigneeFilter] = React.useState<string>(ALL);
  const [meetingFilter, setMeetingFilter] = React.useState<string>(ALL);

  const filteredTasks = React.useMemo(
    () =>
      tasks.filter((t) => {
        if (priorityFilter !== ALL && t.priority !== priorityFilter)
          return false;
        return true;
      }),
    [tasks, priorityFilter]
  );

  const openTasks = filteredTasks.filter(
    (task) => task.status === ContactTaskStatus.OPEN
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === ContactTaskStatus.COMPLETED
  );

  const handleShowAddTaskModal = (): void => {
    NiceModal.show(AddContactTaskModal, { contactId: contact.id });
  };

  const handleClear = (): void => {
    setPriorityFilter(ALL);
    setCategoryFilter(ALL);
    setAssigneeFilter(ALL);
    setMeetingFilter(ALL);
  };

  const hasActiveFilter =
    priorityFilter !== ALL ||
    categoryFilter !== ALL ||
    assigneeFilter !== ALL ||
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

        {/* Filter bar */}
        <div className="flex flex-row flex-wrap items-center gap-2 px-6 pb-3">
          <FilterSelect
            value={categoryFilter}
            onChange={setCategoryFilter}
            placeholder="All categories"
            options={[
              { value: 'sales', label: 'Sales' },
              { value: 'onboarding', label: 'Onboarding' },
              { value: 'support', label: 'Support' },
              { value: 'follow-up', label: 'Follow-up' }
            ]}
          />
          <FilterSelect
            value={assigneeFilter}
            onChange={setAssigneeFilter}
            placeholder="All assignees"
            options={[
              { value: 'me', label: 'Me' },
              { value: 'team', label: 'Team' }
            ]}
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
            options={[{ value: 'none', label: '— No meeting —' }]}
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
          <ContactTaskList tasks={openTasks} />
        ) : (
          <EmptyText className="p-6">
            There is no open task for this contact.
          </EmptyText>
        )}
        <SectionHeading>Done · {completedTasks.length}</SectionHeading>
        {completedTasks.length > 0 ? (
          <ContactTaskList tasks={completedTasks} />
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
