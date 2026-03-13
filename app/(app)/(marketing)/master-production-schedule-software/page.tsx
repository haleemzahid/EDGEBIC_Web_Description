import * as React from 'react';
import Link from 'next/link';
import { CheckCircle, Quote } from 'lucide-react';

import { FeaturePageJsonLd, FAQJsonLd } from '@/components/seo';
import { IndustrySuccessStories } from '@/components/marketing/sections/industry-success-stories';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Routes } from '@/constants/routes';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Master Production Schedule Software | MPS Planning & Optimization',
  description:
    'Master production schedule (MPS) software that builds realistic schedules based on finite capacity. 6-month planning horizons, what-if scenario analysis, and automatic schedule optimization. Used by Cummins, GE Railcar, and Technical Glass Products.',
  path: '/master-production-schedule-software',
  keywords:
    'master production schedule software, MPS software, master production scheduling, production schedule optimization, master schedule planning, MPS planning software, production master plan, aggregate production planning software'
});

const FAQS = [
  {
    question: 'What is a master production schedule (MPS)?',
    answer:
      'A master production schedule is the planned production output over a defined time horizon — what to produce, how much, and when. It drives MRP, purchasing, and capacity planning. RMDB builds master production schedules based on finite capacity, ensuring your plan reflects what you can actually produce with available resources.'
  },
  {
    question: 'How far out can RMDB plan a master production schedule?',
    answer:
      'RMDB supports planning horizons of 6 months or more. Cummins Engine uses it to plan labor out several months in advance across 33 locations. The USS Nimitz schedules 2 years out for dry dock cycles. Technical Glass Products builds 6-month master production plans using what-if scenarios to validate capacity.'
  },
  {
    question: 'Can RMDB optimize an existing master production schedule?',
    answer:
      'Yes. RMDB can take your existing orders and open work and generate an optimized master production schedule that respects finite capacity, identifies bottlenecks, and levels resource loading. Plastilite Corporation went from raw ERP data to a complete optimized master schedule in just 5 days.'
  },
  {
    question: 'How does the master schedule connect to MRP?',
    answer:
      'In RMDB, the master production schedule directly drives MRP calculations. Material requirements are generated from the scheduled production plan — not from an infinite-capacity wishlist. This means your purchasing and material plans reflect what you will actually produce, reducing excess inventory and stockouts.'
  }
];

export default function MasterProductionSchedulePage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="Master Production Schedule Software"
        description="Master production schedule (MPS) software with finite capacity planning, multi-month horizons, and automatic optimization for manufacturing operations."
        url="/master-production-schedule-software"
        featureDescription="Master production scheduling with finite capacity optimization, multi-month planning horizons, what-if scenario analysis, and MRP-integrated material planning."
        featureList={[
          'Finite Capacity Master Scheduling',
          'Multi-Month Planning Horizons',
          'Automatic Schedule Optimization',
          'What-If Scenario Planning',
          'Resource Level Loading',
          'MRP Integration',
          'Bottleneck Identification',
          'Priority-Based Scheduling'
        ]}
        customerNames={[
          'Cummins Engine',
          'GE Railcar Services',
          'Technical Glass Products',
          'USS Nimitz',
          'Plastilite Corporation'
        ]}
      />
      <FAQJsonLd
        questions={FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />

      <div className="min-h-screen text-[18px]">
        {/* Hero */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                Master Production Schedule Software
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Build master production schedules based on what you can actually
                produce — not infinite capacity assumptions. Plan 6 months
                ahead, optimize resource loading, and drive MRP from realistic
                schedules.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="pt-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                The Master Scheduling Problem
              </h2>
              <p className="leading-relaxed text-gray-700">
                Most master production schedules are built on infinite capacity
                assumptions — treating your production plan as a wish list
                rather than an achievable plan. The result is unrealistic
                commitments, constant firefighting, and MRP generating purchase
                orders for materials you cannot actually consume on schedule.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Master schedules built on infinite capacity — disconnected from reality',
                  'MRP generating material orders based on unachievable production plans',
                  'No visibility into capacity bottlenecks until production falls behind',
                  'Manual spreadsheet-based master scheduling that cannot scale',
                  'Inability to evaluate new demand against existing commitments',
                  'Resource loading imbalances causing overtime in some areas, idle time in others'
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

        {/* Solution */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                RMDB: Master Scheduling Based on Finite Capacity
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB generates master production schedules that respect real
                capacity constraints. Every operation is scheduled only when
                machines, labor, materials, and tooling are actually available.
                The result is a master plan your team can actually execute —
                driving accurate MRP, realistic promise dates, and level
                resource loading.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Finite capacity master scheduling across all resource types',
                  'Planning horizons of 6 months to 2+ years',
                  'Automatic schedule optimization with priority management',
                  'Resource level loading to balance workcenters',
                  'What-if scenarios for new demand evaluation',
                  'MRP driven by achievable production plans',
                  'Bottleneck identification before they impact delivery',
                  'Gantt chart visualization of the complete master schedule',
                  'Forward and reverse scheduling from due dates',
                  'Real-time schedule updates as conditions change'
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
                &ldquo;They enable the user to quickly generate various
                &apos;what-if&apos; plans for feasible and efficient master
                scheduling, all without disrupting the current system.&rdquo;
              </blockquote>
              <p className="font-semibold text-slate-900">
                Arnold Quesenberry, Senior Consultant
              </p>
              <p className="text-sm text-slate-500">A.G. Raymond & Co.</p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Master Production Schedule Results
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '6 Months',
                    label:
                      'Master production plan with realistic labor and capacity forecasts',
                    company: 'Technical Glass Products'
                  },
                  {
                    metric: '2 Years',
                    label:
                      'Scheduling horizon for dry dock cycles and maintenance planning',
                    company: 'USS Nimitz'
                  },
                  {
                    metric: '5 Days',
                    label:
                      'From raw ERP data to complete optimized master schedule',
                    company: 'Plastilite Corporation'
                  },
                  {
                    metric: '33 Sites',
                    label:
                      'Master schedules with 6-month labor planning horizon',
                    company: 'Cummins Engine'
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

        {/* FAQ */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
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
        industryTags={['Heavy Industry', 'Job Shop', 'Defense', 'Consumer Goods']}
        title="Master Scheduling Success Stories"
        subtitle="See how manufacturers built achievable master production schedules with RMDB."
        limit={6}
      />

      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready for a master schedule you can actually execute?
          </h2>
          <p className="mb-6 text-slate-600">
            See RMDB build a finite capacity master production schedule from
            your own data. Schedule a free live demo today.
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
