'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { ContactPriority, ContactTaskCategory } from '@prisma/client';
import { format } from 'date-fns';

import { getContactTaskStatusMeta } from '@/components/dashboard/contacts/details/tasks/contact-task-status-meta';
import { EditContactTaskModal } from '@/components/dashboard/contacts/details/tasks/edit-contact-task-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn, getInitials } from '@/lib/utils';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { ContactTaskDto } from '@/types/dtos/contact-task-dto';
import type { MemberDto } from '@/types/dtos/member-dto';

export type ViewContactTaskModalProps = NiceModalHocProps & {
  task: ContactTaskDto;
  meetings?: ContactMeetingDto[];
  members?: MemberDto[];
  hideMeetingField?: boolean;
};

const categoryLabel: Record<ContactTaskCategory, string> = {
  [ContactTaskCategory.SALES]: 'Sales',
  [ContactTaskCategory.ONBOARDING]: 'Onboarding',
  [ContactTaskCategory.SUPPORT]: 'Support',
  [ContactTaskCategory.FOLLOW_UP]: 'Follow-up'
};

function priorityBadge(priority: ContactPriority): {
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

// A labelled, read-only field row. Mirrors the "read-only sections, not
// editable inputs" convention used elsewhere in the contact detail pages.
function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="flex flex-col space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

const EMPTY = <span className="text-muted-foreground">—</span>;

// Read-only task detail panel. Clicking a task row opens this (instead of
// jumping straight into the edit form); "Edit task" hands off to the
// existing EditContactTaskModal.
export const ViewContactTaskModal = NiceModal.create<ViewContactTaskModalProps>(
  ({ task, meetings = [], members = [], hideMeetingField }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });

    const statusMeta = getContactTaskStatusMeta(task.status);
    const priority = priorityBadge(task.priority);

    const handleEdit = (): void => {
      modal.handleClose();
      NiceModal.show(EditContactTaskModal, {
        task,
        meetings,
        members,
        hideMeetingField
      });
    };

    const title = 'Task details';
    const description = 'A read-only summary of this task.';

    const renderBody = (
      <div className={cn('space-y-4', !mdUp && 'p-4')}>
        <Field label="Task">
          <span className="font-medium">{task.title}</span>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Status">
            <Badge
              variant="secondary"
              className={cn('text-[11px]', statusMeta.className)}
            >
              {statusMeta.label}
            </Badge>
          </Field>
          <Field label="Priority">
            <Badge
              variant="secondary"
              className={cn('text-[11px]', priority.className)}
            >
              {priority.label}
            </Badge>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            {task.category ? categoryLabel[task.category] : EMPTY}
          </Field>
          <Field label="Assignee">
            {task.assigneeName ? (
              <span className="flex items-center gap-2">
                <Avatar className="size-6 shrink-0 rounded-full">
                  <AvatarImage
                    src={task.assigneeImage}
                    alt={task.assigneeName}
                  />
                  <AvatarFallback className="text-[10px] font-semibold">
                    {getInitials(task.assigneeName) || 'NA'}
                  </AvatarFallback>
                </Avatar>
                {task.assigneeName}
              </span>
            ) : (
              <span className="text-muted-foreground">Unassigned</span>
            )}
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Due date">
            {task.dueDate
              ? format(new Date(task.dueDate), 'MMM d, yyyy')
              : EMPTY}
          </Field>
          <Field label="Created">
            {format(new Date(task.createdAt), 'MMM d, yyyy')}
          </Field>
        </div>

        {!hideMeetingField && (
          <Field label="Linked meeting">
            {task.meetingTitle ? (
              <span>
                📅{' '}
                {task.meetingStartsAt
                  ? `${format(new Date(task.meetingStartsAt), 'MMM d')} · `
                  : ''}
                {task.meetingTitle}
              </span>
            ) : (
              <span className="text-muted-foreground">No meeting</span>
            )}
          </Field>
        )}

        <Field label="Description">
          {task.description ? (
            <p className="whitespace-pre-wrap leading-relaxed">
              {task.description}
            </p>
          ) : (
            EMPTY
          )}
        </Field>
      </div>
    );

    const renderButtons = (
      <>
        <Button
          type="button"
          variant="outline"
          onClick={modal.handleClose}
        >
          Close
        </Button>
        <Button
          type="button"
          variant="default"
          onClick={handleEdit}
        >
          Edit task
        </Button>
      </>
    );

    return mdUp ? (
      <Dialog open={modal.visible}>
        <DialogContent
          className="max-w-lg"
          onClose={modal.handleClose}
          onAnimationEndCapture={modal.handleAnimationEndCapture}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {renderBody}
          <DialogFooter>{renderButtons}</DialogFooter>
        </DialogContent>
      </Dialog>
    ) : (
      <Drawer
        open={modal.visible}
        onOpenChange={modal.handleOpenChange}
      >
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {renderBody}
          <DrawerFooter className="flex-col-reverse pt-4">
            {renderButtons}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
);
