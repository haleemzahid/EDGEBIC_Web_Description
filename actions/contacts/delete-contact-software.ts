'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { deleteContactSoftwareSchema } from '@/schemas/contacts/delete-contact-software-schema';

export const deleteContactSoftware = authActionClient
  .metadata({ actionName: 'deleteContactSoftware' })
  .schema(deleteContactSoftwareSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const count = await prisma.contactSoftware.count({
      where: {
        id: parsedInput.id,
        contact: { organizationId: session.user.organizationId }
      }
    });
    if (count < 1) {
      throw new NotFoundError('Software entry not found');
    }

    const row = await prisma.contactSoftware.delete({
      where: { id: parsedInput.id },
      select: { contactId: true }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactSoftware,
        session.user.organizationId,
        row.contactId
      )
    );
  });
