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
  title: 'Manufacturing Scheduling Software | Shop Floor Planning & Control',
  description:
    'Manufacturing scheduling software for job shops, defense, electronics, and heavy equipment manufacturers. Finite capacity scheduling, Gantt charts, ERP integration. Scheduling reduced from 40 hours to 2 hours per week.',
  path: '/manufacturing-scheduling-software',
  keywords:
    'manufacturing scheduling software, shop floor scheduling, manufacturing planning software, work order scheduling software, manufacturing schedule optimization, factory scheduling software, shop floor planning, discrete manufacturing scheduling'
});

const FAQS = [
  {
    question: 'What types of manufacturing does RMDB scheduling support?',
    answer:
      'RMDB supports discrete, batch, and mixed-mode manufacturing scheduling. It has been proven across job shops (Technical Glass Products, Homestead Furniture), defense (USS Nimitz, BAE Systems), electronics (Enevate, Kyocera), heavy equipment (Cummins, GE Railcar), and consumer goods (Sleepmaster, Plastilite). Whether you run make-to-order, make-to-stock, or engineer-to-order, RMDB adapts to your manufacturing environment.'
  },
  {
    question: 'How does manufacturing scheduling software handle shop floor changes?',
    answer:
      'RMDB is designed for the reality of manufacturing — things change constantly. You can reconfigure schedules on-the-fly when priorities shift, machines go down, or rush orders arrive. Homestead Furniture noted that RMDB allows them to "reconfigure the system on-the-fly to match new routings." The EDGEBI graphical overlay adds drag-and-drop schedule adjustments in real time.'
  },
  {
    question: 'Can RMDB schedule both machines and labor?',
    answer:
      'Yes. RMDB schedules machines, labor, materials, and tooling as simultaneous constraints. This is critical because a machine being available means nothing if the skilled labor to operate it is not. Cummins Engine uses RMDB to plan labor out several months in advance across 33 locations, and INCON Incorporated uses it specifically for accurate labor scheduling alongside their MRP system.'
  },
  {
    question: 'How is RMDB different from ERP shop floor scheduling?',
    answer:
      'Most ERP scheduling modules use infinite capacity scheduling — they assume resources are always available, producing unrealistic schedules. RMDB performs true finite capacity scheduling. BAE Systems had purchased an ERP with MRP and CRP but were "not satisfied with its capacity constraint recognition" — they discontinued their ERP scheduling in favor of RMDB.'
  }
];

