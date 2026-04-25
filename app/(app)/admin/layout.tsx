import * as React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

import { Routes } from '@/constants/routes';
import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';

export const metadata: Metadata = {};

export default async function AdminLayout({
  children
}: React.PropsWithChildren): Promise<React.JSX.Element> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const userFromDb = await prisma.user.findFirst({
    where: { id: session.user.id },
    select: { role: true }
  });
  if (userFromDb?.role === Role.CLIENT) {
    return redirect(Routes.Welcome);
  }

  return <>{children}</>;
}
