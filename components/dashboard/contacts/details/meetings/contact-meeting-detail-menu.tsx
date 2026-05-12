'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { MoreHorizontalIcon } from 'lucide-react';

import { DeleteContactMeetingModal } from '@/components/dashboard/contacts/details/meetings/delete-contact-meeting-modal';
import { EditContactMeetingModal } from '@/components/dashboard/contacts/details/meetings/edit-contact-meeting-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';

export type ContactMeetingDetailMenuProps = {
  meeting: ContactMeetingDto;
};

export function ContactMeetingDetailMenu({
  meeting
}: ContactMeetingDetailMenuProps): React.JSX.Element {
  const handleEdit = (): void => {
    NiceModal.show(EditContactMeetingModal, { meeting });
  };
  const handleDelete = (): void => {
    NiceModal.show(DeleteContactMeetingModal, { meeting });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8"
          title="Open menu"
        >
          <MoreHorizontalIcon className="size-4 shrink-0" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="!text-destructive"
          onClick={handleDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
