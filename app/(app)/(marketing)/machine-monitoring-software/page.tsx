import * as React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

import {
  SoftwareApplicationJsonLd,
  FAQJsonLd,
  BreadcrumbJsonLd
} from '@/components/seo';
import { RelatedSolutions } from '@/components/marketing/sections/related-solutions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { AppInfo } from '@/constants/app-info';
import { Routes } from '@/constants/routes';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getBaseUrl } from '@/lib/urls/get-base-url';

export const metadata = createPageMetadata({
  title: 'Machine Monitoring Software (2026) — Real-Time OEE, Downtime & Shop Floor Analytics',
  description:
    'Machine monitoring system built for real manufacturers. Live OEE, downtime tracking, machine utilization, and shop floor analytics — powered by EDGEBI and integrated with finite capacity scheduling. 35+ years of manufacturing data experience.',
  path: '/machine-monitoring-software',
  keywords:
    'machine monitoring system, machine monitoring software, real time machine monitoring, OEE monitoring software, downtime monitoring software, machine utilization software, shop floor monitoring, manufacturing machine monitoring, CNC machine monitoring, factory machine monitoring, machine performance monitoring, equipment monitoring system, production machine monitoring'
});

const FAQS = [
  {
    question: 'What is a machine monitoring system?',
    answer:
      'A machine monitoring system captures real-time data from your production machines — run-time, downtime, cycle counts, fault codes, and operator inputs — and turns that data into actionable shop floor dashboards. The goal is simple: stop guessing why machines are idle and start fixing the actual causes of lost capacity. EDGEBI does this and ties the data back to your finite-capacity schedule so production planning reflects what is really happening on the floor.'
  },
  {
    question: 'How is machine monitoring different from MES or SCADA?',
    answer:
      'MES manages the full work-order lifecycle on the shop floor (routing, labor, quality, dispatch). SCADA controls and monitors industrial processes at the PLC level. Machine monitoring sits between them: it focuses specifically on capturing utilization, downtime reasons, OEE, and production counts per machine, and it surfaces that data in dashboards aimed at supervisors, planners, and plant managers — not control engineers. EDGEBI is purpose-built for that supervisor and planner audience.'
  },
  {
    question: 'Do we need to install hardware on every machine?',
    answer:
      'It depends. For modern CNC machines with MTConnect, OPC-UA, or Fanuc Focas APIs, EDGEBI reads data directly over the network — no extra hardware. For older equipment without digital outputs, lightweight IoT collectors (a small box that watches stack lights, run-time signals, or operator buttons) feed data into the same dashboards. Most shops use a mix of both depending on machine age.'
  },
  {
    question: 'How is OEE calculated in EDGEBI?',
    answer:
      'OEE = Availability × Performance × Quality. EDGEBI captures availability from actual machine run-time vs. scheduled run-time, performance from cycle counts vs. ideal cycle time per part, and quality from good-part counts vs. total parts (either from operator entry or downstream inspection data). The result is a true OEE number per machine, per shift, per work order — not a self-reported guess.'
  },
  {
    question: 'Does machine monitoring integrate with RMDB scheduling?',
    answer:
      'Yes — this is the core advantage. EDGEBI shares the same database as Resource Manager DB (RMDB), so live machine data flows directly into the finite-capacity schedule. When a machine goes down, the scheduler knows. When a job runs faster than standard, the scheduler knows. The result is a schedule that reflects shop floor reality instead of a planning fiction that breaks the moment production starts.'
  },
  {
    question: 'How long does machine monitoring implementation take?',
    answer:
      'For shops with modern CNC controllers and a stable network, EDGEBI machine monitoring can be live in 1–2 weeks: install the data collectors or configure the MTConnect/OPC endpoints, build the dashboards, train supervisors. For shops mixing legacy and modern equipment, plan for 4–6 weeks because of the additional hardware install and signal mapping. We have been doing this since 1991, so the rollout playbook is well-rehearsed.'
  },
  {
    question: 'How much does machine monitoring software cost?',
    answer:
      'There is no per-user or per-machine subscription. Shop floor data capture, OEE and utilization reporting are included in EDGEBIC, the current generation of RMDB and EDGEBI, sold as a one-time perpetual license: $25,000 for EDGEBIC APS or $35,000 for EDGEBIC Complete. That is a critical difference from per-machine SaaS competitors that get expensive fast at 20+ machines. Implementation services are quoted separately based on machine count and hardware requirements. Most shops see ROI within 90 days from a single recovered shift of capacity.'
  }
];

