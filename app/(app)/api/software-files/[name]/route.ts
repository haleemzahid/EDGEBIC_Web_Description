import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import { NextResponse, type NextRequest } from 'next/server';

import {
  isValidStoredName,
  SOFTWARE_UPLOAD_DIR
} from '@/lib/software-files/storage';

// Serves installer files saved to local disk (local-dev backend). In
// production files live on Cloudinary and are fetched from its own URL,
// so this route is not used there. Range requests are supported so large
// downloads can resume.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function resolveFile(
  name: string
): Promise<{ filePath: string; size: number } | null> {
  if (!isValidStoredName(name)) return null;
  const filePath = path.join(SOFTWARE_UPLOAD_DIR, name);
  // Defense in depth: ensure the resolved path stays inside the dir.
  if (path.relative(SOFTWARE_UPLOAD_DIR, filePath).startsWith('..')) {
    return null;
  }
  try {
    const info = await stat(filePath);
    if (info.isFile()) {
      return { filePath, size: info.size };
    }
  } catch {
    return null;
  }
  return null;
}

function parseRange(
  header: string | null,
  size: number
): { start: number; end: number } | null {
  if (!header) return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return null;
  const [, rawStart, rawEnd] = match;
  let start: number;
  let end: number;
  if (rawStart === '') {
    const suffix = Number(rawEnd);
    if (!suffix) return null;
    start = Math.max(size - suffix, 0);
    end = size - 1;
  } else {
    start = Number(rawStart);
    end = rawEnd === '' ? size - 1 : Number(rawEnd);
  }
  if (
    Number.isNaN(start) ||
    Number.isNaN(end) ||
    start > end ||
    start < 0 ||
    end >= size
  ) {
    return null;
  }
  return { start, end };
}

function baseHeaders(name: string, size: number): Headers {
  const headers = new Headers();
  headers.set('Content-Type', 'application/octet-stream');
  headers.set('Content-Disposition', `attachment; filename="${name}"`);
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Cache-Control', 'private, max-age=0, must-revalidate');
  headers.set('Content-Length', String(size));
  return headers;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
): Promise<Response> {
  const { name } = await params;
  const resolved = await resolveFile(name);
  if (!resolved) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const { filePath, size } = resolved;

  const rangeHeader = req.headers.get('range');
  const range = parseRange(rangeHeader, size);

  if (rangeHeader && !range) {
    return new NextResponse(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${size}` }
    });
  }

  if (range) {
    const { start, end } = range;
    const headers = baseHeaders(name, end - start + 1);
    headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
    const nodeStream = createReadStream(filePath, { start, end });
    return new Response(Readable.toWeb(nodeStream) as ReadableStream, {
      status: 206,
      headers
    });
  }

  const headers = baseHeaders(name, size);
  const nodeStream = createReadStream(filePath);
  return new Response(Readable.toWeb(nodeStream) as ReadableStream, {
    status: 200,
    headers
  });
}

export async function HEAD(
  _req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
): Promise<Response> {
  const { name } = await params;
  const resolved = await resolveFile(name);
  if (!resolved) {
    return new NextResponse(null, { status: 404 });
  }
  return new NextResponse(null, {
    status: 200,
    headers: baseHeaders(name, resolved.size)
  });
}
