'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  type EmojiClickData
} from 'emoji-picker-react';
import {
  CheckIcon,
  Link2Icon,
  MoreVerticalIcon,
  PrinterIcon,
  RemoveFormattingIcon,
  SendIcon,
  SmileIcon,
  SpellCheckIcon
} from 'lucide-react';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { type z } from 'zod';

import { replyClientMessage } from '@/actions/client-portal/reply-client-message';
import { Button } from '@/components/ui/button';
import { ComposeEditor } from '@/components/ui/compose-editor';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormProvider
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useZodForm } from '@/hooks/use-zod-form';
import {
  appendEmojiToHtml,
  appendHtmlToBody,
  escapeHtml,
  htmlHasContent,
  htmlToPlainParagraphs,
  printComposeDraft
} from '@/lib/email/compose-html';
import { cn } from '@/lib/utils';
import { replyClientMessageSchema } from '@/schemas/client-portal/reply-client-message-schema';

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
  const body = methods.watch('body') ?? '';
  const [editorKey, setEditorKey] = React.useState<number>(0);
  const [showFormatting, setShowFormatting] = React.useState<boolean>(false);
  const [spellCheck, setSpellCheck] = React.useState<boolean>(true);
  const [linkOpen, setLinkOpen] = React.useState<boolean>(false);
  const [linkUrl, setLinkUrl] = React.useState<string>('');
  const [linkText, setLinkText] = React.useState<string>('');
  const canSubmit =
    !methods.formState.isSubmitting && htmlHasContent(body);

  const onSubmit: SubmitHandler<
    z.input<typeof replyClientMessageSchema>
  > = async (values) => {
    if (methods.formState.isSubmitting || !htmlHasContent(values.body ?? '')) {
      return;
    }
    const result = await replyClientMessage(values);
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Message sent');
      methods.reset({ threadId, body: '' });
      setEditorKey((k) => k + 1);
      router.refresh();
    } else {
      toast.error(result?.serverError ?? "Couldn't send message");
    }
  };

  const setBody = (value: string): void =>
    methods.setValue('body', value, { shouldDirty: true });

  const handleEmoji = (emoji: EmojiClickData): void => {
    setBody(appendEmojiToHtml(body, emoji.emoji));
    setEditorKey((k) => k + 1);
  };
  const handleInsertLink = (): void => {
    const rawUrl = linkUrl.trim();
    if (!rawUrl) return;
    const href = /^(https?:|mailto:|tel:)/i.test(rawUrl)
      ? rawUrl
      : `https://${rawUrl}`;
    const label = linkText.trim() || rawUrl;
    const anchor = `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
    setBody(appendHtmlToBody(body, anchor));
    setEditorKey((k) => k + 1);
    setLinkUrl('');
    setLinkText('');
    setLinkOpen(false);
  };
  const handlePlainText = (): void => {
    setBody(htmlToPlainParagraphs(body));
    setShowFormatting(false);
    setEditorKey((k) => k + 1);
  };
  const handlePrint = (): void => {
    printComposeDraft({ subject: 'Reply', body });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="border-t bg-background p-4"
      >
        <FormField
          control={methods.control}
          name="body"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col space-y-1.5">
              <FormControl>
                <div className="flex flex-col overflow-hidden rounded-lg border">
                  <div
                    className={cn(
                      'px-3 py-2 [&_.editor-container]:px-0',
                      methods.formState.isSubmitting &&
                        'pointer-events-none opacity-60'
                    )}
                  >
                    <ComposeEditor
                      key={`client-reply-${editorKey}`}
                      getText={() => field.value || ''}
                      setText={(value: string) => field.onChange(value)}
                      placeholder="Write a message to your project team…"
                      height="72px"
                      showToolbar={showFormatting}
                      spellCheck={spellCheck}
                    />
                  </div>
                  <div className="flex shrink-0 items-center gap-1 border-t bg-background px-2 py-1.5">
                    <Button
                      type="submit"
                      disabled={!canSubmit}
                    >
                      <SendIcon className="mr-1 size-3.5 shrink-0" />
                      {methods.formState.isSubmitting ? 'Sending…' : 'Send'}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'font-semibold',
                        showFormatting && 'bg-accent text-foreground'
                      )}
                      onClick={() => setShowFormatting((v) => !v)}
                      title="Formatting options"
                      aria-label="Formatting options"
                      aria-pressed={showFormatting}
                    >
                      <span className="text-sm leading-none">A</span>
                    </Button>
                    <Popover
                      open={linkOpen}
                      onOpenChange={setLinkOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          title="Insert link"
                          aria-label="Insert link"
                        >
                          <Link2Icon className="size-4 shrink-0" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-80 space-y-3"
                      >
                        <div className="space-y-1.5">
                          <Label htmlFor="client-reply-link-text">
                            Text to display
                          </Label>
                          <Input
                            id="client-reply-link-text"
                            value={linkText}
                            onChange={(e) => setLinkText(e.target.value)}
                            placeholder="Link text (optional)"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="client-reply-link-url">
                            Web address
                          </Label>
                          <Input
                            id="client-reply-link-url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleInsertLink();
                              }
                            }}
                            placeholder="https://example.com"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleInsertLink}
                            disabled={!linkUrl.trim()}
                          >
                            Insert link
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          title="Insert emoji"
                          aria-label="Insert emoji"
                        >
                          <SmileIcon className="size-4 shrink-0" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-fit border-0 p-0"
                      >
                        <EmojiPicker
                          onEmojiClick={handleEmoji}
                          autoFocusSearch={false}
                          theme={Theme.LIGHT}
                          previewConfig={{ showPreview: false }}
                          skinTonesDisabled
                          defaultSkinTone={SkinTones.NEUTRAL}
                          emojiStyle={EmojiStyle.NATIVE}
                        />
                      </PopoverContent>
                    </Popover>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          title="More options"
                          aria-label="More options"
                        >
                          <MoreVerticalIcon className="size-4 shrink-0" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={handlePlainText}>
                          <RemoveFormattingIcon className="mr-2 size-4 shrink-0" />
                          Plain text mode
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handlePrint}>
                          <PrinterIcon className="mr-2 size-4 shrink-0" />
                          Print
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setSpellCheck((v) => !v)}
                        >
                          <SpellCheckIcon className="mr-2 size-4 shrink-0" />
                          <span className="flex-1">Spell check</span>
                          {spellCheck && (
                            <CheckIcon className="ml-2 size-4 shrink-0" />
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  );
}
