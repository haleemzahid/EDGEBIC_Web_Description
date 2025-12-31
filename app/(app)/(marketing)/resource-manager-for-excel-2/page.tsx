'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Lazy load In Depth content
const RMXInDepthContent = dynamic(
  () => import('@/components/marketing/sections/rmx-in-depth-content').then((mod) => ({ default: mod.RMXInDepthContent })),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-slate-100 rounded-lg" /> }
);
import { useState } from 'react';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  'Excel add-On',
  'Routings and Job Scheduling',
  'Finite Capacity Scheduling',
  'Forward & Reverse Scheduling',
  'Bills-Of-Material',
  'Robust Routings',
  'Basic MRP',
  'Large data model support',
  'Powerful scheduling engine'
];

type TabType = 'summary' | 'in-depth' | 'quick-start' | 'live-demo';

export default function ResourceManagerForExcel2Page() {
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
            {/* Left Side - Header, Text and Tabs */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">
                Resource Manager For Excel
              </h1>
              <p className="text-slate-700 leading-relaxed">
                Resource Manager for Excel (RMX) offers basic MRP and Shop Scheduling
                that is quick to implement and very affordable. RMX is designed to adapt
                to your specific needs and utilizes all the powerful features of Excel
                for data integration, customization, sharing and reporting. A fully
                functional trial is available for immediate download and/or schedule a
                live demo with us to see it in action for your application.
              </p>
            </div>

            {/* Video - Right Side */}
            <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/DRWDNVq31l4"
                title="Resource Manager For Excel Video"
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
            aria-label="Resource Manager Excel sections"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id ? 'true' : 'false'}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 rounded-sm px-2 py-1 ${
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
      </nav>

      {/* Tab Content */}
      <section className="pt-6" aria-label="Tab content">
        <div className="container mx-auto max-w-7xl px-4">
          {activeTab === 'summary' && (
            <div className="space-y-8">
              {/* Description Text */}
              <p className="leading-relaxed text-slate-900">
                Resource Manager for Excel (RMX) features a Bill Of Resource (BOR) that allows any combination of
                Workcenters and/or Products. RMX is ideal for companies who have no formal systems (ERP, MRP, etc.) as
                tool to plan for and implement those systems, or to use to fill in any existing gaps for production scheduling.
                With the BOR concept, you can manage both Material Requirements Planning as well as Production Planning
                and Scheduling considering Finite Capacity.. For those applications that have a need for multiple concurrent
                users, improved security (over Excel), seamless integration with other systems, and advanced planning and
                scheduling options, Resource Manager-DB (RMDB) is the best choice.
              </p>

              {/* Screenshot with Adaptable and Flexible Quote */}
              <div className="grid items-start gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-cyan-500">"Adaptable and Flexible"</h3>
                  <p className="leading-relaxed text-slate-900">
                    Resource Manager for Excel is a great solution for
                    manufacturers who are not ready for a full-blown
                    MRPII, ERP, or Shop Management System but realize
                    the value of effective scheduling and planning.
                    Resource Manager for Excel is unique in that it easily
                    adapts to the way people are running their business
                    today".
                  </p>
                  <p className="mt-4 leading-relaxed text-slate-900">
                    <span className="italic">Mike Parks, Director of Georgia Tech's CMIT, an
                    affiliate of the NIST Manufacturing Extension
                    Partnership.</span>
                  </p>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/Edgebic/2022-07/RMX.png"
                    alt="Resource Manager for Excel Screenshot"
                    width={600}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="mb-4 text-xl font-bold text-slate-900">Features</h2>
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-900">
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
                    src="https://www.youtube.com/embed/74uO2H-eevc"
                    title="Resource Manager for Excel Demo Video"
                    className="size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'in-depth' && <RMXInDepthContent />}

          {activeTab === 'quick-start' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Quick Start Guide</h2>
              <p className="text-slate-700 leading-relaxed">
                Get started with Resource Manager for Excel in minutes. Download the free trial
                and follow our step-by-step guide to begin optimizing your production scheduling.
              </p>
              <div className="flex gap-4">
                <Link href="/product-downloads">
                  <Button className="bg-cyan-500 hover:bg-cyan-600">
                    Download Free Trial
                  </Button>
                </Link>
                <Link href="/resource-manager-for-excel-in-depth">
                  <Button variant="outline">
                    View Documentation
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'live-demo' && (
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Live Demo</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-600">
                  <p>
                    See Resource Manager for Excel in action! Schedule a live demo with our team
                    to experience how RMX can transform your production planning and
                    scheduling processes.
                  </p>
                  <p>
                    We can even use your data in its current form to show you exactly how
                    RMX will work for your specific operations – RISK FREE!
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
                  src="/images/Edgebic/2022-07/RMX.png"
                  alt="Resource Manager for Excel interface preview for live demo"
                  width={800}
                  height={500}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
            <CardContent className="p-6 text-center">
              <h3 className="mb-4 text-xl font-bold text-slate-900">
                CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
              </h3>
              <Image
                src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                alt="Collection of industry and business awards logos"
                width={1024}
                height={128}
                className="mx-auto h-auto max-w-full"
                loading="lazy"
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
