'use client';

import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { ContactMeetingStatus } from '@prisma/client';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { updateContactMeeting } from '@/actions/contacts/update-contact-meeting';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/date-time-picker';
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
  updateContactMeetingSchema,
  type UpdateContactMeetingSchema
} from '@/schemas/contacts/update-contact-meeting-schema';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';

export type EditContactMeetingModalProps = NiceModalHocProps & {
  meeting: ContactMeetingDto;
};

export const EditContactMeetingModal =
  NiceModal.create<EditContactMeetingModalProps>(({ meeting }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: updateContactMeetingSchema,
      mode: 'onSubmit',
      defaultValues: {
        id: meeting.id,
        title: meeting.title,
        description: meeting.description ?? '',
        startsAt: meeting.startsAt,
        endsAt: meeting.endsAt,
        location: meeting.location ?? '',
        status: meeting.status
      }
    });
    const title = 'Edit meeting';
    const description = 'Update the details of this meeting.';
    const canSubmit =
      !methods.formState.isSubmitting &&
      (!methods.formState.isSubmitted || methods.formState.isDirty);
    const onSubmit: SubmitHandler<UpdateContactMeetingSchema> = async (
      values
    ) => {
      if (!canSubmit) {
        return;
      }
      const result = await updateContactMeeting(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Meeting updated');
        modal.handleClose();
      } else {
        toast.error("Couldn't update meeting");
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
                  <DateTimePicker
                    date={field.value}
                    onDateChange={field.onChange}
                    disabled={methods.formState.isSubmitting}
                    className="w-full"
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
                  <DateTimePicker
                    date={field.value}
                    onDateChange={field.onChange}
                    disabled={methods.formState.isSubmitting}
                    className="w-full"
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
          Save changes
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
