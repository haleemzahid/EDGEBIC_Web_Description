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
    'Job Shop Scheduling Software | Finite Capacity Planning for Custom Manufacturers',
  description:
    'Purpose-built scheduling software for job shops. Handle high-mix, low-volume production with finite capacity scheduling, what-if analysis, and real-time capacity visibility. Trusted by Technical Glass Products, Turner Bicycles, and more.',
  path: '/scheduling-software-for-job-shops',
  keywords:
    'job shop scheduling software, job shop production planning, custom manufacturing scheduling, high-mix low-volume scheduling, finite capacity scheduling job shop, make-to-order scheduling software, job shop capacity planning'
});

const FAQS = [
  {
    question: 'What is job shop scheduling software?',
    answer:
      'Job shop scheduling software is a specialized tool that helps custom and make-to-order manufacturers plan and schedule production across shared workcenters. Unlike flow-shop systems, it handles the high variability of job shop environments where every order may follow a unique routing through the shop floor.'
  },
  {
    question: 'How does finite capacity scheduling help job shops?',
    answer:
      'Finite capacity scheduling considers all real-world constraints — machines, labor, materials, and tools — simultaneously. It never over-allocates resources, creating realistic and achievable schedules. This means you can give customers accurate delivery dates and identify bottlenecks before they cause delays.'
  },
  {
    question: 'Can RMDB integrate with my existing ERP system?',
    answer:
      'Yes, RMDB is designed to work alongside your existing ERP. It imports data from Excel, CSV, databases, and direct ERP connections (SAP, Oracle, Epicor, Sage, and more). Many job shops use RMDB as a powerful scheduling add-on without replacing their current system.'
  },
  {
    question: 'How quickly can a job shop implement RMDB?',
    answer:
      'Most job shop implementations are completed in days to weeks, not months. Because RMDB works with your existing data and adapts to your processes, setup is significantly faster than traditional scheduling software. One customer reduced their scheduling time from 40 hours per week to just 2 hours.'
  }
];

export default function JobShopSchedulingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Job Shop Scheduling Software"
        description="Purpose-built scheduling software for job shops handling high-mix, low-volume production."
        url="/scheduling-software-for-job-shops"
        industryName="Job Shop Manufacturing"
        industryDescription="Custom and make-to-order manufacturing with high product mix and variable routings."
        customerNames={[
          'Technical Glass Products',
          'Turner Suspension Bicycles',
          'Homestead Furniture',
          'ACE Controls'
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
                Job Shop Scheduling Software That Actually Works
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Stop firefighting. Start planning. Purpose-built finite capacity
                scheduling for high-mix, low-volume manufacturers who need
                realistic schedules — not theoretical ones.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Common Job Shop Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Job shops face unique scheduling complexities that generic ERP
                systems simply cannot handle. Every order may follow a different
                routing, demand is unpredictable, and resources are shared across
                dozens of active jobs. Sound familiar?
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Volatile order mix with constantly changing priorities',
                  'Manual scheduling consuming 40+ hours per week',
                  'Late deliveries damaging customer relationships',
                  'No visibility into true capacity constraints',
                  'Inability to answer "what if" questions about new orders',
                  'Existing ERP lacks realistic finite capacity scheduling'
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
                How RMDB Solves Job Shop Scheduling
              </h2>
              <p className="leading-relaxed text-gray-700">
                Resource Manager DB (RMDB) was built for the reality of job shop
                manufacturing. It considers all constraints simultaneously —
                machines, labor, materials, and tooling — to create schedules
                that actually work on the shop floor.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'True finite capacity scheduling across all resources',
                  'What-if scenario analysis to evaluate new orders before committing',
                  'Drag-and-drop visual scheduling with EDGEBI Gantt charts',
                  'Flexible Bill-of-Resources adapts to your unique routings',
                  'Mixed forward and reverse scheduling modes',
                  'Direct ERP integration via Excel, CSV, or ODBC',
                  'Multi-constraint planning (labor + machines + materials)',
                  'Real-time capacity visibility to prevent overbooking'
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
                Proven Results in Job Shop Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '4%',
                    label: 'Capacity increase without additional workforce',
                    company: 'Technical Glass Products'
                  },
                  {
                    metric: '40→2 hrs',
                    label: 'Weekly scheduling time reduction',
                    company: 'Homestead Furniture'
                  },
                  {
                    metric: 'Largest Order',
                    label: 'Secured with what-if Gantt chart analysis',
                    company: 'Turner Suspension Bicycles'
                  },
                  {
                    metric: 'On-Time',
                    label: 'Improved delivery through schedule visibility',
                    company: 'ACE Controls'
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
        industryTags={['Job Shop']}
        title="Job Shop Success Stories"
        subtitle="See how job shops transformed their production scheduling with RMDB."
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to take control of your job shop schedule?
          </h2>
          <p className="mb-6 text-slate-600">
            Schedule a free live demo — we can even use your own data to show
            how RMDB works for your specific operations.
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
