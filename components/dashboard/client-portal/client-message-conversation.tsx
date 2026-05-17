'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { EmailSenderType } from '@prisma/client';
import { format } from 'date-fns';
import {
  AlertCircleIcon,
  CheckIcon,
  ClockIcon,
  Link2Icon,
  PaperclipIcon,
  SendIcon,
  SmileIcon
} from 'lucide-react';
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  type EmojiClickData
} from 'emoji-picker-react';
import { toast } from 'sonner';

import { replyClientMessage } from '@/actions/client-portal/reply-client-message';
import {
  AttachmentPreview,
  StagedAttachmentChip,
  type StagedAttachmentItem,
  type TicketAttachmentView
} from '@/components/dashboard/ticket-attachment-ui';
import { Button } from '@/components/ui/button';
import { ComposeEditor } from '@/components/ui/compose-editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  appendEmojiToHtml,
  appendHtmlToBody,
  escapeHtml,
  htmlHasContent,
  htmlToText,
  isHtmlBody
} from '@/lib/email/compose-html';
import { cn } from '@/lib/utils';

export type ClientMessageConversationMessage = {
  id: string;
  senderType: EmailSenderType;
  senderName: string;
  senderEmail: string | null;
  body: string;
  createdAt: Date;
  attachments: TicketAttachmentView[];
};

export type ClientMessageConversationProps = {
  threadId: string;
  clientName: string;
  initialMessages: ClientMessageConversationMessage[];
};

type UploadedAttachment = {
  storedName: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
};

type StagedAttachment = StagedAttachmentItem & {
  uploaded?: UploadedAttachment;
};

type PendingMessage = {
  tempId: string;
  body: string;
  attachments: UploadedAttachment[];
  createdAt: Date;
  state: 'sending' | 'sent' | 'failed';
};

const MAX_ATTACHMENTS = 5;

