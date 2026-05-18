'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { toast } from 'sonner';

import { deleteClientTicket } from '@/actions/client-portal/delete-client-ticket';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
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

export type DeleteClientTicketModalProps = NiceModalHocProps & {
  ticketId: string;
  title: string;
  /** Invoked after the action returns successfully (e.g., to navigate away). */
  onDeleted?: () => void;
};

export const DeleteClientTicketModal =
  NiceModal.create<DeleteClientTicketModalProps>(
    ({ ticketId, title, onDeleted }) => {
      const modal = useEnhancedModal();
      const router = useRouter();
      const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });

      const [submitting, setSubmitting] = React.useState(false);

      const handleConfirm = async (): Promise<void> => {
        if (submitting) return;
        setSubmitting(true);
        try {
          const result = await deleteClientTicket({ ticketId });
          if (result?.serverError || result?.validationErrors) {
            toast.error(result?.serverError ?? "Couldn't delete");
            return;
          }
          toast.success('Ticket deleted');
          if (onDeleted) {
            onDeleted();
          } else {
            router.refresh();
          }
          modal.handleClose();
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Couldn't delete"
          );
        } finally {
          setSubmitting(false);
        }
      };

      const description = (
        <>
          <strong>{title || 'This ticket'}</strong> and all of its messages
          will be permanently deleted. This cannot be undone.
        </>
      );

      const renderButtons = (
        <>
          <Button
            type="button"
            variant="outline"
            onClick={modal.handleClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={submitting}
            loading={submitting}
            onClick={handleConfirm}
          >
            Yes, delete
          </Button>
        </>
      );

      if (mdUp) {
        return (
          <AlertDialog
            open={modal.visible}
            onOpenChange={modal.handleOpenChange}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete ticket?</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>{renderButtons}</AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      }
      return (
        <Drawer
          open={modal.visible}
          onOpenChange={modal.handleOpenChange}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Delete ticket?</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>{renderButtons}</DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    }
  );
