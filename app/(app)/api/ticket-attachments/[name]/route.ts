import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import { NextResponse, type NextRequest } from 'next/server';

import {
  isValidAttachmentName,
  TICKET_ATTACHMENT_DIR,
  TICKET_ATTACHMENT_FOLDER
} from '@/lib/ticket-attachments/storage';
import { cloudinaryRawUrl, useCloudinary } from '@/lib/uploads/cloudinary';

// Serves ticket/message attachments. Single URL for the app; the backend
// is hidden here:
//  - production: 302 redirect to the deterministic Cloudinary raw URL
//  - local dev: stream the file from disk
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CONTENT_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg'
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
): Promise<Response> {
  const { name } = await params;
  if (!isValidAttachmentName(name)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (useCloudinary()) {
    return NextResponse.redirect(
      cloudinaryRawUrl(TICKET_ATTACHMENT_FOLDER, name),
      302
    );
  }

  const filePath = path.join(TICKET_ATTACHMENT_DIR, name);
  if (path.relative(TICKET_ATTACHMENT_DIR, filePath).startsWith('..')) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  let size: number;
  try {
    const info = await stat(filePath);
    if (!info.isFile()) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    size = info.size;
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const ext = path.extname(name).toLowerCase();
  const contentType = CONTENT_TYPES[ext] ?? 'application/octet-stream';
  const headers = new Headers();
  headers.set('Content-Type', contentType);
  headers.set('Content-Length', String(size));
  headers.set('Cache-Control', 'private, max-age=0, must-revalidate');
  // Images/PDF preview inline; everything else downloads.
  headers.set(
    'Content-Disposition',
    contentType.startsWith('image/') || contentType === 'application/pdf'
      ? 'inline'
      : `attachment; filename="${name}"`
  );

  const nodeStream = createReadStream(filePath);
  return new Response(Readable.toWeb(nodeStream) as ReadableStream, {
    status: 200,
    headers
  });
}
