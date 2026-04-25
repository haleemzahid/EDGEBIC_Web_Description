import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Production Tracking Excel Template (2026) — Work Order & Job Status',
  description:
    'Download a free production tracking Excel template to monitor work orders, job status, and shop-floor progress in real time — with an honest upgrade path for growing shops.',
  path: '/excel-templates/production-tracking',
  keywords:
    'production tracking excel template, work order tracking excel, job tracking excel template manufacturing, production progress tracker excel, manufacturing job tracker spreadsheet, shop floor tracking excel template, work in progress tracking excel'
});

const data: ExcelTemplatePageData = {
  slug: 'production-tracking',
  h1: 'Free Production Tracking Excel Template — Work Order & Job Status',
  subtitle:
    'A shop-floor production tracking workbook that monitors work orders, job-by-job progress through operations, WIP status, and on-time delivery outlook — all in one place for small job shops and make-to-order manufacturers.',
  tldr:
    'A working production tracking Excel template plus a 30-day trial of Resource Manager for Excel (RMX) — the scheduling and job-tracking tool that job shops move to when their spreadsheet tracker can no longer answer "where is job 1234 right now?"',
  introParagraphs: [
    'In a job shop or make-to-order environment, the most expensive question you can fail to answer is "where is that job right now?" When a customer calls asking for a status update and your answer is "let me check with the floor and call you back," you have a production tracking problem. When your production manager has to walk the floor three times a day to know what is running and what is stuck, you have a production tracking problem. When a job misses its ship date because it sat idle at a bottleneck workcenter and nobody noticed, you have a production tracking problem.',
    'Production tracking is the discipline of knowing, at any point in time, exactly where each open work order stands relative to its operation sequence, its scheduled completion, and its committed ship date. For small shops running 20 to 80 open jobs at a time, a well-structured Excel tracker is often sufficient. The template on this page gives you that structure: one row per work order, columns for each operation stage, status codes, date tracking, and an automatic on-time delivery flag that turns red when a job is in danger of missing its due date.',
    'The fundamental limit of any spreadsheet-based job tracker is that it is only as current as the last person who updated it. Unlike a connected shop-floor system that captures job status as operators clock in and out of operations, an Excel tracker requires someone to deliberately open the file and change a cell. In a busy shop, that manual update step is the first thing that gets skipped when the floor is on fire. This template minimizes the update burden by requiring only two inputs per operation per job: a start date and a completion date. Everything else is calculated. But when your shop grows past 50 open jobs or jobs regularly move faster than updates happen, you need a tool that captures status at the source.'
  ],
  whatsInside: [
    {
      title: 'Work order register',
      description:
        'One row per open work order with job number, customer, part number, quantity ordered, quantity complete, release date, due date, and current status. Supports up to 500 concurrent open jobs before workbook performance degrades.'
    },
    {
      title: 'Operation routing tracker',
      description:
        'For each work order, track progress through up to 10 sequential operations (saw, turn, mill, drill, grind, weld, paint, inspect, pack, ship or whatever your routing sequence is). Each operation records planned hours, actual hours, planned completion, actual completion, and a status flag: not started, in progress, complete, or on hold.'
    },
    {
      title: 'WIP status dashboard',
      description:
        'Single-view summary of all open jobs grouped by their current operation. Immediately shows how many jobs are at each stage of production — so you can see at a glance that 12 jobs are waiting at the milling workcenter and 2 are stacked at inspection without walking the floor.'
    },
    {
      title: 'On-time delivery risk flag',
      description:
        'Automatic OTD risk calculation for each work order: based on operations remaining, average operation cycle time, and calendar days to due date, the template flags each job as On Track, At Risk, or Late. The At Risk and Late flags turn amber and red automatically — no manual assessment needed.'
    },
    {
      title: 'Job history log',
      description:
        'Closed jobs tab that captures all completed work orders with actual vs. planned hours, actual vs. planned cycle time, and late or on-time outcome. After 90 days of data, this tab becomes your most reliable source of actual capacity and lead time data for future quoting and scheduling.'
    },
    {
      title: 'Workcenter queue view',
      description:
        'Filtered view per workcenter showing which jobs are currently queued, ordered by due date priority. Designed to be printed and handed to a workcenter supervisor each morning as their priority list — a practical substitute for a formal dispatch list.'
    }
  ],
  howToUseSteps: [
    {
      title: 'Configure your operation routing sequence',
      description:
        'On the Setup tab, list your shop\'s standard operation sequence — the workcenter stops that most jobs flow through in order. Most job shops have 5-8 standard operations. Custom routings for unusual jobs can be entered directly in the work order rows without changing the setup.'
    },
    {
      title: 'Open a work order for each new job',
      description:
        'When a new job is released to the floor, add a row to the Work Orders tab. Enter job number, customer, part, quantity, release date, and due date. The on-time risk calculation starts immediately based on the remaining days to due date.'
    },
    {
      title: 'Update operation status as jobs progress',
      description:
        'As each operation begins, enter the start date and the operator or workcenter. When the operation completes, enter the completion date and actual hours. This two-entry-per-operation model is deliberately minimal — it is what keeps the tracker sustainable over weeks and months rather than getting abandoned.'
    },
    {
      title: 'Review the WIP dashboard at the start of each day',
      description:
        'Each morning, open the WIP Dashboard tab. It shows at a glance how jobs are distributed across operations and which jobs are flagged At Risk or Late. Use this as the agenda for your daily production meeting instead of a floor walk. Problems that need attention are surfaced by the dashboard — not discovered by asking around.'
    },
    {
      title: 'Print workcenter queue views for floor supervisors',
      description:
        'At the start of each shift, filter the Workcenter Queue tab to a specific workcenter and print or display it on a shared monitor. The supervisor sees which jobs are queued, in due-date priority order, without needing to access the workbook. This closes the loop between the tracker and the floor without requiring every operator to interact with the spreadsheet.'
    }
  ],
  whenToUpgrade: [
    'You cannot answer "where is job 1234 right now?" in under 30 seconds without walking the floor or making a phone call — the tracker is not being updated fast enough to reflect reality',
    'Your shop has more than 50 open work orders at any given time and the single-workbook view is too long to navigate quickly when a customer calls for a status update',
    'Two or more people update the tracker concurrently and save conflicts or overwritten data are a recurring problem',
    'Jobs regularly change priority mid-production (hot jobs, expedited orders, customer changes) and manually re-sorting the tracker to reflect the new priority takes more than 20 minutes',
    'You need to know the actual available capacity at each workcenter before promising a new customer lead time, and the tracker cannot tell you that — only a scheduling system with capacity loaded can',
    'Your quoting team and your production team use separate systems, so quoted lead times are based on intuition rather than the actual current queue depth at each workcenter',
    'You are losing track of where materials are — which jobs have kits ready, which are waiting on parts — and the production tracker and the inventory tracker are two separate files that constantly drift out of sync',
    'End-of-month reporting requires manual aggregation from the tracker to a separate Excel summary that someone spends half a day building — the same data should generate the report automatically'
  ],
  faqs: [
    {
      question: 'Is this production tracking template really free?',
      answer:
        'Yes. The template ships with the free 30-day trial of Resource Manager for Excel (RMX). No credit card required. RMX adds finite-capacity scheduling, real workcenter queue management, and integrated material tracking on top of the job-status visibility the template provides.'
    },
    {
      question: 'What is the difference between production tracking and production scheduling?',
      answer:
        'Production scheduling is forward-looking: it assigns work orders to specific workcenters on specific days based on capacity, routing, and due dates. Production tracking is real-time: it captures where each job currently stands in its operation sequence compared to where it should be. Ideally, you do both — schedule first, then track actuals against the schedule. This template focuses on the tracking side. The companion Production Schedule template covers the scheduling side.'
    },
    {
      question: 'Can this template handle jobs with different routing sequences?',
      answer:
        'Yes. The template supports a standard routing sequence (configured on the Setup tab) that covers most jobs, plus free-form operation entry for jobs with non-standard routings. For shops where every job has a completely unique routing, the free-form approach works but requires more per-job setup time when opening new work orders.'
    },
    {
      question: 'How do I handle rework or operations that repeat?',
      answer:
        'For rework, the template includes a Rework flag column on the work order register. When a job is flagged for rework, it is automatically re-inserted into the WIP dashboard at the rework operation stage. For operations that legitimately repeat (e.g. grind → inspect → grind → inspect), the template supports duplicate operation entries per job — add a second row for the repeated operation with a suffix (Grind-1, Grind-2).'
    },
    {
      question: 'How many operations per job does the template support?',
      answer:
        'The standard template supports up to 10 sequential operations per work order. Most job shops have 5-8 standard operations, so this covers the majority of cases. For shops with longer operation sequences (e.g. aerospace or medical device manufacturers with 15+ operations per part), the template can be extended by adding columns, but at that point a dedicated shop floor control system is likely the more practical solution.'
    },
    {
      question: 'Can this template replace a full MES (Manufacturing Execution System)?',
      answer:
        'No, and it is not designed to. A full MES captures data automatically from machines, integrates with ERP, manages labor tracking at the operator level, and maintains a full audit trail. This template is a practical, low-cost starting point for shops that need basic job visibility without the implementation cost of a full MES. When your shop needs real-time machine data, operator-level time capture, or ERP integration, dedicated software is the right answer.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/work-order',
      title: 'Free Work Order Excel Template',
      description:
        'The individual work order document that initiates each job tracked in this template — includes routing, materials, and operation instructions for the floor.'
    },
    {
      href: '/excel-templates/production-schedule',
      title: 'Free Production Schedule Excel Template',
      description:
        'The forward-looking schedule that determines when each work order should be at each operation — the plan that production tracking measures actuals against.'
    },
    {
      href: '/excel-templates',
      title: 'All free Excel tools for manufacturers',
      description:
        'Browse the full library of Excel-based scheduling, planning, quality, and operations templates for small manufacturers.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ExcelTemplatePage data={data} />;
}
