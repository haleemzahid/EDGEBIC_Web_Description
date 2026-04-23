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
  title: 'Job Shop Scheduling Software',
  description:
    'Purpose-built scheduling software for job shops. Handle high-mix, low-volume production with finite capacity scheduling, what-if analysis, and real-time capacity visibility. Trusted by Technical Glass Products, Turner Bicycles, and more.',
  path: '/scheduling-software-for-job-shops',
  keywords:
    'job shop scheduling software, job shop management software, job shop software, shop scheduling software, job shop production planning, custom manufacturing scheduling, high-mix low-volume scheduling, finite capacity scheduling job shop, make-to-order scheduling software, job shop capacity planning'
});

const FAQS = [
  {
    question: 'What is job shop scheduling software?',
    answer:
      'Job shop scheduling software is a specialized production planning tool designed for custom and make-to-order manufacturers. Unlike flow-shop or repetitive manufacturing systems, job shop software handles the high variability of environments where every order may follow a unique routing through shared workcenters. It manages complex constraints like machine availability, labor skills, tooling, and material dependencies to create realistic, achievable production schedules.'
  },
  {
    question: 'How does finite capacity scheduling help job shops?',
    answer:
      'Finite capacity scheduling considers all real-world constraints — machines, labor, materials, and tools — simultaneously. It never over-allocates resources, creating realistic and achievable schedules. This means you can give customers accurate delivery dates and identify bottlenecks before they cause delays. For job shops with shared resources across many active jobs, this eliminates the guesswork of manual scheduling.'
  },
  {
    question: 'Can RMDB integrate with my existing ERP system?',
    answer:
      'Yes, RMDB is designed to work alongside your existing ERP as a scheduling add-on. It imports data from Excel, CSV, databases, and direct ERP connections including SAP, Oracle, Epicor, Sage, JobBOSS, and more. Many job shops use RMDB to add finite capacity scheduling without replacing their current shop management software. The integration is bi-directional, so schedule updates flow back to your ERP.'
  },
  {
    question: 'How quickly can a job shop implement RMDB?',
    answer:
      'Most job shop implementations are completed in days to weeks, not months. Because RMDB works with your existing data and adapts to your processes, setup is significantly faster than traditional scheduling software. One customer — Homestead Furniture, an Amish job shop — reduced their scheduling time from 40 hours per week to just 2 hours within weeks of implementation.'
  },
  {
    question: 'What size job shop is RMDB designed for?',
    answer:
      'RMDB scales from small job shops with 5-10 machines to large operations with hundreds of resources across multiple locations. The software handles from dozens to thousands of active jobs simultaneously. Whether you are a 10-person tool-and-die shop or a 200-person contract manufacturer, RMDB adapts to your scale and complexity.'
  },
  {
    question: 'How is RMDB different from scheduling in my ERP?',
    answer:
      'Most ERP systems use infinite capacity scheduling, which assumes unlimited resources and creates unrealistic plans. RMDB uses true finite capacity scheduling that respects every constraint on your shop floor. It also provides visual Gantt charts, drag-and-drop rescheduling, and what-if scenario analysis — capabilities that typical ERP scheduling modules lack. RMDB complements your ERP rather than replacing it.'
  }
];

