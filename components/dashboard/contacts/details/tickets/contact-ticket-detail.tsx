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
  CheckCircle2Icon,
  MessageSquareIcon,
  StickyNoteIcon
} from 'lucide-react';
import { toast } from 'sonner';

import { addContactTicketMessage } from '@/actions/contacts/add-contact-ticket-message';
import { updateContactTicket } from '@/actions/contacts/update-contact-ticket';
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
    <div className="flex min-h-0 flex-1 flex-col gap-4 p-6">
      <p className="shrink-0 text-xs text-muted-foreground">
        Created {format(ticket.createdAt, 'MMM d, yyyy · h:mm a')}
        {' · '}
        {ticket.assigneeName
          ? `Assigned to ${ticket.assigneeName}`
          : 'Unassigned'}
      </p>

      {ticket.description && (
        <section className="shrink-0 rounded-lg border bg-muted/30 p-4">
          <h3 className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
            Description
          </h3>
          <p className="whitespace-pre-wrap text-sm text-foreground/90">
            {ticket.description}
          </p>
        </section>
      )}

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

function ConversationPanel({
  ticket,
  contact,
  messages,
  onSent
}: ConversationPanelProps): React.JSX.Element {
  const [text, setText] = React.useState('');
  const [pending, startTransition] = React.useTransition();
  const [resolving, startResolving] = React.useTransition();

  const handleSend = (): void => {
    const body = text.trim();
    if (!body) return;
    startTransition(async () => {
      const result = await addContactTicketMessage({
        ticketId: ticket.id,
        body,
        isInternalNote: false
      });
      if (result?.serverError) {
        toast.error("Couldn't send reply");
        return;
      }
      setText('');
      toast.success('Reply sent');
      onSent();
    });
  };

  const handleMarkResolved = (): void => {
    startResolving(async () => {
      const result = await updateContactTicket({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description ?? '',
        status: ContactTicketStatus.RESOLVED,
        priority: ticket.priority,
        assigneeUserId: ticket.assigneeUserId ?? null
      });
      if (result?.serverError) {
        toast.error("Couldn't mark resolved");
        return;
      }
      toast.success('Ticket marked resolved');
      onSent();
    });
  };

  const alreadyResolved =
    ticket.status === ContactTicketStatus.RESOLVED ||
    ticket.status === ContactTicketStatus.CLOSED;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border">
      <header className="flex shrink-0 flex-row items-center justify-between gap-2 border-b px-4 py-3">
        <h2 className="text-sm font-semibold">
          Conversation with {contact.name}
        </h2>
        {!alreadyResolved && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleMarkResolved}
            disabled={resolving}
          >
            <CheckCircle2Icon className="mr-1 size-3.5 shrink-0" />
            Mark resolved
          </Button>
        )}
      </header>
      <div className="shrink-0 bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
        👁️ The customer can see everything in this tab.
      </div>
      <ul className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {ticket.description && (
          <DescriptionBubble
            description={ticket.description}
            contactName={contact.name}
            createdAt={ticket.createdAt}
          />
        )}
        {messages.length === 0 && !ticket.description && (
          <li className="py-4 text-center text-sm text-muted-foreground">
            No replies yet.
          </li>
        )}
        {messages.map((m) => (
          <MessageBubble
            key={m.id}
            message={m}
            contactName={contact.name}
          />
        ))}
      </ul>
      <div className="flex shrink-0 gap-2 border-t p-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Reply to ${contact.name?.split(' ')[0] ?? 'the customer'}…`}
          className="min-h-[60px] resize-y"
          disabled={pending}
        />
        <Button
          type="button"
          onClick={handleSend}
          disabled={pending || !text.trim()}
          className="self-end"
        >
          Send
        </Button>
      </div>
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
  return (
    <li
      className={cn(
        'flex flex-col gap-1',
        isUser ? 'items-end' : 'items-start'
      )}
    >
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
      <div className="text-[11px] text-muted-foreground">
        {isUser ? message.senderName : (contactName ?? message.senderName)} ·{' '}
        {format(message.createdAt, 'h:mm a · MMM d')}
      </div>
    </li>
  );
}

function DescriptionBubble({
  description,
  contactName,
  createdAt
}: {
  description: string;
  contactName: string;
  createdAt: Date;
}): React.JSX.Element {
  return (
    <li className="flex flex-col items-start gap-1">
      <div className="max-w-[75%] rounded-2xl rounded-tl-sm border border-dashed bg-muted/40 px-4 py-2.5 text-sm">
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <div className="text-[11px] text-muted-foreground">
        {contactName} · opened the ticket ·{' '}
        {format(createdAt, 'h:mm a · MMM d')}
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
            @ mention a teammate to notify them
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
