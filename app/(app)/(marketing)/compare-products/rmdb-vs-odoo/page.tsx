import * as React from 'react';

import {
  ComparisonPage,
  type ComparisonPageData
} from '@/components/marketing/compare/comparison-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'RMDB vs Odoo Manufacturing: Open-Source ERP vs Finite-Capacity APS',
  description:
    'Honest RMDB vs Odoo Manufacturing comparison. Open-source modular ERP vs dedicated finite-capacity scheduling. Features, pricing, implementation, and migration paths.',
  path: '/compare-products/rmdb-vs-odoo',
  keywords:
    'rmdb vs odoo, odoo manufacturing alternative, alternatives to odoo manufacturing, odoo MRP alternative, odoo manufacturing comparison, odoo competitors, open source manufacturing scheduling alternative'
});

const data: ComparisonPageData = {
  slug: 'rmdb-vs-odoo',
  competitor: 'Odoo Manufacturing',
  competitorDescription:
    'Open-source modular ERP with a manufacturing module',
  h1: 'RMDB vs Odoo Manufacturing: Modular ERP vs Focused Scheduling',
  subtitle:
    'Odoo is a flexible open-source ERP with hundreds of modules. RMDB is a focused finite-capacity scheduler. Different design philosophies — here is when each one is the right answer.',
  tldr:
    'Odoo is the right call if you want a modular open-source ERP that you can heavily customize, and your scheduling needs are basic. RMDB is the right call if you already have an ERP (Odoo or otherwise) and need real finite-capacity scheduling — Odoo Manufacturing does not provide finite-capacity logic out of the box.',
  introParagraphs: [
    'Odoo has built a strong following as the open-source modular ERP for SMBs. Its strength is breadth — modules for accounting, CRM, ecommerce, inventory, manufacturing, HR, and dozens more, all designed to integrate cleanly. The community edition is free, the enterprise edition is reasonably priced, and the codebase is open for customization. For SMBs that want flexibility and avoid vendor lock-in, Odoo is one of the best choices in the market.',
    'But Odoo Manufacturing was not designed as a finite-capacity APS. The scheduling module handles work orders, basic capacity planning, and routing — but it does not solve schedules with finite-capacity logic, sequence-dependent setups, or alternate work centers in the way dedicated APS tools do. For manufacturers whose primary problem is the schedule itself, Odoo scheduling alone is not enough.',
    'Resource Manager DB (RMDB) is the dedicated scheduling layer. It integrates with Odoo (and any other ERP), takes work order data, runs real finite-capacity optimization, and feeds schedule data back. This page is the honest comparison for manufacturers running or evaluating Odoo who need real scheduling capability.'
  ],
  features: [
    {
      name: 'Finite-capacity scheduling engine',
      rmdb: true,
      competitor: 'partial',
      note: 'Odoo Manufacturing has basic capacity planning, not finite-capacity solve.'
    },
    { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
    { name: 'Sequence-dependent setup time', rmdb: true, competitor: false },
    { name: 'Alternate work center support', rmdb: true, competitor: false },
    { name: 'What-if scenario analysis', rmdb: true, competitor: false },
    {
      name: 'Full modular ERP (CRM, accounting, inventory, HR)',
      rmdb: false,
      competitor: true,
      note: 'Odoo is a full ERP; RMDB is a scheduling tool only.'
    },
    {
      name: 'Open-source / customizable codebase',
      rmdb: false,
      competitor: true
    },
    {
      name: 'Free community edition available',
      rmdb: false,
      competitor: true
    },
    {
      name: 'On-premise deployment',
      rmdb: true,
      competitor: true
    },
    {
      name: 'Cloud / SaaS deployment',
      rmdb: true,
      competitor: true
    },
    {
      name: 'Pricing model',
      rmdb: 'One-time license',
      competitor: 'Free CE / Per-user subscription EE'
    }
  ],
  pricing: {
    rmdbPrice: 'From $5,000',
    rmdbModel: 'One-time license · no per-user fees · optional support contract',
    competitorPrice: 'Free CE / from ~$25/user/mo EE',
    competitorModel: 'Community Edition free · Enterprise per-user subscription · implementation services',
    summary:
      'Odoo is the cheapest of the major ERPs, especially Community Edition (free). But "free software" is not free implementation — most Odoo deployments require significant configuration and customization services. RMDB is priced as scheduling software, not ERP, so cost comparisons should focus on the scheduling problem specifically. For shops running Odoo CE that need finite-capacity scheduling, adding RMDB is a small line item.'
  },
  rmdbWinsAt: [
    'Real finite-capacity scheduling that Odoo Manufacturing does not provide',
    'Drag-and-drop Gantt with constraint-aware reschedules',
    'Sequence-dependent setup modeling and alternate work centers',
    'Pairing with Odoo (or any ERP) without replacing it',
    'Mid-to-large manufacturers where scheduling complexity is the primary problem',
    'On-premise scheduling for shops that need to keep production data behind a firewall'
  ],
  competitorWinsAt: [
    'SMBs that want a flexible modular ERP at low cost',
    'Companies that value open-source and customizability',
    'Multi-process businesses that need ERP, CRM, and ecommerce in one tenant',
    'Buyers who want to avoid enterprise vendor lock-in'
  ],
  rmdbBestFor:
    'You run Odoo (or another ERP) and your schedule is broken. You need real finite-capacity scheduling, you do not want to replace Odoo, and you want a focused tool that integrates cleanly with the modular ERP you have.',
  competitorBestFor:
    'You want a flexible open-source ERP for an SMB business with multiple departments. Your scheduling needs are basic, you have technical resources to customize and maintain Odoo, and avoiding vendor lock-in is a priority.',
  migrationSteps: [
    {
      title: 'Keep Odoo, add RMDB for scheduling (most common)',
      description:
        'Most Odoo manufacturing customers do not migrate off Odoo — they add RMDB for finite-capacity scheduling and keep Odoo for ERP, inventory, and CRM. This is the recommended path.'
    },
    {
      title: 'Export work orders from Odoo',
      description:
        'Odoo supports CSV and API-based export of work orders, BOMs, routings, and item masters. RMDB ingests the standard format with no custom development.'
    },
    {
      title: 'Build real RMDB routings',
      description:
        'Odoo routings are simple by design. RMDB routings include setup time, alternate work centers, and operator constraints — the data Odoo scheduling does not capture.'
    },
    {
      title: 'Wire RMDB into Odoo for two-way sync',
      description:
        'Work orders flow from Odoo to RMDB for finite-capacity scheduling. Schedule data and completed quantities flow back to Odoo for inventory and accounting.'
    },
    {
      title: 'Train and go live in 5 days',
      description:
        'Standard 5-Day Implementation Framework. RMDB sits next to Odoo as the dedicated scheduling layer.'
    }
  ],
  faqs: [
    {
      question: 'Is RMDB an Odoo Manufacturing alternative?',
      answer:
        'For scheduling specifically, yes. For full ERP, no — RMDB is not an ERP and does not replace Odoo\'s accounting, CRM, or inventory modules. The most common pattern is keeping Odoo for ERP and adding RMDB for finite-capacity scheduling.'
    },
    {
      question: 'Why does Odoo scheduling fail for some manufacturers?',
      answer:
        'Odoo Manufacturing has basic capacity planning, not finite-capacity scheduling. It tracks work orders well but does not optimize schedules against real shop-floor constraints — setup time, alternate machines, operator skill, sequence dependencies. For shops with that complexity, Odoo scheduling becomes a manual exercise.'
    },
    {
      question: 'Does RMDB integrate with Odoo (Community or Enterprise)?',
      answer:
        'Yes. RMDB integrates with both Odoo Community Edition and Enterprise Edition via standard CSV and REST API interfaces. The integration is straightforward — Odoo has clean APIs for the data RMDB needs.'
    },
    {
      question: 'Is RMDB open-source like Odoo?',
      answer:
        'No. RMDB is commercial software with a one-time license. The trade-off: you get 35+ years of manufacturing scheduling expertise built into the engine, with vendor support, instead of an open codebase you have to customize and maintain yourself. For most mid-market manufacturers, the cost-benefit favors commercial scheduling software.'
    },
    {
      question: 'How much does it cost to add RMDB to an Odoo shop?',
      answer:
        'RMDB starts at $5,000 as a one-time license. For a shop that has already invested in Odoo (especially the free Community Edition), this is a small additional spend that solves a problem Odoo scheduling does not solve.'
    },
    {
      question: 'Can I migrate from Odoo to RMDB entirely?',
      answer:
        'Only the scheduling part — RMDB is not an ERP. If you want to leave Odoo entirely, you need to also choose a replacement ERP. RMDB integrates with Sage, Epicor, Microsoft Dynamics, QuickBooks, and many others. Most Odoo manufacturing customers find it easier to keep Odoo and add RMDB.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ComparisonPage data={data} />;
}
