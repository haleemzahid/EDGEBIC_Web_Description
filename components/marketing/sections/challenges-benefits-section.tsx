'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [willDoExpanded, setWillDoExpanded] = useState(false);
  const [wontDoExpanded, setWontDoExpanded] = useState(false);

  return (
    <section className='pt-2'>
      <div className="m">
        <div className="flex justify-end">
          {/* What we WILL do / WON'T do side by side */}
          <div className={`flex items-start gap-3 transition-all duration-300 ${willDoExpanded || wontDoExpanded ? 'w-[70%]' : 'w-[50%]'}`}>
            {/* What we WILL do */}
            <div className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(30,58,95,0.15)] transition-all duration-300 flex-1`}>
              <button
                type="button"
                onClick={() => setWillDoExpanded(!willDoExpanded)}
                className="flex w-full items-center justify-between p-2 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-green-100">
                    <Check className="size-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">What we WILL do</h3>
                </div>
                {willDoExpanded ? (
                  <ChevronUp className="size-5 text-[#1e3a5f]" />
                ) : (
                  <ChevronDown className="size-5 text-[#1e3a5f]" />
                )}
              </button>
              <AnimatePresence>
                {willDoExpanded && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-3 px-5 pb-5 text-md text-gray-600 overflow-hidden"
                  >
                    {willDoItems.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex gap-3"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* What we WON'T do */}
            <div className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(30,58,95,0.15)] transition-all duration-300 flex-1`}>
              <button
                type="button"
                onClick={() => setWontDoExpanded(!wontDoExpanded)}
                className="flex w-full items-center justify-between p-2 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-red-100">
                    <X className="size-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">What we WON&apos;T do</h3>
                </div>
                {wontDoExpanded ? (
                  <ChevronUp className="size-5 text-[#1e3a5f]" />
                ) : (
                  <ChevronDown className="size-5 text-[#1e3a5f]" />
                )}
              </button>
              <AnimatePresence>
                {wontDoExpanded && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-3 px-5 pb-5 text-md text-gray-600 overflow-hidden"
                  >
                    {wontDoItems.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex gap-3"
                      >
                        <X className="mt-0.5 size-4 shrink-0 text-red-500" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
