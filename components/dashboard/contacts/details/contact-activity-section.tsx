'use client';

import * as React from 'react';
import { CalendarIcon, ClockIcon, UserCheckIcon } from 'lucide-react';
import { FormProvider, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { updateContactActivity } from '@/actions/contacts/update-contact-activity';
import { ContactProperty } from '@/components/dashboard/contacts/details/contact-property';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useZodForm } from '@/hooks/use-zod-form';
import {
  updateContactActivitySchema,
  type UpdateContactActivitySchema
} from '@/schemas/contacts/update-contact-activity-schema';
import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactActivitySectionProps =
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    contact: ContactDto;
  };

export function ContactActivitySection({
  contact,
  ...others
}: ContactActivitySectionProps): React.JSX.Element {
  const [editMode, setEditMode] = React.useState(false);

  const methods = useZodForm({
    schema: updateContactActivitySchema,
    mode: 'onSubmit',
    defaultValues: {
      id: contact.id,
      lastContactedAt: contact.lastContactedAt ?? null,
      lastContactedNote: contact.lastContactedNote ?? '',
      lastMeetingAt: contact.lastMeetingAt ?? null,
      lastMeetingNote: contact.lastMeetingNote ?? ''
    } as UpdateContactActivitySchema
  });

  const canSubmit = !methods.formState.isSubmitting;

  const handleCancel = (): void => {
    methods.reset(methods.formState.defaultValues);
    setEditMode(false);
  };

  const onSubmit: SubmitHandler<UpdateContactActivitySchema> = async (
    values
  ) => {
    if (!canSubmit) return;
    const result = await updateContactActivity(values);
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Activity updated');
      setEditMode(false);
    } else {
      toast.error("Couldn't update activity");
    }
  };

  const fmtDate = (d?: Date | null) =>
    d ? new Date(d).toLocaleDateString() : undefined;

  return (
    <FormProvider {...methods}>
      <section {...others}>
        <form
          className="space-y-2 px-6 pb-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-between pt-4">
            <h3 className="text-sm font-semibold tracking-tight">Activity</h3>
            {editMode ? (
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-success hover:text-success min-w-fit"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-success hover:text-success min-w-fit"
                  disabled={!canSubmit}
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  Save
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-success hover:text-success min-w-fit"
                disabled={methods.formState.isSubmitting}
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            )}
          </div>

          <div className="space-y-1 text-sm">
            <ContactProperty
              icon={<ClockIcon className="size-3 shrink-0" />}
              term="Last contacted"
              details={
                editMode ? (
                  <FormField
                    control={methods.control}
                    name="lastContactedAt"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormControl>
                          <DatePicker
                            date={field.value ?? undefined}
                            onDateChange={(d) => field.onChange(d ?? null)}
                            disabled={methods.formState.isSubmitting}
                            className="h-7 w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : contact.lastContactedAt ? (
                  <span className="truncate">
                    {fmtDate(contact.lastContactedAt)}
                    {contact.lastContactedNote && (
                      <span className="ml-1 text-muted-foreground">
                        · {contact.lastContactedNote}
                      </span>
                    )}
                  </span>
                ) : undefined
              }
              placeholder="No last contact date"
            />
            {editMode && (
              <ContactProperty
                icon={<span className="size-3 shrink-0" aria-hidden />}
                term="Note"
                details={
                  <FormField
                    control={methods.control}
                    name="lastContactedNote"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormControl>
                          <Input
                            type="text"
                            maxLength={255}
                            className="h-7"
                            placeholder="Optional"
                            disabled={methods.formState.isSubmitting}
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                }
                placeholder=""
              />
            )}

            <ContactProperty
              icon={<CalendarIcon className="size-3 shrink-0" />}
              term="Last meeting"
              details={
                editMode ? (
                  <FormField
                    control={methods.control}
                    name="lastMeetingAt"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormControl>
                          <DatePicker
                            date={field.value ?? undefined}
                            onDateChange={(d) => field.onChange(d ?? null)}
                            disabled={methods.formState.isSubmitting}
                            className="h-7 w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : contact.lastMeetingAt ? (
                  <span className="truncate">
                    {fmtDate(contact.lastMeetingAt)}
                    {contact.lastMeetingNote && (
                      <span className="ml-1 text-muted-foreground">
                        · {contact.lastMeetingNote}
                      </span>
                    )}
                  </span>
                ) : undefined
              }
              placeholder="No last meeting date"
            />
            {editMode && (
              <ContactProperty
                icon={<span className="size-3 shrink-0" aria-hidden />}
                term="Note"
                details={
                  <FormField
                    control={methods.control}
                    name="lastMeetingNote"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormControl>
                          <Input
                            type="text"
                            maxLength={255}
                            className="h-7"
                            placeholder="Optional"
                            disabled={methods.formState.isSubmitting}
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                }
                placeholder=""
              />
            )}

            <ContactProperty
              icon={<UserCheckIcon className="size-3 shrink-0" />}
              term="Customer since"
              details={
                contact.createdAt ? (
                  <span>{fmtDate(contact.createdAt)}</span>
                ) : undefined
              }
              placeholder="—"
            />
          </div>
        </form>
      </section>
    </FormProvider>
  );
}
