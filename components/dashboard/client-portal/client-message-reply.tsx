'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { replyClientMessage } from '@/actions/client-portal/reply-client-message';
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
  replyClientMessageSchema,
  type ReplyClientMessageSchema
} from '@/schemas/client-portal/reply-client-message-schema';

export type ClientMessageReplyProps = {
  threadId: string;
};

export function ClientMessageReply({
  threadId
}: ClientMessageReplyProps): React.JSX.Element {
  const router = useRouter();
  const methods = useZodForm({
    schema: replyClientMessageSchema,
    mode: 'onSubmit',
    defaultValues: { threadId, body: '' }
  });
  const canSubmit = !methods.formState.isSubmitting;

  const onSubmit: SubmitHandler<ReplyClientMessageSchema> = async (values) => {
    if (!canSubmit) return;
    const result = await replyClientMessage(values);
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Message sent');
      methods.reset({ threadId, body: '' });
      router.refresh();
    } else {
      toast.error(result?.serverError ?? "Couldn't send message");
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
                  placeholder="Write a message to your project team…"
                  disabled={methods.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!canSubmit}
            className="gap-2"
          >
            {methods.formState.isSubmitting ? 'Sending…' : 'Send message'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
