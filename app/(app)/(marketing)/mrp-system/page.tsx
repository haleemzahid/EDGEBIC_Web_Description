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
  title: 'MRP System & MRP Software for Modern Manufacturers',
  description:
    'Complete MRP system covering material requirements planning, BOMs, inventory, purchasing, and finite capacity scheduling. RMDB MRP software is used by Sleepmaster (AUD$50M), Turner Bicycles, Plastilite, and Enevate. Days-to-implement, modular, and Excel-friendly.',
  path: '/mrp-system',
  keywords:
    'mrp system, mrp software, material requirements planning software, mrp software for manufacturers, manufacturing resource planning, mrp ii software, closed loop mrp, cloud mrp system, mrp system small business, mrp software comparison, what is an mrp system, mrp vs erp, best mrp software'
});

const FAQS = [
  {
    question: 'What is an MRP system?',
    answer:
      'An MRP system (Material Requirements Planning system) calculates exactly what materials, components, and sub-assemblies a manufacturer needs to produce planned demand — and when those items must arrive on the shop floor. A modern MRP system extends this with BOM management, purchasing, inventory, and capacity scheduling so the calculated material plan stays in sync with actual production.'
  },
  {
    question: 'What is the difference between MRP I and MRP II?',
    answer:
      'MRP I (Material Requirements Planning) calculates only material needs from BOMs and demand. MRP II (Manufacturing Resource Planning) extends that with capacity planning, shop-floor control, costing, and integration with finance and purchasing. RMDB delivers MRP II in a single platform — material planning, finite capacity scheduling, BOMs, costing, and purchasing in one database.'
  },
  {
    question: 'What is the difference between an MRP system and an ERP system?',
    answer:
      'An ERP system covers the entire business — manufacturing, finance, HR, CRM. An MRP system focuses specifically on the manufacturing planning side: materials, BOMs, capacity, and shop-floor execution. For small and mid-size manufacturers, a focused MRP system like RMDB delivers the planning intelligence without the cost, complexity, and 6–12 month rollout of full ERP. RMDB also layers on top of existing ERP (SAP, Oracle, Epicor, NetSuite, QuickBooks) when needed.'
  },
  {
    question: 'What is closed-loop MRP?',
    answer:
      'Closed-loop MRP feeds actual shop-floor execution data back into the material plan. Unlike open-loop MRP that plans once and goes stale, closed-loop MRP automatically reconciles plan vs. actuals — adjusting downstream material requirements when upstream jobs run early or late. RMDB implements closed-loop MRP by tying the schedule to work-order completions in real time.'
  },
  {
    question: 'How long does MRP system implementation take?',
    answer:
      'Enterprise MRP implementations often take 6–12 months. RMDB MRP implementations typically take days to weeks. Turner Bicycles entered all shop constraints, BOMs, calendar, materials, vendors, and customers in a few days. Plastilite achieved full ERP integration in one week. The system is modular — start with materials planning, add scheduling, then costing, without ripping anything out.'
  },
  {
    question: 'Is RMDB the best MRP software for small manufacturers?',
    answer:
      'For small to mid-size manufacturers (typically 5–500 employees), RMDB is purpose-built. Sleepmaster Ltd, an AUD$50M manufacturer, scaled from domestic to international operations on RMDB. Setup is one part-time person — no IT team required. The pricing is at small-business level even though the capability extends to enterprise scale (USS Nimitz schedules 26,000+ tasks on it).'
  }
];