export default function JobShopSchedulingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Job Shop Scheduling Software"
        description="Purpose-built job shop scheduling software for high-mix, low-volume manufacturers. Finite capacity scheduling, what-if analysis, and ERP integration."
        url="/scheduling-software-for-job-shops"
        industryName="Job Shop Manufacturing"
        industryDescription="Custom and make-to-order manufacturing with high product mix, variable routings, and shared workcenters requiring finite capacity scheduling."
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
                realistic schedules — not theoretical ones. RMDB is the job shop
                management software trusted by manufacturers for over 30 years.
              </p>
            </div>
          </div>
        </section>

        {/* Why Job Shops Need Specialized Software */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Why Job Shops Need Specialized Scheduling Software
              </h2>
              <p className="leading-relaxed text-gray-700">
                Job shops operate differently from repetitive or flow-shop manufacturers.
                Every customer order can have a unique routing, different resource requirements,
                and unpredictable lead times. Generic ERP scheduling modules use infinite
                capacity planning that ignores real-world constraints, producing schedules
                that fall apart on the shop floor. Job shop software like RMDB is built
                specifically for this complexity.
              </p>
              <p className="leading-relaxed text-gray-700">
                Whether you run a machine shop, tool-and-die operation, sheet metal
                fabricator, or custom parts manufacturer, your scheduling challenges
                are fundamentally different from assembly-line production. You need
                shop scheduling software that understands shared resources, variable
                routings, and the constant flux of priorities that define job shop
                manufacturing.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Common Job Shop Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Job shops face unique scheduling complexities that generic ERP
                systems simply cannot handle. Every order may follow a different
                routing, demand is unpredictable, and resources are shared across
                dozens of active jobs. If any of these sound familiar, you need
                dedicated job shop scheduling software:
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Volatile order mix with constantly changing priorities',
                  'Manual scheduling consuming 40+ hours per week',
                  'Late deliveries damaging customer relationships',
                  'No visibility into true capacity constraints',
                  'Inability to answer "what if" questions about new orders',
                  'Existing ERP lacks realistic finite capacity scheduling',
                  'Overbooking resources leads to bottlenecks and overtime',
                  'Cannot accurately quote delivery dates for new customer orders'
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
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                How RMDB Solves Job Shop Scheduling
              </h2>
              <p className="leading-relaxed text-gray-700">
                Resource Manager DB (RMDB) was built for the reality of job shop
                manufacturing. As purpose-built job shop management software, it considers
                all constraints simultaneously — machines, labor, materials, and
                tooling — to create schedules that actually work on the shop floor.
                Unlike generic scheduling tools, RMDB handles the variable routings,
                shared workcenters, and priority changes that define job shop operations.
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

        {/* How It Works Section */}
        <section className="bg-white py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">
                How Job Shop Software Works With Your Existing Systems
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB is designed to complement — not replace — your existing shop
                management software or ERP system. It works as a powerful{' '}
                <Link href={Routes.ErpSchedulingAddOn} className="text-cyan-600 hover:underline">
                  scheduling add-on for your ERP
                </Link>{' '}
                that fills the gap between basic planning and true finite capacity
                scheduling. Here is how the integration works:
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border bg-slate-50 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-slate-900">
                    1. Import Your Data
                  </h3>
                  <p className="text-gray-700">
                    Pull orders, routings, and resource data from your ERP, Excel
                    spreadsheets, or databases. RMDB connects to SAP, Oracle, Epicor,
                    Sage, JobBOSS, and virtually any system via CSV or ODBC.
                  </p>
                </div>
                <div className="rounded-lg border bg-slate-50 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-slate-900">
                    2. Schedule Automatically
                  </h3>
                  <p className="text-gray-700">
                    RMDB schedules all jobs against real finite capacity using your
                    actual machines, labor pools, and material availability. The
                    result is a realistic, achievable plan — not an infinite capacity
                    fantasy.
                  </p>
                </div>
                <div className="rounded-lg border bg-slate-50 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-slate-900">
                    3. Visualize and Adjust
                  </h3>
                  <p className="text-gray-700">
                    Use{' '}
                    <Link href={Routes.Edgebi} className="text-cyan-600 hover:underline">
                      EDGEBI Gantt charts
                    </Link>{' '}
                    to visualize the schedule, drag-and-drop to reprioritize, and run{' '}
                    <Link href={Routes.WhatIfAnalysis} className="text-cyan-600 hover:underline">
                      what-if scenarios
                    </Link>{' '}
                    to evaluate new orders before committing to delivery dates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Capabilities for Job Shops */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Key Capabilities for Job Shop Management
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Finite Capacity Scheduling
                  </h3>
                  <p className="text-gray-700">
                    Schedule every job against actual machine and{' '}
                    <Link href={Routes.LaborScheduling} className="text-cyan-600 hover:underline">
                      labor capacity
                    </Link>
                    . RMDB never overbooks a resource, so your schedule reflects
                    what can actually happen on the shop floor. This is especially critical
                    for job shops where shared workcenters create complex dependencies
                    between jobs.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    What-If Scenario Planning
                  </h3>
                  <p className="text-gray-700">
                    Before accepting a rush order, see exactly how it impacts your
                    existing schedule. RMDB lets you model unlimited scenarios without
                    affecting your live schedule. One job shop — Turner Suspension
                    Bicycles — used this feature to secure their largest customer order
                    by showing the client a realistic delivery timeline.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Multi-Constraint Resource Planning
                  </h3>
                  <p className="text-gray-700">
                    Job shops often need a specific operator AND a specific machine AND
                    the right tooling for a given operation. RMDB schedules across all
                    constraint types simultaneously — machines, labor skills, tooling,
                    materials, and{' '}
                    <Link href={Routes.BomSoftware} className="text-cyan-600 hover:underline">
                      bills of materials
                    </Link>
                    . No more scheduling a machine only to discover the operator is
                    already assigned elsewhere.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    On-Time Delivery Improvement
                  </h3>
                  <p className="text-gray-700">
                    Late deliveries are the number-one complaint in job shops. By creating
                    realistic schedules that respect capacity constraints, RMDB helps
                    you commit to delivery dates you can actually meet. Manufacturers
                    using RMDB have improved{' '}
                    <Link href={Routes.OnTimeDelivery} className="text-cyan-600 hover:underline">
                      on-time delivery
                    </Link>{' '}
                    from as low as 30% to over 90%.
                  </p>
                </div>
              </div>
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
                    metric: '30→90%',
                    label: 'On-time shipping improvement',
                    company: 'Repair Shop Customer'
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

        {/* Industries Served */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Types of Job Shops Using RMDB
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB serves a wide range of job shop and custom manufacturing operations.
                Any shop that deals with variable routings, shared resources, and
                make-to-order production can benefit from dedicated job shop software:
              </p>
              <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {[
                  'CNC machine shops and precision machining',
                  'Tool-and-die and mold making',
                  'Sheet metal fabrication shops',
                  'Custom woodworking and furniture manufacturing',
                  'Contract manufacturing and subcontracting',
                  'Specialty glass and materials processing',
                  'Repair and overhaul operations',
                  'Prototype and short-run production',
                  'Multi-process metal fabrication'
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <CheckCircle className="size-4 shrink-0 text-cyan-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Frequently Asked Questions About Job Shop Scheduling Software
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

      <RelatedSolutions currentPath={Routes.JobShopScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to take control of your job shop schedule?
          </h2>
          <p className="mb-6 text-slate-600">
            Schedule a free live demo — we can even use your own data to show
            how RMDB works for your specific operations. See why job shops
            across North America trust RMDB for production scheduling.
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
