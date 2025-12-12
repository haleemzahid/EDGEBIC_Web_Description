import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function JobSchedulerLitePage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      {/* Content */}
      <div className="container mx-auto px-4 pt-6">
        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="mb-6 text-center">
            <span className="inline-flex h-8 items-center rounded-full border px-3 py-0.5 text-sm font-medium text-foreground shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              STARTER SOLUTION
            </span>
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            EDGEBIC
          </h1>
          <p className="mb-6 text-xl text-muted-foreground md:text-2xl">
            Entry-level production scheduling solution designed for job shops
            and small manufacturers
          </p>
          <div className="mb-4 flex flex-wrap justify-center gap-4">
            <Button size="lg">Download Free Trial</Button>
          </div>
        </div>

        {/* Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Welcome to EDGEBIC . Designed as an entry level production
                  scheduling offering that allows users to quickly create a
                  series of routing steps then schedule according to capacity
                  limitations, direction (Forward or Reverse), and Priorities.
                  It also offers a quick method to load data either directly or
                  importing from an Excel sheet.
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
          </CardContent>
        </Card>

        {/* Software Demo Video Section */}
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">See JSL in Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/mnn.jpeg"
                  alt="JSL software menu options and interface"
                  className="h-[400px] w-full"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="mb-4 text-2xl font-semibold">
                  Interactive Menu System
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Navigate through JSL's intuitive menu system with simple,
                  familiar interface elements. Global and detailed workcenter
                  configuration can be applied instantly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="mb-6">
          <h2 className="mb-6 text-center text-3xl font-bold">Key Features</h2>
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
                  Quick, intuitive layout and prompts allow you to focus on your
                  business, instead of learning another software product.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-xl">
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  Finite Capacity Planning
                </h3>
                <p className="text-muted-foreground">
                  Forward/Reverse scheduling with global and detailed workcenter
                  configuration that can be applied instantly.
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

              <div className="rounded-2xl bg-white p-6 shadow-lg">
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
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-3 text-xl font-semibold">Orders</h3>
                <p className="mb-4 text-muted-foreground">
                  Enter orders with workcenters and timing in sequential order.
                </p>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/10/orders-1024x459.png"
                    alt="Software order management system"
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg">
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

              <div className="rounded-2xl bg-white p-6 shadow-lg">
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

              <div className="rounded-2xl bg-white p-6 shadow-lg">
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

        {/* Pricing */}
        <div className="mb-6 text-center">
          <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
                STARTER PRICING
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-bold">Starting at $1,000+</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Perfect entry-level investment for job shops and small
              manufacturers
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>✓ Free trials available</p>
              <p>✓ Quick implementation</p>
              <p>✓ Excel data import capability</p>
              <p>✓ 25 years of award-winning software heritage</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
            <h3 className="mb-4 text-2xl font-bold">
              Ready to Transform Your Production Scheduling?
            </h3>
            <p className="mb-6 text-lg opacity-90">
              Join thousands of manufacturers who trust User Solutions for their
              production planning needs
            </p>
            <div className="mb-4 flex flex-wrap justify-center gap-4">
              <Button className="bg-gray-100 text-black hover:bg-gray-100">
                Download Free Trial
              </Button>
              <Button className="bg-gray-100 text-black hover:bg-gray-100">
                Contact Sales: 248.486.6365
              </Button>
            </div>
          </div>
        </div>

        {/* Awards and Recognition */}
        <div className="mt-10">
          <div className="text-center">
            <h2 className="mb-3 text-2xl font-bold">
              25 Years of Award-Winning Software
            </h2>
            <div className="mx-auto max-w-7xl overflow-hidden rounded-lg">
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                alt="Collection of industry and business awards logos"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
