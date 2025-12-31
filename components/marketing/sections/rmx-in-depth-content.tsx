'use client';

import * as React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export function RMXInDepthContent() {
  return (
    <div className="space-y-8">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-slate-900">
        RESOURCE MANAGER FOR EXCEL: IN DEPTH
      </h2>

      {/* Overview Section */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-bold  ">Overview</h3>
          <div className="space-y-4">
            <p className="leading-relaxed text-slate-700">
              Resource Manager is the only low-cost, planning and scheduling
              solution that works for all manufacturing enterprises. RM-X is an add-on
              to Excel (version 97 and greater) and is designed for single concurrent
              users who are familiar with Excel. A fully functional trial is available
              for immediate download.
            </p>
            <p className="leading-relaxed text-slate-700">
              Resource Manager-DB (RMDB) is an upgraded version written in Visual Basic,
              utilizing Microsoft Access with SQL Server compatibility, containing all
              RM-X functionality.
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
            alt="Resource Manager user illustration"
            width={400}
            height={300}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Works The Way You Do */}
      <div>
        <h3 className="mb-4 text-xl font-bold  ">Works The Way You Do</h3>
        <p className="leading-relaxed text-slate-700">
          Resource Manager is the only solution that is designed to adapt to your
          specific needs, addressing the key issues facing your operation.
        </p>
      </div>

      {/* Immediate, Guaranteed Benefits */}
      <div>
        <h3 className="mb-4 text-xl font-bold  ">Immediate, Guaranteed Benefits</h3>
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

      {/* Best of All */}
      <div>
        <h3 className="mb-4 text-xl font-bold  ">Best of All</h3>
        <p className="leading-relaxed text-slate-700">
          Resource Manager runs with Microsoft Office, so you are already familiar with entering
          data, printing reports, graphing, and more!
        </p>
      </div>

      {/* Features */}
      <div>
        <h3 className="mb-4 text-xl font-bold  ">Features</h3>
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

      {/* Fill'er Up */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-bold  ">Fill'er Up</h3>
          <p className="leading-relaxed text-slate-700">
            Resource Manager for Excel offers basic copy and paste for loading data, or form
            driven data entry.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-10/exdata.png"
            alt="Excel data entry interface"
            width={500}
            height={350}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Check the "MAP" */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-bold  ">Check the "MAP"</h3>
          <div className="space-y-4">
            <p className="leading-relaxed text-slate-700">
              Where do you need to go? Which orders need to be shipped when? Resource Manager
              features a simple, single, screen to control your whole operation.
            </p>
            <p className="leading-relaxed text-slate-700">
              Enter (or link with outside system), the quantities and due dates. Optionally
              add detailed customer or order information. Now schedule.
            </p>
            <p className="leading-relaxed text-slate-700">
              Only Resource Manager gives you quick and easy top level control for recognizing
              the immediate benefits of an integrated manufacturing system.
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
          <h3 className="mb-4 text-xl font-bold  ">Relax, Cruise Control is on</h3>
          <div className="space-y-4">
            <p className="leading-relaxed text-slate-700">
              That's it! You are in the driver's seat and cruise control is on. Enjoy the view.
              Check the production calendar for a quick view of finite – capacity loading on
              work centers and time-phased inventory levels. Bottlenecks are easy to spot by
              the red flags.
            </p>
            <p className="leading-relaxed text-slate-700">
              Need to correct a schedule? Quickly adjust working calendar, shift available
              resources, and click to reschedule. For effortless cruise control of your business,
              simply make the top level changes and regenerate the master schedule with a click
              of the mouse. Change delivery due dates, split up quantities, combine forward and
              reverse scheduling; all the options for a quick adjustment are under your immediate control.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-10/rmscreen2.jpg"
            alt="Screenshot of a resource management software interface"
            width={800}
            height={600}
            className="h-auto max-w-full rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Fine Tuning */}
      <div>
        <h3 className="mb-4 text-xl font-bold  ">Fine Tuning</h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Beyond the top-level cruise control, Resource Manager-DB allows the user to implement
          detailed execution plans at their own pace.
        </p>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {[
            'Prioritize job sequence',
            'Make inventory adjustments',
            'Track receipts',
            'Generate purchase orders',
            'Regenerate schedule with new priority',
            'Sequence any time',
            'Complete inventory management',
            'Feedback actual mfg. data',
            'Run adjusted net plan',
            'Instantly reconfigure and reschedule',
            'BOMs and Routings to reflect reality'
          ].map((item, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle2 className="mr-2 mt-1 size-4 shrink-0 text-green-500" />
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reporting Overview */}
      <div>
        <h3 className="mb-4 text-xl font-bold  ">Reporting Overview</h3>
        <div className="space-y-4">
          <p className="leading-relaxed text-slate-700">
            With quick, powerful, and intuitive reporting, Resource Manager-DB stands above
            the crowd in its ability to present the important data in an easy and meaningful way.
            In addition to the robust reports that are included with Resource Manager-DB, the user
            can easily configure canned, custom reports that become a permanent part of the system.
          </p>
          <p className="leading-relaxed text-slate-700">
            In addition, you can work with the schedule database directly and use all the power
            of Access and Excel to sort, graph, view, print and export, to meet your unique requirements.
          </p>
        </div>
      </div>

      {/* Gantt Report */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-2 text-lg font-semibold  ">Gantt Report</h4>
          <p className="text-slate-700">
            A great top-level view of all activity with details only a click away. Instantly check
            the due dates of all jobs in schedule, drill down to find bottlenecks, adjust capacity
            and schedule to meet critical dates.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-10/schdle.png"
            alt="Gantt chart spreadsheet showing production schedule"
            width={600}
            height={400}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Summary Report */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-2 text-lg font-semibold  ">Summary Report</h4>
          <p className="text-slate-700">
            The report will tell you what you need to buy or make, how much, and when – all
            consolidated on a single sheet. An instant, top level MRP Report for all products
            and workcenter loading. View over any time horizon – by day, week, or month.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-10/sumrpt.jpg"
            alt="Summary report with production data and graph"
            width={600}
            height={400}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Item Report */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-2 text-lg font-semibold  ">Item Report</h4>
          <p className="text-slate-700">
            This sheet summarizes all requirements per part number. Ideal for WorkCenter Loading,
            the system lists each job, when to start, when complete, and how much is required.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-10/item.jpg"
            alt="Item report showing workcenter production details"
            width={600}
            height={400}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Calendar Report */}
      <div>
        <h4 className="mb-2 text-lg font-semibold  ">Calendar Report</h4>
        <p className="text-slate-700">
          View and print the schedule in familiar 'wall calendar' format.
        </p>
      </div>

      {/* Workcenter Report */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-2 text-lg font-semibold  ">Workcenter Report</h4>
          <p className="text-slate-700">
            Instant, real-time views of all critical workcenter activity by: daily loading, backlog,
            % utilization, hours available and bottlenecks. Allows for quick overtime scheduling and
            other detailed adjustments for any workcenter on any day. Also features a daily workcenter
            'to-do' list.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-10/dailyhours.png"
            alt="Workcenter report showing daily hours and utilization"
            width={600}
            height={400}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Routing & Tree Report */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-2 text-lg font-semibold  ">Routing & Tree Report</h4>
          <p className="text-slate-700">
            Intuitive reports for visual bill-of-resource verification, process flow and schedule feedback.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-10/tree.jpg"
            alt="Flow chart diagram showing bill-of-resources"
            width={600}
            height={400}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Production Report */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-2 text-lg font-semibold  ">Production Report</h4>
          <p className="text-slate-700">
            Perfect for traveler or work order printout. Automatically reconciles inventory and capacity
            for a job and lists sequence of operations and products to fulfill order on time. Includes
            space for check off and actual feedback as well as job costing and variance reporting.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-10/prodrpt.jpg"
            alt="Production report with job cost analysis"
            width={600}
            height={400}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Purchasing & Receiving */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-bold  ">Purchasing & Receiving</h3>
          <div className="space-y-4">
            <p className="leading-relaxed text-slate-700">
              Resource Manager-DB excels with its integrated purchasing and receiving module. Designed
              to meet the tough requirements for Lean Manufacturing, you won't find any muda here.
              With a single click, the user can generate purchase orders per Kanban and/or standard
              schedule requirements.
            </p>
            <p className="leading-relaxed text-slate-700">
              The system tracks each received quantity, open or closed status, and adjusts inventory –
              simply and automatically. Automatically e-mail RFQs and POs to vendors.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-10/porpt.jpg"
            alt="Purchase orders table with status details"
            width={600}
            height={400}
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Special Services */}
      <div>
        <h3 className="mb-4 text-xl font-bold  ">Special Services & Partners</h3>
        <p className="leading-relaxed text-slate-700">
          User Solutions offers a variety of direct services to meet any special needs, including:
          automatic data integration with other systems, customized reports, on site training and
          configuration and much more. In addition, User Solutions has partnered with a number of
          complementary product and service companies to provide complete solutions focused on unique needs.
        </p>
      </div>
    </div>
  );
}
