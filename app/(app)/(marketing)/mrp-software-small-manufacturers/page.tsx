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
  title: 'MRP Software for Small Manufacturers',
  description:
    'Affordable MRP software designed for small to mid-size manufacturers. Bills of Materials, inventory management, purchasing, and finite capacity scheduling. Used by Sleepmaster (AUD$50M), Turner Bicycles, and more. Implement in days, not months.',
  path: '/mrp-software-small-manufacturers',
  keywords:
    'MRP software small manufacturers, MRP system small business, affordable MRP software, material requirements planning small manufacturer, MRP for small business, small manufacturer production planning, MRP software affordable, material planning software SMB'
});

const FAQS = [
  {
    question: 'Is RMDB really affordable for small manufacturers?',
    answer:
      'Yes. RMDB was specifically designed to be accessible for small to mid-size manufacturers. Sleepmaster Ltd, an AUD$50M manufacturer, chose RMDB because it delivered powerful MRP and scheduling capabilities at a fraction of the cost of enterprise systems. The USS Nimitz purchased it at discretionary fund level — proving enterprise-grade capability at small-business pricing.'
  },
  {
    question: 'Can RMDB replace enterprise MRP systems?',
    answer:
      'RMDB can serve as a complete MRP system for small manufacturers or as a powerful add-on to existing ERP systems. It provides Bills of Materials, inventory management, purchasing, finite capacity scheduling, and costing — all in one system. Enevate Corporation uses it for everything from 10-level deep sub-assemblies to lot traceability and inventory valuation.'
  },
  {
    question: 'How long does MRP software implementation take for a small manufacturer?',
    answer:
      'Typical RMDB implementations take days to weeks. Turner Bicycles entered all shop constraints, BOMs, shop calendar, materials, vendors, and customers in just a few days. Plastilite Corporation achieved full ERP integration in one week. Because RMDB works with Excel and existing data formats, there is no steep learning curve.'
  },
  {
    question: 'Can I start with just one MRP module and expand later?',
    answer:
      'Absolutely. Sleepmaster Ltd noted that RMDB "can be used in sections — materials planning first, then costings, then scheduling — without requiring whole system implementation." This modular approach means you can start seeing value immediately and expand as your business grows, without an all-or-nothing deployment.'
  }
];

export default function MrpSoftwareSmallManufacturersPage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="MRP Software for Small Manufacturers"
        description="Affordable MRP software with Bills of Materials, inventory management, purchasing, and finite capacity scheduling for small to mid-size manufacturers."
        url="/mrp-software-small-manufacturers"
        featureDescription="Complete MRP system for small manufacturers including Bills of Materials, inventory management, purchasing, scheduling, and costing in one affordable platform."
        featureList={[
          'Bills of Materials Management',
          'Inventory Management',
          'Material Requirements Planning',
          'Purchasing and Receiving',
          'Finite Capacity Scheduling',
          'Costing and Estimating',
          'Lot Traceability',
          'Modular Implementation'
        ]}
        customerNames={[
          'Sleepmaster Ltd',
          'Turner Suspension Bicycles',
          'Plastilite Corporation',
          'Smart Coffee',
          'Enevate Corporation'
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
                MRP Software Built for Small Manufacturers
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Enterprise-grade MRP capabilities without the enterprise price
                tag. Bills of Materials, inventory management, scheduling, and
                purchasing — implement in days, not months.
              </p>
            </div>
          </div>
        </section>

        {/* Value Proposition Bar */}
        <section className="border-y bg-slate-50 py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 text-center md:grid-cols-4">
              {[
                { metric: 'Days', label: 'Not months to implement' },
                { metric: 'Modular', label: 'Start small, expand later' },
                { metric: 'Affordable', label: 'Fraction of enterprise cost' },
                { metric: '35+', label: 'Years of manufacturing expertise' }
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

        {/* Challenges Section */}
        <section className="pt-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                The Small Manufacturer&apos;s MRP Dilemma
              </h2>
              <p className="leading-relaxed text-gray-700">
                Small manufacturers need MRP capabilities but face a frustrating
                choice: overspend on enterprise systems that take months to
                implement, or underperform with spreadsheets that cannot handle
                growing complexity. Most MRP systems are priced and designed for
                large enterprises — leaving small manufacturers underserved.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Enterprise MRP systems priced beyond reach for small manufacturers',
                  'Implementation timelines of 6-12 months that small businesses cannot absorb',
                  'Spreadsheets that break as product complexity and order volume grow',
                  'No affordable way to manage BOMs, inventory, and scheduling together',
                  'IT resource requirements that exceed small manufacturer capacity',
                  'All-or-nothing deployments with no modular path to value'
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
                Complete MRP at a Price Small Manufacturers Can Afford
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB delivers the full suite of MRP capabilities that small
                manufacturers need — Bills of Materials, inventory management,
                purchasing, finite capacity scheduling, and costing — in a
                system that implements in days and works with your existing
                data. No enterprise IT team required.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Complete Bills of Materials with multi-level sub-assemblies',
                  'Inventory management with lot traceability and valuation',
                  'Material Requirements Planning with purchasing integration',
                  'Finite capacity scheduling for realistic delivery dates',
                  'Costing and estimating tied to actual production data',
                  'Modular deployment — start with what you need most',
                  'Excel-familiar interface with no steep learning curve',
                  'Works with your existing data formats (no migration)',
                  'Scales from single site to international operations',
                  'One-person setup — no dedicated IT team needed'
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
                &ldquo;The biggest benefit relative to other systems looked at
                is its simplicity to operate and speed at which it can generate
                results in whichever area you want to start on. Most are far
                more expensive and comprehensive... but all require much higher
                cost and are much more resource hungry to set up.&rdquo;
              </blockquote>
              <p className="font-semibold text-slate-900">
                Jim Steel, Operations Manager
              </p>
              <p className="text-sm text-slate-500">Sleepmaster Ltd (AUD$50M manufacturer)</p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Small Manufacturer Results with RMDB
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'AUD$50M→Global',
                    label:
                      'Scaled from domestic operations to international expansion in China',
                    company: 'Sleepmaster Ltd'
                  },
                  {
                    metric: 'Few Days',
                    label:
                      'Complete implementation including BOMs, routings, inventory, and scheduling',
                    company: 'Turner Bicycles'
                  },
                  {
                    metric: '1 Person',
                    label:
                      'Part-time setup by one individual — no IT team required',
                    company: 'Sleepmaster Ltd'
                  },
                  {
                    metric: 'Smarter',
                    label:
                      'Purchasing through MRP linked to existing ERP system',
                    company: 'Smart Coffee'
                  }
                ].map((result) => (
                  <div
                    key={result.label}
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
        industryTags={['Consumer Goods', 'Job Shop', 'Consumer Products']}
        title="Small Manufacturer Success Stories"
        subtitle="See how small and mid-size manufacturers achieved enterprise-grade MRP with RMDB."
        limit={6}
      />

      <RelatedSolutions currentPath={Routes.MrpSoftwareSmallManufacturers} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready for MRP that fits your budget and timeline?
          </h2>
          <p className="mb-6 text-slate-600">
            See how RMDB can give your small manufacturing operation
            enterprise-grade capabilities — in days, not months.
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
