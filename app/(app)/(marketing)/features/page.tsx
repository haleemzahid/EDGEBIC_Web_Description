import * as React from 'react';

import { NTClipboardFeatures } from '@/components/marketing/sections/ntclipboard-features';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Features',
  description:
    'Explore the powerful features of our production planning and scheduling software. Advanced scheduling, real-time tracking, resource management, and more.',
  path: '/features',
  keywords:
    'production planning features, scheduling software features, manufacturing software, resource management, real-time tracking'
});

export default function FeaturesPage(): React.JSX.Element {
  return (
    <>
      <NTClipboardFeatures />
    </>
  );
}
