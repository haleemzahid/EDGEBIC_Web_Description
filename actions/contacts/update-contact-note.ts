'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { updateContactNoteSchema } from '@/schemas/contacts/update-contact-note-schema';

export const updateContactNote = authActionClient
  .metadata({ actionName: 'updateContactNote' })
  .schema(updateContactNoteSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const count = await prisma.contactNote.count({
      where: {
        id: parsedInput.id,
        contact: {
          organizationId: session.user.organizationId
        }
      }
    });
    if (count < 1) {
      throw new NotFoundError('Contact note not found');
    }

    const note = await prisma.contactNote.update({
      where: { id: parsedInput.id },
      data: {
        text: parsedInput.text,
        priority: parsedInput.priority,
        pinned: parsedInput.pinned ?? undefined,
        meetingId: parsedInput.meetingId === undefined
          ? undefined
          : parsedInput.meetingId === '' || parsedInput.meetingId === null
            ? null
            : parsedInput.meetingId
      },
      select: { contactId: true }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactNotes,
        session.user.organizationId,
        note.contactId
      )
    );
  });
