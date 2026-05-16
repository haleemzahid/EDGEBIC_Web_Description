import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { uploadRawToCloudinary, useCloudinary } from '@/lib/uploads/cloudinary';

// Two backends, chosen automatically (see lib/uploads/cloudinary.ts):
//  - production: Cloudinary (raw), public_id = storedName so the URL is
//    deterministic and rebuildable from just the stored name.
//  - local dev: disk under ./data/ticket-attachments, served by
//    app/(app)/api/ticket-attachments/[name]/route.ts
// Either way the DB only stores `storedName`; the URL is derived in
// ticketAttachmentUrl().

// Cloudinary folder + local-dev directory.
export const TICKET_ATTACHMENT_FOLDER = 'ticket-attachments';
export const TICKET_ATTACHMENT_DIR =
  process.env.TICKET_ATTACHMENT_DIR ||
  path.join(process.cwd(), 'data', 'ticket-attachments');
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

// Stored names are `<uuid>` optionally followed by a simple extension.
// Reject anything else so the serving route can't be path-traversed.
export function isValidAttachmentName(name: string): boolean {
  return /^[0-9a-f-]{36}(\.[a-z0-9]{1,8})?$/.test(name);
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
  const buffer = Buffer.from(await file.arrayBuffer());

  if (useCloudinary()) {
    // public_id = storedName (extension included) so the delivery URL is
    // deterministic: ticketAttachmentUrl() can rebuild it later.
    await uploadRawToCloudinary(buffer, {
      folder: TICKET_ATTACHMENT_FOLDER,
      publicId: storedName
    });
  } else {
    await mkdir(TICKET_ATTACHMENT_DIR, { recursive: true });
    await writeFile(path.join(TICKET_ATTACHMENT_DIR, storedName), buffer);
  }

  return {
    storedName,
    fileName: sanitizeFilename(file.name),
    mimeType: file.type || 'application/octet-stream',
    sizeBytes: file.size,
    publicUrl: ticketAttachmentPublicUrl(storedName)
  };
}

// Single source of truth for an attachment's URL. Always points at our
// own route, which streams from disk (dev) or redirects to Cloudinary
// (prod) — so callers never need to know the backend.
export function ticketAttachmentPublicUrl(storedName: string): string {
  return `/api/ticket-attachments/${storedName}`;
}
