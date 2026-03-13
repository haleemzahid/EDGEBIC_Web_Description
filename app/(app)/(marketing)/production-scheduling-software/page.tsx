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
  title: 'Production Scheduling Software | Finite Capacity Planning & MRP',
  description:
    'Production scheduling software trusted by GE, Cummins, BAE Systems, and the US Navy. Finite capacity scheduling, what-if analysis, MRP, and ERP integration. On-time shipping improved from 30% to 90%. 35+ years of manufacturing expertise.',
  path: '/production-scheduling-software',
  keywords:
    'production scheduling software, production planning software, manufacturing scheduling, finite capacity scheduling, production scheduling system, production schedule optimization, shop floor scheduling software, manufacturing production planning'
});

const FAQS = [
  {
    question: 'What makes RMDB different from other production scheduling software?',
    answer:
      'RMDB combines finite capacity scheduling across machines, labor, materials, and tooling simultaneously — something most production schedulers cannot do. It works as a standalone system or as a powerful add-on to your existing ERP, processing your current data formats with no migration required. Trusted by organizations from the USS Nimitz to Cummins Engine across 33 locations.'
  },
  {
    question: 'How quickly can production scheduling software be implemented?',
    answer:
      'RMDB implementations typically take days to weeks, not months. Plastilite Corporation achieved a complete optimized schedule with full ERP integration in just 5 days. Because RMDB works with your existing Excel, CSV, or database data, there is no lengthy data migration or process re-engineering required.'
  },
  {
    question: 'Can production scheduling software work with my existing ERP system?',
    answer:
      'Yes — this is one of the most common use cases. RMDB integrates with virtually any ERP system (SAP, Oracle, Epicor, Sage, Fourth Shift, Macola, and more) via Excel, CSV, or direct database connections. BAE Systems discontinued their ERP production planning module in favor of RMDB because it delivered superior finite capacity scheduling.'
  },
  {
    question: 'What results can I expect from production scheduling software?',
    answer:
      'Real results from real customers: GE Railcar Services tripled on-time shipping from 30% to over 90%. Homestead Furniture reduced scheduling time from 40 hours/week to 2 hours/week. Technical Glass Products increased capacity by 4% with existing resources and cut lead times by two weeks. Turner Bicycles secured their largest customer order in company history using what-if analysis.'
  }
];

