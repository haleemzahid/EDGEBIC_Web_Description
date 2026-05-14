'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { EmailSenderType } from '@prisma/client';
import { format } from 'date-fns';
import { AlertCircleIcon, CheckIcon, ClockIcon, SendIcon } from 'lucide-react';
import { toast } from 'sonner';

import { replyClientMessage } from '@/actions/client-portal/reply-client-message';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export type ClientMessageConversationMessage = {
  id: string;
  senderType: EmailSenderType;
  senderName: string;
  senderEmail: string | null;
  body: string;
  createdAt: Date;
};

export type ClientMessageConversationProps = {
  threadId: string;
  clientName: string;
  initialMessages: ClientMessageConversationMessage[];
};

type PendingMessage = {
  tempId: string;
  body: string;
  createdAt: Date;
  state: 'sending' | 'sent' | 'failed';
};

export function ClientMessageConversation({
  threadId,
  clientName,
  initialMessages
}: ClientMessageConversationProps): React.JSX.Element {
  const router = useRouter();
  const [pending, setPending] = React.useState<PendingMessage[]>([]);
  const [text, setText] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

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
        const match = initialMessages.some(
          (m) =>
            m.senderType === EmailSenderType.CONTACT &&
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

  const send = async (body: string): Promise<void> => {
    const trimmed = body.trim();
    if (!trimmed) return;

    const tempId = `pending-${Date.now()}-${Math.random()}`;
    setPending((prev) => [
      ...prev,
      {
        tempId,
        body: trimmed,
        createdAt: new Date(),
        state: 'sending'
      }
    ]);
    setText('');

    try {
      const result = await replyClientMessage({ threadId, body: trimmed });
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
            state={p.state}
            onRetry={p.state === 'failed' ? () => retry(p.tempId) : undefined}
          />
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(text);
        }}
        className="flex items-end gap-2 rounded-b-lg border border-t-0 bg-card p-3"
      >
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          maxLength={20000}
          placeholder="Write a message…  (Enter to send, Shift+Enter for new line)"
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
  onRetry
}: {
  authorName: string;
  authorEmail: string | null;
  authorIsClient: boolean;
  body: string;
  createdAt: Date;
  state?: 'sending' | 'sent' | 'failed';
  onRetry?: () => void;
}): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        authorIsClient ? 'items-end' : 'items-start'
      )}
    >
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
