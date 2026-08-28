import * as React from 'react';
import Link from 'next/link';

import { ScreenshotSlideshow } from '@/components/marketing/fragments/screenshot-slideshow';
import { EdgebicPlanFlow } from '@/components/marketing/sections/edgebic-plan-flow';
import { FAQJsonLd, SoftwareApplicationJsonLd } from '@/components/seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { AppInfo } from '@/constants/app-info';
import { Routes } from '@/constants/routes';
import { createProductMetadata } from '@/lib/seo/metadata';
import { EDGEBIC_ALTERNATE_NAMES, schemaNodeIds } from '@/lib/seo/schema-nodes';

export const metadata = createProductMetadata({
  name: 'EDGEBIC - Next-Generation Finite Capacity Planning & Scheduling Software',
  description:
    'EDGEBIC by User Solutions is the next-generation finite capacity planning and scheduling platform: the successor to RMDB and EDGEBI. Drag-and-drop graphical routing designer, TOC bottleneck scheduling, multi-shift allocation, mathematical schedule optimization, shop-floor kiosk tracking, and flexible ERP integration through Excel/CSV import masks.',
  path: '/edgebic',
  keywords:
    'EDGEBIC, EDGEBIC software, EDGEBIC User Solutions, finite capacity planning software, finite capacity scheduling, production scheduling software, RMDB successor, EDGEBI successor, APS software, advanced planning and scheduling, drag and drop production scheduling, graphical routing designer, TOC scheduling software, schedule optimization software, drag and drop production planning software for small manufacturers, best scheduling software for multi-shift manufacturing operations, best software for optimizing multi-shift factory schedules, manufacturing what-if scenario planning tools, production scheduling software UK, production scheduling software Europe, Produktionsplanungssoftware, APS software Germany'
});

const FAQS = [
  {
    question: 'What is EDGEBIC?',
    answer:
      'EDGEBIC is the next-generation finite capacity planning and scheduling platform from User Solutions, Inc. It unifies the RMDB scheduling engine and the EDGEBI graphical experience into one modern Windows application built on .NET 8, running on SQLite for single-user installs or SQL Server for enterprise deployments. It schedules machines, labor, and materials against real capacity: shifts, holidays, downtime, machine instances, operator skills, and sequence-dependent setup times.'
  },
  {
    question: 'How is EDGEBIC related to RMDB and EDGEBI?',
    answer:
      'EDGEBIC is the direct successor to both products. RMDB contributed the finite capacity scheduling depth proven over 35 years; EDGEBI contributed the interactive graphical scheduling experience. EDGEBIC combines them in a single application and adds a new engine generation: Theory of Constraints anchor scheduling, backward (just-in-time) scheduling, work center groups, operator and skill constraints, sequence-dependent setup matrices, lot streaming, and a two-layer schedule optimizer. RMDB and EDGEBI remain fully supported.'
  },
  {
    question: 'Does EDGEBIC replace my ERP?',
    answer:
      'No. EDGEBIC complements your ERP the same way RMDB has for decades. Your ERP keeps owning financials, purchasing, and transactions. EDGEBIC imports items, work centers, routings, and orders through flexible Excel/CSV/database import masks, applies the finite capacity scheduling your ERP cannot, and exports realistic dates and schedules back out.'
  },
  {
    question: 'Which ERP systems does EDGEBIC work with?',
    answer:
      'Any ERP that can exchange data through Excel, CSV, or a database connection. In practice that is virtually all of them: JobBOSS, Epicor, Fourth Shift, SAP, Oracle, Sage, Macola, and more. This import-export approach is the same one behind User Solutions integrations documented across 35 years, including a complete Fourth Shift ERP integration delivered in 5 days and an approach the Fourth Shift vendor itself recommended.'
  },
  {
    question: 'What happens to my RMDB or EDGEBI investment if I upgrade?',
    answer:
      'It carries forward. Your master data (items, work centers, routings, calendars) moves into EDGEBIC through the built-in import masks, your scheduling concepts translate directly, and both legacy products remain supported while you transition on your own timeline. See the upgrade guide at /rmdb-to-edgebic for the step-by-step path.'
  },
  {
    question: 'How long does EDGEBIC take to implement?',
    answer:
      'Days, not months. EDGEBIC follows the same rapid-implementation methodology User Solutions has used for 35 years: start from your existing data in whatever form it is in, configure the model around your most pressing scheduling problem first, and expand from there. A first-time setup wizard connects the database and walks through initial master data.'
  }
];

