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
  title: 'Production Scheduling Software Ireland (2026): EDGEBIC APS',
  description:
    'EDGEBIC finite capacity scheduling software for Irish medical device, pharma contract and precision engineering plants. On your own systems, one-time licence.',
  path: '/production-scheduling-software-ireland',
  modifiedTime: '2026-08-28',
  keywords:
    'production scheduling software Ireland, APS software Ireland, finite capacity scheduling software Ireland, medical device scheduling software Ireland, pharma contract manufacturing scheduling Ireland, precision engineering scheduling software Ireland, job shop scheduling software Ireland, manufacturing scheduling software Galway Cork Limerick, Intact iQ scheduling, SAP Business One scheduling add-on Ireland'
});

const FAQS = [
  {
    question:
      'Is EDGEBIC available in Ireland?',
    answer:
      'Yes. EDGEBIC is sold and supported in the Republic of Ireland and Northern Ireland by User Solutions, Inc. of Michigan, USA, which has published finite capacity scheduling software since 1991. Irish manufacturers buy directly from User Solutions, install EDGEBIC on their own Windows systems and receive implementation, training and support remotely.'
  },
  {
    question:
      'Does EDGEBIC suit regulated medical device and pharma manufacturing?',
    answer:
      'EDGEBIC schedules the work; your quality system governs it. It models validated equipment, cleanroom bays, operator certifications and sequence-dependent changeovers as finite constraints, and it holds a full schedule history for traceability. Because it is installed on your own systems, the software sits inside your own IT change control rather than a vendor cloud release cycle, which simplifies validation conversations with quality and regulatory teams.'
  },
  {
    question:
      'Where is our production data stored?',
    answer:
      'On your own systems. EDGEBIC is an installed Windows desktop application built on .NET 8, not a hosted cloud service. Single-user installations run on SQLite and multi-user installations run on SQL Server on your own server. Routings, orders, capacity and shop floor data stay inside your own network and your own jurisdiction.'
  },
  {
    question:
      'Which ERP systems common in Ireland does EDGEBIC integrate with?',
    answer:
      'EDGEBIC integrates with any system that can import and export data through Excel, CSV or a database connection. In the Irish market that typically means SAP Business One, Sage 50, 200 and Intacct, Intact iQ, Microsoft Dynamics 365 Business Central and Epicor. Work orders flow into EDGEBIC for finite capacity scheduling and completions flow back for WIP and costing.'
  },
  {
    question:
      'How does support work across the time difference?',
    answer:
      'User Solutions is based in Michigan on US Eastern Time, five hours behind GMT and IST (Irish Standard Time). Implementation and support sessions are scheduled in the Irish afternoon, which is the US morning. The 5-Day Implementation Framework is delivered remotely with your planners and your real production data, so there is no travel to arrange.'
  },
  {
    question:
      'How is EDGEBIC priced for Irish customers?',
    answer:
      'EDGEBIC is a one-time perpetual licence rather than a subscription. Published list pricing is USD 25,000 for the APS edition and USD 35,000 for the Complete edition (APS plus MRP, inventory and purchasing), with no per-user fees. A euro quotation is available on request. See the pricing page for the current details or contact us to discuss your company.'
  },
  {
    question:
      'How does EDGEBIC compare with Siemens Opcenter, PlanetTogether and cloud MRP tools?',
    answer:
      'Siemens Opcenter APS (formerly Preactor) and PlanetTogether are enterprise APS products, typically chosen by the largest multinational plants and implemented over months. MRPeasy and Katana are cloud MRP tools with light capacity planning rather than finite capacity sequencing. EDGEBIC sits between them: full finite capacity scheduling with setup matrices, alternates and operator skills for a mid-sized Irish plant or contract manufacturer, on your own systems, live in five days, licensed one time.'
  }
];

const REGIONAL_COMPETITORS = [
  {
    name: 'Siemens Opcenter APS (Preactor)',
    origin: 'UK origin, now part of Siemens',
    note: 'The APS most often found in multinational medical device and pharma plants. Strongest inside the Siemens stack; heavy implementation and licensing for a standalone Irish contract manufacturer.'
  },
  {
    name: 'PlanetTogether',
    origin: 'United States',
    note: 'Subscription APS aimed at larger multi-plant operations, including pharma. EDGEBIC competes on one-time licensing and a five-day implementation.'
  },
  {
    name: 'MRPeasy and Katana',
    origin: 'Estonia',
    note: 'Cloud MRP with light scheduling. Good for small assemblers; neither offers true finite capacity sequencing with setup matrices and alternate work centres, and your data lives in their cloud.'
  },
  {
    name: 'Just Plan It and Asprova',
    origin: 'Germany and Japan',
    note: 'Just Plan It is a simple cloud job shop scheduler; Asprova is a high-end APS common in automotive and electronics supply chains. EDGEBIC sits between them on depth and cost.'
  }
];

export default function ProductionSchedulingSoftwareIrelandPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Production Scheduling Software Ireland"
        description="EDGEBIC finite capacity production scheduling software, sold and supported in Ireland for medical device, pharma contract manufacturing, precision engineering and food equipment manufacturers."
        url="/production-scheduling-software-ireland"
        industryName="Irish Manufacturing"
        industryDescription="Medical device and pharma contract manufacturers in the Galway, Cork and Limerick clusters, precision engineering firms and food equipment makers across Ireland scheduling finite capacity across validated equipment and certified operators."
        customerNames={['GE', 'BAE Systems', 'Cummins']}
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
                Production Scheduling Software for Irish Manufacturers
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Yes, EDGEBIC is available in Ireland. It is finite capacity
                production scheduling software from User Solutions, Inc.
                (Michigan, USA, founded 1991), sold and supported directly to
                Irish medical device and pharma contract manufacturers,
                precision engineering firms and food equipment makers. It
                installs on your own Windows systems, works alongside SAP
                Business One, Sage, Intact iQ and Dynamics 365 Business
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
                Where EDGEBIC Fits in Irish Manufacturing
              </h2>
              <p className="leading-relaxed text-gray-700">
                Ireland has built one of the densest life sciences
                manufacturing bases in Europe. Galway is a global medical
                device cluster, Cork hosts pharma and biopharma sites, and
                Limerick and the Shannon region add precision engineering and
                contract manufacturing. Around the multinationals that
                Enterprise Ireland and IDA Ireland have attracted sits a supply
                chain of indigenous precision machinists, tool makers and
                contract manufacturers, plus a food and dairy equipment sector
                serving Irish agribusiness. Those suppliers carry the
                scheduling problem: validated equipment, certified operators,
                changeovers that cannot be skipped, and customers who audit
                delivery performance as closely as quality.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Contract manufacturers supplying medical device and pharma multinationals with audited on-time delivery',
                  'Validated equipment, cleanroom bays and certified operators as the binding constraints',
                  'Precision machining and tool making with a unique routing for every part',
                  'Food and dairy equipment builders balancing project work against seasonal demand',
                  'SAP Business One, Sage or Intact iQ handling the money but not the shop floor sequence',
                  'Quality and IT policies that prefer software inside your own change control rather than a vendor cloud'
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
                How EDGEBIC Serves Irish Manufacturers
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
                groups, true alternates, sequence-dependent changeover matrices
                and operator certifications, and produces a schedule the floor
                can run and a delivery date that keeps you green on the
                customer supplier scorecard.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Forward and backward finite capacity scheduling across machines and operators',
                  'Theory of Constraints anchor scheduling around validated bottleneck equipment',
                  'Sequence-dependent changeover matrix with setup families',
                  'Parallel work centres, true alternates and work centre groups',
                  'Operator skills, certifications and shift rosters as constraints',
                  'Full schedule history for traceability and audit',
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
                Deployment, Integration and Support in Ireland
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
                    metric: 'SAP B1, Sage, Intact',
                    label:
                      'SAP Business One, Sage 50/200/Intacct, Intact iQ, Dynamics 365 Business Central and Epicor via Excel, CSV or database import-export.',
                    company: 'ERP integration'
                  },
                  {
                    metric: 'GMT / IST',
                    label:
                      'Remote implementation and support from Michigan (Eastern Time) scheduled in the Irish afternoon overlap. 5-Day Implementation Framework.',
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
                  href={Routes.ProductionSchedulingSoftwareUk}
                  className="text-cyan-700 underline"
                >
                  United Kingdom
                </Link>
                ,{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareNetherlands}
                  className="text-cyan-700 underline"
                >
                  the Netherlands
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
                EDGEBIC Versus the APS Vendors Irish Manufacturers Shortlist
              </h2>
              <p className="leading-relaxed text-gray-700">
                An honest view. Each of these tools is the right answer for
                somebody; EDGEBIC is the right answer for an Irish plant or
                contract manufacturer that wants real finite capacity
                scheduling, on its own systems, live in a week, without a
                subscription. Detailed head-to-heads are on the{' '}
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
              Frequently Asked Questions: EDGEBIC in Ireland
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
        industryTags={['Medical Device', 'Medical', 'Job Shop', 'Hi-Tech']}
        title="Manufacturers Running EDGEBIC and Its Predecessors"
        subtitle="Medical, hi-tech and job shop customers scheduling finite capacity with User Solutions software."
      />

      <RelatedSolutions currentPath={Routes.FiniteCapacityScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            See EDGEBIC scheduling your Irish shop floor
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Book a remote demo in Irish hours with your own routings and open
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
