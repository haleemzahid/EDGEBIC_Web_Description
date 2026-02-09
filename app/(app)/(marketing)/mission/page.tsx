import * as React from 'react';

import { NTClipboardMissionOnly } from '@/components/marketing/sections/ntclipboard-mission-only';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Our Mission',
  description:
    'Our mission is to provide flexible and affordable production planning solutions that adapt to your operations and help manufacturers achieve better scheduling.',
  path: '/mission',
  keywords:
    'company mission, manufacturing mission, production planning mission, EDGEBI mission'
});

export default function MissionPage(): React.JSX.Element {
  return (
    <>
      <NTClipboardMissionOnly />
    </>
  );
}
