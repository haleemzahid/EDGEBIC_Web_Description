import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { uploadRawToCloudinary, useCloudinary } from '@/lib/uploads/cloudinary';

// Installer storage with two backends, chosen automatically:
//  - production (deployed): upload to Cloudinary (resource_type 'raw')
//  - local dev: write to disk under ./data/software and serve it via
//    app/(app)/api/software-files/[name]/route.ts
//
// Backend switch lives in lib/uploads/cloudinary.ts (useCloudinary).
//
// NOTE: Cloudinary free plan rejects raw files bigger than ~10 MB.

// Local-dev upload dir (outside public/ — Next.js won't serve runtime
// files from public/ reliably).
export const SOFTWARE_UPLOAD_DIR =
  process.env.SOFTWARE_UPLOAD_DIR ||
  path.join(process.cwd(), 'data', 'software');

export const SOFTWARE_FILE_MAX_BYTES = 1024 * 1024 * 1024; // 1 GB

const ALLOWED_EXTENSIONS = new Set([
  '.exe',
  '.msi',
  '.zip',
  '.dmg',
  '.pkg',
  '.appimage',
  '.deb',
  '.rpm',
  '.gz',
  '.tar',
  '.7z',
  '.bin',
  '.apk',
  '.jar',
  '.run'
]);

function getExtension(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return /^\.[a-z0-9]{1,8}$/.test(ext) ? ext : '';
}

export function isAllowedSoftwareFile(filename: string): boolean {
  return ALLOWED_EXTENSIONS.has(getExtension(filename));
}

function sanitizeFilename(filename: string): string {
  const trimmed = filename.trim().replace(/[\r\n\t]/g, '');
  const safe = trimmed.replace(/[\\/]+/g, '_').slice(0, 200);
  return safe || 'file';
}

// Stored names are `<uuid><ext>` only. Reject anything else so the
// local download route can never be tricked into path traversal.
export function isValidStoredName(name: string): boolean {
  return /^[0-9a-f-]{36}\.[a-z0-9]{1,8}$/.test(name);
}

export type SavedSoftwareFile = {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  // Absolute URL when stored on Cloudinary (use as-is).
  url?: string;
  // Relative API path when stored locally (caller prefixes the origin).
  publicUrl?: string;
};

async function saveToCloudinary(
  file: File,
  buffer: Buffer
): Promise<SavedSoftwareFile> {
  const url = await uploadRawToCloudinary(buffer, {
    folder: 'software-installers'
  });
  return {
    fileName: sanitizeFilename(file.name),
    mimeType: file.type || 'application/octet-stream',
    sizeBytes: file.size,
    url
  };
}

async function saveToDisk(
  file: File,
  buffer: Buffer
): Promise<SavedSoftwareFile> {
  const ext = getExtension(file.name);
  const storedName = `${randomUUID()}${ext}`;
  await mkdir(SOFTWARE_UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(SOFTWARE_UPLOAD_DIR, storedName), buffer);

  return {
    fileName: sanitizeFilename(file.name),
    mimeType: file.type || 'application/octet-stream',
    sizeBytes: file.size,
    publicUrl: `/api/software-files/${storedName}`
  };
}

export async function saveSoftwareFile(
  file: File
): Promise<SavedSoftwareFile> {
  if (file.size <= 0) {
    throw new Error('Empty file');
  }
  if (file.size > SOFTWARE_FILE_MAX_BYTES) {
    throw new Error(
      `File is too large (max ${Math.floor(
        SOFTWARE_FILE_MAX_BYTES / 1024 / 1024
      )} MB)`
    );
  }
  if (!isAllowedSoftwareFile(file.name)) {
    throw new Error(
      'File type not allowed. Upload an installer (.exe, .msi, .zip, .dmg, …).'
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  return useCloudinary()
    ? saveToCloudinary(file, buffer)
    : saveToDisk(file, buffer);
}