export function ClientMessageConversation({
  threadId,
  clientName,
  initialMessages
}: ClientMessageConversationProps): React.JSX.Element {
  const router = useRouter();
  const [pending, setPending] = React.useState<PendingMessage[]>([]);
  // Body is rich-text HTML from the compose editor.
  const [text, setText] = React.useState('');
  // Bumped to remount the seed-once editor (after send, retry, emoji/link).
  const [editorKey, setEditorKey] = React.useState(0);
  const [showFormatting, setShowFormatting] = React.useState(false);
  const [staged, setStaged] = React.useState<StagedAttachment[]>([]);
  const [linkOpen, setLinkOpen] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState('');
  const [linkText, setLinkText] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const lastTeamMessage = [...initialMessages]
    .reverse()
    .find((m) => m.senderType === EmailSenderType.USER);
  const recipientFirstName =
    lastTeamMessage?.senderName?.split(' ')[0] || 'the team';

  // Background poll for new messages from the team.
  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        router.refresh();
      }
    }, 5000);
    return () => window.clearInterval(id);
  }, [router]);

  React.useEffect(() => {
    if (pending.length === 0) return;
    setPending((prev) =>
      prev.filter((p) => {
        if (p.state !== 'sent') return true;
        // Server stores sanitized HTML; the optimistic copy is raw editor
        // HTML — compare on visible text so the bubble de-dupes reliably.
        const pText = htmlToText(p.body);
        const match = initialMessages.some(
          (m) =>
            m.senderType === EmailSenderType.CONTACT &&
            htmlToText(m.body) === pText &&
            Math.abs(m.createdAt.getTime() - p.createdAt.getTime()) < 30_000
        );
        return !match;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessages]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [initialMessages.length, pending.length]);

  const uploadFiles = async (files: File[]): Promise<void> => {
    const room = MAX_ATTACHMENTS - staged.length;
    if (room <= 0) {
      toast.error(`Maximum ${MAX_ATTACHMENTS} files per message`);
      return;
    }
    const accepted = files.slice(0, room);
    if (accepted.length < files.length) {
      toast.error(`Only the first ${room} file(s) were attached`);
    }
    const items: StagedAttachment[] = accepted.map((file) => ({
      tempId: `staged-${Date.now()}-${Math.random()}`,
      file,
      state: 'uploading'
    }));
    setStaged((prev) => [...prev, ...items]);
    await Promise.all(
      items.map(async (item) => {
        const fd = new FormData();
        fd.append('threadId', threadId);
        fd.append('files', item.file);
        try {
          const res = await fetch('/api/message-attachments', {
            method: 'POST',
            body: fd
          });
          if (!res.ok) {
            const data = await res
              .json()
              .catch(() => ({ error: 'Upload failed' }));
            throw new Error(data?.error ?? 'Upload failed');
          }
          const data = (await res.json()) as {
            attachments: UploadedAttachment[];
          };
          const uploaded = data.attachments[0];
          setStaged((prev) =>
            prev.map((s) =>
              s.tempId === item.tempId
                ? { ...s, state: 'uploaded', uploaded }
                : s
            )
          );
        } catch (error) {
          const msg = error instanceof Error ? error.message : 'Upload failed';
          setStaged((prev) =>
            prev.map((s) =>
              s.tempId === item.tempId ? { ...s, state: 'failed', error: msg } : s
            )
          );
          toast.error(`${item.file.name}: ${msg}`);
        }
      })
    );
  };

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) void uploadFiles(files);
    e.target.value = '';
  };

  const removeStaged = (tempId: string): void => {
    setStaged((prev) => prev.filter((s) => s.tempId !== tempId));
  };

  const handleEmoji = (emoji: EmojiClickData): void => {
    setText((b) => appendEmojiToHtml(b, emoji.emoji));
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
    setText((b) => appendHtmlToBody(b, anchor));
    setEditorKey((k) => k + 1);
    setLinkUrl('');
    setLinkText('');
    setLinkOpen(false);
  };

  const send = async (htmlBody: string): Promise<void> => {
    const readyAttachments = staged
      .filter((s) => s.state === 'uploaded' && s.uploaded)
      .map((s) => s.uploaded as UploadedAttachment);
    const hasText = htmlHasContent(htmlBody);
    if (!hasText && readyAttachments.length === 0) return;
    if (staged.some((s) => s.state === 'uploading')) {
      toast.error('Please wait for uploads to finish');
      return;
    }

    const tempId = `pending-${Date.now()}-${Math.random()}`;
    setPending((prev) => [
      ...prev,
      {
        tempId,
        body: hasText ? htmlBody : '',
        attachments: readyAttachments,
        createdAt: new Date(),
        state: 'sending'
      }
    ]);
    setText('');
    setEditorKey((k) => k + 1);
    setStaged([]);

    try {
      const result = await replyClientMessage({
        threadId,
        body: hasText ? htmlBody : '',
        attachments: readyAttachments
      });
      if (result?.serverError || result?.validationErrors) {
        setPending((prev) =>
          prev.map((p) =>
            p.tempId === tempId ? { ...p, state: 'failed' } : p
          )
        );
        toast.error(result?.serverError ?? "Couldn't send message");
        return;
      }
      setPending((prev) =>
        prev.map((p) => (p.tempId === tempId ? { ...p, state: 'sent' } : p))
      );
      router.refresh();
    } catch (error) {
      setPending((prev) =>
        prev.map((p) =>
          p.tempId === tempId ? { ...p, state: 'failed' } : p
        )
      );
      toast.error(
        error instanceof Error ? error.message : "Couldn't send message"
      );
    }
  };

  const retry = (tempId: string): void => {
    const msg = pending.find((p) => p.tempId === tempId);
    if (!msg) return;
    setPending((prev) => prev.filter((p) => p.tempId !== tempId));
    setText(msg.body);
    setEditorKey((k) => k + 1);
  };

  const canSubmit =
    (htmlHasContent(text) || staged.some((s) => s.state === 'uploaded')) &&
    !staged.some((s) => s.state === 'uploading');

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-0 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto rounded-t-lg border border-b-0 bg-card p-4"
      >
        {initialMessages.length === 0 && pending.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No messages in this conversation yet.
          </p>
        ) : (
          initialMessages.map((m) => (
            <Bubble
              key={m.id}
              authorName={m.senderName}
              authorEmail={m.senderEmail}
              authorIsClient={m.senderType === EmailSenderType.CONTACT}
              body={m.body}
              createdAt={m.createdAt}
              attachments={m.attachments}
            />
          ))
        )}
        {pending.map((p) => (
          <Bubble
            key={p.tempId}
            authorName={clientName}
            authorEmail={null}
            authorIsClient
            body={p.body}
            createdAt={p.createdAt}
            attachments={p.attachments.map((a, i) => ({
              id: `${p.tempId}-${i}`,
              fileName: a.fileName,
              storedName: a.storedName,
              mimeType: a.mimeType,
              sizeBytes: a.sizeBytes
            }))}
            state={p.state}
            onRetry={p.state === 'failed' ? () => retry(p.tempId) : undefined}
          />
        ))}
      </div>
      <div className="rounded-b-lg border border-t-0 bg-card">
        {staged.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t bg-muted/40 p-2">
            {staged.map((s) => (
              <StagedAttachmentChip
                key={s.tempId}
                item={s}
                onRemove={() => removeStaged(s.tempId)}
              />
            ))}
          </div>
        )}
        <div className="flex min-h-0 flex-col border-t">
          <div className="px-3 py-2">
            <ComposeEditor
              key={editorKey}
              getText={() => text}
              setText={setText}
              placeholder={`Reply to ${recipientFirstName}…`}
              height="96px"
              showToolbar={showFormatting}
            />
          </div>
          <div className="flex items-center gap-1 border-t px-2 py-1.5">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={onPickFiles}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                'size-8 font-semibold',
                showFormatting && 'bg-accent text-foreground'
              )}
              onClick={() => setShowFormatting((v) => !v)}
              title="Formatting options"
              aria-label="Formatting options"
              aria-pressed={showFormatting}
            >
              <span className="text-sm leading-none">A</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              title="Attach files"
              onClick={() => fileInputRef.current?.click()}
              disabled={staged.length >= MAX_ATTACHMENTS}
            >
              <PaperclipIcon className="size-4" />
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
                  className="size-8"
                  title="Insert link"
                  aria-label="Insert link"
                >
                  <Link2Icon className="size-4" />
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
                  <Label htmlFor="client-reply-link-url">Web address</Label>
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
                  className="size-8"
                  title="Insert emoji"
                  aria-label="Insert emoji"
                >
                  <SmileIcon className="size-4" />
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
            <Button
              type="button"
              onClick={() => void send(text)}
              disabled={!canSubmit}
              size="sm"
              className="ml-auto"
              title="Send"
            >
              <SendIcon className="mr-1 size-3.5 shrink-0" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({
  authorName,
  authorEmail,
  authorIsClient,
  body,
  createdAt,
  state,
  onRetry,
  attachments
}: {
  authorName: string;
  authorEmail: string | null;
  authorIsClient: boolean;
  body: string;
  createdAt: Date;
  state?: 'sending' | 'sent' | 'failed';
  onRetry?: () => void;
  attachments: TicketAttachmentView[];
}): React.JSX.Element {
  const hasBody = body.length > 0;
  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        authorIsClient ? 'items-end' : 'items-start'
      )}
    >
      {hasBody && (
        <div
          className={cn(
            'max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm',
            authorIsClient
              ? 'bg-primary text-primary-foreground'
              : 'border bg-muted text-foreground',
            state === 'failed' && 'opacity-80 ring-1 ring-rose-300'
          )}
        >
          {isHtmlBody(body) ? (
            <div
              className="text-sm leading-relaxed [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
              // Stored bodies are sanitized server-side
              // (lib/email/sanitize-email-html.ts). Legacy / plain-text
              // messages fall through to the <p> branch below.
              dangerouslySetInnerHTML={{ __html: body }}
            />
          ) : (
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {body}
            </p>
          )}
          {state && (
            <div
              className={cn(
                'mt-1 flex items-center justify-end gap-1 text-[10px]',
                authorIsClient
                  ? 'text-primary-foreground/70'
                  : 'text-muted-foreground'
              )}
            >
              {state === 'sending' && (
                <>
                  <ClockIcon className="size-3" />
                  <span>sending</span>
                </>
              )}
              {state === 'sent' && (
                <>
                  <CheckIcon className="size-3" />
                  <span>sent</span>
                </>
              )}
              {state === 'failed' && (
                <>
                  <AlertCircleIcon className="size-3 text-rose-300" />
                  <button
                    type="button"
                    onClick={onRetry}
                    className="underline"
                  >
                    failed — retry
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {attachments.length > 0 && (
        <div
          className={cn(
            'flex max-w-[80%] flex-col gap-2',
            authorIsClient ? 'items-end' : 'items-start'
          )}
        >
          {attachments.map((a) => (
            <AttachmentPreview
              key={a.id}
              attachment={a}
              alignEnd={authorIsClient}
            />
          ))}
        </div>
      )}
      <div className="text-[11px] text-muted-foreground">
        {authorIsClient ? 'You' : authorName}
        {!authorIsClient && authorEmail && (
          <span className="ml-1">&lt;{authorEmail}&gt;</span>
        )}
        {' · '}
        {format(createdAt, 'h:mm a · MMM d')}
      </div>
    </div>
  );
}
