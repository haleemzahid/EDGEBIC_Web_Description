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
  title: 'Bill of Materials (BOM) Software',
  description:
    'BOM software with multi-level sub-assembly support up to 10 levels deep. Lot traceability, inventory valuation, costed BOMs, and scheduling integration. Proven by Enevate (Li-ion batteries), Turner Bicycles, and Cummins Engine.',
  path: '/bill-of-materials-bom-software',
  keywords:
    'BOM software, bill of materials software, BOM management, multi-level BOM, sub-assembly management, bill of materials management software, costed BOM, BOM with scheduling, manufacturing BOM software, product structure management'
});

const FAQS = [
  {
    question: 'How many BOM levels does RMDB support?',
    answer:
      'RMDB supports multi-level sub-assembly structures up to 10 levels deep and beyond. Enevate Corporation uses it for complex Li-ion battery production with 10-level deep sub-assembly structures, including lot traceability and inventory valuation by location and lot at each level.'
  },
  {
    question: 'Can RMDB manage costed BOMs?',
    answer:
      'Yes. RMDB provides costed Bills of Materials with full cost rollup across all sub-assembly levels. Manufacturing costs — labor, materials, overhead — are tied to actual production data and scheduling, not theoretical estimates. Turner Bicycles uses this to show manufacturing costs for every what-if scenario.'
  },
  {
    question: 'Does BOM software integrate with scheduling?',
    answer:
      'This is where RMDB is unique. Most BOM software manages product structures separately from scheduling. RMDB ties BOMs directly to finite capacity scheduling, MRP, and purchasing — so your material plans reflect what you can actually produce, not what infinite capacity would suggest.'
  },
  {
    question: 'Can I import BOMs from my existing systems?',
    answer:
      'Yes. RMDB imports BOMs from Excel, CSV, direct database connections, and ERP systems. Cummins Engine downloads BOMs from their AS400 directly into RMDB. Kyocera imported existing data from an Access Database. The system works with your current data formats — no reformatting required.'
  }
];

export default function BomSoftwarePage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="Bill of Materials (BOM) Software"
        description="Multi-level BOM management software with sub-assembly support up to 10 levels deep, lot traceability, costed BOMs, and integrated scheduling."
        url="/bill-of-materials-bom-software"
        featureDescription="Complete Bill of Materials management with multi-level sub-assemblies, lot traceability, costed BOMs, inventory valuation, and direct integration with finite capacity scheduling."
        featureList={[
          'Multi-Level Sub-Assembly (10+ levels)',
          'Costed Bills of Materials',
          'Lot Traceability',
          'Inventory Valuation by Location and Lot',
          'BOM Import from Excel and ERP',
          'Scheduling-Integrated BOM',
          'MRP from BOM Structure',
          'Bills of Resources (BOR)'
        ]}
        customerNames={[
          'Enevate Corporation',
          'Turner Suspension Bicycles',
          'Cummins Engine',
          'Kyocera Industrial Ceramics'
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
                Bill of Materials Software with Scheduling Built In
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Multi-level sub-assemblies up to 10 levels deep. Costed BOMs.
                Lot traceability. And the one thing most BOM software
                lacks — direct integration with finite capacity scheduling so
                your material plans match what you can actually produce.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="pt-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                The BOM Management Challenge
              </h2>
              <p className="leading-relaxed text-gray-700">
                Most BOM software manages product structures in isolation — disconnected from
                scheduling, purchasing, and actual production capacity. The
                result is material plans based on theoretical output,
                purchasing decisions untied to real schedules, and no
                visibility into how BOM changes affect production capacity.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'BOMs disconnected from production scheduling and capacity',
                  'No lot traceability or inventory valuation by location',
                  'Spreadsheet BOMs that cannot handle multi-level sub-assemblies',
                  'Costing estimates disconnected from actual production data',
                  'Importing BOMs from existing systems requires reformatting',
                  'Material plans based on infinite capacity — not real production'
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
                RMDB: BOMs Connected to Real Production
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB manages Bills of Materials and Bills of Resources as an
                integrated part of your production scheduling system. Your BOM
                structure drives MRP calculations, purchasing requirements,
                costing, and scheduling — all from one platform. Changes to
                product structure immediately flow through to schedules and
                material plans.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Multi-level sub-assemblies up to 10+ levels deep',
                  'Costed BOMs with full cost rollup across all levels',
                  'Lot traceability with pick lists and audit trail',
                  'Inventory valuation by location and by lot',
                  'Bills of Resources (BOR) linking workcenters to products',
                  'Direct MRP calculation from BOM structure',
                  'BOM changes flow immediately to schedules and purchasing',
                  'Import from Excel, CSV, Access, ERP, or AS400',
                  'What-if analysis showing cost impact of BOM changes',
                  'Flexible format for any combination of workcenters and products'
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
                &ldquo;From detailed 10-level deep sub-assembly structures,
                through importing new configurations via Excel, to scheduling
                workcenters and products in virtually any combination, we keep
                finding new and beneficial uses for this tool.&rdquo;
              </blockquote>
              <p className="font-semibold text-slate-900">
                Scott Bennett, Supply Chain Manager
              </p>
              <p className="text-sm text-slate-500">
                Enevate Corporation — Li-ion Battery Manufacturing
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                BOM Management Results
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '10-Level',
                    label:
                      'Deep sub-assembly structures with lot traceability for Li-ion batteries',
                    company: 'Enevate Corporation'
                  },
                  {
                    metric: 'AS400→RMDB',
                    label:
                      'BOMs downloaded directly from AS400 with labor and routings added',
                    company: 'Cummins Engine'
                  },
                  {
                    metric: 'Instant',
                    label:
                      'BOM configuration for new products with immediate cost and schedule impact',
                    company: 'Turner Bicycles'
                  },
                  {
                    metric: 'Hours/Mo',
                    label:
                      'To configure new BOMs and prepare production schedules for volatile products',
                    company: 'Job Shop'
                  }
                ].map((result) => (
                  <div
                    key={result.company + result.metric}
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
        industryTags={['Electronics', 'Hi-Tech', 'Job Shop', 'Consumer Goods']}
        title="BOM Management Success Stories"
        subtitle="See how manufacturers manage complex product structures with RMDB."
        limit={6}
      />

      <RelatedSolutions currentPath={Routes.BomSoftware} />

      {/* CTA */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready for BOM management connected to real production?
          </h2>
          <p className="mb-6 text-slate-600">
            See how RMDB handles your product structures — from simple
            single-level BOMs to 10-level deep sub-assemblies.
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
