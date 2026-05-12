'use client';

import * as React from 'react';
import {
  ArrowLeftIcon,
  ForwardIcon,
  InboxIcon,
  PaperclipIcon,
  SendIcon,
  SparklesIcon,
  TrashIcon
} from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn, getInitials } from '@/lib/utils';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ProfileDto } from '@/types/dtos/profile-dto';

type Folder = 'inbox' | 'sent';

type EmailParticipant = {
  name: string;
  email: string;
  initials: string;
  image?: string;
};

type EmailMessage = {
  id: string;
  who: string;
  when: Date;
  participant: EmailParticipant;
  me: boolean;
  body: string;
};

type EmailThread = {
  id: string;
  folder: Folder;
  subject: string;
  participant: EmailParticipant;
  preview: string;
  unread: boolean;
  updatedAt: Date;
  messages: EmailMessage[];
};

function formatWhen(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.round(diffMs / 60_000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay === 1) return 'Yesterday';
  if (diffDay < 7) return `${diffDay} days ago`;
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
}

export type ContactInboxProps = {
  profile: ProfileDto;
  contact: ContactDto;
};

export function ContactInbox({
  profile,
  contact
}: ContactInboxProps): React.JSX.Element {
  const me: EmailParticipant = React.useMemo(
    () => ({
      name: profile.name,
      email: profile.email ?? '',
      initials: getInitials(profile.name) || 'ME',
      image: profile.image
    }),
    [profile]
  );

  const contactParticipant: EmailParticipant = React.useMemo(
    () => ({
      name: contact.name || 'Contact',
      email: contact.email || '',
      initials: getInitials(contact.name || 'Contact') || 'CN',
      image: contact.image
    }),
    [contact]
  );

  const [threads, setThreads] = React.useState<EmailThread[]>([]);
  const [folder, setFolder] = React.useState<Folder>('inbox');
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [replyText, setReplyText] = React.useState<string>('');
  const [composeOpen, setComposeOpen] = React.useState<boolean>(false);
  const [composeDraft, setComposeDraft] = React.useState<{
    to: string;
    subject: string;
    body: string;
  }>({ to: contact.email || '', subject: '', body: '' });

  const inboxCount = threads.filter((t) => t.folder === 'inbox').length;
  const sentCount = threads.filter((t) => t.folder === 'sent').length;
  const visibleThreads = threads
    .filter((t) => t.folder === folder)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  const selectedThread =
    threads.find((t) => t.id === selectedId && t.folder === folder) ?? null;

  const handleSelectFolder = (next: Folder): void => {
    setFolder(next);
    if (selectedThread && selectedThread.folder !== next) {
      setSelectedId(null);
    }
  };

  const handleOpenThread = (id: string): void => {
    setSelectedId(id);
    setReplyText('');
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: false } : t))
    );
  };

  const handleBackToList = (): void => {
    setSelectedId(null);
    setReplyText('');
  };

  const handleDelete = (): void => {
    if (!selectedThread) return;
    const id = selectedThread.id;
    setThreads((prev) => prev.filter((t) => t.id !== id));
    setSelectedId(null);
    setReplyText('');
    toast.success('Email deleted');
  };

  const handleSendReply = (): void => {
    const body = replyText.trim();
    if (!body || !selectedThread) return;
    const now = new Date();
    setThreads((prev) =>
      prev.map((t) =>
        t.id === selectedThread.id
          ? {
              ...t,
              updatedAt: now,
              preview: body.slice(0, 140),
              messages: [
                ...t.messages,
                {
                  id: `${t.id}-${t.messages.length + 1}`,
                  who: me.name,
                  when: now,
                  participant: me,
                  me: true,
                  body
                }
              ]
            }
          : t
      )
    );
    setReplyText('');
    toast.success('Reply sent');
  };

  const handleSaveDraft = (): void => {
    if (!replyText.trim()) return;
    toast.success('Draft saved');
  };

  const openCompose = (
    initial?: Partial<typeof composeDraft>
  ): void => {
    setComposeDraft({
      to: initial?.to ?? contact.email ?? '',
      subject: initial?.subject ?? '',
      body: initial?.body ?? ''
    });
    setComposeOpen(true);
  };

  const handleForward = (): void => {
    if (!selectedThread) return;
    const original = selectedThread.messages[selectedThread.messages.length - 1];
    const quoted = original
      ? `\n\n---------- Forwarded message ----------\nFrom: ${original.participant.name} <${original.participant.email}>\nDate: ${original.when.toLocaleString()}\nSubject: ${selectedThread.subject}\n\n${original.body}`
      : '';
    openCompose({
      to: selectedThread.participant.email,
      subject: selectedThread.subject.startsWith('Fwd:')
        ? selectedThread.subject
        : `Fwd: ${selectedThread.subject}`,
      body: quoted
    });
  };

  const handleSendCompose = (): void => {
    const to = composeDraft.to.trim();
    const subject = composeDraft.subject.trim();
    const body = composeDraft.body.trim();
    if (!to || !subject || !body) return;
    const now = new Date();
    const id = `t-${now.getTime()}`;
    const recipient: EmailParticipant = {
      name: contact.name || to,
      email: to,
      initials: getInitials(contact.name || to) || 'TO',
      image: to === contact.email ? contact.image : undefined
    };
    const newThread: EmailThread = {
      id,
      folder: 'sent',
      subject,
      participant: recipient,
      preview: body.slice(0, 140),
      unread: false,
      updatedAt: now,
      messages: [
        {
          id: `${id}-1`,
          who: me.name,
          when: now,
          participant: me,
          me: true,
          body
        }
      ]
    };
    setThreads((prev) => [newThread, ...prev]);
    setFolder('sent');
    setSelectedId(id);
    setComposeOpen(false);
    setComposeDraft({ to: contact.email || '', subject: '', body: '' });
    toast.success('Email sent');
  };

  return (
    <div className="flex size-full flex-col overflow-hidden">
      {/* Panel header */}
      <div className="flex flex-col gap-3 border-b px-6 py-4">
        <div className="flex flex-row items-center justify-between gap-2">
          <h2 className="text-base font-semibold">Inbox</h2>
          <Button
            type="button"
            size="sm"
            onClick={() => openCompose()}
          >
            + Compose
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          All emails exchanged with {contact.name || 'this contact'}.
        </p>

        {/* Sub-tabs */}
        <div className="flex flex-row gap-1 border-b">
          <SubTab
            active={folder === 'inbox'}
            label="📥 Inbox"
            count={inboxCount}
            onClick={() => handleSelectFolder('inbox')}
          />
          <SubTab
            active={folder === 'sent'}
            label="📤 Sent"
            count={sentCount}
            onClick={() => handleSelectFolder('sent')}
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {selectedThread ? (
          <ThreadReader
            thread={selectedThread}
            replyText={replyText}
            onReplyTextChange={setReplyText}
            onBack={handleBackToList}
            onForward={handleForward}
            onDelete={handleDelete}
            onSaveDraft={handleSaveDraft}
            onSendReply={handleSendReply}
          />
        ) : (
          <ThreadList
            folder={folder}
            threads={visibleThreads}
            onOpen={handleOpenThread}
            onCompose={() => openCompose()}
          />
        )}
      </div>

      {/* Compose dialog */}
      <Dialog
        open={composeOpen}
        onOpenChange={setComposeOpen}
      >
        <DialogContent
          className="max-w-lg"
          onClose={() => setComposeOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>New email</DialogTitle>
            <DialogDescription>
              Compose a new email to {contact.name || 'this contact'}.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="compose-to"
                className="text-xs font-medium text-muted-foreground"
              >
                To
              </label>
              <Input
                id="compose-to"
                type="email"
                value={composeDraft.to}
                onChange={(e) =>
                  setComposeDraft((d) => ({ ...d, to: e.target.value }))
                }
                placeholder="recipient@example.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="compose-subject"
                className="text-xs font-medium text-muted-foreground"
              >
                Subject
              </label>
              <Input
                id="compose-subject"
                value={composeDraft.subject}
                onChange={(e) =>
                  setComposeDraft((d) => ({ ...d, subject: e.target.value }))
                }
                placeholder="Subject"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="compose-body"
                className="text-xs font-medium text-muted-foreground"
              >
                Message
              </label>
              <Textarea
                id="compose-body"
                rows={6}
                value={composeDraft.body}
                onChange={(e) =>
                  setComposeDraft((d) => ({ ...d, body: e.target.value }))
                }
                placeholder="Write your message…"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setComposeOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSendCompose}
              disabled={
                !composeDraft.to.trim() ||
                !composeDraft.subject.trim() ||
                !composeDraft.body.trim()
              }
            >
              <SendIcon className="mr-1 size-3.5 shrink-0" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

type SubTabProps = {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
};

function SubTab({
  active,
  label,
  count,
  onClick
}: SubTabProps): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        '-mb-px flex items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors',
        active
          ? 'border-foreground text-foreground'
          : 'border-transparent text-muted-foreground hover:text-foreground'
      )}
    >
      {label}
      <span
        className={cn(
          'rounded-full px-1.5 text-[11px] font-semibold',
          active
            ? 'bg-foreground text-background'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {count}
      </span>
    </button>
  );
}

