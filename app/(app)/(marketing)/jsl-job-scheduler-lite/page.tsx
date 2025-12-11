import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
              <Button size="lg" className="cursor-pointer" asChild>
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
          <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-foreground">Overview</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Welcome to EDGEBIC. Designed as an entry level production
                scheduling offering that allows users to quickly create a
                series of routing steps then schedule according to capacity
                limitations, direction (Forward or Reverse), and Priorities.
                It also offers a quick method to load data either directly
                or importing from an Excel sheet.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/insight-1.png"
                alt="EDGEBIC production scheduling software interface"
                className="h-auto w-full"
              />
            </div>
          </div>

          {/* Video Section */}
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-foreground">See JSL in Action</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="overflow-hidden rounded-lg">
                <div className="relative aspect-video w-full">
                  <iframe
                    src="https://www.usersolutions.com/wp-content/uploads/2022/10/Welcome-to-Job-Scheduler-Lite-JSL.mp4"
                    title="EDGEBIC Demo Video"
                    className="absolute inset-0 size-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-semibold">Complete JSL Walkthrough</h3>
                <p className="mb-3 text-muted-foreground">
                  Watch this comprehensive demonstration of Job Scheduler Lite&apos;s key features:
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Interactive menu navigation</li>
                  <li>• Data import from Excel</li>
                  <li>• Forward/Reverse scheduling</li>
                  <li>• Capacity planning setup</li>
                  <li>• InSights and reporting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Key Features</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="mb-2 text-lg font-semibold">Simple, Familiar Interface</h3>
                <p className="text-muted-foreground">
                  One step menus, on-screen buttons, or sheet tabs make navigation a snap.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Easy to Configure</h3>
                <p className="text-muted-foreground">
                  Quick, intuitive layout and prompts allow you to focus on your business.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Finite Capacity Planning</h3>
                <p className="text-muted-foreground">
                  Forward/Reverse scheduling with global and detailed workcenter configuration.
                </p>
              </div>
            </div>
          </div>

          {/* Core Modules */}
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Core Modules</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="mb-2 font-semibold">Import Data</h3>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/import.png"
                  alt="Data import"
                  className="mb-2 h-auto w-full rounded"
                />
                <p className="text-sm text-muted-foreground">Load data directly or import from Excel.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Daily Hours</h3>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/dailyhours.png"
                  alt="Daily hours"
                  className="mb-2 h-auto w-full rounded"
                />
                <p className="text-sm text-muted-foreground">Set normal operating hours.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Holidays</h3>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/holidays.png"
                  alt="Holidays"
                  className="mb-2 h-auto w-full rounded"
                />
                <p className="text-sm text-muted-foreground">Manage shutdowns and holidays.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Resources</h3>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/resoursces.png"
                  alt="Resources"
                  className="mb-2 h-auto w-full rounded"
                />
                <p className="text-sm text-muted-foreground">Add workcenters with capacity.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Orders</h3>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/orders-1024x459.png"
                  alt="Orders"
                  className="mb-2 h-auto w-full rounded"
                />
                <p className="text-sm text-muted-foreground">Enter orders with timing.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Finished Goods/Routing</h3>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/FG.png"
                  alt="Finished goods"
                  className="mb-2 h-auto w-full rounded"
                />
                <p className="text-sm text-muted-foreground">Define scheduling with workcenters.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Schedule</h3>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/schdle.png"
                  alt="Schedule"
                  className="mb-2 h-auto w-full rounded"
                />
                <p className="text-sm text-muted-foreground">Advanced scheduling engine.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">InSights</h3>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/insight.png"
                  alt="InSights"
                  className="mb-2 h-auto w-full rounded"
                />
                <p className="text-sm text-muted-foreground">Gantt charts and calendar views.</p>
              </div>
            </div>
          </div>

          {/* Awards */}
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
  );
}
