import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Work Order Excel Template (2026) — For Manufacturers',
  description:
    'Download a free work order Excel template built for manufacturers. Track open jobs, materials, labor hours, routing operations, and completion status in one workbook.',
  path: '/excel-templates/work-order',
  keywords:
    'work order excel template, manufacturing work order template, work order tracking excel, free work order template, job work order template, work order form excel, production work order template'
});

const data: ExcelTemplatePageData = {
  slug: 'work-order',
  h1: 'Free Work Order Excel Template',
  subtitle:
    'A practical Excel work order template built for real manufacturing — with routing operations, material and labor tracking, and completion status in a single workbook.',
  tldr:
    'A working Excel work order template you can download and use today, paired with a 30-day trial of Resource Manager for Excel (RMX) — the same tool manufacturers move to when their work order spreadsheet starts breaking.',
  introParagraphs: [
    'A work order is the single most important document on a manufacturing floor. It is the instruction set that tells the shop "build this, using these materials, on these machines, by this date, for this customer." Every other production metric — on-time delivery, labor efficiency, material yield, scrap rate — is ultimately rolled up from work order data. When the work order system is rough, everything downstream is rough.',
    'Small and mid-size manufacturers almost always start with Excel work orders. It is universal, familiar, and flexible enough to handle the chaos of custom jobs. For a shop running 20–50 active work orders at a time, an Excel template is genuinely the right answer. The trap shows up later: once you are managing 100+ open jobs across multiple routings, Excel becomes a full-time maintenance job instead of a tool.',
    'This page gives you a free work order Excel template you can start using today. It covers what matters: job metadata, routing operations, material requirements, labor tracking, completion status, and a printable format the shop floor can actually use. It also explains the warning signs that mean you have outgrown it — and what to do next.'
  ],
  whatsInside: [
    {
      title: 'Work order header with job metadata',
      description:
        'Job number, customer, part number, quantity, due date, priority, and notes — the fields every work order needs.'
    },
    {
      title: 'Routing operations list',
      description:
        'Per work center: setup time, run time, operator required, and planned start/complete dates. Supports multi-stage jobs.'
    },
    {
      title: 'Material requirements (BOM)',
      description:
        'Per component: part number, quantity, unit, and on-hand status. Flags missing materials before the job hits the floor.'
    },
    {
      title: 'Labor tracking',
      description:
        'Per operation: hours logged, operator, date, and notes. Compare actual to planned to surface variances.'
    },
    {
      title: 'Completion and status tracker',
      description:
        'Status field (open / released / in progress / complete) with automatic color-coding. One glance tells you what is running.'
    },
    {
      title: 'Printable shop-floor format',
      description:
        'Page-ready layout so the work order can be printed for floor routing without reformatting.'
    }
  ],
  howToUseSteps: [
    {
      title: 'Open the template and review the sample work order',
      description:
        'Spend 5 minutes scrolling through the sample data to see how the header, routing, materials, and labor sections connect.'
    },
    {
      title: 'Copy the template for each new job',
      description:
        'Duplicate the worksheet for each new work order. Name the tab with your job number so it is easy to find in a multi-job workbook.'
    },
    {
      title: 'Fill in header metadata',
      description:
        'Customer, part number, quantity, due date, priority. This is the "what" and "when" every downstream decision depends on.'
    },
    {
      title: 'Add routing operations',
      description:
        'List every work center the job touches with setup and run time. The template auto-calculates total hours and estimated completion.'
    },
    {
      title: 'Release to the floor',
      description:
        'Print the work order or share the tab with the shop-floor lead. Update status and labor hours as operations complete.'
    }
  ],
  whenToUpgrade: [
    'You manage more than 50 active work orders simultaneously',
    'You spend more than an hour a day updating work order status',
    'Multiple people need to edit work orders concurrently and you are emailing copies',
    'You need finite-capacity scheduling across work orders (not just per-job tracking)',
    'Customer expedites force you to manually re-prioritize every open work order',
    'You cannot answer "what is the status of job 12345?" in under 10 seconds',
    'Routing changes force you to re-enter data across multiple work orders',
    'You need work order data to sync back to your ERP or accounting system'
  ],
  faqs: [
    {
      question: 'Is this work order template free?',
      answer:
        'Yes. The template comes with the free 30-day trial of Resource Manager for Excel (RMX) from User Solutions. No credit card required. Many small shops use the trial as a permanent free work order template.'
    },
    {
      question: 'What Excel versions does the template support?',
      answer:
        'Excel 2016 and later on Windows (including Microsoft 365). Some formulas use features that are not supported in Excel for Mac or Excel Online.'
    },
    {
      question: 'Can I use this for both make-to-order and make-to-stock manufacturing?',
      answer:
        'Yes. The template works for any manufacturing environment — custom job shops, batch producers, repetitive assembly. The routing and material sections adapt to your specific process.'
    },
    {
      question: 'How does this template handle multi-stage routings?',
      answer:
        'The routing section supports an arbitrary number of operations, each with its own work center, setup time, run time, and planned dates. For very complex routings (10+ operations), a dedicated scheduling tool like RMX becomes more efficient than manually maintaining the routing in every work order.'
    },
    {
      question: 'Can the template print to a shop-floor traveler format?',
      answer:
        'Yes. The layout is designed to print cleanly on letter-size paper with the header, routing, and materials sections visible on a single page. Print directly from Excel with no reformatting.'
    },
    {
      question: 'What is the difference between a work order template and a full MES?',
      answer:
        'A work order template tracks individual jobs. A full Manufacturing Execution System (MES) tracks all open jobs in real time, integrates with machines on the floor, and provides live dashboards. Excel work orders are fine until you need real-time visibility across 100+ jobs.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/bill-of-materials',
      title: 'Free Bill of Materials (BOM) Excel Template',
      description:
        'The material requirements side of the work order — multi-level BOM with cost rollup and where-used analysis.'
    },
    {
      href: '/excel-templates/production-schedule',
      title: 'Free Production Schedule Excel Template',
      description:
        'Schedule your work orders against real shop-floor capacity with a Gantt-style schedule and bottleneck identification.'
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
