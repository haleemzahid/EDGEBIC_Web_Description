import * as React from 'react';
import { Check, X } from 'lucide-react';

export function WhatWeDoSection(): React.JSX.Element {
  return (
    <section>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2">
          {/* What we WILL do Card */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-green-100">
                <Check className="size-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">What we WILL do</h3>
            </div>
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

          {/* What we WON'T do Card */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-100">
                  <X className="size-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">What we WON&apos;T do</h3>
              </div>
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

            {/* Solution Approach Card */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Solution Approach</h3>
              <p className="text-md text-gray-700">Preventive Maintenance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
