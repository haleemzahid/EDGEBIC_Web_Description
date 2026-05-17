'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  ContactTicketActivityType,
  ContactTicketStatus,
  TicketMessageSender
} from '@prisma/client';
import { format, formatDistanceToNow } from 'date-fns';
import {
  AlertCircleIcon,
  CheckIcon,
  ClockIcon,
  MessageSquareIcon,
  PaperclipIcon,
  SendIcon,
  StickyNoteIcon
} from 'lucide-react';
import { toast } from 'sonner';

import { addContactTicketMessage } from '@/actions/contacts/add-contact-ticket-message';
import {
  AttachmentPreview,
  StagedAttachmentChip,
  type StagedAttachmentItem
} from '@/components/dashboard/ticket-attachment-ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn, getInitials } from '@/lib/utils';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type {
  ContactTicketActivityDto,
  ContactTicketMessageDto,
  ContactTicketWithDetailsDto
} from '@/types/dtos/contact-ticket-dto';

export type ContactTicketDetailProps = {
  contact: ContactDto;
  ticket: ContactTicketWithDetailsDto;
};

function activityIcon(
  type: ContactTicketActivityType
): React.ReactNode {
  switch (type) {
    case ContactTicketActivityType.CREATED:
      return '🎫';
    case ContactTicketActivityType.ASSIGNED:
      return '👤';
    case ContactTicketActivityType.STATUS_CHANGED:
      return '🔄';
    case ContactTicketActivityType.PRIORITY_CHANGED:
      return '⚡';
    case ContactTicketActivityType.REPLIED:
      return '💬';
    case ContactTicketActivityType.NOTE_ADDED:
      return '📝';
  }
}

