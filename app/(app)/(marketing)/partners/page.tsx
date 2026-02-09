import * as React from 'react';

import { PartnersSection } from '@/components/marketing/sections/partners';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Partners',
  description:
    'Meet our trusted partners and technology alliances. We collaborate with industry leaders to deliver comprehensive manufacturing solutions.',
  path: '/partners',
  keywords:
    'manufacturing partners, technology partners, simulation partners, production planning partners'
});

export default function PartnersPage(): React.JSX.Element {
  return (
    <>
      <PartnersSection />
    </>
  );
}
