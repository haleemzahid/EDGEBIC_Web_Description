'use client';

import * as React from 'react';
import Image from 'next/image';

import { JSLModuleList } from '@/components/marketing/sections/jsl-module-list';
import { Card, CardContent } from '@/components/ui/card';

type TabType = 'summary' | 'in-depth' | 'download';

export default function JSLJobSchedulerLiteInDepthPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState<TabType>('in-depth');

  const tabs = [
    { id: 'summary' as TabType, label: 'Summary' },
    { id: 'in-depth' as TabType, label: 'In Depth' },
    { id: 'download' as TabType, label: 'Download Now' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Title centered */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="mb-4 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Job Scheduler Lite (JSL)
          </h1>
          <p className="mx-auto max-w-4xl text-center text-lg leading-relaxed text-slate-600">
            An entry level production scheduling offering that allows users to quickly create routing steps and schedule according to capacity limitations, direction (Forward or Reverse), and Priorities.
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="pt-6" aria-label="Product information tabs">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-start gap-2 text-[18px]" role="tablist" aria-label="Job Scheduler Lite sections">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id ? 'true' : 'false'}
                onClick={() => setActiveTab(tab.id)}
                className={`transition-all duration-200 focus:outline-none px-4 py-3 border-b-2 ${activeTab === tab.id
                  ? 'font-semibold text-blue-600 border-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 border-transparent hover:border-blue-600 hover:bg-blue-50'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              {/* Overview */}
              <div className="grid items-start gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-bold text-slate-900">Overview</h3>
                  <div className="space-y-4 text-base leading-relaxed text-slate-700">
                    <p>
                      Welcome to Job Scheduler Lite (JSL). Designed as an entry level production scheduling offering that allows users to quickly create a series of routing steps then schedule according to capacity limitations, direction (Forward or Reverse), and Priorities.
                    </p>
                    <p>
                      It also offers a quick method to load data either directly or importing from an Excel sheet. If you have more complex routings (non linear, or non batch, etc.) then consider Resource Manager-DB (RMDB) as it can model scheduling most any manufacturing flow.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/Edgebic/2022-10/insight-1.png"
                    alt="JSL Production Scheduling Interface"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="grid items-start gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-bold text-slate-900">Features</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900">Simple, familiar interface</h4>
                      <p className="text-slate-700">
                        One step menus, on-screen buttons, or sheet tabs make navigation a snap.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Easy to configure and run</h4>
                      <p className="text-slate-700">
                        Quick, intuitive layout and prompts allow you to focus on your business, instead of learning another software product.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Finite capacity planning and forward/Reverse scheduling</h4>
                      <p className="text-slate-700">
                        Global and/or detailed workcenter configuration can be made and applied instantly.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/Edgebic/2022-10/le.png"
                    alt="JSL Interface"
                    width={500}
                    height={350}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Modules */}
              <JSLModuleList />
            </div>
          )}

          {/* In Depth Tab */}
          {activeTab === 'in-depth' && (
            <div className="space-y-12">
              {/* Overview */}
              <div className="grid items-start gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Overview</h2>
                  <div className="space-y-4 text-base leading-relaxed text-slate-600">
                    <p>
                      Welcome to Job Scheduler Lite (JSL). Designed as an entry level production scheduling offering that allows users to quickly create a series of routing steps then schedule according to capacity limitations, direction (Forward or Reverse), and Priorities.
                    </p>
                    <p>
                      It also offers a quick method to load data either directly or importing from an Excel sheet. If you have more complex routings (non linear, or non batch, etc.) then consider Resource Manager-DB (RMDB) as it can model scheduling most any manufacturing flow.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/Edgebic/2022-10/insight-1.png"
                    alt="Production scheduling software interface"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Features</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-600">
                  <div>
                    <h3 className="font-semibold text-slate-900">Simple, familiar interface</h3>
                    <p>One step menus, on-screen buttons, or sheet tabs make navigation a snap.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Easy to configure and run</h3>
                    <p>Quick, intuitive layout and prompts allows you to focus on your business, instead of learning another software product.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Finite capacity planning and forward scheduling</h3>
                    <p>Global and/or detailed workcenter configuration can be made and applied instantly.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <Image
                    src="/images/Edgebic/2022-10/rit.png"
                    alt="Daily work hours tracking"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                  <Image
                    src="/images/Edgebic/2022-10/le.png"
                    alt="Data import interface"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Modules */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Modules</h2>
                <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
                  {['Import Data', 'Daily Hours', 'Holidays', 'Configure', 'Resources', 'Orders', 'FG / RL', 'Reports', 'Schedule', 'InSight', 'Export Data', 'Exit'].map((module) => (
                    <div key={module} className="rounded bg-blue-50 p-2 text-center text-sm font-medium">
                      {module}
                    </div>
                  ))}
                </div>
              </div>

              {/* Import Data */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Import Data</h2>
                  <p className="text-base leading-relaxed text-slate-600">
                    We recommend you review JSL with currently loaded demo data then consider using Import Data to load your application specific data. Just edit the importsback.xlsx to represent your data.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/Edgebic/2022-10/import.png"
                    alt="Data import window"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Daily Hours */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="flex items-center justify-center lg:order-1">
                  <Image
                    src="/images/Edgebic/2022-10/dailyhours.png"
                    alt="Daily Hours interface"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:order-2">
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Daily Hours</h2>
                  <p className="text-base leading-relaxed text-slate-600">
                    Daily Hours is normal operating hours for your business. You might consider entering net hours (subtract breaks, lunch, efficiencies). Simply click on a day and enter start and end times.
                  </p>
                </div>
              </div>

              {/* Holidays */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Holidays</h2>
                  <p className="text-base leading-relaxed text-slate-600">
                    Holidays can be a partial shutdown event for company, repeating holiday (like Christmas), or varies each year according to calendar (for example Thanksgiving).
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/Edgebic/2022-10/holidays.png"
                    alt="Holiday management interface"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Resources */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="flex items-center justify-center lg:order-1">
                  <Image
                    src="/images/Edgebic/2022-10/resoursces.png"
                    alt="Resource management interface"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:order-2">
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Resources</h2>
                  <p className="text-base leading-relaxed text-slate-600">
                    To add a new resource simply clear input table, enter in Name, description, and number of resources. Then Save. The Num of Res is how many of that workcenter/resource you have. It is multiplied by daily hours to calculate gross hours available.
                  </p>
                </div>
              </div>

              {/* Finish Goods */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Finish Goods</h2>
                  <p className="text-base leading-relaxed text-slate-600">
                    Finished Goods/Routing List (FG/RL) is what will be scheduled. You can enter a new name, then list the workcenters and timing in the order they are worked, then save. JSL schedules in a linear mode, meaning all parts are completed at one workcenter before moving on to next.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/Edgebic/2022-10/FG.png"
                    alt="Inventory management interface"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Orders */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="flex items-center justify-center lg:order-1">
                  <Image
                    src="/images/Edgebic/2022-10/orders-1024x459.png"
                    alt="Order management system"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:order-2">
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Orders</h2>
                  <p className="text-base leading-relaxed text-slate-600">
                    Orders is what will be scheduled. You can enter a new name, then list the workcenters and timing in the order they are worked, then save. If you have routings that don&apos;t fit this simple model, please call and we can discuss other options.
                  </p>
                </div>
              </div>

              {/* Schedule */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Schedule</h2>
                  <div className="space-y-4 text-base leading-relaxed text-slate-600">
                    <p>
                      The Schedule module is the primary scheduling interface where you can run and manage your production schedules. Configure scheduling direction (Forward or Reverse), set priorities, and apply capacity constraints to generate optimal schedules.
                    </p>
                    <ul className="list-inside list-disc space-y-2">
                      <li>Forward and Reverse scheduling options</li>
                      <li>Priority-based job sequencing</li>
                      <li>Capacity constraint application</li>
                      <li>Instant schedule generation</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/Edgebic/2022-10/schdle.png"
                    alt="Job scheduling interface"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* InSight */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="flex items-center justify-center lg:order-1">
                  <Image
                    src="/images/Edgebic/2022-10/insight.png"
                    alt="Scheduling software with calendar"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:order-2">
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">InSight</h2>
                  <div className="space-y-4 text-base leading-relaxed text-slate-600">
                    <p>
                      InSight is the most comprehensive and feature rich module in JSL. Check out the schedule calendar Legend to see at a glance how selected month is scheduled. The time scale can be 15 minutes to a week. Right click on Workcenter ID to display color coded efficiency.
                    </p>
                    <div>
                      <h4 className="mb-2 font-semibold text-slate-900">Calendar Legend:</h4>
                      <ul className="list-inside list-disc space-y-1 text-sm">
                        <li>Work days with no late jobs</li>
                        <li>Days with at least one late job</li>
                        <li>Days with no scheduled work</li>
                        <li>Non-working days (weekends/holidays)</li>
                        <li>Buffer days</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold text-slate-900">Key Features:</h4>
                      <ul className="list-inside list-disc space-y-1 text-sm">
                        <li>Cross-hatched bar segments in Gantt Chart indicate Late Jobs</li>
                        <li>Click any job segment to reposition it on the display</li>
                        <li>Adjustable time scale from 15 minutes to one week</li>
                        <li>Color-coded efficiency visualization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Export Data */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Export Data</h2>
                  <p className="text-base leading-relaxed text-slate-600">
                    Export data however you wish. Sometimes its quicker to export out data to Excel, make big changes as needed, then just import in.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/Edgebic/2022-10/exdata.png"
                    alt="Data export interface"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Configure */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="flex items-center justify-center lg:order-1">
                  <Image
                    src="/images/Edgebic/2022-10/th-conf.png"
                    alt="Theme configuration interface"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:order-2">
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Configure</h2>
                  <p className="text-base leading-relaxed text-slate-600">
                    Configure allows you to try different themes, back up and restore database, and also register the JSL for customer use.
                  </p>
                </div>
              </div>

              {/* Reports */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Reports</h2>
                  <p className="text-base leading-relaxed text-slate-600">
                    There are a variety of reports available to help you analyze your production schedule and make informed decisions.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/Edgebic/2022-10/Reports.png"
                    alt="Schedule report interface"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Download Tab */}
          {activeTab === 'download' && (
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Download Now</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-600">
                  <p>
                    Ready to try Job Scheduler Lite? Download our free trial and experience the power of finite capacity scheduling for your production environment.
                  </p>
                  <p>
                    The trial includes full functionality so you can evaluate all features before purchasing.
                  </p>
                  <a
                    href="https://www.usersolutions.com/wp-content/uploads/2022/10/JSLsetup.zip"
                    download="JSLsetup.zip"
                    className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
                  >
                    Download Free Trial
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/Edgebic/2022-10/insight-1.png"
                  alt="JSL Download"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
