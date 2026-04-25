import * as React from 'react';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

import { LogOutButton } from '@/components/ui/onboarding/log-out-button';
import { Logo } from '@/components/ui/logo';
import { Routes } from '@/constants/routes';
import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Welcome')
};

export default async function WelcomePage(): Promise<React.JSX.Element> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const userFromDb = await prisma.user.findFirst({
    where: { id: session.user.id },
    select: {
      name: true,
      role: true,
      organization: { select: { name: true } }
    }
  });

  if (!userFromDb) {
    return redirect(getLoginRedirect());
  }

  if (userFromDb.role !== Role.CLIENT) {
    return redirect(Routes.Home);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16">
      <LogOutButton className="fixed top-4 right-4" />
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <Logo className="mb-8" />
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome, {userFromDb.name}
        </h1>
        {userFromDb.organization?.name && (
          <p className="mt-3 text-base text-muted-foreground">
            You&apos;ve been invited to {userFromDb.organization.name} as a
            client.
          </p>
        )}
        <p className="mt-6 max-w-md text-sm text-muted-foreground">
          Your client account is active. Your team will share project updates
          and resources with you here. If you need anything, please reach out
          to your project contact.
        </p>
      </div>
    </div>
  );
}
