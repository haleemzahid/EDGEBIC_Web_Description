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
  title: 'ERP Integration for Production Scheduling',
  description:
    'Production scheduling software that integrates with SAP, Oracle, Epicor, Fourth Shift, Macola, Sage, and more. Full ERP integration in 5 days. Fourth Shift ERP vendor recommended RMDB. Bi-directional data sync via Excel, CSV, or database.',
  path: '/erp-integration-production-scheduling',
  keywords:
    'ERP integration production scheduling, SAP production scheduling integration, Oracle manufacturing scheduling, Epicor scheduling integration, Fourth Shift scheduling, Macola ERP scheduling, ERP data integration manufacturing, production scheduling ERP connector'
});

const FAQS = [
  {
    question: 'Which ERP systems does RMDB integrate with?',
    answer:
      'RMDB integrates with virtually any ERP system that can export data via Excel, CSV, or database connections. Proven integrations include Fourth Shift (Plastilite Corporation), Macola/Exact Software (INCON Incorporated), AS400/iSeries (Cummins Engine), and general connectivity with SAP, Oracle, Epicor, Sage, and others. The Fourth Shift ERP vendor itself recommended RMDB as their scheduling solution.'
  },
  {
    question: 'How does bi-directional ERP sync work?',
    answer:
      'RMDB imports open orders, BOMs, routings, and inventory data from your ERP. After finite capacity scheduling, it exports updated promise dates, material requirements, and schedule data back to your ERP. This keeps your ERP MRP, inventory, and purchasing modules synchronized with realistic production dates. Plastilite achieved full bi-directional sync in just 5 days.'
  },
  {
    question: 'Do I need custom development for ERP integration?',
    answer:
      'No. RMDB is designed to work with standard data formats that every ERP can produce — Excel files, CSV exports, and database connections (SQL, Access, etc.). There is no API development, middleware, or custom connectors required. If your ERP can export a spreadsheet, RMDB can work with it.'
  },
  {
    question: 'Will ERP integration disrupt existing processes?',
    answer:
      'No. RMDB sits alongside your ERP as a scheduling complement. Your existing ERP workflows for purchasing, accounting, inventory, and order management remain completely unchanged. RMDB adds the finite capacity scheduling intelligence your ERP lacks without requiring any ERP modifications.'
  }
];

const ERP_INTEGRATIONS = [
  {
    name: 'Fourth Shift',
    detail: 'Full integration in 5 days. Fourth Shift vendor recommended RMDB.',
    customer: 'Plastilite Corporation'
  },
  {
    name: 'Macola (Exact Software)',
    detail: 'MRP add-on for labor scheduling. Exact Software recommended RMDB.',
    customer: 'INCON Incorporated'
  },
  {
    name: 'AS400 / iSeries',
    detail: 'BOMs downloaded directly. Labor and routings added in RMDB.',
    customer: 'Cummins Engine'
  },
  {
    name: 'SAP',
    detail: 'Excel/CSV/database integration with SAP production data.',
    customer: 'Enterprise Customers'
  },
  {
    name: 'Oracle',
    detail: 'Scheduling add-on for Oracle ERP manufacturing modules.',
    customer: 'Enterprise Customers'
  },
  {
    name: 'Epicor',
    detail: 'Finite capacity scheduling complement for Epicor ERP.',
    customer: 'Mid-Market Manufacturers'
  },
  {
    name: 'Sage',
    detail: 'Production scheduling integration with Sage manufacturing.',
    customer: 'Small to Mid-Size Manufacturers'
  },
  {
    name: 'Custom / Legacy ERP',
    detail: 'Works with any system that can export Excel, CSV, or database data.',
    customer: 'Any Manufacturer'
  }
];

