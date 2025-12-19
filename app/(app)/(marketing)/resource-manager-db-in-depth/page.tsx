'use client';

import * as React from 'react';

import { RMDBFeatureList } from '@/components/marketing/sections/rmdb-feature-list';

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
      <section className="pt-6">
        <div className="container flex items-center justify-center mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-6 text-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`transition-colors ${
                  activeTab === tab.id
                    ? 'font-semibold text-cyan-500'
                    : 'text-slate-700 hover:text-cyan-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Summary Tab */}
          {activeTab === 'summary' && (
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
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/RMDB-MainMenu.png"
                  alt="RMDB Main Menu Dashboard"
                  className="w-full rounded-lg shadow-md"
                />
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
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/10/RMDB-MainMenu.png"
                    alt="RMDB Main Menu Dashboard"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Make Manufacturing Great Again Section */}
              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/MMGAsmall_Colver.png"
                  alt="Make Manufacturing Great Again - Vintage Car"
                  className="max-w-md rounded-lg"
                />
              </div>

              {/* Key Benefits Section */}
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/10/ERP_Scheduling-300x245-1.png"
                    alt="ERP Scheduling Integration"
                    className="w-full rounded-lg"
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
                    The unique architecture facilitates custom configuration, in hours or days, vs. typical custom programming taking weeks or months. By driving our product development based on your requests, combined with the rapid custom configuration abilities of RMDB, the result is a solution that fits your operation like a glove, quickly and affordably.
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
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/10/Manufacturing_Excel_Dashboard-1024x376.png"
                    alt="Manufacturing Excel Dashboard"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Cruise Control Section */}
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold">
                    Cruise Control Software for your Manufacturing Enterprise
                  </h2>
                  <p className="mb-4 text-slate-600">
                    Resource Manager-DB lets you easily work with your current data. Do you have
                    a product list somewhere? How about bills-of-material and/or routings? Sales
                    orders, inventory levels, even work-in-process data. Import directly into
                    Resource Manager-DB and let RMDB automatically fill in the details.
                  </p>
                  <p className="text-slate-600">
                    Resource Manager-DB is designed to work seamlessly with Excel. This provides great flexibility in rapid implementation
                    options as it allows you to load, edit, reload entire data sets with the click
                    of a button.
                  </p>
                </div>
                <div>
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/10/RMDB-Data-Import.png"
                    alt="RMDB Import Data Dialog"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Reporting Section */}
              <div>
                <h2 className="mb-4 text-2xl font-bold">Powerful Reporting</h2>
                <p className="mb-8 text-slate-600">
                  With quick, powerful, and intuitive reporting, Resource Manager-DB
                  stands above the crowd in its ability to present the important data
                  in an easy and meaningful way.
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <img
                      src="https://www.usersolutions.com/wp-content/uploads/2022/10/07b.jpg"
                      alt="Gantt Report"
                      className="mb-3 w-full rounded-lg"
                    />
                    <h3 className="mb-2 text-lg font-bold">Gantt Report</h3>
                    <p className="text-slate-600">
                      A great top-level view of all activity with details only a click
                      away.
                    </p>
                  </div>

                  <div>
                    <img
                      src="https://www.usersolutions.com/wp-content/uploads/2022/10/sumrpt.jpg"
                      alt="Summary Report"
                      className="mb-3 w-full rounded-lg"
                    />
                    <h3 className="mb-2 text-lg font-bold">Summary Report</h3>
                    <p className="text-slate-600">
                      The report will tell you what you need to buy or make, how much,
                      and when.
                    </p>
                  </div>

                  <div>
                    <img
                      src="https://www.usersolutions.com/wp-content/uploads/2022/10/item.jpg"
                      alt="Item Report"
                      className="mb-3 w-full rounded-lg"
                    />
                    <h3 className="mb-2 text-lg font-bold">Item Report</h3>
                    <p className="text-slate-600">
                      Summarizes all requirements per part number.
                    </p>
                  </div>
                </div>
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
                    href="https://www.usersolutions.com/wp-content/uploads/2022/10/rmdbquickstart23.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
                  >
                    Download Quick Start Guide (PDF)
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/RMDB-Data-Import.png"
                  alt="RMDB Data Import"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}

          {/* EDGEBI Tab */}
          {activeTab === 'edgebi' && (
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold">EDGEBI</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-600">
                  <p>
                    EDGE (Enhanced Drag & drop Graphical Environment) is our advanced visual scheduling interface that makes production planning intuitive and efficient.
                  </p>
                  <p>
                    With EDGE, you can easily drag and drop jobs, visualize capacity constraints, and make real-time adjustments to your production schedule with immediate feedback.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <video
                    src="https://www.usersolutions.com/wp-content/uploads/2022/10/EDGE%20BI%20User%20Solutions.mp4"
                    title="EDGE BI User Solutions"
                    className="w-full"
                    controls
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          )}

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
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png"
                  alt="RMDB Live Demo"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - Only show on In Depth tab */}
      {activeTab === 'in-depth' && <RMDBFeatureList />}

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
            </h2>
            <img
              src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
              alt="Collection of industry and business awards logos"
              className="mx-auto h-auto max-w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