const ENGINE_FEATURES: Array<{ title: string; body: string }> = [
  {
    title: 'Finite capacity, forward and backward',
    body: 'Schedule forward from a start date or backward (just-in-time) from a due date, against real shift calendars, holidays, downtime, and per-day capacity overrides. Every order gets dates the shop can actually hit.'
  },
  {
    title: 'Theory of Constraints anchor scheduling',
    body: 'Flag a bottleneck work center and EDGEBIC schedules around it the TOC way: backward to the constraint, forward from it, with protective buffers, so the drum sets the pace instead of wishful dates.'
  },
  {
    title: 'Multi-shift, multi-instance allocation',
    body: 'Jobs span shifts and days automatically. Work centers with multiple machines allocate across instances with load balancing, one-job-per-day rules, or dedicated-instance behavior per work center.'
  },
  {
    title: 'Parallel and alternate work centers',
    body: 'Split a batch across independent parallel machines, mirror synchronized multi-spindle operations, or let the scheduler fall back to true alternates when the primary is full, with per-alternate speed factors.'
  },
  {
    title: 'Work center groups (machine pools)',
    body: 'Bind a routing step to a named pool like MILLING and let the engine pick the best member at schedule time by earliest completion, primary-first, or earliest start, and re-shop the pool on every reschedule.'
  },
  {
    title: 'Sequence-dependent setup matrix',
    body: 'Model changeover times that depend on what ran before: white-to-black paint is not black-to-white. Setup families keep the matrix manageable, and the optimizer sequences to cut total changeover hours.'
  },
  {
    title: 'Lot streaming and transfer batches',
    body: 'Overlap operations with piece-count transfer batches on discrete work or start-to-start lags on flow lines, so downstream steps begin before upstream batches finish.'
  },
  {
    title: 'Operators, skills, and certifications',
    body: 'Schedule the people constraint, not just machines: skills with expiry dates, weekly shift rosters, time off, and per-step skill requirements. Jobs wait for qualified operators instead of pretending they exist.'
  }
];

const PLATFORM_FEATURES: Array<{ title: string; body: string }> = [
  {
    title: 'Graphical routing designer',
    body: 'Build every routing as a drag-and-drop flow chart: steps are nodes, sequence arrows are connectors, with sub-assemblies, annotations, and product images on the canvas. The way your factory actually flows is the way you draw it.'
  },
  {
    title: 'Two-layer schedule optimizer',
    body: 'Layer one evaluates dozens of complete schedules and returns the best, guaranteed never worse than your baseline. Layer two uses Google OR-Tools CP-SAT mathematical optimization and reports a proven optimality gap. You review a side-by-side comparison and accept or discard; nothing changes without you.'
  },
  {
    title: 'Interactive Gantt and Job View',
    body: 'Planned versus actual timelines, drag-and-drop rescheduling with safety prompts, color and label rules you control, and layouts that remember how each planner works.'
  },
  {
    title: 'Shop-floor kiosk',
    body: 'A dedicated touch app for operators: start work, count pieces, pause with a reason, complete. Actual hours and dates flow straight into the schedule without a planner retyping anything.'
  },
  {
    title: 'Reschedules that respect reality',
    body: 'Completed and in-progress work is preserved exactly. Reschedules move only what has not happened yet, resuming from where the shop actually is, not where the plan hoped it would be.'
  },
  {
    title: 'Quoting and what-if scenarios',
    body: 'Simulate a prospective order against current finite capacity to get a realistic promise date and cost before you commit. Compare scenarios side by side: extra shift, skipped step, boosted capacity.'
  },
  {
    title: 'Reports, dashboards, and diagnostics',
    body: 'Earned value (SPI/CPI), OEE, utilization, late jobs, on-time delivery, and an anomaly checker that flags schedule problems with an explanation for every column, so planners and auditors get the same answer.'
  },
  {
    title: 'ERP integration through import masks',
    body: 'Bring items, work centers, routings, sales orders, and actuals in from Excel, CSV, or database sources; push schedules and dates back out. The proven approach behind 35 years of ERP integrations. See the integration guide for JobBOSS, Epicor, and Fourth Shift specifics.'
  }
];

