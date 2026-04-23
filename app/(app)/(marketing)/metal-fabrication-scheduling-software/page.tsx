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
  title: 'Metal Fabrication Scheduling Software (2026) — Cut, Form, Weld, Finish',
  description:
    'Production scheduling software for metal fabricators. Finite capacity scheduling across cut, form, weld, and finish work centers, with material nesting awareness and ERP integration. 35+ years of fab shop experience.',
  path: '/metal-fabrication-scheduling-software',
  keywords:
    'metal fabrication scheduling software, metal fabrication software, sheet metal scheduling software, fab shop scheduling, weld shop production scheduling, fabrication ERP, finite capacity scheduling fabrication, metalworking production planning'
});

const FAQS = [
  {
    question: 'How does RMDB handle multi-stage fabrication routings?',
    answer:
      'Metal fabrication is the textbook multi-stage routing problem: a single part might cut on a laser or plasma table, form on a press brake, weld in a fixture, then finish in paint. RMDB models every operation in the routing as its own scheduled step on its own work center, with its own setup time and queue. The Gantt shows the full multi-stage flow so planners can spot bottlenecks at any stage.'
  },
  {
    question: 'Can RMDB account for material nesting and sheet utilization?',
    answer:
      'Material nesting itself is handled by your nesting software (SigmaNest, ProNest, MetaCAM, etc.). RMDB integrates with the output: the cut program produces a cut list, RMDB schedules the cut operation as a single batched job, then schedules the downstream forming, welding, and finishing operations in the right sequence. The result is a fab-floor schedule where the laser/plasma jobs feed downstream work centers smoothly.'
  },
  {
    question: 'Does RMDB schedule labor alongside machines for fab shops?',
    answer:
      'Yes. Fabrication is heavily labor-constrained — a press brake operator can run multiple machines, but a TIG welder cannot be in two booths at once. RMDB models operators as scheduled resources alongside machines, so the schedule honors both machine availability and operator availability. Skill matrices ensure only qualified operators get assigned to certified welds.'
  },
  {
    question: 'How does RMDB integrate with fab-shop ERPs like JobBOSS or Global Shop?',
    answer:
      'RMDB is ERP-agnostic and integrates with the major fab-shop ERPs: JobBOSS, Global Shop Solutions, ProShop, E2 Shop System, plus general ERPs like Sage, Epicor, Microsoft Dynamics, and QuickBooks. Work orders, routings, and item masters flow into RMDB; completed quantities and actual labor flow back. You keep your ERP for quoting and accounting, RMDB handles finite-capacity scheduling.'
  },
  {
    question: 'What about heat-treat, plating, or outside processing?',
    answer:
      'RMDB models outside processing (heat treat, plating, anodizing, powder coat) as scheduled operations with lead times. The schedule reserves the part as in-transit during the outside-process window, so downstream operations know exactly when the part will be back. This is critical for fab shops that ship to outside processors mid-routing.'
  },
  {
    question: 'How long does implementation take for a fab shop?',
    answer:
      'Standard 5-Day Implementation Framework. Day 1 configures work centers (laser, plasma, brake, weld, finish, etc.) and shift calendars. Day 2 imports items, multi-stage routings, and BOMs from your ERP. Day 3 imports open work orders and runs the first finite-capacity solve. Day 4 trains schedulers and shop-floor leads. Day 5 goes live with the actual shop schedule.'
  }
];

export default function MetalFabricationSchedulingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Metal Fabrication Scheduling Software"
        description="Production scheduling software for metal fabricators with multi-stage routings (cut, form, weld, finish), labor and machine constraints, and ERP integration."
        url="/metal-fabrication-scheduling-software"
        industryName="Metal Fabrication & Sheet Metal"
        industryDescription="Multi-stage metal fabrication including laser/plasma cutting, press-brake forming, welding, and finishing operations."
        customerNames={[
          'Cook Compression',
          'INCON Incorporated',
          'Technical Glass Products'
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
                Metal Fabrication Scheduling Software
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Finite capacity scheduling for fab shops: cut, form, weld, and
                finish — sequenced across machines and welders, with realistic
                lead times and on-time delivery you can actually promise.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Metal Fabrication Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Metal fabrication is one of the most demanding scheduling
                environments in manufacturing. Multi-stage routings cross laser,
                plasma, press brake, weld, and finish. Operators are
                certification-constrained. Outside processing creates
                multi-week round trips. And every job is different. Most ERP
                scheduling modules were not designed for this — and it shows.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Multi-stage routings (cut → form → weld → finish) on different work centers',
                  'Sequence-dependent setups on press brakes and laser tables',
                  'Certification-constrained welders limit who can run which jobs',
                  'Outside processing (heat treat, plating, paint) breaks the routing flow',
                  'Material nesting batches multiple jobs into one cut program',
                  'Customer expedites force daily reschedules across the entire floor'
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
                How RMDB Serves Metal Fabricators
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB schedules every stage of fabrication as a first-class
                operation. It honors machine constraints, welder
                certifications, outside-processing windows, and
                sequence-dependent setups in a single Gantt view. Planners get
                a feasible schedule the shop floor can actually execute, not a
                theoretical sequence that ignores welder availability.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Finite capacity scheduling across multi-stage routings',
                  'Welder certification matrices for skill-constrained scheduling',
                  'Sequence-dependent setup time modeling on brakes and lasers',
                  'Outside processing (heat treat, plate, paint) as scheduled operations',
                  'Drag-and-drop Gantt for instant rescheduling and what-if',
                  'Integrates with JobBOSS, Global Shop, ProShop, Epicor, Sage, and more',
                  'Realistic delivery dates based on real shop capacity',
                  'One-time license — no per-user monthly fees'
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
                Proven Results in Fabrication Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '30% → 90%',
                    label: 'On-time shipping percentage improvement',
                    company: 'Repair Shop Customer'
                  },
                  {
                    metric: '5 Days',
                    label: 'From kickoff to first live finite-capacity schedule',
                    company: 'Standard Implementation'
                  },
                  {
                    metric: 'Multi-Stage',
                    label: 'Cut, form, weld, and finish in one Gantt schedule',
                    company: 'Typical Fab Shop Use Case'
                  },
                  {
                    metric: '$5K',
                    label: 'One-time license — no per-user subscription fees',
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
        industryTags={['Metal Fabrication', 'Fabrication', 'Job Shop', 'Welding']}
        title="Fabrication Success Stories"
        subtitle="See how fab shops use RMDB to coordinate multi-stage scheduling and improve delivery."
      />

      <RelatedSolutions currentPath={Routes.MetalFabricationScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fix your fab shop scheduling?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Get a live demo with your real fabrication routings. See finite
            capacity scheduling across cut, form, weld, and finish — running on
            your actual jobs.
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
