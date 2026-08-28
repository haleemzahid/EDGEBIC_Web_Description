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
import { getBaseUrl } from '@/lib/urls/get-base-url';

const SELF_URL = `${getBaseUrl()}/production-scheduling-software-germany`;
const GERMAN_URL = `${getBaseUrl()}/feinplanung-software`;

const baseMetadata = createPageMetadata({
  title: 'Production Scheduling Software Germany (2026): EDGEBIC Feinplanung APS',
  description:
    'EDGEBIC finite capacity scheduling software (Feinplanung / APS) is sold and supported in Germany, Austria and Switzerland. Built for Mittelstand job shops, Maschinenbau and Industrie 4.0 suppliers. Installed on your own systems, CET support hours, one-time license.',
  path: '/production-scheduling-software-germany',
  modifiedTime: '2026-08-28',
  keywords:
    'finite capacity scheduling software Germany, production scheduling software Germany, Feinplanung Software, APS Software Deutschland, Produktionsplanung Software Mittelstand, job shop scheduling software Germany, Maschinenbau scheduling software, Industrie 4.0 scheduling software, APS software DACH, Netronic alternative'
});

export const metadata = {
  ...baseMetadata,
  alternates: {
    canonical: SELF_URL,
    languages: {
      en: SELF_URL,
      de: GERMAN_URL,
      'x-default': SELF_URL
    }
  }
};

const FAQS = [
  {
    question: 'Is EDGEBIC available in Germany?',
    answer:
      'Yes. EDGEBIC is sold and supported in Germany, Austria and Switzerland (the DACH region) by User Solutions, Inc. of Michigan, USA, which has published finite capacity scheduling software since 1991. German manufacturers buy directly from User Solutions, install EDGEBIC on their own Windows systems and receive implementation, training and support remotely in English.'
  },
  {
    question: 'What does EDGEBIC do in German manufacturing terminology?',
    answer:
      'EDGEBIC is what German planners call Feinplanung or Fertigungsfeinplanung: an APS (Advanced Planning and Scheduling) system that sequences Fertigungsaufträge against finite machine and operator capacity, rather than the infinite-capacity rough planning (Grobplanung) built into most ERP and PPS systems. It also covers Kapazitätsplanung, Rüstzeitoptimierung through sequence-dependent setup matrices, and Terminierung that sales can rely on.'
  },
  {
    question: 'Where is our production data stored?',
    answer:
      'On your own systems. EDGEBIC is an installed Windows desktop application built on .NET 8, not a hosted cloud service. Single-user installations run on SQLite and multi-user installations run on SQL Server on your own server. Routings, orders and capacity data stay inside your own network and your own jurisdiction.'
  },
  {
    question: 'Which ERP systems common in Germany does EDGEBIC integrate with?',
    answer:
      'EDGEBIC integrates with any system that can import and export data through Excel, CSV or a database connection. In the DACH market that typically means SAP Business One and SAP S/4HANA, Microsoft Dynamics 365 Business Central, abas ERP, proALPHA, Infor, Sage and Odoo. Work orders flow into EDGEBIC for Feinplanung and completions flow back for WIP and costing.'
  },
  {
    question: 'How does support work across the time difference and in English?',
    answer:
      'User Solutions is based in Michigan on US Eastern Time, six hours behind CET and CEST. Implementation and support sessions are scheduled in the German afternoon, which is the US morning. The 5-Day Implementation Framework is delivered remotely with your planners and your real production data. The software, documentation and support are in English; most German engineering and planning teams work in it comfortably.'
  },
  {
    question: 'How is EDGEBIC priced for German customers?',
    answer:
      'EDGEBIC is a one-time perpetual license (Kauflizenz) rather than a subscription. Published list pricing is USD 25,000 for the APS edition and USD 35,000 for the Complete edition (APS plus MRP, inventory and purchasing), with no per-user fees. See the pricing page for the current details or contact us to discuss a quotation for your company.'
  },
  {
    question: 'How does EDGEBIC compare with Netronic, Siemens Opcenter and Asprova?',
    answer:
      'Netronic (Aachen) makes Gantt-based scheduling add-ons for Business Central and a simple cloud scheduler, Just Plan It; both are lighter than EDGEBIC on constraints such as setup matrices, true alternates and operator skills. Siemens Opcenter APS (formerly Preactor) and Asprova are enterprise APS products with multi-month implementations, best suited to large plants standardised on those ecosystems. EDGEBIC sits between them: full finite capacity Feinplanung, on your own systems, live in five days, licensed one time.'
  }
];

const REGIONAL_COMPETITORS = [
  {
    name: 'Netronic and Just Plan It',
    origin: 'Aachen, Germany',
    note: 'Visual Gantt add-ons for Dynamics 365 Business Central and a simple cloud job shop scheduler. Strong visualisation; lighter on setup matrices, alternates and operator skills than EDGEBIC.'
  },
  {
    name: 'Siemens Opcenter APS (Preactor)',
    origin: 'Siemens Digital Industries',
    note: 'The enterprise APS standard in German automotive and machinery. Best inside the Siemens stack; heavy implementation and licensing for a Mittelstand plant.'
  },
  {
    name: 'Asprova',
    origin: 'Japan, strong DACH presence',
    note: 'High-end APS common in automotive supply chains. Deep, but priced and implemented as an enterprise project. EDGEBIC delivers the core Feinplanung in a week.'
  },
  {
    name: 'MRPeasy, Katana and PlanetTogether',
    origin: 'Estonia and United States',
    note: 'Cloud MRP with light scheduling (MRPeasy, Katana) and a subscription APS for large multi-plant operations (PlanetTogether). EDGEBIC competes on true finite capacity, on-site data and one-time licensing.'
  }
];

export default function ProductionSchedulingSoftwareGermanyPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Production Scheduling Software Germany"
        description="EDGEBIC finite capacity scheduling software (Feinplanung / APS), sold and supported in Germany, Austria and Switzerland for Mittelstand job shops, machine builders and Industrie 4.0 suppliers."
        url="/production-scheduling-software-germany"
        industryName="German and DACH Manufacturing"
        industryDescription="Mittelstand job shops, Maschinenbau, automotive and precision component suppliers in Germany, Austria and Switzerland scheduling finite capacity across machines and skilled operators."
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
                Production Scheduling Software for Germany and DACH
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Yes, EDGEBIC is available in Germany, Austria and Switzerland.
                It is finite capacity scheduling software (Feinplanung / APS)
                from User Solutions, Inc. (Michigan, USA, founded 1991), sold
                and supported directly to Mittelstand job shops, machine
                builders and component suppliers. It installs on your own
                Windows systems, works alongside SAP Business One, Dynamics 365
                Business Central and abas, and is licensed one time rather than
                by subscription.
              </p>
            </div>
          </div>
        </section>

        {/* Regional Fit Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Feinplanung for the Mittelstand and Maschinenbau
              </h2>
              <p className="leading-relaxed text-gray-700">
                German manufacturing strength sits in the Mittelstand: family
                owned machine builders, Zulieferer to automotive and
                Maschinenbau OEMs, precision component makers and tool shops.
                Industrie 4.0 has connected the machines, but connected data is
                not a schedule. The ERP or PPS system does Grobplanung against
                infinite capacity; the shop still needs a Feinplanung that
                sequences real orders across real machines, real Rüstzeiten and
                real Facharbeiter, and gives sales a Liefertermin it can keep.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Einzelfertigung and Kleinserien with a unique Arbeitsplan for every order',
                  'Skilled Facharbeiter and certifications as the binding constraint',
                  'Sequence-dependent Rüstzeiten that the ERP planning module ignores',
                  'OEM automotive and machinery customers demanding reliable delivery dates',
                  'SAP Business One, Business Central or abas running finance but not the sequence',
                  'Data residency and IT policy that rule out a foreign-hosted scheduling cloud'
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
                How EDGEBIC Serves German Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                <Link
                  href={Routes.Edgebic}
                  className="text-cyan-700 underline"
                >
                  EDGEBIC
                </Link>{' '}
                is an APS engine built on{' '}
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
                operator skills, then produces a Feinplanung the floor can run
                and a delivery date sales can commit to.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Forward and backward finite capacity scheduling (Vorwärts- und Rückwärtsterminierung)',
                  'Theory of Constraints anchor scheduling around bottleneck machines',
                  'Sequence-dependent setup matrix with setup families (Rüstzeitoptimierung)',
                  'Parallel work centers, true alternates and work center groups',
                  'Operator skills, certifications and shift rosters as constraints',
                  'Two-layer schedule optimizer with Google OR-Tools CP-SAT',
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
                Deployment, Integration and Support in DACH
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Your Site',
                    label:
                      'Installed Windows application on .NET 8. Production data stays on your own server inside your own network; nothing is hosted abroad.',
                    company: 'Deployment and data location'
                  },
                  {
                    metric: 'SAP B1, BC, abas',
                    label:
                      'SAP Business One and S/4HANA, Dynamics 365 Business Central, abas, proALPHA, Infor, Sage and Odoo via Excel, CSV or database import-export.',
                    company: 'ERP integration'
                  },
                  {
                    metric: 'CET / CEST',
                    label:
                      'Remote implementation and support from Michigan (Eastern Time) scheduled in the German afternoon overlap. 5-Day Implementation Framework, in English.',
                    company: 'Time zone and support'
                  },
                  {
                    metric: 'One-Time',
                    label:
                      'Perpetual license (Kauflizenz), list priced in USD (25,000 APS, 35,000 Complete). No subscription, no per-user fees. Contact us for a quotation.',
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
                EDGEBIC Versus the APS Vendors German Manufacturers Shortlist
              </h2>
              <p className="leading-relaxed text-gray-700">
                An honest view. Each of these tools is the right answer for
                somebody; EDGEBIC is the right answer for a Mittelstand plant
                that wants real finite capacity Feinplanung, on its own systems,
                live in a week, without a subscription. Detailed head-to-heads
                are on the{' '}
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
              Frequently Asked Questions: EDGEBIC in Germany
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
            See EDGEBIC scheduling your German shop floor
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Book a remote demo in CET hours with your own Arbeitspläne and open
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
