import * as React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

import { IndustryPageJsonLd, FAQJsonLd } from '@/components/seo';
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
  title: 'Consumer Goods Production Planning Software | Assembly & Packaging',
  description:
    'Production planning software for consumer goods manufacturers. Affordable MRP for smaller manufacturers, ERP add-on for purchasing optimization, and international scaling. Trusted by Sleepmaster Ltd, Plastilite Corporation, and more.',
  path: '/consumer-goods-production-planning-software',
  keywords:
    'consumer goods production planning, assembly scheduling software, packaging manufacturing scheduling, MRP for small manufacturers, consumer products manufacturing software, injection molding scheduling, production planning ERP add-on'
});

const FAQS = [
  {
    question: 'Is RMDB affordable for smaller manufacturers?',
    answer:
      'Yes. RMDB was specifically designed to be accessible for small to mid-size manufacturers. Sleepmaster Ltd, an AUD$50M manufacturer, chose RMDB because it delivered powerful scheduling and MRP capabilities at a fraction of the cost of enterprise systems. It scales from single-site operations to international expansion.'
  },
  {
    question: 'Can RMDB work as an add-on to my existing ERP?',
    answer:
      'Absolutely — this is one of the most common use cases. RMDB integrates with virtually any ERP system (SAP, Oracle, Epicor, Sage, Fourth Shift, and more) via Excel, CSV, or database connections. It fills the scheduling gap that most ERP systems have, without requiring you to replace your existing investment.'
  },
  {
    question: 'How quickly can we get up and running?',
    answer:
      'Most implementations are completed in days to weeks. Plastilite Corporation achieved a complete optimized schedule with full ERP integration in just 5 days. Because RMDB works with your existing data formats, there is no lengthy data migration or process re-engineering required.'
  },
  {
    question:
      'Can RMDB handle injection molding and complex assembly scheduling?',
    answer:
      'Yes. Plastilite Corporation uses RMDB for complex injection molding scheduling with multiple tool configurations — scenarios that their ERP scheduling module could not handle. RMDB supports alternate workcenters, split operations, and complex routing variations common in consumer goods manufacturing.'
  }
];

export default function ConsumerGoodsPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Consumer Goods Production Planning Software"
        description="Affordable production planning for consumer goods manufacturers with ERP integration and international scaling."
        url="/consumer-goods-production-planning-software"
        industryName="Consumer Goods & Assembly Manufacturing"
        industryDescription="Consumer products, packaging, assembly, and consumer goods manufacturing with domestic and international operations."
        customerNames={[
          'Sleepmaster Ltd',
          'Plastilite Corporation',
          'Smart Coffee'
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
                Production Planning for Consumer Goods & Assembly Manufacturers
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Affordable MRP and scheduling that scales with your business.
                From local operations to international expansion — without
                enterprise-level cost or complexity.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Consumer Goods Manufacturing Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Consumer goods manufacturers face pressure to deliver on time,
                control costs, and scale quickly — often with limited IT budgets
                and existing ERP systems that lack adequate scheduling. Whether
                you&apos;re running injection molding, assembly lines, or
                packaging operations, the scheduling gap is real.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Outgrowing existing MRP systems that lack scheduling depth',
                  'Enterprise software priced beyond reach for mid-size manufacturers',
                  'International expansion requiring rapid deployment at new sites',
                  'ERP purchasing modules missing the scheduling intelligence you need',
                  'Complex manufacturing methods (injection molding, assembly, packaging)',
                  'Costing and materials planning disconnected from actual schedules'
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
                How RMDB Serves Consumer Goods Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB gives consumer goods manufacturers the scheduling and MRP
                power of enterprise systems at a fraction of the cost. It works
                alongside your existing ERP, handles complex production methods,
                and deploys fast enough to support international expansion
                timelines.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Affordable alternative to enterprise MRP and scheduling systems',
                  'Easy ERP add-on for smarter purchasing and materials planning',
                  'Scalable from single site to international multi-site operations',
                  'Handles injection molding, assembly, and packaging scheduling',
                  'Complete optimized schedules with full ERP integration in days',
                  'Flexible scheduling for alternate workcenters and tool configurations',
                  'Costing and materials planning tied to actual production schedules',
                  'Works with your existing data — no migration or reformatting needed'
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
                Proven Results in Consumer Goods Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    metric: 'AUD$50M→Global',
                    label:
                      'Scaled from domestic operations to international expansion in China',
                    company: 'Sleepmaster Ltd'
                  },
                  {
                    metric: '5 Days',
                    label:
                      'From start to complete optimized schedule with full ERP integration',
                    company: 'Plastilite Corporation'
                  },
                  {
                    metric: 'Smarter',
                    label:
                      'Purchasing through ERP add-on with schedule-driven material planning',
                    company: 'Smart Coffee Machines'
                  }
                ].map((result) => (
                  <div
                    key={result.company}
                    className="rounded-lg border bg-white p-6 text-center"
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
        industryTags={['Consumer Goods', 'Consumer Products']}
        title="Consumer Goods Success Stories"
        subtitle="See how consumer goods manufacturers scaled their operations with RMDB."
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to upgrade your production planning?
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
              Contact Us
            </Link>
            <Link
              href="/resource-manager-db-2"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Learn More About RMDB
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
