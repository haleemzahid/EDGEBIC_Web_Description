import * as React from 'react';

import {
  ComparisonPage,
  type ComparisonPageData
} from '@/components/marketing/compare/comparison-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'RMDB vs Fishbowl: Which Manufacturing Software Schedules Better?',
  description:
    'Fishbowl is strong on inventory and QuickBooks. RMDB is strong on finite-capacity scheduling and APS. Honest comparison, pricing, features, migration.',
  path: '/compare-products/rmdb-vs-fishbowl',
  keywords:
    'rmdb vs fishbowl, fishbowl alternative, alternatives to fishbowl, fishbowl manufacturing comparison, fishbowl competitors, fishbowl inventory alternative, fishbowl inventory software alternative'
});

const data: ComparisonPageData = {
  slug: 'rmdb-vs-fishbowl',
  competitor: 'Fishbowl',
  competitorDescription:
    'Inventory-led manufacturing software popular with QuickBooks shops',
  h1: 'RMDB vs Fishbowl: The Honest Comparison for Manufacturers',
  subtitle:
    'Fishbowl is best known as inventory software with manufacturing bolted on. RMDB is finite-capacity production scheduling, built for shops where the schedule actually matters. Here is how they really compare.',
  tldr:
    'Fishbowl is a strong choice if your primary problem is inventory tracking and your manufacturing is light — and if you live inside QuickBooks. RMDB is the better answer when your real bottleneck is the production schedule itself, you have multi-step routings, or you need finite-capacity planning that respects shifts, setups, and resource constraints.',
  introParagraphs: [
    'Fishbowl built its reputation as the QuickBooks-friendly inventory platform for small and mid-sized businesses. It handles parts, locations, sales orders, and purchase orders well, and its Manufacturing module covers the basics: bills of materials, work orders, and simple production tracking. For thousands of distributors and assembly shops it is genuinely a good fit.',
    'The friction shows up when buyers expect Fishbowl Manufacturing to behave like a real APS. It does not have finite-capacity scheduling in the way schedulers mean the term — there is no editable Gantt with constraint-aware moves, no setup-time-aware sequencing, no heat-map of bottleneck workcenters. If your production environment is mostly assembly against forecast, that is fine. If your production environment is reschedule-every-morning, it is not.',
    'RMDB by User Solutions is built for that second world. It is a finite-capacity scheduling system that has been deployed on real factory floors for over three decades, with one-time licensing and the ability to integrate alongside Fishbowl, QuickBooks, or any other system you already use. This page is the head-to-head comparison.'
  ],
  features: [
    {
      name: 'Finite-capacity scheduling',
      rmdb: true,
      competitor: false,
      note: 'Fishbowl tracks work orders but does not enforce true finite capacity.'
    },
    {
      name: 'Drag-and-drop Gantt',
      rmdb: true,
      competitor: false
    },
    { name: 'Multi-level BOM and routings', rmdb: true, competitor: 'partial' },
    {
      name: 'Setup time / changeover modeling',
      rmdb: true,
      competitor: false
    },
    { name: 'Forward & reverse scheduling', rmdb: true, competitor: false },
    { name: 'Inventory and lot tracking', rmdb: true, competitor: true },
    { name: 'Sales orders and purchase orders', rmdb: 'partial', competitor: true },
    {
      name: 'QuickBooks integration',
      rmdb: true,
      competitor: true,
      note: 'Fishbowl is famous for its QuickBooks tie-in; RMDB integrates with QuickBooks too.'
    },
    {
      name: 'Other ERP integration (Sage, Dynamics, Epicor, JobBOSS)',
      rmdb: true,
      competitor: 'partial'
    },
    { name: 'Heat-map / bottleneck reports', rmdb: true, competitor: false },
    { name: 'Live embedded Excel views', rmdb: true, competitor: false },
    { name: 'On-premise / self-hosted option', rmdb: true, competitor: true },
    {
      name: 'Pricing model',
      rmdb: 'One-time license',
      competitor: 'One-time + annual support'
    },
    {
      name: 'Best for company size',
      rmdb: '10–500+ employees',
      competitor: '10–200 employees'
    }
  ],
  pricing: {
    rmdbPrice: 'From $5,000',
    rmdbModel: 'One-time license · optional annual support contract',
    competitorPrice: 'From ~$4,395 + annual',
    competitorModel: 'One-time license + required annual support · per-user fees',
    summary:
      'Both products use one-time-style licensing, which is unusual in 2026 and a real advantage over pure SaaS competitors. Fishbowl tends to be cheaper at the very entry tier for inventory-only buyers; RMDB tends to be cheaper once you need real scheduling, multiple users, or ERP integration beyond QuickBooks.'
  },
  rmdbWinsAt: [
    'Real finite-capacity scheduling — the core thing Fishbowl Manufacturing does not do.',
    'Editable, drag-and-drop Gantt with constraint-aware reschedules.',
    'Multi-step routings with setup time and resource sequencing.',
    'ERP integration beyond QuickBooks — Sage, Dynamics, Epicor, JobBOSS, and more.',
    'Heat-map and bottleneck analytics for production schedulers.',
    'Pure scheduling focus — not a generalist inventory tool with manufacturing bolted on.'
  ],
  competitorWinsAt: [
    'Best-in-class QuickBooks Desktop integration if that is your accounting system.',
    'Strong inventory and warehouse management out of the box.',
    'Good fit for distributors and assembly-heavy shops where the schedule is simple.',
    'Mature sales-order and purchase-order workflows in the same product.'
  ],
  rmdbBestFor:
    'Your bottleneck is the production schedule itself. You have routings, setup times, finite resources, and reschedules every day. You either already have an ERP (or Fishbowl) for inventory and accounting, or you want a dedicated scheduler that complements them.',
  competitorBestFor:
    'Your primary problem is inventory and order management, your manufacturing is light or assembly-style, and you want one product that covers both. You live in QuickBooks and want the cleanest possible tie-in.',
  migrationSteps: [
    {
      title: 'Decide whether to replace or augment',
      description:
        'Many manufacturers keep Fishbowl for inventory and add RMDB on top for scheduling. Others replace Fishbowl Manufacturing entirely. We help you make the call before any data moves.'
    },
    {
      title: 'Export Fishbowl manufacturing data',
      description:
        'Export parts, BOMs, routings, work centers, and open work orders. Fishbowl supports CSV export on every entity that matters for scheduling.'
    },
    {
      title: 'Build real routings in RMDB',
      description:
        'Fishbowl routings are simple by design. We help you upgrade them into RMDB routings with setup times, resource constraints, and shift calendars so finite scheduling actually solves correctly.'
    },
    {
      title: 'Wire RMDB into your accounting / ERP',
      description:
        'Whether you keep Fishbowl, switch to QuickBooks, or use Sage / Dynamics / Epicor, RMDB integrates so production data flows without re-keying.'
    },
    {
      title: 'Train and go live in 5 days',
      description:
        'Standard 5-Day Implementation Framework — first live finite-capacity schedule before the end of week one.'
    }
  ],
  faqs: [
    {
      question: 'Is RMDB a Fishbowl replacement?',
      answer:
        'It can be — but the more common path is to keep Fishbowl for inventory and add RMDB for scheduling. RMDB is purpose-built for production scheduling in a way Fishbowl Manufacturing is not, so the two often coexist.'
    },
    {
      question: 'Does RMDB integrate with QuickBooks like Fishbowl does?',
      answer:
        'Yes. Fishbowl is well-known for its QuickBooks Desktop tie-in, but RMDB integrates with QuickBooks as well, plus Sage, Microsoft Dynamics, Epicor, JobBOSS, and many other ERPs Fishbowl does not natively support.'
    },
    {
      question: 'Why move from Fishbowl Manufacturing to RMDB?',
      answer:
        'The most common trigger is the schedule. Buyers tell us Fishbowl tracks work orders well, but it cannot show them an editable Gantt, cannot enforce finite-capacity rules, and cannot answer "what happens if I move this job to next Tuesday?" — those are exactly the questions RMDB is designed for.'
    },
    {
      question: 'Is RMDB cheaper than Fishbowl?',
      answer:
        'Both use one-time licensing, which is unusual and a real plus over pure SaaS. Fishbowl is sometimes cheaper at the entry tier; RMDB usually wins on total cost once you add real scheduling, multiple planners, or non-QuickBooks ERP integration.'
    },
    {
      question: 'Can I keep Fishbowl and just add RMDB?',
      answer:
        'Yes, and many of our customers do exactly that. RMDB sits next to Fishbowl, pulls the production data it needs, and gives schedulers the finite-capacity Gantt that Fishbowl Manufacturing does not provide.'
    },
    {
      question: 'How long does it take to switch or add RMDB?',
      answer:
        'Most implementations finish inside our 5-Day Implementation Framework, including data import, integration, and live training.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ComparisonPage data={data} />;
}
