import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResourceManagerExcelInDepthPage() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Resource Manager for Excel: In Depth
            </h1>
            <p className="text-xl text-white/90">
              Comprehensive Production Planning & Scheduling Solution
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap justify-center gap-4 py-4">
              <Link
                href="/workcenter-schedulerxl"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
              >
                Summary
              </Link>
              <Link
                href="/resource-manager-for-excel-in-depth"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
              >
                In Depth
              </Link>
              <Link
                href="/workcenter-scheduler-xl-in-depth"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
              >
                Videos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 leading-relaxed">
                <p>
                  Resource Manager is the only low-cost, planning and scheduling
                  solution that works for all manufacturing enterprises. There
                  are two versions available, depending on your needs:
                </p>

                <p className="font-semibold">
                  Resource Manager for Excel (RM-X)
                </p>

                <p>
                  RM-X is an add-on to Excel (version 97 and greater) and is
                  designed for single concurrent users who are familiar with
                  Excel. A fully functional trial is available for immediate
                  download.
                </p>

                <p>
                  By combining ease-of-use for small to medium sized
                  manufacturing operations with powerful reporting and open
                  integration for larger operations, Resource Manager guarantees
                  the power and productivity of high-end systems without the
                  complications and failure rate.
                </p>

                <p>
                  Also, Resource Manager -DB (RMDB), an elegant upgrade from
                  RMX, written in Visual Basic, utilizes and includes a run-time
                  version of Microsoft Access database and is also available
                  with SQL Server compatibility. Resource Manager DB (RMDB)
                  contains all the functionality of RM-X. Just like RM-X,
                  Resource Manager DB leverages Excel for reporting.
                </p>

                <p>
                  These combined offerings provide you unsurpassed flexibility
                  for leveraging Excel on local PCs, and sharing data across a
                  network. Finally, you can achieve your goals of an affordable
                  planning and scheduling solution that quickly adapts to your
                  needs.
                </p>

                <p>
                  By combining ease-of-use for small to medium sized
                  manufacturing operations with powerful reporting and open
                  integration for larger operations, Resource Manager guarantees
                  the power and productivity of high-end systems without the
                  complications and failure rate.
                </p>
              </div>

              <div className="my-6 flex justify-center">
                <img
                  src="/images/Edgebic/2022-10/rmusman.gif"
                  alt="Delivery worker pushing a hand truck with boxes"
                  className="rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Works The Way You Do */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Works The Way You Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                Resource Manager is the only solution that is designed to adapt
                to your specific needs, addressing the key issues facing your
                operation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Immediate, Guaranteed Benefits */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Immediate, Guaranteed Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="leading-relaxed">
                Resource Manager delivers the help you need to effectively plan
                and schedule your company's resources, without the time, money
                and upkeep of traditional options.
              </p>

              <p className="leading-relaxed">
                Finally, you can quit struggling with time consuming decisions
                such as what to buy, what to make, when to buy it, and when to
                make it.
              </p>

              <p className="leading-relaxed">
                Resource Manager adds powerful MRP scheduling, planning and/or
                tracking capabilities to your existing system (be it manual or
                other), for less than any other option – satisfaction
                guaranteed.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best of All */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Best of All</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                Resource Manager runs with Microsoft Office, so you are already
                familiar with entering data, printing reports, graphing, and
                more!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-green-500" />
                    <span className="text-lg">
                      Finite Planning & Scheduling
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-green-500" />
                    <span className="text-lg">
                      MRP and Inventory Management
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-green-500" />
                    <span className="text-lg">
                      Routings and Priority Scheduling
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-green-500" />
                    <span className="text-lg">Easy "what-if" analysis</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-green-500" />
                    <span className="text-lg">Purchasing and Receiving</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-green-500" />
                    <span className="text-lg">Forecasting</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-green-500" />
                    <span className="text-lg">Costing and Estimating</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-green-500" />
                    <span className="text-lg">Integrates with ALL systems</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-green-500" />
                    <span className="text-lg">APS and Lean Manufacturing</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-green-500" />
                    <span className="text-lg">
                      Ideal for Lean Manufacturing
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-green-500" />
                    <span className="text-lg">
                      Run stand alone or networked
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-green-500" />
                    <span className="text-lg">Production Planning</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Fill'er Up */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Fill'er Up</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                Resource Manager for Excel offers basic copy and paste for
                loading data, or form driven data entry.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Check the "MAP" */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Check the "MAP"
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="mb-6 flex justify-center">
                <img
                  src="/images/Edgebic/2022-10/usmap.gif"
                  alt="Drawn treasure map with red X mark"
                  className="rounded-lg shadow-md"
                />
              </div>

              <p className="leading-relaxed">
                Where do you need to go? Which orders need to be shipped when?
                Resource Manager features a simple, single, screen to control
                your whole operation.
              </p>

              <p className="leading-relaxed">
                Enter (or link with outside system), the quantities and due
                dates. Optionally add detailed customer or order information.
                Now schedule.
              </p>

              <p className="leading-relaxed">
                Only Resource Manager gives you quick and easy top level control
                for recognizing the immediate benefits of an integrated
                manufacturing system
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Relax, Cruise Control is on */}
      <section className="  pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Relax, Cruise Control is on
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="leading-relaxed">
                That's it! You are in the driver's seat and cruise control is
                on. Enjoy the view. Check the production calendar for a quick
                view of finite – capacity loading on work centers and
                time-phased inventory levels. Bottlenecks are easy to spot by
                the red flags. Run your favorite report to view schedule data
                the way you like it.
              </p>

              <p className="text-lg leading-relaxed">
                Need to correct a schedule? Quickly adjust working calendar,
                shift available resources, and click to reschedule. For
                effortless cruise control of your business, simply make the top
                level changes and regenerate the master schedule with a click of
                the mouse. Change delivery due dates, split up quantities,
                combine forward and reverse scheduling; all the options for a
                quick adjustment are under your immediate control.
              </p>

              <div className="my-6 flex justify-center">
                <img
                  src="/images/Edgebic/2022-10/rmscreen2.jpg"
                  alt="Screenshot of a resource management software interface"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Fine Tuning */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Fine Tuning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Beyond the top-level cruise control, Resource Manager-DB allows
                the user to implement detailed execution plans at their own
                pace. At any time, you can:
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-blue-500" />
                    <span className="text-lg">Prioritize job sequence</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-blue-500" />
                    <span className="text-lg">Make inventory adjustments</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-blue-500" />
                    <span className="text-lg">Track receipts</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-blue-500" />
                    <span className="text-lg">Generate purchase orders</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-blue-500" />
                    <span className="text-lg">
                      Regenerate schedule with new priority
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-blue-500" />
                    <span className="text-lg">Sequence any time</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-blue-500" />
                    <span className="text-lg">
                      Complete inventory management
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-blue-500" />
                    <span className="text-lg">Feedback actual mfg. data</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-blue-500" />
                    <span className="text-lg">Run adjusted net plan</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-blue-500" />
                    <span className="text-lg">
                      Instantly reconfigure and reschedule
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-1 size-6 shrink-0 text-blue-500" />
                    <span className="text-lg">
                      BOMs and Routings to reflect reality
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reporting Overview */}
      <section className="  pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                With quick, powerful, and intuitive reporting, Resource
                Manager-DB stands above the crowd in its ability to present the
                important data in an easy and meaningful way. In addition to the
                robust reports that are included with Resource Manager-DB, the
                user can easily configure canned, custom reports that become a
                permantent part of the system. In addition, you can work with
                the schedule database directly and use all the power of Access
                and Excel to sort, graph, view, print and export, to meet your
                unique requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gantt Report */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Gantt Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                A great top-level view of all activity with details only a click
                away. Instantly check the due dates of all jobs in schedule,
                drill down to find bottlenecks, adjust capacity and schedule to
                meet critical dates.
              </p>

              <div className="flex justify-center">
                <img
                  src="/images/Edgebic/2022-10/07b.jpg"
                  alt="Screenshot of a spreadsheet software interface"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Summary Report */}
      <section className="  pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Summary Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                The report will tell you what you need to buy or make, how much,
                and when – all consolidated on a single sheet. An instant, top
                level MRP Report for all products and workcenter loading. View
                over any time horizon – by day, week, or month.
              </p>

              <div className="flex justify-center">
                <img
                  src="/images/Edgebic/2022-10/sumrpt.jpg"
                  alt="Spreadsheet and graph showing production schedule data"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Item Report */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Item Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                This sheet summarizes all requirements per part number. Ideal
                for WorkCenter Loading, the system lists each job, when to
                start, when complete, and how much is required.
              </p>

              <div className="flex justify-center">
                <img
                  src="/images/Edgebic/2022-10/item.jpg"
                  alt="Blurry image of a workcenter production report"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Calendar Report */}
      <section className="  pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Calendar Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                View and print the schedule in familiar "wall calendar" format.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Workcenter Report */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Workcenter Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                Instant, real-time views of all critical workcenter activity by:
                daily loading, backlog, % utilization, hours available and
                bottlenecks. Allows for quick overtime scheduling and other
                detailed adjustments for any workcenter on any day. Also
                features a daily workcenter "to-do" list.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Routing & Tree Report */}
      <section className="  pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Routing & Tree Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Intuitive reports for visual bill-or-resource verification,
                process flow and schedule feedback.
              </p>

              <div className="flex justify-center">
                <img
                  src="/images/Edgebic/2022-10/tree.jpg"
                  alt="Flow chart diagram in spreadsheet software"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Production Report */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Production Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Perfect for traveler or work order printout. Automatically
                reconciles inventory and capacity for a job and lists sequence
                of operations and products to fulfill order on time. Includes
                space for check off and actual feedback as well as job costing
                and variance reporting.
              </p>

              <div className="flex justify-center">
                <img
                  src="/images/Edgebic/2022-10/prodrpt.jpg"
                  alt="Job cost analysis chart with data and graph"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Purchasing & Receiving */}
      <section className="  pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Purchasing & Receiving
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Resource Manager-DB excels with its integrated purchasing and
                receiving module. Designed to meet the tough requirements for
                Lean Manufacturing, you won't find any muda here. With a single
                click, the user can generate purchase orders per Kanban and/or
                standard schedule requirements. The system tracks each received
                quantity, open or closed status, and adjusts inventory – simply
                and automatically. Automatically e-mail RFQs and POs to vendors.
              </p>

              <div className="flex justify-center">
                <img
                  src="/images/Edgebic/2022-10/porpt.jpg"
                  alt="Table of purchase orders with status details"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Special Services & Partners */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Special Services & Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                User Solutions offers a variety of direct services to meet any
                special needs, including: automatic data integration with other
                systems, customized reports, on site training and configuration
                and much more. In addition, User Solutions has partnered with a
                number of complementary product and service companies to provide
                complete solutions focused on unique needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Awards Banner */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <img
                  src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  className="mx-auto h-auto max-w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