export default function MachineMonitoringSoftwarePage(): React.JSX.Element {
  const baseUrl = getBaseUrl();
  return (
    <>
      <SoftwareApplicationJsonLd
        name={AppInfo.APP_NAME}
        description="Real-time machine monitoring, OEE tracking, downtime analysis, and shop floor analytics integrated with finite-capacity production scheduling."
        url={`${baseUrl}/edgebic`}
        applicationSubCategory="Production Scheduling Software"
        price={AppInfo.EDITIONS.APS.PRICE}
        offerUrl="/pricing"
      />
      <FAQJsonLd
        questions={FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${baseUrl}/` },
          {
            name: 'Machine Monitoring Software',
            url: `${baseUrl}/machine-monitoring-software`
          }
        ]}
      />

      <div className="min-h-screen text-[18px]">
        {/* Hero Section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Machine Monitoring Software for Real Manufacturers
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Real-time OEE, downtime tracking, and shop floor analytics that
                actually plug into your production schedule. Stop guessing why
                machines are idle — and stop scheduling work against capacity
                that is not really there. Used by manufacturers since 1991.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
                >
                  Schedule a Free Demo
                </Link>
                <Link
                  href="/edgebi"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  See EDGEBI in Action
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Machine Monitoring Matters */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Why Machine Monitoring Is the Hidden Capacity Lever
              </h2>
              <p className="leading-relaxed text-gray-700">
                Most plants run at 40–60% true OEE — but their planners schedule
                as if machines are available 90% of the time. That gap is where
                missed ship dates, overtime, and rework live. The fix is not a
                bigger ERP, it is honest machine data flowing into the schedule.
                A machine monitoring system tells you exactly where capacity is
                leaking, why, and what to do about it.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Machines are idle longer than anyone admits — and nobody knows why',
                  'OEE is calculated once a month from spreadsheets that planners do not trust',
                  'Downtime reasons are guessed at standup, not captured in real time',
                  'Schedules are built against theoretical capacity, not actual run-time',
                  'Operator input is paper-based and arrives at planning two days late',
                  'There is no single source of truth for "how is the shop floor really running"'
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

        {/* What EDGEBI Captures */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                What EDGEBI Machine Monitoring Captures
              </h2>
              <p className="leading-relaxed text-gray-700">
                EDGEBI reads from MTConnect, OPC-UA, Fanuc Focas, and Modbus —
                plus lightweight IoT collectors for older machines without
                digital outputs. The data lands in the same database that
                drives the finite-capacity schedule, so what production sees
                and what planning sees are always the same picture.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Live machine state: running, idle, faulted, in setup, in changeover',
                  'OEE per machine, per shift, per work order — calculated in real time',
                  'Downtime tracking with operator-confirmed reason codes',
                  'Cycle counts, scrap counts, and yield against the active work order',
                  'Shift-level utilization and bottleneck identification',
                  'Andon and stack-light state integration for floor visibility',
                  'Energy consumption per machine (when meters are available)',
                  'Direct feedback into RMDB scheduling for live capacity adjustment'
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

        {/* Built for Shop Floor — Not a Toy */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Why Manufacturers Pick EDGEBI Over Pure-Play Monitoring Tools
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Schedule-Linked',
                    label:
                      'Live machine data flows directly into RMDB finite-capacity scheduling — not a separate silo',
                    company: 'Closed-Loop Planning'
                  },
                  {
                    metric: 'No Per-Machine',
                    label:
                      'Pricing — connect 5 machines or 500 without the cost wall most SaaS monitoring hits',
                    company: 'Predictable Economics'
                  },
                  {
                    metric: '1–2 Weeks',
                    label:
                      'To live OEE for shops with modern CNC controllers and a stable network',
                    company: 'Fast Implementation'
                  },
                  {
                    metric: '35+ Years',
                    label:
                      'Of manufacturing data experience — we have seen what survives a real production environment',
                    company: 'Since 1991'
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
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                How EDGEBI Machine Monitoring Works
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    step: '1',
                    title: 'Connect',
                    body: 'EDGEBI reads from MTConnect, OPC-UA, Fanuc Focas, or Modbus directly. For legacy machines, install a small data collector that watches stack lights, run signals, or operator panels.'
                  },
                  {
                    step: '2',
                    title: 'Capture',
                    body: 'Machine state, cycle counts, downtime reasons, and operator inputs stream into the EDGEBI database in real time. The same database that drives RMDB scheduling.'
                  },
                  {
                    step: '3',
                    title: 'Act',
                    body: 'Dashboards surface OEE, downtime reasons, and bottlenecks to supervisors. RMDB uses the live data to keep the finite-capacity schedule honest. Lost capacity becomes recoverable capacity.'
                  }
                ].map((item) => (
                  <div
                    key={item.step}
                    className="rounded-lg border border-slate-200 bg-white p-6"
                  >
                    <div className="mb-3 inline-flex size-8 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700">
                      {item.step}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {item.body}
                    </p>
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
              Frequently Asked Questions
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

      <RelatedSolutions currentPath={Routes.MachineMonitoringSoftware} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            See your real OEE, not the spreadsheet version
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Get a live demo with one of your machines — connect it in the demo
            and watch true run-time, downtime reasons, and OEE update in real
            time. No slide deck, no fake data.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
            >
              Schedule a Free Demo
            </Link>
            <Link
              href="/product-downloads"
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
