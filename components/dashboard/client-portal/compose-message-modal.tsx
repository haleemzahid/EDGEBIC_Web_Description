'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import {
  ImageIcon,
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

import { composeClientMessage } from '@/actions/client-portal/compose-client-message';
import {
  StagedAttachmentChip,
  type StagedAttachmentItem
} from '@/components/dashboard/ticket-attachment-ui';
import { Button } from '@/components/ui/button';
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
import { Routes } from '@/constants/routes';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import {
  appendEmojiToHtml,
  appendHtmlToBody,
  escapeHtml,
  htmlHasContent,
  htmlToPlainParagraphs
} from '@/lib/email/compose-html';
import { cn } from '@/lib/utils';

type UploadedAttachment = {
  storedName: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
};

type StagedAttachment = StagedAttachmentItem & {
  uploaded?: UploadedAttachment;
};

type Draft = { subject: string; body: string };

const MAX_ATTACHMENTS = 5;
const DRAFT_KEY = 'client-compose-draft';

function readSavedDraft(): Draft | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

function clearSavedDraft(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

export const ComposeMessageModal = NiceModal.create<NiceModalHocProps>(() => {
  const modal = useEnhancedModal();
  const router = useRouter();

  const [subject, setSubject] = React.useState('');
  const [body, setBody] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  // Gmail hides the formatting toolbar until the "A" button is clicked.
  const [showFormatting, setShowFormatting] = React.useState(false);
  // Bumped to remount the seed-once rich-text editor (open, draft-restore,
  // emoji/link insert, plain-text mode).
  const [editorKey, setEditorKey] = React.useState(0);
  const [staged, setStaged] = React.useState<StagedAttachment[]>([]);
  const [linkOpen, setLinkOpen] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState('');
  const [linkText, setLinkText] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const imageInputRef = React.useRef<HTMLInputElement | null>(null);

  // NiceModal.hide() doesn't unmount; reset (or restore a saved draft) on
  // every reopen so stale state from a prior submit doesn't persist.
  React.useEffect(() => {
    if (!modal.visible) return;
    const saved = readSavedDraft();
    setSubject(saved?.subject ?? '');
    setBody(saved?.body ?? '');
    setShowFormatting(false);
    setStaged([]);
    setSubmitting(false);
    setEditorKey((k) => k + 1);
  }, [modal.visible]);

  // Persist the draft so closing/minimizing or a reload doesn't lose it.
  React.useEffect(() => {
    if (!modal.visible || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ subject, body } satisfies Draft)
      );
    } catch {
      // storage full / unavailable — drafting still works in-memory
    }
  }, [modal.visible, subject, body]);

  const uploadFiles = async (files: File[]): Promise<void> => {
    const room = MAX_ATTACHMENTS - staged.length;
    if (room <= 0) {
      toast.error(`Maximum ${MAX_ATTACHMENTS} files`);
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
    setStaged((prev) => [...prev, ...items]);
    await Promise.all(
      items.map(async (item) => {
        const fd = new FormData();
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

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) void uploadFiles(files);
    e.target.value = '';
  };

  const removeStaged = (tempId: string): void => {
    setStaged((prev) => prev.filter((s) => s.tempId !== tempId));
  };

  const handleEmoji = (emoji: EmojiClickData): void => {
    setBody((b) => appendEmojiToHtml(b, emoji.emoji));
    setEditorKey((k) => k + 1);
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
    setBody((b) => appendHtmlToBody(b, anchor));
    setEditorKey((k) => k + 1);
    setLinkUrl('');
    setLinkText('');
    setLinkOpen(false);
  };

  const handlePlainTextMode = (): void => {
    setBody((b) => htmlToPlainParagraphs(b));
    setShowFormatting(false);
    setEditorKey((k) => k + 1);
  };

  const handlePrint = (): void => {
    if (typeof window === 'undefined') return;
    const w = window.open('', '_blank', 'noopener,noreferrer,width=800');
    if (!w) return;
    w.document.write(
      `<!doctype html><html><head><title>${escapeHtml(
        subject.trim() || 'New message'
      )}</title></head><body style="font-family:system-ui,sans-serif;padding:24px;">` +
        `<h2 style="font-size:18px;">${escapeHtml(
          subject.trim() || '(no subject)'
        )}</h2>` +
        `<div>${body || ''}</div></body></html>`
    );
    w.document.close();
    w.focus();
    w.print();
  };

  const hasDraft = (): boolean =>
    subject.trim().length > 0 ||
    htmlHasContent(body) ||
    staged.length > 0;

  const handleClose = (): void => {
    if (submitting) return;
    if (
      hasDraft() &&
      !window.confirm('Discard this message? Your draft will be lost.')
    ) {
      return;
    }
    clearSavedDraft();
    modal.handleClose();
  };

  const canSubmit =
    !submitting && subject.trim().length > 0 && htmlHasContent(body);

  const onSubmit = async (): Promise<void> => {
    if (!canSubmit) return;
    if (staged.some((s) => s.state === 'uploading')) {
      toast.error('Please wait for uploads to finish');
      return;
    }
    const readyAttachments = staged
      .filter((s) => s.state === 'uploaded' && s.uploaded)
      .map((s) => s.uploaded as UploadedAttachment);
    setSubmitting(true);
    const result = await composeClientMessage({
      subject: subject.trim(),
      body,
      attachments: readyAttachments
    });
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Message sent');
      clearSavedDraft();
      setSubject('');
      setBody('');
      setStaged([]);
      modal.handleClose();
      const threadId = result?.data?.threadId;
      if (threadId) {
        router.push(`${Routes.ClientMessages}/${threadId}`);
      } else {
        router.refresh();
      }
    } else {
      setSubmitting(false);
      toast.error(result?.serverError ?? "Couldn't send message");
    }
  };

  const footer = (
    <>
      <Button
        type="button"
        onClick={() => void onSubmit()}
        disabled={!canSubmit}
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
        disabled={submitting}
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
        onClick={() => fileInputRef.current?.click()}
        disabled={submitting || staged.length >= MAX_ATTACHMENTS}
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
            disabled={submitting}
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
            <Label htmlFor="client-compose-link-text">Text to display</Label>
            <Input
              id="client-compose-link-text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Link text (optional)"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="client-compose-link-url">Web address</Label>
            <Input
              id="client-compose-link-url"
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
            disabled={submitting}
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
      {/* Insert photo — attaches the image (inline CID rendering needs a
          mailer change; attaching works today, same as the admin composer). */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => imageInputRef.current?.click()}
        disabled={submitting || staged.length >= MAX_ATTACHMENTS}
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
            disabled={submitting}
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
          <DropdownMenuItem onClick={handlePrint}>
            <PrinterIcon className="mr-2 size-4 shrink-0" />
            Print
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="ml-auto"
        onClick={handleClose}
        disabled={submitting}
        title="Discard draft"
        aria-label="Discard draft"
      >
        <TrashIcon className="size-4 shrink-0" />
      </Button>
    </>
  );

  return (
    <ComposeWindow
      open={modal.visible}
      onClose={handleClose}
      title={subject.trim() || 'New message'}
      closeDisabled={submitting}
      onFilesDropped={(files) => void uploadFiles(files)}
      footer={footer}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="border-b px-4">
          <Input
            id="client-compose-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={500}
            placeholder="Subject"
            disabled={submitting}
            className="h-10 border-0 px-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col px-3 py-2">
          <ComposeEditor
            // Remount per open / insert so it re-seeds (editor is seed-once).
            key={editorKey}
            getText={() => body}
            setText={setBody}
            placeholder="Write your message…"
            height="220px"
            showToolbar={showFormatting}
          />
        </div>
        {staged.length > 0 && (
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {staged.map((s) => (
              <StagedAttachmentChip
                key={s.tempId}
                item={s}
                onRemove={() => removeStaged(s.tempId)}
              />
            ))}
          </div>
        )}
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
          onChange={onPickFiles}
        />
      </div>
    </ComposeWindow>
  );
});
