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

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn, getInitials } from '@/lib/utils';
import type { ContactDto } from '@/types/dtos/contact-dto';

type Folder = 'inbox' | 'sent';

type EmailAvatar = {
  initials: string;
  className: string;
};

type EmailMessage = {
  who: string;
  when: string;
  avatar: EmailAvatar;
  me: boolean;
  body: React.ReactNode;
};

type EmailThread = {
  id: string;
  folder: Folder;
  subject: string;
  from: string;
  fromEmail: string;
  when: string;
  preview: string;
  unread: boolean;
  avatar: EmailAvatar;
  messages: EmailMessage[];
};

const meAvatar: EmailAvatar = {
  initials: 'AB',
  className: 'bg-amber-200 text-amber-900'
};

function buildInitialThreads(contact: ContactDto): EmailThread[] {
  const contactName = contact.name || 'Contact';
  const contactEmail = contact.email || 'contact@example.com';
  const contactAvatar: EmailAvatar = {
    initials: getInitials(contactName) || 'CN',
    className: 'bg-teal-700 text-white'
  };

  return [
    {
      id: 'proposal-q',
      folder: 'inbox',
      subject: 'Re: EDGEBI 5-seat license — proposal v2',
      from: contactName,
      fromEmail: contactEmail,
      when: '3h ago',
      preview: 'Looks good — just one question on the training day rate…',
      unread: true,
      avatar: contactAvatar,
      messages: [
        {
          who: contactName,
          when: '3 hours ago',
          avatar: contactAvatar,
          me: false,
          body: (
            <>
              Hi Alice,
              <br />
              <br />
              Looks good overall — just one question on the training day rate.
              Can you break out the 2 days of training as a separate line item?
              Procurement needs it that way.
              <br />
              <br />
              Also, can we add a clause for an additional seat in 6 months at
              the same per-seat rate?
              <br />
              <br />
              Thanks,
              <br />
              {contactName}
            </>
          )
        },
        {
          who: 'Alice (you)',
          when: 'Yesterday',
          avatar: meAvatar,
          me: true,
          body: (
            <>
              Hi {contactName.split(' ')[0]},
              <br />
              <br />
              Please find the updated proposal with the 5-seat license attached.
              I&apos;ve added 2 days of on-site training as we discussed.
              <br />
              <br />
              Let me know if you have any questions.
              <br />
              <br />
              Best,
              <br />
              Alice
            </>
          )
        }
      ]
    },
    {
      id: 'proposal-sent',
      folder: 'sent',
      subject: 'Proposal v2 attached',
      from: `Alice (you) → ${contactName.split(' ')[0]}`,
      fromEmail: 'alice@usersolutions.com',
      when: 'Yesterday',
      preview:
        'Hi ' +
        contactName.split(' ')[0] +
        ', please find the updated proposal with the 5-seat license…',
      unread: false,
      avatar: meAvatar,
      messages: [
        {
          who: 'Alice (you)',
          when: 'Yesterday',
          avatar: meAvatar,
          me: true,
          body: (
            <>
              Hi {contactName.split(' ')[0]},
              <br />
              <br />
              Please find the updated proposal with the 5-seat license attached.
              I&apos;ve added 2 days of on-site training as we discussed.
              <br />
              <br />
              📎 EDGEBI-proposal-v2.pdf (240 KB)
              <br />
              <br />
              Let me know if you have any questions.
              <br />
              <br />
              Best,
              <br />
              Alice
            </>
          )
        }
      ]
    },
    {
      id: 'follow-up',
      folder: 'inbox',
      subject: 'Following up on demo',
      from: contactName,
      fromEmail: contactEmail,
      when: '2 days ago',
      preview: 'Thanks for the demo today — when can we get pricing for 5 seats?',
      unread: false,
      avatar: contactAvatar,
      messages: [
        {
          who: contactName,
          when: '2 days ago',
          avatar: contactAvatar,
          me: false,
          body: (
            <>
              Hi Alice,
              <br />
              <br />
              Thanks for the demo today — really helpful. When can we get
              pricing for 5 seats? We&apos;d also need 2 days of on-site
              training for the team.
              <br />
              <br />
              Thanks,
              <br />
              {contactName}
            </>
          )
        }
      ]
    },
    {
      id: 'demo-invite',
      folder: 'sent',
      subject: 'EDGEBI demo — calendar invite',
      from: `Alice (you) → ${contactName.split(' ')[0]}`,
      fromEmail: 'alice@usersolutions.com',
      when: '3 days ago',
      preview:
        'Hi ' +
        contactName.split(' ')[0] +
        ', sending over the demo invite for tomorrow at 10 AM…',
      unread: false,
      avatar: meAvatar,
      messages: [
        {
          who: 'Alice (you)',
          when: '3 days ago',
          avatar: meAvatar,
          me: true,
          body: (
            <>
              Hi {contactName.split(' ')[0]},
              <br />
              <br />
              Sending over the demo invite for tomorrow at 10 AM PKT. We&apos;ll
              cover the heat-map view and drag-and-drop scheduling.
              <br />
              <br />
              📅 Google Meet link is in the calendar invite.
              <br />
              <br />
              Talk soon,
              <br />
              Alice
            </>
          )
        }
      ]
    }
  ];
}

