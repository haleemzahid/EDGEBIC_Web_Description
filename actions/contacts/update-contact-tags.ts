'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import { updateContactTagsSchema } from '@/schemas/contacts/update-contact-tags-schema';

export const updateContactTags = authActionClient
  .metadata({ actionName: 'updateContactTags' })
  .schema(updateContactTagsSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    // Verify the contact belongs to the caller's organization.
    const contact = await prisma.contact.findFirst({
      where: {
        organizationId: session.user.organizationId,
        id: parsedInput.id
      },
      select: { id: true }
    });
    if (!contact) {
      throw new NotFoundError('Contact not found');
    }

    // Normalize, trim, dedupe. Tags are case-insensitive in practice — keep
    // the original casing the user typed but compare by lowercased text when
    // deduping so 'Sales' and 'sales' don't both end up linked.
    const seenLower = new Set<string>();
    const desiredTexts: string[] = [];
    for (const tag of parsedInput.tags) {
      const text = tag.text.trim();
      if (!text) continue;
      const lower = text.toLowerCase();
      if (seenLower.has(lower)) continue;
      seenLower.add(lower);
      desiredTexts.push(text);
    }

    await prisma.$transaction(async (tx) => {
      if (desiredTexts.length > 0) {
        // Ensure all requested tags exist. skipDuplicates means parallel
        // requests can race here safely.
        await tx.contactTag.createMany({
          data: desiredTexts.map((text) => ({ text })),
          skipDuplicates: true
        });
      }

      // Fetch IDs for every desired tag (will exist after createMany above).
      const desiredTags =
        desiredTexts.length > 0
          ? await tx.contactTag.findMany({
              where: { text: { in: desiredTexts } },
              select: { id: true }
            })
          : [];

      // Replace the contact's entire tag relation in one operation. `set`
      // is atomic — no risk of a stale disconnect targeting a tag ID that
      // changed between read and write.
      await tx.contact.update({
        where: { id: contact.id },
        data: {
          updatedAt: new Date(),
          tags: {
            set: desiredTags.map((t) => ({ id: t.id }))
          }
        }
      });
    });

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
        parsedInput.id
      )
    );
  });
