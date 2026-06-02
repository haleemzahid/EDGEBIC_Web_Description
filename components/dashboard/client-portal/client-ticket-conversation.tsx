'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ContactTicketStatus, TicketMessageSender } from '@prisma/client';
import { format } from 'date-fns';
import {
  AlertCircleIcon,
  CheckIcon,
  ClockIcon,
  PaperclipIcon,
  SendIcon
} from 'lucide-react';
import { toast } from 'sonner';

import { confirmClientTicketResolved } from '@/actions/client-portal/confirm-client-ticket-resolved';
import { reopenClientTicket } from '@/actions/client-portal/reopen-client-ticket';
import { replyClientTicket } from '@/actions/client-portal/reply-client-ticket';
import {
  AttachmentPreview,
  StagedAttachmentChip,
  type StagedAttachmentItem,
  type TicketAttachmentView
} from '@/components/dashboard/ticket-attachment-ui';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Routes } from '@/constants/routes';
import { useTicketRealtime } from '@/lib/ably/use-ticket-realtime';
import { cn } from '@/lib/utils';

export type ClientTicketConversationAttachment = TicketAttachmentView;

export type ClientTicketConversationMessage = {
  id: string;
  senderType: TicketMessageSender;
  senderName: string;
  body: string;
  createdAt: Date;
  attachments: ClientTicketConversationAttachment[];
};

