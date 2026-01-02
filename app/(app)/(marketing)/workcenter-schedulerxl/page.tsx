'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Check } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

// Lazy load In Depth content
const WCXLInDepthContent = dynamic(
  () => import('@/components/marketing/sections/wcxl-in-depth-content').then((mod) => ({ default: mod.WCXLInDepthContent })),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-slate-100 rounded-lg" /> }
);

const features = [
  'Excel Add-On',
  'Forward Scheduling',
  'KPI Reporting',
  'Routings and Job Scheduling',
  'Linear Routings',
  'Protected and Secure',
  'Finite Capacity Scheduling',
  'Rescheduling on demand',
  'Gantt Chart Schedule'
];

type TabType = 'summary' | 'in-depth' | 'quick-start' | 'live-demo';

export default function WorkcenterSchedulerXLPage() {
  const [activeTab, setActiveTab] = useState<TabType>('summary');

  const tabs = [
    { id: 'summary' as TabType, label: 'Summary' },
    { id: 'in-depth' as TabType, label: 'In Depth' },
    { id: 'quick-start' as TabType, label: 'Quick Start' },
    { id: 'live-demo' as TabType, label: 'Live Demo' }
  ];

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Text and Video Side by Side */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Side - Header and Text */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">
                Workcenter Scheduler XL
              </h1>
              <p className="text-slate-700 leading-relaxed">
                Workcenter Scheduler XL (WCXL) is an Excel based simple scheduler for
                getting visibility on workcenter loading to ship on time. Check out the
                videos for a quick overview, then download the fully functional trial
                or — better yet, simply schedule a live demo, customized with your
                sample data, and let us review your application needs.
              </p>
            </div>

            {/* Video - Right Side */}
            <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/fvvMj__YHbw"
                title="Workcenter Scheduler XL Video"
                className="size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="pt-6" aria-label="Product information tabs">
        <div className="container mx-auto max-w-7xl px-4">
          <div
            className="flex flex-wrap justify-center gap-6 text-[18px]"
            role="tablist"
            aria-label="Workcenter Scheduler XL sections"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 rounded-sm px-2 py-1 ${activeTab === tab.id
                  ? 'font-semibold'
                  : 'text-slate-700 hover:text-slate-900'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <section className="pt-6" aria-label="Tab content">
        <div className="container mx-auto max-w-7xl px-4">
          {activeTab === 'summary' && (
            <div className="space-y-8">
              {/* Section Title */}
              <h2 className="text-2xl font-bold text-slate-900">
                WORKCENTER SCHEDULER XL: SUMMARY
              </h2>

              {/* Description Text */}
              <p className="leading-relaxed text-slate-700">
                Workcenter Scheduler XL (WCXL), an Excel Add-On, offers a finite capacity scheduler
                for job shops, fabricators, service/repair shops, that have a simple, linear sequence
                of work that can be scheduled forward from a start date. (NOTE: For more robust planning,
                scheduling, tracking, and integration options please review Resource Manager-DB).
              </p>

              {/* Easy Method Section */}
              <div>
                <p className="mb-4 leading-relaxed text-slate-700">
                  WCXL provides an easy method for:
                </p>
                <ul className="list-inside list-disc space-y-2 text-slate-700 ml-4">
                  <li>Entering resource definitions.</li>
                  <li>Building jobs, with labor and workcenter routing details.</li>
                  <li>Performing &apos;what-ifs&apos; with different plans, resulting in feasible and effective production schedules.</li>
                </ul>
              </div>

              {/* Screenshot with Testimonial */}
              <div className="grid items-start gap-8 lg:grid-cols-2">
                <div>
                  <blockquote className="border-l-4 border-blue-500 pl-6">
                    <p className="mb-2 italic text-slate-700">
                      &quot;With Workcenter Scheduler XL, we knew: Daily schedules for
                      Workcenters, Capacity requirements including Bottlenecks and
                      Backlog, Strategic management information for optimizing
                      on-time performance&quot;
                    </p>
                    <footer className="text-sm font-semibold text-slate-900">
                      — Dan Barich, GE Railcar Services
                    </footer>
                  </blockquote>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/Edgebic/2022-07/wCXL-1024x342.png"
                    alt="Workcenter Scheduler XL Screenshot"
                    width={600}
                    height={200}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="mb-4 text-xl font-bold text-slate-900">Features</h2>
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-700">
                      <Check className="size-4 text-green-600 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video Section */}
              <div className="flex justify-center">
                <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-lg shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/L4wDboRFU6k"
                    title="Workcenter Scheduler XL Demo Video"
                    className="size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'in-depth' && <WCXLInDepthContent />}

          {activeTab === 'quick-start' && (
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Quick Start</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-600">
                  <p>
                    Get started with Workcenter Scheduler XL quickly and easily. Our Quick
                    Start guide provides step-by-step instructions to help you set up and
                    configure WCXL for your specific needs.
                  </p>
                  <p>
                    Download the comprehensive Quick Start PDF guide to begin your journey
                    with WCXL.
                  </p>
                  <a
                    href="/pdf/RMXQuickStart.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                  >
                    Download Quick Start Guide (PDF)
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/Edgebic/2022-07/wCXL-1024x342.png"
                  alt="Workcenter Scheduler XL Quick Start interface"
                  width={600}
                  height={200}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {activeTab === 'live-demo' && (
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Live Demo</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-600">
                  <p>
                    See Workcenter Scheduler XL in action! Schedule a live demo with our team
                    to experience how WCXL can transform your production planning and
                    scheduling processes.
                  </p>
                  <p>
                    We can even use your data in its current form to show you exactly how
                    WCXL will work for your specific operations – RISK FREE!
                  </p>
                  <a
                    href="https://calendly.com/mudasirnadeem7979/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                  >
                    Schedule a Live Demo
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/Edgebic/2022-07/WCXL-GUY.png"
                  alt="Workcenter Scheduler XL interface preview for live demo"
                  width={400}
                  height={300}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
