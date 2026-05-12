'use client';

import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { updateContactComment } from '@/actions/contacts/update-contact-comment';
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
  FormMessage,
  FormProvider
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import {
  updateContactCommentSchema,
  type UpdateContactCommentSchema
} from '@/schemas/contacts/update-contact-comment-schema';
import type { CommentTimelineEventDto } from '@/types/dtos/timeline-event-dto';

export type UpdateContactCommentModalProps = NiceModalHocProps & {
  comment: CommentTimelineEventDto;
};

export const UpdateContactCommentModal =
  NiceModal.create<UpdateContactCommentModalProps>(({ comment }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: updateContactCommentSchema,
      mode: 'all',
      defaultValues: {
        id: comment.id,
        text: comment.text
      }
    });
    const title = 'Edit comment';
    const description = 'Update the text of this comment.';
    const canSubmit =
      !methods.formState.isSubmitting && methods.formState.isValid;
    const onSubmit: SubmitHandler<UpdateContactCommentSchema> = async (
      values
    ) => {
      if (!canSubmit) {
        return;
      }
      const result = await updateContactComment(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Comment updated');
        modal.handleClose();
      } else {
        toast.error("Comment couldn't be updated");
      }
    };
    const renderForm = (
      <form
        className="flex flex-col gap-2"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <input
          type="hidden"
          className="hidden"
          disabled={methods.formState.isSubmitting}
          {...methods.register('id')}
        />
        <FormField
          control={methods.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="Edit comment..."
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
          loading={methods.formState.isSubmitting}
          onClick={methods.handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </>
    );
    return (
      <FormProvider {...methods}>
        {mdUp ? (
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
              <div className="px-4">{renderForm}</div>
              <DrawerFooter className="flex-col-reverse pt-4">
                {renderButtons}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </FormProvider>
    );
  });
