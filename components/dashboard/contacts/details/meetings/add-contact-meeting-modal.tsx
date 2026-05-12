'use client';

import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { ContactMeetingStatus } from '@prisma/client';
import { addHours, addMinutes, format } from 'date-fns';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { addContactMeeting } from '@/actions/contacts/add-contact-meeting';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn } from '@/lib/utils';
import {
  addContactMeetingSchema,
  type AddContactMeetingSchema
} from '@/schemas/contacts/add-contact-meeting-schema';

export type AddContactMeetingModalProps = NiceModalHocProps & {
  contactId: string;
};

function defaultStart(): Date {
  const now = new Date();
  return addMinutes(addHours(now, 1), -now.getMinutes());
}

function toDatetimeLocalValue(date: Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm");
}

export const AddContactMeetingModal =
  NiceModal.create<AddContactMeetingModalProps>(({ contactId }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const startDefault = defaultStart();
    const endDefault = addMinutes(startDefault, 30);
    const methods = useZodForm({
      schema: addContactMeetingSchema,
      mode: 'onSubmit',
      defaultValues: {
        contactId,
        title: '',
        description: '',
        startsAt: startDefault,
        endsAt: endDefault,
        location: '',
        status: ContactMeetingStatus.PENDING
      }
    });
    const title = 'Schedule meeting';
    const description = 'Add a meeting with this contact.';
    const canSubmit =
      !methods.formState.isSubmitting &&
      (!methods.formState.isSubmitted || methods.formState.isDirty);
    const onSubmit: SubmitHandler<AddContactMeetingSchema> = async (values) => {
      if (!canSubmit) {
        return;
      }
      const result = await addContactMeeting(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Meeting scheduled');
        modal.handleClose();
      } else {
        toast.error("Couldn't schedule meeting");
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
            <FormItem className="flex w-full flex-col">
              <FormLabel required>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  maxLength={255}
                  required
                  placeholder="e.g. EDGEBI demo — heat-map & drag-drop scheduling"
                  disabled={methods.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row space-x-4">
          <FormField
            control={methods.control}
            name="startsAt"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel required>Starts</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    value={
                      field.value ? toDatetimeLocalValue(field.value) : ''
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                    disabled={methods.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="endsAt"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel required>Ends</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    value={
                      field.value ? toDatetimeLocalValue(field.value) : ''
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                    disabled={methods.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row space-x-4">
          <FormField
            control={methods.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    maxLength={255}
                    placeholder="e.g. Google Meet, On-site, Zoom"
                    disabled={methods.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Status</FormLabel>
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
                      <SelectItem value={ContactMeetingStatus.PENDING}>
                        Pending
                      </SelectItem>
                      <SelectItem value={ContactMeetingStatus.CONFIRMED}>
                        Confirmed
                      </SelectItem>
                      <SelectItem value={ContactMeetingStatus.COMPLETED}>
                        Completed
                      </SelectItem>
                      <SelectItem value={ContactMeetingStatus.CANCELLED}>
                        Cancelled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={methods.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  maxLength={2000}
                  rows={3}
                  placeholder="Agenda or notes for this meeting…"
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
          Schedule meeting
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
  });
