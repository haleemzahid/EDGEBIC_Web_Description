'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { deleteSoftwareFileByUrl } from '@/lib/software-files/storage';
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
      select: { contactId: true, downloadUrl: true }
    });

    // Remove the uploaded installer from disk too, but only if no other
    // software entry still points at the same file (uploads are 1:1 per row,
    // yet an admin could have pasted a shared URL). External links and rows
    // with no upload are ignored by the helper.
    if (row.downloadUrl) {
      const stillReferenced = await prisma.contactSoftware.count({
        where: { downloadUrl: row.downloadUrl }
      });
      if (stillReferenced === 0) {
        await deleteSoftwareFileByUrl(row.downloadUrl);
      }
    }

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactSoftware,
        session.user.organizationId,
        row.contactId
      )
    );
  });
