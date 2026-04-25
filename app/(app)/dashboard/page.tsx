import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

import { Routes } from '@/constants/routes';
import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';

export default async function DashboardPage(): Promise<never> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    redirect(getLoginRedirect());
  }

  const userFromDb = await prisma.user.findFirst({
    where: { id: session.user.id },
    select: { role: true }
  });

  if (userFromDb?.role === Role.CLIENT) {
    redirect(Routes.Welcome);
  }
  redirect('/dashboard/home');
}
