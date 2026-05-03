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
  title: 'Manufacturing Software for Scheduling, MRP, Inventory & Analytics',
  description:
    'Integrated manufacturing software from User Solutions — production scheduling, MRP, BOM, inventory management, and shop-floor analytics in one platform. Trusted by USS Nimitz, GE Railcar, Cummins Engine, and 1,000+ manufacturers since 1991.',
  path: '/manufacturing-software',
  keywords:
    'manufacturing software, manufacturing software company, manufacturing management software, manufacturing software for small business, integrated manufacturing software, manufacturing software solutions, manufacturing planning software, manufacturing operations software, manufacturing ERP software, production manufacturing software, manufacturing software platform'
});

const FAQS = [
  {
    question: 'What does manufacturing software do?',
    answer:
      'Manufacturing software ties together production planning, scheduling, inventory, purchasing, BOMs, and shop-floor execution so a manufacturer can plan realistic delivery dates, control stock, and run the business from one source of truth. User Solutions provides this as an integrated platform — RMDB for scheduling and MRP, EDGEBI for analytics, and Resource Manager for Excel for spreadsheet-based teams.'
  },
  {
    question: 'What is the best manufacturing software for small business?',
    answer:
      'Small manufacturers usually do not need full enterprise ERP — they need scheduling, MRP, BOMs, inventory, and purchasing in one affordable, fast-to-implement system. RMDB was designed for this profile: Sleepmaster Ltd (AUD$50M) and Turner Bicycles run their full operations on it; implementation typically takes days, not months.'
  },
  {
    question: 'Is User Solutions a manufacturing software company?',
    answer:
      'Yes. User Solutions Inc. has built manufacturing software since 1991 — 35+ years focused exclusively on production scheduling, MRP, capacity planning, and shop-floor analytics for manufacturers. Customers include the US Navy (USS Nimitz), GE Railcar Services, Cummins Engine across 33 sites, BAE Systems, and over 1,000 mid-market manufacturers.'
  },
  {
    question: 'How is RMDB different from a generic ERP system?',
    answer:
      'Most ERP systems use infinite capacity scheduling — they assume unlimited resources and produce unrealistic dates. RMDB uses true finite capacity scheduling against machines, labor, materials, and tooling simultaneously. It either replaces ERP for small manufacturers or layers on top of SAP, Oracle, Epicor, NetSuite, and QuickBooks to add the scheduling intelligence those systems lack.'
  },
  {
    question: 'Can I start with one module and add others later?',
    answer:
      'Yes. The platform is modular — start with scheduling, then add MRP, inventory, BOMs, costing, or BI as you need them. Sleepmaster Ltd specifically chose RMDB because "it can be used in sections — materials planning first, then costings, then scheduling — without requiring whole system implementation."'
  }
];

