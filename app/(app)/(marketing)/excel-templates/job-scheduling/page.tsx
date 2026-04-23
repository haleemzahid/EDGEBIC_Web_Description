import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Job Scheduling Excel Template (2026) — For Job Shops',
  description:
    'Download a free job scheduling Excel template built for high-mix job shops. Priority sequencing, machine assignment, due-date tracking, and daily reschedule workflow.',
  path: '/excel-templates/job-scheduling',
  keywords:
    'job scheduling excel template, job shop scheduling spreadsheet, free job scheduling template, manufacturing job scheduler, job shop excel template, job sequencing template, machine scheduling excel, high mix job scheduling template'
});

const data: ExcelTemplatePageData = {
  slug: 'job-scheduling',
  h1: 'Free Job Scheduling Excel Template',
  subtitle:
    'A practical Excel template for high-mix job shops. Priority sequencing, machine assignment, due-date tracking, and a daily reschedule workflow — built by and for job shops.',
  tldr:
    'A working job scheduling Excel template plus a 30-day trial of Resource Manager for Excel (RMX) — the Excel-based scheduling tool that finite-capacity-schedules what spreadsheet templates cannot.',
  introParagraphs: [
    'Job scheduling in a high-mix, low-volume shop is one of the hardest problems in manufacturing. Every job is different. Customer expedites arrive daily. Machines go down. Operators call out. And the sequence you published yesterday is wrong by 9 AM today. A job scheduling template cannot solve all of that — but it can give you a clear picture of what you committed to, what is running now, and which jobs are at risk of being late.',
    'Most Excel job scheduling templates are built for project management use cases and miss what matters for a job shop: priority sequencing across machines, routing operations, setup time considerations, and a daily reschedule workflow that does not take 90 minutes to update. This template was built specifically for job shops, by people who have run them.',
    'This is the starting point. When your job count grows past 30–50 active work orders, or your customer expedite frequency makes manual rescheduling untenable, you outgrow static templates. That is when shops move to RMX (interactive Gantt inside Excel) or RMDB (full finite-capacity scheduler). But until that moment, this template does the job.'
  ],
  whatsInside: [
    {
      title: 'Job list with priority ranking',
      description:
        'Job number, customer, due date, priority, and routing. Sort by priority to get the current work sequence.'
    },
    {
      title: 'Machine / work-center assignment',
      description:
        'Each routing operation is assigned to a specific machine with start and complete times.'
    },
    {
      title: 'Due-date tracker with risk flag',
      description:
        'Compares planned completion against customer due date and flags jobs at risk of slipping.'
    },
    {
      title: 'Daily reschedule worksheet',
      description:
        'A separate tab for daily updates — move jobs between machines, reorder the sequence, and push out due dates without breaking the underlying data.'
    },
    {
      title: 'Setup and run time breakdown',
      description:
        'Each operation shows setup (often the dominant cost in a job shop) separately from run time so planners can group similar jobs.'
    },
    {
      title: 'Machine load visualization',
      description:
        'Bar chart showing load percentage per machine so you can see overloaded resources at a glance.'
    }
  ],
  howToUseSteps: [
    {
      title: 'List your machines',
      description:
        'On the Machines tab, enter every machine or work cell that runs jobs. Include capacity per shift and availability.'
    },
    {
      title: 'Enter your open jobs',
      description:
        'On the Jobs tab, enter each work order: job number, customer, quantity, due date, priority, and routing operations.'
    },
    {
      title: 'Assign operations to machines',
      description:
        'For each operation, pick a machine and enter setup and run time. The template sequences in priority order by default.'
    },
    {
      title: 'Review the schedule and risk flags',
      description:
        'The Schedule tab shows each machine with its sequenced jobs. The Risk tab flags any job whose planned completion exceeds its due date.'
    },
    {
      title: 'Run the daily reschedule',
      description:
        'Each morning, update job status, add new customer orders, and re-sort by priority. The schedule and risk tabs recalculate automatically.'
    }
  ],
  whenToUpgrade: [
    'You manage more than 30 concurrent jobs or more than 8 machines',
    'Daily rescheduling takes more than 30 minutes',
    'Customer expedites force you to rebuild the schedule by hand',
    'You need finite-capacity logic to prevent accidental double-booking',
    'Setup time grouping needs to happen automatically, not manually',
    'You need drag-and-drop Gantt interactivity',
    'Multiple planners need to edit the schedule concurrently',
    'You need ERP integration for job release and completion data'
  ],
  faqs: [
    {
      question: 'Is this job scheduling template really free?',
      answer:
        'Yes. The template ships with the free 30-day trial of Resource Manager for Excel (RMX) from User Solutions. No credit card required.'
    },
    {
      question: 'How is job scheduling different from production scheduling?',
      answer:
        'Job scheduling is a subset of production scheduling specific to high-mix, low-volume environments (job shops) where every work order is unique. Production scheduling is the broader discipline that also covers repetitive and batch manufacturing.'
    },
    {
      question: 'Can the template handle sequence-dependent setup time?',
      answer:
        'Partially. The template supports setup time per operation but not full sequence-dependent setup matrices. If your setup time changes significantly based on which job ran before (e.g. color changes, fixture swaps), you need a real finite-capacity scheduler — this is exactly what RMDB does.'
    },
    {
      question: 'What scheduling method does the template use?',
      answer:
        'The default method is priority-based sequencing — jobs are ordered by their priority field, then sequenced on machines in that order. You can override manually. For more sophisticated methods (SPT, EDD, critical ratio, Johnson\'s rule), a dedicated scheduling engine is needed.'
    },
    {
      question: 'How does the template handle alternate machines?',
      answer:
        'Each operation is assigned to one specific machine in the template. For alternate machine capability (where an operation can run on any of several qualifying machines), you need scheduling software with alternate routing support.'
    },
    {
      question: 'Does the template work for CNC machine shops specifically?',
      answer:
        'Yes — job scheduling is the dominant use case for CNC shops, and the template was originally designed with CNC shops in mind. Setup time modeling, priority sequencing, and multi-machine assignment are all relevant for CNC operations.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/production-schedule',
      title: 'Free Production Schedule Excel Template',
      description:
        'The broader production scheduling template — includes capacity planning, load reporting, and on-time delivery tracking.'
    },
    {
      href: '/excel-templates/work-order',
      title: 'Free Work Order Excel Template',
      description:
        'The individual job detail template — pair with job scheduling for full work-order-to-schedule workflow.'
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