export default function ProductionSchedulingSoftwarePage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="Production Scheduling Software"
        description="Finite capacity production scheduling software with MRP, what-if analysis, and ERP integration for manufacturers of all sizes."
        url="/production-scheduling-software"
        featureDescription="Advanced production scheduling software combining finite capacity planning, MRP, labor scheduling, and what-if analysis. Integrates with any ERP system."
        featureList={[
          'Finite Capacity Scheduling',
          'What-If Analysis',
          'MRP and Inventory Management',
          'Labor and Machine Scheduling',
          'ERP Integration',
          'Drag-and-Drop Gantt Charts',
          'Multi-Location Scheduling',
          'Bill of Materials Management'
        ]}
        customerNames={[
          'GE Railcar Services',
          'Cummins Engine',
          'BAE Systems',
          'US Navy (USS Nimitz)',
          'Technical Glass Products',
          'Homestead Furniture'
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
                Production Scheduling Software That Delivers Real Results
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Finite capacity scheduling trusted by GE, Cummins, BAE Systems,
                and the US Navy. From single-site job shops to 33-location
                enterprises — scheduling that works with your data, your ERP,
                and your reality.
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="border-y bg-slate-50 py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 text-center md:grid-cols-4">
              {[
                { metric: '30% → 90%', label: 'On-time shipping improvement' },
                { metric: '35+', label: 'Years of expertise' },
                { metric: '33', label: 'Locations scheduled simultaneously' },
                { metric: '26,000+', label: 'Tasks scheduled concurrently' }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-cyan-600">
                    {stat.metric}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="pt-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Why Most Production Scheduling Falls Short
              </h2>
              <p className="leading-relaxed text-gray-700">
                Most manufacturers struggle with production scheduling because
                their tools were not built for the complexity of real
                manufacturing. ERP scheduling modules lack finite capacity
                awareness. Spreadsheets break under volume. The result:
                unrealistic promises, late deliveries, and wasted capacity.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'ERP systems that schedule to infinite capacity — ignoring real constraints',
                  'Spreadsheet-based scheduling that cannot scale beyond a few dozen jobs',
                  'No visibility into actual labor, machine, and material availability',
                  'Unrealistic customer promise dates leading to chronic late deliveries',
                  'Scheduling disconnected from purchasing, inventory, and costing',
                  'Inability to run what-if scenarios before committing to delivery dates'
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
                RMDB: Production Scheduling Built for Real Manufacturing
              </h2>
              <p className="leading-relaxed text-gray-700">
                Resource Manager DB (RMDB) is production scheduling software
                that handles the full complexity of manufacturing — finite
                capacity across machines, labor, materials, and tooling,
                simultaneously. It works standalone or as a powerful scheduling
                add-on to any ERP system, using your existing data with no
                migration required.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'True finite capacity scheduling across all resource types',
                  'What-if scenario analysis before committing to delivery dates',
                  'MRP with Bills of Materials and inventory management',
                  'Labor, machine, and material scheduling simultaneously',
                  'ERP integration (SAP, Oracle, Epicor, Fourth Shift, Macola)',
                  'Forward and reverse scheduling with priority management',
                  'Interactive Gantt charts with drag-and-drop via EDGEBI',
                  'Multi-location scheduling across 30+ sites',
                  'Costing and estimating tied to actual production schedules',
                  'Sub-assembly scheduling up to 10 levels deep'
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

        {/* Testimonial Section */}
        <section className="bg-gradient-to-br from-slate-50 to-cyan-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Quote className="mx-auto mb-4 size-8 text-cyan-400" />
              <blockquote className="mb-4 text-lg italic leading-relaxed text-slate-700">
                &ldquo;Over the past several years, RMDB has successfully helped
                our repair network to improve the Shipping On-Time accuracy from
                30% to over 90%. Additionally, we have improved our overall shop
                cycle time by several days.&rdquo;
              </blockquote>
              <p className="font-semibold text-slate-900">
                Dan Barich, Manager of Process Engineering
              </p>
              <p className="text-sm text-slate-500">GE Railcar Services</p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Production Scheduling Results from Real Manufacturers
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '30→90%',
                    label:
                      'On-time shipping tripled across all U.S. and Canada repair shops',
                    company: 'GE Railcar Services'
                  },
                  {
                    metric: '95%',
                    label:
                      'Reduction in scheduling time — from 40 hrs/week to 2 hrs/week',
                    company: 'Homestead Furniture'
                  },
                  {
                    metric: '26,000+',
                    label:
                      'Maintenance tasks scheduled concurrently with 2-year horizon',
                    company: 'USS Nimitz'
                  },
                  {
                    metric: '5 Days',
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

        {/* How It Works Section */}
        <section className="border-t bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                How RMDB Production Scheduling Works
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    step: '1',
                    title: 'Import Your Data',
                    description:
                      'RMDB works with your existing data — Excel, CSV, or direct database connections. No reformatting, no data migration. Import BOMs, routings, workcenters, and open orders from your ERP.'
                  },
                  {
                    step: '2',
                    title: 'Schedule to Finite Capacity',
                    description:
                      'RMDB schedules against real constraints — machine capacity, labor availability, material on-hand, and tooling. Forward or reverse scheduling with priority management gives you realistic dates.'
                  },
                  {
                    step: '3',
                    title: 'Optimize and Deliver',
                    description:
                      'Run what-if scenarios, identify bottlenecks, and fine-tune your schedule. Export updated dates back to your ERP. Use EDGEBI for drag-and-drop Gantt chart adjustments and real-time visibility.'
                  }
                ].map((step) => (
                  <div
                    key={step.step}
                    className="rounded-lg border bg-slate-50 p-6"
                  >
                    <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-white">
                      {step.step}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {step.description}
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
        industryTags={['Job Shop', 'Heavy Industry', 'Defense', 'Electronics', 'Consumer Goods']}
        title="Production Scheduling Success Stories"
        subtitle="See how manufacturers across industries transformed their production scheduling with RMDB."
        limit={6}
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to transform your production scheduling?
          </h2>
          <p className="mb-6 text-slate-600">
            Schedule a free live demo — we can use your own data to show how
            RMDB fits your manufacturing process.
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
