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
  title: 'Print Shop Scheduling Software (2026) — Press, Bindery, On-Time Delivery',
  description:
    'Production scheduling and management software for commercial print shops. Schedule presses, bindery, and finishing across daily job churn with finite capacity and ERP integration.',
  path: '/print-shop-scheduling-software',
  keywords:
    'print shop scheduling software, print shop management software, commercial printing scheduling, press scheduling software, print production scheduling, bindery scheduling, print MIS, print shop ERP'
});

const FAQS = [
  {
    question: 'How is print shop scheduling different from generic manufacturing scheduling?',
    answer:
      'Commercial print is closer to job-shop manufacturing than to repetitive manufacturing — every job is a different SKU, run length, paper stock, ink configuration, and bindery operation. The schedule churns daily as new orders arrive and customers expedite. Print shops also have unique constraints like makeready time on each press, ink-color sequencing to minimize washes, and bindery capacity that often becomes the real bottleneck. Generic ERP scheduling does not handle any of this well.'
  },
  {
    question: 'Does RMDB handle press makeready and changeover sequencing?',
    answer:
      'Yes. Press makeready is modeled as setup time, and ink/stock changes are modeled as sequence-dependent setups so the scheduler honors realistic changeover time when sequencing jobs on a press. The result is a press schedule that minimizes total makeready by grouping similar jobs — exactly the optimization print operators do by hand today.'
  },
  {
    question: 'Can RMDB schedule both press AND bindery in the same workflow?',
    answer:
      'Yes. Press is just the first stage of most print routings — bindery (folding, cutting, stitching, perfect binding, mailing) is often the constraint. RMDB schedules every stage of the routing as a finite-capacity operation, so the print job flows from press through bindery as a coordinated multi-stage schedule. Planners see when bindery is the bottleneck and can sequence press jobs to feed bindery efficiently.'
  },
  {
    question: 'Does RMDB integrate with print MIS systems like Avanti, EFI, or PrintSmith?',
    answer:
      'RMDB integrates with most print MIS systems via standard data exchange. Quotes and orders flow from your MIS into RMDB for finite-capacity scheduling, and completed quantities flow back for billing and WIP tracking. RMDB does not replace your MIS — it adds the dedicated finite-capacity scheduling layer that print MIS platforms typically lack.'
  },
  {
    question: 'How does this help us improve on-time delivery?',
    answer:
      'On-time delivery in print shops fails when sales promises a date that production cannot actually deliver. RMDB calculates realistic promise dates by running a finite-capacity solve at order entry — so the customer gets a date the shop can actually hit. Print shops typically see 15–30% OTD improvement within the first three months of deploying real finite-capacity scheduling.'
  },
  {
    question: 'How long does implementation take for a print shop?',
    answer:
      'Standard 5-Day Implementation Framework. Day 1: configure presses, bindery equipment, and shift calendars. Day 2: import items, paper stock, and routings from your MIS. Day 3: import open work orders and run the first finite-capacity solve. Day 4: train schedulers and CSRs. Day 5: go live with the actual production schedule.'
  }
];

export default function PrintShopSchedulingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Print Shop Scheduling Software"
        description="Production scheduling software for commercial print shops with press, bindery, and finishing operations, finite capacity, and on-time delivery focus."
        url="/print-shop-scheduling-software"
        industryName="Commercial Print Shops"
        industryDescription="Commercial printing including offset, digital, large format, and bindery operations with daily job churn and on-time delivery pressure."
        customerNames={['Sleepmaster Ltd', 'Cook Compression']}
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
                Print Shop Scheduling Software
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Finite capacity scheduling for commercial print shops — press,
                bindery, and finishing in one Gantt view. Realistic promise
                dates, fewer expedites, and on-time delivery you can actually
                deliver.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Print Shop Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Commercial print is high-mix, low-volume manufacturing with
                short cycles and brutal due-date pressure. Sales promises a
                date, the press operator finds out about it three hours before
                makeready, and bindery becomes the surprise bottleneck on
                Thursday afternoon. Most print MIS platforms manage quoting and
                billing well but leave finite-capacity scheduling as a manual
                exercise on a whiteboard.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Daily job churn with constant new orders and expedites',
                  'Sequence-dependent makeready time on every press',
                  'Bindery is often the real bottleneck, not the press',
                  'Salespeople promise dates without finite-capacity validation',
                  'Multi-stage routings (press → bindery → mailing → ship)',
                  'Print MIS platforms handle billing well but not scheduling'
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
                How RMDB Serves Print Shops
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB is a finite-capacity scheduling engine that integrates
                with your existing print MIS to add the dedicated scheduling
                layer most print platforms lack. It models press makeready,
                bindery capacity, and multi-stage routings in a single Gantt
                that planners can rely on.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Finite capacity scheduling across press, bindery, and finishing',
                  'Sequence-dependent makeready and ink-change setup time',
                  'Realistic promise dates calculated at order entry',
                  'Drag-and-drop Gantt for daily reschedules and expedites',
                  'Integrates with print MIS platforms and general ERPs',
                  'Multi-stage routing support — press to bindery to mailing',
                  'On-time delivery KPIs surface bottlenecks before they break',
                  'One-time license — no per-user monthly subscription fees'
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

        {/* Results Section */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Proven Results in Print Shop Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: '30% → 90%',
                    label: 'On-time shipping percentage improvement',
                    company: 'Service & Repair Customer'
                  },
                  {
                    metric: '15–30%',
                    label: 'Typical OTD improvement in first 3 months',
                    company: 'Industry Benchmark'
                  },
                  {
                    metric: '5 Days',
                    label: 'From kickoff to live finite-capacity schedule',
                    company: 'Standard Implementation'
                  },
                  {
                    metric: '$5K',
                    label: 'One-time license — no per-user fees',
                    company: 'Pricing Starting Point'
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

      {/* Success Stories */}
      <IndustrySuccessStories
        industryTags={['Print Shop', 'Printing', 'Commercial Print', 'Job Shop']}
        title="Print & Job Shop Success Stories"
        subtitle="See how print shops and similar high-mix manufacturers use RMDB to control daily scheduling churn."
      />

      <RelatedSolutions currentPath={Routes.PrintShopScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fix your print shop scheduling?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Get a live demo with your real press and bindery routings. See
            finite capacity scheduling, makeready-aware sequencing, and
            realistic promise dates running on your actual jobs.
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
