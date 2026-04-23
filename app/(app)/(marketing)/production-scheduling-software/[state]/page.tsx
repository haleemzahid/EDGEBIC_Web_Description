import * as React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CheckCircle, Factory, MapPin, Users, TrendingUp } from 'lucide-react';

import { IndustryPageJsonLd, FAQJsonLd } from '@/components/seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { createPageMetadata } from '@/lib/seo/metadata';
import { states, getStateBySlug } from '@/data/states';
import type { State } from '@/data/states';

// ---------------------------------------------------------------------------
// Static params — pre-render all state pages at build time
// ---------------------------------------------------------------------------
export async function generateStaticParams(): Promise<{ state: string }[]> {
  return states.map((s) => ({ state: s.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata per state
// ---------------------------------------------------------------------------
export async function generateMetadata(props: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await props.params;
  const stateData = getStateBySlug(slug);
  if (!stateData) return {};

  return createPageMetadata({
    title: `Production Scheduling Software in ${stateData.name}`,
    description: stateData.metaDescription,
    path: `/production-scheduling-software/${stateData.slug}`,
    keywords: `production scheduling software ${stateData.name}, manufacturing scheduling ${stateData.name}, ${stateData.topIndustries.slice(0, 3).join(', ').toLowerCase()} scheduling ${stateData.abbreviation}`
  });
}

// ---------------------------------------------------------------------------
// Helper: build FAQ data from state
// ---------------------------------------------------------------------------
function buildFaqs(s: State) {
  return [
    {
      question: `What manufacturing industries does RMDB support in ${s.name}?`,
      answer: `RMDB supports all manufacturing types common in ${s.name}, including ${s.topIndustries.slice(0, 4).join(', ')}. Our finite capacity scheduling engine adapts to any discrete or batch manufacturing environment regardless of industry.`
    },
    {
      question: `How quickly can ${s.name} manufacturers implement RMDB?`,
      answer: `Most ${s.name} manufacturers are up and running with RMDB in as few as 5 days. Unlike enterprise APS systems that take months to deploy, RMDB integrates with your existing ERP via CSV or database connections and requires minimal IT involvement.`
    },
    {
      question: `Does RMDB integrate with ERP systems used by ${s.name} manufacturers?`,
      answer: `Yes. RMDB integrates with SAP, Oracle, Epicor, Sage, Microsoft Dynamics, and other ERP systems commonly used by ${s.name} manufacturers. It works as a scheduling add-on that fills the capacity planning gap in your existing ERP.`
    },
    {
      question: `What is the cost of production scheduling software for ${s.name} manufacturers?`,
      answer: `RMDB offers a one-time license fee starting at $4,000 — not a monthly subscription. This makes it uniquely affordable for small to mid-size ${s.name} manufacturers compared to SaaS alternatives that cost $500-2,000 per month indefinitely.`
    },
    {
      question: `Can RMDB handle the scheduling challenges specific to ${s.name}?`,
      answer: `Absolutely. ${s.schedulingChallenges[0]} RMDB's finite capacity scheduling, what-if analysis, and real-time rescheduling capabilities are designed to handle exactly these kinds of challenges.`
    }
  ];
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function StatePage(props: {
  params: Promise<{ state: string }>;
}): Promise<React.JSX.Element> {
  const { state: slug } = await props.params;
  const stateData = getStateBySlug(slug);
  if (!stateData) notFound();

  const faqs = buildFaqs(stateData);

  return (
    <>
      <IndustryPageJsonLd
        title={`Production Scheduling Software for ${stateData.name} Manufacturers`}
        description={stateData.metaDescription}
        url={`/production-scheduling-software/${stateData.slug}`}
        industryName={`${stateData.name} Manufacturing`}
        industryDescription={`Manufacturing operations in ${stateData.name} spanning ${stateData.topIndustries.slice(0, 3).join(', ')}, and more.`}
      />
      <FAQJsonLd questions={faqs} />

      <div className="min-h-screen text-[18px]">
        {/* Hero Section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-sm font-medium text-cyan-700">
                <MapPin className="size-4" />
                {stateData.name} ({stateData.abbreviation})
              </div>
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                {stateData.heroHeading}
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                {stateData.heroSubheading}
              </p>
            </div>
          </div>
        </section>

        {/* Key Stats */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-white p-6 text-center">
                <Users className="mx-auto mb-2 size-6 text-cyan-600" />
                <p className="text-2xl font-bold text-slate-900">
                  {stateData.manufacturingEmployment}
                </p>
                <p className="text-sm text-slate-600">Manufacturing jobs</p>
              </div>
              <div className="rounded-lg border bg-white p-6 text-center">
                <TrendingUp className="mx-auto mb-2 size-6 text-cyan-600" />
                <p className="text-2xl font-bold text-slate-900">
                  #{stateData.manufacturingGdpRank}
                </p>
                <p className="text-sm text-slate-600">
                  Manufacturing GDP rank
                </p>
              </div>
              <div className="rounded-lg border bg-white p-6 text-center">
                <Factory className="mx-auto mb-2 size-6 text-cyan-600" />
                <p className="text-2xl font-bold text-slate-900">
                  {stateData.topIndustries.length}+
                </p>
                <p className="text-sm text-slate-600">
                  Key manufacturing sectors
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Overview */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Manufacturing in {stateData.name}
              </h2>
              <ul className="space-y-3">
                {stateData.keyFacts.map((fact) => (
                  <li
                    key={fact}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-cyan-500" />
                    {fact}
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-slate-900">
                Top Industries
              </h3>
              <div className="flex flex-wrap gap-2">
                {stateData.topIndustries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
                  >
                    {industry}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-slate-900">
                Major Manufacturing Hubs
              </h3>
              <div className="flex flex-wrap gap-2">
                {stateData.majorManufacturingCities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm text-cyan-700"
                  >
                    <MapPin className="size-3" />
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scheduling Challenges */}
        <section className="bg-slate-50 py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Scheduling Challenges for {stateData.name} Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                {stateData.name} manufacturers face unique production scheduling
                challenges shaped by the state&apos;s industrial mix, workforce
                dynamics, and supply chain geography.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {stateData.schedulingChallenges.map((challenge) => (
                  <li
                    key={challenge}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-red-400" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How RMDB Helps */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                How RMDB Helps {stateData.name} Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB by User Solutions delivers finite capacity scheduling that
                addresses the exact challenges {stateData.name} manufacturers
                face — with a one-time license fee and 5-day implementation.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Finite capacity scheduling across machines, labor, and materials',
                  'Drag-and-drop Gantt charts with EDGEBI for visual scheduling',
                  'What-if scenario analysis for demand volatility and disruptions',
                  'ERP integration with SAP, Oracle, Epicor, Sage, and more',
                  'One-time license — no monthly subscription fees',
                  '5-day implementation — not months',
                  'Multi-constraint scheduling for complex manufacturing environments',
                  'Real-time rescheduling when priorities shift'
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

        {/* Results / Social Proof */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Trusted by Manufacturers Nationwide
              </h2>
              <div className="grid gap-6 md:grid-cols-4">
                {[
                  { metric: '35+', label: 'Years serving manufacturers' },
                  {
                    metric: '5 Days',
                    label: 'Average implementation time'
                  },
                  { metric: '100+', label: 'Manufacturer implementations' },
                  {
                    metric: '$4,000',
                    label: 'One-time license (not SaaS)'
                  }
                ].map((result) => (
                  <div
                    key={result.label}
                    className="rounded-lg border bg-white p-6 text-center"
                  >
                    <p className="mb-2 text-2xl font-bold text-cyan-600">
                      {result.metric}
                    </p>
                    <p className="text-sm text-gray-700">{result.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-slate-500">
                Customers include GE, Cummins, BAE Systems, US Navy, and
                hundreds of small to mid-size manufacturers.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Production Scheduling FAQ for {stateData.name}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
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

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900">
              Ready to optimize your {stateData.name} manufacturing schedule?
            </h2>
            <p className="mb-6 text-slate-600">
              Join manufacturers across {stateData.name} who trust RMDB for
              finite capacity production scheduling.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
              >
                Schedule a Free Demo
              </Link>
              <Link
                href="/product-downloads"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              >
                Download Free Trial
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links to Related Content */}
        <section className="py-10">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Learn More About Production Scheduling
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/resource-manager-db-2"
                className="rounded-lg border p-4 transition-colors hover:border-cyan-300 hover:bg-cyan-50"
              >
                <p className="font-semibold text-slate-900">
                  RMDB Product Overview
                </p>
                <p className="text-sm text-slate-600">
                  Full-featured finite capacity scheduling software
                </p>
              </Link>
              <Link
                href="/edgebi"
                className="rounded-lg border p-4 transition-colors hover:border-cyan-300 hover:bg-cyan-50"
              >
                <p className="font-semibold text-slate-900">
                  EDGEBI Visual Scheduling
                </p>
                <p className="text-sm text-slate-600">
                  Interactive Gantt charts with drag-and-drop
                </p>
              </Link>
              <Link
                href="/features"
                className="rounded-lg border p-4 transition-colors hover:border-cyan-300 hover:bg-cyan-50"
              >
                <p className="font-semibold text-slate-900">
                  All Features
                </p>
                <p className="text-sm text-slate-600">
                  Finite capacity, MRP, ERP integration, and more
                </p>
              </Link>
              <Link
                href="/success-stories"
                className="rounded-lg border p-4 transition-colors hover:border-cyan-300 hover:bg-cyan-50"
              >
                <p className="font-semibold text-slate-900">
                  Customer Success Stories
                </p>
                <p className="text-sm text-slate-600">
                  Real results from GE, US Navy, BAE Systems, and more
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
