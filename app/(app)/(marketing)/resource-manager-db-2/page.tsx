'use client';

import * as React from 'react';

import { EDGEBIContent } from '@/components/marketing/sections/edgebi-content';
import { RMDBFeatureList } from '@/components/marketing/sections/rmdb-feature-list';
import { RMDBInDepthContent } from '@/components/marketing/sections/rmdb-in-depth-content';
import { Card, CardContent } from '@/components/ui/card';

type TabType = 'summary' | 'in-depth' | 'quick-start' | 'edgebi' | 'live-demo';

export default function ResourceManagerDBPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState<TabType>('summary');

  const tabs = [
    { id: 'summary' as TabType, label: 'Summary' },
    { id: 'in-depth' as TabType, label: 'In Depth' },
    { id: 'quick-start' as TabType, label: 'Quick Start' },
    { id: 'edgebi' as TabType, label: 'EDGEBI' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Resource Manager DB
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                Resource Manager-DB (RMDB) is a flexible and affordable production planning, scheduling, and tracking solution that is designed to adapt to your operations. We can work with whatever data you have to achieve better production scheduling, just easier and quicker than you ever thought possible. Give US a chance to prove it by scheduling a Live Demo today!
              </p>
            </div>
            <div className="flex justify-center">
              <div className="aspect-video w-full max-w-[700px] overflow-hidden rounded-lg shadow-lg">
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="auto"
                >
                  <source
                    src="https://www.usersolutions.com/wp-content/uploads/2022/12/RMDB updated thumbnail.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-center gap-6 text-[18px]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`transition-colors ${activeTab === tab.id
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
            <div className="space-y-6">
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
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png"
                    alt="Resource Manager-DB with EDGE (Enhanced Drag & drop Graphical Environment)"
                    className="h-auto max-w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Video and Image Section */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="flex justify-center">
                  <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      preload="auto"
                      poster="https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png"
                    >
                      <source
                        src="https://www.usersolutions.com/wp-content/uploads/2022/10/EDGE BI User Solutions.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/rmdb11.png"
                    alt="Resource Manager DB Processing Menu"
                    className="h-auto max-w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* In Depth Tab */}
          {activeTab === 'in-depth' && <RMDBInDepthContent />}

          {/* Quick Start Tab */}
          {activeTab === 'quick-start' && (
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Quick Start</h2>
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
                  className="h-auto max-w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}

          {/* EDGEBI Tab */}
          {activeTab === 'edgebi' && <EDGEBIContent />}
        </div>
      </section>

      {/* Features Section */}
      <RMDBFeatureList />

      {/* Awards Section */}
      <section>
        <div className="container mx-auto">
          <Card className="mt-6 rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 text-card-foreground shadow">
            <CardContent className="p-8 text-center">
              <h3 className="mb-6 text-2xl font-bold text-slate-900">
                CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
              </h3>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                alt="Collection of industry and business awards logos"
                className="mx-auto h-auto max-w-full"
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
