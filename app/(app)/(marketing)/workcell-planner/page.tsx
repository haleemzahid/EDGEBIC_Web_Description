import Link from 'next/link';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WorkcellPlannerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Workcell Planner
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Capacity Planning and Resource Optimization
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/product-downloads">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Free Sample
                </Button>
              </Link>
              <Link href="/contact-us">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Request Free Product
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The objective of the model is to provide the master scheduler
                  or planning function with a tool for determining the overall
                  level of capacity and distribution of capacity required to
                  meet demand. This demand can be driven by a forecasted
                  incoming rate or consuming a backlog within a specified time
                  frame for a particular cell – as well as for overall plant
                  level.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Functionality Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  More specifically, the model:
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul>
                  <li>
                    Translates a forecast or backlog into machine and manpower
                    requirements for each resource in a cell and compares this
                    with the capacity given the current man machine
                    configuration.
                  </li>
                  <li>
                    Allows easy what if analysis of the interaction of setup
                    time, lot size, efficiency, operation yield, and work
                    practices such as working bottlenecks through breaks.
                  </li>
                  <li>
                    Allows analysis of flow with multiple setups per part vs.
                    batch and the payoff on throughput of set up reduction
                    results.
                  </li>
                  <li>
                    Clearly shows the bottleneck resource that limits cell
                    output dynamically as factors are changed.
                  </li>
                  <li>
                    Shows what can be expected from the existing man-machine
                    configuration and can be used to set expected cell output
                    rates, shift schedules and manning levels and easy
                    configuration.
                  </li>
                </ul>

                <div className="my-6 flex justify-center">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/09/WCP-Menu.png"
                    alt="Screenshot of Workcell Planner software with tables and data"
                    className="h-auto max-w-full rounded-lg shadow-lg"
                  />
                </div>

                <div className="my-6 flex justify-center">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/09/WCP-Bar4.png"
                    alt="Bar chart showing shifts required for manufacturing processes"
                    className="h-auto max-w-full rounded-lg shadow-lg"
                  />
                </div>

                <div className="my-6 flex justify-center">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/09/WCP-Bar5.png"
                    alt="Bar chart comparing current and required staffing levels"
                    className="h-auto max-w-full rounded-lg shadow-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Capacity Balancing
                  </h3>
                  <p className="text-muted-foreground">
                    Optimize resource allocation across your workcell
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Runs with Excel
                  </h3>
                  <p className="text-muted-foreground">
                    Familiar spreadsheet environment for easy adoption
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Production Planning
                  </h3>
                  <p className="text-muted-foreground">
                    Plan capacity requirements based on demand
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Integrates with any system
                  </h3>
                  <p className="text-muted-foreground">
                    Works seamlessly with your existing tools
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Resource Optimization
                  </h3>
                  <p className="text-muted-foreground">
                    Identify and resolve bottlenecks dynamically
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    What-Ifs
                  </h3>
                  <p className="text-muted-foreground">
                    Analyze scenarios with setup time, lot size, and efficiency
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Built-in Graphing
                  </h3>
                  <p className="text-muted-foreground">
                    Visualize capacity and requirements instantly
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Source code included
                  </h3>
                  <p className="text-muted-foreground">
                    Customize and extend for your specific needs
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h3>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  className="mx-auto h-auto max-w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
