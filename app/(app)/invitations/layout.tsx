import * as React from 'react';
import type { Metadata } from 'next';

import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Invitations')
};

export default async function InvitationsLayout({
  children
}: React.PropsWithChildren): Promise<React.JSX.Element> {
  return (
    <div className="py-6">
      <main className="flex flex-col items-center justify-center p-2">
        {children}
      </main>
    </div>
  );
}
