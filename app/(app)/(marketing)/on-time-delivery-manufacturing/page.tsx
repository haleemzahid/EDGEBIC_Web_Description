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
  title: 'On-Time Delivery Manufacturing Software',
  description:
    'Improve manufacturing on-time delivery from 30% to 90%+ with finite capacity scheduling. GE Railcar tripled on-time shipping. Technical Glass Products cut lead times by 2 weeks. Realistic promise dates based on actual capacity.',
  path: '/on-time-delivery-manufacturing',
  keywords:
    'on-time delivery manufacturing, improve OTD manufacturing, on-time shipping improvement, manufacturing delivery performance, realistic promise dates, reduce late deliveries manufacturing, on-time delivery software, manufacturing OTD improvement'
});

const FAQS = [
  {
    question: 'How does scheduling software improve on-time delivery?',
    answer:
      'Poor on-time delivery usually comes from scheduling against infinite capacity — promising dates your shop floor cannot achieve. RMDB uses finite capacity scheduling to produce realistic promise dates based on actual machine, labor, and material availability. GE Railcar Services went from 30% to over 90% on-time shipping after implementing finite capacity scheduling.'
  },
  {
    question: 'What causes poor on-time delivery in manufacturing?',
    answer:
      'The root cause is almost always unrealistic scheduling. When your ERP or spreadsheet schedules to infinite capacity, it overbooks resources, producing delivery dates that your shop floor cannot meet. ACE Controls identified that their scheduling "could not model different scenarios to determine if a certain method or schedule can actually benefit our bottom line" — leading to missed deliveries.'
  },
  {
    question: 'How quickly can I see on-time delivery improvements?',
    answer:
      'Improvements can be immediate. Once RMDB produces a finite capacity schedule with realistic dates, your team stops chasing impossible deadlines and focuses on executing achievable plans. Plastilite Corporation went from no scheduling to a fully optimized schedule in 5 days. The shift from reactive firefighting to proactive planning begins immediately.'
  },
  {
    question: 'Can RMDB help identify why deliveries are late?',
    answer:
      'Yes. RMDB provides downtime analysis and reporting, bottleneck identification, and capacity utilization tracking. You can see which workcenters are overbooked, which skills are in short supply, and where material shortages are blocking production — then address root causes rather than symptoms.'
  }
];