type ThreadListProps = {
  folder: Folder;
  threads: EmailThread[];
  onOpen: (id: string) => void;
  onCompose: () => void;
};

function ThreadList({
  folder,
  threads,
  onOpen,
  onCompose
}: ThreadListProps): React.JSX.Element {
  if (threads.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <InboxIcon className="size-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium">
            {folder === 'inbox' ? 'Inbox is empty' : 'No sent emails'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {folder === 'inbox'
              ? 'Replies to your emails will appear here.'
              : "Emails you've sent to this contact will appear here."}
          </p>
        </div>
        {folder === 'sent' && (
          <Button
            type="button"
            size="sm"
            onClick={onCompose}
          >
            + Compose
          </Button>
        )}
      </div>
    );
  }
  return (
    <ScrollArea className="h-full bg-muted/30">
      <ul className="divide-y">
        {threads.map((thread) => (
          <li key={thread.id}>
            <button
              type="button"
              onClick={() => onOpen(thread.id)}
              className="grid w-full grid-cols-[32px_1fr] items-start gap-2.5 px-3.5 py-3 text-left transition-colors hover:bg-accent/50"
            >
              <Avatar className="size-8 rounded-full">
                <AvatarImage
                  src={thread.participant.image}
                  alt={thread.participant.name}
                />
                <AvatarFallback className="text-[11px] font-semibold">
                  {thread.participant.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      'flex items-center gap-1.5 truncate text-xs',
                      thread.unread
                        ? 'font-bold text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {thread.unread && (
                      <span className="size-2 shrink-0 rounded-full bg-blue-600" />
                    )}
                    {thread.folder === 'sent'
                      ? `You → ${thread.participant.name}`
                      : thread.participant.name}
                  </span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {formatWhen(thread.updatedAt)}
                  </span>
                </div>
                <div className="mt-0.5 truncate text-xs font-medium text-foreground">
                  {thread.subject}
                </div>
                <div className="mt-0.5 truncate text-xs text-muted-foreground">
                  {thread.preview}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}

type ThreadReaderProps = {
  thread: EmailThread;
  replyText: string;
  onReplyTextChange: (next: string) => void;
  onBack: () => void;
  onForward: () => void;
  onDelete: () => void;
  onSaveDraft: () => void;
  onSendReply: () => void;
};

function ThreadReader({
  thread,
  replyText,
  onReplyTextChange,
  onBack,
  onForward,
  onDelete,
  onSaveDraft,
  onSendReply
}: ThreadReaderProps): React.JSX.Element {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Reader head */}
      <div className="border-b px-5 py-4">
        <button
          type="button"
          onClick={onBack}
          className="mb-2 flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ArrowLeftIcon className="size-3.5 shrink-0" />
          Back to inbox
        </button>
        <h3 className="text-base font-semibold">{thread.subject}</h3>
        <div className="mt-2 flex items-center gap-2.5">
          <Avatar className="size-8 rounded-full">
            <AvatarImage
              src={thread.participant.image}
              alt={thread.participant.name}
            />
            <AvatarFallback className="text-[11px] font-semibold">
              {thread.participant.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium">
              {thread.participant.name}
              {thread.participant.email && (
                <> &lt;{thread.participant.email}&gt;</>
              )}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {thread.folder === 'sent' ? 'from me · ' : 'to me · '}
              {formatWhen(thread.updatedAt)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={onForward}
            >
              <ForwardIcon className="mr-1 size-3.5 shrink-0" />
              Forward
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 border-destructive/30 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={onDelete}
            >
              <TrashIcon className="mr-1 size-3.5 shrink-0" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Thread */}
      <ScrollArea className="flex-1">
        <div className="space-y-3 px-5 py-4">
          {thread.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'rounded-lg border p-4',
                message.me ? 'bg-muted/40' : 'bg-background'
              )}
            >
              <div className="mb-2 flex items-center gap-2.5">
                <Avatar className="size-7 rounded-full">
                  <AvatarImage
                    src={message.participant.image}
                    alt={message.participant.name}
                  />
                  <AvatarFallback className="text-[10px] font-semibold">
                    {message.participant.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <strong className="font-semibold">{message.who}</strong>
                  <span className="ml-1.5 text-muted-foreground">
                    · {formatWhen(message.when)}
                  </span>
                </div>
              </div>
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                {message.body}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Reply box */}
      <div className="border-t bg-muted/30 px-5 py-3">
        <Textarea
          value={replyText}
          onChange={(e) => onReplyTextChange(e.target.value)}
          placeholder={`Reply to ${thread.participant.name.split(' ')[0]}…`}
          className="min-h-[70px] resize-y bg-background"
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <PaperclipIcon className="size-3.5 shrink-0" />
              Attach
            </span>
            <span className="flex items-center gap-1">
              <SparklesIcon className="size-3.5 shrink-0" />
              Snippet
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onSaveDraft}
              disabled={!replyText.trim()}
            >
              Save draft
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={onSendReply}
              disabled={!replyText.trim()}
            >
              <SendIcon className="mr-1 size-3.5 shrink-0" />
              Send reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
