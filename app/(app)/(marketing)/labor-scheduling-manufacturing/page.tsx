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
  title: 'Labor Scheduling for Manufacturing | Workforce Capacity Planning',
  description:
    'Manufacturing labor scheduling software that plans workforce capacity alongside machines and materials. Cummins Engine schedules labor months ahead across 33 locations. INCON achieves accurate labor scheduling with realistic promise dates.',
  path: '/labor-scheduling-manufacturing',
  keywords:
    'labor scheduling manufacturing, manufacturing workforce scheduling, labor capacity planning, workforce planning manufacturing, manufacturing labor management, production labor scheduling, skilled labor scheduling, workforce capacity software'
});

const FAQS = [
  {
    question: 'Why is labor scheduling critical for manufacturing?',
    answer:
      'A machine being available means nothing if the skilled labor to operate it is not. Most scheduling software only considers machine capacity, producing schedules that fail when labor is the real constraint. RMDB schedules labor alongside machines and materials simultaneously, ensuring every scheduled operation has the workforce available to execute it.'
  },
  {
    question: 'How far ahead can RMDB plan labor requirements?',
    answer:
      'RMDB supports labor planning horizons of 6 months or more. Cummins Engine uses it to plan labor across 33 U.S. locations several months in advance, enabling proactive workforce decisions — hiring, cross-training, overtime planning — before capacity shortfalls impact deliveries.'
  },
  {
    question: 'Can RMDB handle different labor skill types?',
    answer:
      'Yes. RMDB models labor as a scheduled resource with configurable skill types, availability calendars, and capacity limits. You can define welders, machinists, assemblers, or any skill category as a finite resource. The schedule only assigns work when both the machine and the required skilled labor are available.'
  },
  {
    question: 'How does labor scheduling improve customer promise dates?',
    answer:
      'INCON Incorporated uses RMDB for labor scheduling alongside their MRP system. The result: "Finally, we can see in advance how to staff the plant for most efficient scheduling and respond accurately to our customers with realistic promise dates." Cummins Engine has seen direct increases in customer satisfaction from labor-aware scheduling.'
  }
];

export default function LaborSchedulingPage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="Labor Scheduling for Manufacturing"
        description="Manufacturing labor scheduling software that plans workforce capacity alongside machines and materials for realistic production schedules."
        url="/labor-scheduling-manufacturing"
        featureDescription="Workforce capacity planning that schedules labor, machines, and materials as simultaneous constraints for achievable production schedules and realistic promise dates."
        featureList={[
          'Labor as Finite Capacity Resource',
          'Multi-Month Workforce Planning',
          'Skill-Based Scheduling',
          'Machine + Labor Simultaneous Scheduling',
          'Workforce Availability Calendars',
          'Overtime and Shift Planning',
          'Cross-Training Impact Analysis',
          'Staffing Requirement Visibility'
        ]}
        customerNames={[
          'Cummins Engine',
          'INCON Incorporated',
          'GEMS Healthcare Solutions',
          'Large Sawmill Operations'
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
                Labor Scheduling for Manufacturing
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Your best machine schedule is useless if the right people
                are not available. RMDB schedules labor alongside machines and
                materials — simultaneously — so every job has the workforce
                to execute on time.
              </p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="pt-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                The Hidden Scheduling Constraint: Labor
              </h2>
              <p className="leading-relaxed text-gray-700">
                Most production scheduling software treats labor as infinitely
                available. The schedule says a job runs on Tuesday — but the
                welder is booked, the assembler is on PTO, and the inspector is
                shared across three departments. The result: schedules that look
                perfect in software but fail on the shop floor.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Scheduling software that ignores labor availability entirely',
                  'Skilled labor shortages making machine-only schedules unrealistic',
                  'No visibility into future staffing needs until it is too late',
                  'Overtime costs from poor labor-capacity planning',
                  'Shared resources across departments with no coordinated scheduling',
                  'Unrealistic customer promise dates because labor is not factored in'
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
                How RMDB Schedules Labor
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB treats labor as a first-class scheduling constraint — just
                like machines, materials, and tooling. A job is only scheduled
                when ALL required resources are available, including the specific
                labor skills needed. This produces schedules your workforce can
                actually execute and staffing forecasts that enable proactive
                workforce decisions.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Labor scheduled as finite capacity alongside machines',
                  'Skill-type modeling (welders, machinists, assemblers, etc.)',
                  'Multi-month labor forecasting for proactive hiring decisions',
                  'Workforce availability calendars (shifts, PTO, training)',
                  'Shared resource scheduling across departments',
                  'Overtime impact analysis through what-if scenarios',
                  'Cross-training ROI evaluation before investing',
                  'Staffing requirement visibility months in advance',
                  'Maintenance staff scheduling around machine usage',
                  'Integration with existing labor tracking systems'
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
                  &ldquo;Finally, we can see in advance how to staff the plant
                  for most efficient scheduling and respond accurately to our
                  customers with realistic promise dates.&rdquo;
                </blockquote>
                <p className="font-semibold text-slate-900">Ted Schultz</p>
                <p className="text-sm text-slate-500">INCON Incorporated</p>
              </div>
              <div className="text-center">
                <blockquote className="mb-4 text-lg italic leading-relaxed text-slate-700">
                  &ldquo;We now know exactly what staffing requirements are
                  and can flex our workforce to fit the changing needs of our
                  customers.&rdquo;
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
                Labor Scheduling Results
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '33 Sites',
                    label:
                      'Labor scheduled months ahead across all U.S. locations',
                    company: 'Cummins Engine'
                  },
                  {
                    metric: 'Accurate',
                    label:
                      'Labor scheduling with realistic customer promise dates',
                    company: 'INCON Incorporated'
                  },
                  {
                    metric: 'Reduced',
                    label:
                      'Manning in finish end by knowing when each machine center is needed',
                    company: 'Large Sawmill'
                  },
                  {
                    metric: 'Flexible',
                    label:
                      'Workforce flexed to fit changing customer needs across projects',
                    company: 'GEMS Healthcare'
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
        industryTags={['Heavy Industry', 'Electronics', 'Job Shop']}
        title="Labor Scheduling Success Stories"
        subtitle="See how manufacturers achieved workforce-aware scheduling with RMDB."
        limit={6}
      />

      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to schedule labor alongside your machines?
          </h2>
          <p className="mb-6 text-slate-600">
            See how RMDB produces schedules your workforce can actually
            execute. Schedule a free live demo today.
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
