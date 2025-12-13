import React from 'react';
import Link from 'next/link';


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function JSLJobSchedulerLiteInDepthPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              EDGEBIC : In Depth
            </h1>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Welcome to EDGEBIC . Designed as an entry level production
                scheduling offering that allows users to quickly create a series
                of routing steps then schedule according to capacity
                limitations, direction (Forward or Reverse), and Priorities. It
                also offers a quick method to load data either directly or
                importing from and Excel sheet. If you have more complex
                routings (non linear, or non batch, etc.) then consider Resource
                Manager-DB (RMDB) as it can model scheduling most any
                manufacturing flow.
              </p>

              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/insight-1.png"
                  alt="Screenshot of production scheduling software interface"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className=" pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Simple, familiar interface */}
              <div>
                <h3 className="mb-3 text-2xl font-semibold">
                  Simple, familiar interface
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  One step menus, on-screen buttons, or sheet tabs make
                  navigation a snap.
                </p>
              </div>

              {/* Easy to configure and run */}
              <div>
                <h3 className="mb-3 text-2xl font-semibold">
                  Easy to configure and run
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Quick, intuitive layout and prompts allows you to focus on
                  your business, instead of learning another software product.
                </p>
              </div>

              {/* Finite capacity planning */}
              <div>
                <h3 className="mb-3 text-2xl font-semibold">
                  Finite capacity planning and forward scheduling
                </h3>
                <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                  Global and/or detailed workcenter configuration can be made
                  and applied instantly.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/10/rit.png"
                    alt="Screenshot of a daily work hours tracking application"
                    className="h-auto w-full rounded-lg shadow-md"
                  />
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/10/le.png"
                    alt="Screenshot of a data import software interface"
                    className="h-auto w-full rounded-lg shadow-md"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modules Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-semibold">Import Data</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-semibold">Daily Hours</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-semibold">Holidays</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-semibold">Configure</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-semibold">Resources</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-semibold">Orders</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-semibold">FG / RL</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-semibold">Reports</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-semibold">Schedule</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-semibold">InSight</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-semibold">Export Data</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-semibold">Exit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Import Data */}
      <section className=" pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Import Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                We recommend you review JSL with currently loaded demo data then
                consider using Import Data to load your application specific
                data. Just edit the importsback.xlsx to represent your data
              </p>

              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/import.png"
                  alt="Data import software window with options and required columns"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Daily Hours */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Daily Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Daily Hours is normal operating hours for your business. You
                might consider entering net hours (subtract breaks, lunch,
                efficiencies).
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                Simply click on a day and enter start and end times in format
                below.
              </p>

              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/dailyhours.png"
                  alt="Screenshot of Daily Work Hours tracking software interface"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Holidays */}
      <section className=" pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Holidays</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Holidays can be a partial shutdown event for company, repeating
                holiday (like Christmas), or varies each year according to
                calendar (for example Thanksgiving).
              </p>

              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/holidays.png"
                  alt="Screenshot of holiday management software interface with dates and times"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resources */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                To add a new resource simply clear input table, enter in Name,
                description, and number of resources. Then Save. To delete,
                choose resource and press Delete key. The Num of Res (number of
                resources) is how many of that workcenter/resource you have. It
                is multiplied by daily hours to calculate gross hours available.
                This number can be changed at ANY time with the change applying
                to Next jobs being scheduled, or rescheduled.
              </p>

              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/resoursces.png"
                  alt="Screenshot of software resource management interface"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Finish Goods */}
      <section className=" pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Finish Goods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Finished Goods/Routing List (FG/RL) is what will be scheduled.
                You can enter a new name, then list the workcenters and timing
                in the order they are worked, then save. JSL schedules in a
                linear mode, meaning all parts are completed at one workcenter
                before moving on to next. If you have routings that don't fit
                this simple model, please call and we can discuss other options
                (such as Resource Manager -DB).
              </p>

              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/FG.png"
                  alt="Inventory management application interface with lists and buttons"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Orders */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Orders is what will be scheduled. You can enter a new name, then
                list the workcenters and timing in the order they are worked,
                then save. JSL schedules in a linear mode, meaning all parts are
                completed at one workcenter before moving on to next. If you
                have routings that don't fit this simple model, please call and
                we can discuss other options (such as Resource Manager -DB).
              </p>

              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/orders-1024x459.png"
                  alt="Screenshot of a software order management system"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Schedule */}
      <section className=" pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                See call out details below.
              </p>

              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/schdle.png"
                  alt="Screenshot of job scheduling software interface"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* InSights */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">InSights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Insight is the most comprehensive and feature rich module in
                JSL.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                Check out the schedule calendar Legend to see at a glance how
                selected month is scheduled. Work day with no late jobs, work
                day with at lease one late job, workday with NO scheduled work,
                non-working day (weekends and holidays) and a leading or
                trailing day (this is just an extra time buffer that can be
                applied on global level.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                The time scale can be 15 minutes to a week. Right click on
                Workcenter ID (frist column in Gantt display) to display color
                coded efficiency. You can even click on any job segment to move
                it as desired on display. Cross hatched bar segments in Gantt
                Chart indicate Late Jobs (scheduled end date &gt; due date)
              </p>

              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/insight.png"
                  alt="Screenshot of scheduling software with calendar and utilization graph"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Export Data */}
      <section className=" pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Export Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Export data however you wish. Sometimes its quicker to export
                out data to Excel, make big changes as needed, then just import
                in.
              </p>

              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/exdata.png"
                  alt="Screenshot of data export software interface"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Theme Configuration */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Theme Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Configure allows you to try different themes, back up and
                restore database, and also register the JSL for customer use.
              </p>

              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/th-conf.png"
                  alt="Software configuration interface with theme options and registration fields"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reports */}
      <section className=" pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                There are a variety of reports available.
              </p>

              <div className="flex justify-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/Reports.png"
                  alt="Screenshot of a schedule report software interface"
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Awards Banner */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900">
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
      </section>
    </div>
  );
}
