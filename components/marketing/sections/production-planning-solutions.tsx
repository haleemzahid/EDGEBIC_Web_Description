'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Award,
  CheckCircle,
  Clock,
  Play,
  Settings,
  Star,
  Target,
  Users,
  Zap
} from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { NTClipboardToolBox } from '@/components/marketing/sections/ntclipboard-toolbox';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { YouTubeFacade } from '@/components/ui/youtube-facade';

export function ProductionPlanningSolutions(): React.JSX.Element {
  const router = useRouter();

  return (
    <GridSection hideVerticalGridLines>
      <div className="pt-6">
        {/* Hero Section */}
        <SiteHeading
          title="Production Planning and Scheduling Solutions"
          description={
            <>
              Address your scheduling challenges and boost your company's efficiency, profitability, and competitiveness with a solution that fits, <strong className="italic">JUST RIGHT!</strong>
            </>
          }
        />

        <div className="mx-auto  max-w-7xl">
          {/* Introduction */}
          <div className="mb-[17px]">
            <p className=" text-lg mb-3 text-muted-foreground">
              Discover powerful{' '}
              <a
                href="https://en.wikipedia.org/wiki/Production_planning"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Production Planning and Scheduling Solutions
              </a>{' '}
              that help manufacturers solve challenges and boost efficiency—from a powerful Excel Add-On to advanced APS software that works either standalone or integrates with your ERP or any system.
            </p>
            <p className="mb-4 text-lg  text-muted-foreground">
              We look forward to working with you to resolve your most pressing issues. Reduce/Eliminate late deliveries, reduce expediting costs, optimize labor and workcenter demands, improve customer service, minimize inventory costs, and so much, much more. Could you benefit from a system that gives you an end-to-end view of your entire supply chain? And gives you options to accommodate rush orders, and even deal with outside issues such as weather, hunting season, power outages, no shows on Labor, outside vendors for processing or material problems.
            </p>
          </div>

          {/* Video Section - Side by Side Layout */}
          <div className="">
            <div className="grid items-center gap-8 md:grid-cols-2">
              {/* Video */}
              <div className="relative overflow-hidden rounded-xl border bg-slate-100 shadow-lg max-h-[280px]">
                <div className="relative aspect-video w-full  max-h-[220px]">
                  <YouTubeFacade
                    videoId="IR8NhOlV_zM"
                    title="Production Planning and Scheduling Solutions Demo"
                    className="absolute inset-0 size-full"
                    useBluePlayButton
                  />
                </div>
              </div>
              {/* Text Content */}
              <div className="space-y-4">

                <p className="text-lg text-slate-700">
                  Let’s work together to solve the most pressing issues, as fast and easy as possible, then move on to next one!
                </p>
                <p className="text-lg text-slate-700">Contact US today to discuss which product fits your budget and application.</p>
                <Button
                  size="default"
                  className="gap-1 flex m-auto bg-[#FAE74D] text-[#1e3a5f] hover:bg-[#e6d445] font-bold px-6 py-3 text-[16px] rounded-full shadow-lg"
                  onClick={() => router.push('/contact-us')}
                >
                  <img
                    src="/images/onefootprint-1.png"
                    alt="footprint icon"
                    className="w-10 h-10"
                  />
                  <span className="tracking-wide">NEXT STEPS</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Product Tiers - Using NTClipboardToolBox */}
          <NTClipboardToolBox />

          {/* Feature Comparison Matrix */}
          <div className="my-6">
            <h2 className="mb-4 text-center text-3xl font-bold text-slate-900">
              Choose the Right Solution for Your Business
            </h2>
            <p className="mb-4 text-center text-lg text-slate-600">
              Compare features across our product range to find the perfect fit
            </p>

            {/* Expand/Collapse Controls */}
            <div className="mb-4 flex justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const details = document.querySelectorAll(
                    'details[data-feature]'
                  );
                  details.forEach((detail) =>
                    detail.setAttribute('open', 'true')
                  );
                }}
                className="text-blue-600 hover:bg-blue-50"
              >
                Expand All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const details = document.querySelectorAll(
                    'details[data-feature]'
                  );
                  details.forEach((detail) => detail.removeAttribute('open'));
                }}
                className="text-blue-600 hover:bg-blue-50"
              >
                Close All
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] rounded-lg border border-slate-200 bg-white">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-4 text-left font-semibold text-slate-900">
                      Features
                    </th>
                    <th className="p-4 text-center font-semibold text-blue-600">
                      Resource Manager For Excel
                    </th>
                    <th className="p-4 text-center font-semibold text-orange-600">
                      Resource Manager DB
                    </th>
                    <th className="p-4 text-center font-semibold text-purple-600">
                      EDGEBI Suite
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: 'Routings',
                      description:
                        'Workcenter Set-up and Cycle Times, Queue / Move Times, Linear and non-Linear.',
                      jsl: true,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Finite Capacity',
                      description:
                        'Only schedules to what is available. Customizable Workcenter Calendars and Daily Calendar. Color coded. Graphics.',
                      jsl: true,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Tracking Actuals',
                      description:
                        'Import Actuals. if available, or direct entry. Even drag-and-drop to track WIP.',
                      jsl: false,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Bill of Materials',
                      description:
                        'Quantity per, Parent-child, Sub-Assemblies, Rev Control, much more.',
                      jsl: false,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Mixed Mode Scheduling',
                      description:
                        'Forward based on start date or Reverse based on due date or even Time Fenced. Per job or group of orders. Prioritize at any level.',
                      jsl: true,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Rescheduling',
                      description:
                        'Import Actuals. if available, or direct entry. Even drag-and-drop to track WIP.',
                      jsl: false,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Inventory Management',
                      description:
                        'Low maintenance. Safety Stocks, Yield Factors, Purchasing UOM, ATP, Reporting.',
                      jsl: false,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Material Planning Basic',
                      description:
                        'What materials are required for what jobs and when.',
                      jsl: false,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Customizable',
                      description:
                        'We specialize in enhancing any product, or combination, to meet your unique needs.',
                      jsl: false,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Purchase Orders',
                      description:
                        'Easy, fast, accurate. Based on scheduled demand, stock replenishment, and more. Paperless option.',
                      jsl: false,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Drag and Drop',
                      description:
                        'Visually change dates per job, per workcenter, or even drag job from one workcenter to another.',
                      jsl: false,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Materials Planning Advanced',
                      description:
                        'MRP Calculations, Shortage Reports, Lot and Batch Sizing, much more.',
                      jsl: false,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Integration with other systems',
                      description:
                        'Import and Export to Excel and direct importing via ODBC drivers. Integrates easily with most ERP and custom systems.',
                      jsl: false,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Advanced Planning & Scheduling',
                      description:
                        'Alternate Routings, Multiple Constraints, Multiple Priorities, Rescheduling on demand, much more.',
                      jsl: false,
                      rmdb: true,
                      edgebi: true
                    },
                    {
                      feature: 'Heat Map Report',
                      description:
                        'Visual representation of capacity loading across your schedule.',
                      jsl: false,
                      rmdb: false,
                      edgebi: true
                    },
                    {
                      feature: 'Schedule Key Dates',
                      description:
                        'Critical date tracking and reporting functionality.',
                      jsl: false,
                      rmdb: false,
                      edgebi: true
                    },
                    {
                      feature: 'Live embedded Excel',
                      description:
                        'Import and Export to Excel and direct importing via ODBC drivers. Integrates easily with most ERP and custom systems.',
                      jsl: false,
                      rmdb: false,
                      edgebi: true
                    },
                    {
                      feature: 'Advanced Drag and Drop',
                      description:
                        'Alternate Routings, Multiple Constraints, Multiple Priorities, Rescheduling on demand, much more.',
                      jsl: false,
                      rmdb: false,
                      edgebi: true
                    }
                  ].map((row, i) => (
                    <React.Fragment key={i}>
                      <tr
                        className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50' : ''}`}
                      >
                        <td className="p-4">
                          <details
                            data-feature={`feature-${i}`}
                            className="group"
                          >
                            <summary className="flex cursor-pointer items-center gap-2 font-medium text-slate-900 hover:text-blue-600">
                              <span className="text-sm transition-transform group-open:rotate-90">
                                ▶
                              </span>
                              {row.feature}
                            </summary>
                            <div className="mt-2 pl-6 text-sm text-slate-600">
                              {row.description}
                            </div>
                          </details>
                        </td>
                        <td className="p-4 text-center">
                          {row.jsl === true ? (
                            <CheckCircle className="mx-auto size-5 text-green-500" />
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {row.rmdb === true ? (
                            <CheckCircle className="mx-auto size-5 text-green-500" />
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {row.edgebi === true ? (
                            <CheckCircle className="mx-auto size-5 text-green-500" />
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Call to Action */}
          </div>

          {/* Production Scheduling Features Section */}
          <div className="mb-6">
            <h2 className="mb-6 text-center text-3xl font-bold text-slate-900">
              Production Scheduling Features
            </h2>
            <p className="mb-6 text-center text-lg text-slate-600">
              Comprehensive production planning and scheduling capabilities
              designed to optimize your manufacturing operations
            </p>

            {/* Features Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Operations Manager Excel Features */}
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Target className="size-5" />
                    Resource Manager For Excel
                  </CardTitle>
                  <CardDescription>
                    Entry-level production scheduling solution for creating
                    routing steps and scheduling according to capacity
                    limitations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'Simple, familiar interface',
                    'Easy to configure and run',
                    'Finite Capacity - Only schedules to what is available',
                    'Customizable Workcenter Calendars and Daily Calendar',
                    'Forward/Reverse scheduling',
                    'Mixed Mode Scheduling - Forward based on start date or Reverse based on due date',
                    'Routings - Workcenter Set-up and Cycle Times',
                    'Queue / Move Times, Linear and non-Linear',
                    'Color coded Graphics',
                    'Import Data',
                    'Resources management',
                    'Orders tracking',
                    'Reports generation',
                    'Schedule module',
                    'Export Data'
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="size-4 text-blue-600" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Resource Manager DB Features */}
              <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Settings className="size-5" />
                    Resource Manager DB
                  </CardTitle>
                  <CardDescription>
                    Advanced production planning and scheduling solution that
                    adapts to your existing data and workflows
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'Finite Capacity Planning & Scheduling',
                    'Advanced Planning and Scheduling - Alternate Routings, Multiple Constraints',
                    'Routings - Workcenter Set-up and Cycle Times, Queue/Move Times',
                    'Tracking Actuals - Import Actuals or direct entry',
                    'Drag-and-drop to track WIP',
                    'Bill of Materials - Quantity per, Parent-child, Sub-Assemblies',
                    'Rev Control and much more',
                    'Mixed Mode Scheduling - Time Fenced, Per job or group of orders',
                    'Prioritize at any level',
                    'Rescheduling - Import Actuals and rescheduling on demand',
                    'MRP and Inventory Management - Low maintenance, Safety Stocks',
                    'Yield Factors, Purchasing UOM, ATP, Reporting',
                    'Material Planning Basic - What materials are required for what jobs and when',
                    'Materials Planning Advanced - MRP Calculations, Shortage Reports',
                    'Lot and Batch Sizing',
                    'Purchase Orders - Easy, fast, accurate based on scheduled demand',
                    'Stock replenishment, Paperless option',
                    'Drag and Drop - Visually change dates per job, per workcenter',
                    'Drag job from one workcenter to another',
                    'Integration with other systems - Import/Export Excel, ODBC drivers',
                    'Integrates easily with most ERP and custom systems',
                    'Customizable - We specialize in enhancing to meet your unique needs',
                    'What-if Analysis',
                    'Purchasing and Receiving',
                    'Downtime Analysis and Reporting',
                    'Costing and Estimating',
                    'Production Planning',
                    'Multi-Resource Scheduling',
                    'LP Optimization (Optional)',
                    'Customized Reports'
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="size-4 text-orange-600" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* EDGEBI Features */}
              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <Zap className="size-5" />
                    EDGEBI Suite
                  </CardTitle>
                  <CardDescription>
                    Graphical overlay with business intelligence for intuitive
                    drag-and-drop schedule management
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'Enhanced Drag-n-drop Interface',
                    'Business Intelligence Integration',
                    'Heat Map Report - View capacity loading for entire schedule at a glance',
                    'Schedule Key Dates - Run reports with export to Excel',
                    'Live embedded Excel - Import and Export to Excel',
                    'Direct importing via ODBC drivers',
                    'Integrates easily with most ERP and custom systems',
                    'Advanced Drag and Drop - Alternate Routings, Multiple Constraints',
                    'Multiple Priorities, Rescheduling on demand',
                    'Intuitive Graphical Approach',
                    'Color-coded Schedule Status',
                    'Drag and Drop Job Segments',
                    'Capacity Utilization Graph',
                    'Custom Reporting - Customized per your requests',
                    'Advanced Security Options',
                    'Interactive Schedule Management'
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="size-4 text-purple-600" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-6">
            <h2 className="mb-6 text-center text-3xl font-bold text-slate-900">
              Pricing
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <p className="text-xl text-slate-700">
                  <span className="font-semibold text-blue-700">
                    Resource Manager For Excel
                  </span>
                </p>
                <p className="text-2xl font-bold text-slate-900">Starting at $1,200</p>
              </div>

              <div className="text-center">
                <p className="text-xl text-slate-700">
                  <span className="font-semibold text-orange-700">
                    Resource Manager DB
                  </span>
                </p>
                <p className="text-2xl font-bold text-slate-900">Starting at $3K</p>
              </div>

              <div className="text-center">
                <p className="text-xl text-slate-700">
                  <span className="font-semibold text-purple-700">
                    EDGEBI Suite
                  </span>
                </p>
                <p className="text-2xl font-bold text-slate-900">Starting at $10K</p>
              </div>
            </div>
          </div>

          {/* Customer Testimonials */}
          <div className="my-6">
            <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
              What Our Customers Say
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <blockquote className="mb-4 text-slate-700">
                    "Best choice for MRP and project management software"
                  </blockquote>
                  <cite className="text-sm font-medium text-slate-900">
                    — Sleepmaster Ltd
                  </cite>
                  <div className="mt-3">
                    <Link
                      href="/sleepmaster-ltd"
                      className="text-sm text-blue-600 underline hover:text-blue-800"
                    >
                      Read More
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <blockquote className="mb-4 text-slate-700">
                    "Manufacturing scheduling software with fantastic support"
                  </blockquote>
                  <cite className="text-sm font-medium text-slate-900">
                    — Cook Compression
                  </cite>
                  <div className="mt-3">
                    <Link
                      href="/cook-compression"
                      className="text-sm text-blue-600 underline hover:text-blue-800"
                    >
                      Read More
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-violet-50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <blockquote className="mb-4 text-slate-700">
                    "Easy ERP add-on for manufacturing resource planning"
                  </blockquote>
                  <cite className="text-sm font-medium text-slate-900">
                    — Incon Incorporated
                  </cite>
                  <div className="mt-3">
                    <Link
                      href="/incon-incorporated"
                      className="text-sm text-blue-600 underline hover:text-blue-800"
                    >
                      Read More
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Benefits Section */}
          <div className="mb-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="size-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  Save Time
                </h3>
                <p className="text-sm text-slate-600">
                  Reduce planning time by up to 75% with automated scheduling
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
                  <Target className="size-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  Increase Efficiency
                </h3>
                <p className="text-sm text-slate-600">
                  Optimize resource utilization and reduce bottlenecks
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-purple-100">
                  <Users className="size-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  Better Collaboration
                </h3>
                <p className="text-sm text-slate-600">
                  Real-time visibility across all teams and departments
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="mb-4 text-slate-600">
              Not sure which solution is right for you?
            </p>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-2 border-slate-800 bg-white text-slate-800 hover:bg-slate-100"
              onClick={() => router.push('/contact-us')}
            >
              <Users className="size-4" />
              Schedule a Live Demo
            </Button>
          </div>
        </div>
      </div>
    </GridSection>
  );
}
