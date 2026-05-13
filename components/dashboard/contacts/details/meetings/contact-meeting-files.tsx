'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  DownloadIcon,
  ExternalLinkIcon,
  FileIcon,
  Loader2Icon,
  TrashIcon,
  UploadCloudIcon
} from 'lucide-react';
import { toast } from 'sonner';

import { deleteContactMeetingFile } from '@/actions/contacts/delete-contact-meeting-file';
import { uploadContactMeetingFile } from '@/actions/contacts/upload-contact-meeting-file';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MAX_MEETING_FILE_SIZE } from '@/schemas/contacts/upload-contact-meeting-file-schema';
import type { ContactMeetingFileDto } from '@/types/dtos/contact-meeting-file-dto';

export type ContactMeetingFilesProps = {
  meetingId: string;
  files: ContactMeetingFileDto[];
};

export function ContactMeetingFiles({
  meetingId,
  files
}: ContactMeetingFilesProps): React.JSX.Element {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const handleFiles = async (list: FileList | null): Promise<void> => {
    if (!list || list.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(list)) {
        if (file.size > MAX_MEETING_FILE_SIZE) {
          toast.error(`${file.name} is too large (max 10 MB)`);
          continue;
        }
        const dataBase64 = await readAsBase64(file);
        const result = await uploadContactMeetingFile({
          meetingId,
          name: file.name,
          contentType: file.type || 'application/octet-stream',
          size: file.size,
          dataBase64
        });
        if (result?.serverError) {
          toast.error(`Couldn't upload ${file.name}`);
        } else {
          toast.success(`${file.name} uploaded`);
        }
      }
      router.refresh();
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleDelete = async (file: ContactMeetingFileDto): Promise<void> => {
    if (!confirm(`Delete "${file.name}"?`)) return;
    const result = await deleteContactMeetingFile({ id: file.id });
    if (result?.serverError) {
      toast.error("Couldn't delete file");
      return;
    }
    toast.success('File deleted');
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-row items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">Files</h2>
        <span className="text-xs text-muted-foreground">
          Drop files anywhere on the box below.
        </span>
      </header>
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed bg-muted/30 p-7 text-center transition-colors cursor-pointer',
          dragOver && 'border-primary bg-primary/5',
          uploading && 'pointer-events-none opacity-70'
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void handleFiles(e.dataTransfer.files);
        }}
      >
        {uploading ? (
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        ) : (
          <UploadCloudIcon className="size-5 text-muted-foreground" />
        )}
        <div className="text-sm font-medium">
          {uploading ? (
            'Uploading…'
          ) : (
            <>
              Drop files here or <span className="underline">browse</span>
            </>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          PDF, docx, images — max 10 MB each
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={(e) => void handleFiles(e.target.files)}
        />
      </div>
      {files.length === 0 ? (
        <div className="rounded-md border border-dashed px-4 py-6 text-center text-xs text-muted-foreground">
          No files attached to this meeting yet.
        </div>
      ) : (
        <ul className="space-y-2">
          {files.map((file) => (
            <FileRow
              key={file.id}
              file={file}
              onDelete={() => void handleDelete(file)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function FileRow({
  file,
  onDelete
}: {
  file: ContactMeetingFileDto;
  onDelete: () => void;
}): React.JSX.Element {
  const viewHref = `/api/meeting-files/${file.id}`;
  const downloadHref = `${viewHref}?download=1`;
  return (
    <li className="flex flex-row items-center gap-3 rounded-md border bg-card px-3 py-2 text-sm">
      <FileIcon className="size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{file.name}</div>
        <div className="truncate text-[11px] text-muted-foreground">
          {formatFileSize(file.size)}
          {' · '}
          {format(file.createdAt, 'MMM d, h:mm a')}
          {file.uploadedByName ? ` · ${file.uploadedByName}` : ''}
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8"
        asChild
        title="Open in new tab"
      >
        <a
          href={viewHref}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLinkIcon className="size-4 shrink-0" />
          <span className="sr-only">Open</span>
        </a>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8"
        asChild
        title="Download"
      >
        <a href={downloadHref}>
          <DownloadIcon className="size-4 shrink-0" />
          <span className="sr-only">Download</span>
        </a>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 text-destructive hover:text-destructive"
        title="Delete"
        onClick={onDelete}
      >
        <TrashIcon className="size-4 shrink-0" />
        <span className="sr-only">Delete</span>
      </Button>
    </li>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const result = reader.result as string;
      const comma = result.indexOf(',');
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.readAsDataURL(file);
  });
}
