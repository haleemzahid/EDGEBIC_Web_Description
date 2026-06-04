import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
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

/**
 * Deletes the on-disk installer backing a ContactSoftware.downloadUrl.
 * Only touches files we actually saved under SOFTWARE_FILE_PUBLIC_DIR —
 * external download links (and malformed/empty URLs) are left alone. Accepts
 * both relative (/api/uploads/software/x.zip) and legacy absolute URLs.
 * Best-effort: a file that is already gone is not an error. Returns true
 * only when a file was actually removed.
 */
export async function deleteSoftwareFileByUrl(
  downloadUrl: string | null | undefined
): Promise<boolean> {
  if (!downloadUrl) {
    return false;
  }

  // Reduce to a path, whether the stored value is absolute or relative.
  let pathname: string;
  try {
    pathname = new URL(downloadUrl).pathname;
  } catch {
    pathname = downloadUrl;
  }

  // Must point at our software upload dir; bail on external links.
  const marker = `/${SOFTWARE_FILE_PUBLIC_DIR}/`;
  const markerIndex = pathname.indexOf(marker);
  if (markerIndex === -1) {
    return false;
  }

  // basename() strips any directory parts, neutralising ../ traversal.
  const storedName = path.basename(
    decodeURIComponent(pathname.slice(markerIndex + marker.length))
  );
  if (!storedName || storedName === '.' || storedName === '..') {
    return false;
  }

  const targetDir = path.join(
    process.cwd(),
    'public',
    SOFTWARE_FILE_PUBLIC_DIR
  );
  const absolute = path.join(targetDir, storedName);
  const dirWithSep = targetDir.endsWith(path.sep)
    ? targetDir
    : targetDir + path.sep;
  if (!absolute.startsWith(dirWithSep)) {
    return false;
  }

  try {
    await unlink(absolute);
    return true;
  } catch {
    // Already removed (or never lived on this disk) — nothing to clean up.
    return false;
  }
}