export default function EdgebicPage(): React.JSX.Element {
  const nodes = schemaNodeIds();

  return (
    <>
      {/* The product family node. Every other page on the site points at this
          @id instead of describing EDGEBIC again, and the succession from RMDB
          is declared here once. */}
      <SoftwareApplicationJsonLd
        id={nodes.edgebic}
        name={AppInfo.APP_NAME}
        alternateName={EDGEBIC_ALTERNATE_NAMES}
        description={AppInfo.APP_DESCRIPTION}
        url="/edgebic"
        price={AppInfo.EDITIONS.APS.PRICE}
        applicationSubCategory="Production Scheduling Software"
        offerUrl="/pricing"
        operatingSystem="Windows"
        softwareRequirements="Windows with .NET 8; SQLite for single-user, SQL Server for multi-user deployments"
        successorOf={nodes.rmdb}
        isBasedOn={nodes.rmdb}
      />
      {/* One entry per edition. A single node could not carry two prices, and
          the price is the thing an answer engine is asked for most often. */}
      <SoftwareApplicationJsonLd
        id={nodes.edgebicAps}
        name={AppInfo.EDITIONS.APS.NAME}
        description={AppInfo.EDITIONS.APS.DESCRIPTION}
        url="/edgebic"
        price={AppInfo.EDITIONS.APS.PRICE}
        applicationSubCategory="Production Scheduling Software"
        offerUrl="/pricing"
        operatingSystem="Windows"
        isVariantOf={nodes.edgebic}
        softwareRequirements="Windows with .NET 8; SQLite for single-user, SQL Server for multi-user deployments"
        featureList={[
          'Graphical drag-and-drop routing designer',
          'Forward and backward finite capacity scheduling',
          'Theory of Constraints anchor scheduling around bottlenecks',
          'Parallel work centers, true alternates and work center groups',
          'Sequence-dependent setup matrix with setup families',
          'Lot streaming with transfer batches and start-to-start overlap',
          'Operator skills, certifications and shift rosters',
          'Two-layer schedule optimizer with Google OR-Tools CP-SAT',
          'Shop-floor kiosk for operator punches and piece counts',
          'Quoting with what-if scenarios and quote-to-order conversion',
          'ERP integration via Excel, CSV and database import-export'
        ]}
      />
      <SoftwareApplicationJsonLd
        id={nodes.edgebicComplete}
        name={AppInfo.EDITIONS.COMPLETE.NAME}
        description={AppInfo.EDITIONS.COMPLETE.DESCRIPTION}
        url="/edgebic"
        price={AppInfo.EDITIONS.COMPLETE.PRICE}
        applicationSubCategory="Production Scheduling Software"
        offerUrl="/pricing"
        operatingSystem="Windows"
        isVariantOf={nodes.edgebic}
        softwareRequirements="Windows with .NET 8; SQLite for single-user, SQL Server for multi-user deployments"
        featureList={[
          'Everything in EDGEBIC APS',
          'Material requirements planning (MRP)',
          'Inventory management',
          'Purchasing',
          'Material pegging so material availability constrains the schedule'
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
        <section className="py-8">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-semibold text-cyan-700">
                  New from User Solutions
                </p>
                <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                  EDGEBIC: 35 years of scheduling experience, one
                  next-generation platform
                </h1>
                <p className="text-lg leading-relaxed text-slate-700">
                  EDGEBIC is the next-generation finite capacity planning and
                  scheduling platform from User Solutions, Inc. It is the
                  successor to Resource Manager DB (RMDB) and EDGEBI: the proven
                  scheduling engine and the graphical experience, rebuilt as one
                  modern application, with a new generation of capabilities on
                  top.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <Link
                    href={Routes.Contact}
                    className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                  >
                    Schedule a Live Demo
                  </Link>
                  <Link
                    href={Routes.RmdbToEdgebic}
                    className="font-semibold text-cyan-700 transition-colors hover:text-cyan-800"
                  >
                    Upgrading from RMDB or EDGEBI?
                  </Link>
                </div>
              </div>
              <ScreenshotSlideshow
                heightClassName="h-[280px] lg:h-[360px]"
                priority
              />
            </div>
          </div>
        </section>

        {/* Definition + fact table (LLM-citable) */}
        <section className="border-y bg-slate-50 py-10">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  What is EDGEBIC?
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    EDGEBIC schedules manufacturing orders against the real,
                    finite capacity of your plant: shift calendars, holidays,
                    downtime, machine instances, operator skills, and
                    sequence-dependent changeovers. It answers the question
                    every planner actually has: given everything on the floor
                    right now, when will each job really finish?
                  </p>
                  <p>
                    Routings are built visually. In the graphical designer,
                    every operation is a node and every dependency is an arrow,
                    so you can lay out, and later reschedule, your whole
                    factory the way you would sketch it on a whiteboard: as a
                    flow chart, by dragging and dropping.
                  </p>
                  <p>
                    Behind the visual layer sits the deepest engine User
                    Solutions has ever shipped, built on the experience of
                    scheduling for the US Navy, GE, BAE Systems, and Cummins
                    across 35 years.
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <caption className="sr-only">EDGEBIC key facts</caption>
                  <tbody>
                    {[
                      ['Product', 'EDGEBIC'],
                      ['Company', 'User Solutions, Inc. (founded 1991)'],
                      [
                        'Category',
                        'Advanced Planning & Scheduling (APS) / Finite Capacity Scheduling'
                      ],
                      ['Succeeds', 'Resource Manager DB (RMDB) and EDGEBI'],
                      ['Platform', 'Windows desktop, built on .NET 8'],
                      [
                        'Database',
                        'SQLite (single user) or SQL Server (enterprise)'
                      ],
                      [
                        'Shop floor',
                        'Companion kiosk app for operator time and piece tracking'
                      ],
                      [
                        'ERP integration',
                        'Excel / CSV / database import-export masks (JobBOSS, Epicor, Fourth Shift, SAP, and others)'
                      ],
                      [
                        'Heritage customers',
                        'US Navy, GE, BAE Systems, Cummins (User Solutions product line)'
                      ]
                    ].map(([label, value]) => (
                      <tr
                        key={label}
                        className="border-b border-slate-200"
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap py-3 pr-6 align-top font-semibold text-slate-900"
                        >
                          {label}
                        </th>
                        <td className="py-3 text-slate-700">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* The five stages, told with the real product screens */}
        <EdgebicPlanFlow />

        {/* Scheduling engine */}
        <section className="py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
              A scheduling engine that models how your shop really runs
            </h2>
            <p className="mb-8 max-w-3xl text-base text-slate-600">
              Every capability below is a documented part of the product, not a
              roadmap slide.
            </p>
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              {ENGINE_FEATURES.map((feature) => (
                <div key={feature.title}>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-600">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform */}
        <section className="border-y bg-slate-50 py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
              From quoting to the shop floor, in one application
            </h2>
            <p className="mb-8 max-w-3xl text-base text-slate-600">
              What used to take RMDB plus EDGEBI plus spreadsheets now lives in
              a single install.
            </p>
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              {PLATFORM_FEATURES.map((feature) => (
                <div key={feature.title}>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-600">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Heritage */}
        <section className="py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid items-start gap-10 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">
                  Built on results, not promises
                </h2>
                <p className="mb-4 text-base leading-relaxed text-slate-700">
                  EDGEBIC inherits the track record of the User Solutions
                  product line it succeeds:
                </p>
                <ul className="space-y-3 text-base text-slate-700">
                  <li>
                    <strong>GE Railcar Services</strong>: on-time shipping
                    tripled from 30% to over 90%.
                  </li>
                  <li>
                    <strong>USS Nimitz (US Navy)</strong>: 26,000+ preventive
                    maintenance tasks on a 2-year scheduling horizon.
                  </li>
                  <li>
                    <strong>Cummins Engine</strong>: finite capacity scheduling
                    across 33 manufacturing locations.
                  </li>
                  <li>
                    <strong>BAE Systems</strong>: replaced their ERP scheduling
                    module with User Solutions scheduling.
                  </li>
                  <li>
                    <strong>Plastilite Corporation</strong>: complete Fourth
                    Shift ERP integration delivered in 5 days.
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">
                  Where EDGEBIC goes further
                </h2>
                <ul className="space-y-3 text-base text-slate-700">
                  <li>
                    A schedule optimizer with a mathematical layer (Google
                    OR-Tools CP-SAT) that reports how close each schedule is to
                    proven optimal.
                  </li>
                  <li>
                    Labor as a first-class constraint: skills, certifications
                    with expiry, rosters, and time off.
                  </li>
                  <li>
                    Sequence-dependent setup matrices with families, so
                    changeover reality shapes the sequence.
                  </li>
                  <li>
                    Machine pools (work center groups) that re-shop every
                    reschedule for the best available member.
                  </li>
                  <li>
                    A shop-floor kiosk feeding actuals straight into
                    reschedules that never disturb completed work.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t bg-slate-50 py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
              EDGEBIC: frequently asked questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                >
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8">
              <Link
                href={Routes.Contact}
                className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              >
                See EDGEBIC on your data
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
