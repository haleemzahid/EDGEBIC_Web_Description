import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  Caching,
  defaultRevalidateTimeInSeconds,
  OrganizationCacheKey
} from '@/data/caching';
import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { ValidationError } from '@/lib/validation/exceptions';
import {
  getContactSoftwareSchema,
  type GetContactSoftwareSchema
} from '@/schemas/contacts/get-contact-software-schema';
import type { ContactSoftwareDto } from '@/types/dtos/contact-software-dto';

export async function getContactSoftware(
  input: GetContactSoftwareSchema
): Promise<ContactSoftwareDto[]> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const result = getContactSoftwareSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsedInput = result.data;

  return cache(
    async () => {
      const rows = await prisma.contactSoftware.findMany({
        where: {
          contactId: parsedInput.contactId,
          contact: {
            organizationId: session.user.organizationId
          }
        },
        select: {
          id: true,
          contactId: true,
          name: true,
          installedVersion: true,
          latestVersion: true,
          installDate: true,
          status: true,
          githubUrl: true,
          docsUrl: true,
          downloadUrl: true,
          licenseKey: true,
          licenseType: true,
          seats: true,
          os: true,
          database: true,
          installPath: true,
          notes: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: { createdAt: 'desc' }
      });

      return rows.map((row) => ({
        ...row,
        installedVersion: row.installedVersion ?? undefined,
        latestVersion: row.latestVersion ?? undefined,
        installDate: row.installDate ?? undefined,
        githubUrl: row.githubUrl ?? undefined,
        docsUrl: row.docsUrl ?? undefined,
        downloadUrl: row.downloadUrl ?? undefined,
        licenseKey: row.licenseKey ?? undefined,
        licenseType: row.licenseType ?? undefined,
        seats: row.seats ?? undefined,
        os: row.os ?? undefined,
        database: row.database ?? undefined,
        installPath: row.installPath ?? undefined,
        notes: row.notes ?? undefined
      }));
    },
    Caching.createOrganizationTag(
      OrganizationCacheKey.ContactSoftware,
      session.user.organizationId,
      parsedInput.contactId
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactSoftware,
          session.user.organizationId,
          parsedInput.contactId
        )
      ]
    }
  )();
}
