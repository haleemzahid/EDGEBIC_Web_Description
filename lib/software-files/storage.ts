import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Mirrors lib/ticket-attachments/storage.ts but tuned for installers:
// bigger size limit and an executable/installer extension allow-list
// (installers report inconsistent MIME types, so validate by extension).

export const SOFTWARE_FILE_PUBLIC_DIR = 'uploads/software';
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

export type SavedSoftwareFile = {
  storedName: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  // Relative URL that hits the streaming route (/api/uploads/...).
  // Stored as-is on ContactSoftware.downloadUrl so it resolves against
  // whatever host the client is on — no localhost-origin baked in.
  publicUrl: string;
};

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

  const ext = getExtension(file.name);
  const storedName = `${randomUUID()}${ext}`;
  const targetDir = path.join(
    process.cwd(),
    'public',
    SOFTWARE_FILE_PUBLIC_DIR
  );
  await mkdir(targetDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(targetDir, storedName), buffer);

  return {
    storedName,
    fileName: sanitizeFilename(file.name),
    mimeType: file.type || 'application/octet-stream',
    sizeBytes: file.size,
    publicUrl: `/api/${SOFTWARE_FILE_PUBLIC_DIR}/${storedName}`
  };
}
