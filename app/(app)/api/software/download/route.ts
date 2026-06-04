import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import { NextResponse, type NextRequest } from 'next/server';

import { prisma } from '@/lib/db/prisma';
import { verifyDownloadToken } from '@/lib/software-files/download-token';
import { SOFTWARE_FILE_PUBLIC_DIR } from '@/lib/software-files/storage';

// License-gated, repeatable installer download for the FCP desktop updater.
//
// The unauthenticated /api/uploads/[...path] route deliberately 404s anything
// under software/, and /api/download is a single-use purchase-token flow — both
// unusable for an auto-updater that re-downloads on every release. This route
// serves the same uploaded installers behind a short-lived token minted by
// /api/software/latest (which already authenticated the license + machine).
// The token carries the file + license; the elevated updater needs no creds.

const SOFTWARE_DIR = path.join(
  process.cwd(),
  'public',
  SOFTWARE_FILE_PUBLIC_DIR
);

const MIME_BY_EXT: Record<string, string> = {
  '.zip': 'application/zip',
  '.exe': 'application/vnd.microsoft.portable-executable',
  '.msi': 'application/x-msi',
  '.7z': 'application/x-7z-compressed',
  '.gz': 'application/gzip',
  '.tar': 'application/x-tar'
};

export async function GET(request: NextRequest): Promise<Response> {
  const token = new URL(request.url).searchParams.get('token');
  if (!token) {
    return NextResponse.json(
      { error: 'Download token is required' },
      { status: 400 }
    );
  }

  const verified = verifyDownloadToken(token);
  if (!verified) {
    // Bad signature, malformed, expired, or secret unconfigured.
    return NextResponse.json(
      { error: 'Invalid or expired download token' },
      { status: 410 }
    );
  }

  // Defense-in-depth: a token minted for a license that has since been
  // revoked/deactivated must stop working before it expires.
  const purchase = await prisma.purchase.findUnique({
    where: { licenseKeyHash: verified.licenseKeyHash },
    select: { licenseStatus: true }
  });
  if (!purchase || purchase.licenseStatus !== 'active') {
    return NextResponse.json(
      { error: 'License is not active' },
      { status: 403 }
    );
  }

  // The token is signed by us, but never trust a name into a path — allow only
  // a bare filename, then confirm the resolved path stays inside SOFTWARE_DIR.
  const storedName = verified.storedName;
  if (!/^[A-Za-z0-9._-]+$/.test(storedName) || storedName.includes('..')) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
  }
  const absolute = path.join(SOFTWARE_DIR, storedName);
  const rootWithSep = SOFTWARE_DIR.endsWith(path.sep)
    ? SOFTWARE_DIR
    : SOFTWARE_DIR + path.sep;
  if (!absolute.startsWith(rootWithSep)) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
  }

  let info;
  try {
    info = await stat(absolute);
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
  if (!info.isFile()) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const ext = path.extname(absolute).toLowerCase();
  const contentType = MIME_BY_EXT[ext] ?? 'application/octet-stream';

  // Stream instead of buffering — installers can be up to 1 GB
  // (see SOFTWARE_FILE_MAX_BYTES). Content-Length drives the updater's
  // download progress bar (PackageDownloader reads it).
  const nodeStream = createReadStream(absolute);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

  return new Response(webStream, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Length': info.size.toString(),
      'Content-Disposition': `attachment; filename="${encodeURIComponent(storedName)}"`,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}