export default function OnTimeDeliveryPage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="On-Time Delivery Improvement for Manufacturing"
        description="Manufacturing on-time delivery improvement through finite capacity scheduling, realistic promise dates, and bottleneck identification."
        url="/on-time-delivery-manufacturing"
        featureDescription="On-time delivery improvement through finite capacity scheduling that produces realistic promise dates, identifies bottlenecks, and eliminates overbooking."
        featureList={[
          'Finite Capacity Scheduling',
          'Realistic Promise Dates',
          'Bottleneck Identification',
          'Workcenter Capacity Tracking',
          'Downtime Analysis',
          'Lead Time Reduction',
          'Overbooking Prevention',
          'Customer Satisfaction Improvement'
        ]}
        customerNames={[
          'GE Railcar Services',
          'Technical Glass Products',
          'ACE Controls',
          'Cummins Engine',
          'GEMS Healthcare Solutions'
        ]}
      />
      <FAQJsonLd
        questions={FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />

      <div className="min-h-screen text-[18px]">
        {/* Hero */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                From 30% to 90% On-Time Delivery
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Late deliveries are not a shop floor problem — they are a
                scheduling problem. When your schedule reflects real capacity,
                your promises become achievable. GE Railcar Services tripled
                on-time shipping with one change: finite capacity scheduling.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="border-y bg-slate-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center md:grid-cols-4">
              {[
                { metric: '30→90%', label: 'On-time shipping', company: 'GE Railcar' },
                { metric: '2 Weeks', label: 'Lead time reduction', company: 'Technical Glass' },
                { metric: '4%', label: 'Capacity increase', company: 'Technical Glass' },
                { metric: 'Increased', label: 'Customer satisfaction', company: 'Cummins Engine' }
              ].map((stat) => (
                <div key={stat.label + stat.company}>
                  <p className="text-2xl font-bold text-cyan-600">
                    {stat.metric}
                  </p>
                  <p className="text-sm text-gray-700">{stat.label}</p>
                  <p className="text-xs text-slate-500">{stat.company}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Root Cause */}
        <section className="pt-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                The Real Cause of Late Deliveries
              </h2>
              <p className="leading-relaxed text-gray-700">
                Late deliveries are almost never caused by lazy workers or bad
                machines. They are caused by unrealistic schedules. When your
                system schedules to infinite capacity, it promises dates that
                your shop floor cannot achieve — creating a cycle of
                expediting, overtime, and disappointed customers.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Infinite capacity scheduling produces unachievable delivery dates',
                  'Overbooking workcenters creates cascading delays across all jobs',
                  'No visibility into bottlenecks until production is already late',
                  'Firefighting and expediting consume resources that should be producing',
                  'Customer trust eroding from repeated missed promise dates',
                  'Lead times inflating as buffers are added to cover scheduling failures'
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
                How RMDB Fixes On-Time Delivery
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB attacks the root cause: unrealistic scheduling. By
                scheduling to finite capacity — machines, labor, materials, and
                tooling simultaneously — it produces promise dates your shop
                floor can actually hit. Bottlenecks are identified before they
                delay shipments. Overbooking is eliminated. Your team shifts
                from firefighting to executing.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Finite capacity scheduling eliminates overbooking',
                  'Realistic promise dates based on actual resource availability',
                  'Bottleneck identification before they impact delivery',
                  'Workcenter capacity tracking and level loading',
                  'What-if analysis before accepting new commitments',
                  'Downtime analysis and reporting for root cause identification',
                  'Lead time reduction through schedule optimization',
                  'Cycle time improvement through process visibility',
                  'Reduced aged inventory through better schedule accuracy',
                  'Customer satisfaction through reliable promise dates'
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
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="text-center">
                <Quote className="mx-auto mb-4 size-8 text-cyan-400" />
                <blockquote className="mb-4 text-lg italic leading-relaxed text-slate-700">
                  &ldquo;Over the past several years, RMDB has successfully
                  helped our repair network to improve the Shipping On-Time
                  accuracy from 30% to over 90%. Additionally, we have
                  improved our overall shop cycle time by several days.&rdquo;
                </blockquote>
                <p className="font-semibold text-slate-900">
                  Dan Barich, Manager of Process Engineering
                </p>
                <p className="text-sm text-slate-500">GE Railcar Services</p>
              </div>
              <div className="text-center">
                <blockquote className="mb-4 text-lg italic leading-relaxed text-slate-700">
                  &ldquo;Setting accurate customer expectations has been the
                  greatest benefit. We are able to track problem areas and get
                  good feedback on potential bottlenecks before they
                  happen.&rdquo;
                </blockquote>
                <p className="font-semibold text-slate-900">
                  Shavonna Portue, Director
                </p>
                <p className="text-sm text-slate-500">GEMS Healthcare Solutions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                On-Time Delivery Improvements
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '30→90%',
                    label: 'On-time shipping tripled across all repair shops',
                    company: 'GE Railcar Services'
                  },
                  {
                    metric: '2 Weeks',
                    label: 'Lead time shaved off deliverables while growing 4%',
                    company: 'Technical Glass Products'
                  },
                  {
                    metric: 'Improved',
                    label: 'On-time delivery through better schedule modeling',
                    company: 'ACE Controls'
                  },
                  {
                    metric: 'Increased',
                    label: 'Customer satisfaction from realistic promise dates',
                    company: 'Cummins Engine'
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

        {/* FAQ */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, index) => (
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
      </div>

      <IndustrySuccessStories
        industryTags={['Heavy Industry', 'Job Shop', 'Electronics', 'Consumer Goods']}
        title="On-Time Delivery Success Stories"
        subtitle="See how manufacturers dramatically improved their on-time delivery with RMDB."
        limit={6}
      />

      <RelatedSolutions currentPath={Routes.OnTimeDelivery} />

      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fix your on-time delivery?
          </h2>
          <p className="mb-6 text-slate-600">
            See how finite capacity scheduling transforms your delivery
            performance. Schedule a free demo with your own data.
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
