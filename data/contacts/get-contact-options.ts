import 'server-only';

import { redirect } from 'next/navigation';

import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';

export type ContactOption = {
  name: string;
  email: string;
};

// Lightweight, org-scoped list of CRM contacts that have an email — used to
// populate the "Add license" contact dropdown. Uncached and capped; the
// Combobox does its own client-side search over these options.
export async function getContactOptions(): Promise<ContactOption[]> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const rows = await prisma.contact.findMany({
    where: {
      organizationId: session.user.organizationId,
      email: { not: null }
    },
    select: { name: true, email: true },
    orderBy: { name: 'asc' },
    take: 1000
  });

  return rows
    .filter((r): r is { name: string; email: string } => !!r.email)
    .map((r) => ({ name: r.name, email: r.email }));
}
