import * as React from 'react';
import Link from 'next/link';

import { FAQJsonLd } from '@/components/seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Routes } from '@/constants/routes';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Frequently Asked Questions About RMDB Production Planning Software',
  description:
    'Get answers to common questions about Resource Manager DB (RMDB) production planning and scheduling software. Learn about features, pricing, implementation, ERP integration, and more.',
  path: '/faq',
  keywords:
    'RMDB FAQ, production planning FAQ, scheduling software questions, Resource Manager DB help, manufacturing software FAQ, EDGEBI questions, finite capacity planning FAQ, MRP software FAQ'
});

const GENERAL_FAQS = [
  {
    question: 'What is Resource Manager DB (RMDB)?',
    answer:
      'Resource Manager DB (RMDB) is a flexible and affordable production planning, scheduling, and tracking solution designed to adapt to your operations. It features finite capacity planning, MRP, drag-and-drop scheduling, Excel integration, and much more. RMDB has been trusted by manufacturers worldwide for over 35 years.'
  },
  {
    question: 'What is the difference between RMDB and EDGEBI?',
    answer:
      'RMDB (Resource Manager DB) is our core production planning and scheduling database application. EDGEBI is the advanced graphical extension that adds interactive Gantt charts, visual drag-and-drop scheduling, and enhanced graphical reporting capabilities on top of RMDB. EDGEBI is bundled with RMDB to provide a complete visual production management experience.'
  },
  {
    question: 'What types of manufacturing operations does RMDB support?',
    answer:
      'RMDB supports a wide range of manufacturing operations including discrete manufacturing, batch processing, job shops, make-to-order, make-to-stock, and mixed-mode environments. It handles complex routings, alternate workcenters, sub-assemblies, multiple constraints (labor, machines, materials), and concurrent resource scheduling.'
  },
  {
    question: 'How long has User Solutions been in business?',
    answer:
      'User Solutions has been providing production planning and scheduling software since 1991 — over 35 years of helping manufacturers improve their operations. Our software has won multiple awards from Capterra, G2, and other review platforms.'
  }
];

const FEATURES_FAQS = [
  {
    question: 'Does RMDB include MRP (Material Requirements Planning) functionality?',
    answer:
      'Yes, RMDB includes full MRP functionality. It handles material requirements planning, purchasing and receiving, inventory management, bill of materials (BOM) explosion, and lead time calculations. It can complement or replace MRP modules in your existing ERP system.'
  },
  {
    question: 'How does finite capacity scheduling work in RMDB?',
    answer:
      'RMDB uses true finite capacity scheduling that considers all real-world constraints — machines, labor, materials, tools, and more — simultaneously. It creates realistic, achievable schedules by never over-allocating resources. You can perform "what-if" analysis to evaluate different scenarios and optimize production flow.'
  },
  {
    question: 'Can RMDB handle drag-and-drop scheduling?',
    answer:
      'Yes, RMDB with the EDGEBI extension provides intuitive drag-and-drop scheduling on interactive Gantt charts. You can visually move, split, and adjust production orders in real-time, with the system automatically recalculating downstream impacts and flagging any constraint violations.'
  },
  {
    question: 'Does RMDB support what-if analysis?',
    answer:
      'Absolutely. RMDB makes it easy to perform what-if scenario analysis. You can duplicate schedules, adjust parameters (priorities, capacity, order quantities), and compare outcomes side by side. This helps you make data-driven decisions about production changes before committing to them.'
  }
];

