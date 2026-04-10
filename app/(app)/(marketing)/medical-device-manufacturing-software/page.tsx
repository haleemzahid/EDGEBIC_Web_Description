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
  title: 'Medical Device Manufacturing Software (2026) — FDA-Compliant Scheduling',
  description:
    'Medical device manufacturing software for production scheduling. FDA 21 CFR Part 11 audit trails, full lot traceability, ISO 13485 support, and finite-capacity scheduling for medical device producers.',
  path: '/medical-device-manufacturing-software',
  keywords:
    'medical device manufacturing software, medical device production scheduling, FDA compliant manufacturing software, ISO 13485 scheduling software, medical device ERP, 21 CFR Part 11 manufacturing, medical device lot traceability, medical device production planning'
});

const FAQS = [
  {
    question: 'Does RMDB support FDA 21 CFR Part 11 electronic records requirements?',
    answer:
      'Yes. RMDB provides the audit trail, electronic signature support, and access controls required by 21 CFR Part 11. Every scheduling action (work order changes, operator assignments, completion entries) is logged with timestamp, user, and reason — providing the records FDA inspectors expect to see during a Part 11 audit.'
  },
  {
    question: 'How does RMDB support ISO 13485 quality management requirements?',
    answer:
      'ISO 13485 requires documented production processes, traceability through every operation, operator certification verification, and change control. RMDB tracks all of this as scheduling metadata: which operator ran which operation, on which machine, against which work order, with which inspection results. The data feeds your QMS for full design-to-delivery traceability.'
  },
  {
    question: 'Can RMDB handle multi-level BOMs for complex medical devices?',
    answer:
      'Yes — RMDB has been proven with 10-level deep sub-assembly structures including in regulated environments. Complex medical devices with sub-assemblies (sensors, batteries, electronics, cases, sterilization packaging) are scheduled as multi-level BOMs with full lot traceability at every level. This is the same capability that supports Li-Ion battery production at Enevate Corporation.'
  },
  {
    question: 'Does RMDB integrate with medical device ERPs like Plex or QAD?',
    answer:
      'RMDB integrates with the major medical device ERPs including Plex, QAD, Microsoft Dynamics, NetSuite, SAP, and Epicor. Routings, BOMs, and work orders flow into RMDB for finite-capacity scheduling; completed quantities, lot data, and labor hours flow back for compliance reporting and cost accounting.'
  },
  {
    question: 'How does RMDB handle sterilization and clean-room scheduling?',
    answer:
      'Sterilization cycles (autoclave, ETO, gamma) are modeled as long-cycle scheduled operations with their own throughput and capacity. Clean-room time, gowning windows, and changeover validation are also schedulable constraints. The result is a schedule that respects every constraint of regulated medical device production — not just machine availability.'
  },
  {
    question: 'How long does implementation take for a medical device manufacturer?',
    answer:
      'Standard 5-Day Implementation Framework, with extra time for compliance configuration. Day 1: work centers, clean rooms, and shift calendars. Day 2: items, BOMs, and routings (often the longest day for medical device shops due to BOM complexity). Day 3: work orders and first finite-capacity solve. Day 4: training schedulers, quality, and compliance leads. Day 5: live cutover with the QMS team observing.'
  }
];

export default function MedicalDeviceManufacturingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Medical Device Manufacturing Software"
        description="FDA-compliant production scheduling software for medical device manufacturers with 21 CFR Part 11 audit trails, ISO 13485 support, and full lot traceability."
        url="/medical-device-manufacturing-software"
        industryName="Medical Device Manufacturing"
        industryDescription="Medical device production with FDA compliance, ISO 13485 quality requirements, multi-level BOMs, sterilization cycles, and lot traceability."
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
                Medical Device Manufacturing Software
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Finite capacity scheduling for medical device manufacturers.
                FDA 21 CFR Part 11 audit trails, ISO 13485 traceability,
                multi-level BOMs, and clean-room aware scheduling — built for
                regulated production.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Medical Device Manufacturing Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Medical device manufacturing combines high-mix, low-volume
                production with the strictest regulatory requirements in
                manufacturing. FDA 21 CFR Part 11, ISO 13485, design history
                files, and full lot traceability are non-negotiable. Meanwhile,
                sterilization cycles, clean rooms, and operator certifications
                add scheduling constraints that generic ERP modules cannot
                handle.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'FDA 21 CFR Part 11 electronic records and audit trail requirements',
                  'ISO 13485 quality management and full traceability',
                  'Multi-level BOMs (10+ levels deep for complex devices)',
                  'Sterilization cycles (autoclave, ETO, gamma) as long-cycle operations',
                  'Operator certifications constrain who can run regulated steps',
                  'Clean-room time and gowning windows as schedulable constraints'
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
                How RMDB Serves Medical Device Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB delivers the finite-capacity scheduling layer regulated
                medical device manufacturers need on top of their existing ERP
                and QMS. It handles 10-level BOMs, sterilization cycles,
                certified-operator constraints, and full lot traceability — all
                with the audit trail required for Part 11 compliance.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'FDA 21 CFR Part 11 audit trail and electronic signatures',
                  'ISO 13485 compatible production traceability',
                  '10+ level deep multi-level BOM scheduling',
                  'Sterilization and clean-room cycle modeling',
                  'Operator certification matrices for regulated steps',
                  'Integrates with Plex, QAD, Dynamics, NetSuite, SAP, and Epicor',
                  'Lot genealogy from raw material to finished device',
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

        {/* Results Section */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Proven Results in Regulated Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '10-Level',
                    label: 'Deep multi-level BOM scheduling proven in regulated production',
                    company: 'Enevate Corporation'
                  },
                  {
                    metric: 'Part 11',
                    label: 'Audit trail and electronic signature support',
                    company: 'FDA Compliance'
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
        industryTags={['Medical Device', 'Medical', 'Regulated', 'FDA', 'Hi-Tech']}
        title="Regulated Manufacturing Success Stories"
        subtitle="See how regulated manufacturers use RMDB for compliant, multi-level production scheduling."
      />

      <RelatedSolutions currentPath={Routes.MedicalDeviceManufacturing} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fix your medical device production schedule?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Get a live demo with your real BOMs, sterilization cycles, and
            certification requirements. See FDA-compliant finite-capacity
            scheduling running on your actual production data.
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
