'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { updateClientTicket } from '@/actions/client-portal/update-client-ticket';
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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn } from '@/lib/utils';
import {
  updateClientTicketSchema,
  type UpdateClientTicketSchema
} from '@/schemas/client-portal/update-client-ticket-schema';

export type EditClientTicketModalProps = NiceModalHocProps & {
  ticketId: string;
  title: string;
  description: string | null;
};

export const EditClientTicketModal =
  NiceModal.create<EditClientTicketModalProps>((props) => {
    const modal = useEnhancedModal();
    const router = useRouter();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: updateClientTicketSchema,
      mode: 'onSubmit',
      defaultValues: {
        ticketId: props.ticketId,
        title: props.title,
        description: props.description ?? ''
      }
    });
    // NiceModal.hide() doesn't unmount; re-seed from props on every reopen.
    React.useEffect(() => {
      if (modal.visible) {
        methods.reset({
          ticketId: props.ticketId,
          title: props.title,
          description: props.description ?? ''
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal.visible]);
    const heading = 'Edit ticket';
    const subheading = 'Update the subject or description of your ticket.';
    const canSubmit =
      !methods.formState.isSubmitting &&
      (!methods.formState.isSubmitted || methods.formState.isDirty);

    const onSubmit: SubmitHandler<UpdateClientTicketSchema> = async (
      values
    ) => {
      if (!canSubmit) return;
      const result = await updateClientTicket(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Ticket updated');
        modal.handleClose();
        router.refresh();
      } else {
        toast.error(result?.serverError ?? "Couldn't update ticket");
      }
    };

    const renderForm = (
      <form
        className={cn('space-y-4', !mdUp && 'p-4')}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FormField
          control={methods.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col space-y-1.5">
              <FormLabel required>Subject</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  maxLength={255}
                  required
                  placeholder="e.g. Can't access my dashboard"
                  disabled={methods.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col space-y-1.5">
              <FormLabel>Describe the issue</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  maxLength={8000}
                  rows={6}
                  placeholder="Steps you took, what you expected, and what happened instead."
                  disabled={methods.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
          variant="default"
          disabled={!canSubmit}
          onClick={methods.handleSubmit(onSubmit)}
        >
          Save changes
        </Button>
      </>
    );

    return (
      <FormProvider {...methods}>
        {mdUp ? (
          <Dialog open={modal.visible}>
            <DialogContent
              className="max-h-[95vh] w-[95vw] max-w-lg overflow-y-auto"
              onClose={modal.handleClose}
              onAnimationEndCapture={modal.handleAnimationEndCapture}
            >
              <DialogHeader>
                <DialogTitle>{heading}</DialogTitle>
                <DialogDescription>{subheading}</DialogDescription>
              </DialogHeader>
              {renderForm}
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
                <DrawerTitle>{heading}</DrawerTitle>
                <DrawerDescription>{subheading}</DrawerDescription>
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
