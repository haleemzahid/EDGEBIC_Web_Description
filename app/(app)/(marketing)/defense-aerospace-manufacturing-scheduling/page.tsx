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
  title: 'Defense & Aerospace Manufacturing Scheduling Software',
  description:
    'Production scheduling software for defense and aerospace manufacturers. Handle 26,000+ maintenance tasks, multi-year planning horizons, and complex compliance requirements. Trusted by the US Navy and BAE Systems.',
  path: '/defense-aerospace-manufacturing-scheduling',
  keywords:
    'defense manufacturing scheduling software, aerospace production planning, military maintenance scheduling, aircraft maintenance scheduling software, finite capacity planning defense, defense production scheduling'
});

const FAQS = [
  {
    question:
      'How does RMDB handle the scale of defense manufacturing operations?',
    answer:
      'RMDB has been proven at the largest scale in defense — scheduling over 26,000 preventive maintenance tasks plus 5,000 corrective jobs aboard the USS Nimitz aircraft carrier, with 400+ users across 10 disparate databases. The system handles multi-year scheduling horizons with finite capacity constraints across hundreds of resources.'
  },
  {
    question: 'Does RMDB require special security clearance or IT approval?',
    answer:
      'RMDB runs on standard Windows and leverages Excel-based data integration, which means it operates within standard desktop environments. This avoids the lengthy software quarantine and security testing process that proprietary platforms often require in defense settings, and can typically be procured with discretionary funding.'
  },
  {
    question:
      'Can RMDB integrate with legacy defense ERP and maintenance systems?',
    answer:
      'Yes. RMDB is designed to pull data from multiple disparate systems via Excel, CSV, ODBC, and database connections. In the USS Nimitz implementation, it successfully aggregated scheduling data from 10 separate databases that had no native way to communicate with each other.'
  },
  {
    question:
      'How does RMDB handle both preventive and corrective maintenance scheduling?',
    answer:
      'RMDB supports scheduling both planned preventive maintenance programs and unplanned corrective jobs. It uses finite capacity scheduling with level loading to prevent resource over-allocation, and what-if scenario analysis to evaluate the impact of inserting urgent corrective work into existing schedules.'
  }
];

export default function DefenseAerospacePage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Defense & Aerospace Manufacturing Scheduling Software"
        description="Production scheduling for defense and aerospace manufacturers with multi-year horizons and complex compliance needs."
        url="/defense-aerospace-manufacturing-scheduling"
        industryName="Defense & Aerospace Manufacturing"
        industryDescription="Military and aerospace manufacturing operations requiring large-scale scheduling, compliance, and multi-system integration."
        customerNames={['US Navy', 'BAE Systems']}
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
                Production Scheduling for Defense & Aerospace Manufacturers
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Mission-critical scheduling at scale. From aircraft carrier
                maintenance to ordnance production — proven with the US Navy and
                BAE Systems.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Defense & Aerospace Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Defense and aerospace operations face scheduling challenges that
                go far beyond typical manufacturing. Multi-year planning
                horizons, disparate legacy systems, strict compliance
                requirements, and the sheer scale of operations demand a
                scheduling solution built for this reality.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Multi-year planning horizons (2+ years) with thousands of concurrent tasks',
                  'Disparate legacy databases that cannot natively communicate',
                  'Security and compliance requirements limiting software choices',
                  'ERP systems that lack finite capacity scheduling capabilities',
                  'Level-loading across hundreds of finite resources simultaneously',
                  'Urgent corrective work disrupting planned maintenance schedules'
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
                How RMDB Serves Defense & Aerospace
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB operates within standard desktop environments using
                Excel-based data integration — avoiding the lengthy software
                quarantine and security testing that proprietary platforms
                require. It aggregates data from multiple legacy systems and
                delivers finite capacity scheduling at a scale proven aboard the
                world&apos;s largest aircraft carrier.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Finite capacity scheduling with level loading across all resources',
                  'Aggregates data from 10+ disparate databases seamlessly',
                  'Supports 400+ concurrent users across departments',
                  'Multi-year scheduling horizons for preventive maintenance programs',
                  'What-if scenario analysis for urgent corrective work insertion',
                  'Standard Windows/Excel platform — no special IT approval needed',
                  'Bill-of-Resource backfill from existing legacy systems',
                  'Discretionary-fund-level pricing for faster procurement'
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
                Proven at the Highest Level
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    metric: '26,000+',
                    label:
                      'Preventive maintenance tasks scheduled with a 2-year horizon',
                    company: 'USS Nimitz — US Navy'
                  },
                  {
                    metric: '400+',
                    label:
                      'Concurrent users across 10 disparate database systems',
                    company: 'USS Nimitz — US Navy'
                  },
                  {
                    metric: 'Eliminated',
                    label:
                      'Production backlogs through systematic constraint identification',
                    company: 'BAE Systems'
                  },
                  {
                    metric: 'Reduced',
                    label:
                      'Outsourcing costs by optimizing internal capacity utilization',
                    company: 'BAE Systems'
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
        industryTags={['Defense', 'Aerospace']}
        title="Defense & Aerospace Success Stories"
        subtitle="See how defense and aerospace organizations trust RMDB for mission-critical scheduling."
      />

      <RelatedSolutions currentPath={Routes.DefenseAerospace} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Schedule a consultation for your defense program
          </h2>
          <p className="mb-6 text-slate-600">
            Learn how RMDB can bring finite capacity scheduling to your defense
            or aerospace operation — at any scale.
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
