'use client';

import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { deleteContactTicket } from '@/actions/contacts/delete-contact-ticket';
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
import type { ContactTicketWithDetailsDto } from '@/types/dtos/contact-ticket-dto';

export type DeleteContactTicketModalProps = NiceModalHocProps & {
  ticket: Pick<ContactTicketWithDetailsDto, 'id' | 'number' | 'title' | 'contactId'>;
};

export const DeleteContactTicketModal =
  NiceModal.create<DeleteContactTicketModalProps>(({ ticket }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const router = useRouter();
    const title = 'Delete ticket';
    const description = `Are you sure you want to delete ticket #${ticket.number}? This action cannot be undone.`;
    const handleDelete = async (): Promise<void> => {
      const result = await deleteContactTicket({ id: ticket.id });
      if (result?.serverError) {
        toast.error("Couldn't delete ticket");
        return;
      }
      toast.success('Ticket deleted');
      modal.handleClose();
      router.replace(`/dashboard/contacts/${ticket.contactId}`);
    };
    const renderButtons = (
      <>
        <Button
          type="button"
          variant="outline"
          onClick={modal.handleClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </>
    );
    return mdUp ? (
      <Dialog open={modal.visible}>
        <DialogContent
          className="max-w-md"
          onClose={modal.handleClose}
          onAnimationEndCapture={modal.handleAnimationEndCapture}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
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
          <DrawerFooter className="flex-col-reverse pt-4">
            {renderButtons}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  });
