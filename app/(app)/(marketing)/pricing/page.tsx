import * as React from 'react';

import { EdgebicPricing } from '@/components/marketing/sections/edgebic-pricing';
import { FAQJsonLd, SoftwareApplicationJsonLd } from '@/components/seo';
import { AppInfo } from '@/constants/app-info';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'EDGEBIC Pricing: $25,000 APS, $35,000 Complete, One-Time License',
  description:
    'EDGEBIC costs $25,000 for the APS edition and $35,000 for the Complete edition, both one-time perpetual licenses rather than subscriptions. Published pricing for finite capacity scheduling and production planning software from User Solutions.',
  path: '/pricing',
  keywords:
    'EDGEBIC pricing, EDGEBIC cost, production scheduling software cost, finite capacity scheduling software price, APS software pricing, manufacturing scheduling software cost, advanced planning and scheduling price, one-time license scheduling software, production planning software pricing, how much does scheduling software cost'
});

/**
 * Real pricing questions, replacing a set that described a PDF clipboard
 * utility this theme shipped with. That content was being served as FAQ
 * structured data on the pricing page of a $25,000 product, so an assistant
 * asked what EDGEBIC costs was reading about keyboard shortcuts.
 *
 * Every answer here is verifiable from the product or the price list. Nothing
 * about support contracts, discounts or implementation fees appears, because
 * those are not published and inventing them is how false claims ship.
 */
const faqData = [
  {
    question: 'How much does EDGEBIC cost?',
    answer:
      'EDGEBIC costs $25,000 for the APS edition and $35,000 for the Complete edition. Both are one-time perpetual licenses rather than subscriptions. EDGEBIC APS covers finite capacity scheduling and optimization; EDGEBIC Complete adds MRP, inventory, purchasing and material pegging.'
  },
  {
    question: 'Is EDGEBIC a subscription?',
    answer:
      'No. Both editions are one-time perpetual licenses. There is no recurring per-seat fee, which is the usual model among advanced planning and scheduling competitors such as PlanetTogether and Asprova.'
  },
  {
    question: 'What is the difference between EDGEBIC APS and EDGEBIC Complete?',
    answer:
      'Material planning, and nothing else. Both editions run the identical finite capacity scheduling engine, so neither schedules better than the other. EDGEBIC Complete adds material requirements planning, inventory, purchasing and material pegging, so shortages constrain the schedule alongside machines and labor. If capacity is your constraint, APS is the whole answer.'
  },
  {
    question: 'Why does User Solutions publish pricing when most APS vendors do not?',
    answer:
      'Because a manufacturer evaluating scheduling software should be able to decide whether it is worth a conversation before having one. Most advanced planning and scheduling vendors quote only after a discovery call, which means the buyer spends an hour before learning whether the product is in their range at all.'
  },
  {
    question: 'What do I need to run EDGEBIC?',
    answer:
      'EDGEBIC is an installed Windows desktop application built on .NET 8, not a browser-based service. Single-user installations run on SQLite. Multi-user and enterprise installations run on SQL Server. Your data stays on your own machines, which matters for defense, medical device and other regulated work.'
  },
  {
    question: 'Do you still sell RMDB, EDGEBI or Resource Manager for Excel?',
    answer:
      'No. RMDB, EDGEBI, RMX, Workcenter Scheduler XL and Job Scheduler Lite are no longer sold as new licenses. Existing installations remain supported and their documentation stays online. EDGEBIC is the current generation of Resource Manager DB and the upgrade path from all of them.'
  },
  {
    question: 'Does EDGEBIC work with my ERP?',
    answer:
      'If your ERP can export data to Excel, CSV or a database, then yes. EDGEBIC integrates through configurable import and export masks rather than a native connector, which is why it works with systems no vendor has built a connector for. The approach covers products, work centers, customers, sales orders, bills of routing, actuals, plant holidays and shifts.'
  }
];

export default function PricingPage(): React.JSX.Element {
  return (
    <>
      <FAQJsonLd questions={faqData} />
      {/* One entry per edition so the published price is machine-readable.
          This is the whole point of the page: an answer engine asked what
          EDGEBIC costs should find a real number, not a contact form. */}
      <SoftwareApplicationJsonLd
        name={AppInfo.EDITIONS.APS.NAME}
        description={AppInfo.EDITIONS.APS.DESCRIPTION}
        url="/pricing"
        price={AppInfo.EDITIONS.APS.PRICE}
        operatingSystem="Windows"
        applicationSubCategory="Production Scheduling Software"
        offerUrl="/pricing"
        softwareRequirements="Windows with .NET 8; SQLite for single-user, SQL Server for multi-user deployments"
      />
      <SoftwareApplicationJsonLd
        name={AppInfo.EDITIONS.COMPLETE.NAME}
        description={AppInfo.EDITIONS.COMPLETE.DESCRIPTION}
        url="/pricing"
        price={AppInfo.EDITIONS.COMPLETE.PRICE}
        operatingSystem="Windows"
        applicationSubCategory="Production Scheduling Software"
        offerUrl="/pricing"
        softwareRequirements="Windows with .NET 8; SQLite for single-user, SQL Server for multi-user deployments"
      />
      <EdgebicPricing />
    </>
  );
}
