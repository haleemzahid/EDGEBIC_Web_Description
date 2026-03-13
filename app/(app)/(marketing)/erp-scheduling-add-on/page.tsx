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
  title: 'ERP Scheduling Add-On | Fill the Scheduling Gap in Your ERP',
  description:
    'Production scheduling add-on for ERP systems including SAP, Oracle, Epicor, Fourth Shift, and Macola. BAE Systems discontinued their ERP scheduling in favor of RMDB. Full ERP integration achieved in 5 days. Finite capacity scheduling your ERP cannot provide.',
  path: '/erp-scheduling-add-on',
  keywords:
    'ERP scheduling add-on, ERP production scheduling, production scheduling ERP integration, ERP scheduling gap, finite capacity scheduling ERP, SAP scheduling add-on, Oracle scheduling add-on, Epicor scheduling add-on, ERP capacity planning add-on'
});

const FAQS = [
  {
    question: 'Why do ERP systems need a scheduling add-on?',
    answer:
      'Most ERP systems were designed for financial management and transaction processing — not production scheduling. Their scheduling modules typically use infinite capacity planning, which assumes unlimited resources and produces unrealistic schedules. BAE Systems purchased an ERP with MRP and CRP capabilities but were "not satisfied with its capacity constraint recognition" — they discontinued their ERP scheduling module in favor of RMDB.'
  },
  {
    question: 'Which ERP systems does RMDB integrate with?',
    answer:
      'RMDB integrates with virtually any ERP system via Excel, CSV, or direct database connections. Proven integrations include Fourth Shift (Plastilite Corporation), Macola/Exact Software (INCON Incorporated), AS400 (Cummins Engine), and many others including SAP, Oracle, Epicor, and Sage. The Fourth Shift ERP vendor itself recommended RMDB as their scheduling add-on.'
  },
  {
    question: 'How quickly can an ERP scheduling add-on be integrated?',
    answer:
      'Remarkably fast. Plastilite Corporation achieved a complete optimized schedule with full Fourth Shift ERP integration in just 5 days — from Monday to Friday. Because RMDB works with your existing ERP data formats, there is no lengthy data migration. Import orders, export updated dates, and synchronize with your MRP and inventory modules immediately.'
  },
  {
    question: 'Will adding RMDB disrupt our existing ERP workflows?',
    answer:
      'No. RMDB is designed to complement your ERP, not replace it. It reads your open orders, BOMs, and routing data from your ERP, applies finite capacity scheduling logic that your ERP lacks, and writes updated promise dates back. Your existing ERP workflows for purchasing, inventory, and accounting remain unchanged. You gain scheduling intelligence without disrupting proven processes.'
  }
];

