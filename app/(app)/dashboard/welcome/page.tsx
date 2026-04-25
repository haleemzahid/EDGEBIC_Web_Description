import * as React from 'react';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

import {
  Page,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
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
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Welcome</PageTitle>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome, {userFromDb.name}
          </h1>
          {userFromDb.organization?.name && (
            <p className="text-base text-muted-foreground">
              You&apos;ve been invited to {userFromDb.organization.name} as a
              client.
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Your client account is active. Your team will share project
            updates and resources with you here. If you need anything, please
            reach out to your project contact.
          </p>
        </div>
      </PageBody>
    </Page>
  );
}
