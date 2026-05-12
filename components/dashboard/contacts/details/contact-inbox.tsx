'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { EmailFolder, EmailSenderType } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
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

import { deleteContactEmails } from '@/actions/contacts/delete-contact-emails';
import { markContactEmailRead } from '@/actions/contacts/mark-contact-email-read';
import { replyContactEmail } from '@/actions/contacts/reply-contact-email';
import { sendContactEmail } from '@/actions/contacts/send-contact-email';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import type {
  ContactEmailMessageDto,
  ContactEmailThreadDto
} from '@/types/dtos/contact-email-dto';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ProfileDto } from '@/types/dtos/profile-dto';

type FolderKey = 'INBOX' | 'SENT';

type ThreadParticipant = {
  name: string;
  email?: string;
  initials: string;
  image?: string;
};

function getThreadParticipant(
  thread: ContactEmailThreadDto,
  contact: ContactDto
): ThreadParticipant {
  if (thread.folder === EmailFolder.SENT) {
    const lastFromUser = [...thread.messages]
      .reverse()
      .find((m) => m.senderType === EmailSenderType.USER);
    const name = lastFromUser?.recipientName ?? contact.name ?? 'Recipient';
    const email = lastFromUser?.recipientEmail ?? contact.email ?? undefined;
    return {
      name,
      email,
      initials: getInitials(name) || 'TO',
      image: email === contact.email ? contact.image : undefined
    };
  }
  const lastFromContact = [...thread.messages]
    .reverse()
    .find((m) => m.senderType === EmailSenderType.CONTACT);
  const name =
    lastFromContact?.senderName ?? contact.name ?? 'Contact';
  const email =
    lastFromContact?.senderEmail ?? contact.email ?? undefined;
  return {
    name,
    email,
    initials: getInitials(name) || 'CN',
    image: contact.image
  };
}

function getMessageParticipant(
  message: ContactEmailMessageDto,
  profile: ProfileDto,
  contact: ContactDto
): ThreadParticipant {
  if (message.senderType === EmailSenderType.USER) {
    return {
      name: message.senderName || profile.name,
      email: message.senderEmail ?? profile.email,
      initials: getInitials(message.senderName || profile.name) || 'ME',
      image: message.senderImage ?? profile.image
    };
  }
  return {
    name: message.senderName || contact.name || 'Contact',
    email: message.senderEmail ?? contact.email ?? undefined,
    initials:
      getInitials(message.senderName || contact.name || 'Contact') || 'CN',
    image: contact.image
  };
}

