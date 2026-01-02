import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function LimitPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: LIMIT
            </h1>
            <p className="text-gray-700">
              Control Limit Calculator
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-8">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Control Limit Calculator (LIMIT)
              </h2>
              <p className="leading-relaxed text-gray-700">
                LIMIT is a calculator for control limits in MR-CHART,
                P-CHART, and CU-CHART. All control limits are based on 3
                standard deviations. If you want different limits, edit the
                control limit formulas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
