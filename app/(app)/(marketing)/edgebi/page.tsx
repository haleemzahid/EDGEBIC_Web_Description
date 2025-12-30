'use client';

import * as React from 'react';
import Image from 'next/image';

type TabType = 'summary' | 'rmdb' | 'live-demo';

// Video Player Component
function VideoPlayer({
  videoUrl,
  title,
  onPlayStateChange
}: {
  videoUrl: string;
  title: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    onPlayStateChange?.(true);
  };

  const handlePause = () => {
    onPlayStateChange?.(false);
  };

  const handleEnded = () => {
    onPlayStateChange?.(false);
  };

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      title={title}
      className="absolute inset-0 size-full rounded-lg object-cover"
      controls
      playsInline
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
    >
      Your browser does not support the video tag.
    </video>
  );
}

export default function EDGEBIPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState<TabType>('summary');
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  const tabs = [
    { id: 'summary' as TabType, label: 'Summary' },
    { id: 'rmdb' as TabType, label: 'RMDB' },
    { id: 'live-demo' as TabType, label: 'Live Demo' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left - Text Content */}
            <div>
              <h1 className="mb-6 text-3xl font-bold md:text-4xl">
                Welcome to EDGEBI
              </h1>
              <p className="mb-6 text-md leading-relaxed text-slate-600">
                EDGEBI can be installed and configured per user preferences. EDGEBI installs
                separately from RMDB but they share the same database with advanced security
                options, its easy to configure view only users or power users who can make
                direct changes to schedule. Such as: Change length of any job segment, block
                out capacity due to any event either planned or unplanned, create custom
                reporting, add notes to any job, at any workcenter, as desired, and so much
                more. Contact <em className="font-semibold">US</em> for a demo focused on your operations.
              </p>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-md transition-colors ${activeTab === tab.id
                      ? 'font-semibold text-cyan-500'
                      : 'text-slate-700 hover:text-cyan-500'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Video */}
            <div>
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <div className="relative aspect-video">
                  <VideoPlayer
                    videoUrl="/videos/edgebi-updated-thumbnail.mp4"
                    title="EDGEBI Demo"
                    onPlayStateChange={setIsVideoPlaying}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-16">
              {/* Overview Header with Image Side by Side */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl">Overview</h2>
                  <p className="text-md text-slate-600">
                    Welcome to EDGEBI – A graphical overlay for Resource Manager DB EDGEBI stands for Enhanced Drag-n-drop Graphical Environment with Business Intelligence
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/Edgebic/2022-10/f1.png"
                    alt="EDGEBI Screenshot - Resource Manager DB interface"
                    width={800}
                    height={600}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* 2nd Section - Image (left) - Text (right) */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <Image
                    src="/images/Edgebic/2022-10/f2.png"
                    alt="EDGEBI Schedule Management Interface"
                    width={800}
                    height={600}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <p className="mb-4 text-[18px] text-slate-700">
                    Finally, you can manage your production scheduling with an intuitive graphical approach that can be easily customized.
                  </p>
                  <p className="text-[18px] text-slate-700">
                    EDGEBI is the ideal interface for managing the schedule produced by Resource Manager DB.
                  </p>
                </div>
              </div>

              {/* 3rd Section - Text (left) - Image (right) */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-[18px] text-slate-700">
                    Check out the color-coded schedule for up to the minute status on any job. Drag and drop any job segment from one workcenter to another workcenter with a simple click of a mouse, resize any segment based on real time issues – taking longer than planned, or shorter, you can even block out capacity for any downtime or maintenance event. Check out capacity utilization graph, finally press update button and reschedule to have schedule reflect reality.
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/Edgebic/2022-10/f3.png"
                    alt="Heat Map - Color-coded capacity utilization"
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* 4th Section - Image (left) - Text (right) */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <Image
                    src="/images/Edgebic/2022-10/f4.png"
                    alt="Schedule Key Dates Reports"
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <p className="mb-4 text-[18px] text-slate-700">
                    View the Heat Map to see your capacity loading, for entire schedule, at a glance.
                  </p>
                  <p className="text-[18px] text-slate-700">
                    Run the Schedule Key Dates reports, with an export to Excel to view all activity the way you want.
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <p className="mb-4 text-[18px] text-slate-700">
                  Now:  <button type="button" onClick={() => setActiveTab('live-demo')} className="font-semibold text-cyan-600 hover:text-cyan-700"> Contact US</button> to discuss your specific application and challenges and let us prove out the solution with a free Proof Of Concept using your data!
                </p>
                <p className="text-[18px] text-slate-700">
                  With solutions for any application and budget, from job shops on up, better production scheduling is only a click away.
                </p>
              </div>
            </div>
          )}

          {/* RMDB Tab */}
          {activeTab === 'rmdb' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold ">RESOURCE MANAGER DB: SUMMARY</h2>
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
                    src="/images/Edgebic/2022-07/RMDB-EDGE2-1024x483.png"
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
                    >
                      <source
                        src="/videos/edge-bi-user-solutions.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="/images/Edgebic/2022-07/rmdb11.png"
                    alt="Resource Manager DB Processing Menu"
                    className="h-auto max-w-full rounded-lg shadow-lg"
                  />
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
                    See EDGEBI and Resource Manager-DB in action! Schedule a live demo with our team to experience how our solutions can transform your production planning and scheduling processes.
                  </p>
                  <p>
                    We can even use your data in its current form to show you exactly how EDGEBI and RMDB will work for your specific operations – RISK FREE!
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
                  alt="EDGEBI Live Demo"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center">
              <h3 className="mb-6 text-2xl font-bold text-slate-900">
                CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
              </h3>
              <Image
                src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                alt="Collection of industry and business awards logos"
                width={1024}
                height={128}
                className="mx-auto h-auto max-w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
