import * as React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Routes } from '@/constants/routes';
import { getBaseUrl } from '@/lib/urls/get-base-url';

/**
 * Shared "best of / compared" shortlist page.
 *
 * Sibling of comparison-page.tsx. Where that component is a two-way
 * RMDB-vs-X head-to-head, this one renders an honest multi-vendor shortlist
 * for a single buyer question (the kind of prompt an AI assistant is asked),
 * with a direct answer up top, a comparison table, a how-to-choose section,
 * FAQ with FAQPage JSON-LD, and links out to the supporting product,
 * comparison and blog spokes that already exist on the site.
 */

export type ShortlistTool = {
  name: string;
  vendor: string;
  /** Short verdict shown in the shortlist cards. */
  summary: string;
  /** Fit for company size. */
  companySize: string;
  /** ERP integrations, kept conservative. */
  erpIntegration: string;
  /** Deployment model. */
  deployment: string;
  /** Pricing model (never an invented number). */
  pricingModel: string;
  /** Region availability. */
  region: string;
  /** Internal link to a product page, comparison page, or blog spoke. */
  href?: string;
  hrefLabel?: string;
  /** Marks the User Solutions entry so the row is emphasised. */
  isOurs?: boolean;
};

export type ShortlistLink = {
  href: string;
  label: string;
  description: string;
};

export type ShortlistPageData = {
  /** Route path, e.g. /multi-shift-manufacturing-scheduling-software */
  path: string;
  h1: string;
  /** The 2-3 sentence direct answer rendered under the H1. */
  directAnswer: string;
  /** Article JSON-LD headline and description. */
  articleTitle: string;
  articleDescription: string;
  datePublished: string;
  dateModified: string;
  /** Short intro paragraphs after the direct answer. */
  introParagraphs: string[];
  /** Criteria used to pick the shortlist, shown as a checklist. */
  criteria: string[];
  tools: ShortlistTool[];
  /** "How to choose" guidance blocks. */
  howToChoose: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  relatedLinks: ShortlistLink[];
  cta: {
    heading: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};

const REGION_NOTE =
  'User Solutions serves manufacturers in North America, the UK and Europe (including Germany, the Netherlands and Ireland). EDGEBIC is a one-time perpetual license with published USD pricing; UK and EU buyers can request GBP or EUR equivalents when quoting.';

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

export function ShortlistPage({
  data
}: {
  data: ShortlistPageData;
}): React.JSX.Element {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${data.path}`;

  return (
    <>
      <ArticleJsonLd
        title={data.articleTitle}
        description={data.articleDescription}
        url={url}
        datePublished={data.datePublished}
        dateModified={data.dateModified}
        aboutEdgebic
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: baseUrl },
          {
            name: 'Compare Products',
            url: `${baseUrl}${Routes.CompareProducts}`
          },
          { name: data.h1, url }
        ]}
      />
      <FAQJsonLd questions={data.faqs} />

      <div className="min-h-screen text-[18px]">
        {/* Hero + direct answer */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                {data.h1}
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                {data.directAnswer}
              </p>
              <p className="mt-4 text-sm text-slate-500">
                By User Solutions, Inc. Updated {formatDate(data.dateModified)}.
                Reviewed against vendor documentation and our own scheduling
                implementation experience since 1991.
              </p>
            </div>
          </div>
        </section>

        {/* Intro + criteria */}
        <section className="border-y bg-slate-50 py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[3fr_2fr]">
              <div className="space-y-4">
                {data.introParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="leading-relaxed text-gray-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-3 text-lg font-semibold text-slate-900">
                  How we built this shortlist
                </h2>
                <ul className="space-y-2">
                  {data.criteria.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Shortlist cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                The shortlist
              </h2>
              <ol className="grid gap-6 md:grid-cols-2">
                {data.tools.map((tool, index) => (
                  <li
                    key={tool.name}
                    className={
                      tool.isOurs
                        ? 'rounded-lg border-2 border-cyan-500 bg-white p-6'
                        : 'rounded-lg border bg-white p-6'
                    }
                  >
                    <p className="mb-1 text-xs font-medium text-slate-500">
                      {index + 1}. {tool.vendor}
                    </p>
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      {tool.name}
                    </h3>
                    <p className="mb-3 text-sm leading-relaxed text-gray-600">
                      {tool.summary}
                    </p>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                      <dt className="font-medium text-slate-700">Best for</dt>
                      <dd className="text-gray-600">{tool.companySize}</dd>
                      <dt className="font-medium text-slate-700">Pricing</dt>
                      <dd className="text-gray-600">{tool.pricingModel}</dd>
                    </dl>
                    {tool.href && (
                      <Link
                        href={tool.href}
                        className="mt-3 inline-block text-sm font-medium text-cyan-700 hover:text-cyan-800"
                      >
                        {tool.hrefLabel ?? `Read more about ${tool.name}`}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-2 text-2xl font-bold text-slate-900">
                Side-by-side comparison
              </h2>
              <p className="mb-6 text-gray-600">
                Company-size fit, ERP integration, deployment, pricing model
                and region for every tool on the shortlist. Competitor details
                are kept general where vendors do not publish specifics.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-cyan-600 text-white">
                      <th className="px-4 py-3 text-left font-semibold">
                        Tool
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Fit for company size
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        ERP integration
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Deployment
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Pricing model
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Region
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.tools.map((tool, i) => (
                      <tr
                        key={tool.name}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                      >
                        <td className="px-4 py-3 align-top font-medium text-slate-900">
                          {tool.name}
                          <span className="block text-xs font-normal text-slate-500">
                            {tool.vendor}
                          </span>
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700">
                          {tool.companySize}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700">
                          {tool.erpIntegration}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700">
                          {tool.deployment}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700">
                          {tool.pricingModel}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700">
                          {tool.region}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">{REGION_NOTE}</p>
            </div>
          </div>
        </section>

        {/* How to choose */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                How to choose
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.howToChoose.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border bg-slate-50 p-6"
                  >
                    <h3 className="mb-2 text-lg font-semibold text-cyan-700">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {data.faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
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

        {/* Related resources */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Go deeper
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border bg-white p-5 transition-colors hover:bg-slate-50"
                  >
                    <h3 className="mb-1 font-semibold text-slate-900">
                      {link.label}
                    </h3>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            {data.cta.heading}
          </h2>
          <p className="mb-6 text-slate-600">{data.cta.body}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={data.cta.primaryHref}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
            >
              {data.cta.primaryLabel}
            </Link>
            <Link
              href={data.cta.secondaryHref}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              {data.cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
