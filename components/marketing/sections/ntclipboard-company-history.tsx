'use client';

import React from 'react';
import { Award, Building, Calendar, Globe, Rocket, Users } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Card, CardContent } from '@/components/ui/card';

export function NTClipboardCompanyHistory(): React.JSX.Element {
  const milestones = [
    {
      year: '2022',
      icon: <Globe className="size-6" />,
      title: 'EDGE & Visual Scheduler Cloud',
      description:
        'Released EDGE (Enhanced Drag-n-Drop Graphical Environment) for Resource Manager-DB with network PC compatibility, powerful graphical and calendar views, drag-and-drop job segments between workcenters, and time scales from minutes to years. Released Visual Scheduler for the Cloud combining SweetRP and Visual Scheduler.net with powerful Gantt Charts, worker assignments, and finite capacity constraints.',
      highlight: 'Modern Innovation'
    },
    {
      year: '2016',
      icon: <Rocket className="size-6" />,
      title: '25 Year Anniversary & Recognition',
      description:
        'Celebrated 25 Year Anniversary. CIO-Applications selected User Solutions as one of only 25 companies transforming the ERP space. Integrated OpenSolver (Excel-compatible optimization software) for first combined optimization and production scheduling package. Added sliding window workcenter monitoring and MRP Lot/Serial Tracking for pharmaceutical compliance.',
      highlight: 'Silver Anniversary'
    },
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
      <div className="container py-6">
        <SiteHeading
          badge="Company History"
          title="Providing Production Planning and Scheduling Solutions since 1991"
          description="Over three decades of innovation in manufacturing resource planning and production scheduling"
        />

        <div className="mx-auto mt-8 max-w-4xl">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-orange-300 via-orange-500 to-orange-700 dark:from-orange-400 dark:via-orange-500 dark:to-orange-600 md:left-1/2" />

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative mb-6 flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:justify-between`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 top-1/2 z-10 flex size-4 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 ring-4 ring-white dark:ring-slate-900 md:left-1/2 md:-translate-x-1/2" />

                {/* Content */}
                <div
                  className={`ml-20 w-full md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                    }`}
                >
                  <div className="rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 p-6 dark:from-slate-900 dark:to-slate-800">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-full bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400">
                        {milestone.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {milestone.year}
                        </div>
                        <div className="text-sm font-medium text-orange-500 dark:text-orange-300">
                          {milestone.highlight}
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                      {milestone.title}
                    </h3>

                    <p className="text-slate-700 dark:text-slate-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden w-5/12 md:block" />
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 text-center">
            <div className="rounded-3xl border bg-gradient-to-br from-orange-50 to-red-50 p-8 dark:from-orange-900/20 dark:to-red-900/20">
              <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                Our Legacy & Future
              </h3>
              <p className="mb-4 text-lg text-slate-700 dark:text-slate-300">
                From our founding in 1991 to today, User Solutions has
                consistently delivered innovative, affordable, and flexible
                manufacturing solutions. We've evolved from Lotus 1-2-3
                templates to cutting-edge cloud-based systems while maintaining
                our core commitment to customer success.
              </p>
              <p className="text-xl font-semibold text-orange-600 dark:text-orange-400">
                30+ Years of Production Planning Excellence - Here's to the
                Future!
              </p>
            </div>
          </div>

          {/* Awards Section */}
          <Card className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-8 text-center">
              <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
              </h3>
              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  className="h-auto max-w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </GridSection>
  );
}
