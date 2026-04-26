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
  title: 'Food Manufacturing Scheduling Software — Allergen & Batch Control',
  description:
    'Schedule food production with allergen sequencing, FEFO shelf-life, and batch traceability built in. SQF/HACCP-ready. Trusted by food manufacturers since 1991. Free trial.',
  path: '/food-manufacturing-scheduling-software',
  keywords:
    'food manufacturing scheduling software, food production planning software, beverage manufacturing software, bakery production planning software, food and beverage scheduling, food production scheduling, allergen-aware scheduling, batch scheduling food manufacturing, SQF compliant scheduling'
});

const FAQS = [
  {
    question: 'Does RMDB handle allergen sequencing on shared production lines?',
    answer:
      'Yes. Allergen sequencing is one of the hardest scheduling problems in food manufacturing — running peanut products on the same line as peanut-free SKUs in the wrong order creates contamination risk and forces full sanitation between batches. RMDB models allergens as scheduling constraints and sequences batches to minimize allergen-driven changeovers, dramatically reducing sanitation downtime while staying compliant.'
  },
  {
    question: 'How does RMDB support shelf-life and FEFO planning?',
    answer:
      'Every batch in RMDB carries lot, expiration date, and shelf-life metadata. The scheduling engine respects shelf-life when planning production runs — there is no point making 10,000 units if they expire before the customer needs them. RMDB also supports first-expired-first-out (FEFO) sequencing for raw materials and work in process, which is critical for short-shelf-life ingredients.'
  },
  {
    question: 'Does RMDB support FDA, SQF, and HACCP requirements?',
    answer:
      'RMDB provides the core data trail required for SQF and HACCP compliance: lot traceability through every operation, batch genealogy from raw material to finished good, operator certification tracking, and audit-ready production logs. Combined with your QMS and ERP, RMDB closes the production-scheduling gap that most food MES platforms leave open.'
  },
  {
    question: 'Can RMDB schedule batch processing operations like cooking, fermenting, or curing?',
    answer:
      'Yes. RMDB models long-cycle batch operations — kettle cooking, fermentation, curing, aging, drying — as scheduled operations with their own duration, throughput, and resource constraints. The scheduler honors these durations alongside discrete operations like packaging, so the entire end-to-end flow (mix → cook → package → label → palletize) is sequenced as one schedule.'
  },
  {
    question: 'How does RMDB integrate with food ERPs like Aptean Process Manufacturing or Sage X3?',
    answer:
      'RMDB integrates with most food and process manufacturing ERPs including Sage X3, Aptean, Microsoft Dynamics for Food, NetSuite, and others. Recipes, BOMs, and work orders flow into RMDB for finite-capacity scheduling; completed batches and lot data flow back for traceability and inventory management.'
  },
  {
    question: 'How long does implementation take for a food manufacturer?',
    answer:
      'Standard 5-Day Implementation Framework. Day 1: configure work centers, batch tanks, and shift calendars. Day 2: import recipes, BOMs, and routings from your ERP. Day 3: import open production orders and run the first finite-capacity solve including allergen and shelf-life constraints. Day 4: train production planners and quality leads. Day 5: go live with the actual production schedule.'
  }
];

export default function FoodManufacturingSchedulingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Food Manufacturing Scheduling Software"
        description="Production scheduling software for food and beverage manufacturers with allergen sequencing, shelf-life awareness, lot traceability, and SQF/HACCP support."
        url="/food-manufacturing-scheduling-software"
        industryName="Food & Beverage Manufacturing"
        industryDescription="Food and beverage production with batch processing, allergen constraints, shelf-life management, and FDA/SQF/HACCP compliance requirements."
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
                Food Manufacturing Scheduling Software
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Finite capacity scheduling for food and beverage manufacturers.
                Allergen-aware sequencing, shelf-life planning, batch processing,
                and lot traceability — built for shops that have to ship safely
                AND on time.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Food &amp; Beverage Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Food manufacturing combines the complexity of process
                manufacturing with the demands of high-velocity discrete
                packaging. Allergens, shelf life, batch yields, and
                FDA/SQF/HACCP traceability create constraints that generic ERP
                scheduling modules were never designed for. The result is
                spreadsheet schedules, daily firefights, and missed retail
                slots.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Allergen sequencing on shared production lines drives sanitation downtime',
                  'Shelf-life and expiration dates constrain when you can run a batch',
                  'Batch operations (cook, ferment, cure) have long cycle times',
                  'Lot traceability through every operation is non-negotiable',
                  'Retail customers expect daily ATP responses and tight delivery windows',
                  'Recipes and yields vary with seasonality and ingredient quality'
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
                How RMDB Serves Food Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB models the constraints food manufacturers actually live
                with: allergen sequencing, shelf-life planning, batch durations,
                and lot traceability. It plugs into your existing food ERP or
                MES so you keep your compliance system of record while gaining
                a real finite-capacity scheduler.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Allergen-aware sequencing minimizes sanitation downtime',
                  'Shelf-life and FEFO logic for raw materials and finished goods',
                  'Batch operations modeled with long-cycle durations',
                  'Full lot traceability from raw material to finished good',
                  'Multi-stage routings (mix → cook → package → label → palletize)',
                  'Integrates with Sage X3, Aptean, Dynamics, NetSuite, and others',
                  'SQF and HACCP audit trail support',
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
                Proven Results in Food &amp; Beverage Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Allergen',
                    label: 'Sequencing modeled to minimize sanitation changeovers',
                    company: 'Food Manufacturing Pattern'
                  },
                  {
                    metric: 'FEFO',
                    label: 'Shelf-life-aware planning for short-life ingredients',
                    company: 'Food Manufacturing Pattern'
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
        industryTags={['Food', 'Beverage', 'Food Manufacturing', 'Process Manufacturing']}
        title="Food &amp; Beverage Success Stories"
        subtitle="See how food and beverage manufacturers use RMDB to schedule batches safely and on time."
      />

      <RelatedSolutions currentPath={Routes.FoodManufacturingScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fix your food manufacturing schedule?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Get a live demo with your real recipes, batches, and allergen
            constraints. See finite-capacity scheduling that respects shelf life
            and minimizes sanitation downtime.
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
