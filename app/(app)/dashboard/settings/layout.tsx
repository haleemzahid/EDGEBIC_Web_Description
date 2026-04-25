import * as React from 'react';
import type { Metadata } from 'next';

import { SettingsSidebar } from '@/components/dashboard/settings/settings-sidebar';
import { getProfile } from '@/data/account/get-profile';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Settings')
};

export default async function SettingsLayout({
  children
}: React.PropsWithChildren): Promise<React.JSX.Element> {
  const profile = await getProfile();
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <SettingsSidebar role={profile.role} />
      <div className="size-full">{children}</div>
    </div>
  );
}
