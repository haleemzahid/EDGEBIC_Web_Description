import * as React from 'react';
import type { Metadata } from 'next';

import { AwardsSection } from '@/components/marketing/sections/awards-section';
import { ManufacturingFeatureSection } from '@/components/marketing/sections/manufacturing-feature-section';
import { TestHomeHero } from '@/components/marketing/sections/test-home-hero';
import { NTClipboardSummary } from '@/components/marketing/sections/ntclipboard-summary';
import { NTClipboardTestimonials } from '@/components/marketing/sections/ntclipboard-testimonials';
import { NTClipboardToolBox } from '@/components/marketing/sections/ntclipboard-toolbox';
import { ChallengesBenefitsSection } from '@/components/marketing/sections/challenges-benefits-section';

export const metadata: Metadata = {
  title: 'Test Home',
  description:
    'EDGEBIC production planning and scheduling software. Flexible, affordable solutions that adapt to your operations.'
};

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
