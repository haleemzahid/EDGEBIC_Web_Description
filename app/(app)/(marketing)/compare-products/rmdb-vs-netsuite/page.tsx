import * as React from 'react';

import {
  ComparisonPage,
  type ComparisonPageData
} from '@/components/marketing/compare/comparison-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'RMDB vs NetSuite Manufacturing: Which Is Right for SMB Manufacturers?',
  description:
    'Honest RMDB vs NetSuite Manufacturing comparison. Cloud ERP suite vs dedicated finite-capacity scheduler. Features, pricing, implementation timelines, and migration paths.',
  path: '/compare-products/rmdb-vs-netsuite',
  keywords:
    'rmdb vs netsuite, netsuite manufacturing alternative, alternatives to netsuite manufacturing, netsuite scheduling alternative, netsuite manufacturing comparison, netsuite competitors, netsuite manufacturing scheduling'
});

const data: ComparisonPageData = {
  slug: 'rmdb-vs-netsuite',
  competitor: 'NetSuite Manufacturing',
  competitorDescription:
    'Cloud ERP suite from Oracle with a manufacturing module',
  h1: 'RMDB vs NetSuite Manufacturing: Cloud ERP vs Focused Scheduling',
  subtitle:
    'NetSuite is a full cloud ERP suite. RMDB is a focused finite-capacity scheduler. Different scopes, different price points — here is when each one is the right answer.',
  tldr:
    'NetSuite Manufacturing is the right call if you want one cloud ERP for finance, CRM, inventory, and manufacturing — and you have the budget for it. RMDB is the right call if you already have an ERP (or NetSuite) and need real finite-capacity scheduling that NetSuite Manufacturing does not provide on its own.',
  introParagraphs: [
    'NetSuite is one of the most successful cloud ERPs in the world. The manufacturing module bundles work orders, BOMs, routings, demand planning, and basic capacity planning into a single cloud tenant alongside finance, CRM, inventory, and order management. For a growing manufacturer that wants one system of record, NetSuite is hard to beat.',
    'But NetSuite Manufacturing was not designed as an APS. Its capacity planning is rough-cut at best, and the scheduling module assumes you will use external tools or services for finite-capacity logic. Manufacturers running NetSuite who need real schedule optimization end up with one of three patterns: (1) Excel scheduling alongside NetSuite, (2) a third-party APS bolted on, or (3) tolerating broken schedules.',
    'Resource Manager DB (RMDB) is option (2) done well. It is a finite-capacity scheduling engine that integrates with NetSuite, takes work order data from NetSuite, runs real schedule optimization, and feeds schedule data back. This page is the honest comparison for manufacturers evaluating both as primary systems — and the answer for many shops is to keep NetSuite and add RMDB.'
  ],
  features: [
    {
      name: 'Finite-capacity scheduling engine',
      rmdb: true,
      competitor: 'partial',
      note: 'NetSuite has rough-cut capacity planning; RMDB has true finite-capacity solve.'
    },
    { name: 'Drag-and-drop Gantt', rmdb: true, competitor: false },
    { name: 'Sequence-dependent setup time', rmdb: true, competitor: false },
    { name: 'Alternate work center support', rmdb: true, competitor: false },
    { name: 'What-if scenario analysis', rmdb: true, competitor: false },
    {
      name: 'Full cloud ERP (finance, CRM, inventory, AR/AP)',
      rmdb: false,
      competitor: true,
      note: 'NetSuite is a full ERP suite; RMDB is a scheduling tool only.'
    },
    {
      name: 'Multi-subsidiary / multi-currency',
      rmdb: false,
      competitor: true
    },
    { name: 'CRM and order management', rmdb: false, competitor: true },
    {
      name: 'Manufacturing-specific scheduling',
      rmdb: true,
      competitor: 'partial'
    },
    {
      name: 'Cloud / SaaS',
      rmdb: true,
      competitor: true
    },
    {
      name: 'On-premise deployment',
      rmdb: true,
      competitor: false
    },
    {
      name: 'Pricing model',
      rmdb: 'One-time license',
      competitor: 'Per-user / month subscription + annual contract'
    }
  ],
  pricing: {
    rmdbPrice: 'From $5,000',
    rmdbModel: 'One-time license · no per-user fees · optional support contract',
    competitorPrice: 'From ~$999/mo + per user',
    competitorModel: 'Annual subscription · base + per-user + per-module · enterprise contract',
    summary:
      'NetSuite is priced as enterprise cloud ERP — typical mid-market deployments run $30,000–$120,000+ per year all-in. RMDB starts at $5,000 as a one-time license. The comparison is not really fair on cost alone: NetSuite replaces multiple systems while RMDB only replaces your scheduler. If you need both ERP and scheduling, the right pattern is to evaluate NetSuite for ERP and add RMDB for scheduling.'
  },
  rmdbWinsAt: [
    'Real finite-capacity scheduling that NetSuite Manufacturing does not provide',
    'Drag-and-drop Gantt with constraint-aware reschedules',
    'Sequence-dependent setup modeling and alternate work centers',
    'Pairing with NetSuite (or any ERP) without replacing it',
    'On-premise deployments for shops that cannot run cloud-only',
    'Mid-market manufacturers where scheduling is the bottleneck'
  ],
  competitorWinsAt: [
    'Single cloud ERP for finance, CRM, inventory, and basic manufacturing',
    'Multi-subsidiary global operations with consolidated reporting',
    'Companies that want one vendor relationship instead of multiple',
    'Direct integration with Oracle, NetSuite Commerce, and the broader Oracle stack'
  ],
  rmdbBestFor:
    'You either already have NetSuite (or another ERP) and need finite-capacity scheduling on top of it, OR your primary problem is scheduling and you do not need to replace your ERP. RMDB is the focused tool that solves the schedule.',
  competitorBestFor:
    'You need one cloud system to run your entire business — finance, CRM, inventory, and manufacturing. Your scheduling needs are simple to moderate, you have the budget for enterprise cloud ERP, and you want everything in one Oracle tenant.',
  migrationSteps: [
    {
      title: 'Keep NetSuite, add RMDB on top (most common)',
      description:
        'Most NetSuite manufacturing customers do not migrate off NetSuite — they add RMDB for finite-capacity scheduling and keep NetSuite for everything else. This is the recommended path.'
    },
    {
      title: 'Export work orders from NetSuite',
      description:
        'NetSuite supports CSV and SuiteScript-based export of work orders, BOMs, routings, and item masters. RMDB ingests the standard format with no custom development.'
    },
    {
      title: 'Build real RMDB routings',
      description:
        'NetSuite routings are simple by design. RMDB routings include setup time, alternate work centers, and operator constraints — the data NetSuite scheduling does not capture.'
    },
    {
      title: 'Wire RMDB into NetSuite for two-way sync',
      description:
        'Work orders flow from NetSuite to RMDB for finite-capacity scheduling. Schedule data and completed quantities flow back to NetSuite for inventory and cost accounting.'
    },
    {
      title: 'Train and go live in 5 days',
      description:
        'Standard 5-Day Implementation Framework. Schedulers, planners, and shop-floor leads productive by end of week one.'
    }
  ],
  faqs: [
    {
      question: 'Is RMDB a NetSuite Manufacturing alternative?',
      answer:
        'For scheduling specifically, yes — RMDB is what you add when NetSuite scheduling is not enough. For full ERP, no — RMDB does not replace NetSuite\'s finance, CRM, or inventory capabilities. The most common pattern is keeping NetSuite for ERP and adding RMDB for scheduling.'
    },
    {
      question: 'Why does NetSuite scheduling fail for some manufacturers?',
      answer:
        'NetSuite Manufacturing uses rough-cut capacity planning, which assumes infinite capacity at each work center for planning purposes and only flags overloads after the fact. For shops with daily expedites, sequence-dependent setups, or constrained operators, this produces schedules the floor cannot actually run.'
    },
    {
      question: 'Does RMDB integrate with NetSuite directly?',
      answer:
        'Yes. RMDB integrates with NetSuite via standard SuiteScript and CSV-based interfaces. Work orders, BOMs, and routings flow from NetSuite into RMDB; schedule data and completion records flow back. The integration is a standard part of our 5-Day Implementation Framework when NetSuite is the source ERP.'
    },
    {
      question: 'How much does it cost to add RMDB to a NetSuite shop?',
      answer:
        'RMDB starts at $5,000 as a one-time license, plus optional annual support. Compared to your existing NetSuite spend, RMDB is typically a small line item — and it solves a problem NetSuite Manufacturing does not solve well on its own.'
    },
    {
      question: 'Can I migrate off NetSuite to RMDB entirely?',
      answer:
        'Only partially — RMDB is not an ERP. If you want to leave NetSuite entirely, you need to also choose a replacement ERP (Sage, Epicor, Microsoft Dynamics, QuickBooks, etc.). RMDB integrates with all of these. We can help you scope a full ERP swap if that is the goal, but most customers find it easier to keep NetSuite and add RMDB.'
    },
    {
      question: 'How long does NetSuite + RMDB integration take?',
      answer:
        'Standard 5-Day Implementation Framework. NetSuite integration is well-trodden — we have done it across dozens of mid-market manufacturers — and the data export from NetSuite is straightforward.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ComparisonPage data={data} />;
}
