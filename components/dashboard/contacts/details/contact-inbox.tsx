'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { EmailFolder, EmailSenderType } from '@prisma/client';
import { format, isThisYear, isToday } from 'date-fns';
import {
  ArrowLeftIcon,
  ForwardIcon,
  ImageIcon,
  InboxIcon,
  Link2Icon,
  MoreVerticalIcon,
  PaperclipIcon,
  PrinterIcon,
  RemoveFormattingIcon,
  SendIcon,
  SmileIcon,
  TrashIcon
} from 'lucide-react';
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  type EmojiClickData
} from 'emoji-picker-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { deleteContactEmails } from '@/actions/contacts/delete-contact-emails';
import { markContactEmailRead } from '@/actions/contacts/mark-contact-email-read';
import { replyContactEmail } from '@/actions/contacts/reply-contact-email';
import { sendContactEmail } from '@/actions/contacts/send-contact-email';
import { dismissContactNotifications } from '@/actions/notifications/dismiss-contact-notifications';
import {
  AttachmentPreview,
  StagedAttachmentChip,
  type StagedAttachmentItem,
  type TicketAttachmentView
} from '@/components/dashboard/ticket-attachment-ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ComposeEditor } from '@/components/ui/compose-editor';
import { ComposeWindow } from '@/components/ui/compose-window';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { RecipientField } from '@/components/ui/recipient-field';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  appendEmojiToHtml,
  appendHtmlToBody,
  escapeHtml,
  htmlHasContent,
  htmlToPlainParagraphs,
  isHtmlBody
} from '@/lib/email/compose-html';
import { cn, getInitials } from '@/lib/utils';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type {
  ContactEmailMessageDto,
  ContactEmailThreadDto
} from '@/types/dtos/contact-email-dto';
import type { ProfileDto } from '@/types/dtos/profile-dto';

type FolderKey = 'INBOX' | 'SENT';

type UploadedAttachment = {
  storedName: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
};

type StagedAttachment = StagedAttachmentItem & {
  uploaded?: UploadedAttachment;
};

const MAX_REPLY_ATTACHMENTS = 5;

const draftStorageKey = (contactId: string): string =>
  `compose-draft:${contactId}`;

