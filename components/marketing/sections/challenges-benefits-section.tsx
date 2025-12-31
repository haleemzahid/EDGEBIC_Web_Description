'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

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

export function ChallengesBenefitsSection(): React.JSX.Element {
  return (
    <section className="pt-6">
      <div className="mx-auto max-w-7xl">
        {/* Challenges */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Solving Challenges and Reaping Benefits
          </h3>
          <ul className="grid gap-2 md:grid-cols-2">
            {challenges.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-md text-gray-700">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-green-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
