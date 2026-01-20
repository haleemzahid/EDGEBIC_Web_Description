import * as React from 'react';
import Link from 'next/link';
import { CheckIcon, StarIcon } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function NTClipboardSummary(): React.JSX.Element {
  return (
    <GridSection hideVerticalGridLines>
      {/* Summary Section */}
      <div className="container py-6">
        {/* Problem & Solution Grid */}
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 grid gap-8 md:grid-cols-2">
            {/* Problems */}
            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6">
              <h3 className="mb-6 text-2xl font-bold text-red-800">
                Common Production Planning Struggles
              </h3>
              <div className="space-y-4">
                {[
                  'ERP systems that create tangled Excel report chaos',
                  'Messy whiteboards that nobody can decipher',
                  'Late shipments causing customer complaints',
                  'No ERP system and struggling with basic scheduling',
                  "Complex routings that your current system can't handle",
                  'Multiple constraints (labor, machines, materials) ignored'
                ].map((problem, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 size-2 shrink-0 rounded-full bg-red-500" />
                    <span className="text-red-700">{problem}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div className="rounded-2xl border border-green-200 bg-green-50/50 p-6">
              <h3 className="mb-6 text-2xl font-bold text-green-800">
                EDGEBI Resource Manager-DB (RMDB) Delivers
              </h3>
              <div className="space-y-4">
                {[
                  'Adapts to YOUR existing data and workflow instantly',
                  'Configure and reconfigure on-the-fly as needs change',
                  'Focus on your most pressing issues for immediate ROI',
                  'Advanced drag-and-drop graphical calendar screens',
                  'Handle alternate workcenters & complex routings',
                  'Manage multiple constraints: labor, machines, materials'
                ].map((solution, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500">
                      <CheckIcon className="size-3 text-white" />
                    </div>
                    <span className="text-green-700">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className=" rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 p-8 md:p-6">
            <h3 className="mb-6 text-center text-3xl font-bold">
              Deep Functionality for Every Production Challenge
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-orange-100">
                  <div className="size-8 rounded bg-gradient-to-r from-orange-500 to-red-500" />
                </div>
                <h4 className="mb-2 font-semibold">Flexible Scheduling</h4>
                <p className="text-sm text-muted-foreground">
                  Discrete and batch processing, complex routings, alternate
                  workcenters, and sub-assemblies
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-orange-100">
                  <div className="size-8 rounded bg-gradient-to-r from-orange-500 to-red-500" />
                </div>
                <h4 className="mb-2 font-semibold">Smart Optimization</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced optimization algorithms, downtime management, and
                  capacity planning
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-orange-100">
                  <div className="size-8 rounded bg-gradient-to-r from-orange-500 to-red-500" />
                </div>
                <h4 className="mb-2 font-semibold">Easy Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Works with your existing data in its current form - no complex
                  migration required
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                asChild
              >
                <Link href="/product-2">See Feature List</Link>
              </Button>
            </div>
          </div>

          {/* Unique Value Proposition */}
          {/* <div className="text-center">
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                What Makes EDGEBI Truly Unique
              </h3>
              <p className="mb-6 text-lg opacity-90">
                We focus on resolving your most pressing issues quickly, letting
                you reap immediate ROI. Then we delve deeper without requiring
                additional investment.
              </p>
              <p className="text-lg font-medium">
                This proven approach succeeds where so many others fail.
              </p>
            </div>
          </div> */}

          {/* 
          Risk-Free Demo CTA 
          <div className="text-center">
            <div className="mx-auto max-w-2xl rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50/50 p-8">
              <h3 className="mb-4 text-2xl font-bold text-orange-800">
                See EDGEBI in Action - Risk Free!
              </h3>
              <p className="mb-6 text-orange-700">
                Schedule a live demo using your actual data in its current form.
                No preparation required, no risk involved.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 text-lg font-semibold text-white hover:from-orange-600 hover:to-red-600"
              >
                Schedule Your Risk-Free Demo
              </Button>
            </div>
          </div>
          */}
        </div>
      </div>
    </GridSection>
  );
}
