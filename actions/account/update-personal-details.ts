'use server';

import { createHash } from 'crypto';
import { revalidateTag } from 'next/cache';
import { Role } from '@prisma/client';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey, UserCacheKey } from '@/data/caching';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { prisma } from '@/lib/db/prisma';
import { decodeBase64Image } from '@/lib/imaging/decode-base64-image';
import { resizeImage } from '@/lib/imaging/resize-image';
import { getUserImageUrl } from '@/lib/urls/get-user-image-url';
import { updatePersonalDetailsSchema } from '@/schemas/account/update-personal-details-schema';
import { FileUploadAction } from '@/types/file-upload-action';
import type { Maybe } from '@/types/maybe';

export const updatePersonalDetails = authActionClient
  .metadata({ actionName: 'updatePersonalDetails' })
  .schema(updatePersonalDetailsSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const transactions = [];
    let imageUrl: Maybe<string> = undefined;

    if (parsedInput.action === FileUploadAction.Update && parsedInput.image) {
      const { buffer, mimeType } = decodeBase64Image(parsedInput.image);
      const data = await resizeImage(buffer, mimeType);
      const hash = createHash('sha256').update(data).digest('hex');

      transactions.push(
        prisma.userImage.deleteMany({
          where: { userId: session.user.id }
        })
      );

      transactions.push(
        prisma.userImage.create({
          data: {
            userId: session.user.id,
            data,
            contentType: mimeType,
            hash
          }
        })
      );

      imageUrl = getUserImageUrl(session.user.id, hash);
    }
    if (parsedInput.action === FileUploadAction.Delete) {
      transactions.push(
        prisma.userImage.deleteMany({
          where: { userId: session.user.id }
        })
      );

      imageUrl = null;
    }

    transactions.push(
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          image: imageUrl,
          name: parsedInput.name,
          phone: parsedInput.phone
        },
        select: {
          id: true // SELECT NONE
        }
      })
    );

    // CLIENT users have a linked Contact in the CRM. Mirror name/phone there
    // so the team sees up-to-date details without manual re-entry.
    const callingUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });
    let mirroredContactId: string | null = null;
    if (callingUser?.role === Role.CLIENT) {
      const link = await getClientContactLink(session.user.id);
      if (link) {
        mirroredContactId = link.contactId;
        transactions.push(
          prisma.contact.update({
            where: { id: link.contactId },
            data: {
              name: parsedInput.name,
              phone: parsedInput.phone || null
            },
            select: { id: true }
          })
        );
      }
    }

    await prisma.$transaction(transactions);

    revalidateTag(
      Caching.createUserTag(UserCacheKey.PersonalDetails, session.user.id)
    );
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Members,
        session.user.organizationId
      )
    );
    if (mirroredContactId) {
      revalidateTag(
        Caching.createOrganizationTag(
          OrganizationCacheKey.Contacts,
          session.user.organizationId
        )
      );
      revalidateTag(
        Caching.createOrganizationTag(
          OrganizationCacheKey.Contact,
          session.user.organizationId,
          mirroredContactId
        )
      );
    }
  });
