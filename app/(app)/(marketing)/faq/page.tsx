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
  title: 'Frequently Asked Questions',
  description:
    'Get answers to common questions about EDGEBIC finite capacity planning and scheduling software. Learn about editions, features, implementation, ERP integration, and the upgrade path from RMDB and EDGEBI.',
  path: '/faq',
  keywords:
    'EDGEBIC FAQ, EDGEBIC questions, EDGEBIC editions, production planning FAQ, scheduling software questions, manufacturing software FAQ, finite capacity planning FAQ, MRP software FAQ, RMDB FAQ, EDGEBI questions'
});

const GENERAL_FAQS = [
  {
    question: 'What is EDGEBIC?',
    answer:
      'EDGEBIC by User Solutions is our next-generation finite capacity planning and scheduling platform, the successor to both RMDB and EDGEBI. It combines the proven RMDB scheduling engine with the EDGEBI graphical experience in one modern Windows application: a drag-and-drop graphical routing designer, forward and backward scheduling, Theory of Constraints bottleneck anchoring, operator and skill constraints, a shop-floor kiosk, and a two-layer schedule optimizer.'
  },
  {
    question: 'What editions is EDGEBIC available in?',
    answer:
      'EDGEBIC comes in two editions. EDGEBIC APS delivers the full finite capacity scheduling and optimization platform: graphical routing designer, forward and backward scheduling, TOC anchoring, parallel and alternate work centers, sequence-dependent setup, lot streaming, operator skills, and the two-layer optimizer. EDGEBIC Complete adds MRP, inventory, purchasing, and material pegging on top, so material availability constrains the schedule alongside machines and labor.'
  },
  {
    question: 'How is EDGEBIC related to RMDB and EDGEBI?',
    answer:
      'EDGEBIC is the direct successor to both products. RMDB (Resource Manager DB) contributed the finite capacity scheduling depth proven over 35 years, and EDGEBI contributed the interactive graphical scheduling experience. EDGEBIC unifies them in a single application and adds a new engine generation: TOC anchor scheduling, backward (just-in-time) scheduling, work center groups, operator and skill constraints, sequence-dependent setup matrices, lot streaming, and a two-layer schedule optimizer. Both legacy products remain fully supported.'
  },
  {
    question: 'What types of manufacturing operations does EDGEBIC support?',
    answer:
      'EDGEBIC supports a wide range of manufacturing operations including discrete manufacturing, batch processing, job shops, make-to-order, make-to-stock, and mixed-mode environments. It handles complex routings, parallel and alternate work centers, work center groups (machine pools), sub-assemblies, multiple constraints (labor, machines, materials), and sequence-dependent setup times.'
  },
  {
    question: 'How long has User Solutions been in business?',
    answer:
      'User Solutions has been providing production planning and scheduling software since 1991, over 35 years of helping manufacturers improve their operations. Our software has won multiple awards from Capterra, G2, and other review platforms, and EDGEBIC builds directly on that lineage.'
  }
];

const FEATURES_FAQS = [
  {
    question: 'Does EDGEBIC include MRP (Material Requirements Planning) functionality?',
    answer:
      'Yes, through the EDGEBIC Complete edition, which adds MRP, inventory management, purchasing, and material pegging on top of the scheduling platform. With Complete, material availability constrains the schedule alongside machines and labor, so a job is never scheduled to start before its materials can be there. EDGEBIC APS focuses on finite capacity scheduling and optimization without the material layer.'
  },
  {
    question: 'How does finite capacity scheduling work in EDGEBIC?',
    answer:
      'EDGEBIC uses true finite capacity scheduling that considers real-world constraints simultaneously: machines, labor skills, shifts, holidays, downtime, and sequence-dependent setup times. It schedules forward from a start date or backward (just-in-time) from a due date, and can anchor around a flagged bottleneck the Theory of Constraints way. Because resources are never over-allocated, every order gets dates the shop can actually hit.'
  },
  {
    question: 'Does EDGEBIC support drag-and-drop scheduling?',
    answer:
      'Yes. EDGEBIC provides drag-and-drop rescheduling on an interactive Gantt with planned-versus-actual timelines, safety prompts before risky moves, and color and label rules you control. Routings themselves are also built graphically: steps are nodes on a drag-and-drop flow chart, so the way your factory flows is the way you draw it.'
  },
  {
    question: 'Does EDGEBIC support what-if analysis?',
    answer:
      'Absolutely. EDGEBIC lets you simulate a prospective order against current finite capacity to get a realistic promise date and cost before you commit, and compare scenarios side by side: an extra shift, a skipped step, boosted capacity. This helps you make data-driven decisions about production changes before committing to them.'
  },
  {
    question: 'Does EDGEBIC include a schedule optimizer?',
    answer:
      'Yes, EDGEBIC includes a two-layer schedule optimizer. The first layer evaluates dozens of complete schedules and returns the best one found, guaranteed never worse than your baseline. The second layer uses Google OR-Tools CP-SAT mathematical optimization and reports a proven optimality gap. You review a side-by-side comparison and accept or discard the result; nothing changes without the planner pressing Accept.'
  }
];

