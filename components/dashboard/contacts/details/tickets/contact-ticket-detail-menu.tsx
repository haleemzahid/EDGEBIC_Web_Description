'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import { ContactTicketStatus } from '@prisma/client';
import { MoreHorizontalIcon } from 'lucide-react';
import { toast } from 'sonner';

import { updateContactTicket } from '@/actions/contacts/update-contact-ticket';
import { DeleteContactTicketModal } from '@/components/dashboard/contacts/details/tickets/delete-contact-ticket-modal';
import { EditContactTicketModal } from '@/components/dashboard/contacts/details/tickets/edit-contact-ticket-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { ContactTicketWithDetailsDto } from '@/types/dtos/contact-ticket-dto';
import type { MemberDto } from '@/types/dtos/member-dto';

export type ContactTicketDetailMenuProps = {
  ticket: ContactTicketWithDetailsDto;
  members?: MemberDto[];
  meetings?: ContactMeetingDto[];
};

export function ContactTicketDetailMenu({
  ticket,
  members = [],
  meetings = []
}: ContactTicketDetailMenuProps): React.JSX.Element {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  const handleEdit = (): void => {
    NiceModal.show(EditContactTicketModal, { ticket, members, meetings });
  };

  const setStatus = (nextStatus: ContactTicketStatus): void => {
    startTransition(async () => {
      const result = await updateContactTicket({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description ?? '',
        status: nextStatus,
        priority: ticket.priority,
        assigneeUserId: ticket.assigneeUserId ?? null
      });
      if (result?.serverError) {
        toast.error("Couldn't update ticket");
        return;
      }
      toast.success(`Ticket marked ${nextStatus.toLowerCase()}`);
      router.refresh();
    });
  };

  const handleDelete = (): void => {
    NiceModal.show(DeleteContactTicketModal, { ticket });
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
          disabled={pending}
        >
          <MoreHorizontalIcon className="size-4 shrink-0" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        {ticket.status !== ContactTicketStatus.OPEN && (
          <DropdownMenuItem onClick={() => setStatus(ContactTicketStatus.OPEN)}>
            Reopen
          </DropdownMenuItem>
        )}
        {ticket.status !== ContactTicketStatus.PENDING && (
          <DropdownMenuItem
            onClick={() => setStatus(ContactTicketStatus.PENDING)}
          >
            Mark in progress
          </DropdownMenuItem>
        )}
        {ticket.status !== ContactTicketStatus.RESOLVED && (
          <DropdownMenuItem
            onClick={() => setStatus(ContactTicketStatus.RESOLVED)}
          >
            Mark resolved
          </DropdownMenuItem>
        )}
        {ticket.status !== ContactTicketStatus.CLOSED && (
          <DropdownMenuItem
            onClick={() => setStatus(ContactTicketStatus.CLOSED)}
          >
            Close ticket
          </DropdownMenuItem>
        )}
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
