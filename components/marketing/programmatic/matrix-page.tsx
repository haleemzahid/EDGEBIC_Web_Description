import * as React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { AppInfo } from '@/constants/app-info';
import type { MatrixCell } from '@/lib/programmatic/matrix';

const usd = (price: string) => `$${Number(price).toLocaleString('en-US')}`;

interface MatrixPageProps {
  cell: MatrixCell;
}

/**
 * Shared programmatic page component for Industry × Feature matrix.
 * Renders deterministic, unique-per-cell copy by interleaving the industry
 * profile (challenges, terminology, customer types) with the feature profile
 * (capabilities, benefits). Each cell yields ≥600 words of intersection-
 * specific content — the Google "thin programmatic" trap.
 */
export function MatrixPage({ cell }: MatrixPageProps): React.JSX.Element {
  const { industry, feature } = cell;

  const h1 = `${feature.name} for ${industry.name}`;
  const heroBody = `${feature.shortLabel.charAt(0).toUpperCase()}${feature.shortLabel.slice(1)} built for the reality of ${industry.shortLabel}: ${industry.challenges[0].toLowerCase()}, ${industry.challenges[1].toLowerCase()}, and ${industry.challenges[2].toLowerCase()}. Generic ${feature.shortLabel} ignores these constraints. We built ours around them — for 35+ years.`;

  // Build cell-specific FAQ from feature seeds + industry context.
  const faqs = buildCellFaqs(cell);

  return (
    <>
      <div className="min-h-screen text-[18px]">
        {/* Hero */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                {h1}
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                {heroBody}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
                >
                  Schedule a Free Demo
                </Link>
                {industry.canonicalPagePath && (
                  <Link
                    href={industry.canonicalPagePath}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    See {industry.name} Solution
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Why this intersection */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Why {industry.plural.charAt(0).toUpperCase()}{industry.plural.slice(1)} Need {feature.name} That Understands Their Floor
              </h2>
              <p className="leading-relaxed text-gray-700">
                {buildIntersectionIntro(cell)}
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {industry.challenges.map((item) => (
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

        {/* How the feature solves it */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                How Our {feature.name} Works for {industry.name}
              </h2>
              <p className="leading-relaxed text-gray-700">
                {buildSolutionIntro(cell)}
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {feature.capabilities.map((item) => (
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

        {/* Outcomes */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                What {industry.plural.charAt(0).toUpperCase()}{industry.plural.slice(1)} Get From {feature.name}
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {feature.benefits.map((benefit, i) => (
                  <div
                    key={benefit}
                    className="rounded-lg border bg-white p-6 text-center"
                  >
                    <p className="mb-2 text-lg font-bold text-cyan-600">
                      Outcome {i + 1}
                    </p>
                    <p className="text-sm text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Related Resources
              </h2>
              <p className="mb-6 text-gray-700">
                {industry.name} planners often combine {feature.name.toLowerCase()} with these adjacent capabilities:
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {feature.canonicalPagePath && (
                  <li>
                    <Link
                      href={feature.canonicalPagePath}
                      className="text-cyan-700 underline hover:text-cyan-800"
                    >
                      The full {feature.name} product page
                    </Link>
                  </li>
                )}
                {industry.canonicalPagePath && (
                  <li>
                    <Link
                      href={industry.canonicalPagePath}
                      className="text-cyan-700 underline hover:text-cyan-800"
                    >
                      The full {industry.name} solution page
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/success-stories"
                    className="text-cyan-700 underline hover:text-cyan-800"
                  >
                    Case studies from manufacturers we&apos;ve worked with
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="text-cyan-700 underline hover:text-cyan-800"
                  >
                    Talk to a {industry.name.toLowerCase()} scheduling specialist
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              {industry.name} {feature.name} FAQ
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {faqs.map((faq, index) => (
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

      {/* CTA */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to fix {feature.shortLabel} for your {industry.shortLabel} operation?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Get a live demo with your real production data — no slide deck.
            See {feature.shortLabel} run against {industry.terminology[0] ?? 'your shop'} reality.
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

/**
 * Builds cell-specific FAQ list by combining feature.faqSeeds with industry-
 * specific framing. Each industry × feature pair produces a distinct set.
 */
export function buildCellFaqs(cell: MatrixCell): { question: string; answer: string }[] {
  const { industry, feature } = cell;
  const terminology = industry.terminology;
  const term1 = terminology[0] ?? 'shop floor';
  const term2 = terminology[1] ?? 'production';

  return [
    {
      question: `What makes ${feature.name.toLowerCase()} different for ${industry.shortLabel}?`,
      answer: `${industry.name.charAt(0).toUpperCase()}${industry.name.slice(1).toLowerCase()} operations face specific constraints that generic ${feature.shortLabel} ignores: ${industry.challenges[0].toLowerCase()}, ${industry.challenges[1].toLowerCase()}, and ${industry.challenges[2].toLowerCase()}. Our ${feature.name.toLowerCase()} was designed by working with manufacturers who actually run ${term1} and ${term2} every day — so the scheduling logic honors the reality of how ${industry.plural} operate, not a textbook model.`
    },
    {
      question: `How does ${feature.name.toLowerCase()} integrate with our existing ${industry.shortLabel} systems?`,
      answer: `Our ${feature.name.toLowerCase()} integrates bi-directionally with QuickBooks, Sage, Microsoft Dynamics, Epicor, JobBOSS, E2 Shop System, and many other ERPs that ${industry.plural} commonly run. Work orders, ${term1} routings, and capacity data flow into the scheduler; completion data, scrap, and labor data flow back to your system of record. No rip-and-replace required.`
    },
    {
      question: feature.faqSeeds[0] ? `${feature.faqSeeds[0]}?` : `How does this compare to other ${feature.shortLabel} options?`,
      answer: `${feature.benefits[0]} ${feature.benefits[1] ? feature.benefits[1] + '.' : ''} For ${industry.plural} specifically, that means ${industry.challenges[3]?.toLowerCase() ?? industry.challenges[0].toLowerCase()} stops being a daily firefight. Implementation follows our 5-Day Framework: install, configure, import, train, go live.`
    },
    {
      question: `How long does ${feature.shortLabel} implementation take for ${industry.shortLabel}?`,
      answer: `Standard ${industry.shortLabel} implementations finish in our 5-Day Framework. Day 1: install and configure work centers and shift calendars matching your ${term1} layout. Day 2: import items, routings, and BOMs from your existing system. Day 3: import open work orders and run the first ${feature.shortLabel} pass. Day 4: train planners and supervisors on the dashboards. Day 5: go-live with the live ${term2} schedule. Larger or multi-site ${industry.plural} typically extend to 2–4 weeks.`
    },
    {
      question: `How much does ${feature.shortLabel} cost for ${industry.shortLabel}?`,
      answer: `${AppInfo.APP_NAME}, the current generation of RMDB, is sold as a one-time perpetual license with no per-user or per-machine subscription: ${usd(AppInfo.EDITIONS.APS.PRICE)} for ${AppInfo.EDITIONS.APS.NAME} or ${usd(AppInfo.EDITIONS.COMPLETE.PRICE)} for ${AppInfo.EDITIONS.COMPLETE.NAME}. For ${industry.plural}, where machine count can vary widely, that is a fixed, known cost compared with per-machine SaaS competitors billed indefinitely at 20+ machines. Implementation services and an optional support contract are quoted separately.`
    }
  ];
}

function buildIntersectionIntro(cell: MatrixCell): string {
  const { industry, feature } = cell;
  const term = industry.terminology[0] ?? 'shop floor';
  const term2 = industry.terminology[1] ?? 'production';
  const cap = feature.capabilities[0].toLowerCase();
  return `${industry.name.charAt(0).toUpperCase()}${industry.name.slice(1).toLowerCase()} is not generic ${term2}. Every ${term} decision is shaped by ${industry.challenges[0].toLowerCase()}, every order is shaped by ${industry.challenges[1].toLowerCase()}, and every weekly plan gets disrupted by ${industry.challenges[2].toLowerCase()}. Off-the-shelf ${feature.shortLabel} tools were built for a textbook model of manufacturing that does not survive contact with a real ${industry.shortLabel} floor. Our ${feature.name.toLowerCase()} starts from the constraints — ${cap}, modeled the way ${industry.plural} actually run them.`;
}

function buildSolutionIntro(cell: MatrixCell): string {
  const { industry, feature } = cell;
  const customer = industry.customerTypes[0] ?? `${industry.shortLabel} operations`;
  return `${feature.name} is a finite-capacity-aware scheduling engine purpose-built for the messiness of real manufacturing. For ${industry.plural} — including ${customer.toLowerCase()} — it handles ${industry.challenges[0].toLowerCase()}, ${industry.challenges[1].toLowerCase()}, and ${industry.challenges[2].toLowerCase()} in a single Gantt-driven interface planners can actually use. Below is what that looks like in practice.`;
}