// Reuse zod (the project's validation lib) for email checks instead of a
// hand-rolled regex.
const emailSchema = z.string().trim().email();
const isEmail = (value: string): boolean =>
  emailSchema.safeParse(value).success;

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
  const name = lastFromContact?.senderName ?? contact.name ?? 'Contact';
  const email = lastFromContact?.senderEmail ?? contact.email ?? undefined;
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
  // Gmail-style: time-only for today, "Mon D" for this year, "M/D/YY" otherwise.
  if (isToday(date)) {
    return format(date, 'h:mm a');
  }
  if (isThisYear(date)) {
    return format(date, 'MMM d');
  }
  return format(date, 'M/d/yy');
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
  // Remounts the seed-once reply editor (on thread open / back / send).
  const [replyEditorKey, setReplyEditorKey] = React.useState<number>(0);
  const [stagedReply, setStagedReply] = React.useState<StagedAttachment[]>([]);
  const [composeOpen, setComposeOpen] = React.useState<boolean>(false);
  const [showCc, setShowCc] = React.useState<boolean>(false);
  const [showBcc, setShowBcc] = React.useState<boolean>(false);
  // Gmail hides the formatting toolbar until "Aa" is clicked.
  const [showFormatting, setShowFormatting] = React.useState<boolean>(false);
  // Bumped to force the seed-once rich-text editor to remount & re-read the
  // body (on open, forward, draft-restore, emoji insert).
  const [composeEditorKey, setComposeEditorKey] = React.useState<number>(0);
  const [composeDraft, setComposeDraft] = React.useState<{
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string;
    body: string;
  }>({
    to: contact.email ? [contact.email] : [],
    cc: [],
    bcc: [],
    subject: '',
    body: ''
  });
  const [stagedCompose, setStagedCompose] = React.useState<StagedAttachment[]>(
    []
  );
  const composeFileInputRef = React.useRef<HTMLInputElement | null>(null);
  const composeImageInputRef = React.useRef<HTMLInputElement | null>(null);
  // Gmail's "Insert link" popover state.
  const [linkOpen, setLinkOpen] = React.useState<boolean>(false);
  const [linkUrl, setLinkUrl] = React.useState<string>('');
  const [linkText, setLinkText] = React.useState<string>('');

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
    setReplyEditorKey((k) => k + 1);
    setStagedReply([]);
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
    setReplyEditorKey((k) => k + 1);
    setStagedReply([]);
  };

  const uploadReplyFiles = async (files: File[]): Promise<void> => {
    if (!selectedThread) return;
    const room = MAX_REPLY_ATTACHMENTS - stagedReply.length;
    if (room <= 0) {
      toast.error(`Maximum ${MAX_REPLY_ATTACHMENTS} files per reply`);
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
    setStagedReply((prev) => [...prev, ...items]);
    await Promise.all(
      items.map(async (item) => {
        const fd = new FormData();
        fd.append('threadId', selectedThread.id);
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
          setStagedReply((prev) =>
            prev.map((s) =>
              s.tempId === item.tempId
                ? { ...s, state: 'uploaded', uploaded }
                : s
            )
          );
        } catch (error) {
          const msg = error instanceof Error ? error.message : 'Upload failed';
          setStagedReply((prev) =>
            prev.map((s) =>
              s.tempId === item.tempId
                ? { ...s, state: 'failed', error: msg }
                : s
            )
          );
          toast.error(`${item.file.name}: ${msg}`);
        }
      })
    );
  };

  const removeStagedReply = (tempId: string): void => {
    setStagedReply((prev) => prev.filter((s) => s.tempId !== tempId));
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
    if (!selectedThread) return;
    const readyAttachments = stagedReply
      .filter((s) => s.state === 'uploaded' && s.uploaded)
      .map((s) => s.uploaded as UploadedAttachment);
    if (!htmlHasContent(replyText) && readyAttachments.length === 0) return;
    if (stagedReply.some((s) => s.state === 'uploading')) {
      toast.error('Please wait for uploads to finish');
      return;
    }
    startTransition(async () => {
      const result = await replyContactEmail({
        threadId: selectedThread.id,
        body: replyText,
        attachments: readyAttachments
      });
      if (result?.serverError) {
        toast.error("Reply couldn't be sent");
        return;
      }
      setReplyText('');
      setReplyEditorKey((k) => k + 1);
      setStagedReply([]);
      toast.success('Reply sent');
      router.refresh();
    });
  };

  // Viewing the contact's Inbox = reading their messages: clear this
  // contact's unread "message" activity badge on the Contacts table
  // automatically. Scoped to the signed-in user inside the action.
  React.useEffect(() => {
    void dismissContactNotifications({
      contactId: contact.id,
      type: 'MESSAGE'
    });
  }, [contact.id]);

  // Persist the draft so closing/minimizing or a reload doesn't lose it.
  React.useEffect(() => {
    if (!composeOpen || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        draftStorageKey(contact.id),
        JSON.stringify({
          to: composeDraft.to,
          cc: composeDraft.cc,
          bcc: composeDraft.bcc,
          subject: composeDraft.subject,
          body: composeDraft.body
        })
      );
    } catch {
      // storage full / unavailable — drafting still works in-memory
    }
  }, [composeOpen, composeDraft, contact.id]);

  const clearSavedDraft = (): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(draftStorageKey(contact.id));
    } catch {
      // ignore
    }
  };

  const openCompose = (initial?: Partial<typeof composeDraft>): void => {
    // An explicit initial (reply/forward) always wins; otherwise restore a
    // previously saved draft for this contact if one exists.
    let restored: Partial<typeof composeDraft> | null = null;
    if (!initial && typeof window !== 'undefined') {
      try {
        const raw = window.localStorage.getItem(draftStorageKey(contact.id));
        if (raw) restored = JSON.parse(raw) as Partial<typeof composeDraft>;
      } catch {
        restored = null;
      }
    }
    const src = initial ?? restored ?? undefined;
    setComposeDraft({
      to: src?.to ?? (contact.email ? [contact.email] : []),
      cc: src?.cc ?? [],
      bcc: src?.bcc ?? [],
      subject: src?.subject ?? '',
      body: src?.body ?? ''
    });
    setShowCc((src?.cc?.length ?? 0) > 0);
    setShowBcc((src?.bcc?.length ?? 0) > 0);
    setShowFormatting(false);
    setStagedCompose([]);
    setComposeEditorKey((k) => k + 1);
    setComposeOpen(true);
  };

  const handleComposeEmoji = (emoji: EmojiClickData): void => {
    setComposeDraft((d) => ({
      ...d,
      body: appendEmojiToHtml(d.body, emoji.emoji)
    }));
    // Re-seed the seed-once editor so the emoji shows immediately.
    setComposeEditorKey((k) => k + 1);
  };

  const handleInsertLink = (): void => {
    const rawUrl = linkUrl.trim();
    if (!rawUrl) return;
    // Default to https:// when the user omits a scheme (Gmail does this too).
    const href = /^(https?:|mailto:|tel:)/i.test(rawUrl)
      ? rawUrl
      : `https://${rawUrl}`;
    const label = linkText.trim() || rawUrl;
    const anchor = `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
    setComposeDraft((d) => ({ ...d, body: appendHtmlToBody(d.body, anchor) }));
    setComposeEditorKey((k) => k + 1);
    setLinkUrl('');
    setLinkText('');
    setLinkOpen(false);
  };

  const handlePlainTextMode = (): void => {
    setComposeDraft((d) => ({
      ...d,
      body: htmlToPlainParagraphs(d.body)
    }));
    setShowFormatting(false);
    setComposeEditorKey((k) => k + 1);
  };

  const handlePrintDraft = (): void => {
    if (typeof window === 'undefined') return;
    const w = window.open('', '_blank', 'noopener,noreferrer,width=800');
    if (!w) return;
    w.document.write(
      `<!doctype html><html><head><title>${escapeHtml(
        composeDraft.subject.trim() || 'New email'
      )}</title></head><body style="font-family:system-ui,sans-serif;padding:24px;">` +
        `<h2 style="font-size:18px;">${escapeHtml(
          composeDraft.subject.trim() || '(no subject)'
        )}</h2>` +
        `<div>${composeDraft.body || ''}</div></body></html>`
    );
    w.document.close();
    w.focus();
    w.print();
  };

  const handleComposeClose = (): void => {
    const hasDraft =
      composeDraft.subject.trim().length > 0 ||
      htmlHasContent(composeDraft.body) ||
      composeDraft.cc.length > 0 ||
      composeDraft.bcc.length > 0 ||
      stagedCompose.length > 0;
    if (
      hasDraft &&
      !window.confirm('Discard this email? Your draft will be lost.')
    ) {
      return;
    }
    clearSavedDraft();
    setComposeOpen(false);
  };

  const uploadComposeFiles = async (files: File[]): Promise<void> => {
    const room = MAX_REPLY_ATTACHMENTS - stagedCompose.length;
    if (room <= 0) {
      toast.error(`Maximum ${MAX_REPLY_ATTACHMENTS} files`);
      return;
    }
    const accepted = files.slice(0, room);
    if (accepted.length < files.length) {
      toast.error(`Only the first ${room} file(s) were attached`);
    }
    const items: StagedAttachment[] = accepted.map((file) => ({
      tempId: `compose-${Date.now()}-${Math.random()}`,
      file,
      state: 'uploading'
    }));
    setStagedCompose((prev) => [...prev, ...items]);
    await Promise.all(
      items.map(async (item) => {
        const fd = new FormData();
        fd.append('contactId', contact.id);
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
          setStagedCompose((prev) =>
            prev.map((s) =>
              s.tempId === item.tempId
                ? { ...s, state: 'uploaded', uploaded }
                : s
            )
          );
        } catch (error) {
          const msg = error instanceof Error ? error.message : 'Upload failed';
          setStagedCompose((prev) =>
            prev.map((s) =>
              s.tempId === item.tempId
                ? { ...s, state: 'failed', error: msg }
                : s
            )
          );
          toast.error(`${item.file.name}: ${msg}`);
        }
      })
    );
  };

  const onComposePickFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) void uploadComposeFiles(files);
    e.target.value = '';
  };

  const onComposePickImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) void uploadComposeFiles(files);
    e.target.value = '';
  };

  const removeStagedCompose = (tempId: string): void => {
    setStagedCompose((prev) => prev.filter((s) => s.tempId !== tempId));
  };

  const handleForward = (): void => {
    if (!selectedThread) return;
    const last = selectedThread.messages[selectedThread.messages.length - 1];
    const participant = getThreadParticipant(selectedThread, contact);
    // Body is HTML now — build an HTML quote. Legacy/plain bodies get
    // escaped and their newlines converted so they survive in rich text.
    const esc = (s: string): string =>
      s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    const innerHtml = last
      ? isHtmlBody(last.body)
        ? last.body
        : esc(last.body).replace(/\n/g, '<br/>')
      : '';
    const quoted = last
      ? `<p><br/></p><p>---------- Forwarded message ----------</p><p>From: ${esc(
          last.senderName
        )}${
          last.senderEmail ? ` &lt;${esc(last.senderEmail)}&gt;` : ''
        }<br/>Date: ${esc(
          last.createdAt.toLocaleString()
        )}<br/>Subject: ${esc(
          selectedThread.subject
        )}</p><blockquote>${innerHtml}</blockquote>`
      : '';
    const fwdTo = participant.email ?? contact.email;
    openCompose({
      to: fwdTo ? [fwdTo] : [],
      subject: selectedThread.subject.startsWith('Fwd:')
        ? selectedThread.subject
        : `Fwd: ${selectedThread.subject}`,
      body: quoted
    });
  };

  const handleSendCompose = (): void => {
    const to = composeDraft.to.map((e) => e.trim()).filter(Boolean);
    const cc = composeDraft.cc.map((e) => e.trim()).filter(Boolean);
    const bcc = composeDraft.bcc.map((e) => e.trim()).filter(Boolean);
    const subject = composeDraft.subject.trim();
    const body = composeDraft.body.trim();
    if (to.length === 0 || !subject || !htmlHasContent(body)) return;
    const invalid = [...to, ...cc, ...bcc].find((e) => !isEmail(e));
    if (invalid) {
      toast.error(`Invalid email address: ${invalid}`);
      return;
    }
    if (stagedCompose.some((s) => s.state === 'uploading')) {
      toast.error('Please wait for uploads to finish');
      return;
    }
    const readyAttachments = stagedCompose
      .filter((s) => s.state === 'uploaded' && s.uploaded)
      .map((s) => s.uploaded as UploadedAttachment);
    startTransition(async () => {
      const result = await sendContactEmail({
        contactId: contact.id,
        to,
        cc,
        bcc,
        subject,
        body,
        attachments: readyAttachments
      });
      if (result?.serverError) {
        toast.error(result.serverError || "Email couldn't be sent");
        return;
      }
      const newThreadId = result?.data?.threadId;
      clearSavedDraft();
      setComposeOpen(false);
      setComposeDraft({
        to: contact.email ? [contact.email] : [],
        cc: [],
        bcc: [],
        subject: '',
        body: ''
      });
      setStagedCompose([]);
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
      {/* Panel header — hidden while reading a single email so the reader
          gets the full panel height. */}
      {!selectedThread && (
        <div className="flex flex-col gap-1 px-6 pb-0 pt-4">
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
      )}

      {/* Body */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {selectedThread ? (
          <ThreadReader
            thread={selectedThread}
            profile={profile}
            contact={contact}
            replyText={replyText}
            onReplyTextChange={setReplyText}
            replyEditorKey={replyEditorKey}
            staged={stagedReply}
            onUploadFiles={uploadReplyFiles}
            onRemoveStaged={removeStagedReply}
            onBack={handleBackToList}
            onForward={handleForward}
            onDelete={handleDelete}
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

      {/* Gmail-style compose window */}
      <ComposeWindow
        open={composeOpen}
        onClose={handleComposeClose}
        title={composeDraft.subject.trim() || 'New email'}
        closeDisabled={pending}
        onFilesDropped={(files) => void uploadComposeFiles(files)}
        footer={
          <>
            <Button
              type="button"
              onClick={handleSendCompose}
              disabled={
                pending ||
                composeDraft.to.length === 0 ||
                !composeDraft.subject.trim() ||
                !htmlHasContent(composeDraft.body)
              }
            >
              <SendIcon className="mr-1 size-3.5 shrink-0" />
              Send
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
              disabled={pending}
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
              onClick={() => composeFileInputRef.current?.click()}
              disabled={
                pending || stagedCompose.length >= MAX_REPLY_ATTACHMENTS
              }
              title="Attach files"
              aria-label="Attach files"
            >
              <PaperclipIcon className="size-4 shrink-0" />
            </Button>
            {/* Insert link — Gmail's chain-link button. */}
            <Popover
              open={linkOpen}
              onOpenChange={setLinkOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={pending}
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
                  <Label htmlFor="compose-link-text">Text to display</Label>
                  <Input
                    id="compose-link-text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Link text (optional)"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="compose-link-url">Web address</Label>
                  <Input
                    id="compose-link-url"
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
                  disabled={pending}
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
                  onEmojiClick={handleComposeEmoji}
                  autoFocusSearch={false}
                  theme={Theme.LIGHT}
                  previewConfig={{ showPreview: false }}
                  skinTonesDisabled
                  defaultSkinTone={SkinTones.NEUTRAL}
                  emojiStyle={EmojiStyle.NATIVE}
                />
              </PopoverContent>
            </Popover>
            {/* Insert photo — Gmail's image button. Inline rendering needs a
                mailer/CID change, so this attaches the image (works today). */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => composeImageInputRef.current?.click()}
              disabled={
                pending || stagedCompose.length >= MAX_REPLY_ATTACHMENTS
              }
              title="Insert photo"
              aria-label="Insert photo"
            >
              <ImageIcon className="size-4 shrink-0" />
            </Button>
            {/* More options — Gmail's three-dot menu. */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={pending}
                  title="More options"
                  aria-label="More options"
                >
                  <MoreVerticalIcon className="size-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={handlePlainTextMode}>
                  <RemoveFormattingIcon className="mr-2 size-4 shrink-0" />
                  Plain text mode
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handlePrintDraft}>
                  <PrinterIcon className="mr-2 size-4 shrink-0" />
                  Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Discard — far right, like Gmail's trash. */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={handleComposeClose}
              disabled={pending}
              title="Discard draft"
              aria-label="Discard draft"
            >
              <TrashIcon className="size-4 shrink-0" />
            </Button>
          </>
        }
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-start gap-2 border-b px-4 py-1.5">
            <div className="min-w-0 flex-1">
              <RecipientField
                value={composeDraft.to}
                onChange={(emails) =>
                  setComposeDraft((d) => ({ ...d, to: emails }))
                }
                validate={isEmail}
                placeholder="To"
                disabled={pending}
              />
            </div>
            <div className="mt-1.5 flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
              {!showCc && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto px-1 py-0 font-normal"
                  onClick={() => setShowCc(true)}
                >
                  Cc
                </Button>
              )}
              {!showBcc && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto px-1 py-0 font-normal"
                  onClick={() => setShowBcc(true)}
                >
                  Bcc
                </Button>
              )}
            </div>
          </div>
          {showCc && (
            <div className="border-b px-4 py-1.5">
              <RecipientField
                value={composeDraft.cc}
                onChange={(emails) =>
                  setComposeDraft((d) => ({ ...d, cc: emails }))
                }
                validate={isEmail}
                placeholder="Cc"
                disabled={pending}
              />
            </div>
          )}
          {showBcc && (
            <div className="border-b px-4 py-1.5">
              <RecipientField
                value={composeDraft.bcc}
                onChange={(emails) =>
                  setComposeDraft((d) => ({ ...d, bcc: emails }))
                }
                validate={isEmail}
                placeholder="Bcc"
                disabled={pending}
              />
            </div>
          )}
          <div className="border-b px-4">
            <Input
              id="compose-subject"
              value={composeDraft.subject}
              onChange={(e) =>
                setComposeDraft((d) => ({ ...d, subject: e.target.value }))
              }
              placeholder="Subject"
              disabled={pending}
              className="h-10 border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </div>
          {/* Gmail-style body: borderless editor; the formatting strip is
              docked at the BOTTOM and toggled by the "Aa" button. */}
          <div className="flex min-h-0 flex-1 flex-col px-3 py-2">
            <ComposeEditor
              // Remount per open so it re-seeds from the (possibly
              // forwarded/draft-restored) body; the editor is seed-once.
              key={composeEditorKey}
              getText={() => composeDraft.body}
              setText={(html) =>
                setComposeDraft((d) => ({ ...d, body: html }))
              }
              placeholder="Write your message…"
              height="220px"
              showToolbar={showFormatting}
            />
          </div>
          {stagedCompose.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {stagedCompose.map((s) => (
                <StagedAttachmentChip
                  key={s.tempId}
                  item={s}
                  onRemove={() => removeStagedCompose(s.tempId)}
                />
              ))}
            </div>
          )}
          <input
            ref={composeFileInputRef}
            type="file"
            multiple
            hidden
            onChange={onComposePickFiles}
          />
          <input
            ref={composeImageInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={onComposePickImages}
          />
        </div>
      </ComposeWindow>
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
            const senderLabel =
              thread.folder === EmailFolder.SENT
                ? `You → ${participant.name}`
                : participant.name;
            return (
              <li
                key={thread.id}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 transition-colors hover:bg-accent/50 hover:shadow-sm',
                  isChecked && 'bg-accent/50',
                  thread.unread && 'bg-background'
                )}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => onToggleSelected(thread.id)}
                  aria-label={`Select email: ${thread.subject}`}
                  disabled={disabled}
                />
                <button
                  type="button"
                  onClick={() => onOpen(thread.id)}
                  className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                >
                  {thread.unread ? (
                    <span
                      className="size-2 shrink-0 rounded-full bg-blue-600"
                      aria-label="Unread"
                    />
                  ) : (
                    <span
                      className="size-2 shrink-0"
                      aria-hidden
                    />
                  )}
                  <Avatar className="size-6 shrink-0 rounded-full">
                    <AvatarImage
                      src={participant.image}
                      alt={participant.name}
                    />
                    <AvatarFallback className="text-[10px] font-semibold">
                      {participant.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      'w-44 shrink-0 truncate text-xs',
                      thread.unread
                        ? 'font-bold text-foreground'
                        : 'text-foreground'
                    )}
                  >
                    {senderLabel}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs">
                    <span
                      className={cn(
                        thread.unread
                          ? 'font-bold text-foreground'
                          : 'text-foreground'
                      )}
                    >
                      {thread.subject}
                    </span>
                    {thread.preview && (
                      <span className="text-muted-foreground">
                        {' — '}
                        {thread.preview}
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-[11px]',
                      thread.unread
                        ? 'font-semibold text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {formatWhen(thread.updatedAt)}
                  </span>
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
  replyEditorKey: number;
  staged: StagedAttachment[];
  onUploadFiles: (files: File[]) => Promise<void>;
  onRemoveStaged: (tempId: string) => void;
  onBack: () => void;
  onForward: () => void;
  onDelete: () => void;
  onSendReply: () => void;
  disabled: boolean;
};

function ThreadReader({
  thread,
  profile,
  contact,
  replyText,
  onReplyTextChange,
  replyEditorKey,
  staged,
  onUploadFiles,
  onRemoveStaged,
  onBack,
  onForward,
  onDelete,
  onSendReply,
  disabled
}: ThreadReaderProps): React.JSX.Element {
  const participant = getThreadParticipant(thread, contact);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const imageInputRef = React.useRef<HTMLInputElement | null>(null);
  // Gmail-style reply toolbar state (mirrors the compose window).
  const [showReplyFormatting, setShowReplyFormatting] =
    React.useState<boolean>(false);
  const [replyInsertKey, setReplyInsertKey] = React.useState<number>(0);
  const [linkOpen, setLinkOpen] = React.useState<boolean>(false);
  const [linkUrl, setLinkUrl] = React.useState<string>('');
  const [linkText, setLinkText] = React.useState<string>('');
  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) void onUploadFiles(files);
    e.target.value = '';
  };
  const onPickImages = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) void onUploadFiles(files);
    e.target.value = '';
  };
  const handleReplyEmoji = (emoji: EmojiClickData): void => {
    onReplyTextChange(appendEmojiToHtml(replyText, emoji.emoji));
    setReplyInsertKey((k) => k + 1);
  };
  const handleInsertReplyLink = (): void => {
    const rawUrl = linkUrl.trim();
    if (!rawUrl) return;
    const href = /^(https?:|mailto:|tel:)/i.test(rawUrl)
      ? rawUrl
      : `https://${rawUrl}`;
    const label = linkText.trim() || rawUrl;
    const anchor = `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
    onReplyTextChange(appendHtmlToBody(replyText, anchor));
    setReplyInsertKey((k) => k + 1);
    setLinkUrl('');
    setLinkText('');
    setLinkOpen(false);
  };
  const handleReplyPlainText = (): void => {
    onReplyTextChange(htmlToPlainParagraphs(replyText));
    setShowReplyFormatting(false);
    setReplyInsertKey((k) => k + 1);
  };
  const canSubmit =
    (htmlHasContent(replyText) ||
      staged.some((s) => s.state === 'uploaded')) &&
    !staged.some((s) => s.state === 'uploading');
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      {/* Reader head */}
      <div className="border-b px-5 py-3">
        <div className="mb-2 flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-7"
            onClick={onBack}
            title="Back to inbox"
            aria-label="Back to inbox"
          >
            <ArrowLeftIcon className="size-4 shrink-0" />
          </Button>
          <h3 className="truncate text-base font-semibold">{thread.subject}</h3>
        </div>
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
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="space-y-4 px-5 py-4">
          {thread.messages.map((message) => {
            const messageParticipant = getMessageParticipant(
              message,
              profile,
              contact
            );
            const isMe = message.senderType === EmailSenderType.USER;
            const hasBody = message.body.length > 0;
            return (
              <div
                key={message.id}
                className={cn(
                  'flex flex-col gap-1',
                  isMe ? 'items-end' : 'items-start'
                )}
              >
                {hasBody && (
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm',
                      isMe
                        ? 'bg-primary text-primary-foreground'
                        : 'border bg-muted text-foreground'
                    )}
                  >
                    {isHtmlBody(message.body) ? (
                      <div
                        className="text-sm leading-relaxed [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
                        // Body is sanitized server-side before it is stored
                        // (see lib/email/sanitize-email-html.ts). Legacy /
                        // plain-text messages fall through to the <p> branch.
                        dangerouslySetInnerHTML={{ __html: message.body }}
                      />
                    ) : (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.body}
                      </p>
                    )}
                  </div>
                )}
                {message.attachments.length > 0 && (
                  <div
                    className={cn(
                      'flex max-w-[80%] flex-col gap-2',
                      isMe ? 'items-end' : 'items-start'
                    )}
                  >
                    {message.attachments.map((a) => (
                      <AttachmentPreview
                        key={a.id}
                        attachment={a}
                        alignEnd={isMe}
                      />
                    ))}
                  </div>
                )}
                <div className="text-[11px] text-muted-foreground">
                  {isMe ? 'You' : messageParticipant.name}
                  {!isMe && messageParticipant.email && (
                    <span className="ml-1">&lt;{messageParticipant.email}&gt;</span>
                  )}
                  {' · '}
                  {format(message.createdAt, 'h:mm a · MMM d')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reply box */}
      <div className="border-t bg-card">
        {staged.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t bg-muted/40 p-2">
            {staged.map((s) => (
              <StagedAttachmentChip
                key={s.tempId}
                item={s}
                onRemove={() => onRemoveStaged(s.tempId)}
              />
            ))}
          </div>
        )}
        <div className="border-t p-3">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={onPickFiles}
          />
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={onPickImages}
          />
          <div className="flex flex-col overflow-hidden rounded-lg border">
            <div
              className={cn(
                'px-3 py-2 [&_.editor-container]:px-0',
                disabled && 'pointer-events-none opacity-60'
              )}
            >
              <ComposeEditor
                key={`reply-${replyEditorKey}-${replyInsertKey}`}
                getText={() => replyText}
                setText={onReplyTextChange}
                placeholder={`Reply to ${participant.name.split(' ')[0]}…`}
                height="72px"
                showToolbar={showReplyFormatting}
              />
            </div>
            <div className="flex shrink-0 items-center gap-1 border-t bg-background px-2 py-1.5">
              <Button
                type="button"
                onClick={onSendReply}
                disabled={disabled || !canSubmit}
              >
                <SendIcon className="mr-1 size-3.5 shrink-0" />
                Send
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  'font-semibold',
                  showReplyFormatting && 'bg-accent text-foreground'
                )}
                onClick={() => setShowReplyFormatting((v) => !v)}
                disabled={disabled}
                title="Formatting options"
                aria-label="Formatting options"
                aria-pressed={showReplyFormatting}
              >
                <span className="text-sm leading-none">A</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || staged.length >= MAX_REPLY_ATTACHMENTS}
                title="Attach files"
                aria-label="Attach files"
              >
                <PaperclipIcon className="size-4 shrink-0" />
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
                    disabled={disabled}
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
                    <Label htmlFor="reply-link-text">Text to display</Label>
                    <Input
                      id="reply-link-text"
                      value={linkText}
                      onChange={(e) => setLinkText(e.target.value)}
                      placeholder="Link text (optional)"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="reply-link-url">Web address</Label>
                    <Input
                      id="reply-link-url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleInsertReplyLink();
                        }
                      }}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleInsertReplyLink}
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
                    disabled={disabled}
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
                    onEmojiClick={handleReplyEmoji}
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
                variant="ghost"
                size="icon"
                onClick={() => imageInputRef.current?.click()}
                disabled={disabled || staged.length >= MAX_REPLY_ATTACHMENTS}
                title="Insert photo"
                aria-label="Insert photo"
              >
                <ImageIcon className="size-4 shrink-0" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    title="More options"
                    aria-label="More options"
                  >
                    <MoreVerticalIcon className="size-4 shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={handleReplyPlainText}>
                    <RemoveFormattingIcon className="mr-2 size-4 shrink-0" />
                    Plain text mode
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
