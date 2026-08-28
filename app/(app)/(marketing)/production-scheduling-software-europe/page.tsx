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
  title: 'Production Scheduling Software Europe (2026): EDGEBIC APS for EU Manufacturers',
  description:
    'EDGEBIC production scheduling software is sold and supported across the European Union. Finite capacity APS for job shops and discrete manufacturers in Germany, France, Italy, Spain, the Netherlands, Poland and the Nordics. Installed on your own systems, CET support hours, one-time license.',
  path: '/production-scheduling-software-europe',
  modifiedTime: '2026-08-28',
  keywords:
    'production scheduling software Europe, APS software Europe, finite capacity scheduling software Europe, advanced planning and scheduling software EU, job shop scheduling software Europe, manufacturing scheduling software European Union, production planning software Europe, SAP Business One scheduling add-on Europe, Preactor alternative Europe'
});

const FAQS = [
  {
    question: 'Is EDGEBIC available in Europe?',
    answer:
      'Yes. EDGEBIC is sold and supported throughout the European Union and the wider European market by User Solutions, Inc. of Michigan, USA, which has published finite capacity scheduling software since 1991. Manufacturers in Germany, France, Italy, Spain, the Netherlands, Belgium, Austria, Switzerland, Poland, Sweden, Denmark and Ireland buy directly from User Solutions and install EDGEBIC on their own Windows systems.'
  },
  {
    question: 'Does our production data leave the EU?',
    answer:
      'No. EDGEBIC is an installed Windows desktop application built on .NET 8, not a hosted cloud service. Single-user installations run on SQLite and multi-user installations run on SQL Server on your own server. Routings, orders, capacity and shop floor data stay on your own systems inside your own jurisdiction, which is the simplest possible answer to a data residency review.'
  },
  {
    question: 'Which European ERP systems does EDGEBIC integrate with?',
    answer:
      'EDGEBIC integrates with any ERP that can import and export data through Excel, CSV or a database connection. In Europe that most often means SAP Business One and SAP S/4HANA, Microsoft Dynamics 365 Business Central, Sage, Exact, Odoo, Epicor, Infor and abas. Work orders flow into EDGEBIC for finite capacity scheduling and completions flow back for WIP and costing.'
  },
  {
    question: 'How does support work across European time zones?',
    answer:
      'User Solutions is based in Michigan on US Eastern Time, six hours behind CET and CEST. Implementation and support sessions are scheduled in the European afternoon, which is the US morning. The 5-Day Implementation Framework is delivered remotely with your planners and your real production data, so there is no travel to arrange.'
  },
  {
    question: 'What language is EDGEBIC available in?',
    answer:
      'EDGEBIC, its documentation and its support are in English. Most European planning and engineering teams work comfortably in English, and the graphical Gantt and routing designer carry much of the interface without text. Ask us if you need to discuss language requirements for shop floor kiosk users.'
  },
  {
    question: 'How is EDGEBIC priced for European customers?',
    answer:
      'EDGEBIC is a one-time perpetual license rather than a subscription. Published list pricing is USD 25,000 for the APS edition and USD 35,000 for the Complete edition (APS plus MRP, inventory and purchasing), with no per-user fees. See the pricing page for the current details or contact us to discuss a quotation for your company.'
  },
  {
    question:
      'How does EDGEBIC compare with European APS vendors such as Siemens Opcenter, Netronic and Asprova?',
    answer:
      'Siemens Opcenter APS (formerly Preactor) and Asprova are enterprise APS products with multi-month implementations and pricing to match; they make sense for large plants standardised on those ecosystems. Netronic and Just Plan It are lighter, Gantt-centric schedulers that lean on a host ERP. MRPeasy and Katana are cloud MRP tools with basic scheduling. EDGEBIC occupies the middle: full finite capacity scheduling with setup matrices, alternates and operator skills, on your own systems, live in five days, licensed one time.'
  }
];

const REGIONAL_COMPETITORS = [
  {
    name: 'Siemens Opcenter APS (Preactor)',
    origin: 'United Kingdom and Germany',
    note: 'The enterprise standard across European automotive and machinery. Best inside the Siemens stack; heavy implementation and licensing for a mid-sized plant.'
  },
  {
    name: 'Netronic and Just Plan It',
    origin: 'Germany',
    note: 'Gantt add-ons for Business Central and a simple cloud job shop scheduler. Lighter than EDGEBIC on constraints: no setup matrices, limited alternates and skills.'
  },
  {
    name: 'MRPeasy and Katana',
    origin: 'Estonia',
    note: 'Cloud MRP for small assemblers with light capacity planning. Not finite capacity sequencing, and your data lives in their cloud rather than on your systems.'
  },
  {
    name: 'Asprova and PlanetTogether',
    origin: 'Japan and United States',
    note: 'High-end APS for large multi-plant operations, typically on subscription. EDGEBIC competes on one-time licensing, a five-day implementation and ERP neutrality.'
  }
];

