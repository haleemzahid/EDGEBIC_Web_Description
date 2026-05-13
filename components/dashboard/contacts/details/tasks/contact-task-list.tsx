'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import {
  ContactPriority,
  ContactTaskCategory,
  ContactTaskStatus
} from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon, MoreHorizontalIcon } from 'lucide-react';
import { toast } from 'sonner';

import { updateContactTask } from '@/actions/contacts/update-contact-task';
import {
  ALL_TASK_STATUSES,
  getContactTaskStatusMeta,
  isTaskInactive
} from '@/components/dashboard/contacts/details/tasks/contact-task-status-meta';
import { DeleteContactTaskModal } from '@/components/dashboard/contacts/details/tasks/delete-contact-task-modal';
import { EditContactTaskModal } from '@/components/dashboard/contacts/details/tasks/edit-contact-task-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { ContactTaskDto } from '@/types/dtos/contact-task-dto';
import type { MemberDto } from '@/types/dtos/member-dto';

export type ContactTaskListProps =
  React.HtmlHTMLAttributes<HTMLUListElement> & {
    tasks: ContactTaskDto[];
    meetings?: ContactMeetingDto[];
    members?: MemberDto[];
  };

const categoryLabel: Record<ContactTaskCategory, string> = {
  [ContactTaskCategory.SALES]: 'Sales',
  [ContactTaskCategory.ONBOARDING]: 'Onboarding',
  [ContactTaskCategory.SUPPORT]: 'Support',
  [ContactTaskCategory.FOLLOW_UP]: 'Follow-up'
};

export function ContactTaskList({
  tasks,
  meetings = [],
  members = [],
  className,
  ...other
}: ContactTaskListProps): React.JSX.Element {
  const handleStatusChange = async (
    taskId: string,
    status: ContactTaskStatus
  ) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      const result = await updateContactTask({ ...task, status });
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Status updated');
      } else {
        toast.error("Couldn't update status");
      }
    }
  };
  const handleShowEditTaskModal = (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      NiceModal.show(EditContactTaskModal, { task, meetings, members });
    }
  };
  const handleShowDeleteTaskModal = (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      NiceModal.show(DeleteContactTaskModal, { task });
    }
  };
  return (
    <ul
      role="list"
      className={cn('m-0 list-none divide-y p-0', className)}
      {...other}
    >
      {tasks.map((task) => (
        <ContactTaskListItem
          key={task.id}
          {...task}
          onStatusChange={(status) => handleStatusChange(task.id, status)}
          onEdit={() => handleShowEditTaskModal(task.id)}
          onDelete={() => handleShowDeleteTaskModal(task.id)}
        />
      ))}
    </ul>
  );
}

type ContactTaskListItemProps = ContactTaskDto & {
  onStatusChange: (status: ContactTaskStatus) => void;
  onEdit: () => void;
  onDelete: () => void;
};

function formatDueDateLabel(dueDate: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dueDate);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round(
    (target.getTime() - today.getTime()) / 86_400_000
  );
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  if (diffDays === -1) return 'Due yesterday';
  if (diffDays < 0) return `Due ${Math.abs(diffDays)}d ago`;
  if (diffDays < 7) return `Due in ${diffDays}d`;
  return `Due ${format(dueDate, 'yyyy-MM-dd')}`;
}

function priorityBadgeProps(priority: ContactPriority): {
  label: string;
  className: string;
} {
  switch (priority) {
    case ContactPriority.HIGH:
      return {
        label: 'High',
        className:
          'border-transparent bg-rose-100 text-rose-800 hover:bg-rose-100'
      };
    case ContactPriority.MEDIUM:
      return {
        label: 'Medium',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case ContactPriority.LOW:
      return {
        label: 'Low',
        className: 'border-transparent bg-muted text-foreground hover:bg-muted'
      };
  }
}

function ContactTaskListItem({
  status,
  priority,
  category,
  assigneeName,
  meetingId,
  meetingTitle,
  meetingStartsAt,
  title,
  dueDate,
  createdAt,
  onStatusChange,
  onEdit,
  onDelete
}: ContactTaskListItemProps): React.JSX.Element {
  const inactive = isTaskInactive(status);
  const statusMeta = getContactTaskStatusMeta(status);
  const priorityMeta = priorityBadgeProps(priority);
  const metaParts: string[] = [];
  if (category) {
    metaParts.push(categoryLabel[category]);
  }
  if (assigneeName) {
    metaParts.push(assigneeName);
  }
  if (dueDate) {
    metaParts.push(formatDueDateLabel(dueDate));
  } else if (status === ContactTaskStatus.COMPLETED) {
    metaParts.push(`Completed ${format(createdAt, 'MMM d, yyyy')}`);
  } else if (status === ContactTaskStatus.CANCELLED) {
    metaParts.push(`Cancelled ${format(createdAt, 'MMM d, yyyy')}`);
  } else {
    metaParts.push(`Created ${format(createdAt, 'MMM d, yyyy')}`);
  }
  return (
    <li
      role="listitem"
      className={cn(
        'flex flex-row items-center gap-3 px-6 py-3 transition-colors hover:bg-accent/40',
        inactive && 'opacity-75'
      )}
    >
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            'truncate text-sm font-medium',
            inactive && 'line-through'
          )}
        >
          {title}
        </div>
        <div className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
          <span className="truncate">{metaParts.join(' · ')}</span>
          {meetingId && meetingTitle && (
            <>
              <span>·</span>
              <span className="flex items-center gap-0.5 truncate text-foreground/80">
                <CalendarIcon className="size-3 shrink-0" />
                {meetingStartsAt
                  ? `${format(meetingStartsAt, 'MMM d')} · `
                  : ''}
                {meetingTitle}
              </span>
            </>
          )}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            title="Change status"
            className={cn(
              'shrink-0 cursor-pointer rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors',
              statusMeta.className
            )}
          >
            {statusMeta.label}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {ALL_TASK_STATUSES.map((s) => {
            const meta = getContactTaskStatusMeta(s);
            return (
              <DropdownMenuCheckboxItem
                key={s}
                checked={status === s}
                onCheckedChange={(checked) => {
                  if (checked && status !== s) {
                    onStatusChange(s);
                  }
                }}
              >
                {meta.label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Badge
        variant="secondary"
        className={cn('shrink-0 text-[11px]', priorityMeta.className)}
      >
        {priorityMeta.label}
      </Badge>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            title="Open menu"
          >
            <MoreHorizontalIcon className="size-4 shrink-0" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="!text-destructive"
            onClick={onDelete}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
