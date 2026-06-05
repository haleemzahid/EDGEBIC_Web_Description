import { NextResponse } from 'next/server';

import { dedupedAuth } from '@/lib/auth';
import { isAdmin } from '@/lib/auth/permissions';
import { checkSession } from '@/lib/auth/session';

type AdminGuardResult =
  | { ok: true; userId: string }
  | { ok: false; response: NextResponse };

// Gate an admin API route: requires a valid session whose user has the ADMIN
// role. Returns the userId on success, or a ready-to-return 401/403 response.
export async function requireAdminApi(): Promise<AdminGuardResult> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };
  }
  if (!(await isAdmin(session.user.id))) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    };
  }
  return { ok: true, userId: session.user.id };
}
