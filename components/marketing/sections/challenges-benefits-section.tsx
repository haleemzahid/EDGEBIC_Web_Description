'use client';

import * as React from 'react';

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
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column - Challenges */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Solving Challenges and Reaping Benefits
            </h3>
            <ul className="space-y-2">
              {challenges.map((item, index) => (
                <li key={index} className="text-md text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Solutions */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Solution Approach
            </h3>
            <p className="text-md text-gray-700">Prentitave Maintainence</p>
          </div>
        </div>
      </div>
    </section>
  );
}
