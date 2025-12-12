'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { TooltipProvider } from '@/components/ui/tooltip';

export function Providers({
  children
}: React.PropsWithChildren): React.JSX.Element {
  // Clear any existing theme from localStorage to ensure light mode
  React.useEffect(() => {
    localStorage.removeItem('theme');
  }, []);

  return (
    <NuqsAdapter>
      <TooltipProvider>
        <NiceModal.Provider>{children}</NiceModal.Provider>
      </TooltipProvider>
    </NuqsAdapter>
  );
}
