'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { TicketIcon } from 'lucide-react';

import { AddContactTicketModal } from '@/components/dashboard/contacts/details/tickets/add-contact-ticket-modal';
import { ContactTicketsDataTable } from '@/components/dashboard/contacts/details/tickets/contact-tickets-data-table';
import { Button } from '@/components/ui/button';
import { TransitionProvider } from '@/hooks/use-transition-context';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { ContactTicketDto } from '@/types/dtos/contact-ticket-dto';
import type { MemberDto } from '@/types/dtos/member-dto';

export type ContactTicketsProps = {
  contact: ContactDto;
  tickets: ContactTicketDto[];
  members: MemberDto[];
  meetings: ContactMeetingDto[];
};

export function ContactTickets({
  contact,
  tickets,
  members,
  meetings
}: ContactTicketsProps): React.JSX.Element {
  const handleNewTicket = (): void => {
    NiceModal.show(AddContactTicketModal, {
      contactId: contact.id,
      members,
      meetings
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-row items-center justify-between gap-2 border-b px-6 pb-2 pt-4">
        <div>
          <h1 className="text-base font-semibold">Tickets</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Support tickets linked to this contact.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={handleNewTicket}
        >
          <TicketIcon className="mr-1 size-3.5 shrink-0" />
          New ticket
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {tickets.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <TicketIcon className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">No tickets</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Support tickets linked to this contact will appear here.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={handleNewTicket}
            >
              + New ticket
            </Button>
          </div>
        ) : (
          <TransitionProvider>
            <ContactTicketsDataTable
              contactId={contact.id}
              data={tickets}
              members={members}
              meetings={meetings}
            />
          </TransitionProvider>
        )}
      </div>
    </div>
  );
}
