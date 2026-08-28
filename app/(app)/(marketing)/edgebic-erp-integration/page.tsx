import * as React from 'react';
import Link from 'next/link';

import { FAQJsonLd, FeaturePageJsonLd } from '@/components/seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Routes } from '@/constants/routes';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'EDGEBIC ERP Integration: JobBOSS, Epicor, SAP, QuickBooks & More',
  description:
    'How EDGEBIC integrates with JobBOSS, Epicor, Fourth Shift, SAP, and virtually any ERP: flexible Excel/CSV/database import masks bring items, routings, and orders in; finite capacity schedules and realistic dates flow back out. The same proven approach behind 35 years of ERP integrations.',
  path: '/edgebic-erp-integration',
  modifiedTime: '2026-08-28',
  keywords:
    'EDGEBIC ERP integration, JobBOSS scheduling software, JobBOSS finite capacity scheduling, Epicor scheduling add-on, Fourth Shift scheduling, ERP scheduling integration, production scheduling ERP add-on, Excel CSV ERP import scheduling, top production scheduling tools that integrate with existing ERP systems, job shop scheduling software that works alongside SAP without replacing it, QuickBooks scheduling integration, SAP scheduling integration, EDGEBIC ERP integration UK, EDGEBIC ERP integration Europe'
});

const FAQS = [
  {
    question: 'How does EDGEBIC connect to an ERP?',
    answer:
      'Through import-export masks. An import mask maps the columns of your ERP export (Excel, CSV, or a database source) to EDGEBIC entities: products, work centers, bills of routing, sales orders, and shop-floor actuals. You map the columns once, then re-run the same mask every time your ERP data changes. Schedules, dates, and reports export back to Excel for return to the ERP. There is no custom API project and no middleware to maintain.'
  },
  {
    question: 'Does EDGEBIC have a native JobBOSS or Epicor connector?',
    answer:
      'EDGEBIC integrates through its universal import-export masks rather than per-ERP connectors. Any system that can export to Excel or CSV integrates the same afternoon you map the columns, and that includes JobBOSS, Epicor, Fourth Shift, SAP, Oracle, Sage, and Macola. This is deliberately the same architecture behind 35 years of User Solutions ERP integrations, including one the Fourth Shift vendor itself recommended to its customers.'
  },
  {
    question: 'What data goes in, and what comes back out?',
    answer:
      'In: items and products, work centers and capacity data, bills of routing (with a two-pass import that wires up step sequences), sales orders and manufacturing orders, and actual hours or piece counts. Out: finite capacity schedules, realistic start and end dates per order and operation, dispatch lists, and any report exported to Excel, PNG, or PDF.'
  },
  {
    question: 'How fast is a typical integration?',
    answer:
      'The documented benchmark from the User Solutions line is a complete Fourth Shift ERP integration in 5 days at Plastilite Corporation, from Monday to Friday. EDGEBIC follows the same methodology: start with the export your ERP already produces, map it, and schedule. Most shops see their first finite capacity schedule from real ERP data in the first session.'
  },
  {
    question: 'Will EDGEBIC disrupt our existing ERP workflows?',
    answer:
      'No. Your ERP remains the system of record for financials, purchasing, and inventory transactions. EDGEBIC adds the finite capacity scheduling layer your ERP lacks, then hands realistic dates back. Purchasing, accounting, and order entry keep working exactly as they do today.'
  }
];

