import * as React from 'react';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';

import { LogOutButton } from '@/components/ui/onboarding/log-out-button';
import { OnboardingWizard } from '@/components/ui/onboarding/onboarding-wizard';
import { Routes } from '@/constants/routes';
import { getOnboardingData } from '@/data/onboarding/get-onboarding-data';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Onboarding')
};

export default async function OnboardingPage(): Promise<React.JSX.Element> {
  const { user, organization } = await getOnboardingData();
  if (user.completedOnboarding && organization.completedOnboarding) {
    return redirect(Routes.Home);
  }
  return (
    <div className="relative">
      <LogOutButton className="fixed bottom-2 left-2 hidden sm:flex" />
      <OnboardingWizard
        user={user}
        organization={organization}
      />
    </div>
  );
}