export default function MrpSystemPage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="MRP System & MRP Software"
        description="Complete MRP system with material requirements planning, BOMs, inventory, purchasing, and finite capacity scheduling."
        url="/mrp-system"
        featureDescription="Modern MRP II system: material requirements planning, multi-level BOMs, inventory management, purchasing, finite capacity scheduling, and costing — modular and Excel-friendly."
        featureList={[
          'Material Requirements Planning (MRP I and MRP II)',
          'Closed-Loop MRP with Shop-Floor Feedback',
          'Multi-Level Bill of Materials (BOMs)',
          'Inventory Management & Lot Traceability',
          'Purchasing Driven by MRP Demand',
          'Finite Capacity Scheduling',
          'Costing and Estimating',
          'ERP Integration (SAP, Oracle, Epicor, NetSuite, QuickBooks)'
        ]}
        customerNames={[
          'Sleepmaster Ltd',
          'Turner Suspension Bicycles',
          'Plastilite Corporation',
          'Enevate Corporation',
          'Smart Coffee'
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
                MRP System Built for Real Manufacturing
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Material requirements planning, BOMs, inventory, purchasing,
                and finite capacity scheduling in one MRP system. The MRP
                software small and mid-size manufacturers actually finish
                implementing — in days, not months.
              </p>
            </div>
          </div>
        </section>

        {/* What is an MRP system */}
        <section className="border-y bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                What Is an MRP System?
              </h2>
              <p className="leading-relaxed text-gray-700">
                An MRP system answers three questions every manufacturer faces
                daily: what do we need to make, what materials does that
                require, and when must those materials be on hand? It does this
                by exploding a Bill of Materials against forecasted and firm
                demand, then netting against inventory and open purchase
                orders.
              </p>
              <p className="leading-relaxed text-gray-700">
                A modern MRP system goes further: it ties the material plan to
                a finite capacity schedule, feeds shop-floor completion data
                back into the plan (closed-loop MRP), and connects to
                purchasing so reorder points trigger automatically. RMDB
                delivers this as a single integrated MRP system — no
                spreadsheet bridges, no end-of-month reconciliations.
              </p>
            </div>
          </div>
        </section>

        {/* MRP I vs MRP II */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                MRP I vs. MRP II — What&apos;s the Difference?
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-white p-6">
                  <h3 className="mb-3 text-lg font-semibold text-slate-700">
                    MRP I — Material Requirements Planning
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {[
                      'Calculates material needs from BOMs and demand',
                      'Time-phased reorder by lead time',
                      'Nets against on-hand stock and open POs',
                      'Does not consider capacity constraints',
                      'Does not feed back actual production'
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 size-2 shrink-0 rounded-full bg-slate-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-cyan-200 bg-white p-6">
                  <h3 className="mb-3 text-lg font-semibold text-cyan-700">
                    MRP II — Manufacturing Resource Planning (RMDB)
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {[
                      'Everything in MRP I, plus:',
                      'Finite capacity scheduling — machines, labor, materials, tooling',
                      'Closed-loop feedback from work-order completions',
                      'Costing tied to actual production data',
                      'Master production schedule and rough-cut capacity planning',
                      'Purchasing, receiving, and vendor performance integrated'
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RMDB MRP capabilities */}
        <section className="border-t bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                RMDB MRP System Capabilities
              </h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Multi-level BOM explosion up to 10 levels deep',
                  'Time-phased material requirements with vendor lead times',
                  'Net requirements after on-hand stock and open POs',
                  'Lot sizing rules: lot-for-lot, EOQ, fixed-period, min/max',
                  'Closed-loop MRP — automatic adjustment from shop-floor reality',
                  'Finite capacity scheduling against materials, labor, machines, tooling',
                  'Purchase order generation driven by MRP demand',
                  'Vendor performance and lead-time tracking',
                  'Lot traceability and inventory valuation',
                  'Costing rolled live from production data',
                  'Master production schedule and rough-cut capacity planning',
                  'ERP integration (SAP, Oracle, Epicor, NetSuite, QuickBooks)'
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
                &ldquo;The biggest benefit relative to other MRP systems is its
                simplicity to operate and speed at which it can generate
                results. Most are far more expensive and resource-hungry to set
                up.&rdquo;
              </blockquote>
              <p className="font-semibold text-slate-900">
                Jim Steel, Operations Manager
              </p>
              <p className="text-sm text-slate-500">
                Sleepmaster Ltd (AUD$50M manufacturer)
              </p>
            </div>
          </div>
        </section>

        {/* Customer results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                MRP System Implementation Results
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Few Days',
                    label: 'Full MRP setup including BOMs, routings, materials, vendors',
                    company: 'Turner Bicycles'
                  },
                  {
                    metric: '1 Week',
                    label: 'Complete MRP-to-ERP integration',
                    company: 'Plastilite Corporation'
                  },
                  {
                    metric: '10 Levels',
                    label: 'Multi-level sub-assembly MRP with lot traceability',
                    company: 'Enevate Corporation'
                  },
                  {
                    metric: 'AUD$50M',
                    label: 'Manufacturer scaled domestic-to-international on RMDB MRP',
                    company: 'Sleepmaster Ltd'
                  }
                ].map((r) => (
                  <div
                    key={r.company}
                    className="rounded-lg border bg-white p-6 text-center shadow-sm"
                  >
                    <p className="mb-2 text-2xl font-bold text-cyan-600">
                      {r.metric}
                    </p>
                    <p className="mb-2 text-sm text-gray-700">{r.label}</p>
                    <p className="text-xs font-medium text-slate-500">
                      {r.company}
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
              MRP System FAQs
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
        industryTags={['Job Shop', 'Consumer Goods', 'Electronics', 'Heavy Industry']}
        title="MRP System Success Stories"
        subtitle="See how manufacturers replaced spreadsheets and enterprise ERP with the RMDB MRP system."
        limit={6}
      />

      <RelatedSolutions currentPath={Routes.MrpSystem} />

      {/* CTA */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            See an MRP System That Implements in Days
          </h2>
          <p className="mb-6 text-slate-600">
            Get a free live demo with your own BOMs and demand data. See how
            material planning, scheduling, and purchasing tie together in one
            MRP system.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={Routes.Contact}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
            >
              Request a Free Demo
            </Link>
            <Link
              href={Routes.MrpSoftwareSmallManufacturers}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              MRP for Small Manufacturers
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
