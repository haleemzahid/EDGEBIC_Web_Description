import { NextResponse, type NextRequest } from 'next/server';
import { Role } from '@prisma/client';
import { validate as uuidValidate } from 'uuid';

import { dedupedAuth } from '@/lib/auth';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { checkSession } from '@/lib/auth/session';
import { ticketChannelName } from '@/lib/ably/channel-names';
import { getAblyRest, isAblyConfigured } from '@/lib/ably/server';
import { prisma } from '@/lib/db/prisma';

/**
 * Mints a short-lived Ably token scoped to a SINGLE ticket channel after
 * verifying the caller can actually see that ticket. The browser holds the
 * `ABLY_API_KEY` never — only this token.
 */
export async function POST(req: NextRequest): Promise<Response> {
  if (!isAblyConfigured()) {
    return NextResponse.json(
      { error: 'Realtime not configured' },
      { status: 503 }
    );
  }

  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const ticketId =
    body && typeof body === 'object' && 'ticketId' in body
      ? (body as { ticketId?: unknown }).ticketId
      : undefined;
  if (typeof ticketId !== 'string' || !uuidValidate(ticketId)) {
    return NextResponse.json({ error: 'Invalid ticketId' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (user.role === Role.CLIENT) {
    const link = await getClientContactLink(session.user.id);
    if (!link) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const ticket = await prisma.contactTicket.findFirst({
      where: { id: ticketId, contactId: link.contactId },
      select: { id: true }
    });
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }
  } else {
    const ticket = await prisma.contactTicket.findFirst({
      where: {
        id: ticketId,
        contact: { organizationId: session.user.organizationId }
      },
      select: { id: true }
    });
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }
  }

  const rest = getAblyRest();
  if (!rest) {
    return NextResponse.json(
      { error: 'Realtime not configured' },
      { status: 503 }
    );
  }

  const channel = ticketChannelName(ticketId);
  const tokenRequest = await rest.auth.createTokenRequest({
    clientId: session.user.id,
    capability: { [channel]: ['subscribe', 'history'] }
  });

  return NextResponse.json(tokenRequest, {
    headers: { 'Cache-Control': 'no-store' }
  });
}
