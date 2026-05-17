'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ContactTicketStatus } from '@prisma/client';
import { toast } from 'sonner';

import { closeClientTicket } from '@/actions/client-portal/close-client-ticket';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export type CloseTicketButtonProps = {
  ticketId: string;
  status: ContactTicketStatus;
  /** Only tickets the client opened themselves can be closed by the client. */
  canManage: boolean;
};

export function CloseTicketButton({
  ticketId,
  status,
  canManage
}: CloseTicketButtonProps): React.JSX.Element | null {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [closing, setClosing] = React.useState(false);

  // Team-opened tickets are view + reply only — no client-side status changes.
  if (!canManage) {
    return null;
  }

  // Already-closed tickets shouldn't show the close action; resolved tickets
  // are confirmed via the inline "Confirm resolved" path inside the
  // conversation, so we skip this control there too.
  if (
    status === ContactTicketStatus.CLOSED ||
    status === ContactTicketStatus.RESOLVED
  ) {
    return null;
  }

  const handleConfirm = async (): Promise<void> => {
    setClosing(true);
    const result = await closeClientTicket({ ticketId });
    setClosing(false);
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Ticket closed. Your team has been notified.');
      setOpen(false);
      router.refresh();
    } else {
      toast.error(result?.serverError ?? "Couldn't close the ticket.");
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-7 text-xs"
        onClick={() => setOpen(true)}
      >
        Close ticket
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Close this ticket?</AlertDialogTitle>
            <AlertDialogDescription>
              The ticket will be marked closed and your team will be notified.
              You can reopen it later if you need more help.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={closing}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              loading={closing}
              disabled={closing}
              onClick={handleConfirm}
            >
              Yes, close ticket
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