const INTEGRATION_FAQS = [
  {
    question: 'Does EDGEBIC replace my ERP system?',
    answer:
      'No. EDGEBIC complements your ERP rather than replacing it. Your ERP keeps owning financials, purchasing, and transactions. EDGEBIC imports items, work centers, routings, and orders through flexible Excel, CSV, and database import masks, applies the finite capacity scheduling your ERP cannot, and exports realistic dates and schedules back out.'
  },
  {
    question: 'Can EDGEBIC integrate with my existing ERP system?',
    answer:
      'Yes. EDGEBIC works with any ERP that can exchange data through Excel, CSV, or a database connection, which in practice is virtually all of them: JobBOSS, Epicor, Fourth Shift, SAP, Oracle, Sage, and more. The flow is simple: export from your ERP to a file, import through a saved mask, schedule in EDGEBIC, and export the plan back. This is the same proven approach behind 35 years of User Solutions ERP integrations.'
  },
  {
    question: 'What data formats does EDGEBIC support for import and export?',
    answer:
      'EDGEBIC supports Excel (XLS, XLSX), CSV, and database connections for data exchange. Saved import masks map your columns once and reuse that mapping on every subsequent import, so ongoing synchronization is a repeatable routine rather than a project. Schedules, dates, and reports export back out to Excel and CSV for sharing.'
  },
  {
    question: 'Can EDGEBIC work with Excel-based data?',
    answer:
      'Yes, deep Excel integration is a core strength of EDGEBIC. If you currently manage production data in Excel spreadsheets, EDGEBIC can directly import that data through its import masks and turn it into a finite capacity schedule. You can also export schedules and reports back to Excel for sharing.'
  }
];

const IMPLEMENTATION_FAQS = [
  {
    question: 'How long does it take to implement EDGEBIC?',
    answer:
      'Days, not months. EDGEBIC follows the same rapid-implementation methodology User Solutions has used for 35 years: start from your existing data in whatever form it is in, configure the model around your most pressing scheduling problem first, and expand from there. A first-time setup wizard connects the database and walks through initial master data.'
  },
  {
    question: 'Is EDGEBIC suitable for small and mid-size manufacturers?',
    answer:
      'Absolutely. EDGEBIC was designed to be accessible and affordable for small to mid-size manufacturers who need powerful scheduling capabilities without the cost and complexity of enterprise-level systems. From small job shops to multi-shift factories, the two editions let you start with scheduling (EDGEBIC APS) and add materials later (EDGEBIC Complete).'
  },
  {
    question: 'Can I try EDGEBIC before purchasing?',
    answer:
      'Yes, we offer live demonstrations where we can even use your own data to show exactly how EDGEBIC will work for your specific operations, risk free. Contact us to schedule a personalized demo and see the difference EDGEBIC can make for your production planning.'
  },
  {
    question: 'What training and support is available?',
    answer:
      'User Solutions provides comprehensive training and ongoing support for all EDGEBIC customers. This includes initial setup assistance, user training, Quick Start guides, video tutorials, and responsive technical support. Our consulting services can also help optimize your production planning processes.'
  },
  {
    question: 'What operating systems does EDGEBIC run on?',
    answer:
      'EDGEBIC is a modern Windows application built on .NET 8. It runs on SQLite for single-user installs and SQL Server for multi-user enterprise deployments. A dedicated shop-floor kiosk app lets operators start work, count pieces, pause with a reason, and complete, with actuals flowing straight into the schedule.'
  },
  {
    question: 'I use RMDB or EDGEBI today. What is the upgrade path to EDGEBIC?',
    answer:
      'Your investment carries forward. Master data such as items, work centers, routings, and calendars moves into EDGEBIC through the built-in import masks, your scheduling concepts translate directly, and both legacy products remain fully supported while you transition on your own timeline. See our step-by-step guide at /rmdb-to-edgebic for details.'
  }
];

const ALL_FAQS = [
  ...GENERAL_FAQS,
  ...FEATURES_FAQS,
  ...INTEGRATION_FAQS,
  ...IMPLEMENTATION_FAQS
];

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
              Get answers to common questions about EDGEBIC, our next-generation
              finite capacity planning and scheduling platform. Can&apos;t find
              what you&apos;re looking for?{' '}
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
              Schedule a free live demo and see EDGEBIC in action; we can even
              use your own data.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={Routes.Contact}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              >
                Contact Us
              </Link>
              <Link
                href="/edgebic"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
              >
                Explore EDGEBIC
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
