import * as React from 'react';
import Link from 'next/link';
import { CheckCircle, Quote } from 'lucide-react';

import { FeaturePageJsonLd, FAQJsonLd } from '@/components/seo';
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
  title: 'What-If Analysis for Manufacturing',
  description:
    'Manufacturing what-if analysis software for capacity scenario planning, new order evaluation, and production optimization. Turner Bicycles secured their largest customer order ever using what-if analysis. Test scheduling scenarios before committing.',
  path: '/what-if-analysis-manufacturing',
  keywords:
    'what-if analysis manufacturing, manufacturing scenario planning, capacity scenario analysis, production what-if software, manufacturing capacity planning, production scenario analysis, scheduling what-if, capacity evaluation software'
});

const FAQS = [
  {
    question: 'What is what-if analysis in manufacturing?',
    answer:
      'What-if analysis lets you test production scheduling scenarios before committing to them. Can we take this new order and still meet existing commitments? What happens if we add a second shift? If we lose a machine for maintenance, which deliveries are at risk? RMDB lets you answer these questions with real data in minutes — not guesswork.'
  },
  {
    question: 'How did Turner Bicycles use what-if analysis?',
    answer:
      'When the owner returned from a trade show in Japan with the largest order in company history, the production manager simply entered the demand into RMDB, scheduled it, and printed a Gantt chart showing exactly when they could deliver and what the manufacturing costs would be. The owner was "ecstatic to have that information so quickly and accurately to respond back to our customer."'
  },
  {
    question: 'Can what-if analysis evaluate capacity expansion options?',
    answer:
      'Yes. Turner Bicycles uses what-if capabilities to "look at the options of adding more direct labor and purchasing more equipment for shop metal working and doing the work ourselves — or outsourcing." Technical Glass Products ran what-if scenarios to confirm cross-training initiatives, which ultimately delivered a 4% capacity increase with existing resources.'
  },
  {
    question: 'How quickly can I run a what-if scenario?',
    answer:
      'Minutes, not hours. RMDB leverages Excel calculation speed for exceptionally fast scheduling. You can enter a hypothetical order, run the schedule, see the impact on existing commitments, evaluate alternatives, and make a decision — all in a single meeting. ACE Controls noted that it is "quite easy to model different scenarios to determine if a certain method or schedule can actually benefit our bottom line."'
  }
];

