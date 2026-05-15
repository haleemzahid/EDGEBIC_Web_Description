import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { Prisma, type SoftwareStatus } from '@prisma/client';

import {
  Caching,
  defaultRevalidateTimeInSeconds,
  OrganizationCacheKey
} from '@/data/caching';
import { type ClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';
import { ValidationError } from '@/lib/validation/exceptions';
import {
  ClientSoftwareStatusAll,
  getClientSoftwareSchema,
  type GetClientSoftwareSchema
} from '@/schemas/client-portal/get-client-software-schema';

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

export type GetClientSoftwareListResult = {
  software: ClientSoftwareDto[];
  filteredCount: number;
  totalCount: number;
};

/**
 * Filtered, paginated, search-aware version. Not cached (filters vary).
 */
export async function getClientSoftwareList(
  link: ClientContactLink,
  input: GetClientSoftwareSchema
): Promise<GetClientSoftwareListResult> {
  const result = getClientSoftwareSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsed = result.data;

  const baseFilter: Prisma.ContactSoftwareWhereInput = {
    contactId: link.contactId
  };

  const trimmed = parsed.searchQuery.trim();
  const textSearch: Prisma.ContactSoftwareWhereInput | undefined = trimmed
    ? {
        OR: [
          { name: { contains: trimmed, mode: 'insensitive' as const } },
          {
            installedVersion: {
              contains: trimmed,
              mode: 'insensitive' as const
            }
          },
          { notes: { contains: trimmed, mode: 'insensitive' as const } }
        ]
      }
    : undefined;

  const where: Prisma.ContactSoftwareWhereInput = {
    AND: [
      baseFilter,
      parsed.status === ClientSoftwareStatusAll
        ? {}
        : { status: parsed.status },
      textSearch ?? {}
    ]
  };

  const [rows, filteredCount, totalCount] = await prisma.$transaction([
    prisma.contactSoftware.findMany({
      skip: parsed.pageIndex * parsed.pageSize,
      take: parsed.pageSize,
      where,
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
    }),
    prisma.contactSoftware.count({ where }),
    prisma.contactSoftware.count({ where: baseFilter })
  ]);

  return {
    software: rows.map((r) => ({
      ...r,
      installDate: r.installDate ? new Date(r.installDate) : null
    })),
    filteredCount,
    totalCount
  };
}
