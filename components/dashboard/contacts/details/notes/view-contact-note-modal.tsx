'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { ContactPriority } from '@prisma/client';
import { format } from 'date-fns';
import { PinIcon } from 'lucide-react';

import { EditContactNoteModal } from '@/components/dashboard/contacts/details/notes/edit-contact-note-modal';
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
import { convertMarkdownToHtml } from '@/lib/markdown/convert-markdown-to-html';
import { cn, getInitials } from '@/lib/utils';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { ContactNoteDto } from '@/types/dtos/contact-note-dto';

export type ViewContactNoteModalProps = NiceModalHocProps & {
  note: ContactNoteDto;
  meetings?: ContactMeetingDto[];
};

const priorityLabel: Record<ContactPriority, string> = {
  [ContactPriority.HIGH]: 'Important',
  [ContactPriority.MEDIUM]: 'Normal',
  [ContactPriority.LOW]: 'Low'
};

// A labelled, read-only field row — same convention as the task/ticket
// view modals.
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

// Read-only note detail panel. Clicking a note row opens this; "Edit note"
// hands off to the existing EditContactNoteModal.
export const ViewContactNoteModal = NiceModal.create<ViewContactNoteModalProps>(
  ({ note, meetings = [] }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });

    const handleEdit = (): void => {
      modal.handleClose();
      NiceModal.show(EditContactNoteModal, { note, meetings });
    };

    const title = 'Note details';
    const description = 'A read-only view of this internal note.';

    const renderBody = (
      <div className={cn('space-y-4', !mdUp && 'p-4')}>
        {/* 1 & 2 — Priority + Linked meeting in one row */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Priority">
            <Badge
              variant="secondary"
              className={cn(
                'text-[11px]',
                note.priority === ContactPriority.HIGH
                  ? 'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
                  : 'border-transparent bg-muted text-foreground hover:bg-muted'
              )}
            >
              {priorityLabel[note.priority]}
            </Badge>
          </Field>
          <Field label="Linked meeting">
            {note.meetingTitle ? (
              <span>
                📅{' '}
                {note.meetingStartsAt
                  ? `${format(new Date(note.meetingStartsAt), 'MMM d')} · `
                  : ''}
                {note.meetingTitle}
              </span>
            ) : (
              <span className="text-muted-foreground">No meeting</span>
            )}
          </Field>
        </div>

        {/* 3 — Note */}
        <Field label="Note">
          {note.text ? (
            <div
              className="text-wrap break-words text-sm leading-relaxed text-foreground/90 [&_h1]:mb-3 [&_h1]:text-base [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:text-sm [&_h2]:font-bold [&_li]:mx-5 [&_li]:my-0 [&_ol]:mb-2 [&_p:last-child]:mb-0 [&_p]:m-0 [&_p]:mb-2 [&_ul]:mb-2"
              dangerouslySetInnerHTML={{
                __html: convertMarkdownToHtml(note.text)
              }}
            />
          ) : (
            EMPTY
          )}
        </Field>

        {/* 4 — Pin */}
        <Field label="Pinned">
          {note.pinned ? (
            <Badge
              variant="secondary"
              className="border-transparent bg-amber-200 text-[11px] text-amber-900 hover:bg-amber-200"
            >
              <PinIcon className="mr-1 size-3 shrink-0" />
              Pinned
            </Badge>
          ) : (
            <span className="text-muted-foreground">Not pinned</span>
          )}
        </Field>

        {/* Read-only meta */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Author">
            <span className="flex items-center gap-2">
              <Avatar className="size-6 shrink-0 rounded-full">
                <AvatarImage
                  src={note.sender.image}
                  alt={note.sender.name}
                />
                <AvatarFallback className="text-[10px] font-semibold">
                  {getInitials(note.sender.name) || 'NA'}
                </AvatarFallback>
              </Avatar>
              {note.sender.name}
            </span>
          </Field>
          <Field label="Created">
            {format(new Date(note.createdAt), 'MMM d, yyyy')}
            {note.edited && ' · edited'}
          </Field>
        </div>
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
          Edit note
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