export default function ErpSchedulingAddOnPage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="ERP Scheduling Add-On"
        description="Production scheduling add-on that fills the finite capacity scheduling gap in ERP systems like SAP, Oracle, Epicor, and Fourth Shift."
        url="/erp-scheduling-add-on"
        featureDescription="ERP scheduling add-on providing finite capacity scheduling, what-if analysis, and realistic promise dates that complement your existing ERP investment."
        featureList={[
          'ERP Data Integration (Excel, CSV, Database)',
          'Finite Capacity Scheduling',
          'Bi-Directional ERP Sync',
          'SAP Integration',
          'Oracle Integration',
          'Epicor Integration',
          'Fourth Shift Integration',
          'Macola Integration'
        ]}
        customerNames={[
          'BAE Systems',
          'Plastilite Corporation',
          'INCON Incorporated',
          'Cummins Engine',
          'Smart Coffee',
          'Technical Glass Products'
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
                The Scheduling Add-On Your ERP Is Missing
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Your ERP handles finances, inventory, and transactions. But it
                cannot finite capacity schedule. RMDB fills that gap — without
                replacing a thing. Integrates with SAP, Oracle, Epicor, Fourth
                Shift, Macola, and more.
              </p>
            </div>
          </div>
        </section>

        {/* ERP Integration Logos */}
        <section className="border-y bg-slate-50 py-6">
          <div className="container mx-auto px-4">
            <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-slate-500">
              Proven ERP integrations
            </p>
            <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 text-center md:grid-cols-6">
              {[
                'SAP',
                'Oracle',
                'Epicor',
                'Fourth Shift',
                'Macola',
                'Sage'
              ].map((erp) => (
                <div
                  key={erp}
                  className="rounded-lg border bg-white px-4 py-3"
                >
                  <p className="text-sm font-semibold text-slate-700">
                    {erp}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="pt-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                The ERP Scheduling Gap
              </h2>
              <p className="leading-relaxed text-gray-700">
                You invested heavily in your ERP system for good reasons — it
                manages your financials, inventory, purchasing, and order
                management well. But when it comes to production scheduling,
                most ERP systems fall short. They use infinite capacity
                assumptions that produce schedules disconnected from shop floor
                reality.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'ERP scheduling assumes infinite capacity — ignoring real constraints',
                  'No finite capacity awareness for machines, labor, or tooling',
                  'Unrealistic promise dates that lead to chronic late deliveries',
                  'Replacing your ERP is too expensive and disruptive',
                  'Manual workarounds with spreadsheets alongside ERP are unsustainable',
                  'ERP vendors push expensive upgrades that still lack real scheduling'
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
                RMDB: The Scheduling Layer Your ERP Needs
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB adds finite capacity scheduling intelligence to any ERP
                system. It reads your open orders, BOMs, and routing data,
                applies real capacity constraints, and writes updated promise
                dates and schedules back. Your ERP investment stays intact — you
                simply gain the scheduling power it was always missing.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Works alongside any ERP — no replacement needed',
                  'Imports open orders, BOMs, and routings from your ERP',
                  'Applies finite capacity scheduling your ERP cannot do',
                  'Exports updated promise dates back to synchronize with MRP',
                  'Excel, CSV, or direct database connectivity options',
                  'Full integration achievable in as little as 5 days',
                  'What-if analysis using your real ERP production data',
                  'Purchasing optimization through schedule-driven MRP',
                  'No disruption to existing ERP workflows',
                  'Fraction of the cost of an ERP scheduling module upgrade'
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
                &ldquo;We are extremely satisfied with the offering and are
                pleased to recommend to others looking for a capacity and
                production planning solution — either integrated with ERP or
                standalone.&rdquo;
              </blockquote>
              <p className="font-semibold text-slate-900">
                Marc Phillippi, ERP Systems Manager
              </p>
              <p className="text-sm text-slate-500">BAE Systems</p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                ERP Integration Results
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Replaced',
                    label:
                      'ERP scheduling module discontinued in favor of RMDB finite capacity',
                    company: 'BAE Systems'
                  },
                  {
                    metric: '5 Days',
                    label:
                      'Complete optimized schedule with full Fourth Shift ERP integration',
                    company: 'Plastilite Corporation'
                  },
                  {
                    metric: 'Accurate',
                    label:
                      'Labor scheduling via Macola ERP add-on for realistic promise dates',
                    company: 'INCON Incorporated'
                  },
                  {
                    metric: 'Smarter',
                    label:
                      'MRP-driven purchasing linked to existing ERP system',
                    company: 'Smart Coffee'
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

        {/* How Integration Works */}
        <section className="border-t bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                How ERP Integration Works
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    step: '1',
                    title: 'Import from ERP',
                    description:
                      'Import open orders, BOMs, routings, and inventory data from your ERP via Excel, CSV, or direct database connection. No data reformatting required — RMDB works with your existing formats.'
                  },
                  {
                    step: '2',
                    title: 'Finite Capacity Schedule',
                    description:
                      'RMDB applies real capacity constraints — machines, labor, materials, tooling — to produce achievable schedules. Run what-if scenarios to evaluate new orders or capacity changes.'
                  },
                  {
                    step: '3',
                    title: 'Sync Back to ERP',
                    description:
                      'Export updated promise dates, schedules, and material requirements back to your ERP. MRP and inventory modules stay synchronized with realistic production dates.'
                  }
                ].map((step) => (
                  <div
                    key={step.step}
                    className="rounded-lg border bg-slate-50 p-6"
                  >
                    <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-white">
                      {step.step}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {step.description}
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
        industryTags={['Defense', 'Consumer Goods', 'Electronics', 'Heavy Industry']}
        title="ERP Integration Success Stories"
        subtitle="See how manufacturers added powerful scheduling to their existing ERP systems with RMDB."
        limit={6}
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fill the scheduling gap in your ERP?
          </h2>
          <p className="mb-6 text-slate-600">
            See how RMDB integrates with your specific ERP system. Schedule a
            free consultation — we can demo using your own production data.
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
