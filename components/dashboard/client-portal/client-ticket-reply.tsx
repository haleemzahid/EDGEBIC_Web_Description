'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { replyClientTicket } from '@/actions/client-portal/reply-client-ticket';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormProvider
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useZodForm } from '@/hooks/use-zod-form';
import {
  replyClientTicketSchema,
  type ReplyClientTicketSchema
} from '@/schemas/client-portal/reply-client-ticket-schema';

export type ClientTicketReplyProps = {
  ticketId: string;
  disabled?: boolean;
  reopens?: boolean;
};

export function ClientTicketReply({
  ticketId,
  disabled,
  reopens
}: ClientTicketReplyProps): React.JSX.Element {
  const router = useRouter();
  const methods = useZodForm({
    schema: replyClientTicketSchema,
    mode: 'onSubmit',
    defaultValues: { ticketId, body: '' }
  });
  const canSubmit = !methods.formState.isSubmitting;

  const onSubmit: SubmitHandler<ReplyClientTicketSchema> = async (values) => {
    if (!canSubmit || disabled) return;
    const result = await replyClientTicket(values);
    if (!result?.serverError && !result?.validationErrors) {
      const reopened = result?.data?.reopened === true;
      toast.success(reopened ? 'Reply sent — ticket reopened' : 'Reply sent');
      methods.reset({ ticketId, body: '' });
      router.refresh();
    } else {
      toast.error(result?.serverError ?? "Couldn't send reply");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 border-t bg-background p-4"
      >
        <FormField
          control={methods.control}
          name="body"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col space-y-1.5">
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  maxLength={20000}
                  placeholder={
                    reopens
                      ? "Tell us what's still broken (this reopens the ticket)…"
                      : 'Write a reply…'
                  }
                  disabled={disabled || methods.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={disabled || !canSubmit}
            className="gap-2"
          >
            {methods.formState.isSubmitting
              ? 'Sending…'
              : reopens
                ? 'Reply & reopen'
                : 'Send reply'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
