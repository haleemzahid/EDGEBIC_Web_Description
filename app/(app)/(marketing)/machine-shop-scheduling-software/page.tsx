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
  title: 'Machine Shop Scheduling Software (2026) — Built for High-Mix Job Shops',
  description:
    'Production scheduling and management software for machine shops. Finite capacity scheduling, drag-and-drop Gantt, work order tracking, and one-time licensing. 35+ years of machine shop experience.',
  path: '/machine-shop-scheduling-software',
  keywords:
    'machine shop scheduling software, machine shop management software, machine shop production scheduling, machine shop ERP, finite capacity scheduling machine shop, automotive parts scheduling software, precision machining scheduling'
});

const FAQS = [
  {
    question:
      'What makes machine shop scheduling different from generic production scheduling?',
    answer:
      'Machine shops run high-mix, low-volume work where every job is different — different materials, different routings, different setup times, different customers. Generic ERP scheduling assumes repetitive runs and falls apart in this environment. Real machine shop scheduling has to handle setup-time-aware sequencing, alternate work centers, operator skill matching, and daily reschedules driven by customer expedites. RMDB was built for this from day one.'
  },
  {
    question: 'Does RMDB integrate with our existing ERP or accounting system?',
    answer:
      'Yes. RMDB integrates with QuickBooks, Sage, Microsoft Dynamics, Epicor, JobBOSS, E2 Shop System, Global Shop Solutions, and many others. The integration is bi-directional — work orders flow into RMDB for finite-capacity scheduling, and completed-quantity and labor data flow back to your ERP for accurate WIP and cost tracking.'
  },
  {
    question: 'How does RMDB handle setup times and changeovers?',
    answer:
      'Setup times are first-class citizens in RMDB scheduling. Each operation has its own setup time, and the scheduler honors sequence-dependent changeovers (e.g., the time to switch a CNC mill from one fixture to another varies based on the job before it). The result is a schedule the shop floor can actually run, not a theoretical sequence that ignores setup reality.'
  },
  {
    question: 'Can we schedule across multiple work centers and operators?',
    answer:
      'Yes. RMDB schedules every routing operation against the work center it requires AND the operator skill it requires (if you model labor as a constraint). Alternate work centers are supported — when a primary machine is overloaded, the scheduler can offload to a backup if you allow it. This is critical for high-mix shops where machine availability changes daily.'
  },
  {
    question: 'How long does implementation take?',
    answer:
      'Standard machine shop implementations finish in our 5-Day Implementation Framework. Day 1: install and configure work centers and shift calendars. Day 2: import items, BOMs, and routings from your ERP. Day 3: import open work orders and run the first finite-capacity solve. Day 4: scheduler training and dashboard setup. Day 5: go-live with the live shop floor schedule.'
  },
  {
    question: 'How much does machine shop scheduling software cost?',
    answer:
      'RMDB starts around $5,000 as a one-time perpetual license — no per-user fees, no monthly subscriptions. Most machine shops add an optional support contract for ongoing updates and help desk. Compared to subscription-based competitors, RMDB typically costs 50–70% less over a 5-year horizon for any team larger than 3–4 users.'
  }
];

export default function MachineShopSchedulingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Machine Shop Scheduling Software"
        description="Production scheduling software for high-mix, low-volume machine shops with finite capacity, drag-and-drop Gantt, and ERP integration."
        url="/machine-shop-scheduling-software"
        industryName="Machine Shops & CNC Manufacturing"
        industryDescription="High-mix, low-volume machine shop production with sequence-dependent setup times, alternate work centers, and daily customer expedites."
        customerNames={[
          'Cook Compression',
          'INCON Incorporated',
          'Instruments For Industry'
        ]}
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
                Machine Shop Scheduling Software for High-Mix Job Shops
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Finite capacity scheduling built for the reality of machine
                shops: every job is different, every customer wants it Tuesday,
                and the schedule changes three times before lunch. Used by
                manufacturers since 1991.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Why Machine Shop Scheduling Is Different
              </h2>
              <p className="leading-relaxed text-gray-700">
                Generic production scheduling tools were built for repetitive
                manufacturing — long runs of the same product on the same
                machine. Machine shops are the opposite: high mix, low volume,
                custom routings, and a constant stream of expedites that breaks
                whatever schedule you posted yesterday. Off-the-shelf ERP
                scheduling cannot keep up.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Every job has unique routings, setup times, and material requirements',
                  'Sequence-dependent changeovers blow up theoretical schedules',
                  'Customer expedites force daily reschedules of the entire floor',
                  'Skilled operators are the constraint, not the machines',
                  'Alternate work centers are critical when primary machines are loaded',
                  'Estimating delivery dates without finite capacity creates broken promises'
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
                How RMDB Serves Machine Shops
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB is a finite-capacity scheduling engine purpose-built for
                high-mix, low-volume environments. It handles the messiness of
                real machine shops — alternate routings, sequence-dependent
                setups, operator skill constraints, and daily expedites — in a
                single Gantt-driven interface that planners can actually use.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Finite capacity scheduling that honors machine and operator constraints',
                  'Drag-and-drop Gantt for instant what-if and rescheduling',
                  'Sequence-dependent setup time modeling',
                  'Alternate work center support for load balancing',
                  'Operator skill matrices and labor scheduling alongside machines',
                  'Realistic customer promise dates based on actual capacity',
                  'Integrates with QuickBooks, Sage, Epicor, JobBOSS, and others',
                  'One-time license — no per-user subscription fees'
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
                Proven Results in Machine Shop Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '30% → 90%',
                    label: 'On-time shipping percentage in repair shops',
                    company: 'Repair Shop Customer'
                  },
                  {
                    metric: '5 Days',
                    label:
                      'From kickoff to live finite-capacity schedule on the shop floor',
                    company: 'Standard Implementation'
                  },
                  {
                    metric: 'Accurate',
                    label:
                      'Labor scheduling with MRP add-on for realistic promise dates',
                    company: 'INCON Incorporated'
                  },
                  {
                    metric: 'Lean',
                    label:
                      'Manufacturing realized while maintaining MRP purchasing benefits',
                    company: 'Instruments For Industry'
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
        industryTags={['Machine Shop', 'Job Shop', 'CNC', 'Machining']}
        title="Machine Shop Success Stories"
        subtitle="See how machine shops use RMDB to control high-mix scheduling and improve on-time delivery."
      />

      <RelatedSolutions currentPath={Routes.MachineShopScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fix your machine shop scheduling?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Get a live demo with your real production data — no slide deck. See
            finite-capacity scheduling, drag-and-drop Gantt, and ERP integration
            in action on jobs your shop is running today.
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
