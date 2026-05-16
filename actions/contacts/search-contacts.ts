'use server';

import { authActionClient } from '@/actions/safe-action';
import { prisma } from '@/lib/db/prisma';
import { searchContactsSchema } from '@/schemas/contacts/search-contacts-schema';

export type ContactSuggestion = {
  name: string;
  email: string;
};

// Lightweight typeahead source for the compose recipient fields. Kept
// separate from the heavy cached getContacts() data fetcher — this is an
// uncached, capped, org-scoped lookup of contacts that have an email.
export const searchContacts = authActionClient
  .metadata({ actionName: 'searchContacts' })
  .schema(searchContactsSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const q = parsedInput.query;
    const rows = await prisma.contact.findMany({
      where: {
        organizationId: session.user.organizationId,
        email: { not: null },
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { email: { contains: q, mode: 'insensitive' } }
        ]
      },
      select: { name: true, email: true },
      orderBy: { name: 'asc' },
      take: 8
    });

    const suggestions: ContactSuggestion[] = rows
      .filter((r): r is { name: string; email: string } => !!r.email)
      .map((r) => ({ name: r.name, email: r.email }));

    return { suggestions };
  });