export default function ManufacturingSoftwarePage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="Manufacturing Software"
        description="Integrated manufacturing software for production scheduling, MRP, inventory, BOMs, and shop-floor analytics."
        url="/manufacturing-software"
        featureDescription="Complete manufacturing software platform combining finite capacity scheduling, MRP, inventory management, BOMs, costing, and real-time analytics."
        featureList={[
          'Finite Capacity Production Scheduling',
          'Material Requirements Planning (MRP)',
          'Inventory Management with Lot Traceability',
          'Multi-Level Bill of Materials',
          'Purchasing and Procurement',
          'Shop-Floor Data Collection',
          'Manufacturing Business Intelligence (EDGEBI)',
          'ERP Integration (SAP, Oracle, Epicor, NetSuite, QuickBooks)'
        ]}
        customerNames={[
          'US Navy (USS Nimitz)',
          'GE Railcar Services',
          'Cummins Engine',
          'BAE Systems',
          'Sleepmaster Ltd',
          'Plastilite Corporation'
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
                Manufacturing Software That Actually Runs the Shop
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Production scheduling, MRP, inventory, BOMs, and analytics in
                one integrated manufacturing software platform. Built for
                manufacturers since 1991 — used by the US Navy, GE Railcar,
                Cummins Engine, and 1,000+ small to mid-size shops.
              </p>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-y bg-slate-50 py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 text-center md:grid-cols-4">
              {[
                { metric: '35+', label: 'Years building manufacturing software' },
                { metric: '1,000+', label: 'Manufacturers served worldwide' },
                { metric: '33 Sites', label: 'Cummins Engine multi-site deployment' },
                { metric: '26,000+', label: 'Tasks scheduled on USS Nimitz' }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-cyan-600">{stat.metric}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The platform — six modules (mirrors MRPeasy spine, anchored to actual products) */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                One Manufacturing Software Platform, Six Connected Capabilities
              </h2>
              <p className="leading-relaxed text-gray-700">
                Most manufacturers buy software in fragments — one tool for
                scheduling, another for inventory, a third for purchasing, and
                Excel for everything else. User Solutions delivers manufacturing
                software as an integrated platform so production planning,
                materials, the shop floor, and the front office stay in sync.
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: 'Production Planning & Scheduling',
                    body: 'Finite capacity scheduling across machines, labor, materials, and tooling simultaneously. Forward and reverse scheduling, alternate routings, what-if scenarios.',
                    href: Routes.ProductionSchedulingSoftware
                  },
                  {
                    title: 'Material Requirements Planning',
                    body: 'Closed-loop MRP that ties planned demand to actual shop-floor execution. Automatic reorder, multi-level BOM explosion, vendor lead-time tracking.',
                    href: Routes.MrpSystem
                  },
                  {
                    title: 'Inventory Management',
                    body: 'Real-time on-hand stock, lot traceability, multi-location, finished-goods tracking, and material valuation tied to live production.',
                    href: Routes.InventoryManagementSoftware
                  },
                  {
                    title: 'Bill of Materials (BOM)',
                    body: 'Multi-level BOMs up to 10 levels deep, engineering revisions, where-used analysis, and BOM-driven costing rolled into the production schedule.',
                    href: Routes.BomSoftware
                  },
                  {
                    title: 'Purchasing & Procurement',
                    body: 'Purchase orders driven by MRP demand, vendor performance tracking, and receiving tied directly to shop-floor material availability.',
                    href: Routes.MrpSoftwareSmallManufacturers
                  },
                  {
                    title: 'Manufacturing Analytics (EDGEBI)',
                    body: 'Real-time KPI dashboards, OEE, on-time delivery, schedule adherence, capacity utilization. Plug-and-play with existing ERP or RMDB data.',
                    href: Routes.Edgebi
                  }
                ].map((mod) => (
                  <Link
                    key={mod.title}
                    href={mod.href}
                    className="group rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-cyan-300 hover:shadow-sm"
                  >
                    <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-cyan-700">
                      {mod.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {mod.body}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why an integrated platform */}
        <section className="border-t bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Why Integrated Manufacturing Software Beats a Stack of Tools
              </h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Single source of truth — schedule, inventory, BOMs, and purchasing share one database',
                  'Material shortages flag schedule risk automatically — no spreadsheet reconciliation',
                  'BOM changes cascade to MRP and to the shop-floor schedule the same day',
                  'Costing rolls up live from actual production data, not month-end exports',
                  'Works with your existing ERP (SAP, Oracle, Epicor, NetSuite, QuickBooks) — not a rip-and-replace',
                  'Modular — start with scheduling and add MRP, inventory, or BI as you grow',
                  'Excel-familiar interface — minimal training, fast adoption',
                  'Days-to-weeks implementation vs. 6–12 months for enterprise ERP'
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <CheckCircle className="mt-1 size-4 shrink-0 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Customer testimonial */}
        <section className="bg-gradient-to-br from-slate-50 to-cyan-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Quote className="mx-auto mb-4 size-8 text-cyan-400" />
              <blockquote className="mb-4 text-lg italic leading-relaxed text-slate-700">
                &ldquo;The biggest benefit relative to other manufacturing
                software is its simplicity to operate and the speed at which it
                can generate results in whichever area you want to start
                on.&rdquo;
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
                Manufacturing Software Results From Real Customers
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '30→90%',
                    label: 'On-time shipping increase after switching from infinite to finite capacity scheduling',
                    company: 'GE Railcar Services'
                  },
                  {
                    metric: '33 Sites',
                    label: 'Multi-site manufacturing software deployment with 6-month planning horizon',
                    company: 'Cummins Engine'
                  },
                  {
                    metric: '1 Week',
                    label: 'ERP integration completed end-to-end',
                    company: 'Plastilite Corporation'
                  },
                  {
                    metric: '4%',
                    label: 'Capacity increase from existing resources via bottleneck identification',
                    company: 'Technical Glass Products'
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
              Manufacturing Software FAQs
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
        industryTags={['Defense', 'Heavy Industry', 'Job Shop', 'Electronics', 'Consumer Goods']}
        title="Manufacturing Software Success Stories"
        subtitle="See how 1,000+ manufacturers run their operations on integrated User Solutions software."
        limit={6}
      />

      <RelatedSolutions currentPath={Routes.ManufacturingSoftware} />

      {/* CTA */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            See Manufacturing Software Built for Manufacturers
          </h2>
          <p className="mb-6 text-slate-600">
            Get a free live demo with your own data — see scheduling, MRP,
            inventory, and analytics working together in one platform.
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
              Explore RMDB
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
