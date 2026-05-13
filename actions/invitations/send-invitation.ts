'use server';

import { revalidateTag } from 'next/cache';
import {
  ActionType,
  ActorType,
  ContactRecord,
  ContactStage,
  InvitationStatus,
  Role
} from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Routes } from '@/constants/routes';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { isAdmin } from '@/lib/auth/permissions';
import { prisma } from '@/lib/db/prisma';
import { sendInvitationEmail } from '@/lib/smtp/send-invitation-email';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import {
  ForbiddenError,
  NotFoundError,
  PreConditionError
} from '@/lib/validation/exceptions';
import { sendInvitationSchema } from '@/schemas/invitations/send-invitation-schema';

export const sendInvitation = authActionClient
  .metadata({ actionName: 'sendInvitation' })
  .schema(sendInvitationSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    if (parsedInput.role === Role.ADMIN && !(await isAdmin(session.user.id))) {
      throw new ForbiddenError('Insufficient permissions');
    }

    const [countUsers, countInvitations] = await prisma.$transaction([
      prisma.user.count({
        where: {
          email: parsedInput.email
        }
      }),
      prisma.invitation.count({
        where: {
          email: parsedInput.email,
          organizationId: session.user.organizationId,
          status: {
            not: InvitationStatus.REVOKED
          }
        }
      })
    ]);
    if (countUsers > 0 || countInvitations > 0) {
      throw new PreConditionError('Email address is already taken');
    }

    const organization = await prisma.organization.findFirst({
      where: { id: session.user.organizationId },
      select: { name: true }
    });
    if (!organization) {
      throw new NotFoundError('Organization not found');
    }

    const [, invitation] = await prisma.$transaction([
      prisma.invitation.updateMany({
        where: {
          organizationId: session.user.organizationId,
          email: parsedInput.email,
          AND: [
            { NOT: { status: { equals: InvitationStatus.ACCEPTED } } },
            { NOT: { status: { equals: InvitationStatus.REVOKED } } }
          ]
        },
        data: {
          status: InvitationStatus.REVOKED
        }
      }),
      prisma.invitation.create({
        data: {
          email: parsedInput.email,
          role: parsedInput.role,
          organizationId: session.user.organizationId
        },
        select: {
          id: true,
          role: true,
          email: true,
          token: true
        }
      })
    ]);

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Invitations,
        session.user.organizationId
      )
    );

    // Mirror the invitee into CRM as a Contact so they appear in the contacts
    // list with an "Invited" badge. Only do this for CLIENT invitations — ADMIN
    // invitations are internal team members and don't belong in the customer CRM.
    if (parsedInput.role === Role.CLIENT) {
      const existingContact = await prisma.contact.findFirst({
        where: {
          organizationId: session.user.organizationId,
          email: { equals: parsedInput.email, mode: 'insensitive' }
        },
        select: { id: true }
      });

      if (!existingContact) {
        const derivedName = parsedInput.email.split('@')[0] || parsedInput.email;
        const created = await prisma.contact.create({
          data: {
            organizationId: session.user.organizationId,
            record: ContactRecord.PERSON,
            name: derivedName,
            email: parsedInput.email,
            stage: ContactStage.WON,
            isRead: false
          },
          select: { id: true, createdAt: true }
        });
        await prisma.contactActivity.create({
          data: {
            contactId: created.id,
            actionType: ActionType.CREATE,
            actorId: session.user.id,
            actorType: ActorType.MEMBER,
            metadata: {
              source: { old: '', new: 'invitation' },
              email: { old: '', new: parsedInput.email },
              role: { old: '', new: parsedInput.role }
            },
            occurredAt: created.createdAt
          }
        });
      }

      revalidateTag(
        Caching.createOrganizationTag(
          OrganizationCacheKey.Contacts,
          session.user.organizationId
        )
      );
    }

    await sendInvitationEmail({
      recipient: parsedInput.email,
      organizationName: organization.name,
      invitedByEmail: session.user.email,
      invitedByName: session.user.name,
      inviteLink: `${getBaseUrl()}${Routes.InvitationRequest}/${invitation.token}`
    });

    await prisma.invitation.update({
      where: {
        id: invitation.id,
        organizationId: session.user.organizationId
      },
      data: { lastSentAt: new Date() },
      select: {
        id: true // SELECT NONE
      }
    });
  });
