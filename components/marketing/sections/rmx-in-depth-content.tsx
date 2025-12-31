'use client';

import * as React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export function RMXInDepthContent() {
  return (
    <div className="space-y-8">
      {/* Overview Section */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Overview</h2>
          <div className="space-y-4">
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
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-10/rmusman.gif"
            alt="Delivery worker pushing a hand truck with boxes"
            width={400}
            height={300}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Works The Way You Do */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Works The Way You Do</h2>
        <p className="leading-relaxed text-slate-700">
          Resource Manager is the only solution that is designed to adapt to your
          specific needs, addressing the key issues facing your operation.
        </p>
      </div>

      {/* Immediate, Guaranteed Benefits */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Immediate, Guaranteed Benefits</h2>
        <div className="space-y-4">
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
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Features</h2>
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
      </div>

      {/* Check the "MAP" */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Check the "MAP"</h2>
          <div className="space-y-4">
            <p className="leading-relaxed text-slate-700">
              Where do you need to go? Which orders need to be shipped when? Resource Manager
              features a simple, single, screen to control your whole operation.
            </p>
            <p className="leading-relaxed text-slate-700">
              Enter (or link with outside system), the quantities and due dates. Optionally
              add detailed customer or order information. Now schedule.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-10/usmap.gif"
            alt="Drawn treasure map with red X mark"
            width={400}
            height={300}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Relax, Cruise Control is on */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Relax, Cruise Control is on</h2>
          <p className="leading-relaxed text-slate-700">
            That's it! You are in the driver's seat and cruise control is on. Enjoy the view.
            Check the production calendar for a quick view of finite – capacity loading on
            work centers and time-phased inventory levels. Bottlenecks are easy to spot by
            the red flags.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-10/rmscreen2.jpg"
            alt="Screenshot of a resource management software interface"
            width={800}
            height={600}
            className="h-auto max-w-full rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      </div>

      {/* Reports Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Reporting Overview</h2>
        <div className="space-y-4">
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
        </div>
      </div>
    </div>
  );
}
