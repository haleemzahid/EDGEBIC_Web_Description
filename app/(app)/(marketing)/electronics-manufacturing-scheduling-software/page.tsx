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
  title:
    'Electronics Manufacturing Scheduling Software | Hi-Tech Production Planning',
  description:
    'Production scheduling software for electronics and hi-tech manufacturers. Handle multi-level sub-assemblies, lean manufacturing, and precision labor scheduling. Trusted by Enevate, INCON, Kyocera, and Instruments For Industry.',
  path: '/electronics-manufacturing-scheduling-software',
  keywords:
    'electronics manufacturing scheduling software, hi-tech production planning, multi-level BOM scheduling, PCB assembly scheduling, semiconductor manufacturing scheduling, lean manufacturing software electronics, precision assembly scheduling'
});

const FAQS = [
  {
    question:
      'Can RMDB handle deep multi-level sub-assembly structures?',
    answer:
      'Yes. RMDB has been proven with 10-level deep sub-assembly structures in Li-ion battery production at Enevate Corporation. It handles complex Bills of Materials with lot traceability and inventory valuation by location and lot, making it ideal for electronics manufacturing with nested component hierarchies.'
  },
  {
    question: 'Does RMDB support lean manufacturing principles?',
    answer:
      'Absolutely. Instruments For Industry (IFI) successfully used RMDB to transition to lean manufacturing while maintaining MRP-based purchasing benefits. RMDB supports lean methods by streamlining scheduling, reducing work-in-process, and maintaining just-in-time material flow without sacrificing planning visibility.'
  },
  {
    question:
      'Can RMDB replace complex custom Excel scheduling programs?',
    answer:
      'Yes — that is one of its most common use cases. Kyocera Industrial Ceramics replaced a complex custom Excel program that was difficult to maintain with RMDB, gaining coordinated scheduling across three departments and improved output prediction. RMDB offers Excel familiarity with far more power.'
  },
  {
    question:
      'How does RMDB handle labor scheduling for electronics assembly?',
    answer:
      'RMDB schedules labor alongside machine and material constraints simultaneously. INCON Incorporated uses it as an MRP add-on specifically for accurate labor scheduling, enabling realistic customer promise dates based on actual labor availability rather than theoretical capacity.'
  }
];

export default function ElectronicsManufacturingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Electronics Manufacturing Scheduling Software"
        description="Production scheduling for electronics and hi-tech manufacturers with multi-level sub-assemblies and precision scheduling."
        url="/electronics-manufacturing-scheduling-software"
        industryName="Electronics & Hi-Tech Manufacturing"
        industryDescription="Electronics, semiconductor, and hi-tech manufacturing with complex multi-level assemblies and precision requirements."
        customerNames={[
          'Enevate Corporation',
          'INCON Incorporated',
          'Kyocera Industrial Ceramics',
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
                Scheduling Software for Electronics & Hi-Tech Manufacturers
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                From 10-level sub-assemblies to precision labor scheduling.
                Built for the complexity of modern electronics manufacturing.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Electronics Manufacturing Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Electronics and hi-tech manufacturing demands scheduling
                precision that most production planning tools cannot deliver.
                Deep sub-assembly hierarchies, lean manufacturing requirements,
                multi-department coordination, and rapid product evolution create
                a unique set of challenges.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Multi-level sub-assemblies (10+ levels deep) with complex BOMs',
                  'Maintaining lean manufacturing while preserving MRP benefits',
                  'Precision labor scheduling across specialized assembly departments',
                  'Complex custom Excel programs that are difficult to maintain',
                  'Multiple in-line departments with no coordinated scheduling',
                  'Rapid product changes requiring dynamic supply chain reconfiguration'
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
                How RMDB Serves Electronics Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB handles the full complexity of electronics manufacturing —
                from deep sub-assembly structures with lot traceability to lean
                production scheduling that maintains MRP purchasing visibility.
                It replaces fragile custom Excel programs with a robust,
                maintainable scheduling platform.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Handles 10+ level deep sub-assembly structures with lot traceability',
                  'MRP add-on for accurate material and labor scheduling',
                  'Supports lean manufacturing transition while keeping MRP benefits',
                  'Replaces complex custom Excel programs with coordinated scheduling',
                  'Multi-department scheduling with common computerized schedule',
                  'Inventory valuation by location and lot for precision tracking',
                  'Flexible formatting works with existing data structures',
                  'What-if analysis for dynamic supply chain reconfiguration'
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
                Proven Results in Electronics Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '10-Level',
                    label: 'Deep sub-assembly structures for Li-ion batteries',
                    company: 'Enevate Corporation'
                  },
                  {
                    metric: 'Accurate',
                    label:
                      'Labor scheduling with MRP add-on for realistic promise dates',
                    company: 'INCON Incorporated'
                  },
                  {
                    metric: '3 Depts',
                    label:
                      'Coordinated under one common computerized schedule',
                    company: 'Kyocera Industrial Ceramics'
                  },
                  {
                    metric: 'Lean',
                    label:
                      'Manufacturing realized while maintaining MRP purchasing',
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
        industryTags={['Electronics', 'Hi-Tech']}
        title="Electronics & Hi-Tech Success Stories"
        subtitle="See how electronics manufacturers transformed their production scheduling with RMDB."
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to optimize your electronics manufacturing schedule?
          </h2>
          <p className="mb-6 text-slate-600">
            Schedule a free live demo — we can even use your own data to show
            how RMDB handles your specific BOM and assembly complexity.
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
