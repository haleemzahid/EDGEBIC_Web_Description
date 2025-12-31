'use client';

import Image from 'next/image';
import Link from 'next/link';
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

type TabType = 'summary' | 'quick-start';

export default function ResourceManagerForExcel2Page() {
  const [activeTab, setActiveTab] = useState<TabType>('summary');

  const tabs = [
    { id: 'summary' as TabType, label: 'Summary' },
    { id: 'in-depth' as const, label: 'In Depth', href: '/resource-manager-for-excel-in-depth' },
    { id: 'quick-start' as TabType, label: 'Quick Start' }
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

              {/* Navigation Tabs - Below Text */}
              <div className="inline-flex flex-wrap items-center gap-6 text-lg">
                {tabs.map((tab) => (
                  tab.href ? (
                    <Link
                      key={tab.id}
                      href={tab.href}
                      className="text-slate-700 transition-colors hover:text-cyan-500"
                    >
                      {tab.label}
                    </Link>
                  ) : (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`transition-colors ${activeTab === tab.id
                        ? 'font-semibold text-cyan-500'
                        : 'text-slate-700 hover:text-cyan-500'
                        }`}
                    >
                      {tab.label}
                    </button>
                  )
                ))}
              </div>
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

      {/* Tab Content */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          {activeTab === 'summary' && (
            <div className="space-y-8">

              {/* Screenshot */}
              <div className="flex justify-center">
                <Image
                  src="/images/Edgebic/2022-07/RMX.png"
                  alt="Resource Manager for Excel Screenshot"
                  width={800}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
              </div>

              {/* Testimonial */}
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-6">
                  <blockquote>
                    <p className="mb-4 text-slate-700 italic leading-relaxed">
                      "Adaptable and Flexible: Resource Manager for Excel is a great solution
                      for manufacturers who are not ready for a full-blown MRPII, ERP, or Shop
                      Management System but realize the value of effective scheduling and planning.
                      Resource Manager for Excel is unique in that it easily adapts to the way
                      people are running their business today."
                    </p>
                    <footer className="text-sm font-semibold text-slate-900">
                      — Mike Parks, Director of Georgia Tech's CMIT,
                      <span className="block text-slate-600 font-normal">
                        an affiliate of the NIST Manufacturing Extension Partnership
                      </span>
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>

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
            </div>
          )}

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
