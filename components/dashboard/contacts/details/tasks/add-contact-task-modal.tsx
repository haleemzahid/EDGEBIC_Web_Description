'use client';

import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import {
  ContactPriority,
  ContactTaskCategory,
  ContactTaskStatus
} from '@prisma/client';
import { format } from 'date-fns';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { addContactTask } from '@/actions/contacts/add-contact-task';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
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
  addContactTaskSchema,
  type AddContactTaskSchema
} from '@/schemas/contacts/add-contact-task-schema';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { MemberDto } from '@/types/dtos/member-dto';

export type AddContactTaskModalProps = NiceModalHocProps & {
  contactId: string;
  meetings?: ContactMeetingDto[];
  members?: MemberDto[];
  defaultMeetingId?: string;
  hideMeetingField?: boolean;
};

const NO_VALUE = '__none__';

export const AddContactTaskModal = NiceModal.create<AddContactTaskModalProps>(
  ({
    contactId,
    meetings = [],
    members = [],
    defaultMeetingId,
    hideMeetingField
  }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: addContactTaskSchema,
      mode: 'onSubmit',
      defaultValues: {
        title: '',
        contactId: contactId,
        dueDate: undefined,
        status: ContactTaskStatus.OPEN,
        priority: ContactPriority.MEDIUM,
        category: null,
        assigneeUserId: null,
        meetingId: defaultMeetingId ?? null,
        description: ''
      }
    });
    const title = 'Add task';
    const description = 'Create a new task linked to this contact.';
    const canSubmit =
      !methods.formState.isSubmitting &&
      (!methods.formState.isSubmitted || methods.formState.isDirty);
    const onSubmit: SubmitHandler<AddContactTaskSchema> = async (values) => {
      if (!canSubmit) {
        return;
      }
      const result = await addContactTask(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Task added');
        modal.handleClose();
      } else {
        toast.error("Couldn't add task");
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
              <FormLabel required>Task</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  maxLength={64}
                  required
                  placeholder="e.g. Send proposal v3"
                  disabled={methods.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={methods.control}
            name="assigneeUserId"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col space-y-1.5">
                <FormLabel>Assignee</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? field.value : NO_VALUE}
                    onValueChange={(next) =>
                      field.onChange(next === NO_VALUE ? null : next)
                    }
                    disabled={methods.formState.isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NO_VALUE}>— Unassigned —</SelectItem>
                      {members.map((m) => (
                        <SelectItem
                          key={m.id}
                          value={m.id}
                        >
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                        Medium
                      </SelectItem>
                      <SelectItem value={ContactPriority.HIGH}>High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={methods.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col space-y-1.5">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? field.value : NO_VALUE}
                    onValueChange={(next) =>
                      field.onChange(
                        next === NO_VALUE
                          ? null
                          : (next as ContactTaskCategory)
                      )
                    }
                    disabled={methods.formState.isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NO_VALUE}>— None —</SelectItem>
                      <SelectItem value={ContactTaskCategory.SALES}>
                        Sales
                      </SelectItem>
                      <SelectItem value={ContactTaskCategory.ONBOARDING}>
                        Onboarding
                      </SelectItem>
                      <SelectItem value={ContactTaskCategory.SUPPORT}>
                        Support
                      </SelectItem>
                      <SelectItem value={ContactTaskCategory.FOLLOW_UP}>
                        Follow-up
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col space-y-1.5">
                <FormLabel>Due date</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    onDateChange={field.onChange}
                    disabled={methods.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {!hideMeetingField && (
          <FormField
            control={methods.control}
            name="meetingId"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col space-y-1.5">
                <FormLabel>Link to meeting (optional)</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? field.value : NO_VALUE}
                    onValueChange={(next) =>
                      field.onChange(next === NO_VALUE ? null : next)
                    }
                    disabled={methods.formState.isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NO_VALUE}>— No meeting —</SelectItem>
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
                <p className="text-xs text-muted-foreground">
                  If linked, the task will also show on the meeting&apos;s detail.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={methods.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col space-y-1.5">
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  maxLength={4000}
                  rows={3}
                  placeholder="Add context for the task…"
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
          Create task
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