export default function WhatIfAnalysisPage(): React.JSX.Element {
  return (
    <>
      <FeaturePageJsonLd
        title="What-If Analysis for Manufacturing"
        description="Manufacturing scenario planning and what-if analysis software for evaluating new orders, capacity changes, and production optimization."
        url="/what-if-analysis-manufacturing"
        featureDescription="What-if analysis capabilities for evaluating production scenarios, new order capacity, workforce changes, and outsourcing decisions in real time."
        featureList={[
          'Production Scenario Analysis',
          'New Order Capacity Evaluation',
          'Workforce Planning Scenarios',
          'Outsource vs. In-House Analysis',
          'Capacity Expansion Modeling',
          'Bottleneck Impact Assessment',
          'Cross-Training ROI Analysis',
          'Real-Time Schedule Impact'
        ]}
        customerNames={[
          'Turner Suspension Bicycles',
          'Technical Glass Products',
          'ACE Controls',
          'Enevate Corporation'
        ]}
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
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                What-If Analysis for Manufacturing
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                Test production scenarios before committing. Evaluate new
                orders, capacity changes, workforce options, and outsourcing
                decisions — with real data, in minutes. The capability that
                secured the largest customer order in Turner Bicycles&apos;
                history.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="border-y bg-slate-50 py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Answer Critical Questions Before Committing
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    question: 'Can we take this order?',
                    description:
                      'Enter the new demand, schedule it, and instantly see if you can deliver on time without impacting existing commitments.',
                    proof: 'Turner Bicycles secured their largest order ever'
                  },
                  {
                    question: 'Should we add capacity?',
                    description:
                      'Model adding shifts, machines, or labor to see the ROI before spending. Compare in-house production vs. outsourcing.',
                    proof: 'Turner Bicycles evaluates labor vs. outsourcing'
                  },
                  {
                    question: 'Where is the bottleneck?',
                    description:
                      'Identify which workcenter, skill, or material is constraining your throughput and test solutions before implementing.',
                    proof: 'Technical Glass Products found and fixed bottlenecks'
                  },
                  {
                    question: 'What if we cross-train?',
                    description:
                      'Test cross-training scenarios to see how workforce flexibility impacts capacity and delivery before investing in training.',
                    proof: 'Technical Glass: 4% capacity increase'
                  },
                  {
                    question: 'What if a machine goes down?',
                    description:
                      'See which deliveries are at risk and identify alternate routings or workcenter reassignments to minimize impact.',
                    proof: 'Alternate workcenter support built-in'
                  },
                  {
                    question: 'What are the real costs?',
                    description:
                      'Every scenario shows actual manufacturing costs — labor, materials, overhead — so you can evaluate profitability before accepting work.',
                    proof: 'Turner Bicycles: cost visibility per scenario'
                  }
                ].map((useCase) => (
                  <div
                    key={useCase.question}
                    className="rounded-lg border bg-white p-6"
                  >
                    <h3 className="mb-2 text-lg font-semibold text-cyan-700">
                      &ldquo;{useCase.question}&rdquo;
                    </h3>
                    <p className="mb-3 text-sm leading-relaxed text-gray-600">
                      {useCase.description}
                    </p>
                    <p className="text-xs font-medium text-slate-500">
                      {useCase.proof}
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
                How RMDB What-If Analysis Works
              </h2>
              <p className="leading-relaxed text-gray-700">
                RMDB what-if analysis operates on your real production data —
                actual workcenters, real capacities, current open orders, and
                true material availability. Scenarios are not theoretical
                projections — they are fully scheduled plans that account for
                every constraint, delivering actionable answers in minutes.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Run scenarios on real production data — not theoretical models',
                  'See impact on existing commitments before accepting new orders',
                  'Compare workforce changes (add shifts, cross-train, outsource)',
                  'Evaluate capacity expansion ROI before investing',
                  'Identify bottlenecks and test solutions before implementing',
                  'Generate Gantt charts showing scenario outcomes',
                  'View manufacturing cost impacts per scenario',
                  'Test schedule changes without disrupting current production'
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

        {/* Testimonial */}
        <section className="bg-gradient-to-br from-slate-50 to-cyan-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Quote className="mx-auto mb-4 size-8 text-cyan-400" />
              <blockquote className="mb-4 text-lg italic leading-relaxed text-slate-700">
                &ldquo;The owner came back from a trade show in Japan with the
                biggest order in our history. When he asked me when we could
                deliver — I simply entered in the demand, scheduled it, and
                printed out a Gantt Chart schedule showing exactly when we could
                deliver the product and what our manufacturing costs would be.
                He was ecstatic.&rdquo;
              </blockquote>
              <p className="font-semibold text-slate-900">
                Mike Votaw, Production Manager
              </p>
              <p className="text-sm text-slate-500">Turner Suspension Bicycles</p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                What-If Analysis in Action
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Largest Order',
                    label:
                      'In company history — secured using what-if scenario planning',
                    company: 'Turner Bicycles'
                  },
                  {
                    metric: '4%',
                    label:
                      'Capacity increase discovered through cross-training scenario analysis',
                    company: 'Technical Glass Products'
                  },
                  {
                    metric: '2 Weeks',
                    label:
                      'Lead time reduction confirmed via what-if scenario testing',
                    company: 'Technical Glass Products'
                  },
                  {
                    metric: 'Easy',
                    label:
                      'To model different scenarios to determine schedule and bottom-line benefit',
                    company: 'ACE Controls'
                  }
                ].map((result) => (
                  <div
                    key={result.company + result.metric}
                    className="rounded-lg border bg-white p-6 text-center shadow-sm"
                  >
                    <p className="mb-2 text-2xl font-bold text-cyan-600">
                      {result.metric}
                    </p>
                    <p className="mb-2 text-sm text-gray-700">
                      {result.label}
                    </p>
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
        industryTags={['Job Shop', 'Consumer Goods', 'Electronics']}
        title="What-If Analysis Success Stories"
        subtitle="See how manufacturers used scenario planning to make better production decisions."
        limit={6}
      />

      <RelatedSolutions currentPath={Routes.WhatIfAnalysis} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Ready to stop guessing and start planning?
          </h2>
          <p className="mb-6 text-slate-600">
            See RMDB what-if analysis in action with your own production data.
            Test a scenario live during your free demo.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={Routes.Contact}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
            >
              Request a Free Demo
            </Link>
            <Link
              href="/resource-manager-db-2"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Explore RMDB Features
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
