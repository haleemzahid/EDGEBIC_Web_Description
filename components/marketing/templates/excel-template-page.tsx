import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Download, FileSpreadsheet, ListChecks } from 'lucide-react';

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
export type RelatedTemplate = {
  href: string;
  title: string;
  description: string;
};

export type ExcelTemplatePageData = {
  /** URL slug under /excel-templates/ — e.g. "production-schedule" */
  slug: string;
  /** H1 — must contain the primary keyword */
  h1: string;
  /** Hero subtitle (~25 words) */
  subtitle: string;
  /** TL;DR sentence shown in the hero callout */
  tldr: string;
  /** Long-form intro paragraphs (plain strings, no markdown) */
  introParagraphs: string[];
  /** What's-inside bullet list */
  whatsInside: { title: string; description: string }[];
  /** How-to-use steps */
  howToUseSteps: { title: string; description: string }[];
  /** When you outgrow Excel — sales transition section */
  whenToUpgrade: string[];
  /** FAQ entries — also emitted as FAQPage schema */
  faqs: { question: string; answer: string }[];
  /** Related templates — internal linking */
  relatedTemplates: RelatedTemplate[];
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ExcelTemplatePage({ data }: { data: ExcelTemplatePageData }) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/excel-templates/${data.slug}`;

  const breadcrumbs = [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Excel Templates', url: `${baseUrl}/excel-templates` },
    { name: data.h1, url }
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
        name="Resource Manager for Excel (RMX)"
        description="Excel-based production scheduling, capacity planning, and master production schedule tool used by manufacturers since 1991. Free 30-day trial."
        url={`${baseUrl}/resource-manager-for-excel-2`}
        price="0"
        priceCurrency="USD"
      />

      <article className="min-h-screen bg-white">
        {/* ---------- Hero ---------- */}
        <header className="border-b bg-gradient-to-b from-emerald-50 to-white">
          <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-slate-500"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="hover:text-emerald-700"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/excel-templates"
                    className="hover:text-emerald-700"
                  >
                    Excel Templates
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li
                  className="text-slate-700"
                  aria-current="page"
                >
                  {data.h1}
                </li>
              </ol>
            </nav>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
              <FileSpreadsheet className="size-3.5" />
              Free Excel Template
            </div>

            <h1 className="mb-5 text-3xl font-bold leading-tight text-slate-900 md:text-5xl md:leading-tight">
              {data.h1}
            </h1>
            <p className="mb-8 max-w-3xl text-lg text-slate-600 md:text-xl">
              {data.subtitle}
            </p>

            <div className="mb-8 rounded-xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700">
                What you get
              </p>
              <p className="text-base text-slate-800 md:text-lg">{data.tldr}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                asChild
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {/*
                  TODO (CRM integration): wire this CTA to an email-gated form that
                  captures lead → CRM → emails the download link. For now, links
                  directly to /product-downloads where users can grab RMX (the
                  Excel-based scheduling tool this template is built on).
                */}
                <Link href="/product-downloads">
                  <Download className="mr-2 size-4" />
                  Get the Free Template
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <Link href="/contact-us">Schedule a Demo</Link>
              </Button>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Free 30-day trial · No credit card required · Used by manufacturers
              since 1991
            </p>
          </div>
        </header>

        <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
          {/* ---------- Intro ---------- */}
          <section className="prose prose-slate prose-lg mb-14 max-w-none">
            <h2>Why manufacturers still use Excel for this</h2>
            {data.introParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          {/* ---------- What's Inside ---------- */}
          <section
            id="whats-inside"
            className="mb-14 scroll-mt-24"
          >
            <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
              What&apos;s inside the template
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {data.whatsInside.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <ListChecks className="size-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- How To Use ---------- */}
          <section
            id="how-to-use"
            className="mb-14 scroll-mt-24"
          >
            <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
              How to use this template
            </h2>
            <p className="mb-6 text-slate-600">
              A practical walkthrough — five steps from blank spreadsheet to a
              working schedule.
            </p>
            <ol className="space-y-5">
              {data.howToUseSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
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

          {/* ---------- When You Outgrow Excel ---------- */}
          <section
            id="when-to-upgrade"
            className="mb-14 scroll-mt-24"
          >
            <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
              When you outgrow this template
            </h2>
            <p className="mb-6 text-slate-600">
              Excel is the right answer for early-stage scheduling — until it
              isn&apos;t. Here are the warning signs that you need a real production
              scheduling tool.
            </p>
            <div className="space-y-3">
              {data.whenToUpgrade.map((sign, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-lg bg-amber-50 p-4"
                >
                  <Check className="mt-0.5 size-5 shrink-0 text-amber-600" />
                  <span className="text-slate-800">{sign}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6">
              <p className="mb-3 text-slate-700">
                If three or more of these apply, you have outgrown Excel
                scheduling. The good news: you do not have to leave Excel
                behind. <strong>Resource Manager for Excel (RMX)</strong> is a real
                finite-capacity scheduling engine that runs as an Excel add-in
                — so your team keeps the interface they know while gaining the
                scheduling power of a dedicated APS tool.
              </p>
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Link href="/resource-manager-for-excel-2">
                  Learn about RMX
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
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
                    <span className="ml-4 text-emerald-600 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-slate-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ---------- Related Templates ---------- */}
          {data.relatedTemplates.length > 0 && (
            <section
              id="related"
              className="mb-14 scroll-mt-24"
            >
              <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
                More free Excel templates for manufacturers
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {data.relatedTemplates.map((rel) => (
                  <Link
                    key={rel.href}
                    href={rel.href}
                    className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-emerald-300 hover:shadow-md"
                  >
                    <h3 className="mb-2 font-semibold text-slate-900 group-hover:text-emerald-700">
                      {rel.title}
                    </h3>
                    <p className="mb-3 flex-1 text-sm text-slate-600">
                      {rel.description}
                    </p>
                    <span className="inline-flex items-center text-sm font-semibold text-emerald-700">
                      Get the template
                      <ArrowRight className="ml-1.5 size-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ---------- Final CTA ---------- */}
          <section className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-center text-white md:p-12">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              Get the free template — plus the tool that grew up around it
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-emerald-50">
              The template is the starting point. Resource Manager for Excel
              (RMX) is what manufacturers move to when their Excel scheduler
              starts breaking. 35+ years in production, free 30-day trial.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                variant="secondary"
                asChild
              >
                <Link href="/product-downloads">
                  <Download className="mr-2 size-4" />
                  Download Free Template
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/contact-us">Schedule a Demo</Link>
              </Button>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
