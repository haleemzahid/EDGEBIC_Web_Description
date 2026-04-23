import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, FileSpreadsheet } from 'lucide-react';

import { NTClipboardExcelTemplates } from '@/components/marketing/sections/ntclipboard-excel-templates';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Excel Templates for Manufacturers — Production Scheduling, Capacity Planning, MPS',
  description:
    'Free Excel templates for manufacturers: production scheduling, capacity planning, master production schedule, and more. Built by manufacturing software experts with 35+ years of industry experience.',
  path: '/excel-templates',
  keywords:
    'free excel templates manufacturers, manufacturing excel templates, excel templates production scheduling, free manufacturing spreadsheets'
});

const FREE_TEMPLATES = [
  {
    href: '/excel-templates/production-schedule',
    title: 'Production Schedule Excel Template',
    description:
      'Schedule work orders against real shop-floor capacity with finite-capacity logic, work order tracking, and a daily Gantt view.',
    keyword: 'production schedule excel template'
  },
  {
    href: '/excel-templates/capacity-planning',
    title: 'Capacity Planning Excel Template',
    description:
      'Match work-center hours against demand, identify bottlenecks before they break the schedule, and plan headcount with realistic OEE.',
    keyword: 'capacity planning excel template'
  },
  {
    href: '/excel-templates/master-production-schedule',
    title: 'Master Production Schedule (MPS) Template',
    description:
      'Time-phased planning grid that connects sales forecasts to production runs with lot-sizing rules and ATP calculations.',
    keyword: 'master production schedule excel template'
  },
  {
    href: '/excel-templates/work-order',
    title: 'Work Order Excel Template',
    description:
      'Track open jobs, routing operations, material requirements, labor hours, and completion status in one printable work order workbook.',
    keyword: 'work order excel template'
  },
  {
    href: '/excel-templates/bill-of-materials',
    title: 'Bill of Materials (BOM) Excel Template',
    description:
      'Multi-level BOM with indented hierarchy, automatic cost rollup, and where-used analysis — up to 10 levels deep.',
    keyword: 'bill of materials excel template'
  },
  {
    href: '/excel-templates/mrp',
    title: 'MRP Excel Template',
    description:
      'Run a real time-phased material requirements planning calculation — demand explosion, net requirements, and planned order release.',
    keyword: 'MRP excel template'
  },
  {
    href: '/excel-templates/gantt-chart',
    title: 'Manufacturing Gantt Chart Template',
    description:
      'Gantt chart built for production — work-center swim lanes, operation dependencies, setup time, and a printable shop-floor format.',
    keyword: 'gantt chart excel manufacturing'
  },
  {
    href: '/excel-templates/job-scheduling',
    title: 'Job Scheduling Excel Template',
    description:
      'Priority sequencing, machine assignment, due-date risk flags, and a daily reschedule workflow for high-mix job shops.',
    keyword: 'job scheduling excel template'
  }
];

export default function ExcelTemplatesPage(): React.JSX.Element {
  return (
    <>
      {/* ─────────────── Free Excel Templates section ─────────────── */}
      <section className="border-b bg-gradient-to-b from-emerald-50 to-white py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
              <FileSpreadsheet className="size-3.5" />
              Free Excel Templates
            </div>
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-5xl">
              Free Excel Templates for Manufacturers
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Practical, manufacturer-built Excel templates for production
              scheduling, capacity planning, and master production scheduling —
              free, no email required, paired with a 30-day RMX trial.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {FREE_TEMPLATES.map((tpl) => (
              <Link
                key={tpl.href}
                href={tpl.href}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <FileSpreadsheet className="size-5" />
                </div>
                <h2 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-emerald-700">
                  {tpl.title}
                </h2>
                <p className="mb-4 flex-1 text-sm text-slate-600">
                  {tpl.description}
                </p>
                <span className="inline-flex items-center text-sm font-semibold text-emerald-700">
                  Get the template
                  <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Existing "Sister Excel Apps" section ─────────────── */}
      <NTClipboardExcelTemplates />
    </>
  );
}
