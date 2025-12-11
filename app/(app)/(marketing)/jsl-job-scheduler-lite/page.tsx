import * as React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function JobSchedulerLitePage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
              EDGEBIC
            </h1>
            <p className="mb-6 text-xl text-muted-foreground md:text-2xl">
              Entry-level production scheduling solution designed for job shops
              and small manufacturers
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="cursor-pointer"
                asChild
              >
                <a
                  href="https://www.usersolutions.com/wp-content/uploads/2022/10/JSLsetup.zip"
                  download="JSLsetup.zip"
                >
                  Download Free Trial
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 pt-6">
        <div className="mx-auto max-w-7xl">
          {/* Overview */}
          <div className="mb-6 grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">Overview</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Welcome to EDGEBIC . Designed as an entry level production
                scheduling offering that allows users to quickly create a
                series of routing steps then schedule according to capacity
                limitations, direction (Forward or Reverse), and Priorities.
                It also offers a quick method to load data either directly
                or importing from an Excel sheet.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/insight-1.png"
                alt="EDGEBIC production scheduling software interface"
                className="h-auto w-full"
              />
            </div>
          </div>

          {/* Software Demo Video Section */}
          <div className="mb-6">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-foreground">See JSL in Action</h2>
              <p className="mt-2 text-muted-foreground">
                Watch how EDGEBIC simplifies production scheduling
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              {/* Video Section */}
              <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative aspect-video w-full">
                  {/* Replace with actual video URL when available */}
                  <iframe
                    src="https://www.usersolutions.com/wp-content/uploads/2022/10/Welcome-to-Job-Scheduler-Lite-JSL.mp4"
                    title="EDGEBIC Demo Video"
                    className="absolute inset-0 size-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Video Description */}
              <div className="flex flex-col justify-center">
                <h3 className="mb-4 text-2xl font-semibold">
                  Complete JSL Walkthrough
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Watch this comprehensive demonstration of Job Scheduler
                  Lite&apos;s key features:
                </p>
                <ul className="mb-6 space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-blue-500" />
                    Interactive menu navigation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-blue-500" />
                    Data import from Excel
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-blue-500" />
                    Forward/Reverse scheduling
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-blue-500" />
                    Capacity planning setup
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-blue-500" />
                    InSights and reporting
                  </li>
                </ul>
              </div>
            </div>

            {/* Additional Screenshots Row */}
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/mnn.jpeg"
                  alt="JSL software menu options and interface"
                  className="h-[200px] w-full object-cover"
                />
                <div className="p-3">
                  <h4 className="text-sm font-semibold">Menu System</h4>
                  <p className="text-xs text-muted-foreground">
                    Intuitive navigation
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/insight-1.png"
                  alt="JSL InSights scheduling interface"
                  className="h-[200px] w-full object-cover"
                />
                <div className="p-3">
                  <h4 className="text-sm font-semibold">InSights View</h4>
                  <p className="text-xs text-muted-foreground">
                    Visual scheduling
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg shadow-lg md:col-span-2 lg:col-span-1">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/schdle.png"
                  alt="JSL scheduling interface"
                  className="h-[200px] w-full object-cover"
                />
                <div className="p-3">
                  <h4 className="text-sm font-semibold">Scheduling Engine</h4>
                  <p className="text-xs text-muted-foreground">
                    Capacity planning
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <h2 className="mb-6 text-center text-3xl font-bold">
              Key Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all hover:shadow-xl">
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold">
                    Simple, Familiar Interface
                  </h3>
                  <p className="text-muted-foreground">
                    One step menus, on-screen buttons, or sheet tabs make
                    navigation a snap.
                  </p>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-xl">
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold">
                    Easy to Configure
                  </h3>
                  <p className="text-muted-foreground">
                    Quick, intuitive layout and prompts allow you to focus on
                    your business, instead of learning another software product.
                  </p>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-xl">
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold">
                    Finite Capacity Planning
                  </h3>
                  <p className="text-muted-foreground">
                    Forward/Reverse scheduling with global and detailed
                    workcenter configuration that can be applied instantly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Core Modules */}
          <div className="mb-6">
            <h2 className="mb-6 text-center text-3xl font-bold">
              Core Modules with Screenshots
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-xl font-semibold">Import Data</h3>
                    <p className="mb-4 text-muted-foreground">
                      Quick method to load data directly or import from Excel
                      sheet.
                    </p>
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src="https://www.usersolutions.com/wp-content/uploads/2022/10/import.png"
                        alt="Data import software window with options and required columns"
                        className="h-auto w-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-xl font-semibold">Daily Hours</h3>
                    <p className="mb-4 text-muted-foreground">
                      Set normal operating hours for your business.
                    </p>
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src="https://www.usersolutions.com/wp-content/uploads/2022/10/dailyhours.png"
                        alt="Daily Work Hours tracking software interface"
                        className="h-auto w-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-xl font-semibold">Holidays</h3>
                    <p className="mb-4 text-muted-foreground">
                      Manage partial shutdowns, repeating holidays, or
                      calendar-varying events.
                    </p>
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src="https://www.usersolutions.com/wp-content/uploads/2022/10/holidays.png"
                        alt="Holiday management software interface with dates and times"
                        className="h-auto w-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
                  <h3 className="mb-3 text-xl font-semibold">Resources</h3>
                  <p className="mb-4 text-muted-foreground">
                    Add workcenters with name, description, and capacity.
                  </p>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="https://www.usersolutions.com/wp-content/uploads/2022/10/resoursces.png"
                      alt="Software resource management interface"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
                  <h3 className="mb-3 text-xl font-semibold">Orders</h3>
                  <p className="mb-4 text-muted-foreground">
                    Enter orders with workcenters and timing in sequential
                    order.
                  </p>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="https://www.usersolutions.com/wp-content/uploads/2022/10/orders-1024x459.png"
                      alt="Software order management system"
                      className="h-auto w-full"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
                  <h3 className="mb-3 text-xl font-semibold">
                    Finished Goods/Routing
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Define what will be scheduled with workcenters and timing.
                  </p>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="https://www.usersolutions.com/wp-content/uploads/2022/10/FG.png"
                      alt="Inventory management application interface with lists and buttons"
                      className="h-auto w-full"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
                  <h3 className="mb-3 text-xl font-semibold">Schedule</h3>
                  <p className="mb-4 text-muted-foreground">
                    Advanced scheduling engine with capacity planning and
                    priority-based allocation.
                  </p>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="https://www.usersolutions.com/wp-content/uploads/2022/10/schdle.png"
                      alt="Job scheduling software interface"
                      className="h-auto w-full"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
                  <h3 className="mb-3 text-xl font-semibold">InSights</h3>
                  <p className="mb-4 text-muted-foreground">
                    Comprehensive Gantt charts, calendar views, efficiency
                    tracking, and visual scheduling.
                  </p>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="https://www.usersolutions.com/wp-content/uploads/2022/10/insight.png"
                      alt="Scheduling software with calendar and utilization graph"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Awards and Recognition */}
          <div className="mt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  className="mx-auto h-auto max-w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
