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
  title: 'Excel to Scheduling Software',
  description:
    'Upgrade from Excel spreadsheet scheduling to production scheduling software without losing Excel familiarity. Kyocera replaced their complex custom Excel program. USS Nimitz replaced 10 Excel master files. Works with your existing Excel data.',
  path: '/excel-to-scheduling-software',
  keywords:
    'excel scheduling software replacement, replace excel production scheduling, excel to manufacturing software, spreadsheet scheduling alternative, production planning excel upgrade, manufacturing scheduling beyond excel, excel production planning replacement'
});

const FAQS = [
  {
    question: 'Can I keep using Excel with RMDB?',
    answer:
      'Yes — and that is by design. RMDB (Resource Manager DB) was built to work with Excel data. RMX (Resource Manager for Excel) is literally an Excel add-on. Your team keeps the Excel familiarity they already have while gaining finite capacity scheduling, MRP, and what-if analysis that spreadsheets cannot provide. Multiple customers noted there was "not even a learning curve" because of the Excel integration.'
  },
  {
    question: 'Why should I replace Excel for production scheduling?',
    answer:
      'Excel is excellent for many things but breaks down for production scheduling at scale. It cannot do finite capacity scheduling, cannot handle simultaneous resource constraints, becomes unmaintainable with complex custom formulas, and requires manual updates that consume 40+ hours per week (as Homestead Furniture experienced). RMDB automates what Excel cannot.'
  },
  {
    question: 'Will I lose my existing Excel data and reports?',
    answer:
      'No. RMDB imports your existing Excel data directly — no reformatting or migration required. Kyocera imported data from their Excel program and Access Database to "bring the system online quickly." You can continue exporting reports to Excel for distribution, analysis, and sharing — the best of both worlds.'
  },
  {
    question: 'How complex can Excel scheduling get before it needs replacing?',
    answer:
      'Kyocera had built a "complex employee-written Excel program that was becoming very time consuming and difficult to maintain." The USS Nimitz had built "a solid and rather impressive scheduling system out of Excel" but it lacked finite capacity planning. When one person leaving would break your scheduling system, it is time to upgrade.'
  }
];

