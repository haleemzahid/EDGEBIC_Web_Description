import * as React from 'react';

import {
  ComparisonPage,
  type ComparisonPageData
} from '@/components/marketing/compare/comparison-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'RMDB vs E2 Shop System: Finite-Capacity Scheduling for Serious Job Shops',
  description:
    'E2 ShopTech handles quoting and work orders well. RMDB adds true finite-capacity scheduling. Compare features, pricing, and see which fits your job shop better.',
  path: '/compare-products/rmdb-vs-e2-shop-system',
  keywords:
    'rmdb vs e2 shop system, e2 shop system alternative, alternatives to e2 shoptech, e2 shoptech alternative, e2 manufacturing software alternative, shoptech e2 competitors, job shop software alternative to e2'
});

const data: ComparisonPageData = {
  slug: 'rmdb-vs-e2-shop-system',
  competitor: 'E2 Shop System',
  competitorDescription:
    'Job shop ERP (E2 ShopTech / Shoptech) popular in metal fab and machine shops for quoting and work orders',
  h1: 'RMDB vs E2 Shop System: The Scheduling-Depth Comparison for Job Shops',
  subtitle:
    'E2 ShopTech is a solid job shop ERP for quoting, estimating, and work order tracking. RMDB is finite-capacity production scheduling that enforces real constraints — shifts, setups, and resource availability. Here is how they compare for shops where the schedule actually matters.',
  tldr:
    'E2 Shop System is a well-regarded choice for job shops that need quoting, estimating, purchasing, and basic work order tracking in one package. Its scheduling, however, defaults to infinite capacity — it does not enforce finite resource constraints or give schedulers an editable Gantt. RMDB is the right answer when the schedule itself is the bottleneck: you need finite-capacity planning, drag-and-drop sequencing, setup-time modeling, and the ability to answer "what happens if I move this job?" in seconds rather than hours.',
  introParagraphs: [
    'E2 Shop System (built by Shoptech) has been a fixture in the job shop software market for decades. It covers the front-to-back workflow that small job shops need: quoting, job costing, purchase orders, work orders, shipping, and basic scheduling. In metal fabrication and CNC machine shops especially, E2 has a loyal user base that trusts it for tracking jobs from quote to invoice.',
    'The scheduling module is where E2 starts to show its limits. E2 uses infinite-capacity scheduling by default — it will sequence jobs and estimate completion dates, but it does not enforce finite resource constraints. It does not model setup times between jobs. It does not give schedulers a drag-and-drop Gantt where they can resequence work and instantly see downstream impact. For shops that run a simple queue and rarely need to rearrange, that is acceptable. For shops that reschedule daily, handle rush jobs, or manage multiple constrained workcenters, it is not.',
    'RMDB by User Solutions is built specifically for that second world. It is a pure finite-capacity scheduling engine designed for job shops, machine shops, and make-to-order manufacturers — the same market E2 serves. The two products are not mutually exclusive: many shops keep E2 for quoting and job tracking while adding RMDB for finite-capacity scheduling. Others replace E2 scheduling entirely. This page compares the two honestly so you can decide which path makes sense for your operation.'
  ],
  features: [
    {
      name: 'Finite-capacity scheduling engine',
      rmdb: true,
      competitor: false,
      note: 'E2 schedules jobs but does not enforce finite resource constraints — workcenters can be overloaded without warning.'
    },
    {
      name: 'Drag-and-drop Gantt chart',
      rmdb: true,
      competitor: false,
      note: 'E2 provides a schedule view but not an interactive constraint-aware Gantt.'
    },
    {
      name: 'Setup time and changeover modeling',
      rmdb: true,
      competitor: false
    },
    {
      name: 'Forward and reverse scheduling',
      rmdb: true,
      competitor: 'partial',
      note: 'E2 supports basic forward scheduling; reverse scheduling from due date is limited.'
    },
    {
      name: 'Multi-step routings with resource constraints',
      rmdb: true,
      competitor: 'partial',
      note: 'E2 supports routings, but constraint enforcement in scheduling is limited.'
    },
    {
      name: 'Bottleneck heat maps and workcenter analytics',
      rmdb: true,
      competitor: false
    },
    {
      name: 'Live embedded Excel views',
      rmdb: true,
      competitor: false
    },
    {
      name: 'Job quoting and estimating',
      rmdb: false,
      competitor: true,
      note: 'E2 is well-regarded for job quoting. RMDB is scheduling-only and pairs with your quoting system.'
    },
    {
      name: 'Job costing and time tracking',
      rmdb: 'partial',
      competitor: true,
      note: 'RMDB tracks production time; detailed job costing is handled by your ERP or accounting system.'
    },
    {
      name: 'Purchase orders and inventory',
      rmdb: 'partial',
      competitor: true
    },
    {
      name: 'Shipping and invoicing',
      rmdb: false,
      competitor: true
    },
    {
      name: 'ERP integration (QuickBooks, Sage, Dynamics, Epicor)',
      rmdb: true,
      competitor: 'partial',
      note: 'E2 integrates with QuickBooks primarily. RMDB integrates broadly with any ERP or accounting system.'
    },
    {
      name: 'On-premise / self-hosted option',
      rmdb: true,
      competitor: true
    },
    {
      name: 'Pricing model',
      rmdb: 'One-time license',
      competitor: 'Subscription (~$200–$400/user/month)'
    },
    {
      name: 'Implementation timeline',
      rmdb: '5 days',
      competitor: '4–12 weeks'
    },
    {
      name: 'Best for company size',
      rmdb: '10–500 employees',
      competitor: '5–100 employees'
    }
  ],
  pricing: {
    rmdbPrice: 'From $5,000',
    rmdbModel: 'One-time license · optional annual support contract · no per-user fees',
    competitorPrice: '~$200–$400/user/month',
    competitorModel:
      'Per-user monthly subscription · additional modules billed separately',
    summary:
      'E2 ShopTech has moved to subscription pricing, which adds up quickly for job shops with multiple users. A 5-user shop pays $12,000–$24,000 per year, every year, with no equity in the software. RMDB is a one-time license starting at $5,000 — most job shops land between $10,000 and $20,000 all-in and own the software outright. If your shop runs for 3+ years (which most do), the total cost of ownership comparison is not close.'
  },
  rmdbWinsAt: [
    'True finite-capacity scheduling — the core gap in E2 that forces schedulers back to spreadsheets.',
    'Drag-and-drop Gantt with constraint-aware reschedules when rush jobs arrive or machines go down.',
    'Setup time and changeover sequencing — critical for machine shops where setup is a significant portion of job cost.',
    'Bottleneck heat maps that show exactly where your floor is overloaded.',
    'One-time licensing — no per-user monthly fees that grow with headcount.',
    'Broader ERP integration — works alongside any accounting or ERP system, not just QuickBooks.',
    'Pure scheduling focus — designed for schedulers, not a generalist job shop ERP with a scheduling tab.'
  ],
  competitorWinsAt: [
    'All-in-one job shop ERP — quoting, estimating, job costing, purchasing, shipping, and invoicing in one product.',
    'Strong job quoting and estimating workflows that schedulers and estimators share.',
    'Better fit for very small shops (5–20 employees) that need a single inexpensive system covering everything.',
    'Established user community and large install base in metal fab and machine shops.',
    'Simpler onboarding for shops that have never used production software before.'
  ],
  rmdbBestFor:
    'You already have (or want to keep) E2 or another system for quoting and job costing, and your real problem is the production schedule. Your workcenters get overloaded, rush jobs disrupt the queue, and you spend hours in spreadsheets trying to figure out what to run next. You need a Gantt that enforces constraints, models setup times, and updates in real time when priorities change.',
  competitorBestFor:
    'You are a small job shop (under 50 employees) that needs one system to handle everything from quoting to shipping and does not need deep finite-capacity scheduling. Your schedule is relatively simple, you run a consistent queue, and you want a single subscription that covers more ground than a dedicated scheduling tool.',
  migrationSteps: [
    {
      title: 'Choose augment or replace',
      description:
        'The most common path is to keep E2 for quoting, job costing, and purchasing while adding RMDB for finite-capacity scheduling. The two integrate cleanly — open work orders and routings flow from E2 into RMDB, and schedule results flow back. Some shops replace E2 scheduling entirely. We help you decide before any data moves.'
    },
    {
      title: 'Export work centers, routings, and open jobs from E2',
      description:
        'E2 ShopTech supports CSV export for work centers, operations, routings, and open work orders. We map these to RMDB entities — a process that typically takes one to two days. Existing E2 job data imports cleanly; no manual re-entry.'
    },
    {
      title: 'Add finite capacity to your routings',
      description:
        'E2 routings are built for tracking, not for constraint-based scheduling. We rebuild them in RMDB with actual setup times, resource capacity limits, and shift calendars. This is the step that turns a schedule view into a finite-capacity engine — and where schedulers first see the difference.'
    },
    {
      title: 'Connect RMDB to E2 (and your accounting system)',
      description:
        'If you are keeping E2, we wire RMDB to pull new work orders as they are created and push schedule dates back so E2 and RMDB stay in sync. If you are replacing E2, we connect RMDB directly to QuickBooks or whatever accounting system you use for invoicing and job costing.'
    },
    {
      title: 'Train schedulers and go live in 5 days',
      description:
        'Standard 5-Day Implementation Framework — by the end of day five your schedulers are running live finite-capacity schedules in RMDB, and the floor has a sequence it can actually trust.'
    }
  ],
  faqs: [
    {
      question: 'Does E2 Shop System have finite-capacity scheduling?',
      answer:
        'E2 ShopTech includes scheduling features, but they default to infinite capacity — workcenters can be over-scheduled without the system flagging the overload. There is no drag-and-drop Gantt with constraint enforcement, and setup-time sequencing is not modeled. Schedulers who need true finite-capacity typically supplement E2 with a dedicated APS tool like RMDB or fall back to spreadsheets.'
    },
    {
      question: 'Can I keep E2 and just add RMDB for scheduling?',
      answer:
        'Yes — this is the most common path. RMDB integrates with E2 ShopTech to pull open work orders and routings, run a finite-capacity schedule, and push schedule dates back into E2. You keep E2 for quoting, job costing, and purchasing while RMDB handles the scheduling depth E2 does not provide.'
    },
    {
      question: 'Why move from E2 scheduling to RMDB?',
      answer:
        'The most common triggers are: workcenters getting overloaded with no warning, rush jobs causing chaos that takes hours to manually re-sequence, and the schedule living in a spreadsheet because E2 cannot answer "what if I move this job?" These are exactly the problems RMDB is built to solve — finite capacity, drag-and-drop Gantt, setup time modeling, and real-time what-if analysis.'
    },
    {
      question: 'Is RMDB cheaper than E2 Shop System?',
      answer:
        'For most shops that have been running E2 for more than two to three years, yes. E2 is now subscription-based at roughly $200–$400 per user per month. A 5-user shop pays $12,000–$24,000 per year, forever. RMDB is a one-time license starting at $5,000 — most job shops land between $10,000 and $20,000 all-in and own the software outright with no ongoing per-user fees.'
    },
    {
      question: 'How long does RMDB take to implement compared to E2?',
      answer:
        'RMDB uses a 5-Day Implementation Framework — most job shops have a live finite-capacity schedule running before the end of week one. E2 implementations typically take 4 to 12 weeks depending on customization and data migration scope.'
    },
    {
      question: 'What ERP or accounting systems does RMDB integrate with?',
      answer:
        'RMDB integrates with QuickBooks, Sage, Microsoft Dynamics, Epicor, Epicor JobBOSS, SAP, and virtually any ERP or accounting system via API or file-based exchange. E2 ShopTech integrates primarily with QuickBooks. If your accounting system is not QuickBooks, RMDB likely gives you broader integration options.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ComparisonPage data={data} />;
}
