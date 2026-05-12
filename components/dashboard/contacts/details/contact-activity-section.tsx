'use client';

import * as React from 'react';
import { CalendarIcon, ClockIcon, UserCheckIcon } from 'lucide-react';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { updateContactProperties } from '@/actions/contacts/update-contact-properties';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormProvider
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useZodForm } from '@/hooks/use-zod-form';
import {
  updateContactPropertiesSchema,
  type UpdateContactPropertiesSchema
} from '@/schemas/contacts/update-contact-properties-schema';
import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactActivitySectionProps =
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    contact: ContactDto;
  };

type RowProps = {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
};
function Row({ icon, label, children }: RowProps): React.JSX.Element {
  return (
    <div className="flex min-h-7 flex-row items-start py-0.5">
      <span className="flex w-36 shrink-0 flex-row items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="text-xs">{children}</span>
    </div>
  );
}

export function ContactActivitySection({
  contact,
  ...others
}: ContactActivitySectionProps): React.JSX.Element {
  const [editMode, setEditMode] = React.useState(false);

  const methods = useZodForm({
    schema: updateContactPropertiesSchema,
    mode: 'onSubmit',
    defaultValues: {
      id: contact.id,
      record: contact.record,
      name: contact.name,
      email: contact.email ?? '',
      phone: contact.phone ?? '',
      address: contact.address ?? '',
      jobTitle: contact.jobTitle ?? '',
      company: contact.company ?? '',
      website: contact.website ?? '',
      linkedIn: contact.linkedIn ?? '',
      country: contact.country ?? '',
      timezone: contact.timezone ?? '',
      leadSource: contact.leadSource ?? '',
      leadSourceDate: contact.leadSourceDate ?? null,
      stripeCustomerId: contact.stripeCustomerId ?? '',
      lastContactedAt: contact.lastContactedAt ?? null,
      lastContactedNote: contact.lastContactedNote ?? '',
      lastMeetingAt: contact.lastMeetingAt ?? null,
      lastMeetingNote: contact.lastMeetingNote ?? ''
    } as UpdateContactPropertiesSchema
  });

  const canSubmit = !methods.formState.isSubmitting;

  const onSubmit: SubmitHandler<UpdateContactPropertiesSchema> = async (
    values
  ) => {
    if (!canSubmit) return;
    const result = await updateContactProperties(values);
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
    <section {...others}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between px-6 pb-2 pt-4">
            <h3 className="text-sm font-semibold tracking-tight">Activity</h3>
            {editMode ? (
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-success hover:text-success min-w-fit"
                  onClick={() => {
                    methods.reset();
                    setEditMode(false);
                  }}
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
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            )}
          </div>

          <div className="space-y-0.5 px-6 pb-4">
            <Row
              icon={<ClockIcon className="size-3 shrink-0" />}
              label="Last contacted"
            >
              {editMode ? (
                <div className="flex flex-col gap-1">
                  <FormField
                    control={methods.control}
                    name="lastContactedAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="date"
                            className="h-7 text-xs"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .slice(0, 10)
                                : ''
                            }
                            onChange={(e) =>
                              field.onChange(
                                e.target.value ? new Date(e.target.value) : null
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="lastContactedNote"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Note (optional)"
                            className="h-7 text-xs"
                            maxLength={255}
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : contact.lastContactedAt ? (
                <span>
                  {fmtDate(contact.lastContactedAt)}
                  {contact.lastContactedNote && (
                    <span className="ml-1 text-muted-foreground">
                      · {contact.lastContactedNote}
                    </span>
                  )}
                </span>
              ) : (
                <span className="text-muted-foreground opacity-65">—</span>
              )}
            </Row>

            <Row
              icon={<CalendarIcon className="size-3 shrink-0" />}
              label="Last meeting"
            >
              {editMode ? (
                <div className="flex flex-col gap-1">
                  <FormField
                    control={methods.control}
                    name="lastMeetingAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="date"
                            className="h-7 text-xs"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .slice(0, 10)
                                : ''
                            }
                            onChange={(e) =>
                              field.onChange(
                                e.target.value ? new Date(e.target.value) : null
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="lastMeetingNote"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Note (optional)"
                            className="h-7 text-xs"
                            maxLength={255}
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : contact.lastMeetingAt ? (
                <span>
                  {fmtDate(contact.lastMeetingAt)}
                  {contact.lastMeetingNote && (
                    <span className="ml-1 text-muted-foreground">
                      · {contact.lastMeetingNote}
                    </span>
                  )}
                </span>
              ) : (
                <span className="text-muted-foreground opacity-65">—</span>
              )}
            </Row>

            <Row
              icon={<UserCheckIcon className="size-3 shrink-0" />}
              label="Customer since"
            >
              {contact.createdAt ? (
                <span>{fmtDate(contact.createdAt)}</span>
              ) : (
                <span className="text-muted-foreground opacity-65">—</span>
              )}
            </Row>
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