export default function ExcelToSchedulingPage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="Excel to Scheduling Software"
        description="Production scheduling software that works with your existing Excel data and preserves Excel familiarity while adding finite capacity scheduling, MRP, and automation."
        url="/excel-to-scheduling-software"
        featureDescription="Excel-compatible production scheduling that imports existing spreadsheet data, preserves Excel familiarity, and adds finite capacity scheduling, MRP, and what-if analysis."
        featureList={[
          'Excel Data Import',
          'Excel-Familiar Interface',
          'Finite Capacity Scheduling',
          'Replaces Complex Custom Spreadsheets',
          'Automated Schedule Generation',
          'MRP and Inventory Management',
          'Excel Report Export',
          'No Data Migration Required'
        ]}
        customerNames={[
          'Kyocera Industrial Ceramics',
          'US Navy (USS Nimitz)',
          'Turner Suspension Bicycles',
          'Homestead Furniture'
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
                Outgrow Excel Without Losing What You Love About It
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Your Excel scheduling has served you well — but it cannot scale.
                RMDB keeps the Excel familiarity your team relies on while
                adding finite capacity scheduling, MRP, and automation that
                spreadsheets simply cannot provide.
              </p>
            </div>
          </div>
        </section>

        {/* Excel vs RMDB Comparison */}
        <section className="border-y bg-slate-50 py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Excel Scheduling vs. RMDB
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-red-200 bg-white p-6">
                  <h3 className="mb-4 text-lg font-semibold text-red-700">
                    Excel Scheduling Limits
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'No finite capacity scheduling — cannot respect real constraints',
                      '40+ hours/week maintaining complex custom formulas',
                      'Single-person dependency — breaks when that person leaves',
                      'Cannot schedule machines, labor, and materials simultaneously',
                      'No what-if analysis for new orders or capacity changes',
                      '10 separate master files with no integration (USS Nimitz)'
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="mt-1 size-2 shrink-0 rounded-full bg-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-green-200 bg-white p-6">
                  <h3 className="mb-4 text-lg font-semibold text-green-700">
                    RMDB with Excel Integration
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'True finite capacity scheduling across all resource types',
                      '2 hours/week — 95% time savings (Homestead Furniture)',
                      'System-driven scheduling — not dependent on one person',
                      'Schedules machines, labor, materials, and tooling simultaneously',
                      'What-if analysis secured largest order ever (Turner Bicycles)',
                      'One unified system replacing fragmented spreadsheets'
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
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

        {/* Migration Path */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Your Path from Excel to Real Scheduling
              </h2>
              <p className="leading-relaxed text-gray-700">
                User Solutions offers two products designed for the Excel-to-scheduling
                migration path. Start with RMX (Resource Manager for Excel) — a
                true Excel add-on — and upgrade to RMDB (Resource Manager DB)
                when you need database-level power. Both work with your existing
                Excel data, and the transition is seamless.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-white p-6">
                  <h3 className="mb-2 text-lg font-semibold text-cyan-700">
                    RMX — Excel Add-On
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Start here if your team lives in Excel.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'True Excel add-on — runs inside Excel',
                      'Finite capacity scheduling engine',
                      'Bills of Resources and basic MRP',
                      'Forward and reverse scheduling',
                      'Leverages Excel 1M+ row capacity'
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle className="size-3.5 shrink-0 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-cyan-200 bg-cyan-50/50 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-cyan-700">
                    RMDB — Full Scheduling Platform
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Upgrade when you need database power and ERP integration.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Everything in RMX plus database backend',
                      'Multi-user access and ERP integration',
                      'Advanced MRP, purchasing, and costing',
                      'EDGEBI drag-and-drop Gantt charts',
                      'Multi-location scheduling support'
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle className="size-3.5 shrink-0 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-gradient-to-br from-slate-50 to-cyan-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Quote className="mx-auto mb-4 size-8 text-cyan-400" />
              <blockquote className="mb-4 text-lg italic leading-relaxed text-slate-700">
                &ldquo;This replaced a complex employee written Excel program
                that was becoming very time consuming and difficult to maintain.
                We were also able to use previously entered data from an Access
                Database to bring the system online quickly.&rdquo;
              </blockquote>
              <p className="font-semibold text-slate-900">
                Brian Kendall, Industrial Engineer
              </p>
              <p className="text-sm text-slate-500">Kyocera Industrial Ceramics</p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Excel Migration Results
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '40→2 hrs',
                    label:
                      'Weekly scheduling time after replacing manual Excel processes',
                    company: 'Homestead Furniture'
                  },
                  {
                    metric: '10→1',
                    label:
                      'Separate Excel master files replaced by one unified system',
                    company: 'USS Nimitz'
                  },
                  {
                    metric: '3 Depts',
                    label:
                      'Coordinated under one schedule — replacing 3 separate Excel systems',
                    company: 'Kyocera'
                  },
                  {
                    metric: 'Zero',
                    label:
                      'Learning curve thanks to Excel-compatible interface and data',
                    company: 'Multiple Customers'
                  }
                ].map((result) => (
                  <div
                    key={result.company + result.metric}
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
        <section className="bg-slate-50 py-12">
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
        industryTags={['Job Shop', 'Electronics', 'Defense', 'Consumer Goods']}
        title="Excel Migration Success Stories"
        subtitle="See how manufacturers upgraded from spreadsheet scheduling to RMDB."
        limit={6}
      />

      <RelatedSolutions currentPath={Routes.ExcelToScheduling} />

      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to outgrow your spreadsheet?
          </h2>
          <p className="mb-6 text-slate-600">
            See how RMDB works with your existing Excel data — zero learning
            curve, immediate results. Schedule a free demo today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={Routes.Contact}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
            >
              Request a Free Demo
            </Link>
            <Link
              href="/resource-manager-for-excel-2"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Start with RMX (Excel Add-On)
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
