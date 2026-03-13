import * as React from 'react';
import Link from 'next/link';
import { CheckCircle, Quote } from 'lucide-react';

import { FeaturePageJsonLd, FAQJsonLd } from '@/components/seo';
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
  title: 'Finite Capacity Scheduling Software | Real Constraint-Based Planning',
  description:
    'Finite capacity scheduling software that schedules against real machine, labor, material, and tooling constraints simultaneously. Used by USS Nimitz (26,000+ tasks), GE Railcar (30%→90% on-time), and Cummins Engine (33 locations). 35+ years proven.',
  path: '/finite-capacity-scheduling-software',
  keywords:
    'finite capacity scheduling software, finite capacity planning, constraint-based scheduling, finite scheduling software, capacity planning software manufacturing, finite capacity scheduling system, resource constrained scheduling, real capacity planning'
});

const FAQS = [
  {
    question: 'What is finite capacity scheduling?',
    answer:
      'Finite capacity scheduling plans production against real resource constraints — machines, labor, materials, and tooling — simultaneously. Unlike infinite capacity scheduling (which assumes unlimited resources), finite scheduling only assigns work when capacity is actually available, producing realistic schedules and achievable promise dates.'
  },
  {
    question: 'Why is finite capacity scheduling better than infinite capacity planning?',
    answer:
      'Infinite capacity scheduling (used by most ERP systems) assumes resources are always available, leading to overbooking, unrealistic delivery dates, and chronic late shipments. GE Railcar Services was stuck at 30% on-time shipping with infinite capacity planning — after switching to RMDB finite capacity scheduling, on-time shipping tripled to over 90%.'
  },
  {
    question: 'Can RMDB handle large-scale finite capacity scheduling?',
    answer:
      'Yes. The USS Nimitz uses RMDB to finite capacity schedule over 26,000 preventive maintenance tasks and 5,000 corrective maintenance jobs simultaneously, with schedules extending 2 years out. Cummins Engine runs finite capacity scheduling across 33 locations. RMDB leverages Excel calculation speed for exceptionally fast scheduling even at massive scale.'
  },
  {
    question: 'How does finite capacity scheduling handle multiple resource types?',
    answer:
      'RMDB schedules machines, labor, materials, and tooling as simultaneous constraints. A job is only scheduled when ALL required resources are available — not just the machine. This is critical for industries like heavy equipment (Cummins), electronics (Enevate with 10-level sub-assemblies), and defense (BAE Systems) where multiple constraint types determine real capacity.'
  }
];

