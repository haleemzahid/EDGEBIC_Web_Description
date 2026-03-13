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
  title: 'Heavy Equipment & Industrial Manufacturing Scheduling Software',
  description:
    'Production scheduling for heavy equipment and industrial manufacturers. Multi-location scheduling, 6-month labor planning, and on-time shipping improvement from 30% to 90%. Trusted by Cummins Engine, GE Railcar Services, and more.',
  path: '/heavy-equipment-manufacturing-scheduling',
  keywords:
    'heavy equipment manufacturing scheduling, industrial production planning software, multi-location scheduling, engine manufacturing scheduling, railcar scheduling software, heavy industry production planning, fleet maintenance scheduling'
});

const FAQS = [
  {
    question:
      'Can RMDB handle multi-location manufacturing scheduling?',
    answer:
      'Yes. Cummins Engine uses RMDB across 33 locations throughout the United States for labor and machine scheduling. The system supports multi-site planning with the ability to schedule resources months in advance, giving each location visibility into their capacity and commitments.'
  },
  {
    question:
      'How does RMDB improve on-time delivery for heavy industry?',
    answer:
      'GE Railcar Services tripled their on-time shipping from 30% to over 90% after deploying RMDB across all major repair shops in the US and Canada. The system provides realistic schedules based on actual capacity, eliminating the overbooking and unrealistic promises that cause late deliveries.'
  },
  {
    question: 'Can RMDB schedule both labor and machines simultaneously?',
    answer:
      'Yes, RMDB performs true finite capacity scheduling across all resource types — machines, labor, materials, and tooling — simultaneously. This is critical for heavy industry where both machine availability and skilled labor availability determine whether a job can actually be completed on time.'
  },
  {
    question: 'How far ahead can RMDB schedule?',
    answer:
      'RMDB supports scheduling horizons of 6 months or more. Cummins Engine uses it to plan labor out several months in advance, enabling realistic customer promise dates and proactive workforce planning. The system can handle scheduling windows appropriate to your operational planning cycle.'
  }
];

export default function HeavyEquipmentPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Heavy Equipment & Industrial Manufacturing Scheduling Software"
        description="Production scheduling for heavy equipment and industrial manufacturers with multi-location operations and long planning horizons."
        url="/heavy-equipment-manufacturing-scheduling"
        industryName="Heavy Equipment & Industrial Manufacturing"
        industryDescription="Heavy equipment, engine, railcar, and industrial manufacturing with multi-location operations and large-scale fleet management."
        customerNames={[
          'Cummins Engine',
          'GE Railcar Services',
          'Cook Compression'
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
                Production Scheduling for Heavy Equipment & Industrial
                Manufacturers
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Multi-location. Multi-month horizons. Mission-critical on-time
                delivery. Proven with Cummins, GE, and leading industrial
                manufacturers.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Heavy Industry Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Heavy equipment and industrial manufacturers operate at a scale
                and complexity where scheduling failures translate directly into
                massive cost overruns, missed contracts, and customer churn.
                Standard ERP scheduling modules were not built for this reality.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Multi-location operations (30+ sites) with no unified scheduling',
                  'Long scheduling horizons (6+ months) for labor and capacity planning',
                  'Fleet management at scale (180,000+ units requiring scheduled maintenance)',
                  'ERP systems that lack finite capacity scheduling capabilities',
                  'Aged inventory accumulating due to poor schedule visibility',
                  'On-time shipping rates stuck at 30% due to unrealistic scheduling'
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
                How RMDB Serves Heavy Industry
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB delivers finite capacity scheduling that scales across
                dozens of locations and months of planning horizon. It
                integrates with your existing ERP as a powerful scheduling
                add-on, giving you the realistic capacity visibility your
                current system cannot provide.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Multi-site scheduling across 30+ locations',
                  'Labor scheduling months in advance for workforce planning',
                  'Workcenter capacity tracking to prevent overbooking',
                  'Master repair schedule creation for fleet maintenance',
                  'Cycle time improvement through bottleneck identification',
                  'ERP add-on integration (works alongside existing systems)',
                  'Reduced aged inventory through better schedule visibility',
                  'What-if analysis for evaluating new contract capacity'
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
                Proven Results in Heavy Industry
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '30→90%',
                    label: 'On-time shipping improvement across all repair shops',
                    company: 'GE Railcar Services'
                  },
                  {
                    metric: '33 Sites',
                    label:
                      'Multi-location scheduling with 6-month planning horizon',
                    company: 'Cummins Engine'
                  },
                  {
                    metric: '180K+',
                    label: 'Railcars managed with optimized repair scheduling',
                    company: 'GE Railcar Services'
                  },
                  {
                    metric: 'Reduced',
                    label: 'Aged inventory and increased on-time shipments',
                    company: 'Large Sawmill Operations'
                  }
                ].map((result) => (
                  <div
                    key={result.label}
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
        industryTags={['Heavy Industry']}
        title="Heavy Industry Success Stories"
        subtitle="See how heavy equipment and industrial manufacturers transformed their operations with RMDB."
      />

      <RelatedSolutions currentPath={Routes.HeavyEquipment} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to scale your production scheduling?
          </h2>
          <p className="mb-6 text-slate-600">
            Schedule a free consultation to see how RMDB can bring finite
            capacity scheduling to your multi-location operation.
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
