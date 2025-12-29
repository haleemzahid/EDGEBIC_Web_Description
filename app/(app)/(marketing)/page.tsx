import * as React from 'react';
import type { Metadata } from 'next';

import { AwardsSection } from '@/components/marketing/sections/awards-section';
import { ManufacturingFeatureSection } from '@/components/marketing/sections/manufacturing-feature-section';
import { NTClipboardHero } from '@/components/marketing/sections/ntclipboard-hero';
import { NTClipboardSummary } from '@/components/marketing/sections/ntclipboard-summary';
import { NTClipboardTestimonials } from '@/components/marketing/sections/ntclipboard-testimonials';
import { NTClipboardToolBox } from '@/components/marketing/sections/ntclipboard-toolbox';
import { WhatWeDoSection } from '@/components/marketing/sections/what-we-do-section';
import { ChallengesBenefitsSection } from '@/components/marketing/sections/challenges-benefits-section';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'EDGEBIC production planning and scheduling software. Flexible, affordable solutions that adapt to your operations.'
};

export default function IndexPage(): React.JSX.Element {
  return (
    <>
      <NTClipboardHero />
      <WhatWeDoSection />
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