export default function FiniteCapacitySchedulingPage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="Finite Capacity Scheduling Software"
        description="Constraint-based finite capacity scheduling software that plans production against real machine, labor, material, and tooling limits simultaneously."
        url="/finite-capacity-scheduling-software"
        featureDescription="True finite capacity scheduling across machines, labor, materials, and tooling simultaneously. Forward and reverse scheduling with priority management."
        featureList={[
          'Multi-Constraint Finite Capacity Scheduling',
          'Machine and Labor Simultaneous Planning',
          'Material Availability Scheduling',
          'Tooling Constraint Management',
          'Forward and Reverse Scheduling',
          'Priority-Based Scheduling',
          'Workcenter Capacity Tracking',
          'Bottleneck Identification'
        ]}
        customerNames={[
          'US Navy (USS Nimitz)',
          'GE Railcar Services',
          'Cummins Engine',
          'BAE Systems',
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
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                Finite Capacity Scheduling Software
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Schedule against real constraints — machines, labor, materials,
                and tooling — simultaneously. The scheduling precision that
                took the USS Nimitz from Excel to 26,000+ concurrent tasks and
                GE Railcar from 30% to 90% on-time shipping.
              </p>
            </div>
          </div>
        </section>

        {/* Infinite vs Finite Comparison */}
        <section className="border-y bg-slate-50 py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Infinite Capacity vs. Finite Capacity Scheduling
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-red-200 bg-white p-6">
                  <h3 className="mb-4 text-lg font-semibold text-red-700">
                    Infinite Capacity (Most ERP Systems)
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Assumes unlimited resources are available',
                      'Overbooks workcenters — ignores real capacity',
                      'Produces unrealistic delivery dates',
                      'Cannot identify bottlenecks until they happen',
                      'Schedules machines but ignores labor constraints',
                      'GE Railcar result: 30% on-time shipping'
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="mt-1 size-2 shrink-0 rounded-full bg-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-green-200 bg-white p-6">
                  <h3 className="mb-4 text-lg font-semibold text-green-700">
                    Finite Capacity (RMDB)
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Schedules only when capacity is actually available',
                      'Respects machine, labor, material, and tooling limits',
                      'Produces achievable, realistic promise dates',
                      'Identifies bottlenecks before they impact delivery',
                      'Schedules ALL resource types simultaneously',
                      'GE Railcar result: 90%+ on-time shipping'
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                How RMDB Finite Capacity Scheduling Works
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB performs true finite capacity scheduling by evaluating all
                resource constraints before assigning any operation. Unlike ERP
                scheduling modules that check only machine availability, RMDB
                verifies machine capacity, labor availability, material on-hand,
                and tooling — ensuring every scheduled operation can actually be
                executed on the assigned date.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Multi-constraint scheduling (machines, labor, materials, tooling)',
                  'Forward scheduling from today or reverse from due date',
                  'Priority-based scheduling with configurable rules',
                  'Alternate workcenter support for routing flexibility',
                  'Split operations across workcenters when capacity allows',
                  'Workcenter capacity tracking prevents overbooking',
                  'Downtime and maintenance window management',
                  'Bottleneck identification across the entire schedule',
                  'Sub-assembly scheduling up to 10 levels deep',
                  'What-if analysis to evaluate capacity scenarios'
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

        {/* Testimonial */}
        <section className="bg-gradient-to-br from-slate-50 to-cyan-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Quote className="mx-auto mb-4 size-8 text-cyan-400" />
              <blockquote className="mb-4 text-lg italic leading-relaxed text-slate-700">
                &ldquo;The problem I was trying to solve was level loading the
                over 26,000 tasks I receive from the Preventive Maintenance
                Program. I needed an easy and reliable method to level load and
                schedule according to priority and finite capacity.&rdquo;
              </blockquote>
              <p className="font-semibold text-slate-900">
                Christopher D. Gates, Asst. Reactor Maintenance Officer
              </p>
              <p className="text-sm text-slate-500">USS Nimitz (CVN-68), US Navy</p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Finite Capacity Scheduling in Action
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '26,000+',
                    label:
                      'Tasks finite-capacity scheduled concurrently on a 2-year horizon',
                    company: 'USS Nimitz'
                  },
                  {
                    metric: '30→90%',
                    label:
                      'On-time shipping after replacing infinite with finite capacity',
                    company: 'GE Railcar Services'
                  },
                  {
                    metric: '33 Sites',
                    label:
                      'Finite capacity scheduling across U.S. locations with 6-month horizon',
                    company: 'Cummins Engine'
                  },
                  {
                    metric: '4%',
                    label:
                      'Capacity increase with existing resources through bottleneck identification',
                    company: 'Technical Glass Products'
                  }
                ].map((result) => (
                  <div
                    key={result.company}
                    className="rounded-lg border bg-white p-6 text-center shadow-sm"
                  >
                    <p className="mb-2 text-2xl font-bold text-cyan-600">
                      {result.metric}
                    </p>
                    <p className="mb-2 text-sm text-gray-700">
                      {result.label}
                    </p>
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
        <section className="bg-slate-50 py-12">
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
        industryTags={['Defense', 'Heavy Industry', 'Job Shop', 'Electronics']}
        title="Finite Capacity Scheduling Success Stories"
        subtitle="See how manufacturers achieved realistic schedules and on-time delivery with RMDB finite capacity scheduling."
        limit={6}
      />

      <RelatedSolutions currentPath={Routes.FiniteCapacityScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready for scheduling that respects real capacity?
          </h2>
          <p className="mb-6 text-slate-600">
            See RMDB finite capacity scheduling in action with your own data.
            Schedule a free live demo today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={Routes.Contact}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
            >
              Request a Free Demo
            </Link>
            <Link
              href="/resource-manager-db-2"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Explore RMDB Features
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
