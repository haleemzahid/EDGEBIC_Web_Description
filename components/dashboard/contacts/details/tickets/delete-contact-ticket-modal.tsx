'use client';

import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { deleteContactTicket } from '@/actions/contacts/delete-contact-ticket';
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
import { FormProvider } from '@/components/ui/form';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import {
  deleteContactSchema,
  type DeleteContactSchema
} from '@/schemas/contacts/delete-contact-schema';
import type { ContactTicketWithDetailsDto } from '@/types/dtos/contact-ticket-dto';

export type DeleteContactTicketModalProps = NiceModalHocProps & {
  ticket: Pick<
    ContactTicketWithDetailsDto,
    'id' | 'number' | 'title' | 'contactId'
  >;
};

export const DeleteContactTicketModal =
  NiceModal.create<DeleteContactTicketModalProps>(({ ticket }) => {
    const modal = useEnhancedModal();
    const router = useRouter();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: deleteContactSchema,
      mode: 'all',
      defaultValues: {
        id: ticket.id
      }
    });
    const title = 'Delete this ticket?';
    const canSubmit =
      !methods.formState.isSubmitting && methods.formState.isValid;
    const onSubmit: SubmitHandler<DeleteContactSchema> = async (values) => {
      if (!canSubmit) {
        return;
      }
      const result = await deleteContactTicket(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Ticket deleted');
        modal.handleClose();
        // Return to the contact's Tickets tab (not the Client details
        // page). Works whether deleted from the ticket detail page (the
        // now-deleted ticket page is left) or from the tickets list.
        router.replace(`/dashboard/contacts/${ticket.contactId}?tab=tickets`);
        router.refresh();
      } else {
        toast.error("Ticket couldn't be deleted");
      }
    };
    const renderDescription = (
      <>
        Ticket{' '}
        <strong>
          #{ticket.number} · {ticket.title}
        </strong>{' '}
        will be permanently deleted, are you sure you want to continue?
      </>
    );
    const renderForm = (
      <form
        className="hidden"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <input
          type="hidden"
          className="hidden"
          disabled={methods.formState.isSubmitting}
          {...methods.register('id')}
        />
      </form>
    );
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
          disabled={!canSubmit}
          loading={methods.formState.isSubmitting}
          onClick={methods.handleSubmit(onSubmit)}
        >
          Yes, delete
        </Button>
      </>
    );
    return (
      <FormProvider {...methods}>
        {mdUp ? (
          <AlertDialog open={modal.visible}>
            <AlertDialogContent
              className="max-w-sm"
              onClose={modal.handleClose}
              onAnimationEndCapture={modal.handleAnimationEndCapture}
            >
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                  {renderDescription}
                </AlertDialogDescription>
              </AlertDialogHeader>
              {renderForm}
              <AlertDialogFooter>{renderButtons}</AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Drawer
            open={modal.visible}
            onOpenChange={modal.handleOpenChange}
          >
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>{renderDescription}</DrawerDescription>
              </DrawerHeader>
              {renderForm}
              <DrawerFooter className="flex-col-reverse pt-4">
                {renderButtons}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </FormProvider>
    );
  });
