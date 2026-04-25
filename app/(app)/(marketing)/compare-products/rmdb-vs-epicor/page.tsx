import * as React from 'react';

import {
  ComparisonPage,
  type ComparisonPageData
} from '@/components/marketing/compare/comparison-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'RMDB vs Epicor: Finite-Capacity Scheduling Without the ERP Price Tag',
  description:
    'Epicor Kinetic is a full ERP. RMDB is purpose-built finite-capacity scheduling. Compare features, pricing, and implementation — and see which is right for your shop.',
  path: '/compare-products/rmdb-vs-epicor',
  keywords:
    'rmdb vs epicor, epicor alternative small business, epicor alternative manufacturing, alternatives to epicor erp, epicor kinetic alternative, epicor advanced planning alternative, smaller alternative to epicor'
});

const data: ComparisonPageData = {
  slug: 'rmdb-vs-epicor',
  competitor: 'Epicor',
  competitorDescription:
    'Full-suite mid-market ERP (Epicor Kinetic) with an expensive APS add-on module',
  h1: 'RMDB vs Epicor: Honest Comparison for Manufacturers Who Just Need Better Scheduling',
  subtitle:
    'Epicor Kinetic is a complete enterprise ERP — powerful, expensive, and built for large mid-market firms. RMDB is finite-capacity production scheduling that installs in 5 days and starts at $5,000. Here is how they really compare.',
  tldr:
    'Epicor Kinetic is the right call for manufacturers who need a fully integrated ERP spanning financials, HR, supply chain, and production — and have the budget ($50k–$200k+/year) and runway (12–18 months) to match. RMDB is the right call when your real problem is the production schedule: you need finite-capacity planning, drag-and-drop Gantt, setup-time modeling, and bottleneck visibility without replacing your existing ERP or committing to an 18-month implementation.',
  introParagraphs: [
    'Epicor Kinetic (formerly Epicor ERP) is one of the most established names in mid-market manufacturing software. It covers the full breadth of enterprise operations — general ledger, accounts payable, CRM, supply chain, production orders, quality, HR, and more. For a $50M+ manufacturer ready to consolidate every business system into one vendor, Epicor Kinetic is a serious contender.',
    'The friction appears when manufacturers realize how much of the Epicor investment exists outside the scheduling problem they actually need to solve. Epicor's Advanced Planning and Scheduling (APS) module is a powerful tool — but it sits on top of a full ERP implementation that takes 12 to 18 months and costs $50,000 to $200,000 or more annually. For job shops, machine shops, and make-to-order manufacturers with 10 to 300 employees, that is not a scheduling upgrade. That is a complete business transformation with a scheduling component buried inside it.',
    'RMDB by User Solutions takes the opposite approach. It is a pure finite-capacity scheduling and production planning system — nothing more, nothing less. It integrates with Epicor (and Epicor JobBOSS, QuickBooks, Sage, Dynamics, SAP, and any other ERP you already have), installs in 5 days, and costs a fraction of the Epicor APS bundle. This page is the head-to-head comparison between the two, built for manufacturers trying to decide whether to buy all of Epicor or just replace the scheduling piece.'
  ],
  features: [
    {
      name: 'Finite-capacity scheduling engine',
      rmdb: true,
      competitor: 'partial',
      note: 'Epicor APS is finite-capable, but requires full ERP implementation and expensive add-on licensing.'
    },
    {
      name: 'Drag-and-drop Gantt chart',
      rmdb: true,
      competitor: 'partial',
      note: 'Available in Epicor APS module — not in base Epicor Kinetic.'
    },
    {
      name: 'Setup time and changeover modeling',
      rmdb: true,
      competitor: 'partial'
    },
    {
      name: 'Multi-step routings with resource constraints',
      rmdb: true,
      competitor: true
    },
    {
      name: 'Forward and reverse scheduling',
      rmdb: true,
      competitor: true
    },
    {
      name: 'Bottleneck heat maps and workcenter analytics',
      rmdb: true,
      competitor: 'partial',
      note: 'Epicor has production reporting but dedicated bottleneck heat maps require configuration and additional licensing.'
    },
    {
      name: 'Live embedded Excel views',
      rmdb: true,
      competitor: false
    },
    {
      name: 'Integration with existing ERP (QuickBooks, Sage, Dynamics, SAP)',
      rmdb: true,
      competitor: 'partial',
      note: 'RMDB integrates alongside your current ERP. Epicor is its own ERP and requires migrating to the Epicor ecosystem.'
    },
    {
      name: 'Integration with Epicor / Epicor JobBOSS',
      rmdb: true,
      competitor: true
    },
    {
      name: 'Full financial and accounting suite',
      rmdb: false,
      competitor: true,
      note: 'RMDB is scheduling-only. Epicor Kinetic includes a complete financial module.'
    },
    {
      name: 'HR and payroll module',
      rmdb: false,
      competitor: true
    },
    {
      name: 'CRM and customer management',
      rmdb: false,
      competitor: true
    },
    {
      name: 'Implementation timeline',
      rmdb: '5 days',
      competitor: '12–18 months'
    },
    {
      name: 'On-premise / self-hosted option',
      rmdb: true,
      competitor: true
    },
    {
      name: 'One-time perpetual license',
      rmdb: true,
      competitor: false,
      note: 'Epicor Kinetic is subscription-based. RMDB is a one-time license with optional annual support.'
    },
    {
      name: 'Best for company size',
      rmdb: '10–500 employees',
      competitor: '100–5,000+ employees'
    }
  ],
  pricing: {
    rmdbPrice: 'From $5,000',
    rmdbModel: 'One-time license · optional annual support contract · no per-user fees',
    competitorPrice: '$50,000–$200,000+/year',
    competitorModel:
      'Annual SaaS subscription + implementation + APS add-on · user-based and module-based pricing',
    summary:
      'The pricing gap between RMDB and Epicor is not incremental — it is an order of magnitude. A full Epicor Kinetic deployment for a mid-market manufacturer typically costs $50,000 to $200,000 or more per year once you account for user licenses, modules, implementation services, and annual maintenance. RMDB starts at a one-time $5,000 and most shops land between $10,000 and $30,000 all-in. If your primary need is finite-capacity scheduling rather than a complete ERP replacement, the math makes RMDB difficult to argue against.'
  },
  rmdbWinsAt: [
    'Pure finite-capacity scheduling depth — the thing Epicor APS charges a premium for and requires a full ERP to access.',
    'Implementation speed — 5 days vs 12–18 months. You are running a real schedule before the end of week one.',
    'Total cost — $5,000 one-time vs $50,000–$200,000+/year recurring.',
    'Works alongside your existing ERP — no platform migration required.',
    'Drag-and-drop Gantt with constraint-aware reschedules available to all users out of the box.',
    'Setup-time sequencing and bottleneck analytics without additional module fees.',
    'Right-sized for job shops and make-to-order manufacturers with 10–500 employees.'
  ],
  competitorWinsAt: [
    'Complete ERP suite — financials, HR, CRM, supply chain, and production all under one roof.',
    'Purpose-built for large mid-market manufacturers ($50M+ revenue, 100+ employees) who need enterprise-wide software consolidation.',
    'Stronger supply chain and procurement workflows for companies with complex multi-site sourcing.',
    'Deep industry-specific compliance modules (defense, automotive, aerospace) built into the platform.',
    'Single vendor for everything — one support contract, one implementation partner, one upgrade cycle.'
  ],
  rmdbBestFor:
    'Your real bottleneck is the production schedule — not missing financials or HR software. You have multi-step routings, setup times, finite resources, and daily reschedules. You already have (or want to keep) a separate ERP or accounting package, and you need finite-capacity scheduling to work alongside it rather than replace everything you have. Budget matters and 5-day implementation beats 18-month transformation.',
  competitorBestFor:
    'You are a mid-to-large manufacturer ($20M–$500M+ revenue) that needs a single vendor to consolidate financials, HR, CRM, supply chain, and production. You have a multi-year IT roadmap, an executive sponsor, a dedicated implementation budget, and the organizational bandwidth for an 18-month enterprise software project. The scheduling module is one item on a longer list of business systems you need to replace.',
  migrationSteps: [
    {
      title: 'Identify what Epicor is solving vs what scheduling needs',
      description:
        'Many manufacturers considering Epicor only need better scheduling — not a new ERP. We help you map your current pain points to specific capabilities so you buy only what solves the actual problem. If you have an existing ERP that handles financials well, RMDB adds scheduling depth without displacing it.'
    },
    {
      title: 'Export production data from your current system',
      description:
        'Whether you are coming from Epicor JobBOSS, an older Epicor version, or any other ERP, we export the entities that matter for scheduling: work centers, routings, BOMs, open orders, and shift calendars. Standard CSV or direct database connection — whatever your system supports.'
    },
    {
      title: 'Build finite-capacity routings in RMDB',
      description:
        'If your current system uses infinite-capacity or simplified routings, we rebuild them in RMDB with proper setup times, resource constraints, and sequencing rules. This is where finite-capacity scheduling starts paying off — the schedule finally reflects how your floor actually runs.'
    },
    {
      title: 'Wire RMDB into your existing ERP or accounting system',
      description:
        'RMDB integrates with Epicor, Epicor JobBOSS, QuickBooks, Sage, Microsoft Dynamics, SAP, and any other ERP via API or file-based exchange. Production data flows both directions without re-keying — schedulers work in RMDB while accounting and purchasing stay in whatever system they already use.'
    },
    {
      title: 'Train your schedulers and go live in 5 days',
      description:
        'Standard 5-Day Implementation Framework — RMDB is configured, integrated, and your team is running live finite-capacity schedules before the end of week one. Compare that to 12–18 months for a full Epicor Kinetic rollout.'
    }
  ],
  faqs: [
    {
      question: 'Is RMDB a replacement for Epicor?',
      answer:
        'RMDB replaces the scheduling and production planning layer of Epicor — specifically the finite-capacity APS functionality. It does not replace Epicor financials, HR, CRM, or supply chain. Many manufacturers use RMDB alongside an existing ERP (including Epicor products like JobBOSS) so they get best-in-class scheduling without ripping out the rest of their software stack.'
    },
    {
      question: 'Does RMDB integrate with Epicor or Epicor JobBOSS?',
      answer:
        'Yes. RMDB integrates with Epicor Kinetic, Epicor JobBOSS, and other Epicor products via API or file-based exchange. Production orders, work centers, BOMs, and routings flow into RMDB for scheduling, and schedule results flow back. You keep Epicor for what it does well and add RMDB for finite-capacity scheduling depth.'
    },
    {
      question: 'Why would I buy RMDB instead of just getting the Epicor APS module?',
      answer:
        'Three reasons: cost, time, and fit. Epicor APS requires a full Epicor Kinetic implementation — you cannot buy the scheduling module standalone. That means $50,000–$200,000+/year and 12–18 months before you see a finite-capacity schedule. RMDB starts at $5,000 one-time and goes live in 5 days. And RMDB is purpose-built for scheduling in a way a module inside a generalist ERP cannot match.'
    },
    {
      question: 'What size manufacturer is RMDB right for?',
      answer:
        'RMDB is built for job shops and make-to-order manufacturers with 10 to 500 employees. Customers include GE, Cummins, and BAE Systems divisions alongside single-location machine shops. Epicor Kinetic is typically a better fit for manufacturers over $20M revenue with 100+ employees who need enterprise-wide software consolidation.'
    },
    {
      question: 'Can I keep my current ERP and just add RMDB for scheduling?',
      answer:
        'Yes, and this is the most common path. RMDB is designed to sit alongside your existing ERP — whether that is QuickBooks, Sage, Dynamics, Epicor, JobBOSS, SAP, or anything else. You do not need to replace your ERP to get finite-capacity scheduling. RMDB integrates with what you already have.'
    },
    {
      question: 'How long does RMDB implementation take compared to Epicor?',
      answer:
        'RMDB uses a standard 5-Day Implementation Framework. Most manufacturers have a live finite-capacity schedule running before the end of week one. A full Epicor Kinetic implementation typically takes 12 to 18 months. If your scheduling problem is urgent, waiting 18 months is not a plan — it is a delay.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ComparisonPage data={data} />;
}
