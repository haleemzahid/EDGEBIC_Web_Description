import * as React from 'react';

import {
  ComparisonPage,
  type ComparisonPageData
} from '@/components/marketing/compare/comparison-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'RMDB vs QuickBooks for Manufacturing: When You Outgrow Accounting',
  description:
    'Honest RMDB vs QuickBooks Manufacturing comparison. Accounting software with manufacturing add-ons vs dedicated finite-capacity scheduling. When and why to add scheduling on top of QuickBooks.',
  path: '/compare-products/rmdb-vs-quickbooks',
  keywords:
    'rmdb vs quickbooks, quickbooks manufacturing alternative, alternatives to quickbooks manufacturing, quickbooks manufacturing scheduling, quickbooks production planning, quickbooks scheduling software, quickbooks competitors manufacturing'
});

const data: ComparisonPageData = {
  slug: 'rmdb-vs-quickbooks',
  competitor: 'QuickBooks (Manufacturing)',
  competitorDescription:
    'Accounting software with light manufacturing add-ons (Enterprise Manufacturing & Wholesale)',
  h1: 'RMDB vs QuickBooks for Manufacturing: When Accounting Is Not Enough',
  subtitle:
    'QuickBooks is the most popular small-business accounting software in the world. RMDB is a finite-capacity scheduler. They solve completely different problems — and most manufacturers need both.',
  tldr:
    'QuickBooks is the right tool for accounting, AR/AP, payroll, and basic inventory. It is NOT a scheduling tool — even the QuickBooks Enterprise Manufacturing & Wholesale edition does not provide real finite-capacity scheduling. Add RMDB for scheduling and keep QuickBooks for accounting.',
  introParagraphs: [
    'QuickBooks is, by a wide margin, the most-used accounting software for small and mid-size manufacturers in the US. The Enterprise Manufacturing & Wholesale edition adds inventory assemblies, basic BOMs, work orders, and warehouse management — enough to run a small manufacturer\'s back office. Combined with QuickBooks payroll and accounting, it is a strong foundation that most manufacturers do not want to leave.',
    'But QuickBooks was never designed as manufacturing software. Its work orders are simple, its BOMs are flat (single-level), and it has no scheduling engine of any kind. For manufacturers whose primary pain is "we cannot tell customers when their order will be done," QuickBooks alone is not the answer — and replacing QuickBooks with a full ERP is usually the wrong solution because the rest of QuickBooks is working fine.',
    'Resource Manager DB (RMDB) is the dedicated scheduling layer that pairs with QuickBooks. It integrates cleanly with QuickBooks via the standard Intuit interface, takes work order and item data, runs real finite-capacity scheduling, and feeds completed quantities back for inventory and cost accounting. This page is the honest comparison for QuickBooks manufacturers asking "do I need to leave QuickBooks?" The answer is almost always no — you just need to add scheduling on top.'
  ],
  features: [
    {
      name: 'Finite-capacity scheduling engine',
      rmdb: true,
      competitor: false,
      note: 'QuickBooks has no scheduling engine of any kind, even in the Manufacturing edition.'
    },
    { name: 'Drag-and-drop Gantt', rmdb: true, competitor: false },
    { name: 'Multi-level BOMs', rmdb: true, competitor: 'partial' },
    { name: 'Multi-step routings with setup time', rmdb: true, competitor: false },
    { name: 'Alternate work center support', rmdb: true, competitor: false },
    {
      name: 'Accounting / AR / AP / payroll',
      rmdb: false,
      competitor: true,
      note: 'QuickBooks is the canonical small-business accounting tool; RMDB does not replace it.'
    },
    {
      name: 'Inventory tracking',
      rmdb: 'partial',
      competitor: true
    },
    {
      name: 'Sales tax / financial reporting',
      rmdb: false,
      competitor: true
    },
    {
      name: 'Direct QuickBooks integration',
      rmdb: true,
      competitor: 'native'
    },
    {
      name: 'Cloud / SaaS option',
      rmdb: true,
      competitor: true
    },
    {
      name: 'Pricing model',
      rmdb: 'One-time license',
      competitor: 'Per-user / month subscription'
    }
  ],
  pricing: {
    rmdbPrice: 'From $5,000',
    rmdbModel: 'One-time license · no per-user fees · optional support contract',
    competitorPrice: 'From ~$200/mo (Enterprise)',
    competitorModel: 'Per-user monthly subscription · annual contract · tiered editions',
    summary:
      'QuickBooks Enterprise Manufacturing & Wholesale runs $200–$400+ per user per month. RMDB is one-time licensing, so total cost over a 5-year horizon is dramatically lower than either subscription. But this is not the right comparison because QuickBooks and RMDB solve different problems. The right framing: "I am paying $X per month for QuickBooks accounting and need to add scheduling. Should I add RMDB ($5,000 one-time) or migrate to a full ERP ($30,000+ per year)?" The answer is almost always RMDB.'
  },
  rmdbWinsAt: [
    'Finite-capacity scheduling — QuickBooks has no scheduling engine at all',
    'Multi-step routings with setup time and alternate machines',
    'Drag-and-drop Gantt for daily reschedules',
    'Pairing with QuickBooks accounting without replacing it',
    'One-time licensing that does not scale with team size',
    'Manufacturers whose problem is "when will the order be done?" not "what does this customer owe us?"'
  ],
  competitorWinsAt: [
    'Accounting, AR, AP, payroll, and tax reporting (QuickBooks is best-in-class at this)',
    'Small-business inventory tracking with assemblies',
    'Integration with Intuit ecosystem (TurboTax, payroll, banking)',
    'Companies that already have a QuickBooks ProAdvisor relationship'
  ],
  rmdbBestFor:
    'You run QuickBooks for accounting and it is working fine for that. Your problem is scheduling — you cannot promise reliable delivery dates, you reschedule manually every morning, and you need finite-capacity logic that QuickBooks does not have. Add RMDB for scheduling and keep QuickBooks for accounting.',
  competitorBestFor:
    'You need accounting, AR/AP, payroll, basic inventory, and tax reporting. Your manufacturing complexity is light — flat BOMs, simple work orders, no real scheduling problem. QuickBooks Manufacturing alone is enough until your scheduling complexity grows.',
  migrationSteps: [
    {
      title: 'Keep QuickBooks, add RMDB on top (the right answer for almost every shop)',
      description:
        'The standard pattern: QuickBooks remains the system of record for accounting, AR, AP, and basic inventory. RMDB is added for finite-capacity scheduling. The two systems integrate via the standard QuickBooks Intuit interface.'
    },
    {
      title: 'Export item, BOM, and customer data from QuickBooks',
      description:
        'QuickBooks supports CSV export of all the entities RMDB needs. The Intuit integration also supports live two-way sync for ongoing operations.'
    },
    {
      title: 'Build real RMDB routings',
      description:
        'QuickBooks BOMs are flat (single-level). We help you upgrade them into RMDB multi-level BOMs and routings with setup times — the data QuickBooks does not capture but scheduling needs.'
    },
    {
      title: 'Wire RMDB into QuickBooks for two-way sync',
      description:
        'Customer orders flow from QuickBooks to RMDB to drive scheduling. Completed work orders and labor data flow back to QuickBooks for billing and cost accounting.'
    },
    {
      title: 'Train and go live in 5 days',
      description:
        'Standard 5-Day Implementation Framework. The QuickBooks integration is one of the most common patterns we deploy.'
    }
  ],
  faqs: [
    {
      question: 'Is RMDB a QuickBooks Manufacturing alternative?',
      answer:
        'For scheduling specifically, yes. For accounting, no — RMDB is not an accounting tool and does not replace QuickBooks AR/AP/payroll. The right framing is "QuickBooks for accounting, RMDB for scheduling" — they pair, they do not compete.'
    },
    {
      question: 'Does QuickBooks Enterprise have built-in production scheduling?',
      answer:
        'No. QuickBooks Enterprise Manufacturing & Wholesale tracks inventory assemblies and basic work orders, but it has no scheduling engine. There is no Gantt, no finite-capacity logic, no setup time modeling. For real scheduling, you need a dedicated tool like RMDB.'
    },
    {
      question: 'Does RMDB integrate with QuickBooks Online or only Desktop?',
      answer:
        'Both. RMDB integrates with QuickBooks Online and QuickBooks Desktop (Pro, Premier, Enterprise). The integration is via the standard Intuit interface and supports two-way sync.'
    },
    {
      question: 'How much does it cost to add RMDB to a QuickBooks shop?',
      answer:
        'RMDB starts at $5,000 as a one-time license, plus optional annual support. For a manufacturer that is already paying $200–$400/user/month for QuickBooks Enterprise, adding RMDB is a small line item that solves the scheduling problem QuickBooks cannot solve.'
    },
    {
      question: 'Should I leave QuickBooks for a full ERP instead?',
      answer:
        'Almost never. Replacing QuickBooks with a full ERP (NetSuite, Sage, Epicor) is a 6–12 month project that disrupts your accounting team and costs $30,000+ per year. Adding RMDB on top of QuickBooks is a 5-day project that costs $5,000 once. Unless you have a real reason to leave QuickBooks (multi-subsidiary, foreign currency, etc.), keep it.'
    },
    {
      question: 'How long does QuickBooks + RMDB integration take?',
      answer:
        'Standard 5-Day Implementation Framework. The QuickBooks integration is well-established — we have deployed it for hundreds of small manufacturers over 35+ years.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ComparisonPage data={data} />;
}
