import * as React from 'react';

import { AwardsSection } from '@/components/marketing/sections/awards-section';
import { ChallengesBenefitsSection } from '@/components/marketing/sections/challenges-benefits-section';
import { ManufacturingFeatureSection } from '@/components/marketing/sections/manufacturing-feature-section';
import { NTClipboardSummary } from '@/components/marketing/sections/ntclipboard-summary';
import { NTClipboardTestimonials } from '@/components/marketing/sections/ntclipboard-testimonials';
import { NTClipboardToolBox } from '@/components/marketing/sections/ntclipboard-toolbox';
import { TestHomeHero } from '@/components/marketing/sections/test-home-hero';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  path: '/test-home',
  title: 'Test Home',
  description:
    'EDGEBI production planning and scheduling software. Flexible, affordable solutions that adapt to your operations.',
  noIndex: true
});

export default function TestHomePage(): React.JSX.Element {
  return (
    <>
      <TestHomeHero />
      <ChallengesBenefitsSection />
      <AwardsSection />
      {/* <NTClipboardSummary /> */}
      <ManufacturingFeatureSection />
      {/* <NTClipboardTestimonials /> */}
      {/* <NTClipboardPricing /> */}
      {/* <NTClipboardDemo /> */}
      {/* <NTClipboardFAQ /> */}
      {/* <NTClipboardCTA /> */}
    </>
  );
}
