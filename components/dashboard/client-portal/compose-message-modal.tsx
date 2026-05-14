'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { composeClientMessage } from '@/actions/client-portal/compose-client-message';
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
import { Routes } from '@/constants/routes';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn } from '@/lib/utils';
import {
  composeClientMessageSchema,
  type ComposeClientMessageSchema
} from '@/schemas/client-portal/compose-client-message-schema';

export const ComposeMessageModal = NiceModal.create<NiceModalHocProps>(() => {
  const modal = useEnhancedModal();
  const router = useRouter();
  const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
  const methods = useZodForm({
    schema: composeClientMessageSchema,
    mode: 'onSubmit',
    defaultValues: { subject: '', body: '' }
  });
  // NiceModal.hide() doesn't unmount; reset RHF state on every reopen so
  // stale values from a prior submit don't persist.
  React.useEffect(() => {
    if (modal.visible) {
      methods.reset();
    }
  }, [modal.visible, methods]);
  const title = 'New message';
  const description = 'Start a new conversation with your project team.';
  const canSubmit =
    !methods.formState.isSubmitting &&
    (!methods.formState.isSubmitted || methods.formState.isDirty);

  const onSubmit: SubmitHandler<ComposeClientMessageSchema> = async (
    values
  ) => {
    if (!canSubmit) return;
    const result = await composeClientMessage(values);
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Message sent');
      methods.reset();
      modal.handleClose();
      const threadId = result?.data?.threadId;
      if (threadId) {
        router.push(`${Routes.ClientMessages}/${threadId}`);
      } else {
        router.refresh();
      }
    } else {
      toast.error(result?.serverError ?? "Couldn't send message");
    }
  };

  const renderForm = (
    <form
      className={cn('space-y-4', !mdUp && 'p-4')}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <FormField
        control={methods.control}
        name="subject"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col space-y-1.5">
            <FormLabel required>Subject</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                maxLength={500}
                required
                placeholder="e.g. Question about my project timeline"
                disabled={methods.formState.isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="body"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col space-y-1.5">
            <FormLabel required>Message</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={8}
                maxLength={20000}
                required
                placeholder="Write your message…"
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
        Send message
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
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
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
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
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
