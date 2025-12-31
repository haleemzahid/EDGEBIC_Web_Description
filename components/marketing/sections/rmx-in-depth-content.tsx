'use client';

import Image from 'next/image';

export function RMXInDepthContent() {
  return (
    <div className="space-y-12">
      {/* Overview Section */}
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Overview</h2>
          <p className="mb-4 text-slate-600">
            Resource Manager is the only low-cost, planning and scheduling
            solution that works for all manufacturing enterprises. RM-X is an add-on
            to Excel (version 97 and greater) and is designed for single concurrent
            users who are familiar with Excel. A fully functional trial is available
            for immediate download.
          </p>
          <p className="mb-4 text-slate-600">
            Resource Manager-DB (RMDB) is an upgraded version written in Visual Basic,
            utilizing Microsoft Access with SQL Server compatibility, containing all
            RM-X functionality.
          </p>
          <p className="text-slate-600">
            By combining ease-of-use for small to medium sized manufacturing operations
            with powerful reporting and open integration for larger operations, Resource
            Manager guarantees the power and productivity of high-end systems without
            the complications and failure rate.
          </p>
        </div>
        <div>
          <Image
            src="/images/Edgebic/2022-10/rmusman.gif"
            alt="Resource Manager user illustration"
            width={400}
            height={300}
            className="w-full rounded-lg"
            loading="lazy"
            unoptimized
          />
        </div>
      </div>

      {/* Works The Way You Do Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Works The Way You Do</h2>
        <p className="text-slate-600">
          Resource Manager is the only solution that is designed to adapt to your
          specific needs, addressing the key issues facing your operation.
        </p>
      </div>

      {/* Immediate, Guaranteed Benefits Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Immediate, Guaranteed Benefits</h2>
        <p className="mb-4 text-slate-600">
          Resource Manager delivers the help you need to effectively plan and schedule
          your company&apos;s resources, without the time, money and upkeep of traditional options.
        </p>
        <p className="mb-4 text-slate-600">
          Finally, you can quit struggling with time consuming decisions such as what to buy,
          what to make, when to buy it, and when to make it.
        </p>
        <p className="text-slate-600">
          Resource Manager adds powerful MRP scheduling, planning and/or tracking capabilities
          to your existing system (be it manual or other), for less than any other option –
          satisfaction guaranteed.
        </p>
      </div>

      {/* Best of All Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Best of All</h2>
        <p className="text-slate-600">
          Resource Manager runs with Microsoft Office, so you are already familiar with entering
          data, printing reports, graphing, and more!
        </p>
      </div>

      {/* Features Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Features</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Finite Planning & Scheduling</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• MRP and Inventory Management</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Routings and Priority Scheduling</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Easy &quot;what-if&quot; analysis</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Purchasing and Receiving</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Forecasting</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Costing and Estimating</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Integrates with ALL systems</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• APS and Lean Manufacturing</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Ideal for Lean Manufacturing</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Run stand alone or networked</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Production Planning</span>
          </div>
        </div>
      </div>

      {/* Fill'er Up Section */}
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Fill&apos;er Up</h2>
          <p className="text-slate-600">
            Resource Manager for Excel offers basic copy and paste for loading data, or form
            driven data entry.
          </p>
        </div>
        <div>
          <Image
            src="/images/Edgebic/2022-10/exdata.png"
            alt="Excel data entry interface"
            width={500}
            height={350}
            className="w-full rounded-lg shadow-md"
            loading="lazy"
            quality={80}
          />
        </div>
      </div>

      {/* Check the MAP Section */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">Check the &quot;MAP&quot;</h2>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="flex justify-center">
            <Image
              src="/images/Edgebic/2022-10/usmap.gif"
              alt="Treasure Map illustration"
              width={300}
              height={200}
              className="max-w-xs"
              loading="lazy"
              unoptimized
            />
          </div>
          <div>
            <p className="mb-4 text-slate-600">
              Where do you need to go? Which orders need to be shipped when? Resource Manager
              features a simple, single, screen to control your whole operation.
            </p>
            <p className="mb-4 text-slate-600">
              Enter (or link with outside system), the quantities and due dates. Optionally
              add detailed customer or order information. Now schedule.
            </p>
            <p className="text-slate-600">
              Only Resource Manager gives you quick and easy top level control for recognizing
              the immediate benefits of an integrated manufacturing system.
            </p>
          </div>
        </div>
      </div>

      {/* Relax, Cruise Control is on Section */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">Relax, Cruise Control is on</h2>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="mb-4 text-slate-600">
              That&apos;s it! You are in the driver&apos;s seat and cruise control is on. Enjoy the view.
              Check the production calendar for a quick view of finite – capacity loading on
              work centers and time-phased inventory levels. Bottlenecks are easy to spot by
              the red flags.
            </p>
            <p className="text-slate-600">
              Need to correct a schedule? Quickly adjust working calendar, shift available
              resources, and click to reschedule. For effortless cruise control of your business,
              simply make the top level changes and regenerate the master schedule with a click
              of the mouse. Change delivery due dates, split up quantities, combine forward and
              reverse scheduling; all the options for a quick adjustment are under your immediate control.
            </p>
          </div>
          <div>
            <Image
              src="/images/Edgebic/2022-10/rmscreen2.jpg"
              alt="Screenshot of a resource management software interface"
              width={800}
              height={600}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>
      </div>

      {/* Fine Tuning Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Fine Tuning</h2>
        <p className="mb-6 text-slate-600">
          Beyond the top-level cruise control, Resource Manager-DB allows the user to implement
          detailed execution plans at their own pace.
        </p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Prioritize job sequence</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Make inventory adjustments</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Track receipts</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Generate purchase orders</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Regenerate schedule with new priority</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Sequence any time</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Complete inventory management</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Feedback actual mfg. data</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Run adjusted net plan</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Instantly reconfigure and reschedule</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• BOMs and Routings to reflect reality</span>
          </div>
        </div>
      </div>

      {/* Reporting Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Powerful Reporting</h2>
        <p className="mb-8 text-slate-600">
          With quick, powerful, and intuitive reporting, Resource Manager-DB stands above
          the crowd in its ability to present the important data in an easy and meaningful way.
          In addition to the robust reports that are included with Resource Manager-DB, the user
          can easily configure canned, custom reports that become a permanent part of the system.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Gantt Report */}
          <div>
            <Image
              src="/images/Edgebic/2022-10/schdle.png"
              alt="Gantt Report"
              width={400}
              height={300}
              className="mb-3 w-full rounded-lg"
              loading="lazy"
              quality={80}
            />
            <h3 className="mb-2 text-lg font-bold">Gantt Report</h3>
            <p className="text-slate-600">
              A great top-level view of all activity with details only a click away. Instantly check
              the due dates of all jobs in schedule, drill down to find bottlenecks, adjust capacity
              and schedule to meet critical dates.
            </p>
          </div>

          {/* Summary Report */}
          <div>
            <Image
              src="/images/Edgebic/2022-10/sumrpt.jpg"
              alt="Summary Report"
              width={400}
              height={300}
              className="mb-3 w-full rounded-lg"
              loading="lazy"
              quality={80}
            />
            <h3 className="mb-2 text-lg font-bold">Summary Report</h3>
            <p className="text-slate-600">
              The report will tell you what you need to buy or make, how much, and when – all
              consolidated on a single sheet. An instant, top level MRP Report for all products
              and workcenter loading. View over any time horizon – by day, week, or month.
            </p>
          </div>

          {/* Item Report */}
          <div>
            <Image
              src="/images/Edgebic/2022-10/item.jpg"
              alt="Item Report"
              width={400}
              height={300}
              className="mb-3 w-full rounded-lg"
              loading="lazy"
              quality={80}
            />
            <h3 className="mb-2 text-lg font-bold">Item Report</h3>
            <p className="text-slate-600">
              This sheet summarizes all requirements per part number. Ideal for WorkCenter Loading,
              the system lists each job, when to start, when complete, and how much is required.
            </p>
          </div>

          {/* Calendar Report */}
          <div>
            <Image
              src="/images/Edgebic/2022-10/holidays.png"
              alt="Calendar Report"
              width={400}
              height={300}
              className="mb-3 w-full rounded-lg"
              loading="lazy"
              quality={80}
            />
            <h3 className="mb-2 text-lg font-bold">Calendar Report</h3>
            <p className="text-slate-600">
              View and print the schedule in familiar &quot;wall calendar&quot; format.
            </p>
          </div>

          {/* Workcenter Report */}
          <div>
            <Image
              src="/images/Edgebic/2022-10/dailyhours.png"
              alt="Workcenter Report"
              width={400}
              height={300}
              className="mb-3 w-full rounded-lg"
              loading="lazy"
              quality={80}
            />
            <h3 className="mb-2 text-lg font-bold">Workcenter Report</h3>
            <p className="text-slate-600">
              Instant, real-time views of all critical workcenter activity by: daily loading, backlog,
              % utilization, hours available and bottlenecks. Allows for quick overtime scheduling and
              other detailed adjustments for any workcenter on any day. Also features a daily workcenter
              &quot;to-do&quot; list.
            </p>
          </div>

          {/* Routing & Tree Report */}
          <div>
            <Image
              src="/images/Edgebic/2022-10/tree.jpg"
              alt="Routing & Tree Report"
              width={400}
              height={300}
              className="mb-3 w-full rounded-lg"
              loading="lazy"
              quality={80}
            />
            <h3 className="mb-2 text-lg font-bold">Routing & Tree Report</h3>
            <p className="text-slate-600">
              Intuitive reports for visual bill-of-resource verification, process flow and schedule feedback.
            </p>
          </div>

          {/* Production Report */}
          <div>
            <Image
              src="/images/Edgebic/2022-10/prodrpt.jpg"
              alt="Production Report"
              width={400}
              height={300}
              className="mb-3 w-full rounded-lg"
              loading="lazy"
              quality={80}
            />
            <h3 className="mb-2 text-lg font-bold">Production Report</h3>
            <p className="text-slate-600">
              Perfect for traveler or work order printout. Automatically reconciles inventory and capacity
              for a job and lists sequence of operations and products to fulfill order on time. Includes
              space for check off and actual feedback as well as job costing and variance reporting.
            </p>
          </div>

          {/* Purchasing & Receiving */}
          <div>
            <Image
              src="/images/Edgebic/2022-10/porpt.jpg"
              alt="Purchasing & Receiving Report"
              width={400}
              height={300}
              className="mb-3 w-full rounded-lg"
              loading="lazy"
              quality={80}
            />
            <h3 className="mb-2 text-lg font-bold">Purchasing & Receiving</h3>
            <p className="text-slate-600">
              Resource Manager-DB excels with its integrated purchasing and receiving module. Designed
              to meet the tough requirements for Lean Manufacturing. Generate purchase orders via Kanban
              or standard requirements with one click. Track received quantities, open/closed status,
              and adjust inventory automatically. Auto-email RFQs and POs to vendors.
            </p>
          </div>
        </div>
      </div>

      {/* Special Services & Partners Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Special Services & Partners</h2>
        <p className="text-slate-600">
          User Solutions offers a variety of direct services to meet any special needs,
          including: automatic data integration with other systems, customized reports,
          on site training and configuration and much more. In addition, User Solutions
          has partnered with a number of complementary product and service companies to
          provide complete solutions focused on unique needs.
        </p>
      </div>
    </div>
  );
}
