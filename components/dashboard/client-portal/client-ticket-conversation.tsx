'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ContactTicketStatus, TicketMessageSender } from '@prisma/client';
import { format } from 'date-fns';
import { AlertCircleIcon, CheckIcon, ClockIcon, SendIcon } from 'lucide-react';
import { toast } from 'sonner';

import { confirmClientTicketResolved } from '@/actions/client-portal/confirm-client-ticket-resolved';
import { replyClientTicket } from '@/actions/client-portal/reply-client-ticket';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Routes } from '@/constants/routes';
import { cn } from '@/lib/utils';

export type ClientTicketConversationMessage = {
  id: string;
  senderType: TicketMessageSender;
  senderName: string;
  body: string;
  createdAt: Date;
};

export type ClientTicketConversationProps = {
  ticketId: string;
  status: ContactTicketStatus;
  clientName: string;
  description: string | null;
  descriptionCreatedAt: Date;
  initialMessages: ClientTicketConversationMessage[];
};

type PendingMessage = {
  tempId: string;
  body: string;
  createdAt: Date;
  state: 'sending' | 'sent' | 'failed';
};

export function ClientTicketConversation({
  ticketId,
  status,
  clientName,
  description,
  descriptionCreatedAt,
  initialMessages
}: ClientTicketConversationProps): React.JSX.Element {
  const router = useRouter();
  const [pending, setPending] = React.useState<PendingMessage[]>([]);
  const [text, setText] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const isClosed = status === ContactTicketStatus.CLOSED;
  const isResolved = status === ContactTicketStatus.RESOLVED;

  // Drop pending entries that match a newly-confirmed server message (same
  // body within ~30s of the optimistic timestamp). This is the "the server
  // version replaces the optimistic version" pass after router.refresh().
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

  // Auto-scroll on new message (both server and optimistic).
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [initialMessages.length, pending.length]);

  const send = async (body: string): Promise<void> => {
    const trimmed = body.trim();
    if (!trimmed || isClosed) return;

    const tempId = `pending-${Date.now()}-${Math.random()}`;
    const optimistic: PendingMessage = {
      tempId,
      body: trimmed,
      createdAt: new Date(),
      state: 'sending'
    };
    setPending((prev) => [...prev, optimistic]);
    setText('');

    try {
      const result = await replyClientTicket({ ticketId, body: trimmed });
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
    void send(msg.body);
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
          />
        )}
        {initialMessages.map((m) => (
          <Bubble
            key={m.id}
            authorName={m.senderName}
            authorIsClient={m.senderType === TicketMessageSender.CONTACT}
            body={m.body}
            createdAt={m.createdAt}
          />
        ))}
        {pending.map((p) => (
          <Bubble
            key={p.tempId}
            authorName={clientName}
            authorIsClient
            body={p.body}
            createdAt={p.createdAt}
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
          <div className="border-t p-4">
            <p className="text-sm text-muted-foreground">
              This ticket is closed.{' '}
              <Link
                href={Routes.ClientSupport}
                className="text-primary underline"
              >
                Open a new ticket
              </Link>{' '}
              if you need more help.
            </p>
          </div>
        ) : (
          <>
            {isResolved && (
              <div className="flex flex-col gap-3 border-t bg-emerald-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm">
                  <p className="font-semibold text-emerald-900">
                    Your team marked this resolved
                  </p>
                  <p className="mt-0.5 text-xs text-emerald-800/80">
                    Confirm if it&apos;s fixed, or reply below to reopen the
                    ticket.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={handleConfirmResolved}
                  className="gap-1.5"
                >
                  <CheckIcon className="size-3.5" />
                  Confirm resolved
                </Button>
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(text);
              }}
              className="flex items-end gap-2 border-t p-3"
            >
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                maxLength={20000}
                placeholder={
                  isResolved
                    ? "Reply to reopen the ticket…"
                    : 'Write a reply…  (Enter to send, Shift+Enter for new line)'
                }
                className="max-h-40 min-h-[44px] flex-1 resize-none"
              />
              <Button
                type="submit"
                disabled={!text.trim()}
                size="icon"
                className="size-11 shrink-0"
                title="Send"
              >
                <SendIcon className="size-4" />
              </Button>
            </form>
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
  onRetry
}: {
  authorName: string;
  authorIsClient: boolean;
  body: string;
  createdAt: Date;
  isFirst?: boolean;
  state?: 'sending' | 'sent' | 'failed';
  onRetry?: () => void;
}): React.JSX.Element {
  return (
    <div className={cn('flex', authorIsClient ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm',
          authorIsClient
            ? 'bg-primary text-primary-foreground'
            : 'border bg-muted text-foreground',
          state === 'failed' && 'opacity-80 ring-1 ring-rose-300'
        )}
      >
        <div
          className={cn(
            'mb-1 flex items-baseline gap-2 text-[11px]',
            authorIsClient
              ? 'text-primary-foreground/70'
              : 'text-muted-foreground'
          )}
        >
          <span className="font-semibold">
            {authorIsClient ? 'You' : authorName}
          </span>
          <span>·</span>
          <span>{format(createdAt, 'MMM d, h:mm a')}</span>
          {isFirst && (
            <span className="ml-1 uppercase tracking-wide">Original</span>
          )}
        </div>
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
    </div>
  );
}
