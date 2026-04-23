import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Capacity Planning Excel Template (2026) — For Manufacturers',
  description:
    'Download a free capacity planning Excel template built for manufacturers. Match available work-center hours against demand, identify bottlenecks, and plan headcount with formulas that actually work.',
  path: '/excel-templates/capacity-planning',
  keywords:
    'capacity planning excel template, capacity planning template excel free, manufacturing capacity planning excel, work center capacity excel, capacity load excel template, resource capacity planning template'
});

const data: ExcelTemplatePageData = {
  slug: 'capacity-planning',
  h1: 'Free Capacity Planning Excel Template',
  subtitle:
    'A practical Excel workbook for matching work-center capacity against forecasted demand — built by manufacturers, used to find bottlenecks before they break the schedule.',
  tldr:
    'A working capacity planning Excel template plus a 30-day trial of Resource Manager for Excel (RMX) — the same tool manufacturers use when their static capacity model can no longer keep up with weekly demand changes.',
  introParagraphs: [
    'Capacity planning is the most underrated discipline in manufacturing. Every operations manager knows that running over 100% capacity is a disaster — but very few have a clear, current answer to "what is our actual available capacity next month, and how does it compare to our committed orders?" The result is the same in shops everywhere: customer due dates get committed without checking, work centers get overloaded, expedites pile up, and the schedule becomes a daily firefight.',
    'A capacity planning Excel template will not solve all of that. But it will give you a clear, current picture of demand vs available hours per work center per week — which is the single most important input to every other production decision you make. If you cannot see your capacity load, you cannot manage your bottleneck. And if you cannot manage your bottleneck, you cannot improve throughput.',
    'This page gives you a free template that does the math correctly: available hours by work center, by week, against the demand from your open work orders. It also explains the warning signs that mean your business has outgrown a static capacity model — and what to do when that happens.'
  ],
  whatsInside: [
    {
      title: 'Work-center master list',
      description:
        'Every machine, work cell, or skilled-operator group that limits your throughput. Capacity calculations roll up from this sheet.'
    },
    {
      title: 'Available hours calculator',
      description:
        'Per work center, per week — accounting for shift patterns, planned downtime, holidays, and an OEE adjustment so the numbers reflect reality.'
    },
    {
      title: 'Demand load sheet',
      description:
        'Per work order, hours required by work center — populated from your work order list or routing table.'
    },
    {
      title: 'Load vs capacity comparison',
      description:
        'Side-by-side weekly view showing where you are over capacity (red), under capacity (green), and at risk (amber).'
    },
    {
      title: 'Bottleneck identification report',
      description:
        'Sorts work centers by sustained utilization to surface the constraint resource — the one your throughput is actually limited by.'
    },
    {
      title: 'Headcount and overtime planner',
      description:
        'Quick what-if for adding shifts, hiring, or overtime — shows the capacity uplift before you commit to the cost.'
    }
  ],
  howToUseSteps: [
    {
      title: 'List your work centers',
      description:
        'On the Work Centers tab, enter every resource that limits throughput. Be ruthless about what counts — if it never gets fully loaded, it is not a bottleneck and not worth tracking here.'
    },
    {
      title: 'Set realistic available hours',
      description:
        'For each work center, enter shift hours, days per week, planned downtime, and a realistic OEE percentage (most manufacturers should use 65–75%, not 100%). This produces the "available hours" number every other tab depends on.'
    },
    {
      title: 'Load demand from your work orders',
      description:
        'On the Demand tab, list each open work order with its routing — which work centers it touches and how many hours each operation needs. The load sheet sums these by week.'
    },
    {
      title: 'Review the load-vs-capacity heat map',
      description:
        'Open the Heat Map tab. Red cells are weeks where demand exceeds available capacity — those are the weeks you cannot deliver on time without action. Amber is a warning. Green is healthy.'
    },
    {
      title: 'Plan corrective action',
      description:
        'For every red week, decide: shift work to an alternate work center, expedite a different job, add overtime, push out a customer due date, or accept the slip. Update the demand tab and re-check until the heat map is clean.'
    }
  ],
  whenToUpgrade: [
    'Your capacity picture is outdated within 24 hours of building it because demand changes daily',
    'You manage more than 8 work centers and the manual updates are eating an hour a day',
    'You need to model finite capacity (real constraints) instead of infinite (theoretical hours)',
    'You want to model setup times, sequence-dependent changeovers, or operator skill matrices',
    'Multiple planners need to edit the model simultaneously',
    'You need to integrate capacity data with your ERP system instead of re-keying it weekly',
    'You manage multi-plant operations with shared resources and inter-plant transfers',
    'Customers expect 24-hour ATP (available-to-promise) responses and your spreadsheet cannot answer in 24 hours'
  ],
  faqs: [
    {
      question: 'Is this capacity planning template really free?',
      answer:
        'Yes. The template ships with the free 30-day trial of Resource Manager for Excel (RMX) from User Solutions. No credit card, no obligation. Many small manufacturers use the trial indefinitely as a static capacity planning tool.'
    },
    {
      question: 'What is the difference between rough-cut and finite capacity planning?',
      answer:
        'Rough-cut capacity planning uses average hours and infinite-capacity assumptions to give you a directional answer in minutes. Finite capacity planning uses real shift calendars, setup times, and resource constraints to give you a schedulable answer in seconds. This template is rough-cut by default; RMX adds finite-capacity logic on top of the same workbook.'
    },
    {
      question: 'Should I use OEE in my capacity calculation?',
      answer:
        'Yes — and the most common mistake we see is people NOT applying it. If you assume 100% of theoretical hours are available, you will commit to schedules you cannot deliver. A realistic OEE for most discrete manufacturers is 60–75%; the world-class number is around 85%.'
    },
    {
      question: 'Can I model multiple shifts in this template?',
      answer:
        'Yes. The Available Hours calculator supports up to 3 shifts per work center per day, plus weekend operations. Set shift hours and days-per-week per work center; the template handles the math.'
    },
    {
      question: 'What if my work centers share operators?',
      answer:
        'A static template cannot handle shared-operator constraints cleanly — that is one of the warning signs you have outgrown rough-cut planning. RMX models operator skill matrices and resource sharing properly.'
    },
    {
      question: 'How does this template differ from MRP capacity planning?',
      answer:
        'MRP systems (like SAP, Epicor, Sage) generate capacity requirements from BOMs and routings, but most use infinite-capacity assumptions in the planning run. They tell you how much capacity you need, not whether you have it. This template — and RMX/RMDB — close that gap by enforcing real finite capacity.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/production-schedule',
      title: 'Free Production Schedule Excel Template',
      description:
        'The downstream output of capacity planning — turn available hours into a real Gantt-style production schedule.'
    },
    {
      href: '/excel-templates/master-production-schedule',
      title: 'Free Master Production Schedule (MPS) Template',
      description:
        'Higher-level planning that connects sales forecasts to capacity demand on a 6–18 month horizon.'
    },
    {
      href: '/excel-templates',
      title: 'All free Excel tools for manufacturers',
      description:
        'Browse the full library of Excel-based scheduling, planning, quality, and operations apps from User Solutions.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ExcelTemplatePage data={data} />;
}
