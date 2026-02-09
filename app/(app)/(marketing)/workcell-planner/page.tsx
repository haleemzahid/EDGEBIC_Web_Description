import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Workcell Planner',
  description:
    'Capacity planning tool for determining machine and manpower requirements. Identify bottlenecks and optimize resource utilization.',
  path: '/workcell-planner',
  keywords: 'workcell planner, capacity planning, resource optimization, bottleneck analysis, manufacturing capacity'
});

export default function WorkcellPlannerPage() {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Workcell Planner
            </h1>
            <p className="text-gray-700">
              Capacity Planning and Resource Optimization
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-12">
            {/* Overview Section - Text Left, Image Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Overview</h2>
                <p className="leading-relaxed text-gray-700">
                  The objective of the model is to provide the master scheduler
                  or planning function with a tool for determining the overall
                  level of capacity and distribution of capacity required to
                  meet demand. This demand can be driven by a forecasted
                  incoming rate or consuming a backlog within a specified time
                  frame for a particular cell – as well as for overall plant
                  level.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/Edgebic/2022-09/WCP-Menu.png"
                  alt="Screenshot of Workcell Planner software with tables and data"
                  width={800}
                  height={600}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Functionality Section - Image Left, Text Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="order-2 flex justify-center md:order-1">
                <Image
                  src="/images/Edgebic/2022-09/WCP-Bar4.png"
                  alt="Bar chart showing shifts required for manufacturing processes"
                  width={800}
                  height={600}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  More specifically, the model:
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    Translates a forecast or backlog into machine and manpower
                    requirements for each resource in a cell and compares this
                    with the capacity given the current man machine
                    configuration.
                  </li>
                  <li>
                    Allows easy what if analysis of the interaction of setup
                    time, lot size, efficiency, operation yield, and work
                    practices such as working bottlenecks through breaks.
                  </li>
                  <li>
                    Allows analysis of flow with multiple setups per part vs.
                    batch and the payoff on throughput of set up reduction
                    results.
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottleneck Analysis Section - Text Left, Image Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Bottleneck & Resource Analysis
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    Clearly shows the bottleneck resource that limits cell
                    output dynamically as factors are changed.
                  </li>
                  <li>
                    Shows what can be expected from the existing man-machine
                    configuration and can be used to set expected cell output
                    rates, shift schedules and manning levels and easy
                    configuration.
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/Edgebic/2022-09/WCP-Bar5.png"
                  alt="Bar chart comparing current and required staffing levels"
                  width={800}
                  height={600}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
