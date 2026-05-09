import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Machine Scheduling Excel Template (2026) — Workcenter & CNC Load Planning',
  description:
    'Download a free machine scheduling Excel template for workcenter load planning, CNC capacity tracking, and job sequencing — with a clear upgrade path when multi-constraint sequencing grows beyond Excel.',
  path: '/excel-templates/machine-scheduling',
  keywords:
    'machine scheduling excel template, equipment scheduling excel, machine shop scheduling spreadsheet, CNC machine scheduling excel, workcenter scheduling excel template, machine loading template excel, capacity scheduling excel'
});

const data: ExcelTemplatePageData = {
  slug: 'machine-scheduling',
  h1: 'Free Machine Scheduling Excel Template',
  subtitle:
    'A practical Excel workbook for assigning jobs to specific machines and workcenters, balancing load across CNC equipment, and sequencing operations — built for machine shops, metal fabricators, and discrete manufacturers running multi-machine floors.',
  tldr:
    'A working machine scheduling Excel template plus a free 30-day trial of Resource Manager for Excel (RMX) — the tool machine shops upgrade to when job sequencing across multiple workcenters outgrows what a static spreadsheet can manage.',
  introParagraphs: [
    'In a machine shop or discrete manufacturing environment, scheduling is not about when — it is about where. The question is never just "when will this job ship?" It is "which machine will run it, in what sequence relative to other jobs, accounting for setup time and current load?" A production schedule that does not answer the "which machine" question is a wishlist, not a plan. The result of wishlist scheduling is familiar to every shop floor supervisor: hot jobs jumping the queue, spindles sitting idle while setups stack up, and promised delivery dates that slip by a day at a time until the customer calls.',
    'Machine scheduling at the workcenter level requires you to know four things simultaneously: what jobs are in queue, which machines can run each job (routing), how long each setup and run will take, and what the current load looks like on each machine through the planning horizon. A well-built Excel template can hold all four of those datasets and give you a Gantt-style view of the resulting schedule for a shop with up to 10–15 machines and 50–100 open jobs. Beyond that, the manual effort to keep the data current starts to exceed the value of the schedule itself.',
    'This template is designed for the machine shop or CNC job shop that has outgrown writing jobs on a whiteboard but is not yet ready to justify the cost and implementation time of a full APS (Advanced Planning and Scheduling) system. It gives you a structured, formula-driven workcenter loading view that you can maintain in 30–45 minutes per day and use to make real routing and sequencing decisions.'
  ],
  whatsInside: [
    {
      title: 'Machine and workcenter master list',
      description:
        'Define every machine or workcenter on your floor — CNC mills, lathes, grinders, inspection stations, or any resource that can be a bottleneck. Each entry includes shift hours, setup factor, and allowed job families so the routing logic knows what can run where.'
    },
    {
      title: 'Job queue and routing table',
      description:
        'List open jobs with their operation sequence, required workcenter, estimated setup time, and estimated run hours. The template supports multi-operation jobs where a part must visit multiple workcenters in sequence — the most common scenario in job shops and CNC environments.'
    },
    {
      title: 'Workcenter load heat map',
      description:
        'A week-by-week view of hours loaded versus available hours per machine. Red cells show weeks where a machine is over-committed; amber cells flag weeks approaching capacity. The heat map updates automatically when you add or move jobs.'
    },
    {
      title: 'Job sequencing worksheet',
      description:
        'For each workcenter, lists all queued jobs in priority order with start date, due date, estimated completion, and slack time. Sorting by slack time surfaces the jobs most at risk of missing their due dates — the ones that need to move to the front of the queue.'
    },
    {
      title: 'Setup time tracker',
      description:
        'Captures planned setup hours separately from run hours for each operation. Critical for CNC environments where a 4-hour setup before a 2-hour run is common — ignoring setup in your load model is the most frequent cause of capacity overcommitment in job shops.'
    },
    {
      title: 'Schedule adherence log',
      description:
        'A simple daily tracking sheet for actual completion times versus scheduled completion times per job per operation. After 4–6 weeks, the log gives you reliable data on which machines and which job types consistently slip — the input you need to improve your estimating accuracy.'
    }
  ],
  howToUseSteps: [
    {
      title: 'Build your machine master list',
      description:
        'On the Machine Master tab, enter every machine or workcenter that can be a scheduling constraint. Be specific: "CNC Mill — Haas VF-4" and "CNC Mill — Haas VF-2" are different resources if they have different envelopes or tooling. Grouping them as "CNC Mill" when they are not interchangeable creates a scheduling model that does not reflect reality. Also enter each machine\'s available shift hours per week and a realistic utilization factor (typically 75–85% to account for unplanned stops).'
    },
    {
      title: 'Enter your open job queue with routings',
      description:
        'On the Job Queue tab, list every open work order. For each job, enter the operation sequence — which workcenters it must visit in order. For each operation, enter the estimated setup hours and the estimated run hours (usually derived from your routing sheet or historical actuals). If your shop uses standard routings for repeat part families, create a routing template tab and copy the standard times forward rather than re-entering them each time.'
    },
    {
      title: 'Assign jobs to machines and set priority sequence',
      description:
        'On the Sequencing tab, assign each operation to a specific machine (or let the template flag which machines are eligible based on your routing rules). Then set the priority order within each machine queue. A simple three-level priority — hot/standard/can-wait — is enough for most shops. The key is that priority is explicit and agreed upon, not left to individual operators to interpret differently every morning.'
    },
    {
      title: 'Review the load heat map for over-committed weeks',
      description:
        'Open the Heat Map tab. Every red cell represents a workcenter that is over-committed in that week. Your options are: move a lower-priority job to a later week, move a job to an alternate capable machine, add overtime or an extra shift, or have an honest conversation with the customer about the due date. The heat map makes that conversation fact-based — you can show exactly why the date is at risk instead of asking the customer to trust your gut.'
    },
    {
      title: 'Update the schedule daily with actuals',
      description:
        'At the start of each day, update job completion status on the Job Queue tab. Any job that completed ahead of schedule frees capacity; any job that ran long pushes everything behind it. The load heat map recalculates automatically. In a dynamic job shop, a schedule that is not updated daily is worse than no schedule at all — it gives you false confidence that you are on track when you are not.'
    }
  ],
  whenToUpgrade: [
    'You manage more than 15 machines and the daily update process takes longer than the value it provides — the spreadsheet is consuming more time than the schedule it produces is saving',
    'Jobs have more than 3 or 4 operations and the multi-operation sequencing logic in Excel produces constraint violations (a job scheduled at Machine B before it finishes at Machine A)',
    'You need sequence-dependent setup time — where the setup duration depends on which job ran before it, not just which job is running next — which Excel cannot model without custom VBA and significant maintenance overhead',
    'Multiple planners need to update the schedule simultaneously and file-locking conflicts in the shared workbook are causing data loss or version confusion',
    'You have work orders arriving and completing continuously and the schedule needs to re-optimize itself around the current state of the floor rather than requiring manual resequencing every time a job completes or a machine goes down',
    'Customer ATP (Available to Promise) responses require a real finite-capacity answer within 30 minutes of the quote request, and your Excel schedule takes half a day to update for a new job',
    'You need to model alternate routings — where a job can run on Machine A or Machine B depending on load — and want the scheduler to select the better option automatically',
    'Your shop is growing and you are hiring planners or schedulers to manage work that a proper APS tool would handle automatically with no additional headcount'
  ],
  faqs: [
    {
      question: 'Is this machine scheduling Excel template really free?',
      answer:
        'Yes. The template is included with the free 30-day trial of Resource Manager for Excel (RMX) from User Solutions — no credit card required. RMX extends this template with finite-capacity scheduling logic, alternate routing support, and automatic re-sequencing, all within the Excel environment your team already uses.'
    },
    {
      question: 'Can this template handle CNC shops with sequence-dependent setups?',
      answer:
        'The template includes a setup time field per operation and supports different setup estimates for different job families on the same machine. True sequence-dependent setup matrices — where setup time from Job A to Job B differs from Job B to Job A — require custom VBA or a dedicated APS tool. RMX handles sequence-dependent setups natively with a changeover matrix that the scheduling engine reads automatically.'
    },
    {
      question: 'What is the difference between machine scheduling and production scheduling?',
      answer:
        'Production scheduling is the process of determining when jobs will be completed. Machine scheduling is the more granular process of determining which specific machine each operation will run on, in what sequence, and when each machine will be set up and running. Machine scheduling is a prerequisite for a realistic production schedule — you cannot promise a delivery date if you do not know which machine has the capacity to run the job and when.'
    },
    {
      question: 'How do I handle breakdowns and unplanned downtime in the schedule?',
      answer:
        'When a machine goes down, open the Machine Master tab, reduce its available hours for the affected days, and check the heat map for the downstream impact. Jobs that were assigned to the down machine need to be manually reassigned to alternate capable machines or rescheduled to the next available slot. This manual re-routing is one of the main limitations of an Excel-based schedule — a real APS system re-optimizes the entire schedule automatically when a machine goes offline.'
    },
    {
      question: 'Can I use this template for a shop that runs both machining and fabrication operations?',
      answer:
        'Yes. The template is workcenter-agnostic — a workcenter can be a CNC machine, a weld cell, a paint booth, or an inspection station. As long as you can define the resource, the available hours, and the operations that flow through it, the template handles mixed-operation environments. The routing table supports up to 8 sequential operations per job, which covers most fabrication and machining combinations.'
    },
    {
      question: 'When should I consider RMDB instead of RMX for machine scheduling?',
      answer:
        'RMX (Resource Manager for Excel) is the right choice if your team wants to stay in an Excel-based environment and your shop has up to 50 machines and a few hundred concurrent work orders. RMDB is User Solutions\' standalone production scheduling software — better suited for larger operations, multi-plant environments, or shops that need ERP integration (SAP, Epicor, Sage, Oracle) where data is flowing in from an external system rather than being entered manually.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/production-schedule',
      title: 'Free Production Schedule Excel Template',
      description:
        'The higher-level companion to machine scheduling — map jobs to weeks before drilling down to machine-level assignment and sequencing.'
    },
    {
      href: '/excel-templates/capacity-planning',
      title: 'Free Capacity Planning Excel Template',
      description:
        'Know your available workcenter hours before you commit them to jobs — capacity planning is the prerequisite to machine scheduling.'
    },
    {
      href: '/excel-templates',
      title: 'All free Excel tools for manufacturers',
      description:
        'Browse the full library of Excel-based scheduling, planning, quality, and operations templates from User Solutions.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ExcelTemplatePage data={data} />;
}
