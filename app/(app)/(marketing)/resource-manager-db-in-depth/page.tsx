'use client';

import * as React from 'react';
import Image from 'next/image';

import { EDGEBIContent } from '@/components/marketing/sections/edgebi-content';
import { RMDBFeatureList } from '@/components/marketing/sections/rmdb-feature-list';
import { YouTubeFacade } from '@/components/ui/youtube-facade';

type TabType = 'summary' | 'in-depth' | 'quick-start' | 'edgebi' | 'live-demo';

export default function ResourceManagerDBInDepthPage() {
  const [activeTab, setActiveTab] = React.useState<TabType>('in-depth');

  const tabs = [
    { id: 'summary' as TabType, label: 'Summary' },
    { id: 'in-depth' as TabType, label: 'In Depth' },
    { id: 'quick-start' as TabType, label: 'Quick Start' },
    { id: 'edgebi' as TabType, label: 'EDGEBI' },
    { id: 'live-demo' as TabType, label: 'Live Demo' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl font-bold">
            Resource Manager DB: In Depth
          </h1>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="pt-8 bg-gradient-to-b from-slate-50 to-white" aria-label="Product information tabs">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-start gap-2" role="tablist" aria-label="Resource Manager DB sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id ? 'true' : 'false'}
                onClick={() => setActiveTab(tab.id)}
                className={`transition-all duration-200 focus:outline-none px-8 py-4 text-[16px] font-semibold rounded-t-xl border-2 border-b-0 relative ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 border-blue-500 z-10 -mb-[2px]'
                    : 'bg-blue-500 text-white border-blue-500 shadow-sm hover:bg-blue-600 hover:border-blue-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tab Content Container with Border */}
      <div className="border-t-2 border-blue-500 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="h-2 bg-gradient-to-b from-blue-50 to-transparent"></div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold  ">RESOURCE MANAGER DB: SUMMARY</h2>
              <div className="grid items-start gap-8 lg:grid-cols-2">
                <div>
                  <div className="space-y-4 text-base leading-relaxed text-slate-700">
                    <p>
                      If you have tried to use your ERP for creating a viable Production Schedule, and still end up with a tangle of custom Excel Reports, messy whiteboard or worse yet, late shipments, we can help.
                    </p>
                    <p>
                      RMDB was specifically architected to easily adapt to the way you work, using your existing data. It can be easily configured, and/or reconfigured, on the fly to address your most pressing issues.
                    </p>
                    <p>
                      We can focus and resolve your most pressing issues quickly — letting you reap immediate ROI. Then, delve deeper without having to spend more!
                    </p>
                    <p>
                      Schedule a live demo, even using your data in its current form – RISK FREE!!
                    </p>
                    <p>
                      RMDB contains deep functionality to address a multitude of challenges for production planning and scheduling: alternate workcenters, complex routings & processes, discrete and/or batch, multiple constraints (labor, machines, materials, etc.), advanced drag and drop graphical calendar screens, downtime management, sub-assemblies, optimization, and much more.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/Edgebic/2022-07/RMDB-EDGE2-1024x483.png"
                    alt="Resource Manager-DB with EDGE (Enhanced Drag & drop Graphical Environment)"
                    width={1024}
                    height={483}
                    className="h-auto max-w-full rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Video and Image Section */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="flex justify-center">
                  <div className="w-full overflow-hidden rounded-lg bg-black shadow-lg">
                    <YouTubeFacade
                      videoId="kn92TIHhbm8"
                      title="Resource Manager DB Summary"
                      className="aspect-video w-full"
                      hidePlayButton={true}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/Edgebic/2022-07/rmdb11.png"
                    alt="Resource Manager DB Processing Menu"
                    width={800}
                    height={600}
                    className="h-auto max-w-full rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )}

          {/* In Depth Tab */}
          {activeTab === 'in-depth' && (
            <div className="space-y-12">
              {/* Overview Section */}
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold">Overview</h2>
                  <p className="mb-4 text-slate-600">
                    Resource Manager-DB (RMDB) is an affordable, flexible and
                    quick-to-implement approach to resolve your production planning,
                    scheduling and tracking challenges. Designed by customers just
                    like you, Resource Manager-DB features a single, simple menu
                    (dashboard) requiring minimal transactions to keep the system
                    accurate.
                  </p>
                  <p className="text-slate-600">
                    RMDB's unique, customer driven architecture allows you to start
                    very simply, focusing on one area at a time, enabling you to
                    provide minimal information in order to recognize immediate
                    benefits.
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/Edgebic/2022-10/RMDB-MainMenu.png"
                    alt="RMDB Main Menu Dashboard"
                    width={800}
                    height={600}
                    className="w-full rounded-lg shadow-md"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Make Manufacturing Great Again Section */}
              <div className="flex justify-center">
                <Image
                  src="/images/Edgebic/2022-10/MMGAsmall_Colver.png"
                  alt="Make Manufacturing Great Again - Vintage Car"
                  width={400}
                  height={300}
                  className="max-w-md rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Key Benefits Section */}
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Image
                    src="/images/Edgebic/2022-10/ERP_Scheduling-300x245-1.png"
                    alt="ERP Scheduling Integration"
                    width={300}
                    height={245}
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold">
                    Why Choose Resource Manager-DB?
                  </h2>
                  <p className="mb-4 text-slate-600">
                    If you find you are still using manual white boards and/or Excel
                    for trying to manage your production scheduling, you will find
                    RMDB a refreshing option. RMDB's intuitive and flexible
                    structure and data integration, enables us to offer a no-risk,
                    pre-sales, implementation walk-through to demonstrate exactly
                    how the system can benefit your operations.
                  </p>
                  <p className="mb-4 text-slate-600">
                    Since 1991, our mission has been to help manufacturers solve
                    manufacturing and operations management problems with intuitive
                    and easy-to-implement tools.
                  </p>
                  <p className="text-slate-600">
                    The unique architecture facilitates custom configuration, in hours or days, vs. typical custom programming taking weeks or months. By driving our product development based on your requests, combined with the rapid custom configuration abilities of RMDB, the result is a solution that fits your operation like a glove, quickly and affordably. Featuring easy integration with Excel, ERP, accounting, custom or other legacy systems, RMDB will provide you unsurpassed improvements in production planning and scheduling and enterprise-wide communication.
                  </p>
                </div>
              </div>

              {/* Works The Way You Do Section */}
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold">Works The Way You Do</h2>
                  <p className="mb-6 text-slate-600">
                    Resource Manager-DB is the only system that is designed to adapt
                    to your specific operational needs and nuances. RMDB utilizes
                    your existing data resulting in rapid implementation and
                    acceptance success.
                  </p>
                  <ul className="flex flex-wrap gap-4">
                    <li className="font-medium text-lg">Adapts to how you work</li>
                    <li className="font-medium text-lg">Leverages existing data</li>
                    <li className="font-medium text-lg">Quick to configure</li>
                  </ul>
                </div>
                <div>
                  <Image
                    src="/images/Edgebic/2022-10/Manufacturing_Excel_Dashboard-1024x376.png"
                    alt="Manufacturing Excel Dashboard"
                    width={1024}
                    height={376}
                    className="w-full rounded-lg shadow-md"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Cruise Control Section */}
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold">
                    Cruise Control Software for your Manufacturing Enterprise Fill'er Up
                  </h2>
                  <p className="mb-4 text-slate-600">
                    Resource Manager-DB lets you easily work with your current data. Do you have
                    a product list somewhere? How about bills-of-material and/or routings? Sales
                    orders, inventory levels, even work-in-process data. Import directly into
                    Resource Manager-DB and let RMDB automatically fill in the details. You can
                    even maintain this data in other systems, such as ERP, then refresh on demand.
                    Starting from scratch? Resource Manager-DB features a clean and simple way to
                    create master item lists and dynamically create bills-of-resources.
                  </p>
                  <p className="mb-4 text-slate-600">
                    Resource Manager-DB is designed to work seamlessly with Excel. <strong>IMPORTANT
                    TAKEAWAY #1:</strong> This provides great flexibility in rapid implementation
                    options as it allows you to load, edit, reload entire data sets with the click
                    of a button.
                  </p>
                  <p className="text-slate-600">
                    <strong>IMPORTANT TAKEAWAY #2:</strong> Output reports can easily circulate
                    throughout the organization in familiar Excel format for editing and reimporting
                    back into Resource Manager-DB to update the system. Reports run on any version
                    of Excel anywhere — Cloud, tablet, laptop, desktop, on-site, off-site and
                    enterprise wide.
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/Edgebic/2022-10/RMDB-Data-Import.png"
                    alt="RMDB Import Data Dialog"
                    width={800}
                    height={600}
                    className="w-full rounded-lg shadow-md"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Check the MAP Section */}
              <div>
                <h2 className="mb-6 text-2xl font-bold">Check the "MAP"</h2>
                <div className="grid items-center gap-8 md:grid-cols-2">
                  <div className="flex justify-center">
                    <Image
                      src="/images/Edgebic/2022-10/usmap.gif"
                      alt="Treasure Map illustration"
                      width={300}
                      height={225}
                      className="max-w-xs"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="mb-4 text-slate-600">
                      <span className="px-1">Where do you need to go?</span> Which orders need to be
                      shipped when? Resource Manager features a simple, single, screen to control
                      your whole operation.
                    </p>
                    <p className="mb-4 text-slate-600">
                      Enter (or link with outside system), the quantities and due dates. Optionally
                      add detailed customer or order information. Now schedule.
                    </p>
                    <p className="text-slate-600">
                      Only Resource Manager gives you quick and easy top level control for recognizing
                      the immediate benefits of an integrated manufacturing system
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
                      That's it! You are in the driver's seat and cruise control is on. Enjoy the
                      view. Check the production calendar for a quick view of finite-capacity loading
                      on work centers and time-phased inventory levels. Bottlenecks are easy to spot
                      by the red flags. Run your favorite report to view schedule data the way you like it.
                    </p>
                    <p className="text-slate-600">
                      Need to correct a schedule? Quickly adjust working calendar, shift available
                      resources, and click to reschedule. For effortless cruise control of your
                      business, simply make the top level changes and regenerate the master schedule
                      with a click of the mouse. Change delivery due dates, split up quantities,
                      combine forward and reverse scheduling; all the options for a quick adjustment
                      are under your immediate control.
                    </p>
                  </div>
                  <div>
                    <Image
                      src="/images/Edgebic/2022-10/RMDB-MainMenu.png"
                      alt="RMDB Main Menu Interface"
                      width={800}
                      height={600}
                      className="w-full rounded-lg shadow-md"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Fine-Tuning Options Section */}
              <div>
                <h2 className="mb-4 text-2xl font-bold">Fine-Tuning Options</h2>
                <p className="mb-6 text-slate-600">
                  Beyond basic cruise control, RMDB allows you to progressively implement
                  detailed execution plans as your needs grow:
                </p>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600">• Prioritize job sequences</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600">• Adjust inventory levels</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600">• Track receiving activities</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600">• Generate purchase orders</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600">• Regenerate schedules with new priorities</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600">• Sequence any time</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600">• Complete inventory management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600">• Feedback actual manufacturing data</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600">• Run adjusted net plans</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600">• Instantly reconfigure systems</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600">• Update BOMs and Routings to reflect reality</span>
                  </div>
                </div>
              </div>

              {/* Reporting Section */}
              <div>
                <h2 className="mb-4 text-2xl font-bold">Powerful Reporting</h2>
                <p className="mb-8 text-slate-600">
                  With quick, powerful, and intuitive reporting, Resource Manager-DB
                  stands above the crowd in its ability to present the important data
                  in an easy and meaningful way. In addition to the robust reports
                  that are included with Resource Manager-DB, the user can easily
                  configure canned, custom reports that become a permanent part of the
                  system.
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Gantt Report */}
                  <div>
                    <Image
                      src="/images/Edgebic/2022-10/07b.jpg"
                      alt="Gantt Report"
                      width={800}
                      height={600}
                      className="mb-3 w-full rounded-lg"
                      loading="lazy"
                    />
                    <h3 className="mb-2 text-lg font-bold">Gantt Report</h3>
                    <p className="text-slate-600">
                      A great top-level view of all activity with details only a click
                      away. Instantly check the due dates of all jobs in schedule,
                      drill down to find bottlenecks, adjust capacity and schedule to
                      meet critical dates.
                    </p>
                  </div>

                  {/* Summary Report */}
                  <div>
                    <Image
                      src="/images/Edgebic/2022-10/sumrpt.jpg"
                      alt="Summary Report"
                      width={800}
                      height={600}
                      className="mb-3 w-full rounded-lg"
                      loading="lazy"
                    />
                    <h3 className="mb-2 text-lg font-bold">Summary Report</h3>
                    <p className="text-slate-600">
                      The report will tell you what you need to buy or make, how much,
                      and when – all consolidated on a single sheet. An instant, top
                      level MRP Report for all products and workcenter loading. View
                      over any time horizon – by day, week, or month.
                    </p>
                  </div>

                  {/* Item Report */}
                  <div>
                    <Image
                      src="/images/Edgebic/2022-10/item.jpg"
                      alt="Item Report"
                      width={800}
                      height={600}
                      className="mb-3 w-full rounded-lg"
                      loading="lazy"
                    />
                    <h3 className="mb-2 text-lg font-bold">Item Report</h3>
                    <p className="text-slate-600">
                      Summarizes all requirements per part number. Ideal for
                      WorkCenter Loading, listing each job with start/completion times
                      and requirements.
                    </p>
                  </div>

                  {/* Calendar Report */}
                  <div>
                    <Image
                      src="/images/Edgebic/2022-10/07b.jpg"
                      alt="Calendar Report"
                      width={800}
                      height={600}
                      className="mb-3 w-full rounded-lg"
                      loading="lazy"
                    />
                    <h3 className="mb-2 text-lg font-bold">Calendar Report</h3>
                    <p className="text-slate-600">
                      View and print the schedule in familiar "wall calendar" format.
                    </p>
                  </div>

                  {/* Workcenter Report */}
                  <div>
                    <Image
                      src="/images/Edgebic/2022-10/RPT-DD1-300x241-1.png"
                      alt="Workcenter Report"
                      width={300}
                      height={241}
                      className="mb-3 w-full rounded-lg"
                      loading="lazy"
                    />
                    <h3 className="mb-2 text-lg font-bold">Workcenter Report</h3>
                    <p className="text-slate-600">
                      Instant, real-time views of all critical workcenter activity by:
                      daily loading, backlog, % utilization, hours available and
                      bottlenecks. Allows for quick overtime scheduling and other
                      detailed adjustments for any workcenter on any day. Also
                      features a daily workcenter "to-do" list.
                    </p>
                  </div>

                  {/* Routing & Tree Report */}
                  <div>
                    <Image
                      src="/images/Edgebic/2022-10/tree.jpg"
                      alt="Routing & Tree Report"
                      width={800}
                      height={600}
                      className="mb-3 w-full rounded-lg"
                      loading="lazy"
                    />
                    <h3 className="mb-2 text-lg font-bold">Routing & Tree Report</h3>
                    <p className="text-slate-600">
                      Intuitive reports for visual bill-of-resource verification,
                      process flow and schedule feedback.
                    </p>
                  </div>

                  {/* Production Report */}
                  <div>
                    <Image
                      src="/images/Edgebic/2022-10/prodrpt.jpg"
                      alt="Production Report"
                      width={800}
                      height={600}
                      className="mb-3 w-full rounded-lg"
                      loading="lazy"
                    />
                    <h3 className="mb-2 text-lg font-bold">Production Report</h3>
                    <p className="text-slate-600">
                      Perfect for traveler or work order printout. Automatically
                      reconciles inventory and capacity for a job and lists sequence
                      of operations and products to fulfill order on time. Includes
                      space for check off and actual feedback as well as job costing
                      and variance reporting.
                    </p>
                  </div>

                  {/* Purchasing & Receiving */}
                  <div>
                    <Image
                      src="/images/Edgebic/2022-10/porpt.jpg"
                      alt="Purchasing & Receiving Report"
                      width={800}
                      height={600}
                      className="mb-3 w-full rounded-lg"
                      loading="lazy"
                    />
                    <h3 className="mb-2 text-lg font-bold">Purchasing & Receiving</h3>
                    <p className="text-slate-600">
                      Resource Manager-DB excels with its integrated purchasing and
                      receiving module. Designed to meet the tough requirements for
                      Lean Manufacturing. Generate purchase orders via Kanban or
                      standard requirements with one click. Track received quantities,
                      open/closed status, and adjust inventory automatically. Auto-email
                      RFQs and POs to vendors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Special Services & Partners Section */}
              <div>
                <h2 className="mb-4 text-2xl font-bold">
                  <span>Special</span>{' '}
                  <span>Services & Partners</span>
                </h2>
                <p className="text-slate-600">
                  User Solutions offers a variety of direct services to meet any special needs,
                  including: automatic data integration with other systems, customized reports,
                  on site training and configuration and much more. In addition, User Solutions
                  has partnered with a number of complementary product and service companies to
                  provide complete solutions focused on unique needs.
                </p>
              </div>
            </div>
          )}

          {/* Quick Start Tab */}
          {activeTab === 'quick-start' && (
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold">Quick Start</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-600">
                  <p>
                    Get started with Resource Manager-DB quickly and easily. Our Quick Start guide provides step-by-step instructions to help you set up and configure RMDB for your specific needs.
                  </p>
                  <p>
                    Download the comprehensive Quick Start PDF guide to begin your journey with RMDB.
                  </p>
                  <a
                    href="/pdf/RMXQuickStart.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
                  >
                    Download Quick Start Guide (PDF)
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/Edgebic/2022-10/RMDB-Data-Import.png"
                  alt="RMDB Data Import"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* EDGEBI Tab */}
          {activeTab === 'edgebi' && <EDGEBIContent />}

          {/* Live Demo Tab */}
          {activeTab === 'live-demo' && (
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold">Live Demo</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-600">
                  <p>
                    See Resource Manager-DB in action! Schedule a live demo with our team to experience how RMDB can transform your production planning and scheduling processes.
                  </p>
                  <p>
                    We can even use your data in its current form to show you exactly how RMDB will work for your specific operations – RISK FREE!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      window.open('https://calendly.com/mudasirnadeem7979/30min', '_blank');
                    }}
                    className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
                  >
                    Schedule a Live Demo
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/Edgebic/2022-07/RMDB-EDGE2-1024x483.png"
                  alt="RMDB Live Demo"
                  width={1024}
                  height={483}
                  className="rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - Only show on In Depth tab */}
      {activeTab === 'in-depth' && <RMDBFeatureList />}
    </div>
  );
}
