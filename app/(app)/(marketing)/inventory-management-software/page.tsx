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
  title: 'Inventory Management Software for Manufacturers',
  description:
    'Manufacturing inventory management software with lot traceability, multi-location stock, BOM-driven material planning, and live integration to your production schedule. Used by Enevate (10-level sub-assemblies), Plastilite, and Smart Coffee.',
  path: '/inventory-management-software',
  keywords:
    'inventory management software, inventory management software for manufacturers, manufacturing inventory software, inventory control software, inventory tracking software, lot traceability software, raw material inventory software, finished goods inventory management, multi-location inventory software, MRP inventory software, BOM inventory management'
});

const FAQS = [
  {
    question: 'What is inventory management software for manufacturing?',
    answer:
      'Manufacturing inventory management software tracks raw materials, work-in-progress (WIP), and finished goods across the production process — and ties that stock data to BOMs, the production schedule, and purchasing. Unlike retail inventory tools, it accounts for lot/serial traceability, multi-level BOM consumption, scrap, and material substitutions.'
  },
  {
    question: 'How does RMDB inventory management work?',
    answer:
      'RMDB tracks on-hand stock by part, location, lot, and revision in real time. As production work orders complete, RMDB consumes raw materials and adds finished goods automatically — no separate inventory transactions. MRP nets demand against current inventory and open POs every time the schedule runs, so material shortages are flagged before they break the schedule.'
  },
  {
    question: 'Does the inventory software support lot traceability?',
    answer:
      'Yes. Full lot and serial traceability is supported. Enevate Corporation uses RMDB to trace materials through 10 levels of sub-assembly with lot-level genealogy from raw material through finished battery cells. Lot-controlled inventory also supports recall scenarios, FDA/regulatory compliance, and FEFO/FIFO consumption rules.'
  },
  {
    question: 'Can I manage inventory across multiple warehouses or plants?',
    answer:
      'Yes. RMDB supports multi-location inventory natively — separate stock by plant, warehouse, stockroom, or staging area. Cummins Engine runs RMDB across 33 sites with unified material visibility. Inter-plant transfers, location-specific lead times, and location-aware reorder points are all built in.'
  },
  {
    question: 'How does inventory management connect to the production schedule?',
    answer:
      'This is the core differentiator. Most inventory tools live separately from scheduling — you find out about shortages when production stops. RMDB schedules against actual material availability: an operation cannot be scheduled if its materials are not on hand or scheduled to arrive in time. Inventory and the schedule are one system, not two.'
  }
];

export default function InventoryManagementSoftwarePage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="Inventory Management Software for Manufacturers"
        description="Manufacturing inventory management software with lot traceability, multi-location stock, BOM-driven planning, and live integration to the production schedule."
        url="/inventory-management-software"
        featureDescription="Real-time manufacturing inventory management: raw material, WIP, and finished goods tracking with lot traceability, multi-location stock, and live MRP integration."
        featureList={[
          'Real-Time On-Hand Inventory by Part, Location, Lot',
          'Lot and Serial Traceability with Genealogy',
          'Multi-Location and Multi-Warehouse Stock',
          'BOM-Driven Material Consumption',
          'Inventory Valuation (FIFO, LIFO, Average, Standard)',
          'FEFO and Lot Expiration Tracking',
          'MRP-Integrated Reorder and Replenishment',
          'Cycle Counting and Physical Inventory'
        ]}
        customerNames={[
          'Enevate Corporation',
          'Plastilite Corporation',
          'Smart Coffee',
          'Sleepmaster Ltd',
          'Cummins Engine'
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
                Inventory Management Software Built for Manufacturers
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Real-time inventory tied to your BOMs, your MRP plan, and your
                production schedule — not a separate database that gets stale.
                Lot traceability, multi-location stock, and live material
                availability checks before you commit a job.
              </p>
            </div>
          </div>
        </section>

        {/* Why manufacturer-specific inventory matters */}
        <section className="border-y bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Generic Inventory Tools vs. Manufacturer-Built Inventory Software
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-red-200 bg-white p-6">
                  <h3 className="mb-4 text-lg font-semibold text-red-700">
                    Generic Inventory Software
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    {[
                      'Tracks SKUs but does not understand BOMs or sub-assemblies',
                      'No connection to production schedule — shortages found too late',
                      'Lot traceability is bolted on or absent',
                      'WIP inventory is invisible — only raw and finished are tracked',
                      'Cannot net demand against scheduled production'
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 size-2 shrink-0 rounded-full bg-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-green-200 bg-white p-6">
                  <h3 className="mb-4 text-lg font-semibold text-green-700">
                    RMDB Manufacturing Inventory
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    {[
                      'Multi-level BOM-aware material consumption (up to 10 levels deep)',
                      'Live integration with production schedule — shortages flagged before scheduling',
                      'Full lot and serial traceability built in',
                      'Raw, WIP, and finished goods all tracked in one system',
                      'MRP nets every run against on-hand and open POs'
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
                Inventory Management Capabilities
              </h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Real-time on-hand stock by part, location, lot, and revision',
                  'Multi-location, multi-warehouse, multi-plant inventory',
                  'Full lot and serial number traceability with genealogy',
                  'Raw material, WIP, and finished goods tracking',
                  'BOM-driven material consumption on work-order completion',
                  'Inventory valuation (FIFO, LIFO, average cost, standard cost)',
                  'FEFO consumption and lot expiration tracking',
                  'Cycle counting and full physical inventory support',
                  'MRP-driven reorder points and replenishment',
                  'Vendor-managed inventory (VMI) support',
                  'Inter-plant transfers with in-transit tracking',
                  'Inventory turns, days-on-hand, and stock-aging reports'
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
                &ldquo;We needed lot traceability across ten levels of
                sub-assembly with full inventory genealogy from raw material
                through finished cells. RMDB handles that and stays
                synchronized with the schedule.&rdquo;
              </blockquote>
              <p className="font-semibold text-slate-900">
                Operations Team, Enevate Corporation
              </p>
              <p className="text-sm text-slate-500">
                Advanced battery cell manufacturing
              </p>
            </div>
          </div>
        </section>

        {/* Customer results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Inventory Management Outcomes
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '10 Levels',
                    label: 'Sub-assembly inventory tracked with full lot genealogy',
                    company: 'Enevate Corporation'
                  },
                  {
                    metric: '33 Sites',
                    label: 'Multi-location inventory unified across U.S. operations',
                    company: 'Cummins Engine'
                  },
                  {
                    metric: 'Live Sync',
                    label: 'Inventory transactions tied to ERP in real time',
                    company: 'Plastilite Corporation'
                  },
                  {
                    metric: 'AUD$50M',
                    label: 'Inventory + materials run on RMDB by part-time setup',
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
              Inventory Management Software FAQs
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
        industryTags={['Electronics', 'Consumer Goods', 'Heavy Industry', 'Job Shop']}
        title="Manufacturing Inventory Success Stories"
        subtitle="See how manufacturers cut shortages and gained material visibility with RMDB."
        limit={6}
      />

      <RelatedSolutions currentPath={Routes.InventoryManagementSoftware} />

      {/* CTA */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            See Inventory Software That Talks to Your Schedule
          </h2>
          <p className="mb-6 text-slate-600">
            Get a free live demo with your own parts and BOMs. See how lot
            tracking, multi-location stock, and material availability checks
            integrate with finite capacity scheduling.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={Routes.Contact}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
            >
              Request a Free Demo
            </Link>
            <Link
              href={Routes.MrpSystem}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              See the MRP System
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
