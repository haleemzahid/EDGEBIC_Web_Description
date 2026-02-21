'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, CheckCircle, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { YouTubeFacade } from '@/components/ui/youtube-facade';
import { RMXQuickStartContent } from '@/components/marketing/rmx-quick-start-content';

const features = [
  'Excel add-On',
  'Routings and Job Scheduling',
  'Finite Capacity Scheduling',
  'Forward & Reverse Scheduling',
  'Bills-Of-Material',
  'Robust Routings',
  'Basic MRP (Material Requirements Planning)',
  'Large data model support',
  'Powerful and fast scheduling engine'
];

type TabType = 'summary' | 'quick-start' | 'videos' | 'free-trial';

export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('summary');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hearAbout: ''
  });

  const tabs = [
    { id: 'summary' as TabType, label: 'Summary' },
    { id: 'quick-start' as TabType, label: 'Quick Start' },
    { id: 'videos' as TabType, label: 'Videos' },
    { id: 'free-trial' as TabType, label: 'Free Trial' }
  ];

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Text and Image Side by Side */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Side - Header and Text */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Resource Manager For Excel</h1>
              <p className="leading-relaxed text-slate-700">
                Resource Manager for Excel (RMX) offers MRP and Shop
                Scheduling on a flexible and powerful platform. Ambitious
                Operations Management students can use RMX to gain valuable
                hands-on experience in mastering important skills in many
                areas of Manufacturing Planning, Scheduling, and Execution.
              </p>
              <p className="leading-relaxed text-slate-700">
                With RMX supporting up to a million rows of data, and with
                Excel 360 fully cloud compatible, you can even tackle big data
                applications and share results on the web. A fully functional
                free trial is available for immediate download with access to
                user manual, quick start tutorial, and a full set of training
                videos.
              </p>
              <p className="leading-relaxed text-slate-700">
                Keep <strong><em>US</em></strong> in mind when you are fully engaged at work and looking for
                tools to improve your production scheduling. Resource Manager-DB
                is a wonderful upgrade of RMX and is a strategic complement to
                other plant systems for APS and MES applications.
              </p>
            </div>

            {/* Right Side - Video */}
            <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
              <YouTubeFacade
                videoId="DRWDNVq31l4"
                title="Resource Manager For Excel Video"
                className="size-full"
                useBluePlayButton
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav
        className="pt-8 bg-gradient-to-b from-slate-50 to-white"
        aria-label="Student resource tabs"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div
            className="flex flex-wrap justify-start gap-2"
            role="tablist"
            aria-label="Student resource sections"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id ? true : undefined}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`transition-all duration-200 focus:outline-none px-8 py-4 text-[16px] font-semibold rounded-t-xl border-2 border-b-0 relative ${activeTab === tab.id
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
      <section className="pt-6" aria-label="Tab content">
        <div className="container mx-auto max-w-7xl px-4">
          {/* ==================== SUMMARY TAB ==================== */}
          {activeTab === 'summary' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">
                RESOURCE MANAGER FOR EXCEL: SUMMARY
              </h2>

              <p className="leading-relaxed text-slate-700">
                Resource Manager for Excel (RMX) features a Bill Of Resource
                (BOR) that allows any combination of Workcenters and/or
                Products. RMX is ideal for companies who have no formal systems
                (ERP, MRP, etc.) as tool to plan for and implement those
                systems, or to use to fill in any existing gaps for production
                scheduling. With the BOR concept, you can manage both Material
                Requirements Planning as well as Production Planning and
                Scheduling considering Finite Capacity. For those applications
                that have a need for multiple concurrent users, improved
                security (over Excel), seamless integration with other systems,
                and advanced planning and scheduling options, Resource
                Manager-DB (RMDB) is the best choice.
              </p>

              {/* Quote and Screenshot */}
              <div className="grid items-start gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-semibold">
                    &ldquo;Adaptable and Flexible&rdquo;
                  </h3>
                  <p className="leading-relaxed text-slate-700">
                    Resource Manager for Excel is a great solution for
                    manufacturers who are not ready for a full-blown MRPII, ERP,
                    or Shop Management System but realize the value of effective
                    scheduling and planning. Resource Manager for Excel is
                    unique in that it easily adapts to the way people are
                    running their business today.
                  </p>
                  <p className="mt-4 leading-relaxed text-slate-700">
                    <span className="italic">
                      Mike Parks, Director of Georgia Tech&apos;s CMIT, an affiliate
                      of the NIST Manufacturing Extension Partnership.
                    </span>
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
                <h2 className="mb-4 text-xl font-bold text-slate-900">
                  Features
                </h2>
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <Check className="size-4 shrink-0 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Student Free Trial Form */}
              <div className="mx-auto max-w-2xl">
                <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
                  Student Free Trial
                </h2>
                <div className="rounded-2xl border bg-white p-8 shadow-lg">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      window.location.href = '/students-free-trial';
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="hearAbout" className="mb-1 block text-sm font-medium text-slate-700">
                        Where did you hear about <strong><em>US</em></strong>?
                      </label>
                      <select
                        id="hearAbout"
                        value={formData.hearAbout}
                        onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="google">Google Search</option>
                        <option value="press">Press Release</option>
                        <option value="referral">Referral</option>
                        <option value="social">Social Media</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                    <Button type="submit" size="lg" className="w-full text-lg">
                      Submit
                    </Button>
                  </form>
                </div>
              </div>

              {/* Video */}
              <div className="flex justify-center">
                <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-lg shadow-lg">
                  <YouTubeFacade
                    videoId="74uO2H-eevc"
                    title="Resource Manager for Excel Demo Video"
                    className="size-full"
                    useBluePlayButton
                  />
                </div>
              </div>

              {/* In-Depth: Overview */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Overview</h2>
                <p className="mb-4 leading-relaxed text-slate-700">
                  Resource Manager is the only low-cost, planning and scheduling
                  solution that works for all manufacturing enterprises. There are
                  two versions available, depending on your needs:
                </p>
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">RM-X</h3>
                    <p className="leading-relaxed text-slate-600">
                      RM-X is an add-on to Excel (version 97 and greater) and is
                      designed for single concurrent users who are familiar with
                      Excel. A fully functional trial is available for immediate
                      download.
                    </p>
                    <p className="leading-relaxed text-slate-600">
                      By combining ease-of-use for small to medium sized manufacturing
                      operations with powerful reporting and open integration for
                      larger operations, Resource Manager guarantees the power and
                      productivity of high-end systems without the complications and
                      failure rate.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">Resource Manager-DB (RMDB)</h3>
                    <p className="leading-relaxed text-slate-600">
                      Also, Resource Manager-DB (RMDB), an elegant upgrade from RMX,
                      written in Visual Basic, utilizes and includes a run-time
                      version of Microsoft Access database and is also available with
                      SQL Server compatibility. Resource Manager DB (RMDB) contains
                      all the functionality of RM-X. Just like RM-X, Resource Manager
                      DB leverages Excel for reporting.
                    </p>
                  </div>
                </div>
                <p className="mt-4 leading-relaxed text-slate-700">
                  These combined offerings provide you unsurpassed flexibility for
                  leveraging Excel on local PCs, and sharing data across a network.
                  Finally, you can achieve your goals of an affordable planning and
                  scheduling solution that quickly adapts to your needs.
                </p>
              </div>

              {/* Works The Way You Do */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Works The Way You Do</h2>
                <p className="leading-relaxed text-slate-700">
                  Resource Manager is the only solution that is designed to adapt
                  to your specific needs, addressing the key issues facing your
                  operation.
                </p>
              </div>

              {/* Immediate, Guaranteed Benefits */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Immediate, Guaranteed Benefits</h2>
                <p className="mb-4 leading-relaxed text-slate-700">
                  Resource Manager delivers the help you need to effectively plan
                  and schedule your company&apos;s resources, without the time, money
                  and upkeep of traditional options.
                </p>
                <p className="mb-4 leading-relaxed text-slate-700">
                  Finally, you can quit struggling with time consuming decisions
                  such as what to buy, what to make, when to buy it, and when to
                  make it.
                </p>
                <p className="leading-relaxed text-slate-700">
                  Resource Manager adds powerful MRP scheduling, planning and/or
                  tracking capabilities to your existing system (be it manual or
                  other), for less than any other option – satisfaction guaranteed.
                </p>
              </div>

              {/* Best of All */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Best of All</h2>
                <p className="leading-relaxed text-slate-700">
                  Resource Manager runs with Microsoft Office, so you are already
                  familiar with entering data, printing reports, graphing, and more!
                </p>
              </div>
            </div>
          )}

          {/* ==================== QUICK START TAB ==================== */}
          {activeTab === 'quick-start' && <RMXQuickStartContent />}

          {/* ==================== VIDEOS TAB ==================== */}
          {activeTab === 'videos' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Training Videos
              </h2>
              <p className="leading-relaxed text-slate-700">
                Watch these videos to learn how to use Resource Manager for Excel
                for manufacturing planning and scheduling.
              </p>

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-3">
                  <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
                    <YouTubeFacade
                      videoId="DRWDNVq31l4"
                      title="Resource Manager For Excel Introduction"
                      className="size-full"
                      useBluePlayButton
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Introduction to Resource Manager for Excel
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
                    <YouTubeFacade
                      videoId="74uO2H-eevc"
                      title="Resource Manager For Excel Demo"
                      className="size-full"
                      useBluePlayButton
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Resource Manager for Excel Demo
                  </h3>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/videos/#resource-manager-excel"
                  className="inline-flex items-center gap-2 rounded bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
                >
                  View All Training Videos
                </Link>
              </div>
            </div>
          )}

          {/* ==================== FREE TRIAL TAB ==================== */}
          {activeTab === 'free-trial' && (
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Student Free Trial Download
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-600">
                  <p>
                    Gain valuable hands-on experience in Manufacturing Planning,
                    Scheduling, and Execution with a free student copy of
                    Resource Manager for Excel.
                  </p>
                  <div className="rounded-lg border bg-slate-50 p-4">
                    <h3 className="mb-3 font-semibold text-slate-900">
                      Sign up to download trials and start:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 shrink-0 text-green-500" />
                        Improving on-time deliveries
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 shrink-0 text-green-500" />
                        Increasing production efficiency
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 shrink-0 text-green-500" />
                        Identifying and managing bottlenecks
                      </li>
                    </ul>
                  </div>
                  <p>
                    Keep <strong><em>US</em></strong> in mind when you are fully engaged at work and looking
                    for tools to improve your production scheduling. Resource Manager-DB
                    is a wonderful upgrade of RMX and is a strategic complement to
                    other plant systems for APS and MES applications.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/Edgebic/2022-07/ops-1024x768.png"
                  alt="Operations Management textbook"
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
    </div>
  );
}