export default function ProductionSchedulingSoftwareEuropePage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Production Scheduling Software Europe"
        description="EDGEBIC finite capacity production scheduling software, sold and supported across the European Union for job shops and discrete manufacturers."
        url="/production-scheduling-software-europe"
        industryName="European Union Manufacturing"
        industryDescription="Discrete manufacturers, job shops, machine builders and engineer-to-order firms across the European Union scheduling finite capacity across machines and skilled operators."
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
                Production Scheduling Software for European Manufacturers
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Yes, EDGEBIC is available across Europe. It is finite capacity
                production scheduling software from User Solutions, Inc.
                (Michigan, USA, founded 1991), sold and supported directly to
                job shops, machine builders and discrete manufacturers in the
                European Union, the UK and Switzerland. It installs on your own
                Windows systems, works alongside SAP Business One, Dynamics 365
                Business Central, Sage, Exact and Odoo, and is licensed one
                time rather than by subscription.
              </p>
            </div>
          </div>
        </section>

        {/* Regional Fit Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Where EDGEBIC Fits in European Manufacturing
              </h2>
              <p className="leading-relaxed text-gray-700">
                European discrete manufacturing is a network of small and
                mid-sized specialists: German and Austrian machine builders,
                Italian and Spanish component makers, Dutch high-tech
                suppliers, Polish and Czech contract manufacturers, Nordic
                engineering firms. They share the same scheduling problem.
                High-mix work, expensive skilled labour, short delivery windows
                for OEM customers, and an ERP that tracks the money but cannot
                sequence the shop floor against finite capacity.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Engineer-to-order and make-to-order work with unique routings per job',
                  'Skilled operators and certifications as the binding constraint',
                  'OEM automotive, aerospace and machinery customers demanding reliable dates',
                  'Multiple small plants or work centres that need one consistent schedule',
                  'SAP Business One, Business Central or Exact running finance but not the sequence',
                  'Data residency reviews that rule out a foreign-hosted scheduling cloud'
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
                How EDGEBIC Serves EU Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                <Link
                  href={Routes.Edgebic}
                  className="text-cyan-700 underline"
                >
                  EDGEBIC
                </Link>{' '}
                is an advanced planning and scheduling (APS) engine built on{' '}
                <Link
                  href={Routes.FiniteCapacityScheduling}
                  className="text-cyan-700 underline"
                >
                  finite capacity scheduling
                </Link>{' '}
                for high-mix{' '}
                <Link
                  href={Routes.JobShopScheduling}
                  className="text-cyan-700 underline"
                >
                  job shop
                </Link>{' '}
                and discrete manufacturing. It models machines, work center
                groups, true alternates, sequence-dependent setup matrices and
                operator skills, and produces a schedule the floor can run and
                a delivery date sales can commit to.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Forward and backward finite capacity scheduling across machines and operators',
                  'Theory of Constraints anchor scheduling around bottlenecks',
                  'Sequence-dependent setup matrix with setup families',
                  'Parallel work centers, true alternates and work center groups',
                  'Operator skills, certifications and shift rosters as constraints',
                  'Multi-plant scheduling from one database',
                  'ERP integration via Excel, CSV and database import-export',
                  'Installed on your own Windows systems; one-time perpetual license'
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
                Deployment, Integration and Support in Europe
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Your Site',
                    label:
                      'Installed Windows application on .NET 8. Production data stays on your own server inside your own jurisdiction; nothing is hosted abroad.',
                    company: 'Deployment and data location'
                  },
                  {
                    metric: 'SAP B1, BC, Exact',
                    label:
                      'SAP Business One and S/4HANA, Dynamics 365 Business Central, Sage, Exact, Odoo, Epicor, Infor and abas via Excel, CSV or database import-export.',
                    company: 'ERP integration'
                  },
                  {
                    metric: 'CET / CEST',
                    label:
                      'Remote implementation and support from Michigan (Eastern Time) scheduled in the European afternoon overlap. 5-Day Implementation Framework.',
                    company: 'Time zone and support'
                  },
                  {
                    metric: 'One-Time',
                    label:
                      'Perpetual license, list priced in USD (25,000 APS, 35,000 Complete). No subscription, no per-user fees. Contact us for a quotation.',
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
                . Country pages:{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareUk}
                  className="text-cyan-700 underline"
                >
                  United Kingdom
                </Link>
                ,{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareGermany}
                  className="text-cyan-700 underline"
                >
                  Germany and DACH
                </Link>
                ,{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareNetherlands}
                  className="text-cyan-700 underline"
                >
                  Netherlands
                </Link>
                ,{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareIreland}
                  className="text-cyan-700 underline"
                >
                  Ireland
                </Link>{' '}
                and{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareFrance}
                  className="text-cyan-700 underline"
                >
                  France
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
                EDGEBIC Versus the APS Vendors European Manufacturers Shortlist
              </h2>
              <p className="leading-relaxed text-gray-700">
                An honest view. Each of these tools is the right answer for
                somebody; EDGEBIC is the right answer for a European plant that
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
              Frequently Asked Questions: EDGEBIC in Europe
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
        industryTags={['Heavy Industry', 'Job Shop', 'Electronics']}
        title="Manufacturers Running EDGEBIC and Its Predecessors"
        subtitle="Heavy industry, job shop and electronics customers scheduling finite capacity with User Solutions software."
      />

      <RelatedSolutions currentPath={Routes.FiniteCapacityScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            See EDGEBIC scheduling your European plant
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Book a remote demo in CET hours with your own routings and open
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
