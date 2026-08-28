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
  title: 'Production Scheduling Software Netherlands (2026): EDGEBIC APS',
  description:
    'EDGEBIC finite capacity scheduling software for Dutch high-tech, machine building and metal fabrication. On your own systems, CET support, one-time licence.',
  path: '/production-scheduling-software-netherlands',
  modifiedTime: '2026-08-28',
  keywords:
    'production scheduling software Netherlands, productieplanning software, planningssoftware productie, APS software Nederland, finite capacity scheduling software Netherlands, job shop scheduling software Netherlands, machine building scheduling software Eindhoven, high-tech supply chain scheduling software, Exact scheduling add-on, Isah scheduling, Ridder iQ scheduling, Just Plan It alternative'
});

const FAQS = [
  {
    question:
      'Is EDGEBIC available in the Netherlands?',
    answer:
      'Yes. EDGEBIC is sold and supported in the Netherlands by User Solutions, Inc. of Michigan, USA, which has published finite capacity scheduling software since 1991. Dutch manufacturers buy directly from User Solutions, install EDGEBIC on their own Windows systems and receive implementation, training and support remotely in English, which suits most Dutch engineering and planning teams without any translation.'
  },
  {
    question:
      'What do Dutch planners call this category of software?',
    answer:
      'In Dutch it is usually searched as productieplanning software or planningssoftware productie, and in the high-tech sector as APS (Advanced Planning and Scheduling). EDGEBIC is the finite capacity kind: it sequences real work orders across real machines, setups and skilled operators, rather than the infinite-capacity rough planning most ERP systems produce.'
  },
  {
    question:
      'Where is our production data stored?',
    answer:
      'On your own systems. EDGEBIC is an installed Windows desktop application built on .NET 8, not a hosted cloud service. Single-user installations run on SQLite and multi-user installations run on SQL Server on your own server. Routings, orders, capacity and shop floor data stay inside your own network and your own jurisdiction, which keeps a data residency or OEM confidentiality review short.'
  },
  {
    question:
      'Which ERP systems common in the Netherlands does EDGEBIC integrate with?',
    answer:
      'EDGEBIC integrates with any system that can import and export data through Excel, CSV or a database connection. In the Dutch market that typically means Exact (Globe and Online), AFAS, Microsoft Dynamics 365 Business Central, SAP Business One, Isah and Ridder iQ. Work orders flow into EDGEBIC for finite capacity scheduling and completions flow back for WIP and costing.'
  },
  {
    question:
      'How does support work across the time difference?',
    answer:
      'User Solutions is based in Michigan on US Eastern Time, six hours behind CET and CEST. Implementation and support sessions are scheduled in the Dutch afternoon, which is the US morning. The 5-Day Implementation Framework is delivered remotely with your planners and your real production data, so there is no travel to arrange.'
  },
  {
    question:
      'How is EDGEBIC priced for Dutch customers?',
    answer:
      'EDGEBIC is a one-time perpetual licence rather than a subscription. Published list pricing is USD 25,000 for the APS edition and USD 35,000 for the Complete edition (APS plus MRP, inventory and purchasing), with no per-user fees. A euro quotation is available on request. See the pricing page for the current details or contact us to discuss your company.'
  },
  {
    question:
      'How does EDGEBIC compare with Just Plan It, Siemens Opcenter and Asprova?',
    answer:
      'Just Plan It and the Netronic Gantt add-ons for Business Central are light, visual schedulers without setup matrices, true alternates or operator skills. Siemens Opcenter APS (formerly Preactor) and Asprova are enterprise APS products with multi-month implementations, well suited to the largest plants in the semiconductor equipment supply chain. EDGEBIC sits between them: full finite capacity scheduling for a mid-sized supplier or machine builder, on your own systems, live in five days, licensed one time.'
  }
];

const REGIONAL_COMPETITORS = [
  {
    name: 'Netronic and Just Plan It',
    origin: 'Aachen, Germany, widely used in the Benelux',
    note: 'Visual Gantt add-ons for Dynamics 365 Business Central and a simple cloud job shop scheduler. Lighter than EDGEBIC on setup matrices, alternates and operator skills.'
  },
  {
    name: 'Siemens Opcenter APS (Preactor)',
    origin: 'Siemens Digital Industries',
    note: 'The enterprise APS in the high-tech and semiconductor equipment supply chain. Best inside the Siemens stack; heavy implementation and licensing for a mid-sized supplier.'
  },
  {
    name: 'Asprova',
    origin: 'Japan',
    note: 'High-end APS for large multi-line plants, common with automotive and electronics OEMs. Deep, but priced and implemented as an enterprise project.'
  },
  {
    name: 'MRPeasy, Katana and PlanetTogether',
    origin: 'Estonia and United States',
    note: 'Cloud MRP with light scheduling (MRPeasy, Katana) and a subscription APS for multi-plant groups (PlanetTogether). EDGEBIC competes on true finite capacity, on-site data and one-time licensing.'
  }
];

export default function ProductionSchedulingSoftwareNetherlandsPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Production Scheduling Software Netherlands"
        description="EDGEBIC finite capacity production scheduling software, sold and supported in the Netherlands for high-tech system suppliers, machine builders, agri-food equipment makers and metal fabricators."
        url="/production-scheduling-software-netherlands"
        industryName="Dutch Manufacturing"
        industryDescription="High-tech systems suppliers around Eindhoven Brainport, machine builders, agri-food equipment makers and metal fabricators in the Netherlands scheduling finite capacity across machines and skilled operators."
        customerNames={['GE', 'Cummins', 'BAE Systems']}
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
                Production Scheduling Software for the Netherlands
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Yes, EDGEBIC is available in the Netherlands. It is finite
                capacity production scheduling software (productieplanning
                software) from User Solutions, Inc. (Michigan, USA, founded
                1991), sold and supported directly to Dutch high-tech
                suppliers, machine builders, agri-food equipment makers and
                metal fabricators. It installs on your own Windows systems,
                works alongside Exact, AFAS, Dynamics 365 Business Central and
                Isah, and is licensed one time rather than by subscription.
              </p>
            </div>
          </div>
        </section>

        {/* Regional Fit Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Where EDGEBIC Fits in Dutch Manufacturing
              </h2>
              <p className="leading-relaxed text-gray-700">
                Dutch manufacturing punches far above its size. The Brainport
                region around Eindhoven feeds one of the most demanding
                supply chains in the world: precision modules, frames and
                subsystems for semiconductor equipment, built to tolerances
                and delivery windows set by the OEM. Around it sit machine
                builders in Brabant, Gelderland and Overijssel, agri-food and
                greenhouse equipment makers, and sheet metal and welding shops
                supplying all of them. The ERP handles the order and the
                invoice; it does not sequence a milling cell, a cleanroom
                assembly bay or a scarce measuring machine against finite
                capacity.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'First-tier and second-tier suppliers to semiconductor equipment OEMs with strict slot dates',
                  'Machine builders running engineer-to-order projects and small series side by side',
                  'Agri-food and greenhouse equipment makers with seasonal demand peaks',
                  'Metal fabrication and precision machining shops with skilled operators as the constraint',
                  'Exact, AFAS, Isah or Ridder iQ running finance and orders but not the shop floor sequence',
                  'OEM confidentiality and data residency rules that exclude a foreign-hosted scheduling cloud'
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
                How EDGEBIC Serves Dutch Manufacturers
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
                and discrete manufacturing. It models machines, work centre
                groups, true alternates, sequence-dependent setup matrices and
                operator skills, and produces a schedule the floor can run and
                a delivery date the OEM can rely on. Dutch buyers comparing
                planningssoftware productie will recognise it as full APS
                rather than a Gantt viewer.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Forward and backward finite capacity scheduling across machines and operators',
                  'Theory of Constraints anchor scheduling around bottleneck machines and measuring rooms',
                  'Sequence-dependent setup matrix with setup families',
                  'Parallel work centres, true alternates and work centre groups',
                  'Operator skills, certifications and shift rosters as constraints',
                  'Project and small-series work scheduled together from one database',
                  'ERP integration via Excel, CSV and database import-export',
                  'Installed on your own Windows systems; one-time perpetual licence'
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
                Deployment, Integration and Support in the Netherlands
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Your Site',
                    label:
                      'Installed Windows application on .NET 8, SQLite single-user or SQL Server multi-user. Production data stays on your own machines inside your own jurisdiction; nothing is hosted abroad.',
                    company: 'Deployment and data location'
                  },
                  {
                    metric: 'Exact, AFAS, BC',
                    label:
                      'Exact, AFAS, Dynamics 365 Business Central, SAP Business One, Isah and Ridder iQ via Excel, CSV or database import-export.',
                    company: 'ERP integration'
                  },
                  {
                    metric: 'CET / CEST',
                    label:
                      'Remote implementation and support from Michigan (Eastern Time) scheduled in the Dutch afternoon overlap. 5-Day Implementation Framework, in English.',
                    company: 'Time zone and support'
                  },
                  {
                    metric: 'One-Time',
                    label:
                      'Perpetual licence, list priced in USD (25,000 APS, 35,000 Complete); a euro quotation is available on request. No subscription, no per-user fees.',
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
                . EU-wide coverage on the{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareEurope}
                  className="text-cyan-700 underline"
                >
                  Europe page
                </Link>
                ; neighbouring markets:{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareGermany}
                  className="text-cyan-700 underline"
                >
                  Germany and DACH
                </Link>
                ,{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareFrance}
                  className="text-cyan-700 underline"
                >
                  France
                </Link>{' '}
                and{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareUk}
                  className="text-cyan-700 underline"
                >
                  United Kingdom
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
                EDGEBIC Versus the APS Vendors Dutch Manufacturers Shortlist
              </h2>
              <p className="leading-relaxed text-gray-700">
                An honest view. Each of these tools is the right answer for
                somebody; EDGEBIC is the right answer for a Dutch supplier or
                machine builder that wants real finite capacity scheduling, on
                its own systems, live in a week, without a subscription.
                Detailed head-to-heads are on the{' '}
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
              Frequently Asked Questions: EDGEBIC in the Netherlands
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
        industryTags={['Electronics', 'Job Shop', 'Heavy Industry']}
        title="Manufacturers Running EDGEBIC and Its Predecessors"
        subtitle="Electronics, job shop and heavy industry customers scheduling finite capacity with User Solutions software."
      />

      <RelatedSolutions currentPath={Routes.FiniteCapacityScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            See EDGEBIC scheduling your Dutch shop floor
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
