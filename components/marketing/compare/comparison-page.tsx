import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Minus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  BreadcrumbJsonLd,
  FAQJsonLd,
  SoftwareApplicationJsonLd
} from '@/components/seo/json-ld';
import { getBaseUrl } from '@/lib/urls/get-base-url';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ComparisonCell = boolean | 'partial' | string;

export type ComparisonFeatureRow = {
  name: string;
  rmdb: ComparisonCell;
  competitor: ComparisonCell;
  /** Optional short clarifier shown under the row name */
  note?: string;
};

export type ComparisonPageData = {
  /** URL slug under /compare-products/ — e.g. "rmdb-vs-mrpeasy" */
  slug: string;
  /** Competitor display name */
  competitor: string;
  /** Short product description for the competitor */
  competitorDescription: string;
  /** H1 — should contain the primary keyword */
  h1: string;
  /** Hero subtitle (~25 words) */
  subtitle: string;
  /** TL;DR verdict — 2–3 sentences, balanced */
  tldr: string;
  /** Long-form intro paragraphs (markdown not supported — pass as strings) */
  introParagraphs: string[];
  /** Feature comparison table */
  features: ComparisonFeatureRow[];
  /** Pricing summary */
  pricing: {
    rmdbPrice: string;
    rmdbModel: string;
    competitorPrice: string;
    competitorModel: string;
    summary: string;
  };
  /** Where each tool wins */
  rmdbWinsAt: string[];
  competitorWinsAt: string[];
  /** "Best for" buyer profiles */
  rmdbBestFor: string;
  competitorBestFor: string;
  /** Migration guide steps (RMDB-from-competitor) */
  migrationSteps: { title: string; description: string }[];
  /** FAQ entries — also emitted as FAQPage schema */
  faqs: { question: string; answer: string }[];
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function CellIcon({ value }: { value: ComparisonCell }) {
  if (value === true) {
    return (
      <Check
        className="mx-auto size-5 text-emerald-600"
        aria-label="Yes"
      />
    );
  }
  if (value === false) {
    return (
      <X
        className="mx-auto size-5 text-slate-300"
        aria-label="No"
      />
    );
  }
  if (value === 'partial') {
    return (
      <Minus
        className="mx-auto size-5 text-amber-500"
        aria-label="Partial"
      />
    );
  }
  return <span className="text-sm text-slate-700">{value}</span>;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ComparisonPage({ data }: { data: ComparisonPageData }) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/compare-products/${data.slug}`;

  const breadcrumbs = [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Compare Products', url: `${baseUrl}/compare-products` },
    {
      name: `RMDB vs ${data.competitor}`,
      url
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd
        questions={data.faqs.map((f) => ({
          question: f.question,
          answer: f.answer
        }))}
      />
      <SoftwareApplicationJsonLd
        name="RMDB - Resource Manager DB"
        description="Finite-capacity production planning and scheduling software for manufacturers. Drag-and-drop Gantt, ERP integration, and one-time licensing."
        url={`${baseUrl}/resource-manager-db-2`}
        price="5000"
        priceCurrency="USD"
      />

      <article className="min-h-screen bg-white">
        {/* ---------- Hero ---------- */}
        <header className="border-b bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-slate-500"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="hover:text-cyan-700"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/compare-products"
                    className="hover:text-cyan-700"
                  >
                    Compare Products
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li
                  className="text-slate-700"
                  aria-current="page"
                >
                  RMDB vs {data.competitor}
                </li>
              </ol>
            </nav>

            <h1 className="mb-5 text-3xl font-bold leading-tight text-slate-900 md:text-5xl md:leading-tight">
              {data.h1}
            </h1>
            <p className="mb-8 max-w-3xl text-lg text-slate-600 md:text-xl">
              {data.subtitle}
            </p>

            <div className="mb-8 rounded-xl border border-cyan-100 bg-cyan-50/60 p-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-700">
                The short answer
              </p>
              <p className="text-base text-slate-800 md:text-lg">{data.tldr}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                asChild
              >
                <Link href="/contact-us">
                  Schedule a Live Demo
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <Link href="/product-downloads">Download Free Trial</Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
          {/* ---------- Intro ---------- */}
          <section className="prose prose-slate prose-lg mb-14 max-w-none">
            <h2>Why this comparison matters</h2>
            {data.introParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          {/* ---------- Feature Matrix ---------- */}
          <section
            id="feature-comparison"
            className="mb-14 scroll-mt-24"
          >
            <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Feature-by-feature comparison
            </h2>
            <p className="mb-6 text-slate-600">
              An honest side-by-side look at the capabilities buyers ask about most.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full border-collapse text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="w-1/2 border-b border-slate-200 p-4 text-sm font-semibold text-slate-700">
                      Capability
                    </th>
                    <th className="w-1/4 border-b border-slate-200 p-4 text-center text-sm font-semibold text-cyan-700">
                      RMDB
                    </th>
                    <th className="w-1/4 border-b border-slate-200 p-4 text-center text-sm font-semibold text-slate-700">
                      {data.competitor}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.features.map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-slate-100 last:border-b-0 odd:bg-white even:bg-slate-50/40"
                    >
                      <td className="p-4 align-top">
                        <div className="font-medium text-slate-900">{row.name}</div>
                        {row.note && (
                          <div className="mt-1 text-xs text-slate-500">{row.note}</div>
                        )}
                      </td>
                      <td className="p-4 text-center align-top">
                        <CellIcon value={row.rmdb} />
                      </td>
                      <td className="p-4 text-center align-top">
                        <CellIcon value={row.competitor} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              <Check className="mr-1 inline size-3.5 text-emerald-600" /> Included &nbsp;·&nbsp;
              <Minus className="mr-1 inline size-3.5 text-amber-500" /> Limited or partial
              &nbsp;·&nbsp;
              <X className="mr-1 inline size-3.5 text-slate-300" /> Not available
            </p>
          </section>

          {/* ---------- Pricing ---------- */}
          <section
            id="pricing"
            className="mb-14 scroll-mt-24"
          >
            <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
              Pricing comparison
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border-2 border-cyan-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                  RMDB
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {data.pricing.rmdbPrice}
                </p>
                <p className="mt-1 text-sm text-slate-500">{data.pricing.rmdbModel}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                  {data.competitor}
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {data.pricing.competitorPrice}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {data.pricing.competitorModel}
                </p>
              </div>
            </div>
            <p className="mt-5 text-slate-700">{data.pricing.summary}</p>
          </section>

          {/* ---------- Where Each Wins ---------- */}
          <section
            id="strengths"
            className="mb-14 scroll-mt-24"
          >
            <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
              Where each tool wins
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-cyan-100 bg-cyan-50/40 p-6">
                <h3 className="mb-4 text-lg font-bold text-cyan-800">
                  RMDB does this better
                </h3>
                <ul className="space-y-3">
                  {data.rmdbWinsAt.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-slate-700"
                    >
                      <Check className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-6">
                <h3 className="mb-4 text-lg font-bold text-slate-800">
                  {data.competitor} does this better
                </h3>
                <ul className="space-y-3">
                  {data.competitorWinsAt.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-slate-700"
                    >
                      <Check className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ---------- Best For ---------- */}
          <section
            id="best-for"
            className="mb-14 scroll-mt-24"
          >
            <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
              Which one should you pick?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="mb-3 text-lg font-bold text-slate-900">
                  Choose RMDB if…
                </h3>
                <p className="text-slate-700">{data.rmdbBestFor}</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="mb-3 text-lg font-bold text-slate-900">
                  Choose {data.competitor} if…
                </h3>
                <p className="text-slate-700">{data.competitorBestFor}</p>
              </div>
            </div>
          </section>

          {/* ---------- Migration ---------- */}
          <section
            id="migration"
            className="mb-14 scroll-mt-24"
          >
            <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Switching from {data.competitor} to RMDB
            </h2>
            <p className="mb-6 text-slate-600">
              A practical migration path that most manufacturers complete in days,
              not months.
            </p>
            <ol className="space-y-5">
              {data.migrationSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ---------- FAQ ---------- */}
          <section
            id="faq"
            className="mb-14 scroll-mt-24"
          >
            <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {data.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-slate-200 bg-white p-5 open:shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="ml-4 text-cyan-600 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-slate-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ---------- Final CTA ---------- */}
          <section className="rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 p-8 text-center text-white md:p-12">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              See RMDB on your own data
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-cyan-50">
              35+ years helping manufacturers move beyond spreadsheets and
              underpowered cloud tools. Get a live demo with your real production
              schedule — no slide deck required.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                variant="secondary"
                asChild
              >
                <Link href="/contact-us">Schedule a Demo</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/product-downloads">Download Free Trial</Link>
              </Button>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
