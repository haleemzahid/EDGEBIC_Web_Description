'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { toast } from 'sonner';

import { deleteClientMessages } from '@/actions/client-portal/delete-client-messages';
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

export type DeleteClientMessagesModalProps = NiceModalHocProps & {
  ids: string[];
  /** Used when deleting a single message to personalize the title. */
  subject?: string;
  /** Invoked after the action returns successfully (e.g., to refresh state). */
  onDeleted?: () => void;
};

export const DeleteClientMessagesModal =
  NiceModal.create<DeleteClientMessagesModalProps>(
    ({ ids, subject, onDeleted }) => {
      const modal = useEnhancedModal();
      const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
      const isSingle = ids.length === 1;
      const title = isSingle ? 'Delete message?' : `Delete ${ids.length} messages?`;
      const description = isSingle ? (
        <>
          <strong>{subject || 'This message'}</strong> will be permanently
          deleted for you and the team. This cannot be undone.
        </>
      ) : (
        <>
          <strong>{ids.length}</strong> messages will be permanently deleted for
          you and the team. This cannot be undone.
        </>
      );

      const [submitting, setSubmitting] = React.useState(false);

      const handleConfirm = async (): Promise<void> => {
        if (submitting) return;
        setSubmitting(true);
        try {
          const result = await deleteClientMessages({ ids });
          if (result?.serverError || result?.validationErrors) {
            toast.error(result?.serverError ?? "Couldn't delete");
            return;
          }
          toast.success(
            isSingle
              ? 'Message deleted'
              : `${ids.length} messages deleted`
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
