'use client';

import * as React from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

export function WhatWeDoSection(): React.JSX.Element {
  const [isWillDoExpanded, setIsWillDoExpanded] = React.useState(false);
  const [isWontDoExpanded, setIsWontDoExpanded] = React.useState(false);

  return (
    <section className="pt-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start gap-6">
          {/* What we WILL do Card */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <button
              type="button"
              onClick={() => setIsWillDoExpanded(!isWillDoExpanded)}
              className="flex w-full items-center justify-between px-5 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-green-100">
                  <Check className="size-5 text-green-600" />
                </div>
                <span className="text-lg font-semibold text-gray-900">What we WILL do</span>
              </div>
              <ChevronDown
                className={`size-5 text-gray-400 transition-transform duration-300 ${isWillDoExpanded ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${isWillDoExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                <ul className="space-y-3 text-md text-gray-600">
                  <li className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                    <span>Be honest and respectful towards you, your team, your company, and your challenges.</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                    <span>Adapt software to solve your most pressing issues, as quick and easy as possible.</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                    <span>Offer a no-risk trial with Implementation support included.</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                    <span>Draft a custom help &quot;cheat sheet&quot; to fully document your application.</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                    <span>Help you design a scheduling approach that improves customer service and optimizes operations.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* What we WON'T do Card */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <button
              type="button"
              onClick={() => setIsWontDoExpanded(!isWontDoExpanded)}
              className="flex w-full items-center justify-between px-5 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-100">
                  <X className="size-5 text-red-600" />
                </div>
                <span className="text-lg font-semibold text-gray-900">What we WON&apos;T do</span>
              </div>
              <ChevronDown
                className={`size-5 text-gray-400 transition-transform duration-300 ${isWontDoExpanded ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${isWontDoExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                <ul className="space-y-3 text-md text-gray-600">
                  <li className="flex gap-3">
                    <X className="mt-0.5 size-4 shrink-0 text-red-500" />
                    <span>Pound you with emails and phone calls to buy our software.</span>
                  </li>
                  <li className="flex gap-3">
                    <X className="mt-0.5 size-4 shrink-0 text-red-500" />
                    <span>Share ANY of your information or data with anyone, at anytime, for any reason.</span>
                  </li>
                  <li className="flex gap-3">
                    <X className="mt-0.5 size-4 shrink-0 text-red-500" />
                    <span>Expect compensation before we prove out solution.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
