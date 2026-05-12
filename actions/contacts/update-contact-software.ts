'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { updateContactSoftwareSchema } from '@/schemas/contacts/update-contact-software-schema';

export const updateContactSoftware = authActionClient
  .metadata({ actionName: 'updateContactSoftware' })
  .schema(updateContactSoftwareSchema)
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

    const row = await prisma.contactSoftware.update({
      where: { id: parsedInput.id },
      data: {
        name: parsedInput.name,
        installedVersion: parsedInput.installedVersion || null,
        latestVersion: parsedInput.latestVersion || null,
        installDate: parsedInput.installDate ?? null,
        status: parsedInput.status,
        githubUrl: parsedInput.githubUrl || null,
        docsUrl: parsedInput.docsUrl || null,
        downloadUrl: parsedInput.downloadUrl || null,
        licenseKey: parsedInput.licenseKey || null,
        licenseType: parsedInput.licenseType || null,
        seats: parsedInput.seats ?? null,
        os: parsedInput.os || null,
        database: parsedInput.database || null,
        installPath: parsedInput.installPath || null,
        notes: parsedInput.notes || null
      },
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
