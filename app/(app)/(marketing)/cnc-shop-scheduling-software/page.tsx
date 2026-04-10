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
  title: 'CNC Shop Scheduling Software (2026) — Setup-Aware Finite Capacity',
  description:
    'CNC shop scheduling software with sequence-dependent setup time modeling, fixture and tooling constraints, alternate work centers, and one-time licensing. Built for high-mix CNC machining.',
  path: '/cnc-shop-scheduling-software',
  keywords:
    'CNC shop scheduling software, CNC scheduling software, CNC production scheduling, CNC machining scheduling, CNC machine shop software, CNC job scheduling, finite capacity scheduling CNC, CNC shop management software'
});

const FAQS = [
  {
    question: 'How does RMDB handle CNC setup-time-aware sequencing?',
    answer:
      'CNC setup time is the single biggest driver of CNC shop throughput — and the hardest thing for generic schedulers to model. RMDB treats setup time as a first-class operation property, with sequence-dependent setup support so the scheduler knows that running two similar jobs back-to-back saves 60 minutes of fixture changes. The result is a schedule that minimizes total setup time by intelligently grouping similar jobs without sacrificing due dates.'
  },
  {
    question: 'Can RMDB handle alternate CNC work centers and machine tradeoffs?',
    answer:
      'Yes. Most CNC shops have multiple machines that CAN run a given job — say, a Haas VF-2 and a Mori Seiki NV4000 that both fit a 10-inch part. RMDB models alternate work centers per operation, with optional preferences (run on the preferred machine if available, fall back to the alternate when overloaded). This is critical for load balancing in multi-machine CNC shops.'
  },
  {
    question: 'Does RMDB account for fixture and tooling constraints?',
    answer:
      'Yes. Fixtures and special tooling are modeled as constraint resources alongside the machines themselves. If a job requires a specific fixture that is currently in use on another machine, the scheduler will not assign it concurrently. This prevents the classic "scheduled to run but the fixture is on another job" failure that breaks CNC schedules in spreadsheets.'
  },
  {
    question: 'How does RMDB handle programmer and operator certification constraints?',
    answer:
      'Some CNC operations require certified operators (5-axis, complex tolerances, regulated parts). RMDB models operator skill matrices so the scheduler only assigns jobs to operators who are qualified to run them. This eliminates the manual checking that wastes scheduler time and creates the risk of unqualified runs.'
  },
  {
    question: 'Does RMDB integrate with shop floor data collection and CAM systems?',
    answer:
      'RMDB integrates with the major shop-floor data collection systems and ERPs used in CNC shops: JobBOSS, ProShop, E2 Shop System, Global Shop Solutions, Epicor, Sage, QuickBooks, and others. CAM-side integration (Mastercam, Fusion 360, Esprit) is via standard data exchange — RMDB schedules around the cut programs your CAM system produces.'
  },
  {
    question: 'How long does CNC shop implementation take?',
    answer:
      'Standard 5-Day Implementation Framework. Day 1: configure machines (with capabilities, fixtures, and operators), shift calendars, and skill matrices. Day 2: import items, BOMs, and routings from your ERP or shop floor system. Day 3: import open work orders and run the first setup-aware finite-capacity solve. Day 4: scheduler training and dashboard setup. Day 5: go live.'
  }
];

export default function CncShopSchedulingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="CNC Shop Scheduling Software"
        description="CNC shop scheduling software with sequence-dependent setup time modeling, fixture and tooling constraints, alternate work centers, and operator certification."
        url="/cnc-shop-scheduling-software"
        industryName="CNC Machine Shops"
        industryDescription="High-mix CNC machining with sequence-dependent setup times, fixture constraints, alternate work centers, and operator certification requirements."
      />
      <FAQJsonLd
        questions={FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />

      <div className="min-h-screen text-[18px]">
        {/* Hero Section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                CNC Shop Scheduling Software
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Setup-aware finite capacity scheduling for CNC shops. Sequence
                similar jobs to minimize setup time, honor fixture and tooling
                constraints, and balance load across alternate machines —
                without leaving money on the table.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                CNC Shop Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                CNC shops are some of the hardest scheduling environments in
                manufacturing. Setup time dominates throughput. Fixtures and
                tooling are shared constraints. Alternate machines need
                intelligent load balancing. And the mix of jobs changes
                weekly. Most ERP scheduling modules ignore setup time entirely
                — which is exactly the wrong place to start for a CNC shop.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Setup time dominates total cycle time on most jobs',
                  'Sequence-dependent changeovers — running similar parts back-to-back saves hours',
                  'Fixtures and special tooling are shared, scarce resources',
                  'Alternate machines need intelligent load balancing',
                  'Operator certifications constrain who can run regulated parts',
                  'CAM and CAD changes ripple through the schedule daily'
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

        {/* Solution Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                How RMDB Serves CNC Shops
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB is built for the messiness of CNC shops. Setup time is a
                first-class operation property. Fixtures and tooling are
                constraint resources. Alternate work centers are supported with
                preferences. The result is a schedule that minimizes setup
                downtime and maximizes spindle utilization — without
                sacrificing due dates.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Sequence-dependent setup time modeling on every operation',
                  'Fixture and tooling as scheduled constraint resources',
                  'Alternate work center support with preferences',
                  'Operator skill matrices for certified-only operations',
                  'Drag-and-drop Gantt for instant rescheduling',
                  'Integrates with JobBOSS, ProShop, Global Shop, Epicor, and others',
                  'Realistic delivery dates based on actual capacity',
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

        {/* Results Section */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Proven Results in CNC Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '30% → 90%',
                    label: 'On-time shipping percentage improvement',
                    company: 'Repair Shop Customer'
                  },
                  {
                    metric: 'Setup',
                    label: 'Time grouping minimizes total changeover hours',
                    company: 'CNC Shop Pattern'
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

        {/* FAQ Section */}
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

      {/* Success Stories */}
      <IndustrySuccessStories
        industryTags={['CNC', 'Machine Shop', 'Machining', 'Job Shop']}
        title="CNC &amp; Machine Shop Success Stories"
        subtitle="See how CNC shops use RMDB to minimize setup time and maximize spindle utilization."
      />

      <RelatedSolutions currentPath={Routes.CncShopScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fix your CNC shop scheduling?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Get a live demo with your real CNC routings, fixtures, and setup
            times. See setup-aware finite capacity scheduling running on your
            actual machines.
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
