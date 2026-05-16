'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import { ContactPriority, ContactTicketStatus } from '@prisma/client';
import { format } from 'date-fns';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { addContactTicket } from '@/actions/contacts/add-contact-ticket';
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
  addContactTicketSchema,
  type AddContactTicketSchema
} from '@/schemas/contacts/add-contact-ticket-schema';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { MemberDto } from '@/types/dtos/member-dto';

export type AddContactTicketModalProps = NiceModalHocProps & {
  contactId: string;
  members?: MemberDto[];
  meetings?: ContactMeetingDto[];
  defaultMeetingId?: string;
  hideMeetingField?: boolean;
};

const AUTO_ASSIGN = '__auto__';
const NO_MEETING = '__none__';

export const AddContactTicketModal =
  NiceModal.create<AddContactTicketModalProps>(
    ({
      contactId,
      members = [],
      meetings = [],
      defaultMeetingId,
      hideMeetingField
    }) => {
      const modal = useEnhancedModal();
      const router = useRouter();
      const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
      const methods = useZodForm({
        schema: addContactTicketSchema,
        mode: 'onSubmit',
        defaultValues: {
          contactId,
          title: '',
          description: '',
          status: ContactTicketStatus.OPEN,
          priority: ContactPriority.MEDIUM,
          assigneeUserId: null,
          meetingId: defaultMeetingId ?? null
        }
      });
      // NiceModal.hide() doesn't unmount; reset RHF state on every reopen so
      // stale values from a prior submit don't persist.
      React.useEffect(() => {
        if (modal.visible) {
          methods.reset();
        }
      }, [modal.visible, methods]);
      const title = 'New ticket';
      const description = 'Create a support ticket linked to this contact.';
      const canSubmit =
        !methods.formState.isSubmitting &&
        (!methods.formState.isSubmitted || methods.formState.isDirty);
      const onSubmit: SubmitHandler<AddContactTicketSchema> = async (
        values
      ) => {
        if (!canSubmit) {
          return;
        }
        const result = await addContactTicket(values);
        if (!result?.serverError && !result?.validationErrors) {
          toast.success(`Ticket #${result?.data?.number ?? ''} created`);
          methods.reset();
          modal.handleClose();
          // Sibling edit/delete modals refresh the route; do the same here so
          // the new ticket shows in the table immediately (no 10s polling).
          router.refresh();
        } else {
          toast.error("Couldn't create ticket");
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
                    placeholder="e.g. EDGEBI not loading after login"
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    maxLength={8000}
                    rows={4}
                    placeholder="What's the problem? Include steps to reproduce."
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
                        <SelectItem value={ContactPriority.HIGH}>
                          High
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
              name="status"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col space-y-1.5">
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
                        <SelectItem value={ContactTicketStatus.OPEN}>
                          Open
                        </SelectItem>
                        <SelectItem value={ContactTicketStatus.PENDING}>
                          In progress
                        </SelectItem>
                        <SelectItem value={ContactTicketStatus.RESOLVED}>
                          Resolved
                        </SelectItem>
                        <SelectItem value={ContactTicketStatus.CLOSED}>
                          Closed
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
            name="assigneeUserId"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col space-y-1.5">
                <FormLabel>Assign to</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? field.value : AUTO_ASSIGN}
                    onValueChange={(next) =>
                      field.onChange(next === AUTO_ASSIGN ? null : next)
                    }
                    disabled={methods.formState.isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={AUTO_ASSIGN}>Auto-assign</SelectItem>
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
          {!hideMeetingField && (
            <FormField
              control={methods.control}
              name="meetingId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col space-y-1.5">
                  <FormLabel>Link to meeting (optional)</FormLabel>
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
                  <p className="text-xs text-muted-foreground">
                    If linked, the ticket will also show on the meeting&apos;s
                    detail page.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
            Create ticket
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