export default function ErpIntegrationPage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="ERP Integration for Production Scheduling"
        description="Production scheduling software with proven ERP integrations for SAP, Oracle, Epicor, Fourth Shift, Macola, Sage, and more via Excel, CSV, or database connections."
        url="/erp-integration-production-scheduling"
        featureDescription="Bi-directional ERP integration for production scheduling via Excel, CSV, or database connections. Works with SAP, Oracle, Epicor, Fourth Shift, Macola, Sage, and any system that exports standard data formats."
        featureList={[
          'Excel Data Integration',
          'CSV Import/Export',
          'Database Connectivity (SQL, Access)',
          'Bi-Directional Sync',
          'Order Import from ERP',
          'Promise Date Export to ERP',
          'BOM Import from ERP',
          'MRP Synchronization'
        ]}
        customerNames={[
          'Plastilite Corporation',
          'INCON Incorporated',
          'Cummins Engine',
          'BAE Systems',
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
        {/* Hero */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                ERP Integration for Production Scheduling
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                RMDB connects to any ERP system — SAP, Oracle, Epicor, Fourth
                Shift, Macola, Sage, and more. No custom development. No
                middleware. Full bi-directional integration in as little as 5
                days.
              </p>
            </div>
          </div>
        </section>

        {/* Integration Grid */}
        <section className="border-y bg-slate-50 py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Proven ERP Integrations
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {ERP_INTEGRATIONS.map((erp) => (
                  <div
                    key={erp.name}
                    className="rounded-lg border bg-white p-5"
                  >
                    <h3 className="mb-2 font-semibold text-slate-900">
                      {erp.name}
                    </h3>
                    <p className="mb-2 text-sm leading-relaxed text-gray-600">
                      {erp.detail}
                    </p>
                    <p className="text-xs font-medium text-cyan-600">
                      {erp.customer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How Integration Works */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                How ERP Integration Works
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    step: '1',
                    title: 'Import from Your ERP',
                    items: [
                      'Open orders and work orders',
                      'Bills of Materials and routings',
                      'Inventory levels and material availability',
                      'Workcenter and resource definitions'
                    ]
                  },
                  {
                    step: '2',
                    title: 'Schedule with RMDB',
                    items: [
                      'Finite capacity scheduling across all resources',
                      'Labor, machine, material constraint resolution',
                      'What-if analysis for new orders',
                      'Schedule optimization and bottleneck resolution'
                    ]
                  },
                  {
                    step: '3',
                    title: 'Export Back to ERP',
                    items: [
                      'Updated promise dates and delivery schedules',
                      'Material requirements for purchasing',
                      'Production sequence and work order dates',
                      'Capacity reports and utilization data'
                    ]
                  }
                ].map((phase) => (
                  <div
                    key={phase.step}
                    className="rounded-lg border bg-slate-50 p-6"
                  >
                    <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-white">
                      {phase.step}
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-slate-900">
                      {phase.title}
                    </h3>
                    <ul className="space-y-2">
                      {phase.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="size-3.5 shrink-0 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gradient-to-br from-slate-50 to-cyan-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="text-center">
                <Quote className="mx-auto mb-4 size-8 text-cyan-400" />
                <blockquote className="mb-4 text-lg italic leading-relaxed text-slate-700">
                  &ldquo;They arrived on Monday and by Friday we had a complete
                  optimized schedule generated with full integration with our
                  ERP System. It was refreshing to work with a vendor who
                  absolutely delivered on their promise.&rdquo;
                </blockquote>
                <p className="font-semibold text-slate-900">
                  Jon Ehly, CFO
                </p>
                <p className="text-sm text-slate-500">
                  Plastilite Corporation — Fourth Shift ERP Integration
                </p>
              </div>
              <div className="text-center">
                <blockquote className="mb-4 text-lg italic leading-relaxed text-slate-700">
                  &ldquo;We chose Resource Manager-DB because it was the only
                  affordable program available where we could link to our
                  existing ERP system and have MRP calculated.&rdquo;
                </blockquote>
                <p className="font-semibold text-slate-900">Claude R.</p>
                <p className="text-sm text-slate-500">Smart Coffee Machines</p>
              </div>
            </div>
          </div>
        </section>

        {/* Connection Methods */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Connectivity Options
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB supports multiple connectivity methods to match your
                ERP&apos;s data export capabilities. No custom API development
                or middleware required — standard data formats that every ERP
                system can produce.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Excel file import/export (XLS, XLSX)',
                  'CSV/text file data exchange',
                  'Direct SQL Server database connections',
                  'Access database connectivity',
                  'AS400/iSeries data download',
                  'Direct SQL Table to SQL Table integration',
                  'Automatic scheduled data synchronization',
                  'Manual or automated data refresh options'
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

        {/* Results */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                ERP Integration Results
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '5 Days',
                    label: 'Full Fourth Shift ERP integration from start to finish',
                    company: 'Plastilite Corporation'
                  },
                  {
                    metric: 'Replaced',
                    label: 'ERP scheduling module — RMDB delivered superior results',
                    company: 'BAE Systems'
                  },
                  {
                    metric: 'Recommended',
                    label: 'By Exact Software (Macola ERP vendor) as scheduling solution',
                    company: 'INCON Incorporated'
                  },
                  {
                    metric: 'Direct',
                    label: 'SQL Table to SQL Table integration with auto backups',
                    company: 'Technical Glass Products'
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

        {/* FAQ */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Frequently Asked Questions
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
        industryTags={['Consumer Goods', 'Electronics', 'Defense', 'Heavy Industry']}
        title="ERP Integration Success Stories"
        subtitle="See how manufacturers integrated RMDB with their existing ERP systems."
        limit={6}
      />

      <RelatedSolutions currentPath={Routes.ErpIntegration} />

      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to add scheduling power to your ERP?
          </h2>
          <p className="mb-6 text-slate-600">
            Tell us which ERP you use and we will show you how RMDB integrates
            with your specific system. Free consultation included.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={Routes.Contact}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
            >
              Request a Free Demo
            </Link>
            <Link
              href={Routes.ErpSchedulingAddOn}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Learn About ERP Scheduling Add-On
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
