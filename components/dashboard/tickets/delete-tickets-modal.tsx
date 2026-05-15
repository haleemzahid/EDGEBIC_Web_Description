'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { toast } from 'sonner';

import { deleteTickets } from '@/actions/tickets/delete-tickets';
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

export type DeleteTicketsModalProps = NiceModalHocProps & {
  ids: string[];
  /** Invoked after the action returns successfully (e.g., to clear selection). */
  onDeleted?: () => void;
};

export const DeleteTicketsModal = NiceModal.create<DeleteTicketsModalProps>(
  ({ ids, onDeleted }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const isSingle = ids.length === 1;
    const title = isSingle ? 'Delete ticket?' : `Delete ${ids.length} tickets?`;
    const description = isSingle ? (
      <>This ticket and all its messages will be permanently deleted. This cannot be undone.</>
    ) : (
      <>
        <strong>{ids.length}</strong> tickets and all their messages will be
        permanently deleted. This cannot be undone.
      </>
    );

    const [submitting, setSubmitting] = React.useState(false);

    const handleConfirm = async (): Promise<void> => {
      if (submitting) return;
      setSubmitting(true);
      try {
        const result = await deleteTickets({ ids });
        if (result?.serverError || result?.validationErrors) {
          toast.error(result?.serverError ?? "Couldn't delete");
          return;
        }
        toast.success(
          isSingle ? 'Ticket deleted' : `${ids.length} tickets deleted`
        );
        onDeleted?.();
        modal.handleClose();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Couldn't delete"
        );
      } finally {
        setSubmitting(false);
      }
    };

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
          {isSingle ? 'Yes, delete' : `Delete ${ids.length}`}
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
              <AlertDialogTitle>{title}</AlertDialogTitle>
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
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>{renderButtons}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
);