export default function ManufacturingSchedulingSoftwarePage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="Manufacturing Scheduling Software"
        description="Manufacturing scheduling software with finite capacity planning, Gantt charts, and ERP integration for discrete, batch, and mixed-mode manufacturers."
        url="/manufacturing-scheduling-software"
        featureDescription="Complete manufacturing scheduling software combining finite capacity planning, shop floor control, MRP, and visual Gantt chart scheduling for all manufacturing types."
        featureList={[
          'Shop Floor Scheduling',
          'Finite Capacity Planning',
          'Work Order Management',
          'Gantt Chart Visualization',
          'Machine and Labor Scheduling',
          'Complex Routing Management',
          'Alternate Workcenter Support',
          'Real-Time Schedule Adjustments'
        ]}
        customerNames={[
          'Homestead Furniture',
          'Technical Glass Products',
          'Cummins Engine',
          'BAE Systems',
          'Kyocera Industrial Ceramics',
          'ACE Controls'
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
                Manufacturing Scheduling Software for the Real Shop Floor
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                From Amish furniture makers to the world&apos;s largest aircraft
                carrier. Scheduling that handles the complexity, volatility, and
                scale of real manufacturing — not theoretical capacity.
              </p>
            </div>
          </div>
        </section>

        {/* Industry Breadth */}
        <section className="border-y bg-slate-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-slate-500">
                Proven across manufacturing types
              </p>
              <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-5">
                {[
                  { type: 'Job Shops', example: 'Technical Glass Products' },
                  { type: 'Defense', example: 'USS Nimitz, BAE Systems' },
                  { type: 'Electronics', example: 'Enevate, Kyocera' },
                  { type: 'Heavy Equipment', example: 'Cummins, GE Railcar' },
                  { type: 'Consumer Goods', example: 'Sleepmaster, Plastilite' }
                ].map((industry) => (
                  <div key={industry.type}>
                    <p className="font-semibold text-slate-900">
                      {industry.type}
                    </p>
                    <p className="text-xs text-slate-500">
                      {industry.example}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="pt-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Why Manufacturing Scheduling Is So Hard
              </h2>
              <p className="leading-relaxed text-gray-700">
                Manufacturing scheduling is not a planning exercise — it is an
                operational discipline that must account for machine
                availability, labor skills, material lead times, tooling
                constraints, and constantly shifting priorities. Most software
                treats it as the former, producing schedules that fail on the
                shop floor.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Constant priority changes from rush orders and customer reschedules',
                  'Machine downtime and maintenance disrupting planned schedules',
                  'Skilled labor shortages making machine-only scheduling useless',
                  'Complex routings with alternate workcenters and split operations',
                  'ERP systems producing schedules disconnected from shop floor reality',
                  'No visibility into what is actually achievable this week'
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
                RMDB: Built for the Manufacturing Shop Floor
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB gives manufacturers a scheduling system that matches the
                complexity of their operations. It handles discrete and batch
                manufacturing, complex routings, alternate workcenters, split
                operations, and multi-constraint scheduling — all while
                remaining flexible enough to reconfigure on-the-fly when
                priorities change.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Finite capacity scheduling across machines, labor, materials, and tooling',
                  'Complex routing management with alternate workcenters',
                  'On-the-fly schedule reconfiguration when priorities change',
                  'Discrete, batch, and mixed-mode manufacturing support',
                  'Interactive Gantt charts with drag-and-drop (via EDGEBI)',
                  'Forward and reverse scheduling with priority management',
                  'Downtime and maintenance window scheduling',
                  'Sub-assembly scheduling up to 10 levels deep',
                  'What-if scenario analysis for new orders and capacity',
                  'Works standalone or as an ERP scheduling add-on'
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
                &ldquo;The Resource Manager-DB solution has once again exceeded
                our expectations regarding its adaptability. The result was our
                substantially increasing production capacity with existing
                resources. RMDB, along with our cross-trained workforce gives
                us a competitive advantage to quickly respond to new market
                conditions.&rdquo;
              </blockquote>
              <p className="font-semibold text-slate-900">
                Scott McNeill, Production Scheduler
              </p>
              <p className="text-sm text-slate-500">Technical Glass Products</p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Manufacturing Scheduling Results
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '40→2 hrs',
                    label:
                      'Weekly scheduling time reduced by 95% for the production scheduler',
                    company: 'Homestead Furniture'
                  },
                  {
                    metric: '4%',
                    label:
                      'Business capacity increase with existing resources and workforce',
                    company: 'Technical Glass Products'
                  },
                  {
                    metric: '3 Depts',
                    label:
                      'Coordinated under one common computerized production schedule',
                    company: 'Kyocera Industrial Ceramics'
                  },
                  {
                    metric: '1 Week',
                    label:
                      'From start to complete optimized schedule with full ERP integration',
                    company: 'Plastilite Corporation'
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
        industryTags={['Job Shop', 'Heavy Industry', 'Electronics', 'Defense', 'Consumer Goods']}
        title="Manufacturing Scheduling Success Stories"
        subtitle="See how manufacturers transformed their shop floor scheduling with RMDB."
        limit={6}
      />

      <RelatedSolutions currentPath={Routes.ManufacturingSchedulingSoftware} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready for manufacturing scheduling that actually works?
          </h2>
          <p className="mb-6 text-slate-600">
            Schedule a free live demo with your own manufacturing data. See
            realistic schedules in minutes, not months.
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
