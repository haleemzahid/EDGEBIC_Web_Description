import { NextResponse, type NextRequest } from 'next/server';
import { createSearchParamsCache, parseAsString } from 'nuqs/server';
import { validate as uuidValidate } from 'uuid';

import { dedupedAuth } from '@/lib/auth';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import type { Params } from '@/types/request-params';

const paramsCache = createSearchParamsCache({
  fileId: parseAsString.withDefault('')
});

export async function GET(
  req: NextRequest,
  props: { params: Promise<Params> }
): Promise<Response> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return new NextResponse(undefined, { status: 401 });
  }

  const { fileId } = await paramsCache.parse(props.params);
  if (!fileId || !uuidValidate(fileId)) {
    return new NextResponse(undefined, {
      status: 400,
      headers: { 'Cache-Control': 'no-store' }
    });
  }

  const file = await prisma.contactMeetingFile.findFirst({
    where: {
      id: fileId,
      meeting: {
        contact: {
          organizationId: session.user.organizationId
        }
      }
    },
    select: {
      name: true,
      contentType: true,
      data: true
    }
  });

  if (!file || !file.data) {
    return new NextResponse(undefined, {
      status: 404,
      headers: { 'Cache-Control': 'no-store' }
    });
  }

  const { searchParams } = new URL(req.url);
  const download = searchParams.get('download') === '1';
  const disposition = download
    ? `attachment; filename="${encodeURIComponent(file.name)}"`
    : `inline; filename="${encodeURIComponent(file.name)}"`;

  return new NextResponse(file.data, {
    status: 200,
    headers: {
      'Cache-Control': 'private, max-age=86400, immutable',
      'Content-Type': file.contentType || 'application/octet-stream',
      'Content-Length': file.data.length.toString(),
      'Content-Disposition': disposition
    }
  });
}
