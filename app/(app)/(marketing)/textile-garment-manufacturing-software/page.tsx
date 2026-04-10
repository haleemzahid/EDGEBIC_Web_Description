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
  title: 'Textile & Garment Manufacturing Software (2026) — Cut, Sew, Finish',
  description:
    'Production scheduling software for textile and garment manufacturers. Cut, sew, and finish scheduling with operator skill constraints, style/color sequencing, and on-time delivery for apparel producers.',
  path: '/textile-garment-manufacturing-software',
  keywords:
    'textile manufacturing software, textile production planning software, garment production planning software, garment manufacturing software, apparel production scheduling, cut sew finish scheduling, fashion manufacturing software, textile ERP, garment ERP'
});

const FAQS = [
  {
    question: 'How does RMDB handle textile and garment cut-sew-finish routings?',
    answer:
      'Textile and garment production is a multi-stage routing problem: spread/cut → bundle → sew → press/finish → inspect → pack. RMDB schedules every stage as a finite-capacity operation with its own work center, operator skill requirement, and cycle time. Sewing is almost always the bottleneck, and the schedule reflects that.'
  },
  {
    question: 'Can RMDB model operator skill matrices for sewing operations?',
    answer:
      'Yes. Sewing operations are highly skill-dependent — a button-hole specialist cannot run a flat-lock seam, and a leather sewer cannot run a delicate silk lining. RMDB models operator skill matrices so the scheduler only assigns operations to qualified operators. This eliminates the manual checking that wastes scheduling time and creates training-related quality issues.'
  },
  {
    question: 'How does RMDB handle style and color sequencing?',
    answer:
      'Style and color changes drive setup time on cutting and sewing lines. RMDB models style/color changes as sequence-dependent setup time, so the scheduler intelligently groups similar styles and colors to minimize total changeover. Running a long batch of black T-shirts before switching to white saves real production time.'
  },
  {
    question: 'Can RMDB schedule offshore or contract production alongside in-house?',
    answer:
      'Yes. Contract manufacturing is modeled as outside processing with lead times. The schedule reserves the work as in-transit during the contract production window, so in-house finishing and inspection know exactly when the goods will be back. This is critical for apparel brands that split production between in-house and contract facilities.'
  },
  {
    question: 'Does RMDB integrate with apparel and textile ERPs?',
    answer:
      'Yes. RMDB integrates with apparel-specific ERPs like Apparel Magic, Centric PLM, BlueCherry, ApparelMagic, and general ERPs like Sage, Microsoft Dynamics, and NetSuite. Style masters, BOMs, and work orders flow into RMDB for finite-capacity scheduling; completed quantities and quality data flow back for inventory and costing.'
  },
  {
    question: 'How long does textile/garment implementation take?',
    answer:
      'Standard 5-Day Implementation Framework. Day 1: configure cutting tables, sewing lines, finishing stations, and shift calendars. Day 2: import styles, BOMs, and operator skill matrices. Day 3: import open work orders and run the first finite-capacity solve. Day 4: train production planners and line supervisors. Day 5: go live.'
  }
];

export default function TextileGarmentManufacturingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Textile & Garment Manufacturing Software"
        description="Production scheduling software for textile and garment manufacturers with cut, sew, and finish operations, operator skill matrices, and style/color sequencing."
        url="/textile-garment-manufacturing-software"
        industryName="Textile & Garment Manufacturing"
        industryDescription="Textile and apparel production including cutting, sewing, and finishing operations with operator skill constraints and style/color setup sequencing."
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
                Textile &amp; Garment Manufacturing Software
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Finite capacity scheduling for textile and apparel producers.
                Cut, sew, and finish — sequenced across machines, lines, and
                skilled operators with style-aware changeover modeling.
              </p>
            </div>
          </div>
        </section>

        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Textile &amp; Garment Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Textile and garment manufacturing combines high-velocity
                cutting and sewing with skill-constrained operators and
                style-driven changeovers. Sewing is almost always the
                bottleneck, and the schedule has to honor operator skill,
                style/color sequencing, and inspection capacity simultaneously.
                Most ERP scheduling modules cannot keep up.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Multi-stage routings (spread → cut → bundle → sew → finish → pack)',
                  'Operator skill matrices constrain who can run which sewing operations',
                  'Style and color changes drive sequence-dependent setup time',
                  'Sewing line balancing across operators of varying speeds',
                  'Contract production splits scheduling across in-house and outside',
                  'Retail customers expect tight delivery windows for fast fashion'
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
                How RMDB Serves Textile &amp; Garment Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB models the constraints apparel manufacturers actually
                live with: skilled-operator sewing, style-driven changeovers,
                contract production splits, and tight retail delivery windows.
                It plugs into your apparel ERP or PLM so you keep your style
                masters while gaining a real finite-capacity scheduler.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Finite capacity scheduling across cut, sew, and finish stages',
                  'Operator skill matrices for sewing operations',
                  'Style and color sequence-dependent setup modeling',
                  'Contract production as scheduled outside operations',
                  'Multi-stage routings with parallel sewing lines',
                  'Integrates with Apparel Magic, BlueCherry, and other apparel ERPs',
                  'Realistic retail delivery dates based on real capacity',
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
                Proven Results in Textile &amp; Apparel Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Multi-Stage',
                    label: 'Cut, sew, finish in one coordinated schedule',
                    company: 'Apparel Manufacturing Pattern'
                  },
                  {
                    metric: 'Skill',
                    label: 'Operator skill matrices for certified sewing operations',
                    company: 'Apparel Manufacturing Pattern'
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
        industryTags={['Textile', 'Garment', 'Apparel', 'Job Shop']}
        title="Textile &amp; Apparel Success Stories"
        subtitle="See how textile and garment manufacturers use RMDB to schedule cut, sew, and finish production."
      />

      <RelatedSolutions currentPath={Routes.TextileGarmentManufacturing} />

      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fix your textile or garment schedule?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Get a live demo with your real styles, BOMs, and operator skill
            matrices. See finite-capacity scheduling that respects every
            constraint of apparel production.
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
