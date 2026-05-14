'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { updateContactAndCaptureEvent } from '@/lib/db/contact-event-capture';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { updateContactActivitySchema } from '@/schemas/contacts/update-contact-activity-schema';

export const updateContactActivity = authActionClient
  .metadata({ actionName: 'updateContactActivity' })
  .schema(updateContactActivitySchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const contact = await prisma.contact.findFirst({
      where: {
        organizationId: session.user.organizationId,
        id: parsedInput.id
      },
      select: { id: true }
    });
    if (!contact) {
      throw new NotFoundError('Contact not found');
    }

    await updateContactAndCaptureEvent(
      parsedInput.id,
      {
        lastContactedAt: parsedInput.lastContactedAt ?? null,
        lastContactedNote: parsedInput.lastContactedNote || null,
        lastMeetingAt: parsedInput.lastMeetingAt ?? null,
        lastMeetingNote: parsedInput.lastMeetingNote || null
      },
      session.user.id
    );

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Contacts,
        session.user.organizationId
      )
    );
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Contact,
        session.user.organizationId,
        parsedInput.id
      )
    );
  });
