import * as React from 'react';

import { ChallengesBenefitsSection } from '@/components/marketing/sections/challenges-benefits-section';
// import { AwardsSection } from '@/components/marketing/sections/awards-section';
import { ManufacturingFeatureSection } from '@/components/marketing/sections/manufacturing-feature-section';
import { NTClipboardHero } from '@/components/marketing/sections/ntclipboard-hero';
import { NTClipboardSummary } from '@/components/marketing/sections/ntclipboard-summary';
import { NTClipboardTestimonials } from '@/components/marketing/sections/ntclipboard-testimonials';
import { NTClipboardToolBox } from '@/components/marketing/sections/ntclipboard-toolbox';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Production Planning & Scheduling Software | Resource Manager DB (RMDB) by User Solutions',
  description:
    'Resource Manager DB (RMDB) by User Solutions — production planning & scheduling software with finite capacity scheduling, MRP, and ERP integration. Trusted by GE, Cummins, BAE Systems, and the US Navy for 35+ years.',
  path: '/',
  keywords:
    'production planning software, production scheduling software, RMDB, Resource Manager DB, manufacturing scheduling, finite capacity planning, MRP software, production tracking, manufacturing software, EDGEBI, User Solutions',
  absoluteTitle: true
});

export default function IndexPage(): React.JSX.Element {
  return (
    <>
      <NTClipboardHero />
      <ChallengesBenefitsSection />
      {/* <NTClipboardSummary /> */}
      <ManufacturingFeatureSection />
      {/* <NTClipboardTestimonials /> */}
      {/* <NTClipboardPricing /> */}
      {/* <NTClipboardDemo /> */}
      {/* <NTClipboardFAQ /> */}
      {/* <NTClipboardCTA /> */}
      {/* <AwardsSection /> */}
    </>
  );
}
