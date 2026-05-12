'use client';

import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { ContactPriority } from '@prisma/client';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { updateContactNote } from '@/actions/contacts/update-contact-note';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TextEditor } from '@/components/ui/text-editor';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import { convertHtmlToMarkdown } from '@/lib/markdown/convert-html-to-markdown';
import { convertMarkdownToHtml } from '@/lib/markdown/convert-markdown-to-html';
import { cn } from '@/lib/utils';
import {
  updateContactNoteSchema,
  type UpdateContactNoteSchema
} from '@/schemas/contacts/update-contact-note-schema';
import type { ContactNoteDto } from '@/types/dtos/contact-note-dto';

export type EditContactNoteModalProps = NiceModalHocProps & {
  note: ContactNoteDto;
};

export const EditContactNoteModal = NiceModal.create<EditContactNoteModalProps>(
  ({ note }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: updateContactNoteSchema,
      mode: 'onSubmit',
      defaultValues: {
        id: note.id,
        text: note.text,
        priority: note.priority
      }
    });
    const title = 'Edit note';
    const description = 'Edit the note by changing the form fields below.';
    const canSubmit =
      !methods.formState.isSubmitting &&
      (!methods.formState.isSubmitted || methods.formState.isDirty);
    const onSubmit: SubmitHandler<UpdateContactNoteSchema> = async (values) => {
      if (!canSubmit) {
        return;
      }
      const result = await updateContactNote(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Note updated');
        modal.handleClose();
      } else {
        toast.error("Couldn't update note");
      }
    };
    const renderForm = (
      <form
        className={cn('space-y-4', !mdUp && 'p-4')}
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
              <FormLabel>Note</FormLabel>
              <FormControl>
                <TextEditor
                  getText={() => convertMarkdownToHtml(field.value || '')}
                  setText={(value: string) =>
                    field.onChange(convertHtmlToMarkdown(value))
                  }
                  height="240px"
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Tip: type @ to mention a teammate.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={methods.formState.isSubmitting}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ContactPriority.LOW}>Low</SelectItem>
                    <SelectItem value={ContactPriority.MEDIUM}>
                      Normal
                    </SelectItem>
                    <SelectItem value={ContactPriority.HIGH}>
                      Important
                    </SelectItem>
                  </SelectContent>
                </Select>
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
              className="max-w-xl"
              onClose={modal.handleClose}
              onAnimationEndCapture={modal.handleAnimationEndCapture}
            >
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription className="sr-only">
                  {description}
                </DialogDescription>
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
                <DrawerDescription className="sr-only">
                  {description}
                </DrawerDescription>
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
  }
);