const INTEGRATION_FAQS = [
  {
    question: 'Can RMDB integrate with my existing ERP system?',
    answer:
      'Yes, RMDB is designed to integrate with virtually any ERP system. It can import data from Excel spreadsheets, CSV files, databases, and direct ERP connections. Many customers use RMDB as a powerful scheduling add-on to their existing ERP (SAP, Oracle, Epicor, Sage, etc.) without replacing it.'
  },
  {
    question: 'What data formats does RMDB support for import and export?',
    answer:
      'RMDB supports Excel (XLS, XLSX), CSV, and direct database connections for data import and export. It can work with your existing data in its current form — no data migration or reformatting required. This makes initial setup fast and ongoing data synchronization straightforward.'
  },
  {
    question: 'Can RMDB work with Excel-based data?',
    answer:
      'Yes, deep Excel integration is a core strength of RMDB. If you currently manage production data in Excel spreadsheets, RMDB can directly import that data and transform it into actionable production schedules. You can also export schedules and reports back to Excel for sharing.'
  }
];

const IMPLEMENTATION_FAQS = [
  {
    question: 'How long does it take to implement RMDB?',
    answer:
      'Most RMDB implementations can be completed in days to weeks, not months. Because RMDB works with your existing data and adapts to your processes (rather than forcing you to change), the setup is significantly faster than traditional production planning software. We focus on resolving your most pressing issues first for immediate ROI.'
  },
  {
    question: 'Is RMDB suitable for small and mid-size manufacturers?',
    answer:
      'Absolutely. RMDB was specifically designed to be accessible and affordable for small to mid-size manufacturers who need powerful scheduling capabilities without the cost and complexity of enterprise-level systems. From 5-person job shops to 500+ employee factories, RMDB scales to fit.'
  },
  {
    question: 'Can I try RMDB before purchasing?',
    answer:
      'Yes, we offer live demonstrations where we can even use your own data to show exactly how RMDB will work for your specific operations — risk free. Contact us to schedule a personalized demo and see the difference RMDB can make for your production planning.'
  },
  {
    question: 'What training and support is available?',
    answer:
      'User Solutions provides comprehensive training and ongoing support for all RMDB customers. This includes initial setup assistance, user training, Quick Start guides, video tutorials, and responsive technical support. Our consulting services can also help optimize your production planning processes.'
  },
  {
    question: 'What operating systems does RMDB run on?',
    answer:
      'RMDB runs on Windows operating systems and can be deployed as a standalone application or on a network for multi-user access. The EDGEBI web extension provides browser-based access to scheduling visualizations and dashboards.'
  }
];

const ALL_FAQS = [...GENERAL_FAQS, ...FEATURES_FAQS, ...INTEGRATION_FAQS, ...IMPLEMENTATION_FAQS];

export default function FAQPage(): React.JSX.Element {
  return (
    <>
      <FAQJsonLd
        questions={ALL_FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Get answers to common questions about Resource Manager DB (RMDB)
              production planning and scheduling software. Can&apos;t find what
              you&apos;re looking for?{' '}
              <Link
                href={Routes.Contact}
                className="font-medium text-cyan-600 underline hover:text-cyan-700"
              >
                Contact us
              </Link>{' '}
              and we&apos;ll be happy to help.
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <div className="container mx-auto max-w-4xl px-4 py-12">
          {/* General Questions */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              General Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {GENERAL_FAQS.map((faq, index) => (
                <AccordionItem key={index} value={`general-${index}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Features & Capabilities */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Features & Capabilities
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {FEATURES_FAQS.map((faq, index) => (
                <AccordionItem key={index} value={`features-${index}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Integration & Data */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Integration & Data
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {INTEGRATION_FAQS.map((faq, index) => (
                <AccordionItem key={index} value={`integration-${index}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Implementation & Support */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Implementation & Support
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {IMPLEMENTATION_FAQS.map((faq, index) => (
                <AccordionItem key={index} value={`implementation-${index}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA Section */}
          <section className="rounded-xl bg-slate-50 p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900">
              Still Have Questions?
            </h2>
            <p className="mb-6 text-slate-600">
              Schedule a free live demo and see RMDB in action — we can even use
              your own data.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={Routes.Contact}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              >
                Contact Us
              </Link>
              <Link
                href="/resource-manager-db-2"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
              >
                Learn More About RMDB
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
