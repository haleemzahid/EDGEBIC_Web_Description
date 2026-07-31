'use client';

import Link from 'next/link';
import { Check, CircleCheck } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { Button } from '@/components/ui/button';
import { YouTubeFacade } from '@/components/ui/youtube-facade';

export function NTClipboardToolBox(): React.JSX.Element {
  return (
    <GridSection hideVerticalGridLines containerProps={{ className: 'px-0 sm:container' }}>
      <div>
        {/* Solutions for Every Business Size */}
        <div className="">
          {/* <div className="mb-6 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                From Job Shops to SMBs to Multi-Nationals
              </h2>
              <p className="text-xl text-muted-foreground">
                Solutions to fit any production scheduling application and
                budget
              </p>
            </div> */}

          <div className="mt-6 grid grid-cols-1 gap-4 px-2 sm:px-0 md:grid-cols-2 lg:gap-6 xl:grid-cols-4">
            {/* Excel Templates - Operations Manager */}
            <div className="flex flex-col">
              {/* Option Label above card */}
              <div className="mb-4 text-center">
                <span className="text-lg font-bold text-[#003d5c]">
                  DIY in Excel
                </span>
              </div>
              <div className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border bg-white shadow-lg transition-all hover:shadow-xl">
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative aspect-video bg-slate-100">
                    <img
                      src="/image.png"
                      alt="Resource Manager For Excel"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <div className="bg-slate-50 px-4 py-2 text-center">
                    <p className="text-sm font-bold italic text-slate-700">
                      Just Do It in Excel
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-4 ">
                    <span className="text-lg font-bold text-gray-900">
                      {' '}
                      Resource Manager For Excel{' '}
                    </span>
                    <span className="text-sm"> (RMX)</span>
                  </h3>

                  {/* Feature Description with Icon */}
                  <div className="mb-4 rounded-lg bg-blue-50 p-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <CircleCheck className="size-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-blue-900">
                        Entry-level production scheduling solution for creating
                        routing steps and scheduling according to capacity
                        limitations.
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Features BOR (Bill of Resources) for routings and
                        material
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">Finite Capacity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">Basic MRP/Inventory</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Leverages Excel (speed and 1,000,000 rows/tab)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Forward and/or Reverse Scheduling
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className="mb-4 w-full border-green-200 text-lg font-bold text-green-700 hover:bg-green-50"
                      asChild
                    >
                      <Link href="/resource-manager-for-excel-2">
                        View Details
                      </Link>
                    </Button>
                    {/* <div className="text-center text-3xl font-bold text-green-700">
                      $1K+
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Resource Manager DB */}
            <div className="flex flex-col">
              {/* Option Label above card */}
              <div className="mb-4 text-center">
                <span className="text-lg font-bold text-[#003d5c]">
                  APS Single User
                </span>
              </div>
              <div className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-lg transition-all hover:shadow-xl">
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative aspect-video bg-slate-100">
                    <img
                      src="/singleuser.png"
                      alt="Resource Manager DB"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <div className="bg-slate-50 px-4 py-2 text-center">
                    <p className="text-sm font-bold italic text-slate-700">
                      Single-User Source of Truth
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-4 ">
                    <span className="text-lg font-bold text-gray-900">
                      {' '}
                      Resource Manager DB{' '}
                    </span>
                    <span className="text-sm"> (RMDB)</span>
                  </h3>

                  {/* Feature Description with Icon */}
                  <div className="mb-4 rounded-lg bg-orange-50 p-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <CircleCheck className="size-5 text-orange-600" />
                      </div>
                      <p className="text-sm text-orange-900">
                        Advanced production planning and scheduling solution
                        that adapts to your existing data and workflows.
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Production Planning and Scheduling Your Way
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Includes everything in (RMX) plus
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Data Integration with other systems
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Advanced Planning and Scheduling Tools (APS)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Automatic Maintenance Options
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className="mb-4 w-full border-green-200 text-lg font-bold text-green-700 hover:bg-green-50"
                      asChild
                    >
                      <Link href="/resource-manager-db-2">View Details</Link>
                    </Button>
                    {/* <div className="text-center text-3xl font-bold text-green-700">
                      $3K+
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Premium - EDGEBI */}
            <div className="flex flex-col">
              {/* Option Label above card */}
              <div className="mb-4 text-center">
                <span className="text-lg font-bold text-[#003d5c]">
                  Multi User plus Graphical Interface
                </span>
              </div>
              <div className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border bg-white shadow-lg transition-all hover:shadow-xl">
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative aspect-video bg-slate-100">
                    <img
                      src="/multi user.png"
                      alt="EDGEBI"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <div className="bg-slate-50 px-4 py-2 text-center">
                    <p className="text-sm font-bold italic text-slate-700">
                      Intuitive and easy to use
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-4 ">
                    <span className="text-lg font-bold text-gray-900">
                      {' '}
                      EDGEBI{' '}
                    </span>
                    <span className="text-sm"> (Bundled w/ RMDB)</span>
                  </h3>

                  {/* Feature Description with Icon */}
                  <div className="mb-4 rounded-lg bg-purple-50 p-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <CircleCheck className="size-5 text-purple-600" />
                      </div>
                      <p className="text-sm text-purple-900">
                        Graphical overlay with business intelligence for
                        intuitive drag-and-drop schedule management.
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Easy, Graphical configuration
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Completely and easily customizable
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">Multi-User</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">Custom Dashboards\KPIs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Heat Maps, Utilization Calendars, and so much more
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className="mb-4 w-full border-green-200 text-lg font-bold text-green-700 hover:bg-green-50"
                      asChild
                    >
                      <Link href="/edgebi">View Details</Link>
                    </Button>
                    {/* <div className="text-center text-3xl font-bold text-green-700">
                      $10K+
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Platform - EDGEBIC. No product screenshot exists yet, so this
                card carries a branded panel rather than borrowing one of the
                other products' photographs. Swap in a real capture of the
                Planner or the optimizer comparator when one is available. */}
            <div className="flex flex-col">
              {/* Option Label above card */}
              <div className="mb-4 text-center">
                <span className="text-lg font-bold text-[#003d5c]">
                  Optimized, Plant Wide
                </span>
              </div>
              <div className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border-2 border-cyan-500 bg-white shadow-lg transition-all hover:shadow-xl">
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative flex aspect-video items-center justify-center bg-slate-900">
                    <div className="px-4 text-center">
                      <p className="text-2xl font-bold tracking-tight text-white">
                        EDGEBIC
                      </p>
                      <p className="mt-1 text-xs font-medium text-cyan-400">
                        The next generation
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-4 py-2 text-center">
                    <p className="text-sm font-bold italic text-slate-700">
                      The whole plant, one live plan
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-4 ">
                    <span className="text-lg font-bold text-gray-900">
                      {' '}
                      EDGEBIC{' '}
                    </span>
                    <span className="text-sm"> (APS Platform)</span>
                  </h3>

                  {/* Feature Description with Icon */}
                  <div className="mb-4 rounded-lg bg-cyan-50 p-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <CircleCheck className="size-5 text-cyan-600" />
                      </div>
                      <p className="text-sm text-cyan-900">
                        The same finite capacity engine, rebuilt as one platform
                        with optimization and a plan every workstation shares.
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Schedule optimization, never worse than your current
                        plan
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Multi-shift capacity, holidays and downtime
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Planner view: jobs and machines on one screen
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        One live plan across every workstation
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">
                        Includes everything in (RMDB) plus
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className="mb-4 w-full border-green-200 text-lg font-bold text-green-700 hover:bg-green-50"
                      asChild
                    >
                      <Link href="/edgebic">View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          {/* <div className="mt-6 text-center">
                            <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-8">
                                <h3 className="mb-4 text-2xl font-bold">
                                    Start Growing with User Solutions
                                </h3>
                                <p className="mb-6 text-lg text-muted-foreground">
                                    Production Planning and Scheduling Solutions for every
                                    business size and budget
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {/* <Button>
                                        <Link href="/product-2">See Feature List</Link>
                                    </Button> */}
          {/* <Button variant="outline">
                                        <Link href="/contact-us">Schedule Demo</Link>
                                    </Button> */}
          {/* </div>
                </div>
            </div> */}
        </div>
      </div>
    </GridSection>
  );
}