function formatWhen(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

export type ContactInboxProps = {
  profile: ProfileDto;
  contact: ContactDto;
  initialThreads: ContactEmailThreadDto[];
};

export function ContactInbox({
  profile,
  contact,
  initialThreads
}: ContactInboxProps): React.JSX.Element {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  const [folder, setFolder] = React.useState<FolderKey>('INBOX');
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(
    () => new Set()
  );
  const [replyText, setReplyText] = React.useState<string>('');
  const [composeOpen, setComposeOpen] = React.useState<boolean>(false);
  const [composeDraft, setComposeDraft] = React.useState<{
    to: string;
    subject: string;
    body: string;
  }>({ to: contact.email || '', subject: '', body: '' });

  const inboxCount = initialThreads.filter(
    (t) => t.folder === EmailFolder.INBOX
  ).length;
  const sentCount = initialThreads.filter(
    (t) => t.folder === EmailFolder.SENT
  ).length;
  const visibleThreads = initialThreads.filter((t) => t.folder === folder);
  const selectedThread =
    initialThreads.find((t) => t.id === selectedId && t.folder === folder) ??
    null;
  const visibleSelectedIds = visibleThreads
    .map((t) => t.id)
    .filter((id) => selectedIds.has(id));
  const allVisibleSelected =
    visibleThreads.length > 0 &&
    visibleSelectedIds.length === visibleThreads.length;

  const handleSelectFolder = (next: FolderKey): void => {
    setFolder(next);
    setSelectedIds(new Set());
    if (selectedThread && selectedThread.folder !== next) {
      setSelectedId(null);
    }
  };

  const handleOpenThread = (id: string): void => {
    setSelectedId(id);
    setReplyText('');
    const thread = initialThreads.find((t) => t.id === id);
    if (thread?.unread) {
      startTransition(async () => {
        await markContactEmailRead({ threadId: id });
        router.refresh();
      });
    }
  };

  const handleBackToList = (): void => {
    setSelectedId(null);
    setReplyText('');
  };

  const handleToggleSelected = (id: string): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleSelectAll = (): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        for (const t of visibleThreads) next.delete(t.id);
      } else {
        for (const t of visibleThreads) next.add(t.id);
      }
      return next;
    });
  };

  const handleClearSelection = (): void => {
    setSelectedIds(new Set());
  };

  const handleDelete = (): void => {
    if (!selectedThread) return;
    const id = selectedThread.id;
    startTransition(async () => {
      const result = await deleteContactEmails({ ids: [id] });
      if (result?.serverError) {
        toast.error("Email couldn't be deleted");
        return;
      }
      setSelectedId(null);
      setReplyText('');
      setSelectedIds((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      toast.success('Email deleted');
      router.refresh();
    });
  };

  const handleBulkDelete = (): void => {
    if (visibleSelectedIds.length === 0) return;
    const ids = [...visibleSelectedIds];
    startTransition(async () => {
      const result = await deleteContactEmails({ ids });
      if (result?.serverError) {
        toast.error("Emails couldn't be deleted");
        return;
      }
      const toDelete = new Set(ids);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const id of toDelete) next.delete(id);
        return next;
      });
      if (selectedId && toDelete.has(selectedId)) {
        setSelectedId(null);
        setReplyText('');
      }
      toast.success(
        `${ids.length} email${ids.length === 1 ? '' : 's'} deleted`
      );
      router.refresh();
    });
  };

  const handleSendReply = (): void => {
    const body = replyText.trim();
    if (!body || !selectedThread) return;
    startTransition(async () => {
      const result = await replyContactEmail({
        threadId: selectedThread.id,
        body
      });
      if (result?.serverError) {
        toast.error("Reply couldn't be sent");
        return;
      }
      setReplyText('');
      toast.success('Reply sent');
      router.refresh();
    });
  };

  const handleSaveDraft = (): void => {
    if (!replyText.trim()) return;
    toast.success('Draft saved');
  };

  const openCompose = (initial?: Partial<typeof composeDraft>): void => {
    setComposeDraft({
      to: initial?.to ?? contact.email ?? '',
      subject: initial?.subject ?? '',
      body: initial?.body ?? ''
    });
    setComposeOpen(true);
  };

  const handleForward = (): void => {
    if (!selectedThread) return;
    const last = selectedThread.messages[selectedThread.messages.length - 1];
    const participant = getThreadParticipant(selectedThread, contact);
    const quoted = last
      ? `\n\n---------- Forwarded message ----------\nFrom: ${
          last.senderName
        }${last.senderEmail ? ` <${last.senderEmail}>` : ''}\nDate: ${last.createdAt.toLocaleString()}\nSubject: ${selectedThread.subject}\n\n${last.body}`
      : '';
    openCompose({
      to: participant.email ?? contact.email ?? '',
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
    startTransition(async () => {
      const result = await sendContactEmail({
        contactId: contact.id,
        to,
        subject,
        body
      });
      if (result?.serverError) {
        toast.error("Email couldn't be sent");
        return;
      }
      const newThreadId = result?.data?.threadId;
      setComposeOpen(false);
      setComposeDraft({ to: contact.email || '', subject: '', body: '' });
      setFolder('SENT');
      if (newThreadId) {
        setSelectedId(newThreadId);
      }
      toast.success('Email sent');
      router.refresh();
    });
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
            disabled={pending}
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
            active={folder === 'INBOX'}
            label="📥 Inbox"
            count={inboxCount}
            onClick={() => handleSelectFolder('INBOX')}
          />
          <SubTab
            active={folder === 'SENT'}
            label="📤 Sent"
            count={sentCount}
            onClick={() => handleSelectFolder('SENT')}
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {selectedThread ? (
          <ThreadReader
            thread={selectedThread}
            profile={profile}
            contact={contact}
            replyText={replyText}
            onReplyTextChange={setReplyText}
            onBack={handleBackToList}
            onForward={handleForward}
            onDelete={handleDelete}
            onSaveDraft={handleSaveDraft}
            onSendReply={handleSendReply}
            disabled={pending}
          />
        ) : (
          <ThreadList
            folder={folder}
            threads={visibleThreads}
            contact={contact}
            selectedIds={selectedIds}
            allSelected={allVisibleSelected}
            selectionCount={visibleSelectedIds.length}
            onOpen={handleOpenThread}
            onCompose={() => openCompose()}
            onToggleSelected={handleToggleSelected}
            onToggleSelectAll={handleToggleSelectAll}
            onClearSelection={handleClearSelection}
            onBulkDelete={handleBulkDelete}
            disabled={pending}
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
                disabled={pending}
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
                disabled={pending}
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
                disabled={pending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setComposeOpen(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSendCompose}
              disabled={
                pending ||
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
  folder: FolderKey;
  threads: ContactEmailThreadDto[];
  contact: ContactDto;
  selectedIds: Set<string>;
  allSelected: boolean;
  selectionCount: number;
  onOpen: (id: string) => void;
  onCompose: () => void;
  onToggleSelected: (id: string) => void;
  onToggleSelectAll: () => void;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  disabled: boolean;
};

function ThreadList({
  folder,
  threads,
  contact,
  selectedIds,
  allSelected,
  selectionCount,
  onOpen,
  onCompose,
  onToggleSelected,
  onToggleSelectAll,
  onClearSelection,
  onBulkDelete,
  disabled
}: ThreadListProps): React.JSX.Element {
  if (threads.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <InboxIcon className="size-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium">
            {folder === 'INBOX' ? 'Inbox is empty' : 'No sent emails'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {folder === 'INBOX'
              ? 'Replies to your emails will appear here.'
              : "Emails you've sent to this contact will appear here."}
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={onCompose}
          disabled={disabled}
        >
          + Compose
        </Button>
      </div>
    );
  }
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-2 border-b bg-background px-3.5 py-2">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
          <Checkbox
            checked={allSelected}
            onCheckedChange={onToggleSelectAll}
            aria-label="Select all emails"
            disabled={disabled}
          />
          {selectionCount > 0 ? (
            <span className="font-medium text-foreground">
              {selectionCount} selected
            </span>
          ) : (
            <span>Select all</span>
          )}
        </label>
        {selectionCount > 0 && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={onClearSelection}
              disabled={disabled}
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 border-destructive/30 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={onBulkDelete}
              disabled={disabled}
            >
              <TrashIcon className="mr-1 size-3.5 shrink-0" />
              Delete {selectionCount}
            </Button>
          </div>
        )}
      </div>
      <ScrollArea className="min-h-0 flex-1 bg-muted/30">
        <ul className="divide-y">
          {threads.map((thread) => {
            const isChecked = selectedIds.has(thread.id);
            const participant = getThreadParticipant(thread, contact);
            return (
              <li
                key={thread.id}
                className={cn(
                  'flex items-start gap-2.5 px-3.5 py-3 transition-colors hover:bg-accent/50',
                  isChecked && 'bg-accent/50'
                )}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => onToggleSelected(thread.id)}
                  aria-label={`Select email: ${thread.subject}`}
                  className="mt-1.5"
                  disabled={disabled}
                />
                <button
                  type="button"
                  onClick={() => onOpen(thread.id)}
                  className="flex min-w-0 flex-1 items-start gap-2.5 text-left"
                >
                  <Avatar className="size-8 shrink-0 rounded-full">
                    <AvatarImage
                      src={participant.image}
                      alt={participant.name}
                    />
                    <AvatarFallback className="text-[11px] font-semibold">
                      {participant.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
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
                        {thread.folder === EmailFolder.SENT
                          ? `You → ${participant.name}`
                          : participant.name}
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
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
}

type ThreadReaderProps = {
  thread: ContactEmailThreadDto;
  profile: ProfileDto;
  contact: ContactDto;
  replyText: string;
  onReplyTextChange: (next: string) => void;
  onBack: () => void;
  onForward: () => void;
  onDelete: () => void;
  onSaveDraft: () => void;
  onSendReply: () => void;
  disabled: boolean;
};

function ThreadReader({
  thread,
  profile,
  contact,
  replyText,
  onReplyTextChange,
  onBack,
  onForward,
  onDelete,
  onSaveDraft,
  onSendReply,
  disabled
}: ThreadReaderProps): React.JSX.Element {
  const participant = getThreadParticipant(thread, contact);
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
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
              src={participant.image}
              alt={participant.name}
            />
            <AvatarFallback className="text-[11px] font-semibold">
              {participant.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium">
              {participant.name}
              {participant.email && <> &lt;{participant.email}&gt;</>}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {thread.folder === EmailFolder.SENT ? 'Sent' : 'Received'} ·{' '}
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
              disabled={disabled}
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
              disabled={disabled}
            >
              <TrashIcon className="mr-1 size-3.5 shrink-0" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Thread */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-3 px-5 py-4">
          {thread.messages.map((message) => {
            const messageParticipant = getMessageParticipant(
              message,
              profile,
              contact
            );
            const isMe = message.senderType === EmailSenderType.USER;
            return (
              <div
                key={message.id}
                className={cn(
                  'rounded-lg border p-4',
                  isMe ? 'bg-muted/40' : 'bg-background'
                )}
              >
                <div className="mb-2 flex items-center gap-2.5">
                  <Avatar className="size-7 rounded-full">
                    <AvatarImage
                      src={messageParticipant.image}
                      alt={messageParticipant.name}
                    />
                    <AvatarFallback className="text-[10px] font-semibold">
                      {messageParticipant.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-xs">
                    <strong className="font-semibold">
                      {messageParticipant.name}
                    </strong>
                    <span className="ml-1.5 text-muted-foreground">
                      · {formatWhen(message.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                  {message.body}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Reply box */}
      <div className="border-t bg-muted/30 px-5 py-3">
        <Textarea
          value={replyText}
          onChange={(e) => onReplyTextChange(e.target.value)}
          placeholder={`Reply to ${participant.name.split(' ')[0]}…`}
          className="min-h-[70px] resize-y bg-background"
          disabled={disabled}
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
              disabled={disabled || !replyText.trim()}
            >
              Save draft
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={onSendReply}
              disabled={disabled || !replyText.trim()}
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
