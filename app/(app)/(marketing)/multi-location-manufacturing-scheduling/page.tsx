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
  title: 'Multi-Location Manufacturing Scheduling | Multi-Site Production Planning',
  description:
    'Multi-location manufacturing scheduling software proven at Cummins Engine (33 U.S. sites), GE Railcar (all U.S. and Canada repair shops), and Sleepmaster (Australia + China). Schedule across multiple sites with unified capacity visibility.',
  path: '/multi-location-manufacturing-scheduling',
  keywords:
    'multi-location manufacturing scheduling, multi-site production planning, multi-plant scheduling software, multi-facility manufacturing, distributed manufacturing scheduling, multi-location capacity planning, factory network scheduling'
});

const FAQS = [
  {
    question: 'How many locations can RMDB schedule simultaneously?',
    answer:
      'RMDB has been proven across 33+ locations. Cummins Engine uses it across 33 U.S. locations for labor and machine scheduling with 6-month planning horizons. GE Railcar Services deployed it across all major repair shops throughout the U.S. and Canada. There is no hard limit on the number of locations.'
  },
  {
    question: 'Can RMDB support international multi-location operations?',
    answer:
      'Yes. Sleepmaster Ltd uses RMDB across operations in Australia and China. The Chinese greenfield operation was set up by one person part-time and is now run by a local manager who had no prior manufacturing experience — demonstrating that RMDB can be deployed internationally with minimal resources.'
  },
  {
    question: 'How does multi-location scheduling handle different site configurations?',
    answer:
      'Each location can have its own workcenters, labor pools, production calendars, and routing configurations. RMDB supports the reality that different sites have different capabilities, shifts, and resource mixes while providing unified visibility across the entire operation.'
  },
  {
    question: 'Can I see capacity across all locations in one view?',
    answer:
      'Yes. With EDGEBI (the graphical overlay for RMDB), you get interactive Gantt charts, heat maps, and capacity utilization views across all locations. Multi-user access with configurable permissions means each site manager sees their operation while management gets the full picture.'
  }
];

export default function MultiLocationSchedulingPage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="Multi-Location Manufacturing Scheduling"
        description="Multi-site production scheduling software proven across 33+ locations with unified capacity visibility and international deployment capability."
        url="/multi-location-manufacturing-scheduling"
        featureDescription="Multi-location manufacturing scheduling with per-site configuration, unified capacity visibility, and rapid international deployment for distributed manufacturing operations."
        featureList={[
          'Multi-Site Scheduling',
          'Per-Location Configuration',
          'Unified Capacity Visibility',
          'International Deployment',
          'Multi-User Access Control',
          'Site-Specific Calendars',
          'Cross-Location Reporting',
          'Rapid New Site Deployment'
        ]}
        customerNames={[
          'Cummins Engine',
          'GE Railcar Services',
          'Sleepmaster Ltd'
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
                Multi-Location Manufacturing Scheduling
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                From 33 U.S. locations to international operations in Australia
                and China. Production scheduling that scales across your entire
                manufacturing network — with unified capacity visibility at
                every level.
              </p>
            </div>
          </div>
        </section>

        {/* Scale Proof */}
        <section className="border-y bg-slate-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 text-center md:grid-cols-3">
              {[
                {
                  metric: '33 Locations',
                  label: 'Labor and machine scheduling across U.S. sites',
                  company: 'Cummins Engine'
                },
                {
                  metric: 'U.S. + Canada',
                  label: 'All major repair shops with 180,000+ unit fleet',
                  company: 'GE Railcar Services'
                },
                {
                  metric: 'Australia + China',
                  label: 'International expansion with rapid site deployment',
                  company: 'Sleepmaster Ltd'
                }
              ].map((proof) => (
                <div key={proof.company}>
                  <p className="text-2xl font-bold text-cyan-600">
                    {proof.metric}
                  </p>
                  <p className="text-sm text-gray-700">{proof.label}</p>
                  <p className="text-xs font-medium text-slate-500">
                    {proof.company}
                  </p>
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
                Multi-Location Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Multi-location manufacturers face scheduling complexity that
                compounds with every site. Different workcenters, different
                labor pools, different shift patterns — all needing coordination
                for realistic customer promises and efficient resource
                utilization across the network.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'No unified scheduling visibility across manufacturing sites',
                  'Each location using different tools (or no tools) for planning',
                  'Inability to evaluate cross-location capacity for new orders',
                  'New site deployment taking months with traditional ERP scheduling',
                  'Different sites with different workcenters, shifts, and capabilities',
                  'Management blind to network-wide bottlenecks and capacity gaps'
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
                How RMDB Schedules Across Multiple Locations
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB provides each location with its own scheduling
                configuration — workcenters, labor pools, production calendars,
                and routing rules — while giving management unified visibility
                across the entire network. New sites can be deployed in days,
                not months, even in international greenfield operations.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Per-site workcenter, labor, and calendar configuration',
                  'Unified capacity visibility across all manufacturing locations',
                  'Multi-month planning horizons (6+ months for workforce planning)',
                  'New site deployment in days — even internationally',
                  'Multi-user access with site-level and management-level permissions',
                  'Works with existing site-level ERP systems',
                  'Heat map and utilization views across all locations (EDGEBI)',
                  'Scalable from 2 sites to 33+ with no architecture changes'
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

        {/* Testimonials */}
        <section className="bg-gradient-to-br from-slate-50 to-cyan-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="text-center">
                <Quote className="mx-auto mb-4 size-8 text-cyan-400" />
                <blockquote className="mb-4 text-lg italic leading-relaxed text-slate-700">
                  &ldquo;We like the ability to define load and select a
                  realistic promise date for our customers — we have already
                  seen an increase in customer satisfaction.&rdquo;
                </blockquote>
                <p className="font-semibold text-slate-900">
                  Joe Van Wagner, Production Manager
                </p>
                <p className="text-sm text-slate-500">
                  Cummins Engine — 33 U.S. locations
                </p>
              </div>
              <div className="text-center">
                <blockquote className="mb-4 text-lg italic leading-relaxed text-slate-700">
                  &ldquo;RMDB required one individual very much part time (me)
                  to set up on the critical areas for China and is now being
                  run by a young Chinese manager who had no manufacturing
                  experience.&rdquo;
                </blockquote>
                <p className="font-semibold text-slate-900">
                  Jim Steel, Operations Manager
                </p>
                <p className="text-sm text-slate-500">
                  Sleepmaster Ltd — Australia + China
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Multi-Location Results
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    metric: '33 Sites',
                    label:
                      'Labor scheduling with 6-month planning horizon across all U.S. locations',
                    company: 'Cummins Engine'
                  },
                  {
                    metric: '30→90%',
                    label:
                      'On-time shipping improvement across all U.S. and Canada repair shops',
                    company: 'GE Railcar Services'
                  },
                  {
                    metric: 'Part-Time',
                    label:
                      'International site deployed by one person, now run by local manager',
                    company: 'Sleepmaster Ltd'
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
        industryTags={['Heavy Industry', 'Consumer Goods']}
        title="Multi-Location Success Stories"
        subtitle="See how multi-site manufacturers achieved unified scheduling across their operations."
        limit={6}
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to unify scheduling across your locations?
          </h2>
          <p className="mb-6 text-slate-600">
            See how RMDB can bring finite capacity scheduling to your entire
            multi-location operation. Schedule a free consultation today.
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
