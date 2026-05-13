import 'server-only';

import { unstable_cache as cache } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { InvitationStatus } from '@prisma/client';

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
  getContactSchema,
  type GetContactSchema
} from '@/schemas/contacts/get-contact-schema';
import type {
  ContactDto,
  ContactInviteStatus
} from '@/types/dtos/contact-dto';

export async function getContact(input: GetContactSchema): Promise<ContactDto> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const result = getContactSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error.flatten()));
  }
  const parsedInput = result.data;

  return cache(
    async () => {
      const contact = await prisma.contact.findFirst({
        where: {
          organizationId: session.user.organizationId,
          id: parsedInput.id
        },
        select: {
          id: true,
          record: true,
          image: true,
          name: true,
          email: true,
          address: true,
          phone: true,
          jobTitle: true,
          company: true,
          website: true,
          linkedIn: true,
          country: true,
          timezone: true,
          leadSource: true,
          leadSourceDate: true,
          lastContactedAt: true,
          lastContactedNote: true,
          lastMeetingAt: true,
          lastMeetingNote: true,
          stripeCustomerId: true,
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
        }
      });
      if (!contact) {
        return notFound();
      }

      let inviteStatus: ContactInviteStatus = 'NONE';
      if (contact.email) {
        const [memberCount, latestInvitation] = await Promise.all([
          prisma.user.count({
            where: {
              organizationId: session.user.organizationId,
              email: { equals: contact.email, mode: 'insensitive' }
            }
          }),
          prisma.invitation.findFirst({
            where: {
              organizationId: session.user.organizationId,
              email: { equals: contact.email, mode: 'insensitive' }
            },
            orderBy: [{ createdAt: 'desc' }],
            select: { status: true }
          })
        ]);
        if (memberCount > 0) {
          inviteStatus = 'USER_EXISTS';
        } else if (latestInvitation) {
          inviteStatus =
            latestInvitation.status === InvitationStatus.ACCEPTED
              ? 'ACCEPTED'
              : latestInvitation.status === InvitationStatus.PENDING
                ? 'PENDING'
                : 'REVOKED';
        }
      }

      const response: ContactDto = {
        id: contact.id,
        record: contact.record,
        image: contact.image ? contact.image : undefined,
        name: contact.name,
        email: contact.email ? contact.email : undefined,
        address: contact.address ? contact.address : undefined,
        phone: contact.phone ? contact.phone : undefined,
        jobTitle: contact.jobTitle ?? undefined,
        company: contact.company ?? undefined,
        website: contact.website ?? undefined,
        linkedIn: contact.linkedIn ?? undefined,
        country: contact.country ?? undefined,
        timezone: contact.timezone ?? undefined,
        leadSource: contact.leadSource ?? undefined,
        leadSourceDate: contact.leadSourceDate ?? undefined,
        lastContactedAt: contact.lastContactedAt ?? undefined,
        lastContactedNote: contact.lastContactedNote ?? undefined,
        lastMeetingAt: contact.lastMeetingAt ?? undefined,
        lastMeetingNote: contact.lastMeetingNote ?? undefined,
        stripeCustomerId: contact.stripeCustomerId ?? undefined,
        stage: contact.stage,
        isRead: contact.isRead,
        description: contact.description ? contact.description : undefined,
        productInterest: contact.productInterest
          ? contact.productInterest
          : undefined,
        hearAboutUs: contact.hearAboutUs ? contact.hearAboutUs : undefined,
        createdAt: contact.createdAt,
        tags: contact.tags,
        inviteStatus
      };

      return response;
    },
    Caching.createOrganizationKeyParts(
      OrganizationCacheKey.Contact,
      session.user.organizationId,
      parsedInput.id
    ),
    {
      revalidate: defaultRevalidateTimeInSeconds,
      tags: [
        Caching.createOrganizationTag(
          OrganizationCacheKey.Contact,
          session.user.organizationId,
          parsedInput.id
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
