'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { addContactSoftwareSchema } from '@/schemas/contacts/add-contact-software-schema';

export const addContactSoftware = authActionClient
  .metadata({ actionName: 'addContactSoftware' })
  .schema(addContactSoftwareSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    await prisma.contactSoftware.create({
      data: {
        contactId: parsedInput.contactId,
        name: parsedInput.name,
        installedVersion: parsedInput.installedVersion || undefined,
        latestVersion: parsedInput.latestVersion || undefined,
        installDate: parsedInput.installDate ?? undefined,
        status: parsedInput.status,
        githubUrl: parsedInput.githubUrl || undefined,
        docsUrl: parsedInput.docsUrl || undefined,
        downloadUrl: parsedInput.downloadUrl || undefined,
        licenseKey: parsedInput.licenseKey || undefined,
        licenseType: parsedInput.licenseType || undefined,
        seats: parsedInput.seats ?? undefined,
        os: parsedInput.os || undefined,
        database: parsedInput.database || undefined,
        installPath: parsedInput.installPath || undefined,
        notes: parsedInput.notes || undefined
      },
      select: { id: true }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactSoftware,
        session.user.organizationId,
        parsedInput.contactId
      )
    );
  });
