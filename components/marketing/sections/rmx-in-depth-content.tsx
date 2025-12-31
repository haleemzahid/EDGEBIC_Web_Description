'use client';

import * as React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RMXInDepthContent() {
  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed text-slate-700">
            Resource Manager is the only low-cost, planning and scheduling
            solution that works for all manufacturing enterprises. RM-X is an add-on
            to Excel (version 97 and greater) and is designed for single concurrent
            users who are familiar with Excel. A fully functional trial is available
            for immediate download.
          </p>
          <p className="leading-relaxed text-slate-700">
            By combining ease-of-use for small to medium sized manufacturing operations
            with powerful reporting and open integration for larger operations, Resource
            Manager guarantees the power and productivity of high-end systems without
            the complications and failure rate.
          </p>
          <div className="flex justify-center py-4">
            <Image
              src="/images/Edgebic/2022-10/rmusman.gif"
              alt="Delivery worker pushing a hand truck with boxes"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
        </CardContent>
      </Card>

      {/* Works The Way You Do */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Works The Way You Do</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-slate-700">
            Resource Manager is the only solution that is designed to adapt to your
            specific needs, addressing the key issues facing your operation.
          </p>
        </CardContent>
      </Card>

      {/* Immediate, Guaranteed Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Immediate, Guaranteed Benefits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed text-slate-700">
            Resource Manager delivers the help you need to effectively plan and schedule
            your company's resources, without the time, money and upkeep of traditional options.
          </p>
          <p className="leading-relaxed text-slate-700">
            Finally, you can quit struggling with time consuming decisions such as what to buy,
            what to make, when to buy it, and when to make it.
          </p>
          <p className="leading-relaxed text-slate-700">
            Resource Manager adds powerful MRP scheduling, planning and/or tracking capabilities
            to your existing system (be it manual or other), for less than any other option –
            satisfaction guaranteed.
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              {[
                'Finite Planning & Scheduling',
                'MRP and Inventory Management',
                'Routings and Priority Scheduling',
                'Easy "what-if" analysis',
                'Purchasing and Receiving',
                'Forecasting'
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="mr-3 mt-1 size-5 shrink-0 text-green-500" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[
                'Costing and Estimating',
                'Integrates with ALL systems',
                'APS and Lean Manufacturing',
                'Ideal for Lean Manufacturing',
                'Run stand alone or networked',
                'Production Planning'
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="mr-3 mt-1 size-5 shrink-0 text-green-500" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Check the "MAP" */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Check the "MAP"</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center py-4">
            <Image
              src="/images/Edgebic/2022-10/usmap.gif"
              alt="Drawn treasure map with red X mark"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
          <p className="leading-relaxed text-slate-700">
            Where do you need to go? Which orders need to be shipped when? Resource Manager
            features a simple, single, screen to control your whole operation.
          </p>
          <p className="leading-relaxed text-slate-700">
            Enter (or link with outside system), the quantities and due dates. Optionally
            add detailed customer or order information. Now schedule.
          </p>
        </CardContent>
      </Card>

      {/* Relax, Cruise Control is on */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Relax, Cruise Control is on</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed text-slate-700">
            That's it! You are in the driver's seat and cruise control is on. Enjoy the view.
            Check the production calendar for a quick view of finite – capacity loading on
            work centers and time-phased inventory levels. Bottlenecks are easy to spot by
            the red flags.
          </p>
          <div className="flex justify-center py-4">
            <Image
              src="/images/Edgebic/2022-10/rmscreen2.jpg"
              alt="Screenshot of a resource management software interface"
              width={800}
              height={600}
              className="h-auto w-full max-w-3xl rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Reporting Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed text-slate-700">
            With quick, powerful, and intuitive reporting, Resource Manager stands above
            the crowd in its ability to present the important data in an easy and meaningful way.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-slate-900">Gantt Report</h4>
              <p className="text-sm text-slate-600">
                A great top-level view of all activity with details only a click away.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-slate-900">Summary Report</h4>
              <p className="text-sm text-slate-600">
                View what you need to buy or make, how much, and when – all consolidated.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-slate-900">Workcenter Report</h4>
              <p className="text-sm text-slate-600">
                Instant, real-time views of all critical workcenter activity.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-slate-900">Production Report</h4>
              <p className="text-sm text-slate-600">
                Perfect for traveler or work order printout with job costing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
