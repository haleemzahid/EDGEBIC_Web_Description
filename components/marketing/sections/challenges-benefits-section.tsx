'use client';

import * as React from 'react';
import { Check, X } from 'lucide-react';

const challenges = [
  'Generate accurate, dynamic customer lead times and meet them.',
  'Optimize workcenter and labor efficiencies',
  'Customized KPIs',
  'Capture expertise before retirement',
  'Method to educate and model different ERP configuration parameters - quickly and affordability. BEFORE you commit to $$$$ERP.',
  'Manufacturing Process Consistency',
  'Quick to Implement',
  'Replace and automate difficult Excel Band Aid Attempts',
  'Easy - even Auto Maintainence',
  'Minimize Inventory Carrying Costs',
  'What if Analysis to consider adding - or even deleting workcenters, labor, even plants to balance demand vs capacity.',
  'Other Applications'
];

const willDoItems = [
  'Be honest and respectful towards you, your team, your company, and your challenges.',
  'Adapt software to solve your most pressing issues, as quick and easy as possible.',
  'Offer a no-risk trial with Implementation support included.',
  'Draft a custom help "cheat sheet" to fully document your application.',
  'Help you design a scheduling approach that improves customer service and optimizes operations.'
];

const wontDoItems = [
  'Pound you with emails and phone calls to buy our software.',
  'Share ANY of your information or data with anyone, at anytime, for any reason.',
  'Expect compensation before we prove out solution.'
];

export function ChallengesBenefitsSection(): React.JSX.Element {
  return (
    <section className="pt-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Solving Challenges and Reaping Benefits */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Solving Challenges and Reaping Benefits
            </h3>
            <ul className="space-y-2">
              {challenges.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-md text-gray-700">
                  <Check className="mt-1 size-4 shrink-0 text-green-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - What we WILL do / WON'T do stacked */}
          <div className="flex flex-col gap-6">
            {/* What we WILL do */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-green-100">
                  <Check className="size-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">What we WILL do</h3>
              </div>
              <ul className="space-y-3 text-md text-gray-600">
                {willDoItems.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What we WON'T do */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-100">
                  <X className="size-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">What we WON&apos;T do</h3>
              </div>
              <ul className="space-y-3 text-md text-gray-600">
                {wontDoItems.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <X className="mt-0.5 size-4 shrink-0 text-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
