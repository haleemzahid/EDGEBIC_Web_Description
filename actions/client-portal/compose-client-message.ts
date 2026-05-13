'use server';

import { revalidateTag } from 'next/cache';
import { EmailFolder, EmailSenderType, Role } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';
import { ForbiddenError, NotFoundError } from '@/lib/validation/exceptions';
import { composeClientMessageSchema } from '@/schemas/client-portal/compose-client-message-schema';

export const composeClientMessage = authActionClient
  .metadata({ actionName: 'composeClientMessage' })
  .schema(composeClientMessageSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });
    if (!user || user.role !== Role.CLIENT) {
      throw new ForbiddenError('Only client users can use this action.');
    }

    const link = await getClientContactLink(session.user.id);
    if (!link) {
      throw new NotFoundError(
        'Your client profile is not linked to a CRM contact.'
      );
    }

    // From the team's perspective, a thread the client initiates is an
    // incoming conversation → INBOX folder, marked unread so the team sees it.
    const thread = await prisma.contactEmailThread.create({
      data: {
        contactId: link.contactId,
        folder: EmailFolder.INBOX,
        subject: parsedInput.subject,
        preview: parsedInput.body.slice(0, 500),
        unread: true,
        messages: {
          create: {
            senderType: EmailSenderType.CONTACT,
            senderName: link.name,
            senderEmail: link.email,
            body: parsedInput.body
          }
        }
      },
      select: { id: true }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactEmails,
        link.organizationId,
        link.contactId
      )
    );

    return { threadId: thread.id };
  });
