import * as React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Role } from '@prisma/client';

import { SidebarRenderer } from '@/components/dashboard/sidebar-renderer';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Routes } from '@/constants/routes';
import { getProfile } from '@/data/account/get-profile';
import { getClientSidebarCounts } from '@/data/client-portal/get-client-sidebar-counts';
import { getFavorites } from '@/data/favorites/get-favorites';
import { dedupedAuth } from '@/lib/auth';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { getPathname } from '@/lib/network/get-pathname';
import { createTitle } from '@/lib/utils';

const CLIENT_ALLOWED_PREFIXES = [
  Routes.Welcome,
  Routes.ClientMeetings,
  Routes.ClientSupport,
  Routes.ClientMessages,
  Routes.ClientSoftware,
  Routes.ClientBilling,
  Routes.Profile,
  Routes.Security,
  Routes.Account
];

function isClientAllowedPath(pathname: string): boolean {
  return CLIENT_ALLOWED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export const metadata: Metadata = {
  title: createTitle('Dashboard'),
};

export default async function DashboardLayout({
  children
}: React.PropsWithChildren): Promise<React.JSX.Element> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const userFromDb = await prisma.user.findFirst({
    where: { id: session.user.id },
    select: {
      role: true,
      completedOnboarding: true,
      organization: {
        select: {
          completedOnboarding: true
        }
      }
    }
  });
  const isClient = userFromDb!.role === Role.CLIENT;
  if (isClient) {
    const pathname = (getPathname() ?? '').split('?')[0];
    if (!isClientAllowedPath(pathname)) {
      return redirect(Routes.Welcome);
    }
  } else if (
    !userFromDb!.completedOnboarding ||
    !userFromDb!.organization!.completedOnboarding
  ) {
    return redirect(Routes.Onboarding);
  }

  const [favorites, profile] = await Promise.all([
    getFavorites(),
    getProfile()
  ]);

  // Unseen-count badges for the client portal sidebar (Tickets / Messages /
  // Meetings / My Software). Keyed by route so NavMain can match by href.
  let navBadges: Record<string, number> = {};
  if (isClient) {
    const link = await getClientContactLink(session.user.id);
    if (link) {
      const counts = await getClientSidebarCounts(link);
      navBadges = {
        [Routes.ClientSupport]: counts.tickets,
        [Routes.ClientMessages]: counts.messages,
        [Routes.ClientMeetings]: counts.meetings,
        [Routes.ClientSoftware]: counts.software
      };
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider>
        <SidebarRenderer
          favorites={favorites}
          profile={profile}
          navBadges={navBadges}
        />
        {/* Set max-width so full-width tables can overflow horizontally correctly */}
        <SidebarInset
          id="skip"
          className="size-full lg:[transition:max-width_0.2s_linear] lg:peer-data-[state=collapsed]:max-w-[calc(100vw-var(--sidebar-width-icon))] lg:peer-data-[state=expanded]:max-w-[calc(100vw-var(--sidebar-width))]"
        >
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
