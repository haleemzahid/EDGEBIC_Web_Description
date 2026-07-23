import * as React from 'react';
import Link from 'next/link';

import { FAQJsonLd } from '@/components/seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Routes } from '@/constants/routes';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Upgrading from RMDB or EDGEBI to EDGEBIC',
  description:
    'The upgrade path from Resource Manager DB (RMDB) and EDGEBI to EDGEBIC, the next-generation finite capacity scheduling platform from User Solutions. What carries forward, what is new, and how the migration works. RMDB and EDGEBI remain fully supported.',
  path: '/rmdb-to-edgebic',
  keywords:
    'RMDB upgrade, RMDB successor, RMDB to EDGEBIC, EDGEBI upgrade, EDGEBI successor, Resource Manager DB next version, User Solutions new product, EDGEBIC migration'
});

const FAQS = [
  {
    question: 'Is RMDB being discontinued?',
    answer:
      'No. RMDB and EDGEBI remain fully supported. EDGEBIC is the next generation of the same product line, and you can move to it on your own timeline. New engine capabilities (TOC anchor scheduling, the optimizer, operator constraints, work center groups) land in EDGEBIC.'
  },
  {
    question: 'Do I have to migrate my data by hand?',
    answer:
      'No. EDGEBIC ships with import masks for products, work centers, bills of routing, sales orders, and actuals. Export your RMDB master data to Excel or CSV, map the columns once in an import mask, and re-run the same mask any time. Two-pass routing import wires up step sequences automatically.'
  },
  {
    question: 'Will my team have to relearn scheduling?',
    answer:
      'The concepts carry over directly: finite capacity, routings, work centers, shifts, what-if analysis. What changes is the experience. Routings become drag-and-drop flow charts, the Gantt is interactive with planned-versus-actual overlays, and the optimizer proposes improved schedules that you accept or discard.'
  },
  {
    question: 'Can we run RMDB and EDGEBIC side by side during the transition?',
    answer:
      'Yes, and we recommend it. A common pattern is to keep RMDB as the system of record while EDGEBIC schedules one cell or product line, then expand as the team gains confidence. Because EDGEBIC imports from Excel/CSV, the parallel run needs no special infrastructure.'
  },
  {
    question: 'What does EDGEBIC run on?',
    answer:
      'EDGEBIC is a Windows desktop application built on .NET 8. Single-user installs run on SQLite with zero database administration; team deployments run on SQL Server. A first-time setup wizard handles the database connection either way.'
  }
];

const CARRIES_FORWARD: string[] = [
  'Your master data: items, work centers, routings, calendars, customers (via built-in Excel/CSV import masks)',
  'Your scheduling concepts: finite capacity, routings, shifts, what-if analysis all work the way you expect',
  'Your ERP data flows: the same import-export integration approach RMDB has always used',
  'Your support relationship: same team, 35 years, both products supported in parallel',
  'Your graphical instincts from EDGEBI: interactive Gantt, drag-and-drop adjustments, visual scheduling'
];

const WHAT_IS_NEW: Array<{ title: string; body: string }> = [
  {
    title: 'One application instead of two',
    body: 'RMDB plus EDGEBI required two installs sharing a database. EDGEBIC is a single modern application: the engine and the graphical experience in one place.'
  },
  {
    title: 'The graphical routing designer',
    body: 'Build and edit routings as drag-and-drop flow charts with sub-assemblies, annotations, and images, then schedule straight from the diagram.'
  },
  {
    title: 'A new engine generation',
    body: 'Theory of Constraints anchor scheduling, backward (just-in-time) scheduling, work center groups, parallel and alternate work centers, lot streaming, and sequence-dependent setup matrices.'
  },
  {
    title: 'Labor as a real constraint',
    body: 'Operators, skills, certifications with expiry, shift rosters, and time off. Steps that need a certified welder wait for one.'
  },
  {
    title: 'The schedule optimizer',
    body: 'A multi-run layer guaranteed never worse than your baseline, plus a CP-SAT mathematical layer that reports a proven optimality gap. Review the comparison, then accept or discard.'
  },
  {
    title: 'Shop-floor actuals built in',
    body: 'The kiosk app lets operators start, count, pause, and complete work. Reschedules preserve everything already done and move only future work.'
  }
];

const MIGRATION_STEPS: Array<{ step: string; detail: string }> = [
  {
    step: 'Export your RMDB master data',
    detail: 'Items, work centers, routings, and open orders go out to Excel or CSV in whatever layout you already use.'
  },
  {
    step: 'Map columns once with import masks',
    detail: 'EDGEBIC import masks remember your column mapping per entity. Routing imports run a second pass that wires step sequences automatically.'
  },
  {
    step: 'Verify capacity and calendars',
    detail: 'Set shifts, holidays, and per-work-center calendars, then check the capacity numbers against what RMDB showed.'
  },
  {
    step: 'Schedule a pilot area side by side',
    detail: 'Run one cell or product family in EDGEBIC while RMDB keeps the rest. Compare dates, review with the planners.'
  },
  {
    step: 'Expand and switch over',
    detail: 'Widen the pilot until EDGEBIC owns the schedule. RMDB stays available as long as you want it.'
  }
];

export default function RmdbToEdgebicPage(): React.JSX.Element {
  return (
    <>
      <FAQJsonLd
        questions={FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />

      <div className="min-h-screen text-[18px]">
        {/* Hero */}
        <section className="py-8">
          <div className="container mx-auto max-w-7xl px-4">
            <h1 className="mb-4 max-w-4xl text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              From RMDB and EDGEBI to EDGEBIC: everything carries forward
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-700">
              EDGEBIC is not a different product to relearn. It is the next
              generation of the scheduling platform you already run: the RMDB
              engine and the EDGEBI graphical experience, unified and extended.
              Here is exactly what moves with you, what is new, and how the
              transition works.
            </p>
          </div>
        </section>

        {/* What carries forward */}
        <section className="border-y bg-slate-50 py-10">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
              What carries forward
            </h2>
            <ul className="max-w-4xl space-y-3 text-base leading-relaxed text-slate-700">
              {CARRIES_FORWARD.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* What is new */}
        <section className="py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-slate-900 md:text-3xl">
              What EDGEBIC adds
            </h2>
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              {WHAT_IS_NEW.map((feature) => (
                <div key={feature.title}>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-600">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Migration steps */}
        <section className="border-y bg-slate-50 py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-slate-900 md:text-3xl">
              The migration, step by step
            </h2>
            <ol className="max-w-4xl space-y-6">
              {MIGRATION_STEPS.map((item, index) => (
                <li
                  key={item.step}
                  className="text-base leading-relaxed"
                >
                  <p className="font-semibold text-slate-900">
                    {index + 1}. {item.step}
                  </p>
                  <p className="mt-1 text-slate-600">{item.detail}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <Link
                href={Routes.Contact}
                className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              >
                Plan your upgrade with US
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
              Upgrade questions, answered
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                >
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="mt-8 text-base text-slate-600">
              New here? Start with the{' '}
              <Link
                href={Routes.Edgebic}
                className="font-semibold text-cyan-700 transition-colors hover:text-cyan-800"
              >
                EDGEBIC product overview
              </Link>{' '}
              or the{' '}
              <Link
                href={Routes.EdgebicErpIntegration}
                className="font-semibold text-cyan-700 transition-colors hover:text-cyan-800"
              >
                ERP integration guide
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
