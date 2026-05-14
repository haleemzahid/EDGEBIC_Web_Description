import 'server-only';

import { redirect } from 'next/navigation';
import { type Session } from 'next-auth';
import { Role } from '@prisma/client';

import { Routes } from '@/constants/routes';
import { dedupedAuth } from '@/lib/auth';
import {
  getClientContactLink,
  type ClientContactLink
} from '@/lib/auth/get-client-contact';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';

export type RequireClientRoleResult = {
  session: Session;
  /** Null when the client user has no linked CRM contact yet. */
  link: ClientContactLink | null;
};

/**
 * Gate a client-portal route server-side:
 *   - redirect to login if unauthenticated
 *   - redirect to /dashboard if the user is not a CLIENT
 *   - return the resolved {@link ClientContactLink} (may be null if the client
 *     hasn't been matched to a CRM contact yet — caller renders an
 *     "unlinked" notice in that case).
 *
 * Reads `role` directly from the session token (projected in by the session
 * callback in [lib/auth/callbacks.ts]), avoiding a per-request DB lookup.
 */
export async function requireClientRole(): Promise<RequireClientRoleResult> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    redirect(getLoginRedirect());
  }

  if (session.user.role !== Role.CLIENT) {
    redirect(Routes.Home);
  }

  const link = await getClientContactLink(session.user.id);
  return { session, link };
}