export function ContactTicketDetail({
  contact,
  ticket
}: ContactTicketDetailProps): React.JSX.Element {
  const router = useRouter();
  const conversationMessages = ticket.messages.filter((m) => !m.isInternalNote);
  const internalNotes = ticket.messages.filter((m) => m.isInternalNote);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 py-3">
      <Tabs
        defaultValue="conversation"
        className="flex min-h-0 w-full flex-1 flex-col"
      >
        <TabsList className="w-full justify-start rounded-md border bg-card p-1">
          <TabsTrigger
            value="conversation"
            className="text-xs"
          >
            <MessageSquareIcon className="mr-1.5 size-3.5 shrink-0" />
            Conversation
            <span className="ml-1.5 rounded-full bg-muted px-1.5 text-[10px] font-semibold">
              {conversationMessages.length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className="text-xs"
          >
            <StickyNoteIcon className="mr-1.5 size-3.5 shrink-0" />
            Internal notes
            <span className="ml-1.5 rounded-full bg-muted px-1.5 text-[10px] font-semibold">
              {internalNotes.length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="log"
            className="text-xs"
          >
            <AlertCircleIcon className="mr-1.5 size-3.5 shrink-0" />
            Activity
            <span className="ml-1.5 rounded-full bg-muted px-1.5 text-[10px] font-semibold">
              {ticket.activities.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="conversation"
          className="mt-4 min-h-0 flex-1 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <ConversationPanel
            ticket={ticket}
            contact={contact}
            messages={conversationMessages}
            onSent={() => router.refresh()}
          />
        </TabsContent>

        <TabsContent
          value="notes"
          className="mt-4 min-h-0 flex-1 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <NotesPanel
            ticketId={ticket.id}
            notes={internalNotes}
            onSent={() => router.refresh()}
          />
        </TabsContent>

        <TabsContent
          value="log"
          className="mt-4 min-h-0 flex-1 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <ActivityPanel activities={ticket.activities} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

type ConversationPanelProps = {
  ticket: ContactTicketWithDetailsDto;
  contact: ContactDto;
  messages: ContactTicketMessageDto[];
  onSent: () => void;
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

type PendingAdminMessage = {
  tempId: string;
  body: string;
  attachments: UploadedAttachment[];
  createdAt: Date;
  state: 'sending' | 'sent' | 'failed';
};

const MAX_ADMIN_ATTACHMENTS = 5;

function ConversationPanel({
  ticket,
  contact,
  messages,
  onSent
}: ConversationPanelProps): React.JSX.Element {
  const [text, setText] = React.useState('');
  const [pendingMessages, setPendingMessages] = React.useState<PendingAdminMessage[]>([]);
  const [staged, setStaged] = React.useState<StagedAttachment[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const listRef = React.useRef<HTMLUListElement | null>(null);

  // Keep the latest message in view — same behaviour as the client-side
  // conversation, which the admin panel was missing.
  React.useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, pendingMessages.length]);

  // Background poll for incoming client replies (no manual refresh needed).
  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        onSent();
      }
    }, 5000);
    return () => window.clearInterval(id);
  }, [onSent]);

  // Drop optimistic entries the moment their server-confirmed twin appears.
  React.useEffect(() => {
    if (pendingMessages.length === 0) return;
    setPendingMessages((prev) =>
      prev.filter((p) => {
        if (p.state !== 'sent') return true;
        const match = messages.some(
          (m) =>
            m.senderType === TicketMessageSender.USER &&
            m.body === p.body &&
            Math.abs(m.createdAt.getTime() - p.createdAt.getTime()) < 30_000
        );
        return !match;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const uploadFiles = async (files: File[]): Promise<void> => {
    const room = MAX_ADMIN_ATTACHMENTS - staged.length;
    if (room <= 0) {
      toast.error(`Maximum ${MAX_ADMIN_ATTACHMENTS} files per message`);
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
        fd.append('ticketId', ticket.id);
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
          const data = (await res.json()) as { attachments: UploadedAttachment[] };
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

  const sendBody = async (body: string): Promise<void> => {
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
    setPendingMessages((prev) => [
      ...prev,
      {
        tempId,
        body: trimmed,
        attachments: readyAttachments,
        createdAt: new Date(),
        state: 'sending'
      }
    ]);
    setText('');
    setStaged([]);
    try {
      const result = await addContactTicketMessage({
        ticketId: ticket.id,
        body: trimmed,
        isInternalNote: false,
        attachments: readyAttachments
      });
      if (result?.serverError) {
        setPendingMessages((prev) =>
          prev.map((p) =>
            p.tempId === tempId ? { ...p, state: 'failed' } : p
          )
        );
        toast.error(result.serverError ?? "Couldn't send reply");
        return;
      }
      setPendingMessages((prev) =>
        prev.map((p) => (p.tempId === tempId ? { ...p, state: 'sent' } : p))
      );
      onSent();
    } catch (error) {
      setPendingMessages((prev) =>
        prev.map((p) =>
          p.tempId === tempId ? { ...p, state: 'failed' } : p
        )
      );
      toast.error(
        error instanceof Error ? error.message : "Couldn't send reply"
      );
    }
  };

  const handleSend = (): void => {
    void sendBody(text);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendBody(text);
    }
  };

  const retry = (tempId: string): void => {
    const msg = pendingMessages.find((p) => p.tempId === tempId);
    if (!msg) return;
    setPendingMessages((prev) => prev.filter((p) => p.tempId !== tempId));
    setText(msg.body);
  };

  const canSubmit =
    (text.trim().length > 0 || staged.some((s) => s.state === 'uploaded')) &&
    !staged.some((s) => s.state === 'uploading');

  const isClosed = ticket.status === ContactTicketStatus.CLOSED;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border">
      {ticket.status === ContactTicketStatus.RESOLVED && (
        <div className="flex shrink-0 items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
          <ClockIcon className="size-3.5 shrink-0" />
          <span>
            Awaiting customer confirmation. {contact.name?.split(' ')[0] ?? 'The customer'} will close the ticket when they confirm it&apos;s resolved.
          </span>
        </div>
      )}
      <ul
        ref={listRef}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {messages.length === 0 && pendingMessages.length === 0 && (
          <li className="py-4 text-center text-sm text-muted-foreground">
            No replies yet. The ticket description is in “View details”.
          </li>
        )}
        {messages.map((m) => (
          <MessageBubble
            key={m.id}
            message={m}
            contactName={contact.name}
          />
        ))}
        {pendingMessages.map((p) => (
          <PendingBubble
            key={p.tempId}
            body={p.body}
            createdAt={p.createdAt}
            state={p.state}
            attachments={p.attachments.map((a, i) => ({
              id: `${p.tempId}-${i}`,
              fileName: a.fileName,
              storedName: a.storedName,
              mimeType: a.mimeType,
              sizeBytes: a.sizeBytes
            }))}
            onRetry={() => retry(p.tempId)}
          />
        ))}
      </ul>
      {isClosed ? (
        <div className="shrink-0 border-t bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
          🔒 This ticket is closed. The customer can reopen it from their
          support page if they need more help.
        </div>
      ) : (
        <>
          {staged.length > 0 && (
            <div className="flex shrink-0 flex-wrap gap-2 border-t bg-muted/40 p-2">
              {staged.map((s) => (
                <StagedAttachmentChip
                  key={s.tempId}
                  item={s}
                  onRemove={() => removeStaged(s.tempId)}
                />
              ))}
            </div>
          )}
          <div className="flex shrink-0 items-end gap-2 border-t p-3">
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
              disabled={staged.length >= MAX_ADMIN_ATTACHMENTS}
            >
              <PaperclipIcon className="size-4" />
            </Button>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              maxLength={20000}
              placeholder={`Reply to ${contact.name?.split(' ')[0] ?? 'the customer'}…  (Enter to send, Shift+Enter for new line)`}
              className="max-h-40 min-h-[44px] flex-1 resize-none"
            />
            <Button
              type="button"
              onClick={handleSend}
              disabled={!canSubmit}
              size="icon"
              className="size-11 shrink-0"
              title="Send"
            >
              <SendIcon className="size-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function MessageBubble({
  message,
  contactName
}: {
  message: ContactTicketMessageDto;
  contactName: string;
}): React.JSX.Element {
  const isUser = message.senderType === TicketMessageSender.USER;
  const hasBody = message.body.length > 0;
  return (
    <li
      className={cn(
        'flex flex-col gap-1',
        isUser ? 'items-end' : 'items-start'
      )}
    >
      {hasBody && (
        <div
          className={cn(
            'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm',
            isUser
              ? 'rounded-tr-sm bg-foreground text-background'
              : 'rounded-tl-sm bg-muted text-foreground'
          )}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.body}
          </p>
        </div>
      )}
      {message.attachments.length > 0 && (
        <div
          className={cn(
            'flex max-w-[75%] flex-col gap-2',
            isUser ? 'items-end' : 'items-start'
          )}
        >
          {message.attachments.map((a) => (
            <AttachmentPreview
              key={a.id}
              attachment={a}
              alignEnd={isUser}
            />
          ))}
        </div>
      )}
      <div className="text-[11px] text-muted-foreground">
        {isUser ? message.senderName : (contactName ?? message.senderName)} ·{' '}
        {format(message.createdAt, 'h:mm a · MMM d')}
      </div>
    </li>
  );
}

function PendingBubble({
  body,
  createdAt,
  state,
  attachments,
  onRetry
}: {
  body: string;
  createdAt: Date;
  state: 'sending' | 'sent' | 'failed';
  attachments: Array<{
    id: string;
    fileName: string;
    storedName: string;
    mimeType: string;
    sizeBytes: number;
  }>;
  onRetry: () => void;
}): React.JSX.Element {
  const hasBody = body.length > 0;
  return (
    <li className="flex flex-col items-end gap-1">
      {hasBody && (
        <div
          className={cn(
            'max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm',
            'bg-foreground text-background',
            state === 'failed' && 'opacity-80 ring-1 ring-rose-300'
          )}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{body}</p>
          <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-background/70">
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
        </div>
      )}
      {attachments.length > 0 && (
        <div className="flex max-w-[75%] flex-col items-end gap-2">
          {attachments.map((a) => (
            <AttachmentPreview
              key={a.id}
              attachment={a}
              alignEnd
            />
          ))}
        </div>
      )}
      <div className="text-[11px] text-muted-foreground">
        You · {format(createdAt, 'h:mm a · MMM d')}
      </div>
    </li>
  );
}


type NotesPanelProps = {
  ticketId: string;
  notes: ContactTicketMessageDto[];
  onSent: () => void;
};

function NotesPanel({
  ticketId,
  notes,
  onSent
}: NotesPanelProps): React.JSX.Element {
  const [text, setText] = React.useState('');
  const [pending, startTransition] = React.useTransition();

  const handleSave = (): void => {
    const body = text.trim();
    if (!body) return;
    startTransition(async () => {
      const result = await addContactTicketMessage({
        ticketId,
        body,
        isInternalNote: true
      });
      if (result?.serverError) {
        toast.error("Couldn't save note");
        return;
      }
      setText('');
      toast.success('Note saved');
      onSent();
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border">
      <header className="flex shrink-0 flex-row items-center justify-between gap-2 border-b px-4 py-3">
        <h2 className="text-sm font-semibold">🔒 Internal notes</h2>
        <span className="text-xs text-muted-foreground">
          Only your team can see these. Customer never sees them.
        </span>
      </header>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {notes.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No internal notes yet.
          </p>
        ) : (
          notes.map((n) => (
            <div
              key={n.id}
              className="rounded-lg border border-amber-200 bg-amber-50/70 p-3"
            >
              <div className="flex items-center gap-2">
                <Avatar className="size-6 rounded-full">
                  <AvatarImage
                    src={n.senderImage}
                    alt={n.senderName}
                  />
                  <AvatarFallback className="text-[10px] font-semibold">
                    {getInitials(n.senderName)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <strong className="font-semibold text-amber-900">
                    {n.senderName}
                  </strong>
                  <span className="ml-1.5 text-amber-700">
                    · {format(n.createdAt, 'h:mm a · MMM d')}
                  </span>
                </div>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm text-amber-900">
                {n.body}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="shrink-0 border-t border-amber-200 bg-amber-50/40 p-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add an internal note (only your team will see)…"
          className="min-h-[60px] resize-y border-amber-200 bg-amber-50/40"
          disabled={pending}
        />
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-xs text-amber-800">
            Saved to the ticket · visible to your team only
          </span>
          <Button
            type="button"
            onClick={handleSave}
            disabled={pending || !text.trim()}
            size="sm"
          >
            Save note
          </Button>
        </div>
      </div>
    </div>
  );
}

function ActivityPanel({
  activities
}: {
  activities: ContactTicketActivityDto[];
}): React.JSX.Element {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border">
      <header className="flex shrink-0 flex-row items-center justify-between gap-2 border-b px-4 py-3">
        <h2 className="text-sm font-semibold">⚡ Activity log</h2>
        <span className="text-xs text-muted-foreground">
          Auto-recorded · cannot be edited
        </span>
      </header>
      {activities.length === 0 ? (
        <p className="px-4 py-6 text-center text-sm text-muted-foreground">
          No activity yet.
        </p>
      ) : (
        <ul className="min-h-0 flex-1 divide-y overflow-y-auto">
          {activities.map((a) => (
            <li
              key={a.id}
              className="grid grid-cols-[28px_1fr_auto] items-center gap-3 px-4 py-3 text-sm"
            >
              <div className="flex size-7 items-center justify-center rounded-full bg-muted text-sm">
                {activityIcon(a.type)}
              </div>
              <div>
                <span className="font-medium">{a.userName ?? 'System'}</span>{' '}
                <span className="text-muted-foreground">
                  {a.description}
                </span>
              </div>
              <time className="whitespace-nowrap text-[11px] text-muted-foreground">
                {formatDistanceToNow(a.createdAt, { addSuffix: true })}
              </time>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
