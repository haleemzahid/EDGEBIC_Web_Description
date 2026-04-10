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
  title: 'Plastic Manufacturing Software (2026) — Injection Molding Scheduling',
  description:
    'Plastic manufacturing scheduling software for injection molding, blow molding, and extrusion. Mold capacity constraints, material change sequencing, and finite-capacity scheduling for plastics producers.',
  path: '/plastic-manufacturing-software',
  keywords:
    'plastic manufacturing software, injection molding scheduling software, plastics production scheduling, mold capacity scheduling, plastic injection molding software, plastics manufacturing ERP, finite capacity scheduling plastics, blow molding scheduling'
});

const FAQS = [
  {
    question: 'How does RMDB handle injection molding press capacity?',
    answer:
      'Each injection molding press is modeled as a finite-capacity work center with its own shot size, clamp tonnage, and shift availability. RMDB schedules jobs only on presses that physically fit the mold and material — no more "scheduled to run on Press 4 but the mold is too big" failures. Multi-cavity tools, mold-press matching, and family molds are all supported as scheduling constraints.'
  },
  {
    question: 'Can RMDB model material change and color-change sequencing?',
    answer:
      'Yes. Switching from black PE to clear PC requires extensive purging and machine cleaning. RMDB models material/color changes as sequence-dependent setup time, so the scheduler intelligently sequences runs to minimize total purge time. Running similar materials and colors back-to-back is automatic, not a manual exercise.'
  },
  {
    question: 'Does RMDB schedule mold maintenance and PM cycles?',
    answer:
      'Yes. Molds carry shot counts and mileage in RMDB. When a mold approaches its PM threshold, the scheduler can automatically block production scheduling on that mold and reserve a maintenance window. This eliminates the unplanned breakdowns that come from running molds past their service interval.'
  },
  {
    question: 'How does RMDB integrate with plastics ERPs and MES?',
    answer:
      'RMDB integrates with the major plastics ERPs and MES platforms: IQMS (DELMIAworks), Plex, Mattec, Sage, Microsoft Dynamics, NetSuite, and others. Work orders, BOMs, and routings flow into RMDB for finite-capacity scheduling; cycle counts, scrap, and downtime data flow back for cost and OEE tracking.'
  },
  {
    question: 'Can RMDB handle blow molding, extrusion, and thermoforming alongside injection molding?',
    answer:
      'Yes. RMDB is process-agnostic — it schedules any work center with capacity, setup, and resource constraints. Injection molding presses, blow molding lines, extrusion lines, and thermoforming stations are all modeled the same way. Multi-process plastic manufacturers run the entire facility on one schedule.'
  },
  {
    question: 'How long does implementation take for a plastics manufacturer?',
    answer:
      'Standard 5-Day Implementation Framework. Day 1: configure presses, mold-press matching, and shift calendars. Day 2: import items, BOMs, and material-change matrices. Day 3: import open work orders and run the first finite-capacity solve. Day 4: train schedulers and tooling leads. Day 5: go live with the live production schedule.'
  }
];

export default function PlasticManufacturingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Plastic Manufacturing Software"
        description="Production scheduling software for plastic manufacturers including injection molding, blow molding, extrusion, and thermoforming."
        url="/plastic-manufacturing-software"
        industryName="Plastics Manufacturing"
        industryDescription="Plastic manufacturing including injection molding, blow molding, extrusion, and thermoforming with mold capacity constraints and material-change sequencing."
      />
      <FAQJsonLd
        questions={FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />

      <div className="min-h-screen text-[18px]">
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Plastic Manufacturing Software
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Finite capacity scheduling for plastics: injection molding,
                blow molding, extrusion, and thermoforming. Mold-press
                matching, material change sequencing, and PM-aware scheduling
                — built for high-throughput plastics production.
              </p>
            </div>
          </div>
        </section>

        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Plastic Manufacturing Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Plastics production combines high-velocity press operations
                with hard physical constraints — mold-press matching, material
                changes, color purging, and PM cycles. Most ERP scheduling
                modules ignore these constraints entirely, leading to schedules
                the production floor cannot actually run.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Mold-press matching constraints (size, tonnage, shot)',
                  'Material change setup time and color-purge sequencing',
                  'Multi-cavity and family molds with shared capacity',
                  'Mold PM cycles and shot-count-based maintenance',
                  'Scrap rates and OEE that vary by mold and material',
                  'Customer pull schedules with daily expedites'
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

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                How RMDB Serves Plastic Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB models the constraints plastic manufacturers actually
                live with — mold-press matching, sequence-dependent material
                changes, PM cycles, and multi-cavity capacity — in a single
                Gantt-driven schedule that the floor can run.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Mold-press matching with size and tonnage constraints',
                  'Sequence-dependent material and color change setup time',
                  'Multi-cavity and family mold scheduling',
                  'PM cycles tracked by shot count and mileage',
                  'Multi-process scheduling (injection, blow, extrusion, thermoforming)',
                  'Integrates with IQMS/DELMIAworks, Plex, Mattec, and others',
                  'Drag-and-drop Gantt for instant rescheduling',
                  'One-time license — no per-user monthly subscription fees'
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

        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Proven Results in Plastics Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Mold',
                    label: 'Mold-press matching enforced as hard scheduling constraint',
                    company: 'Plastics Manufacturing Pattern'
                  },
                  {
                    metric: 'Color',
                    label: 'Sequence-dependent material change minimizes purge time',
                    company: 'Plastics Manufacturing Pattern'
                  },
                  {
                    metric: '5 Days',
                    label: 'From kickoff to live finite-capacity schedule',
                    company: 'Standard Implementation'
                  },
                  {
                    metric: '$5K',
                    label: 'One-time license — no per-user fees',
                    company: 'Pricing Starting Point'
                  }
                ].map((result) => (
                  <div
                    key={result.company}
                    className="rounded-lg border bg-white p-6 text-center"
                  >
                    <p className="mb-2 text-2xl font-bold text-cyan-600">
                      {result.metric}
                    </p>
                    <p className="mb-2 text-sm text-gray-700">{result.label}</p>
                    <p className="text-xs font-medium text-slate-500">
                      {result.company}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

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

      <IndustrySuccessStories
        industryTags={['Plastics', 'Injection Molding', 'Process Manufacturing']}
        title="Plastics Manufacturing Success Stories"
        subtitle="See how plastics manufacturers use RMDB to schedule presses and minimize material changes."
      />

      <RelatedSolutions currentPath={Routes.PlasticManufacturing} />

      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fix your plastics production schedule?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Get a live demo with your real molds, presses, and material change
            matrix. See finite-capacity scheduling that respects every
            mold-press constraint your shop runs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
            >
              Schedule a Free Demo
            </Link>
            <Link
              href="/product-downloads"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Download Free Trial
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