export type ClientTicketConversationProps = {
  ticketId: string;
  status: ContactTicketStatus;
  /**
   * True only when the client opened this ticket themselves. Team-opened
   * tickets are view + reply only — no close / reopen / confirm-resolved.
   */
  canManage: boolean;
  clientName: string;
  description: string | null;
  descriptionCreatedAt: Date;
  initialMessages: ClientTicketConversationMessage[];
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

export function ClientTicketConversation({
  ticketId,
  status,
  canManage,
  clientName,
  description,
  descriptionCreatedAt,
  initialMessages
}: ClientTicketConversationProps): React.JSX.Element {
  const router = useRouter();
  const [pending, setPending] = React.useState<PendingMessage[]>([]);
  const [text, setText] = React.useState('');
  const [staged, setStaged] = React.useState<StagedAttachment[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const isClosed = status === ContactTicketStatus.CLOSED;
  const isResolved = status === ContactTicketStatus.RESOLVED;

  // Realtime push via Ably — pick up team replies the moment they're sent.
  // CLOSED tickets are terminal so we skip the subscription entirely.
  useTicketRealtime(
    ticketId,
    React.useCallback(() => router.refresh(), [router]),
    { enabled: !isClosed }
  );

  // Drop pending entries that match a newly-confirmed server message (same
  // body within ~30s of the optimistic timestamp).
  React.useEffect(() => {
    if (pending.length === 0) return;
    setPending((prev) =>
      prev.filter((p) => {
        if (p.state !== 'sent') return true;
        const match = initialMessages.some(
          (m) =>
            m.senderType === TicketMessageSender.CONTACT &&
            m.body === p.body &&
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
        fd.append('ticketId', ticketId);
        fd.append('files', item.file);
        try {
          const res = await fetch('/api/ticket-attachments', {
            method: 'POST',
            body: fd
          });
          if (!res.ok) {
            const data = await res.json().catch(() => ({ error: 'Upload failed' }));
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

  const send = async (body: string): Promise<void> => {
    if (isClosed) return;
    const trimmed = body.trim();
    const readyAttachments = staged
      .filter((s) => s.state === 'uploaded' && s.uploaded)
      .map((s) => s.uploaded as UploadedAttachment);
    if (!trimmed && readyAttachments.length === 0) return;
    if (staged.some((s) => s.state === 'uploading')) {
      toast.error('Please wait for uploads to finish');
      return;
    }

    const tempId = `pending-${Date.now()}-${Math.random()}`;
    const optimistic: PendingMessage = {
      tempId,
      body: trimmed,
      attachments: readyAttachments,
      createdAt: new Date(),
      state: 'sending'
    };
    setPending((prev) => [...prev, optimistic]);
    setText('');
    setStaged([]);

    try {
      const result = await replyClientTicket({
        ticketId,
        body: trimmed,
        attachments: readyAttachments
      });
      if (result?.serverError || result?.validationErrors) {
        setPending((prev) =>
          prev.map((p) =>
            p.tempId === tempId ? { ...p, state: 'failed' } : p
          )
        );
        toast.error(result?.serverError ?? "Couldn't send reply");
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
        error instanceof Error ? error.message : "Couldn't send reply"
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send(text);
    }
  };

  const retry = (tempId: string): void => {
    const msg = pending.find((p) => p.tempId === tempId);
    if (!msg) return;
    setPending((prev) => prev.filter((p) => p.tempId !== tempId));
    setText(msg.body);
  };

  const handleConfirmResolved = async (): Promise<void> => {
    const result = await confirmClientTicketResolved({ ticketId });
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Ticket closed. Thanks for confirming.');
      router.refresh();
    } else {
      toast.error(result?.serverError ?? "Couldn't close the ticket.");
    }
  };

  const [reopening, setReopening] = React.useState(false);
  const [resolvedReplyOpen, setResolvedReplyOpen] = React.useState(false);
  const handleReopen = async (): Promise<void> => {
    setReopening(true);
    const result = await reopenClientTicket({ ticketId });
    setReopening(false);
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Ticket reopened. Your team has been notified.');
      router.refresh();
    } else {
      toast.error(result?.serverError ?? "Couldn't reopen the ticket.");
    }
  };
  const canSubmit =
    (text.trim().length > 0 ||
      staged.some((s) => s.state === 'uploaded')) &&
    !staged.some((s) => s.state === 'uploading');

  const replyForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void send(text);
      }}
      className="flex items-end gap-2 border-t p-3"
    >
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
        className="size-11 shrink-0"
        title="Attach files"
        onClick={() => fileInputRef.current?.click()}
        disabled={staged.length >= MAX_ATTACHMENTS}
      >
        <PaperclipIcon className="size-4" />
      </Button>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        maxLength={20000}
        placeholder={
          isResolved
            ? 'Reply to reopen the ticket…'
            : 'Write a reply…  (Enter to send, Shift+Enter for new line)'
        }
        className="max-h-40 min-h-[44px] flex-1 resize-none"
      />
      <Button
        type="submit"
        disabled={!canSubmit}
        size="icon"
        className="size-11 shrink-0"
        title="Send"
      >
        <SendIcon className="size-4" />
      </Button>
    </form>
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-0 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto rounded-t-lg border border-b-0 bg-card p-4"
      >
        {description && (
          <Bubble
            authorName={clientName}
            authorIsClient
            body={description}
            createdAt={descriptionCreatedAt}
            isFirst
            attachments={[]}
          />
        )}
        {initialMessages.map((m) => (
          <Bubble
            key={m.id}
            authorName={m.senderName}
            authorIsClient={m.senderType === TicketMessageSender.CONTACT}
            body={m.body}
            createdAt={m.createdAt}
            attachments={m.attachments}
          />
        ))}
        {pending.map((p) => (
          <Bubble
            key={p.tempId}
            authorName={clientName}
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
        {initialMessages.length === 0 &&
          pending.length === 0 &&
          !description && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No messages yet.
            </p>
          )}
      </div>
      <div className="rounded-b-lg border bg-card">
        {isClosed ? (
          <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm">
              <p className="font-medium text-foreground">This ticket is closed.</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {canManage ? 'Reopen it if the issue came back, or ' : 'If you need more help, '}
                <Link
                  href={Routes.ClientSupport}
                  className="text-primary underline"
                >
                  open a new ticket
                </Link>
                .
              </p>
            </div>
            {canManage && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReopen}
                disabled={reopening}
                className="gap-1.5"
              >
                <ClockIcon className="size-3.5" />
                {reopening ? 'Reopening…' : 'Reopen ticket'}
              </Button>
            )}
          </div>
        ) : (
          <>
            {isResolved && (
              <div className="flex flex-col gap-3 border-t bg-emerald-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm">
                  <p className="text-base font-semibold text-emerald-900">
                    Your team marked this resolved
                  </p>
                  <p className="mt-1 text-xs text-emerald-800/80">
                    {canManage
                      ? "Confirm if it's fixed so we can close this ticket."
                      : 'If you still need help, open a new ticket — your team manages this ticket.'}
                  </p>
                </div>
                {canManage && (
                  <Button
                    type="button"
                    variant="default"
                    onClick={handleConfirmResolved}
                    className="gap-1.5"
                  >
                    <CheckIcon className="size-4" />
                    Confirm resolved
                  </Button>
                )}
              </div>
            )}
            {isResolved && canManage && !resolvedReplyOpen && (
              <div className="border-t p-3 text-center">
                <button
                  type="button"
                  onClick={() => setResolvedReplyOpen(true)}
                  className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                >
                  Still not fixed? Reply to reopen the ticket.
                </button>
              </div>
            )}
            {(!isResolved || resolvedReplyOpen) && staged.length > 0 && (
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
            {(!isResolved || resolvedReplyOpen) && replyForm}
          </>
        )}
      </div>
    </div>
  );
}

function Bubble({
  authorName,
  authorIsClient,
  body,
  createdAt,
  isFirst,
  state,
  onRetry,
  attachments
}: {
  authorName: string;
  authorIsClient: boolean;
  body: string;
  createdAt: Date;
  isFirst?: boolean;
  state?: 'sending' | 'sent' | 'failed';
  onRetry?: () => void;
  attachments: ClientTicketConversationAttachment[];
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
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{body}</p>
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
        {isFirst && ' · opened the ticket'} ·{' '}
        {format(createdAt, 'h:mm a · MMM d')}
      </div>
    </div>
  );
}

