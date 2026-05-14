import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { type SoftwareStatus } from '@prisma/client';

import {
  Caching,
  defaultRevalidateTimeInSeconds,
  OrganizationCacheKey
} from '@/data/caching';
import { type ClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';

export type ClientSoftwareDto = {
  id: string;
  name: string;
  installedVersion: string | null;
  latestVersion: string | null;
  installDate: Date | null;
  status: SoftwareStatus;
  docsUrl: string | null;
  downloadUrl: string | null;
  licenseType: string | null;
  seats: number | null;
  os: string | null;
  database: string | null;
  notes: string | null;
};

/**
 * Returns the software the team has provisioned for this client.
 * Hides admin-only operational fields (licenseKey, installPath, githubUrl).
 */
export async function getClientSoftware(
  link: ClientContactLink
): Promise<ClientSoftwareDto[]> {
  const raw = await cache(
    async () => {
      return prisma.contactSoftware.findMany({
        where: { contactId: link.contactId },
        orderBy: [{ status: 'asc' }, { name: 'asc' }],
        select: {
          id: true,
          name: true,
          installedVersion: true,
          latestVersion: true,
          installDate: true,
          status: true,
          docsUrl: true,
          downloadUrl: true,
          licenseType: true,
          seats: true,
          os: true,
          database: true,
          notes: true
        }
      });
    },
    Caching.createOrganizationKeyParts(
      OrganizationCacheKey.ContactSoftware,
      link.organizationId,
      'client-list',
      link.contactId
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactSoftware,
          link.organizationId
        ),
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactSoftware,
          link.organizationId,
          link.contactId
        )
      ]
    }
  )();

  return raw.map((r) => ({
    ...r,
    installDate: r.installDate ? new Date(r.installDate) : null
  }));
}
