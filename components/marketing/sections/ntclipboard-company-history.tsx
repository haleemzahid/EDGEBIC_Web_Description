'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Building, Calendar, Globe, Rocket, Users, Target, RefreshCw, Sliders, Heart } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function NTClipboardCompanyHistory(): React.JSX.Element {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const milestones = [
    {
      year: '2015',
      icon: <Award className="size-6" />,
      title: 'Construction Industry Adaptation',
      description:
        'Partnered with FC Modular to adapt Resource Manager-DB for Modular Construction Industry. Used Office/Excel 365 on tablets for foreman task management with quality checks. Touch screen updates on ruggedized tablets provided real-time status for 26 apartments per floor across 34 floors, meeting Brooklyn Building Code requirements.',
      highlight: 'Industry Expansion'
    },
    {
      year: '2014',
      icon: <Users className="size-6" />,
      title: 'Advanced Scheduling Tools',
      description:
        'Enhanced SweetRP Cloud Based Resource Planner. New Resource Manager-DB version included advanced production scheduling tools: alternate workcenters, alternate routings, parallel workcenters, and estimates and quoting capabilities.',
      highlight: 'Advanced Features'
    },
    {
      year: '2013',
      icon: <Building className="size-6" />,
      title: 'Visual Scheduler .Net',
      description:
        'Announced Visual Scheduler, a .Net offering featuring graphical replacement of standard whiteboards for scheduling. Single screen management of all job aspects. Partnered with Director yacht service in Florida for drag-and-drop job intelligence overlay on blueprint layouts for dock slips.',
      highlight: 'Visual Innovation'
    },
    {
      year: '2012',
      icon: <Calendar className="size-6" />,
      title: 'SweetRP Cloud Launch',
      description:
        'Announced SweetRP, the first affordable and easy to use Cloud Based Resource Planner. Users could manage Workcenters (people, machines, workcenters) and materials for production scheduling. Featured KISS (Keep It Simple Scheduling) with simplified finite capacity scheduling for everyday users.',
      highlight: 'Cloud Pioneer'
    },
    {
      year: '2011',
      icon: <Globe className="size-6" />,
      title: 'Executive Information Systems',
      description:
        'Announced new .NET dashboard add-on for Resource Manager-DB called Executive Information Systems (EIS) for creating graphical production scheduling reports. EIS could run independent of RMDB and consolidate data from various systems. Successfully integrated with Fourth Shift, Infor, JD Edwards, and others.',
      highlight: 'Dashboard Innovation'
    },
    {
      year: '2010',
      icon: <Rocket className="size-6" />,
      title: 'Million Row Capacity',
      description:
        'Released new versions of Resource Manager for Excel and Noah compatible with Office 2010+. With million row capacity, Resource Manager for Excel became the quickest MRP engine on the market! Joined Peach Tree/Sage development program.',
      highlight: 'Performance Leader'
    },
    {
      year: '2009',
      icon: <Award className="size-6" />,
      title: 'Sandia Labs & Custom Solutions',
      description:
        'Created customized .NET rewrite of Resource Manager-DB for Sandia National Laboratories for strategic weapons development and manufacturing planning/scheduling. Developed custom .NET applications for injection molding job tracking and heat treat oven optimal loading.',
      highlight: 'Defense & Custom'
    },
    {
      year: '2008',
      icon: <Users className="size-6" />,
      title: 'Customer-Driven Innovation',
      description:
        'New Resource Manager-DB versions driven by excellent user feedback. Customers found value in systems that fit their workflow rather than forcing adaptation. Features designed to be easily configurable, allowing customization with minimal effort and maintenance.',
      highlight: 'User Focus'
    },
    {
      year: '2007',
      icon: <Building className="size-6" />,
      title: 'Exact Software Partnership',
      description:
        'Exact Software invited User Solutions to Engage User Conference and Service Summit to demonstrate Resource Manager-DB value for Macola clients. Successfully integrated with Made To Manage, Peachtree, DMSi, custom Access Systems, Epicor, Microsoft Great Plains Dynamics, JD Edwards, SAP, and more.',
      highlight: 'ERP Excellence'
    },
    {
      year: '2006',
      icon: <Calendar className="size-6" />,
      title: '15 Year Milestone',
      description:
        'User Solutions celebrated 15 years in business, serving thousands of customers worldwide with affordable and flexible Excel compatible manufacturing and business solutions.',
      highlight: 'Anniversary'
    },
    {
      year: '2005',
      icon: <Globe className="size-6" />,
      title: 'Core Products Enhancement',
      description:
        'Released new versions of all core products: Resource Manager for Excel,  , and Resource Manager-DB. RMDB offered choice of MS JET or SQL Server backends. Significant Advanced Planning and Scheduling improvements from increased customer feedback.',
      highlight: 'Product Maturity'
    },
    {
      year: '2004',
      icon: <Rocket className="size-6" />,
      title: 'SQL Server & Global Distribution',
      description:
        'Released Microsoft SQL Server compatible Resource Manager-DB. Signed agreement with Digital River for global distribution of Excel templates through hundreds of online complementary software resellers worldwide.',
      highlight: 'Global Reach'
    },
    {
      year: '2003',
      icon: <Award className="size-6" />,
      title: 'Microsoft Partnership',
      description:
        'Continued Resource Manager-DB enhancements. Partnered with Beacham Consulting for Business Partner Network of qualified manufacturing professionals worldwide. Became Certified Microsoft Partner and began developing for SQL Server.',
      highlight: 'Certification'
    },
    {
      year: '2002',
      icon: <Users className="size-6" />,
      title: 'Partnerships & Lean Manufacturing',
      description:
        'Became Exact North America Complementary Software Provider with Macola Link. Partnered with Instruments for Industry (IFI) to add Lean Manufacturing to Resource Manager-DB. Orca Technical Services opened East Coast Lean Training Center.',
      highlight: 'Lean Integration'
    },
    {
      year: '2001',
      icon: <Building className="size-6" />,
      title: 'Resource Manager-DB Launch',
      description:
        'Released Resource Manager-DB written in Visual Basic with Jet Engine runtime database (same as Microsoft Access). Included Resource Manager for Excel as flexible report writer, providing unparalleled flexibility for Excel leverage and network data sharing with Data Integration Wizard.',
      highlight: 'Database Era'
    },
    {
      year: '2000',
      icon: <Calendar className="size-6" />,
      title: 'ERP Integration',
      description:
        'Added complementary services and Data Integration Wizard to Resource Manager for Excel to facilitate integration with ERP systems including MAPICS, JD Edwards, SAP, Macola, and many more.',
      highlight: 'Integration'
    },
    {
      year: '1999',
      icon: <Globe className="size-6" />,
      title: 'Excellence Award',
      description:
        'New Equipment Digest readers voted Resource Manager the Winner for Software in the Excellence In Innovation. Upgraded for Excel and Office 2000, plus added links with QuickBooks and Peachtree Accounting offerings.',
      highlight: 'Recognition'
    },
    {
      year: '1998',
      icon: <Rocket className="size-6" />,
      title: 'MRP2 & NIST Recognition',
      description:
        'Announced Resource Manager v3 for Excel 97 with production feedback capability - first affordable MRP2 system for SMEs. Selected by NIST MEPs as ideal solution for manufacturers starting computerization. Offered turnkey implementation for $5,000-$10,000 vs traditional $50,000-$500,000.',
      highlight: 'Breakthrough'
    },
    {
      year: '1997',
      icon: <Award className="size-6" />,
      title: 'GE Partnership Success',
      description:
        'Announced Resource Manager (version 2) for Excel 97 with 64,000 rows capacity and multi-user capability. Partnered with General Electric Capital – Railcar Services for "Noah" (later  ), improving on-time delivery from 30% to 90%+ managing 200,000 railcars at $20/day - phenomenal ROI.',
      highlight: 'Major Win'
    },
    {
      year: '1996',
      icon: <Calendar className="size-6" />,
      title: 'Resource Manager v1',
      description:
        'User Solutions announced Resource Manager (version 1) for Excel. A complete rewrite (Visual Basic) of Spreadsheet Resource Manager that was compatible with Excel version 5 and 7.',
      highlight: 'Excel Debut'
    },
    {
      year: '1995',
      icon: <Globe className="size-6" />,
      title: 'Microsoft Transition',
      description:
        'User Solutions became a Microsoft Solutions Provider and began converting the Lotus 1-2-3 macro based Spreadsheet Resource Manager to Visual Basic – Applications Edition for Microsoft Excel. Also executed agreement with Novell for including select templates with Quattro Pro and Perfect Office Suite.',
      highlight: 'Platform Shift'
    },
    {
      year: '1994',
      icon: <Rocket className="size-6" />,
      title: 'Spreadsheet MRP Launch',
      description:
        'User Solutions announced Spreadsheet MRP, the first general purpose Material Requirements Planning product that ran with Lotus 1-2-3. APICS reviewed Spreadsheet MRP and called it a "Unique and a Valuable Tool". Later enhanced to Spreadsheet Resource Manager with capacity planning and scheduling.',
      highlight: 'Innovation'
    },
    {
      year: '1993',
      icon: <Award className="size-6" />,
      title: 'Lotus Partnership',
      description:
        "User Solutions became a formal Lotus Business Partner and Lotus Selects (Lotus Development Corporation's Catalog Sales) began carrying User Solutions' templates for resale.",
      highlight: 'Partnership'
    },
    {
      year: '1992',
      icon: <Users className="size-6" />,
      title: 'Product Expansion',
      description:
        'User Solutions acquired additional spreadsheet models for Scheduling and released Spreadsheet Scheduler. They also acquired StatMax, an extensive collection of SPC/SQC templates and announced Spreadsheet QC.',
      highlight: 'Growth'
    },
    {
      year: '1991',
      icon: <Building className="size-6" />,
      title: 'Company Founded',
      description:
        'User Solutions, Inc. is formed as an independent spin-off from Lotus Development Corporation to sell and support Lotus @Factory as well as other products under development at Lotus including the Spreadsheet Operations Manager (a collection of spreadsheet templates still available today).',
      highlight: 'The Beginning'
    }
  ];

  return (
    <GridSection hideVerticalGridLines>
      <div className="container pt-6">
        <SiteHeading
          title="Providing Production Planning and Scheduling Solutions since 1991"
          description="Over three decades of innovation in manufacturing resource planning and production scheduling."
        />

        <div className="mx-auto mt-6 max-w-7xl">
          {/* 2016+ Featured Section */}
          <div className="mb-12">
            <div className="rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-white to-slate-50 p-8 shadow-lg">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mb-6 flex w-full items-center gap-4 text-left transition-opacity hover:opacity-80"
              >
                <div className="flex items-center justify-center rounded-full bg-orange-500 p-3 text-white">
                  <Rocket className="size-8" />
                </div>
                <div className="flex-1">
                  <div className="text-3xl font-bold text-orange-600">2016+</div>
                  <div className="text-lg font-medium text-orange-500">The Modern Era</div>
                </div>
                <div className={`text-orange-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <h3 className="mb-4 text-2xl font-bold text-slate-900">
                Continuing Innovation & Customer Focus
              </h3>

              {isExpanded && (
              <>
              <p className="mb-6 text-lg text-slate-700">
                In the last decade, User Solutions continues to enhance and adapt their flagship offering (Resource Manager DB with EDGE Overlay) to accommodate various customer challenges while at the same time focusing on developing a new generation of powerful but easy to use production planning and scheduling tools on latest technology to take advantage of AI, Mobile, Subscription Based, and more.
              </p>

              <p className="mb-8 text-slate-700">
                With a flexible approach, we are continuing to develop tools for both the smallest manufacturing concerns, folks who basically have no system except perhaps a whiteboard or manual Excel, all the way to Fortune 500 companies who need to fill in serious gaps with their ERP installation.
              </p>

              {/* Two Column Layout: Cards on Left, Image on Right */}
              <div className="mb-8 grid gap-6 lg:grid-cols-2">
                {/* Four Focus Areas - Left Column */}
                <div className="grid gap-6">
                  {/* Focus Area 1 */}
                  <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-full bg-orange-100 p-2 text-orange-600">
                        <Target className="size-5" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">Filling Gaps in ERP</h4>
                    </div>
                    <p className="text-slate-700">
                      Especially for real-time END TO END Supply Chain Visibility! We are seeing more and more customers who had to implement their ERP Systems several times – to account for the dynamics of companies that blend both PROCESS/BATCH type processing all the way to DISCRETE for final processing and shipments. This is where RMDB/EDGE Shines – we can quickly and accurately map out an end-to-end view for any enterprise. This is very common for the Pharmaceutical Industry, but we have seen it in many other applications (Foundry, Lithium Battery Production, Munitions, etc.).
                    </p>
                  </div>

                  {/* Focus Area 2 */}
                  <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-full bg-orange-100 p-2 text-orange-600">
                        <RefreshCw className="size-5" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">Reconfigure on the Fly</h4>
                    </div>
                    <p className="text-slate-700">
                      During COVID, previously known constraints (machines, skilled labor, outside processes) were completely disrupted. For many customers, we were able to completely reconfigure the constraints to match reality – a severe labor constraint. It is remarkable to be able to completely reconfigure a system in hours so the customer can adapt to current realities. We have also integrated Excel Solver and other Linear Programming methods for the most complex problems.
                    </p>
                  </div>

                  {/* Focus Area 3 */}
                  <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-full bg-orange-100 p-2 text-orange-600">
                        <Sliders className="size-5" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">Reasonable Schedules with Instant Overrides</h4>
                    </div>
                    <p className="text-slate-700">
                      There is NO scheduling system that can provide an optimized schedule without human intervention. What can actually be accomplished on any given day depends on who shows up, what material we have, the weather, political environment, and more. There is a massive need for a system that can quickly generate a reasonable schedule but allow for user overrides, any time, and have the system rebalance based on the latest customer override. We are working on major enhancements in this area.
                    </p>
                  </div>

                  {/* Focus Area 4 */}
                  <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-full bg-orange-100 p-2 text-orange-600">
                        <Heart className="size-5" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">Customer is the HERO</h4>
                    </div>
                    <p className="text-slate-700">
                      We start by assuming we know NOTHING about you, your company, or your challenges. Our job is to listen intently to what your environment is, what you believe you need, and work diligently – with YOU all the way. Every manufacturer is different, every worker is different, everyone has their own idea and vision of what could be. Our job is to deliver your vision as best we can, as fast as we can, and as affordably as possible.
                    </p>
                  </div>
                </div>

                {/* Image - Right Column */}
                <div className="flex items-center">
                  <div className="overflow-hidden rounded-2xl border shadow-md">
                    <Image
                      src="/images/Edgebic/2022-07/RMDB-EDGE2-1024x483.png"
                      alt="Resource Manager DB with EDGE Overlay - Modern Production Scheduling"
                      width={1024}
                      height={483}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="rounded-2xl bg-gradient-to-r from-orange-100 to-orange-50 p-6 text-center">
                <p className="mb-4 text-lg font-medium text-slate-800">
                  A system that can quickly generate a reasonable schedule then allow for any overrides and rebalance the entire schedule – that is our main focus. You are welcome to join us in this endeavor!
                </p>
                <Link href="/contact-us">
                  <Button size="lg" className="bg-orange-600 text-white hover:bg-orange-700">
                    Join Us in This Endeavor
                  </Button>
                </Link>
              </div>
              </>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-orange-300 via-orange-500 to-orange-700 md:left-1/2" />

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative mb-6 flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:justify-between`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 top-1/2 z-10 flex size-4 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 ring-4 ring-white md:left-1/2 md:-translate-x-1/2" />

                {/* Content */}
                <div
                  className={`ml-20 w-full md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                    }`}
                >
                  <div className="rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-full bg-orange-100 p-2 text-orange-600">
                        {milestone.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">
                          {milestone.year}
                        </div>
                        <div className="text-sm font-medium text-orange-500">
                          {milestone.highlight}
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-slate-900">
                      {milestone.title}
                    </h3>

                    <p className="text-slate-700">{milestone.description}</p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden w-5/12 md:block" />
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 text-center">
            <div className="rounded-3xl border bg-gradient-to-br from-orange-50 to-red-50 p-8">
              <h3 className="mb-4 text-2xl font-bold text-slate-900">
                Our Legacy & Future
              </h3>
              <p className="mb-4 text-lg text-slate-700">
                From our founding in 1991 to today, User Solutions has
                consistently delivered innovative, affordable, and flexible
                manufacturing solutions. We've evolved from Lotus 1-2-3
                templates to cutting-edge cloud-based systems while maintaining
                our core commitment to customer success.
              </p>
              <p className="text-xl font-semibold text-orange-600">
                35 Years of Production Planning Excellence - Here's to the
                Future!
              </p>
            </div>
          </div>
        </div>
      </div>
    </GridSection>
  );
}
