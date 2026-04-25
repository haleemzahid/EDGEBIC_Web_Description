import * as React from 'react';
import type { Metadata } from 'next';

import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Welcome')
};

export default function WelcomeLayout({
  children
}: React.PropsWithChildren): React.JSX.Element {
  return <>{children}</>;
}
