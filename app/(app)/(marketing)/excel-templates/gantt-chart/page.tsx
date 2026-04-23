import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Manufacturing Gantt Chart Excel Template (2026)',
  description:
    'Download a free manufacturing Gantt chart Excel template with work-center swim lanes, dependency links, and progress tracking — built for production scheduling, not generic project management.',
  path: '/excel-templates/gantt-chart',
  keywords:
    'gantt chart excel manufacturing, manufacturing gantt chart template, production gantt chart excel, gantt chart template manufacturing, free gantt chart excel, shop floor gantt chart, work center gantt template, production schedule gantt excel'
});

const data: ExcelTemplatePageData = {
  slug: 'gantt-chart',
  h1: 'Free Manufacturing Gantt Chart Excel Template',
  subtitle:
    'A practical Gantt chart Excel template built for production scheduling — not generic project management. Work-center swim lanes, operation dependencies, and a printable shop-floor format.',
  tldr:
    'A working manufacturing Gantt chart Excel template plus a 30-day trial of Resource Manager for Excel (RMX) — the Excel-based scheduling tool with a real drag-and-drop Gantt for manufacturers who have outgrown their spreadsheet.',
  introParagraphs: [
    'The Gantt chart is the universal language of production scheduling. Show a planner a Gantt with work centers on the Y axis and time on the X axis, and they can tell you in 10 seconds whether the schedule is feasible, where the bottleneck is, and which job is at risk. No amount of spreadsheet numbers replaces the visual clarity of a well-built Gantt.',
    'Most free Gantt chart Excel templates are built for generic project management — tasks, dependencies, a timeline. Those templates miss what matters for manufacturing: work centers as swim lanes, operation-level sequencing, setup time as a visible block before the run, and a printable format the shop floor can actually use. A manufacturing Gantt is a different animal.',
    'This page gives you a free manufacturing Gantt chart Excel template built with exactly those requirements. It is a starting point. The moment your schedule needs drag-and-drop interactivity, constraint-aware reschedules, or real finite-capacity logic, you have outgrown what Excel can do — and that is when RMX (drag-and-drop Gantt that runs inside Excel) or RMDB (full finite-capacity APS) becomes the right upgrade.'
  ],
  whatsInside: [
    {
      title: 'Work-center swim lanes',
      description:
        'Rows are work centers (laser, mill, press, weld, assembly, pack), not generic tasks. The Y-axis matches how a production floor actually runs.'
    },
    {
      title: 'Operation bars with setup and run',
      description:
        'Each operation shows setup time (hatched) and run time (solid) so planners can see where setup dominates the cycle.'
    },
    {
      title: 'Job color-coding',
      description:
        'Every job gets its own color so a planner can trace a single work order across all work centers visually.'
    },
    {
      title: 'Dependency arrows between operations',
      description:
        'When operation 2 cannot start until operation 1 finishes (multi-stage routing), the dependency is drawn explicitly.'
    },
    {
      title: 'Progress tracking',
      description:
        'Actual vs planned overlay so you can see at a glance which jobs are on time, running ahead, or slipping.'
    },
    {
      title: 'Printable shop-floor format',
      description:
        'Page setup tuned for 11x17 or A3 printing so the Gantt can be posted on the shop floor as a physical schedule.'
    }
  ],
  howToUseSteps: [
    {
      title: 'List your work centers',
      description:
        'On the Work Centers tab, enter every resource you want on the Gantt — machines, work cells, skilled labor groups. These become the swim lanes.'
    },
    {
      title: 'Enter your jobs and routings',
      description:
        'On the Jobs tab, list each work order with its routing (which work centers it touches, in what order, for how long). Setup time and run time per operation.'
    },
    {
      title: 'Set job priorities and start dates',
      description:
        'Sort jobs by priority. The template will sequence operations on each work center in priority order by default.'
    },
    {
      title: 'Review the generated Gantt',
      description:
        'The Gantt tab auto-populates with colored bars for each operation on each work center. Scroll horizontally to see the full time window.'
    },
    {
      title: 'Export or print for the shop floor',
      description:
        'Print to 11x17 or export to PDF to post the Gantt where the shop floor can reference it. Update progress daily as operations complete.'
    }
  ],
  whenToUpgrade: [
    'You manage more than 30 concurrent jobs or more than 10 work centers',
    'Updating the Gantt takes more than 15 minutes per day',
    'You need drag-and-drop rescheduling to handle customer expedites in real time',
    'Your routings have sequence-dependent setup times the template cannot model',
    'You need what-if scenario analysis before committing a schedule change',
    'Multiple planners need to edit the schedule concurrently',
    'The Gantt needs to sync with your ERP or MES for actual completion data',
    'Bottleneck identification requires looking at load percentage, not just time'
  ],
  faqs: [
    {
      question: 'How is this different from a generic project management Gantt template?',
      answer:
        'Generic Gantts treat tasks as independent timeline items. A manufacturing Gantt has work-center swim lanes, multi-operation routings, setup time modeling, and sequence dependencies — and is designed to print to shop-floor-size paper. The difference is like the difference between a to-do list and a production schedule.'
    },
    {
      question: 'Does the template handle dependencies between operations?',
      answer:
        'Yes. When operation 2 of a job cannot start until operation 1 finishes, the template draws an arrow and prevents invalid manual overrides. This is the core of multi-stage routing scheduling.'
    },
    {
      question: 'Can I drag-and-drop to reschedule?',
      answer:
        'Not in the static Excel template — Excel does not support drag-and-drop on charts. If you need drag-and-drop Gantt interactivity, Resource Manager for Excel (RMX) is the upgrade that adds a real interactive Gantt inside Excel. That is the specific capability the template cannot replicate.'
    },
    {
      question: 'How many jobs can the template handle?',
      answer:
        'The template comfortably handles about 30 jobs across 10 work centers. Beyond that, the Gantt becomes visually crowded and the formulas slow down. Shops running 50+ concurrent jobs almost always outgrow the template within a few months.'
    },
    {
      question: 'Can the Gantt show finite vs infinite capacity?',
      answer:
        'No — the template assumes you manually sequence jobs to avoid overlap. A real finite-capacity scheduler like RMDB enforces this automatically and refuses to double-book resources. If your schedule is breaking because of accidental double-booking, you need real finite-capacity software.'
    },
    {
      question: 'Does the template work for make-to-order and repetitive manufacturing?',
      answer:
        'Yes for both. Make-to-order is the most natural fit (each job is a unique bar), but the template also works for repetitive manufacturing if you treat each scheduled run as a "job."'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/production-schedule',
      title: 'Free Production Schedule Excel Template',
      description:
        'The data-driven side of the Gantt — work orders, routings, and capacity in a schedulable format.'
    },
    {
      href: '/excel-templates/capacity-planning',
      title: 'Free Capacity Planning Excel Template',
      description:
        'Validate that your Gantt schedule fits available work-center capacity before committing.'
    },
    {
      href: '/excel-templates',
      title: 'All free Excel tools for manufacturers',
      description:
        'Browse the full library of Excel-based scheduling, planning, quality, and operations apps.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ExcelTemplatePage data={data} />;
}
