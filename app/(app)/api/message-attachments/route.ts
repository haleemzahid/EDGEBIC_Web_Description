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

  // Three modes:
  //   - threadId  → uploading attachments for an existing thread (reply flow)
  //   - contactId → admin composing a new email to a known contact
  //   - neither   → a CLIENT composing a new thread (uses their linked contact)
  const threadId = formData.get('threadId');
  const contactId = formData.get('contactId');

  if (typeof threadId === 'string' && threadId.length > 0) {
    if (!uuidValidate(threadId)) {
      return NextResponse.json({ error: 'Invalid threadId' }, { status: 400 });
    }
    if (session.user.role === Role.CLIENT) {
      const link = await getClientContactLink(session.user.id);
      if (!link) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      const thread = await prisma.contactEmailThread.findFirst({
        where: { id: threadId, contactId: link.contactId },
        select: { id: true }
      });
      if (!thread) {
        return NextResponse.json(
          { error: 'Thread not found' },
          { status: 404 }
        );
      }
    } else {
      const thread = await prisma.contactEmailThread.findFirst({
        where: {
          id: threadId,
          contact: { organizationId: session.user.organizationId }
        },
        select: { id: true }
      });
      if (!thread) {
        return NextResponse.json(
          { error: 'Thread not found' },
          { status: 404 }
        );
      }
    }
  } else if (typeof contactId === 'string' && contactId.length > 0) {
    if (!uuidValidate(contactId)) {
      return NextResponse.json({ error: 'Invalid contactId' }, { status: 400 });
    }
    if (session.user.role === Role.CLIENT) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const contact = await prisma.contact.findFirst({
      where: { id: contactId, organizationId: session.user.organizationId },
      select: { id: true }
    });
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
  } else {
    // No thread, no contact: only a CLIENT composing a new thread can do this.
    if (session.user.role !== Role.CLIENT) {
      return NextResponse.json(
        { error: 'threadId or contactId required' },
        { status: 400 }
      );
    }
    const link = await getClientContactLink(session.user.id);
    if (!link) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  const files = formData
    .getAll('files')
    .filter((v): v is File => v instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: 'No files provided' }, { status: 400 });
  }
  if (files.length > TICKET_ATTACHMENT_MAX_PER_MESSAGE) {
    return NextResponse.json(
      {
        error: `Maximum ${TICKET_ATTACHMENT_MAX_PER_MESSAGE} files per upload`
      },
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
