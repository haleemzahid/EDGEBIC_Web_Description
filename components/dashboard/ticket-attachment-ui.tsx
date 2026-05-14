'use client';

import * as React from 'react';
import { AlertCircleIcon, CheckIcon, ClockIcon, FileIcon, XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export type TicketAttachmentView = {
  id: string;
  fileName: string;
  storedName: string;
  mimeType: string;
  sizeBytes: number;
};

export type StagedAttachmentItem = {
  tempId: string;
  file: File;
  state: 'uploading' | 'uploaded' | 'failed';
  error?: string;
};

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export function ticketAttachmentUrl(storedName: string): string {
  return `/uploads/ticket-attachments/${storedName}`;
}

export function StagedAttachmentChip({
  item,
  onRemove
}: {
  item: StagedAttachmentItem;
  onRemove: () => void;
}): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex max-w-full items-center gap-2 rounded-md border bg-background px-2 py-1.5 text-xs',
        item.state === 'failed' && 'border-rose-300 bg-rose-50'
      )}
    >
      {item.state === 'uploading' && (
        <ClockIcon className="size-3.5 shrink-0 animate-pulse" />
      )}
      {item.state === 'uploaded' && (
        <CheckIcon className="size-3.5 shrink-0 text-emerald-600" />
      )}
      {item.state === 'failed' && (
        <AlertCircleIcon className="size-3.5 shrink-0 text-rose-600" />
      )}
      <span className="max-w-[180px] truncate" title={item.file.name}>
        {item.file.name}
      </span>
      <span className="shrink-0 text-muted-foreground">
        {formatBytes(item.file.size)}
      </span>
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        title="Remove"
      >
        <XIcon className="size-3.5" />
      </button>
    </div>
  );
}

export function AttachmentPreview({
  attachment,
  alignEnd
}: {
  attachment: TicketAttachmentView;
  alignEnd: boolean;
}): React.JSX.Element {
  const url = ticketAttachmentUrl(attachment.storedName);
  const isImage = attachment.mimeType.startsWith('image/');
  if (isImage) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'block max-w-xs overflow-hidden rounded-lg border bg-muted',
          alignEnd ? 'self-end' : 'self-start'
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={attachment.fileName}
          className="max-h-64 w-full object-contain"
        />
      </a>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      download={attachment.fileName}
      className={cn(
        'flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-xs shadow-sm hover:bg-muted',
        alignEnd ? 'self-end' : 'self-start'
      )}
    >
      <FileIcon className="size-4 shrink-0 text-muted-foreground" />
      <span className="max-w-[220px] truncate" title={attachment.fileName}>
        {attachment.fileName}
      </span>
      <span className="shrink-0 text-muted-foreground">
        {formatBytes(attachment.sizeBytes)}
      </span>
    </a>
  );
}
