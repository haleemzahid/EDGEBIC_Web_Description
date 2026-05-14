import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const TICKET_ATTACHMENT_PUBLIC_DIR = 'uploads/ticket-attachments';
export const TICKET_ATTACHMENT_MAX_BYTES = 10 * 1024 * 1024; // 10 MB
export const TICKET_ATTACHMENT_MAX_PER_MESSAGE = 5;

const ALLOWED_MIME_PREFIXES = ['image/', 'video/', 'audio/', 'text/'];
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/json',
  'application/octet-stream'
]);

export function isAllowedMimeType(mimeType: string): boolean {
  if (ALLOWED_MIME_TYPES.has(mimeType)) return true;
  return ALLOWED_MIME_PREFIXES.some((p) => mimeType.startsWith(p));
}

function sanitizeExtension(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  // keep simple dot+alphanum extensions only (.jpg, .pdf, .docx ...)
  return /^\.[a-z0-9]{1,8}$/.test(ext) ? ext : '';
}

function sanitizeFilename(filename: string): string {
  const trimmed = filename.trim().replace(/[\r\n\t]/g, '');
  // strip path separators and zero-width chars
  const safe = trimmed.replace(/[\\/]+/g, '_').slice(0, 200);
  return safe || 'file';
}

export type SavedAttachment = {
  storedName: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  publicUrl: string;
};

export async function saveTicketAttachmentFile(
  file: File
): Promise<SavedAttachment> {
  if (file.size <= 0) {
    throw new Error('Empty file');
  }
  if (file.size > TICKET_ATTACHMENT_MAX_BYTES) {
    throw new Error(
      `File is too large (max ${Math.floor(TICKET_ATTACHMENT_MAX_BYTES / 1024 / 1024)} MB)`
    );
  }
  if (!isAllowedMimeType(file.type)) {
    throw new Error(`File type not allowed: ${file.type || 'unknown'}`);
  }

  const ext = sanitizeExtension(file.name);
  const storedName = `${randomUUID()}${ext}`;
  const targetDir = path.join(process.cwd(), 'public', TICKET_ATTACHMENT_PUBLIC_DIR);
  await mkdir(targetDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(targetDir, storedName), buffer);

  return {
    storedName,
    fileName: sanitizeFilename(file.name),
    mimeType: file.type || 'application/octet-stream',
    sizeBytes: file.size,
    publicUrl: `/${TICKET_ATTACHMENT_PUBLIC_DIR}/${storedName}`
  };
}

export function ticketAttachmentPublicUrl(storedName: string): string {
  return `/${TICKET_ATTACHMENT_PUBLIC_DIR}/${storedName}`;
}
