'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { ContactPriority } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { PencilIcon, TrashIcon } from 'lucide-react';

import { DeleteContactNoteModal } from '@/components/dashboard/contacts/details/notes/delete-contact-note-modal';
import { EditContactNoteModal } from '@/components/dashboard/contacts/details/notes/edit-contact-note-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, type CardProps } from '@/components/ui/card';
import { EmptyText } from '@/components/ui/empty-text';
import { convertMarkdownToHtml } from '@/lib/markdown/convert-markdown-to-html';
import { cn, getInitials } from '@/lib/utils';
import type { ContactNoteDto } from '@/types/dtos/contact-note-dto';

type ContactNoteCardProps = CardProps & {
  note: ContactNoteDto;
};

export function ContactNoteCard({
  note,
  className,
  ...others
}: ContactNoteCardProps): React.JSX.Element {
  const handleShowEditContactNoteModal = (): void => {
    NiceModal.show(EditContactNoteModal, { note });
  };
  const handleShowDeleteContactNoteModal = (): void => {
    NiceModal.show(DeleteContactNoteModal, { note });
  };
  return (
    <Card
      className={cn('p-4', className)}
      {...others}
    >
      <div className="mb-3 flex flex-row items-start justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-7 shrink-0 rounded-full">
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
        <div className="flex items-center gap-2">
          {note.priority === ContactPriority.HIGH && (
            <Badge
              variant="secondary"
              className="border-transparent bg-amber-100 text-[11px] text-amber-800 hover:bg-amber-100"
            >
              Important
            </Badge>
          )}
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-7"
              title="Edit note"
              onClick={handleShowEditContactNoteModal}
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
              onClick={handleShowDeleteContactNoteModal}
            >
              <TrashIcon className="size-3.5 shrink-0" />
              <span className="sr-only">Delete note</span>
            </Button>
          </div>
        </div>
      </div>
      {note.text ? (
        <div className="text-wrap break-words text-sm leading-relaxed text-foreground/90 [&_h1]:mb-3 [&_h1]:text-base [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:text-sm [&_h2]:font-bold [&_li]:mx-5 [&_li]:my-0 [&_ol]:mb-2 [&_p:last-child]:mb-0 [&_p]:m-0 [&_p]:mb-2 [&_ul]:mb-2">
          <div
            dangerouslySetInnerHTML={{
              __html: convertMarkdownToHtml(note.text)
            }}
          />
        </div>
      ) : (
        <EmptyText className="text-sm opacity-65">Empty</EmptyText>
      )}
    </Card>
  );
}
