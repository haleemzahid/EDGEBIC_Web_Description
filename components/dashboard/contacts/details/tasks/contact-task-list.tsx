'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { ContactPriority, ContactTaskStatus } from '@prisma/client';
import { format } from 'date-fns';
import { MoreHorizontalIcon } from 'lucide-react';
import { toast } from 'sonner';

import { updateContactTask } from '@/actions/contacts/update-contact-task';
import { DeleteContactTaskModal } from '@/components/dashboard/contacts/details/tasks/delete-contact-task-modal';
import { EditContactTaskModal } from '@/components/dashboard/contacts/details/tasks/edit-contact-task-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { ContactTaskDto } from '@/types/dtos/contact-task-dto';

export type ContactTaskListProps =
  React.HtmlHTMLAttributes<HTMLUListElement> & {
    tasks: ContactTaskDto[];
  };

export function ContactTaskList({
  tasks,
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
      NiceModal.show(EditContactTaskModal, { task });
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
  id,
  status,
  priority,
  title,
  description,
  dueDate,
  createdAt,
  onStatusChange,
  onEdit,
  onDelete
}: ContactTaskListItemProps): React.JSX.Element {
  const isDone = status === ContactTaskStatus.COMPLETED;
  const metaParts: string[] = [];
  if (dueDate) {
    metaParts.push(formatDueDateLabel(dueDate));
  } else if (isDone) {
    metaParts.push(`Completed ${format(createdAt, 'MMM d, yyyy')}`);
  } else {
    metaParts.push(`Created ${format(createdAt, 'MMM d, yyyy')}`);
  }
  if (description) {
    metaParts.push(description);
  }
  const pill = isDone
    ? {
        label: 'Done',
        className:
          'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
      }
    : priorityBadgeProps(priority);
  return (
    <li
      role="listitem"
      className={cn(
        'flex flex-row items-center gap-3 px-6 py-3 transition-colors hover:bg-accent/40',
        isDone && 'opacity-75'
      )}
    >
      <Checkbox
        id={id}
        checked={isDone}
        onCheckedChange={(value) =>
          onStatusChange(
            value ? ContactTaskStatus.COMPLETED : ContactTaskStatus.OPEN
          )
        }
      />
      <div className="min-w-0 flex-1">
        <Label
          htmlFor={id}
          className={cn(
            'block cursor-pointer truncate text-sm font-medium',
            isDone && 'line-through'
          )}
        >
          {title}
        </Label>
        <div className="mt-0.5 truncate text-xs text-muted-foreground">
          {metaParts.join(' · ')}
        </div>
      </div>
      <Badge
        variant="secondary"
        className={cn('shrink-0 text-[11px]', pill.className)}
      >
        {pill.label}
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
