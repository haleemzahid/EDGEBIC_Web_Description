import * as React from 'react';

import {
  ComparisonPage,
  type ComparisonPageData
} from '@/components/marketing/compare/comparison-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'RMDB vs Global Shop Solutions: Which Schedules Better for Job Shops?',
  description:
    'Global Shop Solutions does ERP for job shops well. RMDB adds true finite-capacity APS scheduling GSS\'s built-in module cannot match. Honest comparison, pricing, features, migration.',
  path: '/compare-products/rmdb-vs-global-shop-solutions',
  keywords:
    'rmdb vs global shop solutions, global shop solutions alternative, alternatives to global shop solutions, global shop solutions competitors, global shop erp alternative, manufacturing erp alternative global shop, job shop alternative to global shop solutions'
});

const data: ComparisonPageData = {
  slug: 'rmdb-vs-global-shop-solutions',
  competitor: 'Global Shop Solutions',
  competitorDescription:
    'Full ERP suite for job shops and make-to-order manufacturers, founded 1976',
  h1: 'RMDB vs Global Shop Solutions: The Honest Comparison for Job Shop Scheduling',
  subtitle:
    'Global Shop Solutions is one of the most established ERP systems for job shops. RMDB is a dedicated finite-capacity APS built for make-to-order manufacturers who need constraint-aware scheduling their ERP cannot deliver. Here is how they really compare.',
  tldr:
    'Global Shop Solutions is a well-rounded ERP for job shops — quoting, work orders, inventory, labor tracking, and financials in one system. Its scheduling module handles capacity requirements planning, but it is not a true constraint-based APS. RMDB is the better answer when the production schedule is the hardest problem you face — when you need a Gantt that respects finite resource capacity, setup times, and multi-step routings across competing jobs. The two products commonly coexist: GSS managing ERP transactions, RMDB owning the schedule.',
  introParagraphs: [
    'Global Shop Solutions has served job shops and make-to-order manufacturers since 1976. That longevity is meaningful — it means mature quoting, proven work order management, deep labor tracking, and financials designed around the realities of custom manufacturing. For shops that need a single integrated ERP and do not require advanced scheduling, GSS is a credible, well-supported choice.',
    'Where Global Shop Solutions shows its limits is in detailed production scheduling. Its scheduling module uses capacity requirements planning (CRP) — a push-based approach that translates order demand into capacity loads but does not enforce finite resource constraints. It does not give schedulers a drag-and-drop Gantt where they can see exactly which job is on which machine at which hour, evaluate setup-time sequences across competing orders, or run a bottleneck heat map across the week. For shops that reschedule daily, those are serious gaps.',
    'RMDB by User Solutions was built precisely for that gap. It is a finite-capacity APS with 35+ years of deployment in job shops, machine shops, and make-to-order environments at companies including GE, Cummins, and BAE Systems. Rather than replacing Global Shop Solutions, RMDB most often runs alongside it — GSS continues managing ERP data while RMDB provides the constraint-aware scheduling engine the GSS module cannot match. One-time licensing, a 5-Day Implementation Framework, and native integration with GSS data exports make the combination straightforward.'
  ],
  features: [
    {
      name: 'True finite-capacity scheduling (APS)',
      rmdb: true,
      competitor: false,
      note: 'GSS uses capacity requirements planning (CRP), not constraint-based finite scheduling.'
    },
    {
      name: 'Drag-and-drop Gantt chart',
      rmdb: true,
      competitor: false,
      note: 'GSS scheduling views show load but do not offer an interactive finite-capacity Gantt.'
    },
    {
      name: 'Setup-time and changeover modeling',
      rmdb: true,
      competitor: 'partial',
      note: 'GSS records setup time on routings; RMDB uses it to sequence jobs and minimize changeover cost.'
    },
    {
      name: 'Forward and reverse scheduling',
      rmdb: true,
      competitor: 'partial'
    },
    {
      name: 'Bottleneck heat maps and workcenter analytics',
      rmdb: true,
      competitor: false
    },
    {
      name: 'Multi-step routings with resource constraints',
      rmdb: true,
      competitor: true,
      note: 'Both support routings; RMDB enforces finite constraints at each operation.'
    },
    {
      name: 'Work orders and job tracking',
      rmdb: 'partial',
      competitor: true,
      note: 'GSS provides full WO lifecycle management; RMDB focuses on scheduling, not WO administration.'
    },
    {
      name: 'Quoting and estimating',
      rmdb: false,
      competitor: true
    },
    {
      name: 'Inventory and materials management',
      rmdb: true,
      competitor: true
    },
    {
      name: 'Labor and time tracking',
      rmdb: 'partial',
      competitor: true
    },
    {
      name: 'Accounting and financials',
      rmdb: false,
      competitor: true
    },
    {
      name: 'ERP integration (QuickBooks, Sage, Dynamics, Epicor, SAP)',
      rmdb: true,
      competitor: 'partial',
      note: 'RMDB integrates alongside any ERP; GSS is itself the ERP.'
    },
    {
      name: 'Excel-native views and live embedded workbooks',
      rmdb: true,
      competitor: false
    },
    {
      name: 'On-premise / self-hosted option',
      rmdb: true,
      competitor: true
    },
    {
      name: 'Implementation timeline',
      rmdb: '5 days',
      competitor: '3–9 months'
    },
    {
      name: 'Pricing model',
      rmdb: 'One-time license from $5,000',
      competitor: 'Perpetual ~$15,000–$50,000+ or subscription'
    }
  ],
  pricing: {
    rmdbPrice: 'From $5,000',
    rmdbModel: 'One-time license · optional annual support contract · no per-user fees',
    competitorPrice: '~$15,000–$50,000+ perpetual (or subscription)',
    competitorModel:
      'Perpetual license or subscription · implementation services typically $20,000–$80,000 separately',
    summary:
      'Global Shop Solutions is a full ERP, so its licensing and implementation costs reflect the broader scope — quoting, accounting, labor, inventory, and scheduling in one system. RMDB licenses for a fraction of that because it is purpose-built for scheduling rather than ERP-wide. Most buyers who already have GSS find it cheaper to add RMDB for scheduling than to replace their ERP entirely. For shops evaluating from scratch, the right question is whether you need a full ERP or a best-of-breed scheduling tool that integrates with lighter accounting software.'
  },
  rmdbWinsAt: [
    'True finite-capacity scheduling — constraint-aware, not just CRP load calculations.',
    'Drag-and-drop Gantt with real-time view of every machine and every job.',
    'Setup-time-aware sequencing that minimizes changeover cost across competing orders.',
    'Bottleneck identification and workcenter heat maps for schedulers and production managers.',
    'Speed of deployment — 5-Day Implementation Framework vs. months of ERP go-live.',
    'Running as an APS layer alongside GSS rather than forcing a full system replacement.'
  ],
  competitorWinsAt: [
    'All-in-one ERP scope — quoting, estimating, work orders, inventory, labor, and financials together.',
    'Deep job shop quoting and estimating built around custom manufacturing cost structures.',
    'Strong labor and time tracking with shop floor data collection.',
    'Financials and accounting native to the system, eliminating a separate accounting tool.',
    'Long track record (since 1976) with a large installed base of job shops.'
  ],
  rmdbBestFor:
    'Manufacturers whose primary unsolved problem is the daily production schedule — where jobs compete for finite resources, setup sequences matter, and the schedule changes every morning. RMDB works as a standalone APS or as a scheduling layer on top of Global Shop Solutions.',
  competitorBestFor:
    'Job shops that want a single integrated ERP covering quoting through financials and do not need constraint-based finite scheduling. Also a strong fit where detailed job costing, estimating, and labor tracking are as important as the schedule.',
  migrationSteps: [
    {
      title: 'Decide: replace or augment',
      description:
        'Most GSS shops add RMDB as an APS layer rather than replacing their ERP. We map your scheduling gaps against what GSS already covers before recommending a path.'
    },
    {
      title: 'Export scheduling-relevant data from GSS',
      description:
        'Export work centers, routings, open work orders, and shift calendars. Global Shop Solutions supports standard data exports from all entities RMDB needs to build a live schedule.'
    },
    {
      title: 'Build finite-capacity routings in RMDB',
      description:
        'GSS routings carry standard times; we upgrade them into RMDB routings with setup times, resource constraints, alternate workcenter rules, and crew-size logic so finite scheduling solves accurately.'
    },
    {
      title: 'Wire the integration',
      description:
        'RMDB pulls open orders and capacity data from GSS and pushes scheduled start/finish dates back. Production schedulers work in RMDB; the rest of your team keeps using GSS for WO management and accounting.'
    },
    {
      title: 'Go live in 5 days',
      description:
        'Standard 5-Day Implementation Framework — your first live finite-capacity Gantt is running before the end of week one, without touching your GSS configuration.'
    }
  ],
  faqs: [
    {
      question: 'Does RMDB replace Global Shop Solutions?',
      answer:
        'It does not have to. The most common path is to keep Global Shop Solutions for ERP — quoting, work orders, inventory, labor, and financials — and add RMDB as the finite-capacity scheduling layer on top. RMDB integrates with GSS data exports so the two systems stay in sync without duplicate data entry.'
    },
    {
      question: "What is wrong with Global Shop Solutions' built-in scheduling?",
      answer:
        'GSS scheduling uses capacity requirements planning (CRP), which shows whether a workcenter is overloaded but does not enforce finite constraints. It does not provide a drag-and-drop Gantt where a scheduler can see exactly which job is on which machine at which hour, sequence jobs to minimize setup time, or get a heat map of bottleneck workcenters. For shops that reschedule daily against competing priorities, those gaps are significant.'
    },
    {
      question: 'How long does it take to add RMDB alongside GSS?',
      answer:
        'Most implementations complete within our 5-Day Implementation Framework — data import, integration, routings, and live training in one week. This compares favorably with a GSS implementation, which typically takes three to nine months.'
    },
    {
      question: 'Is RMDB cheaper than Global Shop Solutions?',
      answer:
        'RMDB starts at $5,000 as a one-time license with no per-user fees. Global Shop Solutions perpetual licenses typically range from $15,000 to $50,000 or more before implementation services. For shops that already have GSS, adding RMDB for scheduling is almost always less expensive than replacing the ERP entirely.'
    },
    {
      question: 'Does RMDB work with the data already in Global Shop Solutions?',
      answer:
        'Yes. RMDB integrates with standard GSS data exports — work centers, routings, open work orders, and calendars. You do not need to re-enter data you have already built in GSS.'
    },
    {
      question: 'Who should consider switching from Global Shop Solutions to RMDB entirely?',
      answer:
        'Shops that use GSS primarily for scheduling but do not need its quoting, estimating, or accounting modules sometimes find a lighter ERP plus RMDB is a simpler, cheaper stack. However, for most job shops we recommend augmenting rather than replacing — GSS has earned its place in the quoting and financials workflow.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ComparisonPage data={data} />;
}
