import * as React from 'react';

import {
  ComparisonPage,
  type ComparisonPageData
} from '@/components/marketing/compare/comparison-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'RMDB vs ProShop ERP: Which Is Better for Job Shops?',
  description:
    'Honest RMDB vs ProShop ERP comparison for job shops and machine shops. ERP-with-paperless-shop vs dedicated finite-capacity scheduler. Features, pricing, migration.',
  path: '/compare-products/rmdb-vs-proshop',
  keywords:
    'rmdb vs proshop, proshop alternative, proshop alternatives, alternatives to proshop, proshop ERP alternative, proshop comparison, proshop competitors, machine shop ERP comparison'
});

const data: ComparisonPageData = {
  slug: 'rmdb-vs-proshop',
  competitor: 'ProShop ERP',
  competitorDescription:
    'Web-based paperless ERP popular with ISO 9001/AS9100 machine shops',
  h1: 'RMDB vs ProShop ERP: Which Fits Your Job Shop?',
  subtitle:
    'ProShop is a full ERP with built-in quality and paperless workflow. RMDB is a focused finite-capacity scheduler. Different tools for different problems — here is when each one wins.',
  tldr:
    'ProShop is the right call if you are an AS9100/ISO 9001 machine shop that needs quality, ERP, and paperless shop management in one system. RMDB is the right call if you already have an ERP (or ProShop) and need real finite-capacity scheduling on top — or if your scheduling problem is the bottleneck regardless of which ERP you run.',
  introParagraphs: [
    'ProShop ERP has built a strong reputation in the precision machining and AS9100 aerospace community as the "paperless shop" platform. It bundles ERP, MES, quality management, document control, and shop-floor execution into a single web-based system. For a machine shop that wants one vendor to handle everything, ProShop is genuinely a strong choice.',
    'The trade-off is that ProShop is intentionally a generalist. Its scheduling module covers the basics — work orders, due dates, basic capacity — but it is not a finite-capacity APS in the way dedicated scheduling tools are. For shops with sequence-dependent setups, alternate machines, complex routings, or daily expedites, ProShop scheduling becomes a manual exercise that the software does not really help with.',
    'Resource Manager DB (RMDB) is the opposite design: a focused finite-capacity scheduler that does scheduling extremely well and integrates with whatever ERP you already run — including ProShop. This page is the honest comparison, and the answer for many shops is "use both."'
  ],
  features: [
    { name: 'Finite-capacity scheduling engine', rmdb: true, competitor: 'partial' },
    { name: 'Drag-and-drop Gantt', rmdb: true, competitor: false },
    { name: 'Sequence-dependent setup time', rmdb: true, competitor: false },
    { name: 'Alternate work center support', rmdb: true, competitor: 'partial' },
    { name: 'What-if scenario analysis', rmdb: true, competitor: false },
    {
      name: 'Full ERP (purchasing, accounting, inventory)',
      rmdb: false,
      competitor: true,
      note: 'ProShop is a full ERP; RMDB is a scheduling layer that pairs with your ERP.'
    },
    {
      name: 'AS9100 / ISO 9001 quality management',
      rmdb: false,
      competitor: true,
      note: 'ProShop has built-in QMS; RMDB does not replace your QMS.'
    },
    {
      name: 'Paperless shop floor',
      rmdb: false,
      competitor: true
    },
    {
      name: 'Document control',
      rmdb: false,
      competitor: true
    },
    {
      name: 'Web-based / multi-device',
      rmdb: 'partial',
      competitor: true
    },
    {
      name: 'On-premise deployment',
      rmdb: true,
      competitor: 'partial'
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
    competitorPrice: 'From ~$300/user/mo',
    competitorModel: 'Per-user monthly subscription · annual contracts · tiered features',
    summary:
      'ProShop is priced as enterprise SaaS — cost grows linearly with team size. RMDB is one-time licensing, so cost flattens. For a 10-user shop, RMDB pays back vs ProShop in 18–24 months on subscription cost alone. But the right comparison is not pure cost: ProShop replaces multiple systems (ERP + QMS + MES) while RMDB only replaces your scheduler.'
  },
  rmdbWinsAt: [
    'Real finite-capacity scheduling with sequence-dependent setup modeling',
    'Drag-and-drop Gantt for daily reschedules and customer expedites',
    'What-if scenario analysis before committing schedule changes',
    'Pairing with an existing ERP (including ProShop) without replacing it',
    'One-time licensing that does not scale with team size',
    'Mid-to-large machine shops where scheduling complexity is the primary problem'
  ],
  competitorWinsAt: [
    'Single-vendor ERP + QMS + MES + scheduling in one platform',
    'AS9100 / ISO 9001 paperless shop with built-in document control',
    'Smaller shops (5–25 employees) who want one system instead of multiple',
    'Aerospace and defense machine shops with quality compliance as the primary driver'
  ],
  rmdbBestFor:
    'Your ERP is fine but your schedule is broken. You need real finite-capacity scheduling with setup-aware sequencing, and you would rather add a focused tool than rip out the rest of your stack. You may even use RMDB alongside ProShop.',
  competitorBestFor:
    'You want one vendor for ERP, QMS, document control, and basic scheduling — and your scheduling complexity is light to moderate. AS9100 or ISO 9001 compliance is a primary requirement, and the integrated paperless workflow is a feature you actively want.',
  migrationSteps: [
    {
      title: 'Decide whether to replace or augment',
      description:
        'Most shops keep ProShop for ERP/QMS/document control and add RMDB for finite-capacity scheduling. Some replace ProShop entirely if they have a separate ERP. We help you make the call before any data moves.'
    },
    {
      title: 'Export ProShop scheduling data',
      description:
        'Export items, BOMs, routings, work centers, and open work orders from ProShop. Standard CSV export covers everything RMDB needs to schedule.'
    },
    {
      title: 'Build RMDB routings with real setup time',
      description:
        'ProShop routings are simple by design. We help you upgrade them into RMDB routings with proper setup times, alternate work centers, and operator skill matrices so finite-capacity scheduling actually solves correctly.'
    },
    {
      title: 'Wire RMDB into ProShop (or your other ERP)',
      description:
        'If you keep ProShop, RMDB pulls work orders from it and pushes back completion data. If you switch ERPs, RMDB integrates with Sage, Epicor, Microsoft Dynamics, QuickBooks, and others.'
    },
    {
      title: 'Train and go live in 5 days',
      description:
        'Standard 5-Day Implementation Framework. First live finite-capacity schedule before the end of week one.'
    }
  ],
  faqs: [
    {
      question: 'Is RMDB an actual alternative to ProShop?',
      answer:
        'For scheduling specifically, yes. For full ERP, no — RMDB is not an ERP and does not replace ProShop\'s purchasing, accounting, or QMS modules. The most common pattern is to keep ProShop for everything except scheduling and add RMDB for that one job.'
    },
    {
      question: 'Why would a ProShop user move to RMDB for scheduling?',
      answer:
        'The most common trigger we see: the shop has grown past the complexity ProShop scheduling can handle. Once you have 30+ active work orders, sequence-dependent setups, alternate machines, and daily customer expedites, ProShop scheduling becomes a manual whiteboard exercise. RMDB is purpose-built for that level of complexity.'
    },
    {
      question: 'Does RMDB do AS9100 or ISO 9001 quality management?',
      answer:
        'No. RMDB tracks the scheduling and execution side (which operator ran which operation, when, with what result), but it does not replace your QMS. If quality management is a primary need, ProShop or a dedicated QMS is the right tool — and RMDB can integrate with both.'
    },
    {
      question: 'Can I keep ProShop and just add RMDB?',
      answer:
        'Yes, and many shops do exactly that. RMDB sits next to ProShop, pulls work orders for finite-capacity scheduling, and pushes back schedule data. ProShop remains the system of record for ERP and quality.'
    },
    {
      question: 'How does pricing compare over 5 years?',
      answer:
        'For a 10-user shop: ProShop at ~$300/user/mo = ~$36,000/year = $180,000 over 5 years. RMDB at one-time $5,000–$15,000 + optional annual support = $20,000–$35,000 over 5 years. RMDB is dramatically cheaper, but the right question is whether you need just scheduling (RMDB) or the full ERP + QMS bundle (ProShop).'
    },
    {
      question: 'How long does it take to add RMDB to a ProShop shop?',
      answer:
        'Standard 5-Day Implementation Framework. ProShop data export is straightforward, and our team handles the routing rebuild and ERP integration in the same week.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ComparisonPage data={data} />;
}
