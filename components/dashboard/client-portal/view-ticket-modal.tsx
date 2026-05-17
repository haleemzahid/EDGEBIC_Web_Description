'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { format } from 'date-fns';

import {
  ContactTicketPriorityBadge,
  ContactTicketStatusBadge
} from '@/components/dashboard/contacts/details/tickets/contact-ticket-status-pills';
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
import { cn } from '@/lib/utils';
import type { ClientTicketListItemDto } from '@/data/client-portal/get-client-tickets';

export type ViewClientTicketModalProps = NiceModalHocProps & {
  ticket: ClientTicketListItemDto;
};

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

export const ViewClientTicketModal =
  NiceModal.create<ViewClientTicketModalProps>(({ ticket }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });

    const title = `Ticket #${ticket.number}`;
    const subtitle = 'A read-only summary of this ticket.';

    const renderBody = (
      <div className={cn('space-y-4', !mdUp && 'p-4')}>
        <Field label="Subject">
          <span className="font-medium">{ticket.title}</span>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Status">
            <ContactTicketStatusBadge status={ticket.status} />
          </Field>
          <Field label="Priority">
            <ContactTicketPriorityBadge priority={ticket.priority} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Created">
            {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
          </Field>
          <Field label="Last updated">
            {format(new Date(ticket.updatedAt), 'MMM d, yyyy')}
          </Field>
        </div>

        <Field label="Description">
          {ticket.description ? (
            <p className="whitespace-pre-wrap leading-relaxed">
              {ticket.description}
            </p>
          ) : (
            EMPTY
          )}
        </Field>
      </div>
    );

    const renderButtons = (
      <Button
        type="button"
        variant="outline"
        onClick={modal.handleClose}
      >
        Close
      </Button>
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
            <DialogDescription>{subtitle}</DialogDescription>
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
            <DrawerDescription>{subtitle}</DrawerDescription>
          </DrawerHeader>
          {renderBody}
          <DrawerFooter className="flex-col-reverse pt-4">
            {renderButtons}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  });
