import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Files are routed into separate local folders by kind so videos, images
// and other docs don't all pile into one directory. Each is a normal
// folder under public/, so Next.js serves the returned publicUrl as-is.
export const VIDEO_PUBLIC_DIR = 'uploads/videos';
export const IMAGE_PUBLIC_DIR = 'uploads/images';
// Non-image / non-video attachments (pdf, doc, zip, …) keep the original
// folder so already-stored URLs stay valid.
export const TICKET_ATTACHMENT_PUBLIC_DIR = 'uploads/ticket-attachments';
export const TICKET_ATTACHMENT_MAX_BYTES = 10 * 1024 * 1024; // 10 MB
export const TICKET_ATTACHMENT_MAX_PER_MESSAGE = 5;

function publicDirForMime(mimeType: string): string {
  if (mimeType.startsWith('video/')) return VIDEO_PUBLIC_DIR;
  if (mimeType.startsWith('image/')) return IMAGE_PUBLIC_DIR;
  return TICKET_ATTACHMENT_PUBLIC_DIR;
}

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
  const publicDir = publicDirForMime(file.type);
  const targetDir = path.join(process.cwd(), 'public', publicDir);
  await mkdir(targetDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(targetDir, storedName), buffer);

  return {
    storedName,
    fileName: sanitizeFilename(file.name),
    mimeType: file.type || 'application/octet-stream',
    sizeBytes: file.size,
    publicUrl: `/${publicDir}/${storedName}`
  };
}

export function ticketAttachmentPublicUrl(storedName: string): string {
  return `/${TICKET_ATTACHMENT_PUBLIC_DIR}/${storedName}`;
}
