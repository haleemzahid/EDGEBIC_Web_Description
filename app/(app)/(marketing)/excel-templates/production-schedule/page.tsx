import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Production Schedule Excel Template (2026) — Built for Manufacturers',
  description:
    'Download a free production schedule Excel template designed for real manufacturing — with finite capacity logic, work order tracking, and a clear upgrade path when you outgrow it.',
  path: '/excel-templates/production-schedule',
  keywords:
    'production schedule excel template, free production schedule template excel, manufacturing schedule template excel, production scheduling spreadsheet, factory production schedule excel, weekly production schedule template, manufacturing schedule template'
});

const data: ExcelTemplatePageData = {
  slug: 'production-schedule',
  h1: 'Free Production Schedule Excel Template',
  subtitle:
    'A practical, manufacturer-built Excel template for scheduling work orders against real shop-floor capacity — plus a clear path forward when your spreadsheet starts breaking.',
  tldr:
    'A working Excel production schedule template you can use today, paired with a 30-day trial of Resource Manager for Excel (RMX) — the same tool used by GE, Cummins, BAE Systems, and 1,000+ other manufacturers when their spreadsheet schedule outgrew them.',
  introParagraphs: [
    'Almost every manufacturer starts scheduling production in Excel. It is the universal tool — every operations manager has it, every planner knows it, and you can build a workable schedule in an afternoon. For a small shop running 10–30 work orders a week, Excel is genuinely the right answer. There is no point installing a $30,000 ERP for a problem a spreadsheet can solve in 200 cells.',
    'But there is a hidden trap. Excel scheduling works beautifully right up until the moment it stops working — and the failure mode is brutal. One day you have a spreadsheet you trust. The next day your customer asks "can we move this order up?" and you spend 90 minutes recalculating downstream impacts by hand because the formulas do not understand resource constraints, setup times, or shift calendars. That is the moment you realize the spreadsheet was a fragile house of cards.',
    'This page gives you both halves of the answer. First, a free production schedule Excel template you can download and use immediately — no email gate, no signup. Second, an honest explanation of the warning signs that say "you are about to outgrow this," and what to do when that happens. We have been helping manufacturers cross that bridge since 1991.'
  ],
  whatsInside: [
    {
      title: 'Work order list with priority sorting',
      description:
        'Job number, customer, due date, quantity, routing, and a priority column that drives sequencing across all subsequent sheets.'
    },
    {
      title: 'Resource calendar by work center',
      description:
        'Available hours per work center per day, accounting for shift patterns, planned downtime, and holidays.'
    },
    {
      title: 'Daily and weekly Gantt views',
      description:
        'Visual representation of which jobs run on which resources and when — the heart of any production schedule.'
    },
    {
      title: 'Capacity load report',
      description:
        'Per-work-center utilization showing where you are overloaded and where you have slack — the bottleneck identifier.'
    },
    {
      title: 'On-time delivery tracker',
      description:
        'Compares scheduled completion vs customer due date to flag jobs that are at risk of being late before they actually slip.'
    },
    {
      title: 'Sample data and formulas pre-built',
      description:
        'A working example with 15 sample work orders so you can see how every cell connects before you replace the data with your own.'
    }
  ],
  howToUseSteps: [
    {
      title: 'Open the template and review the sample data',
      description:
        'Spend five minutes scrolling through the sample work orders, the resource calendar, and the Gantt sheet. Understand how the formulas connect them before you change anything.'
    },
    {
      title: 'Replace the work centers with your real ones',
      description:
        'On the Resources tab, list every machine, work cell, or skilled operator that limits your throughput. Set realistic available hours per shift — be honest, not aspirational.'
    },
    {
      title: 'Enter your open work orders',
      description:
        'On the Work Orders tab, replace the sample rows with your actual jobs. Job number, customer, quantity, due date, and which work center the job needs.'
    },
    {
      title: 'Set priorities and run the calculation',
      description:
        'Sort by priority (highest first). The Gantt and Capacity Load tabs will recalculate automatically. If you see red bars on the Capacity Load tab, you are over-committed — drop low-priority jobs or extend due dates.'
    },
    {
      title: 'Review on-time delivery and commit the schedule',
      description:
        'Check the OTD tracker tab. Any job marked at risk needs a real conversation with the customer or production manager before you publish the schedule to the floor.'
    }
  ],
  whenToUpgrade: [
    'You spend more than two hours per week maintaining the spreadsheet instead of running production',
    'Schedule changes ripple through formulas and break things you have to manually fix',
    'You have more than ~50 active work orders or more than 8 work centers',
    'Multiple people need to edit the schedule simultaneously and you are emailing copies around',
    'You cannot answer "what if I move this job to next Tuesday?" in under 30 seconds',
    'You discover overloads only after the schedule is already broken on the floor',
    'You need to track setup times, changeovers, or sequence-dependent durations',
    'You manage routings with multiple operations (more than just one work center per job)',
    'Customer expedites force you to rebuild the entire schedule by hand'
  ],
  faqs: [
    {
      question: 'Is this Excel template really free?',
      answer:
        'Yes. The template is included in the free 30-day trial of Resource Manager for Excel (RMX) from User Solutions. There is no credit card required and no obligation to purchase. Manufacturers have used the trial as a permanent free Excel template for 35+ years.'
    },
    {
      question: 'What versions of Excel does it work with?',
      answer:
        'The template works with Excel 2016 and later, including Microsoft 365. It runs on Windows desktop Excel; the macros are not supported in Excel for Mac or Excel Online.'
    },
    {
      question: 'How is this different from a generic production schedule template?',
      answer:
        'Generic templates give you formatting and a few formulas. This template is paired with RMX, a real finite-capacity scheduling engine that runs as an Excel add-in. So when your scheduling problem grows beyond what a static template can handle, you can switch on RMX features (drag-and-drop Gantt, finite-capacity sequencing, what-if analysis) without leaving Excel.'
    },
    {
      question: 'Can I use this template for job-shop or make-to-order manufacturing?',
      answer:
        'Yes. The template was originally built for job-shop and make-to-order environments where every work order is different. It also works for repetitive manufacturing, but high-mix low-volume shops get the most value because they have the hardest scheduling problems.'
    },
    {
      question: 'How big can my operation be before this template stops working?',
      answer:
        'Most manufacturers comfortably manage 30–50 active work orders and 5–10 work centers in the static template. Above that, you start spending more time maintaining the spreadsheet than running production — that is when most teams move to RMX or RMDB.'
    },
    {
      question: 'Do I have to give you my email to download?',
      answer:
        'No. You can download the template from our product downloads page directly. We do recommend providing an email so we can send you implementation tips and let you know when we release improved templates, but it is optional.'
    },
    {
      question: 'What is the difference between this template and full scheduling software?',
      answer:
        'A template is a static workbook. Full scheduling software (like RMX or RMDB) is a finite-capacity engine that enforces resource constraints, handles multi-step routings with setup times, supports drag-and-drop Gantt scheduling, runs what-if scenarios, and integrates with your ERP. The template gets you started; the software is what you grow into.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/capacity-planning',
      title: 'Free Capacity Planning Excel Template',
      description:
        'A workbook for matching available work-center capacity against forecasted demand — the upstream input to a good production schedule.'
    },
    {
      href: '/excel-templates/master-production-schedule',
      title: 'Free Master Production Schedule (MPS) Template',
      description:
        'A higher-level Excel template that drives MRP and connects sales forecasts to production runs.'
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
