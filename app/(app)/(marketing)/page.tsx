import * as React from 'react';

import { ChallengesBenefitsSection } from '@/components/marketing/sections/challenges-benefits-section';
// import { AwardsSection } from '@/components/marketing/sections/awards-section';
// import { EdgebicAnnouncement } from '@/components/marketing/sections/edgebic-announcement';
import { ManufacturingFeatureSection } from '@/components/marketing/sections/manufacturing-feature-section';
import { NTClipboardHero } from '@/components/marketing/sections/ntclipboard-hero';
import { NTClipboardSummary } from '@/components/marketing/sections/ntclipboard-summary';
import { NTClipboardTestimonials } from '@/components/marketing/sections/ntclipboard-testimonials';
import { NTClipboardToolBox } from '@/components/marketing/sections/ntclipboard-toolbox';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title:
    'EDGEBIC Production Scheduling Software | RMDB Successor | User Solutions',
  description:
    'Finite capacity scheduling with multi-shift planning, schedule optimization and drag-and-drop planning. 35 years behind it, trusted by GE, Cummins and the US Navy.',
  path: '/',
  keywords:
    'EDGEBIC, production planning software, production scheduling software, finite capacity scheduling, schedule optimization, multi-shift scheduling, drag and drop scheduling, visual production planning, multi-user scheduling software, RMDB, Resource Manager DB, manufacturing scheduling, MRP software, production tracking, EDGEBI, User Solutions',
  absoluteTitle: true
});

export default function IndexPage(): React.JSX.Element {
  return (
    <>
      <NTClipboardHero />
      {/* <EdgebicAnnouncement /> */}
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
