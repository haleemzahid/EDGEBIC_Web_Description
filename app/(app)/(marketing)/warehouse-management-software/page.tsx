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
  title: 'Warehouse Management Software for Manufacturers',
  description:
    'Warehouse management software (WMS) built for manufacturers — multi-location stock, lot tracking, staging, inter-plant transfers, and material flow tied to your production schedule. Used by Cummins (33 sites), Enevate, and Plastilite.',
  path: '/warehouse-management-software',
  keywords:
    'warehouse management software, WMS software, warehouse management system, manufacturing warehouse software, warehouse inventory software, multi-location warehouse software, stockroom management software, material flow software, warehouse tracking software, manufacturing WMS, plant warehouse management'
});

const FAQS = [
  {
    question: 'What is warehouse management software for a manufacturer?',
    answer:
      'For manufacturers, warehouse management software (WMS) tracks raw material, WIP, and finished goods movement across stockrooms, staging areas, and plants — and ties it to the production schedule so material gets to the right workcenter on time. It is different from retail/3PL WMS tools because it must understand BOMs, work orders, lot traceability, and shop-floor consumption.'
  },
  {
    question: 'How is RMDB warehouse management different from a generic WMS?',
    answer:
      'A generic WMS focuses on receiving, putaway, picking, and shipping for distribution. RMDB focuses on the manufacturer-specific flows: kitting raw materials to a work order, staging at the right workcenter, consuming through BOMs, tracking WIP between operations, and putting away finished goods with full lot genealogy. It is integrated with finite capacity scheduling so material flow follows the production schedule, not the other way around.'
  },
  {
    question: 'Does the warehouse software support multiple locations?',
    answer:
      'Yes. RMDB supports multi-location, multi-warehouse, multi-stockroom inventory natively. Cummins Engine runs 33 sites on it with unified material visibility. Inter-plant and intra-plant transfers, staging areas, dedicated rework locations, and quality-hold zones are all configurable.'
  },
  {
    question: 'Does it support lot traceability and FEFO/FIFO consumption?',
    answer:
      'Yes. Full lot and serial traceability with genealogy is built in. FEFO (first-expired-first-out) and FIFO consumption rules are supported, which is critical for food, pharma, and battery manufacturers. Enevate Corporation tracks lot genealogy across 10 levels of battery sub-assembly through the warehouse and back.'
  },
  {
    question: 'Can warehouse data feed back to my ERP?',
    answer:
      'Yes. RMDB integrates with SAP, Oracle, Epicor, NetSuite, and QuickBooks. Inventory movements, receipts, and consumption can flow back to the ERP in near-real-time. Plastilite Corporation completed a full warehouse-to-ERP integration in one week.'
  }
];

export default function WarehouseManagementSoftwarePage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="Warehouse Management Software for Manufacturers"
        description="Manufacturer-built warehouse management software (WMS) with multi-location stock, lot tracking, material staging, and live integration to the production schedule."
        url="/warehouse-management-software"
        featureDescription="Warehouse management software designed for manufacturing material flow: stockroom tracking, kitting, staging, inter-plant transfers, lot traceability, and integrated production scheduling."
        featureList={[
          'Multi-Location, Multi-Stockroom Inventory',
          'Raw, WIP, and Finished Goods Tracking',
          'Lot and Serial Traceability with Genealogy',
          'Kitting and Material Staging by Work Order',
          'Inter-Plant and Intra-Plant Transfers',
          'FEFO and FIFO Consumption Rules',
          'Cycle Counting and Physical Inventory',
          'ERP Integration (SAP, Oracle, Epicor, NetSuite, QuickBooks)'
        ]}
        customerNames={[
          'Cummins Engine',
          'Enevate Corporation',
          'Plastilite Corporation',
          'Sleepmaster Ltd',
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
                Warehouse Management Software for Manufacturers
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Multi-location stock, lot traceability, kitting, and material
                staging — connected to your production schedule. The WMS that
                understands BOMs, work orders, and shop-floor consumption, not
                just receiving and shipping.
              </p>
            </div>
          </div>
        </section>

        {/* Manufacturing WMS vs distribution WMS */}
        <section className="border-y bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Distribution WMS vs. Manufacturing WMS
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-white p-6">
                  <h3 className="mb-4 text-lg font-semibold text-slate-700">
                    Distribution / 3PL WMS
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    {[
                      'Optimized for receive → putaway → pick → ship',
                      'Treats every part as a SKU, ignoring BOM relationships',
                      'No connection to a production schedule',
                      'WIP between operations is invisible',
                      'Lot tracking is bolted on, not native'
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 size-2 shrink-0 rounded-full bg-slate-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-cyan-200 bg-white p-6">
                  <h3 className="mb-4 text-lg font-semibold text-cyan-700">
                    RMDB Manufacturing WMS
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    {[
                      'Optimized for material flow into and through production',
                      'Understands multi-level BOMs up to 10 levels deep',
                      'Live integration with finite capacity scheduling',
                      'Tracks raw, WIP, and finished goods in one system',
                      'Full lot and serial genealogy native to the platform'
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

        {/* Capabilities */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Warehouse Management Capabilities Built for Manufacturers
              </h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Multi-location and multi-stockroom inventory by part, lot, and revision',
                  'Receiving with PO matching and quality-hold staging',
                  'Putaway logic by location, lot, and storage rule',
                  'Kitting and material staging by work order or operation',
                  'Inter-plant transfers with in-transit tracking',
                  'Intra-plant moves between staging, WIP, and finished-goods locations',
                  'Lot and serial traceability with full genealogy',
                  'FEFO and FIFO consumption rules',
                  'Quality holds and quarantine locations',
                  'Cycle counting and full physical inventory',
                  'Inventory valuation (FIFO, LIFO, average, standard)',
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
                &ldquo;Running 33 sites on a unified material picture was
                impossible with our prior systems. RMDB gives us location-level
                inventory visibility that drives the master schedule.&rdquo;
              </blockquote>
              <p className="font-semibold text-slate-900">
                Operations Team, Cummins Engine
              </p>
              <p className="text-sm text-slate-500">
                33 U.S. manufacturing locations
              </p>
            </div>
          </div>
        </section>

        {/* Customer results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Manufacturing Warehouse Outcomes
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '33 Sites',
                    label: 'Unified multi-warehouse material visibility',
                    company: 'Cummins Engine'
                  },
                  {
                    metric: '10 Levels',
                    label: 'Lot genealogy through nested sub-assembly stockrooms',
                    company: 'Enevate Corporation'
                  },
                  {
                    metric: '1 Week',
                    label: 'Warehouse-to-ERP integration completed end-to-end',
                    company: 'Plastilite Corporation'
                  },
                  {
                    metric: 'Domestic→Global',
                    label: 'Warehouse footprint scaled to international expansion',
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
              Warehouse Management Software FAQs
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
        industryTags={['Heavy Industry', 'Electronics', 'Consumer Goods', 'Job Shop']}
        title="Manufacturing Warehouse Success Stories"
        subtitle="See how manufacturers unified material flow across multi-site operations with RMDB."
        limit={6}
      />

      <RelatedSolutions currentPath={Routes.WarehouseManagementSoftware} />

      {/* CTA */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            See Warehouse Software That Talks to Your Shop Floor
          </h2>
          <p className="mb-6 text-slate-600">
            Get a free live demo with your own warehouse and BOM data. See how
            multi-location stock, lot tracking, and kitting connect to finite
            capacity scheduling.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={Routes.Contact}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
            >
              Request a Free Demo
            </Link>
            <Link
              href={Routes.InventoryManagementSoftware}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              See Inventory Software
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
