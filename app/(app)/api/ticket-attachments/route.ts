import { NextResponse, type NextRequest } from 'next/server';
import { Role } from '@prisma/client';
import { validate as uuidValidate } from 'uuid';

import { dedupedAuth } from '@/lib/auth';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import {
  saveTicketAttachmentFile,
  TICKET_ATTACHMENT_MAX_PER_MESSAGE
} from '@/lib/ticket-attachments/storage';

export async function POST(req: NextRequest): Promise<Response> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: 'Expected multipart/form-data' },
      { status: 400 }
    );
  }

  const ticketId = formData.get('ticketId');
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

  // Verify the user has access to this ticket. Clients may only upload to
  // their own tickets; team users to tickets within their organization.
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

  const files = formData.getAll('files').filter((v): v is File => v instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: 'No files provided' }, { status: 400 });
  }
  if (files.length > TICKET_ATTACHMENT_MAX_PER_MESSAGE) {
    return NextResponse.json(
      { error: `Maximum ${TICKET_ATTACHMENT_MAX_PER_MESSAGE} files per upload` },
      { status: 400 }
    );
  }

  const saved = [];
  for (const file of files) {
    try {
      saved.push(await saveTicketAttachmentFile(file));
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error ? error.message : 'Failed to save file'
        },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ attachments: saved }, { status: 201 });
}
