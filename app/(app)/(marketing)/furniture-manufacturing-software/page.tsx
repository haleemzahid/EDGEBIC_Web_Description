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
  title: 'Furniture Manufacturing Software (2026) — Cut, Build, Finish, Ship',
  description:
    'Furniture manufacturing software for production scheduling. Cut list optimization, multi-stage routings (cut, build, finish, upholster), and labor scheduling for furniture and woodworking shops.',
  path: '/furniture-manufacturing-software',
  keywords:
    'furniture manufacturing software, woodworking production scheduling, furniture production scheduling, cabinet manufacturing software, furniture ERP, custom furniture scheduling, upholstery production scheduling, furniture shop management software'
});

const FAQS = [
  {
    question: 'How does RMDB handle multi-stage furniture routings?',
    answer:
      'Furniture is the textbook multi-stage routing problem: cut → assemble → sand → stain → finish → upholster → pack. RMDB schedules every stage as a finite-capacity operation on its own work center with its own setup time and labor requirement. The Gantt shows the complete flow so planners can spot bottlenecks at any stage — usually finishing or upholstery rather than cutting.'
  },
  {
    question: 'Can RMDB schedule custom and made-to-order furniture?',
    answer:
      'Yes — this is one of its strengths. Custom furniture is high-mix, low-volume manufacturing where every job has a unique BOM, finish selection, and dimension. RMDB handles configurable items, alternate routings, and one-off customer specifications without forcing the planner to create a new template every time. The schedule adapts to the order, not the other way around.'
  },
  {
    question: 'Does RMDB integrate with cut list optimization software?',
    answer:
      'Yes. Cut optimization (Cabinet Vision, KCDw, Microvellum, Mozaik, etc.) produces a cut list — RMDB schedules the cut operation as a single batched job, then schedules downstream assembly, finishing, and upholstery. This eliminates the spreadsheet bridge between optimization and shop floor that most furniture shops maintain manually.'
  },
  {
    question: 'How does RMDB handle labor-intensive operations like finishing and upholstery?',
    answer:
      'Finishing and upholstery are usually the constraint operations in furniture manufacturing — they require skilled labor and have hard cycle times. RMDB models labor as a scheduled resource alongside machines, so the schedule honors finishers and upholsterers as constraints. Skill matrices ensure only qualified operators get assigned to certified work.'
  },
  {
    question: 'Can RMDB handle outside operations like custom upholstery or specialty finishes?',
    answer:
      'Yes. Outside processing (powder coat, custom upholstery, leather work, hand finishing) is modeled as scheduled operations with lead times. The schedule reserves the part as in-transit during the outside-process window so downstream operations know exactly when the part will be back. This eliminates the wood-shop coordination nightmare of "where is that table right now?"'
  },
  {
    question: 'How long does furniture shop implementation take?',
    answer:
      'Standard 5-Day Implementation Framework. Day 1: configure work centers (cut, sand, finish, upholstery, etc.) and shift calendars. Day 2: import items, BOMs, and multi-stage routings from your shop system. Day 3: import open work orders and run the first finite-capacity solve. Day 4: train schedulers, finishers, and shop floor leads. Day 5: go live.'
  }
];

export default function FurnitureManufacturingPage(): React.JSX.Element {
  return (
    <>
      <IndustryPageJsonLd
        title="Furniture Manufacturing Software"
        description="Production scheduling software for furniture and woodworking manufacturers with multi-stage routings, cut list integration, and labor scheduling."
        url="/furniture-manufacturing-software"
        industryName="Furniture & Woodworking Manufacturing"
        industryDescription="Furniture and woodworking production with multi-stage routings (cut, build, finish, upholster), cut list optimization, and labor-constrained finishing operations."
      />
      <FAQJsonLd
        questions={FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />

      <div className="min-h-screen text-[18px]">
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Furniture Manufacturing Software
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Finite capacity scheduling for furniture and woodworking shops.
                Cut, build, finish, and upholster — sequenced across machines
                and skilled labor, with realistic lead times you can promise.
              </p>
            </div>
          </div>
        </section>

        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Furniture Manufacturing Scheduling Challenges
              </h2>
              <p className="leading-relaxed text-gray-700">
                Furniture production is high-mix, custom, and labor-intensive.
                Multi-stage routings cross saw, sand, finish, and upholstery.
                Finishing is usually the bottleneck. And every custom order
                breaks whatever standard routing you set up. Most ERP
                scheduling modules cannot handle the complexity — leaving
                planners to manage the schedule on a whiteboard.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Multi-stage routings (cut → sand → finish → upholster → pack)',
                  'Custom and made-to-order configurations every job',
                  'Finishing and upholstery as labor-constrained bottlenecks',
                  'Cut list optimization software disconnected from production schedule',
                  'Outside processing for specialty finishes and upholstery',
                  'Daily customer expedites force manual rescheduling'
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

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                How RMDB Serves Furniture Manufacturers
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB schedules every stage of furniture production as a
                first-class operation. It honors machine constraints,
                finisher availability, upholsterer skill matrices, and outside
                processing windows in a single Gantt view that planners can
                trust.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Finite capacity scheduling across multi-stage routings',
                  'Cut list integration with downstream production scheduling',
                  'Finisher and upholsterer skill matrices',
                  'Custom and configurable item support',
                  'Outside processing as scheduled operations',
                  'Drag-and-drop Gantt for daily reschedules',
                  'Realistic delivery dates based on real shop capacity',
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

        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Proven Results in Furniture Manufacturing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Multi-Stage',
                    label: 'Cut, build, finish, upholster in one Gantt schedule',
                    company: 'Furniture Manufacturing Pattern'
                  },
                  {
                    metric: 'Custom',
                    label: 'Made-to-order configurations without template churn',
                    company: 'Furniture Manufacturing Pattern'
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

      <IndustrySuccessStories
        industryTags={['Furniture', 'Woodworking', 'Custom Manufacturing']}
        title="Furniture &amp; Woodworking Success Stories"
        subtitle="See how furniture shops use RMDB to schedule custom production from cut to finish."
      />

      <RelatedSolutions currentPath={Routes.FurnitureManufacturing} />

      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fix your furniture shop schedule?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Get a live demo with your real cut lists, finishing routings, and
            upholstery operations. See finite-capacity scheduling running on
            your actual production data.
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
