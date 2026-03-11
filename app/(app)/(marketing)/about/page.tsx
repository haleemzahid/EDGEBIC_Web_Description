import * as React from 'react';

import { NTClipboardAbout } from '@/components/marketing/sections/ntclipboard-about';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'About User Solutions - Manufacturing Software Since 1991',
  description:
    'Learn about User Solutions, the company behind RMDB and EDGEBI - providing award-winning production planning and scheduling software to manufacturers worldwide for over 35 years.',
  path: '/about',
  keywords:
    'User Solutions, manufacturing software company, RMDB developer, production planning company, EDGEBI, about us'
});

export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <NTClipboardAbout />
    </>
  );
}
