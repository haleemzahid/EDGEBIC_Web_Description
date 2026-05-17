'use client';

import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { deleteContactSoftware } from '@/actions/contacts/delete-contact-software';
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
  deleteContactSoftwareSchema,
  type DeleteContactSoftwareSchema
} from '@/schemas/contacts/delete-contact-software-schema';
import type { ContactSoftwareDto } from '@/types/dtos/contact-software-dto';

export type DeleteContactSoftwareModalProps = NiceModalHocProps & {
  software: ContactSoftwareDto;
};

export const DeleteContactSoftwareModal =
  NiceModal.create<DeleteContactSoftwareModalProps>(({ software }) => {
    const modal = useEnhancedModal();
    const router = useRouter();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: deleteContactSoftwareSchema,
      mode: 'all',
      defaultValues: { id: software.id }
    });
    const canSubmit =
      !methods.formState.isSubmitting && methods.formState.isValid;
    const onSubmit: SubmitHandler<DeleteContactSoftwareSchema> = async (
      values
    ) => {
      if (!canSubmit) return;
      const result = await deleteContactSoftware(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Software removed');
        modal.handleClose();
        router.refresh();
      } else {
        const reason =
          result?.serverError ||
          (result?.validationErrors
            ? JSON.stringify(result.validationErrors)
            : 'Unknown error');
        toast.error(`Couldn't remove software: ${reason}`);
      }
    };
    const title = 'Remove software?';
    const renderForm = (
      <form
        className="hidden"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <input
          type="hidden"
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
          Yes, remove
        </Button>
      </>
    );
    if (mdUp) {
      return (
        <FormProvider {...methods}>
          <AlertDialog open={modal.visible}>
            <AlertDialogContent
              className="max-w-sm"
              onClose={modal.handleClose}
              onAnimationEndCapture={modal.handleAnimationEndCapture}
            >
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                  <strong>{software.name}</strong> will be permanently removed
                  from this contact. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              {renderForm}
              <AlertDialogFooter>{renderButtons}</AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </FormProvider>
      );
    }
    return (
      <FormProvider {...methods}>
        <Drawer
          open={modal.visible}
          onOpenChange={modal.handleOpenChange}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>
                <strong>{software.name}</strong> will be permanently removed.
              </DrawerDescription>
            </DrawerHeader>
            {renderForm}
            <DrawerFooter>{renderButtons}</DrawerFooter>
          </DrawerContent>
        </Drawer>
      </FormProvider>
    );
  });
