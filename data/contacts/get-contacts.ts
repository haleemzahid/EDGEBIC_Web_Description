import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { redirect } from 'next/navigation';
import { ContactRecord, InvitationStatus, Prisma } from '@prisma/client';

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
  getContactsSchema,
  InvitedOption,
  RecordsOption,
  type GetContactsSchema
} from '@/schemas/contacts/get-contacts-schema';
import type {
  ContactDto,
  ContactInviteStatus
} from '@/types/dtos/contact-dto';

export async function getContacts(input: GetContactsSchema): Promise<{
  contacts: ContactDto[];
  filteredCount: number;
  totalCount: number;
}> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const result = getContactsSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsedInput = result.data;

  const searchCriteria: Prisma.StringFilter | undefined =
    parsedInput.searchQuery
      ? { contains: parsedInput.searchQuery, mode: 'insensitive' }
      : undefined;
  const searchVector = searchCriteria
    ? [{ name: searchCriteria }, { email: searchCriteria }]
    : undefined;

  return cache(
    async () => {
      // Build invited-email set up front so it can both drive the filter and
      // populate each contact's inviteStatus without an extra round-trip.
      const [invitedRows, memberRows] = await Promise.all([
        prisma.invitation.findMany({
          where: {
            organizationId: session.user.organizationId,
            status: { not: InvitationStatus.REVOKED }
          },
          select: { email: true, status: true }
        }),
        prisma.user.findMany({
          where: {
            organizationId: session.user.organizationId,
            email: { not: null }
          },
          select: { email: true }
        })
      ]);

      const memberEmails = new Set(
        memberRows
          .map((m) => m.email?.toLowerCase())
          .filter((e): e is string => !!e)
      );
      const invitationByEmail = new Map<string, InvitationStatus>();
      for (const row of invitedRows) {
        const key = row.email.toLowerCase();
        // PENDING wins over ACCEPTED if a fresh invite was created after acceptance.
        const existing = invitationByEmail.get(key);
        if (!existing || row.status === InvitationStatus.PENDING) {
          invitationByEmail.set(key, row.status);
        }
      }
      const knownEmails = new Set<string>([
        ...memberEmails,
        ...invitationByEmail.keys()
      ]);

      const invitedFilter: Prisma.ContactWhereInput | undefined =
        parsedInput.invited === InvitedOption.Invited
          ? knownEmails.size > 0
            ? { email: { in: [...knownEmails], mode: 'insensitive' } }
            : { id: '00000000-0000-0000-0000-000000000000' } // force empty result
          : parsedInput.invited === InvitedOption.NotInvited
            ? knownEmails.size > 0
              ? {
                  OR: [
                    { email: null },
                    { email: { notIn: [...knownEmails], mode: 'insensitive' } }
                  ]
                }
              : undefined
            : undefined;

      const baseWhere: Prisma.ContactWhereInput = {
        organizationId: session.user.organizationId,
        record: mapRecords(parsedInput.records),
        tags:
          parsedInput.tags && parsedInput.tags.length > 0
            ? { some: { text: { in: parsedInput.tags } } }
            : undefined,
        OR: searchVector,
        ...(invitedFilter ?? {})
      };

      const [contacts, filteredCount, totalCount] = await prisma.$transaction([
        prisma.contact.findMany({
          skip: parsedInput.pageIndex * parsedInput.pageSize,
          take: parsedInput.pageSize,
          where: baseWhere,
          select: {
            id: true,
            record: true,
            image: true,
            name: true,
            email: true,
            address: true,
            phone: true,
            stage: true,
            isRead: true,
            description: true,
            productInterest: true,
            hearAboutUs: true,
            createdAt: true,
            tags: {
              select: {
                id: true,
                text: true
              }
            }
          },
          orderBy: [
            { isRead: 'asc' },
            { [parsedInput.sortBy]: parsedInput.sortDirection }
          ]
        }),
        prisma.contact.count({
          where: baseWhere
        }),
        prisma.contact.count({
          where: {
            organizationId: session.user.organizationId
          }
        })
      ]);

      const resolveInviteStatus = (
        email?: string | null
      ): ContactInviteStatus => {
        if (!email) return 'NONE';
        const key = email.toLowerCase();
        if (memberEmails.has(key)) return 'USER_EXISTS';
        const status = invitationByEmail.get(key);
        if (!status) return 'NONE';
        return status === InvitationStatus.ACCEPTED
          ? 'ACCEPTED'
          : status === InvitationStatus.PENDING
            ? 'PENDING'
            : 'REVOKED';
      };

      const mapped: ContactDto[] = contacts.map((contact) => ({
        id: contact.id,
        record: contact.record,
        image: contact.image ? contact.image : undefined,
        name: contact.name,
        email: contact.email ? contact.email : undefined,
        address: contact.address ? contact.address : undefined,
        phone: contact.phone ? contact.phone : undefined,
        stage: contact.stage,
        isRead: contact.isRead,
        description: contact.description ? contact.description : undefined,
        productInterest: contact.productInterest ? contact.productInterest : undefined,
        hearAboutUs: contact.hearAboutUs ? contact.hearAboutUs : undefined,
        createdAt: contact.createdAt,
        tags: contact.tags,
        inviteStatus: resolveInviteStatus(contact.email)
      }));

      return { contacts: mapped, filteredCount, totalCount };
    },
    Caching.createOrganizationKeyParts(
      OrganizationCacheKey.Contacts,
      session.user.organizationId,
      parsedInput.pageIndex.toString(),
      parsedInput.pageSize.toString(),
      parsedInput.sortBy,
      parsedInput.sortDirection,
      parsedInput.tags.join(','),
      parsedInput.records?.toString() ?? '',
      parsedInput.invited?.toString() ?? '',
      parsedInput.searchQuery?.toString() ?? ''
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.Contacts,
          session.user.organizationId
        ),
        Caching.createOrganizationTag(
          OrganizationCacheKey.Invitations,
          session.user.organizationId
        ),
        Caching.createOrganizationTag(
          OrganizationCacheKey.Members,
          session.user.organizationId
        )
      ]
    }
  )();
}

function mapRecords(option: RecordsOption): ContactRecord | undefined {
  switch (option) {
    case RecordsOption.People:
      return ContactRecord.PERSON;
    case RecordsOption.Companies:
      return ContactRecord.COMPANY;
  }

  return undefined;
}
