'use client';

import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { deleteContactMeeting } from '@/actions/contacts/delete-contact-meeting';
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
  deleteContactMeetingSchema,
  type DeleteContactMeetingSchema
} from '@/schemas/contacts/delete-contact-meeting-schema';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';

export type DeleteContactMeetingModalProps = NiceModalHocProps & {
  meeting: ContactMeetingDto;
};

export const DeleteContactMeetingModal =
  NiceModal.create<DeleteContactMeetingModalProps>(({ meeting }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: deleteContactMeetingSchema,
      mode: 'all',
      defaultValues: {
        id: meeting.id
      }
    });
    const title = 'Delete this meeting?';
    const canSubmit =
      !methods.formState.isSubmitting && methods.formState.isValid;
    const onSubmit: SubmitHandler<DeleteContactMeetingSchema> = async (
      values
    ) => {
      if (!canSubmit) {
        return;
      }
      const result = await deleteContactMeeting(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Meeting deleted');
        modal.handleClose();
      } else {
        toast.error("Meeting couldn't be deleted");
      }
    };
    const renderDescription = (
      <>
        The meeting <strong>{meeting.title}</strong> will be permanently
        deleted. Linked notes will lose their meeting reference.
      </>
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
              <DrawerFooter className="flex-col-reverse pt-4">
                {renderButtons}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </FormProvider>
    );
  });
