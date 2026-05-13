'use client';

import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { ContactPriority } from '@prisma/client';
import { format } from 'date-fns';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { addContactNote } from '@/actions/contacts/add-contact-note';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
  addContactNoteSchema,
  type AddContactNoteSchema
} from '@/schemas/contacts/add-contact-note-schema';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';

export type AddContactNoteModalProps = NiceModalHocProps & {
  contactId: string;
  meetings?: ContactMeetingDto[];
  defaultMeetingId?: string;
  hideMeetingField?: boolean;
};

const NO_MEETING = '__none__';

export const AddContactNoteModal = NiceModal.create<AddContactNoteModalProps>(
  ({ contactId, meetings = [], defaultMeetingId, hideMeetingField }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: addContactNoteSchema,
      mode: 'onSubmit',
      defaultValues: {
        contactId,
        text: '',
        priority: ContactPriority.MEDIUM,
        pinned: false,
        meetingId: defaultMeetingId ?? null
      }
    });
    const title = 'Add note';
    const description = 'Notes are internal — only your team sees them.';
    const canSubmit =
      !methods.formState.isSubmitting &&
      (!methods.formState.isSubmitted || methods.formState.isDirty);
    const onSubmit: SubmitHandler<AddContactNoteSchema> = async (values) => {
      if (!canSubmit) {
        return;
      }
      const result = await addContactNote(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Note added');
        modal.handleClose();
      } else {
        toast.error("Couldn't add note");
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
          {...methods.register('contactId')}
        />
        <FormField
          control={methods.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col space-y-1.5">
              <FormLabel>Note</FormLabel>
              <FormControl>
                <TextEditor
                  getText={() => convertMarkdownToHtml(field.value || '')}
                  setText={(value: string) =>
                    field.onChange(convertHtmlToMarkdown(value))
                  }
                  height="160px"
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Tip: type @ to mention a teammate.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className={cn(
            'grid gap-4',
            hideMeetingField ? 'grid-cols-1' : 'grid-cols-2'
          )}
        >
          <FormField
            control={methods.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col space-y-1.5">
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
          {!hideMeetingField && (
            <FormField
              control={methods.control}
              name="meetingId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col space-y-1.5">
                  <FormLabel>Link to meeting</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? field.value : NO_MEETING}
                      onValueChange={(next) =>
                        field.onChange(next === NO_MEETING ? null : next)
                      }
                      disabled={methods.formState.isSubmitting}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={NO_MEETING}>
                          — No meeting —
                        </SelectItem>
                        {meetings.map((m) => (
                          <SelectItem
                            key={m.id}
                            value={m.id}
                          >
                            📅 {format(m.startsAt, 'MMM d')} · {m.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormField
          control={methods.control}
          name="pinned"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>Pin to top</FormLabel>
              <FormControl>
                <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={(value) => field.onChange(!!value)}
                    disabled={methods.formState.isSubmitting}
                  />
                  Keep this note pinned at the top of the list.
                </label>
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
          Save note
        </Button>
      </>
    );
    return (
      <FormProvider {...methods}>
        {mdUp ? (
          <Dialog open={modal.visible}>
            <DialogContent
              className="max-w-lg"
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
  }
);
