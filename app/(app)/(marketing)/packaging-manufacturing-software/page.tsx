import * as React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

import { IndustryPageJsonLd, FAQJsonLd } from '@/components/seo';
import { IndustrySuccessStories } from '@/components/marketing/sections/industry-success-stories';
import { RelatedSolutions } from '@/components/marketing/sections/related-solutions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Routes } from '@/constants/routes';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Packaging Manufacturing Software (2026) — Converting, Print, Finish',
  description:
    'Packaging manufacturing software for production scheduling. Converting, printing, die-cutting, and finishing scheduling for folding carton, corrugated, and flexible packaging producers.',
  path: '/packaging-manufacturing-software',
  keywords:
    'packaging manufacturing software, packaging production scheduling, folding carton scheduling, corrugated production scheduling, flexible packaging scheduling, packaging converter scheduling, packaging ERP, finite capacity scheduling packaging'
});

const FAQS = [
  {
    question: 'How does RMDB handle multi-stage packaging routings?',
    answer:
      'Packaging production is a multi-stage routing problem: print → laminate → die-cut → fold/glue → pack. RMDB schedules every stage as a finite-capacity operation with its own work center, setup time, and labor requirement. The Gantt shows the complete flow so planners can spot bottlenecks at any stage — usually die-cutting or finishing on busy weeks.'
  },
  {
    question: 'Can RMDB handle press makeready and ink-change sequencing for printed packaging?',
    answer:
      'Yes. Press makeready is modeled as setup time, and ink/substrate changes are sequence-dependent setups. The scheduler intelligently groups similar jobs (same ink colors, same substrate, same plate size) to minimize total makeready time. Running 4 white-on-kraft jobs back-to-back saves hours compared to alternating with 4-color process work.'
  },
  {
    question: 'Does RMDB integrate with packaging ERPs and MIS systems?',
    answer:
      'Yes. RMDB integrates with the major packaging ERPs and MIS platforms: Kiwiplan, Amtech, EFI Radius, EFI Monarch, Avanti Slingshot, ePS, and general ERPs like Sage, Microsoft Dynamics, and NetSuite. Quotes, work orders, and BOMs flow into RMDB for finite-capacity scheduling; completed quantities and waste data flow back for billing and yield tracking.'
  },
  {
    question: 'How does RMDB handle die plate and mounting constraints?',
    answer:
      'Die plates and mounted plates are modeled as constraint resources alongside the presses themselves. If a job requires a specific die that is currently mounted on another machine, the scheduler will not assign it concurrently. This prevents the classic "scheduled to run but the die is on press 3" failure that breaks packaging schedules in spreadsheets.'
  },
  {
    question: 'Can RMDB schedule both folding carton and corrugated production in one system?',
    answer:
      'Yes. RMDB is process-agnostic — it schedules any work center with capacity, setup, and resource constraints. Folding carton presses, corrugated converters, flexographic presses, lamination, die-cutting, gluing, and finishing are all modeled the same way. Multi-process packaging converters run the entire facility on one schedule.'
  },
  {
    question: 'How long does packaging implementation take?',
    answer:
      'Standard 5-Day Implementation Framework. Day 1: configure presses, converting equipment, and shift calendars. Day 2: import items, BOMs, and routings from your ERP/MIS. Day 3: import open work orders and run the first finite-capacity solve. Day 4: train schedulers and CSRs. Day 5: go live with the actual production schedule.'
  }
];

export default function PackagingManufacturingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Packaging Manufacturing Software"
        description="Production scheduling software for packaging manufacturers including folding carton, corrugated, and flexible packaging with multi-stage routings."
        url="/packaging-manufacturing-software"
        industryName="Packaging Manufacturing"
        industryDescription="Packaging production including folding carton, corrugated, and flexible packaging with converting, printing, die-cutting, and finishing operations."
      />
      <FAQJsonLd
        questions={FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />

      <div className="min-h-screen text-[18px]">
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Packaging Manufacturing Software
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Finite capacity scheduling for packaging converters: print,
                laminate, die-cut, and finish. Sequence press makeready,
                respect die plate constraints, and deliver on time across
                folding carton, corrugated, and flexible packaging lines.
              </p>
            </div>
          </div>
        </section>

        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Packaging Manufacturing Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Packaging is high-mix, high-velocity manufacturing with brutal
                customer due-date pressure. Multi-stage routings cross
                printing, laminating, die-cutting, and finishing. Press
                makeready dominates throughput. Die plates and mounted plates
                are scarce shared resources. Most ERP scheduling modules cannot
                handle this complexity.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Multi-stage routings (print → laminate → die-cut → finish → pack)',
                  'Press makeready and ink/substrate change setup time',
                  'Die plates and mounted plates as scarce shared resources',
                  'Multi-process production (folding carton, corrugated, flexible)',
                  'CPG customers demand tight delivery windows and ATP responses',
                  'Daily customer expedites force constant rescheduling'
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                How RMDB Serves Packaging Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB schedules every stage of packaging production as a
                first-class operation. It honors press makeready, die plate
                availability, ink-change sequencing, and multi-stage routings
                in a single Gantt that planners can rely on.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Finite capacity scheduling across multi-stage routings',
                  'Press makeready and ink-change setup time modeling',
                  'Die plate and mounted plate as constraint resources',
                  'Multi-process scheduling (carton, corrugated, flexible)',
                  'Drag-and-drop Gantt for daily reschedules',
                  'Integrates with Kiwiplan, Amtech, EFI, and general ERPs',
                  'Realistic CPG delivery dates based on real capacity',
                  'One-time license — no per-user monthly subscription fees'
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <CheckCircle className="size-4 shrink-0 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Proven Results in Packaging Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Multi-Stage',
                    label: 'Print, laminate, die-cut, finish in one schedule',
                    company: 'Packaging Manufacturing Pattern'
                  },
                  {
                    metric: 'Makeready',
                    label: 'Sequence-aware grouping minimizes press changeover',
                    company: 'Packaging Manufacturing Pattern'
                  },
                  {
                    metric: '5 Days',
                    label: 'From kickoff to live finite-capacity schedule',
                    company: 'Standard Implementation'
                  },
                  {
                    metric: '$5K',
                    label: 'One-time license — no per-user fees',
                    company: 'Pricing Starting Point'
                  }
                ].map((result) => (
                  <div
                    key={result.company}
                    className="rounded-lg border bg-white p-6 text-center"
                  >
                    <p className="mb-2 text-2xl font-bold text-cyan-600">
                      {result.metric}
                    </p>
                    <p className="mb-2 text-sm text-gray-700">{result.label}</p>
                    <p className="text-xs font-medium text-slate-500">
                      {result.company}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                >
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>

      <IndustrySuccessStories
        industryTags={['Packaging', 'Print', 'Converting', 'Folding Carton', 'Corrugated']}
        title="Packaging &amp; Converting Success Stories"
        subtitle="See how packaging converters use RMDB to schedule multi-stage production and minimize makeready."
      />

      <RelatedSolutions currentPath={Routes.PackagingManufacturing} />

      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fix your packaging production schedule?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Get a live demo with your real press, die, and converting
            constraints. See finite-capacity scheduling running on your actual
            packaging jobs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
            >
              Schedule a Free Demo
            </Link>
            <Link
              href="/product-downloads"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Download Free Trial
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
