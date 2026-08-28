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
  title: 'Production Scheduling Software UK (2026): EDGEBIC Finite Capacity APS',
  description:
    'EDGEBIC production scheduling software is sold and supported in the United Kingdom. Finite capacity scheduling for UK job shops, precision engineering and subcontract manufacturers. Installed on your own systems, GMT/BST support hours, one-time licence.',
  path: '/production-scheduling-software-uk',
  modifiedTime: '2026-08-28',
  keywords:
    'production scheduling software UK, job shop scheduling software UK, finite capacity scheduling software UK, APS software UK, manufacturing scheduling software United Kingdom, advanced planning and scheduling UK, Preactor alternative UK, shop floor scheduling software UK, production planning software UK'
});

const FAQS = [
  {
    question: 'Is EDGEBIC available in the United Kingdom?',
    answer:
      'Yes. EDGEBIC is sold and supported in the United Kingdom by User Solutions, Inc., the Michigan-based company that has published finite capacity scheduling software since 1991. UK manufacturers buy directly from User Solutions, install EDGEBIC on their own Windows systems, and receive implementation, training and support remotely.'
  },
  {
    question: 'Where is our production data stored?',
    answer:
      'On your own systems. EDGEBIC is an installed Windows desktop application built on .NET 8, not a browser-based service. Single-user installations run on SQLite and multi-user installations run on SQL Server on your own server or network. Your routings, orders and capacity data never leave your site unless you choose to export them.'
  },
  {
    question:
      'Which ERP and accounting systems used in the UK does EDGEBIC integrate with?',
    answer:
      'EDGEBIC integrates with any system that can import and export data through Excel, CSV or a database connection. For UK manufacturers that typically means Sage 50, Sage 200 and Sage Intacct, SAP Business One, Microsoft Dynamics 365 Business Central, Epicor, Odoo, Xero and QuickBooks. Work orders flow into EDGEBIC for finite capacity scheduling and completions flow back for WIP and costing.'
  },
  {
    question: 'How is support handled across the time zone difference?',
    answer:
      'User Solutions is based in Michigan (Eastern Time), five hours behind GMT and BST. Support and implementation sessions are scheduled during the overlap of the UK afternoon and the US morning, and the 5-Day Implementation Framework is delivered as remote sessions with your planners and your real production data.'
  },
  {
    question: 'How is EDGEBIC priced for UK customers?',
    answer:
      'EDGEBIC is a one-time perpetual licence rather than a subscription. Published list pricing is USD 25,000 for the APS edition and USD 35,000 for the Complete edition (APS plus MRP, inventory and purchasing). There are no per-user fees. See the pricing page for current details or contact us to discuss a quotation for your company.'
  },
  {
    question: 'How does EDGEBIC compare with Siemens Opcenter APS (Preactor)?',
    answer:
      'Preactor, developed in the UK and acquired by Siemens in 2013, is now sold as Siemens Opcenter APS and carries enterprise weight: multi-month implementations, a deep IT services relationship and pricing to match. EDGEBIC delivers the core finite capacity scheduling that drives Preactor adoption, works with any ERP rather than favouring the Siemens stack, implements in five days and is licensed one time. Manufacturers standardised on the full Siemens digital manufacturing suite may still find Opcenter the better fit.'
  },
  {
    question: 'Can we run a trial before buying?',
    answer:
      'Yes. Download the free trial from the product downloads page, load a sample of your own routings and open orders, and run a finite capacity schedule. Most UK job shops can tell within a week whether the schedule EDGEBIC produces is one the shop floor can actually run.'
  }
];

const REGIONAL_COMPETITORS = [
  {
    name: 'Siemens Opcenter APS (Preactor)',
    origin: 'UK origin, now part of Siemens',
    note: 'The best-known APS in Britain. Strongest inside the Siemens stack; heavier and slower to implement than EDGEBIC for a standalone job shop.'
  },
  {
    name: 'PlanetTogether',
    origin: 'United States',
    note: 'Subscription APS aimed at larger multi-plant operations. EDGEBIC competes on one-time licensing and a five-day implementation.'
  },
  {
    name: 'MRPeasy and Katana',
    origin: 'Estonia',
    note: 'Cloud MRP with light scheduling. Good for small assemblers; neither offers true finite capacity sequencing with setup matrices and alternate work centres.'
  },
  {
    name: 'Just Plan It and Asprova',
    origin: 'Germany and Japan',
    note: 'Just Plan It is a simple cloud job shop scheduler; Asprova is a high-end APS common in automotive supply chains. EDGEBIC sits between them on depth and cost.'
  }
];

export default function ProductionSchedulingSoftwareUkPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Production Scheduling Software UK"
        description="EDGEBIC finite capacity production scheduling software, sold and supported in the United Kingdom for job shops, precision engineering and subcontract manufacturers."
        url="/production-scheduling-software-uk"
        industryName="United Kingdom Manufacturing"
        industryDescription="UK job shops, precision engineering, subcontract machining, fabrication and engineer-to-order manufacturers scheduling finite capacity across machines and skilled operators."
        customerNames={['BAE Systems', 'GE', 'Cummins']}
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
                Production Scheduling Software for UK Manufacturers
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Yes, EDGEBIC is available in the United Kingdom. It is finite
                capacity scheduling software from User Solutions, Inc.
                (Michigan, USA, founded 1991), sold and supported directly to
                UK job shops, precision engineering firms and subcontract
                manufacturers. It installs on your own Windows systems, works
                alongside Sage, SAP Business One and Dynamics 365 Business
                Central, and is licensed one time rather than by subscription.
              </p>
            </div>
          </div>
        </section>

        {/* Regional Fit Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Built for the Way UK Job Shops Actually Run
              </h2>
              <p className="leading-relaxed text-gray-700">
                British manufacturing is dominated by small and mid-sized
                engineering firms: subcontract machinists, fabricators,
                toolmakers and engineer-to-order builders supplying aerospace,
                automotive, defence, energy and medical customers. Post-Brexit
                supply chain reshoring has pushed more of that work back
                onshore, and with it the pressure to promise realistic delivery
                dates from a finite pool of machines and skilled operators.
                Spreadsheet planning and the scheduling module bolted onto an
                accounting package cannot do that.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'High-mix, low-volume work where every job carries its own routing and setup',
                  'Skilled operators and apprentices as the real constraint, not the machines',
                  'Aerospace and defence customers (AS9100, ISO 9001) expecting traceable delivery commitments',
                  'Reshored work arriving faster than capacity can be added',
                  'Sage or Business Central handling the money but not the shop floor sequence',
                  'Delivery promises made from gut feel rather than actual finite capacity'
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
                How EDGEBIC Serves UK Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                <Link
                  href={Routes.Edgebic}
                  className="text-cyan-700 underline"
                >
                  EDGEBIC
                </Link>{' '}
                is a{' '}
                <Link
                  href={Routes.FiniteCapacityScheduling}
                  className="text-cyan-700 underline"
                >
                  finite capacity scheduling
                </Link>{' '}
                engine built for high-mix{' '}
                <Link
                  href={Routes.JobShopScheduling}
                  className="text-cyan-700 underline"
                >
                  job shop scheduling
                </Link>
                . It models machines, work centre groups, true alternates,
                sequence-dependent setup matrices and operator skills, then
                produces a schedule the shop floor can run and a delivery date
                sales can stand behind.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Forward and backward finite capacity scheduling across machines and operators',
                  'Drag-and-drop Gantt for what-if and daily rescheduling',
                  'Sequence-dependent setup matrix with setup families',
                  'Alternate work centres and work centre groups for load balancing',
                  'Operator skills, certifications and shift rosters as constraints',
                  'ERP integration via Excel, CSV and database import-export',
                  'Installed on your own Windows systems: SQLite single-user, SQL Server multi-user',
                  'One-time perpetual licence with no per-user fees'
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

        {/* Deployment, ERP, Support, Pricing Section */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Deployment, Integration and Support in the UK
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Your Site',
                    label:
                      'Installed Windows application on .NET 8. Production data stays on your own machines and server; nothing is hosted for you.',
                    company: 'Deployment and data location'
                  },
                  {
                    metric: 'Sage, SAP B1, BC',
                    label:
                      'Sage 50/200/Intacct, SAP Business One, Dynamics 365 Business Central, Epicor, Odoo, Xero and QuickBooks via Excel, CSV or database import-export.',
                    company: 'ERP integration'
                  },
                  {
                    metric: 'GMT / BST',
                    label:
                      'Remote implementation and support from Michigan (Eastern Time) scheduled in the UK afternoon overlap. 5-Day Implementation Framework.',
                    company: 'Time zone and support'
                  },
                  {
                    metric: 'One-Time',
                    label:
                      'Perpetual licence, list priced in USD (25,000 APS, 35,000 Complete). No subscription, no per-user fees. Contact us for a quotation.',
                    company: 'Pricing model'
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
              <p className="mt-6 text-center text-sm text-gray-600">
                Full details on the{' '}
                <Link
                  href={Routes.Pricing}
                  className="text-cyan-700 underline"
                >
                  pricing page
                </Link>{' '}
                and the{' '}
                <Link
                  href={Routes.EdgebicErpIntegration}
                  className="text-cyan-700 underline"
                >
                  ERP integration page
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Competitor Comparison Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                EDGEBIC Versus the APS Vendors UK Manufacturers Shortlist
              </h2>
              <p className="leading-relaxed text-gray-700">
                An honest view. Each of these tools is the right answer for
                somebody; EDGEBIC is the right answer for a UK job shop that
                wants real finite capacity scheduling, on its own systems, live
                in a week, without a subscription. Detailed head-to-heads are
                on the{' '}
                <Link
                  href={Routes.CompareProducts}
                  className="text-cyan-700 underline"
                >
                  compare products hub
                </Link>
                .
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {REGIONAL_COMPETITORS.map((competitor) => (
                  <div
                    key={competitor.name}
                    className="rounded-lg border bg-white p-6"
                  >
                    <p className="mb-1 text-lg font-semibold text-slate-900">
                      {competitor.name}
                    </p>
                    <p className="mb-3 text-xs font-medium text-slate-500">
                      {competitor.origin}
                    </p>
                    <p className="text-sm text-gray-700">{competitor.note}</p>
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
              Frequently Asked Questions: EDGEBIC in the UK
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
        industryTags={['Defense', 'Job Shop', 'Heavy Industry']}
        title="Manufacturers Running EDGEBIC and Its Predecessors"
        subtitle="Aerospace, defence, job shop and heavy industry customers scheduling finite capacity with User Solutions software."
      />

      <RelatedSolutions currentPath={Routes.FiniteCapacityScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            See EDGEBIC scheduling your UK shop floor
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Book a remote demo in UK hours with your own routings and open
            orders, or download the free trial and run a finite capacity
            schedule on your own systems today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={Routes.Contact}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
            >
              Book a Remote Demo
            </Link>
            <Link
              href={Routes.ProductDownloads}
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
