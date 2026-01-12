'use client';

import Link from 'next/link';
import { Check, CircleCheck } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { Button } from '@/components/ui/button';
import { YouTubeFacade } from '@/components/ui/youtube-facade';

export function NTClipboardToolBox(): React.JSX.Element {
  return (
    <GridSection hideVerticalGridLines>
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

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {/* Excel Templates - Operations Manager */}
            <div className="flex flex-col">
              {/* Option Label above card */}
              <div className="mb-4 text-center">
                <span className="text-lg font-bold text-[#003d5c]">
                  DIY in Excel
                </span>
              </div>
              <div className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border bg-white shadow-lg transition-all hover:shadow-xl">

                {/* Video Section */}
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative aspect-video bg-slate-100">
                    <YouTubeFacade
                      videoId="DRWDNVq31l4"
                      title="Operations Manager Excel Templates"
                      className="absolute inset-0 size-full"
                      hidePlayButton
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    Resource Manager For Excel
                  </h3>

                  {/* Feature Description with Icon */}
                  <div className="mb-4 rounded-lg bg-blue-50 p-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <CircleCheck className="size-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-blue-900">
                        Entry-level production scheduling solution for creating routing steps and scheduling according to capacity limitations
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">Shop Scheduling Made easy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">DIY</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">Finite Capacity</span>
                    </div> */}
                    {/* <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">No Risk Trials</span>
                    </div> */}
                    {/* <div className="ml-6 text-sm text-gray-500">
                      Implementation support included!
                    </div> */}
                  </div>

                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className="mb-4 w-full border-green-200 text-green-700 hover:bg-green-50"
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

                {/* Video Section */}
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative aspect-video bg-slate-100">
                    <YouTubeFacade
                      videoId="kn92TIHhbm8"
                      title="Resource Manager DB"
                      className="absolute inset-0 size-full"
                      hidePlayButton
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    Resource Manager DB
                  </h3>

                  {/* Feature Description with Icon */}
                  <div className="mb-4 rounded-lg bg-orange-50 p-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <CircleCheck className="size-5 text-orange-600" />
                      </div>
                      <p className="text-sm text-orange-900">
                        Advanced production planning and scheduling solution that adapts to your existing data and workflows
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">Production Planning and Scheduling Your Way</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">Include RMX+</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">Single User</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">APS</span>
                    </div>
                    {/* <div className="ml-6 text-sm text-gray-500">
                      Implementation support included!
                    </div> */}
                  </div>

                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className="mb-4 w-full border-green-200 text-green-700 hover:bg-green-50"
                      asChild
                    >
                      <Link
                        href="/resource-manager-db-2"
                        target="_blank"
                      >
                        View Details
                      </Link>
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
                {/* Video Section */}
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative aspect-video bg-slate-100">
                    <YouTubeFacade
                      videoId="_0LjI9MY8zo"
                      title="EDGEBI Demo"
                      className="absolute inset-0 size-full"
                      hidePlayButton
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    EDGEBI <span className="text-sm font-normal text-gray-500">(Bundled w/ RMDB)</span>
                  </h3>

                  {/* Feature Description with Icon */}
                  <div className="mb-4 rounded-lg bg-purple-50 p-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <CircleCheck className="size-5 text-purple-600" />
                      </div>
                      <p className="text-sm text-purple-900">
                        Graphical overlay with business intelligence for intuitive drag-and-drop schedule management
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">Enhanced,</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">Drag-and-drop,</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">configured for you, graphical - multi user</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">Includes alt RMDB</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      <span className="text-sm">No Risk Trials</span>
                    </div> */}
                    {/* <div className="ml-6 text-sm text-gray-500">
                      Implementation support included!
                    </div> */}
                  </div>

                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className="mb-4 w-full border-green-200 text-green-700 hover:bg-green-50"
                      asChild
                    >
                      <Link
                        href="/edgebi"
                      >
                        View Details
                      </Link>
                    </Button>
                    {/* <div className="text-center text-3xl font-bold text-green-700">
                      $10K+
                    </div> */}
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