export type ContactInboxTabProps = {
  contact: ContactDto;
};

export function ContactInboxTab({
  contact
}: ContactInboxTabProps): React.JSX.Element {
  const [threads, setThreads] = React.useState<EmailThread[]>(() =>
    buildInitialThreads(contact)
  );
  const [folder, setFolder] = React.useState<Folder>('inbox');
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [replyText, setReplyText] = React.useState<string>('');

  const inboxCount = threads.filter((t) => t.folder === 'inbox').length;
  const sentCount = threads.filter((t) => t.folder === 'sent').length;
  const visibleThreads = threads.filter((t) => t.folder === folder);
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

  const handleForward = (): void => {
    toast.info('Forward — coming soon');
  };

  const handleSaveDraft = (): void => {
    if (!replyText.trim()) return;
    toast.success('Draft saved');
  };

  const handleSendReply = (): void => {
    const body = replyText.trim();
    if (!body || !selectedThread) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === selectedThread.id
          ? {
              ...t,
              messages: [
                ...t.messages,
                {
                  who: 'Alice (you)',
                  when: 'Just now',
                  avatar: meAvatar,
                  me: true,
                  body: <span className="whitespace-pre-wrap">{body}</span>
                }
              ]
            }
          : t
      )
    );
    setReplyText('');
    toast.success('Reply sent');
  };

  const handleCompose = (): void => {
    toast.info('Compose — coming soon');
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
            onClick={handleCompose}
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

      {/* Body — list or reader */}
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
            threads={visibleThreads}
            onOpen={handleOpenThread}
          />
        )}
      </div>
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
  threads: EmailThread[];
  onOpen: (id: string) => void;
};

function ThreadList({
  threads,
  onOpen
}: ThreadListProps): React.JSX.Element {
  if (threads.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <InboxIcon className="size-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium">No emails</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Emails in this folder will appear here.
          </p>
        </div>
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
              <Avatar className={cn('size-8 rounded-full', thread.avatar.className)}>
                <AvatarFallback
                  className={cn(
                    'text-[11px] font-semibold',
                    thread.avatar.className
                  )}
                >
                  {thread.avatar.initials}
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
                    {thread.from}
                  </span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {thread.when}
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
          <Avatar className={cn('size-8 rounded-full', thread.avatar.className)}>
            <AvatarFallback
              className={cn(
                'text-[11px] font-semibold',
                thread.avatar.className
              )}
            >
              {thread.avatar.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium">
              {thread.from} &lt;{thread.fromEmail}&gt;
            </div>
            <div className="text-[11px] text-muted-foreground">
              to me · {thread.when}
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
          {thread.messages.map((message, idx) => (
            <div
              key={idx}
              className={cn(
                'rounded-lg border p-4',
                message.me ? 'bg-muted/40' : 'bg-background'
              )}
            >
              <div className="mb-2 flex items-center gap-2.5">
                <Avatar
                  className={cn('size-7 rounded-full', message.avatar.className)}
                >
                  <AvatarFallback
                    className={cn(
                      'text-[10px] font-semibold',
                      message.avatar.className
                    )}
                  >
                    {message.avatar.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <strong className="font-semibold">{message.who}</strong>
                  <span className="ml-1.5 text-muted-foreground">
                    · {message.when}
                  </span>
                </div>
              </div>
              <div className="text-sm leading-relaxed text-foreground/90">
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
          placeholder={`Reply to ${thread.from.split(' ')[0]}…`}
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
