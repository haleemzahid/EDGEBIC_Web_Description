import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import { NextResponse, type NextRequest } from 'next/server';

import { dedupedAuth } from '@/lib/auth';
import { checkSession } from '@/lib/auth/session';

// Streams files from <repo>/public/uploads/<...path> regardless of whether
// they existed at build time. Next.js's built-in static handler only serves
// files that were in public/ at build time, so runtime-written installers
// (and any other uploads) need this explicit route to be reachable on a
// containerized / standalone deploy (Dokploy, Vercel-style, etc.).

const UPLOADS_ROOT = path.join(process.cwd(), 'public', 'uploads');

// Minimal extension → MIME map for the kinds of files we actually save.
// Falls back to application/octet-stream, which is the right default for
// installers anyway.
const MIME_BY_EXT: Record<string, string> = {
  '.zip': 'application/zip',
  '.exe': 'application/vnd.microsoft.portable-executable',
  '.msi': 'application/x-msi',
  '.dmg': 'application/x-apple-diskimage',
  '.pkg': 'application/octet-stream',
  '.appimage': 'application/octet-stream',
  '.deb': 'application/vnd.debian.binary-package',
  '.rpm': 'application/x-rpm',
  '.gz': 'application/gzip',
  '.tar': 'application/x-tar',
  '.7z': 'application/x-7z-compressed',
  '.bin': 'application/octet-stream',
  '.apk': 'application/vnd.android.package-archive',
  '.jar': 'application/java-archive',
  '.run': 'application/octet-stream',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf'
};

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ path: string[] }> }
): Promise<Response> {
  const { path: segments } = await props.params;
  if (!segments || segments.length === 0) {
    return new NextResponse(undefined, { status: 404 });
  }

  // Software installers must not be served to UNAUTHENTICATED callers — a raw
  // /api/uploads/software/<uuid>.zip URL would otherwise grant anyone who got
  // hold of it unlimited free downloads. Logged-in users (team members and
  // their portal clients) are allowed through so the My Software / CRM
  // download buttons work. Respond 404 (not 401) so the path's existence
  // isn't revealed to anonymous probes.
  if (segments[0]?.toLowerCase() === 'software') {
    const session = await dedupedAuth();
    if (!checkSession(session)) {
      return new NextResponse(undefined, { status: 404 });
    }
  }

  // Join + normalize, then make sure the resolved absolute path is still
  // inside UPLOADS_ROOT. Blocks ../ traversal and absolute-path tricks.
  const requested = path.normalize(path.join(...segments));
  const absolute = path.join(UPLOADS_ROOT, requested);
  const rootWithSep = UPLOADS_ROOT.endsWith(path.sep)
    ? UPLOADS_ROOT
    : UPLOADS_ROOT + path.sep;
  if (!absolute.startsWith(rootWithSep)) {
    return new NextResponse(undefined, { status: 400 });
  }

  let info;
  try {
    info = await stat(absolute);
  } catch {
    return new NextResponse(undefined, { status: 404 });
  }
  if (!info.isFile()) {
    return new NextResponse(undefined, { status: 404 });
  }

  const ext = path.extname(absolute).toLowerCase();
  const contentType = MIME_BY_EXT[ext] ?? 'application/octet-stream';
  const filename = path.basename(absolute);

  // Force download for binaries the browser would otherwise try to render
  // or refuse. Inline only obvious viewables (images, pdf, video).
  const inlineExts = new Set([
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.webp',
    '.svg',
    '.pdf',
    '.mp4',
    '.webm'
  ]);
  const disposition = inlineExts.has(ext)
    ? `inline; filename="${encodeURIComponent(filename)}"`
    : `attachment; filename="${encodeURIComponent(filename)}"`;

  // Installers are auth-gated above, so they must not land in a shared/CDN
  // cache that would then hand them out unauthenticated. Public uploads
  // (images, etc.) keep the long immutable cache.
  const isSoftware = segments[0]?.toLowerCase() === 'software';
  const cacheControl = isSoftware
    ? 'private, no-store'
    : 'public, max-age=31536000, immutable';

  // Stream instead of loading the whole file into memory — installers
  // can be up to 1 GB (see SOFTWARE_FILE_MAX_BYTES).
  const nodeStream = createReadStream(absolute);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

  return new Response(webStream, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Length': info.size.toString(),
      'Content-Disposition': disposition,
      'Cache-Control': cacheControl
    }
  });
}