const ERP_SECTIONS: Array<{
  name: string;
  heading: string;
  body: string[];
}> = [
  {
    name: 'JobBOSS',
    heading: 'EDGEBIC + JobBOSS',
    body: [
      'JobBOSS runs the business side of thousands of job shops: quoting, order entry, purchasing, accounting. Its scheduling, though, is where many shops fall back to whiteboards and spreadsheets.',
      'EDGEBIC takes the jobs, routings, and work centers JobBOSS already holds (exported to Excel/CSV), and schedules them against finite capacity: real shifts, machine instances, operator skills, and sequence-dependent setups. Updated promise dates go back to JobBOSS, so order entry quotes dates the shop can hit.'
    ]
  },
  {
    name: 'Epicor',
    heading: 'EDGEBIC + Epicor',
    body: [
      'Epicor Kinetic is a deep manufacturing ERP, and many plants still find its scheduling module produces plans the floor cannot follow, especially with multi-shift, multi-instance work centers and shared machine pools.',
      'EDGEBIC models exactly those cases: work center groups behave like Epicor resource groups but re-shop the pool on every reschedule, and the optimizer sequences to cut changeovers. Epicor exports feed the import masks; finite capacity dates flow back.'
    ]
  },
  {
    name: 'Fourth Shift',
    heading: 'EDGEBIC + Fourth Shift',
    body: [
      'Fourth Shift is the origin story of this integration approach: the Fourth Shift vendor itself recommended User Solutions scheduling as the add-on for its customers, and the documented Plastilite integration went from first export to a complete optimized schedule in 5 days.',
      'EDGEBIC continues that lineage with the same import-mask architecture, now feeding a stronger engine: TOC anchor scheduling, lot streaming, and mathematically optimized sequences.'
    ]
  }
];

export default function EdgebicErpIntegrationPage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="EDGEBIC ERP Integration"
        description="EDGEBIC integrates with JobBOSS, Epicor, Fourth Shift, SAP, and virtually any ERP through flexible Excel/CSV/database import-export masks."
        url="/edgebic-erp-integration"
        featureDescription="Universal ERP integration for finite capacity scheduling: import items, work centers, routings, orders, and actuals; export schedules and realistic dates back to the ERP."
        featureList={[
          'Excel / CSV / database import masks',
          'Two-pass bill of routing import with automatic sequence wiring',
          'Products, work centers, sales orders, and actuals import',
          'Reusable column mappings per entity',
          'Unit conversion on import (minutes to hours)',
          'Schedule and report export to Excel, PNG, PDF'
        ]}
        customerNames={[
          'Plastilite Corporation',
          'INCON Incorporated',
          'Cummins Engine',
          'BAE Systems'
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
        <section className="py-8">
          <div className="container mx-auto max-w-7xl px-4">
            <h1 className="mb-4 max-w-4xl text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              EDGEBIC works with the ERP you already have
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-700">
              JobBOSS, Epicor, Fourth Shift, SAP, Oracle, Sage, Macola: if your
              ERP can export to Excel, CSV, or a database, EDGEBIC can schedule
              from it. Items, routings, and orders come in through reusable
              import masks; finite capacity schedules and realistic dates go
              back out. No custom API project. No middleware.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y bg-slate-50 py-10">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
              How the integration works
            </h2>
            <div className="grid max-w-5xl gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  1. Export from your ERP
                </h3>
                <p className="text-base leading-relaxed text-slate-600">
                  Use the exports your ERP already produces: item masters,
                  work centers, routings, open orders. Excel, CSV, or a direct
                  database source all work.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  2. Map columns once
                </h3>
                <p className="text-base leading-relaxed text-slate-600">
                  An import mask maps your columns to EDGEBIC fields, converts
                  units where needed, and remembers the mapping. Routing
                  imports wire up operation sequences automatically in a
                  second pass.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  3. Schedule and send dates back
                </h3>
                <p className="text-base leading-relaxed text-slate-600">
                  EDGEBIC schedules against finite capacity and exports
                  realistic dates, dispatch lists, and reports back to Excel
                  for your ERP and your customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Per-ERP sections */}
        <section className="py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="space-y-12">
              {ERP_SECTIONS.map((erp) => (
                <div
                  key={erp.name}
                  className="max-w-4xl"
                >
                  <h2 className="mb-3 text-2xl font-bold text-slate-900">
                    {erp.heading}
                  </h2>
                  {erp.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mb-3 text-base leading-relaxed text-slate-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-4xl text-base leading-relaxed text-slate-700">
              Running something else? SAP, Oracle, Sage, Macola, AS400-era
              systems, and home-grown databases have all fed this integration
              architecture across 35 years, including Cummins Engine
              scheduling across 33 locations from AS400 data. If it exports,
              EDGEBIC schedules it.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t bg-slate-50 py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
              ERP integration questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                >
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href={Routes.Contact}
                className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              >
                Bring your ERP export to a demo
              </Link>
              <Link
                href={Routes.Edgebic}
                className="font-semibold text-cyan-700 transition-colors hover:text-cyan-800"
              >
                EDGEBIC product overview
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
