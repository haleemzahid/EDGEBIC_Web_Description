import * as React from 'react';
import type { Metadata } from 'next';

import { NTClipboardAbout } from '@/components/marketing/sections/ntclipboard-about';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about User Solutions - manufacturing software solutions provider since 1991.'
};

export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <NTClipboardAbout />
    </>
  );
}
