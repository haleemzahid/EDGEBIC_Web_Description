import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResourceManagerDBInDepthPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white dark:from-blue-800 dark:to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-7xl">
            <Badge
              variant="outline"
              className="mb-6 h-8 rounded-full border-white/30 bg-white/10 px-3 text-sm font-medium text-white shadow-sm"
            >
              PRODUCT
            </Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Resource Manager DB: In Depth
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Production Planning, Scheduling and Tracking System
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/product-downloads">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Live Demo
                </Button>
              </Link>
              <Link href="/pricing">
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
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Resource Manager-DB (RMDB) is an affordable, flexible and
                  quick-to-implement approach to resolve your production
                  planning, scheduling and tracking challenges. Designed by
                  customers just like you, Resource Manager-DB features a
                  single, simple menu (dashboard) requiring minimal transactions
                  to keep the system accurate.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  RMDB's unique, customer driven architecture allows you to
                  start very simply, focusing on one area at a time, enabling
                  you to provide minimal information in order to recognize
                  immediate benefits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Why Choose Resource Manager-DB?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  If you find you are still using manual white boards and/or
                  Excel for trying to manage your production scheduling, you
                  will find RMDB a refreshing option. RMDB's intuitive and
                  flexible structure and data integration, enables us to offer a
                  no-risk, pre-sales, implementation walk-through to demonstrate
                  exactly how the system can benefit your operations.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Since 1991, our mission has been to help manufacturers solve
                  manufacturing and operations management problems with
                  intuitive and easy-to-implement tools.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The unique architecture facilitates custom configuration, in
                  hours or days, vs. typical custom programming taking weeks or
                  months. By driving our product development based on your
                  requests, combined with the rapid custom configuration
                  abilities of RMDB, the result is a solution that fits your
                  operation like a glove, quickly and affordably.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Featuring easy integration with Excel, ERP, accounting, custom
                  or other legacy systems, RMDB will provide you unsurpassed
                  improvements in production planning and scheduling and
                  enterprise-wide communication.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Core Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Finite Planning & Scheduling
                  </h3>
                  <p className="text-muted-foreground">
                    Realistic schedules based on actual capacity
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    MRP and Inventory Management
                  </h3>
                  <p className="text-muted-foreground">
                    Complete material requirements planning
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Routings and Priority Scheduling
                  </h3>
                  <p className="text-muted-foreground">
                    Detailed production workflows with priorities
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Easy "what-if" analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Test scenarios before implementation
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Purchasing and Receiving
                  </h3>
                  <p className="text-muted-foreground">
                    Integrated procurement management
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Forecasting
                  </h3>
                  <p className="text-muted-foreground">
                    Plan for future demand
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Costing and Estimating
                  </h3>
                  <p className="text-muted-foreground">
                    Accurate job cost tracking
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Integrates with ALL systems
                  </h3>
                  <p className="text-muted-foreground">
                    Works with Excel, ERP, accounting, and legacy systems
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    APS and Lean Manufacturing
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced planning optimized for lean operations
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Ideal for Lean Manufacturing
                  </h3>
                  <p className="text-muted-foreground">
                    Designed to eliminate waste (muda)
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Run stand alone or networked
                  </h3>
                  <p className="text-muted-foreground">
                    Flexible deployment options
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Production Planning
                  </h3>
                  <p className="text-muted-foreground">
                    Comprehensive manufacturing planning tools
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Works The Way You Do Section */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Works The Way You Do
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Resource Manager-DB is the only system that is designed to
                  adapt to your specific operational needs and nuances. RMDB
                  utilizes your existing data resulting in rapid implementation
                  and acceptance success.
                </p>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                      Adapts to how you work
                    </h3>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                      Leverages existing data
                    </h3>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                      Quick to configure or reconfigure
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cruise Control Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Cruise Control Software for your Manufacturing Enterprise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground">
                  Fill'er Up
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Resource Manager-DB lets you easily work with your current
                  data. Do you have a product list somewhere? How about
                  bills-of-material and/or routings? Sales orders, inventory
                  levels, even work-in-process data. Import directly into
                  Resource Manager-DB and let RMDB automatically fill in the
                  details. You can even maintain this data in other systems,
                  such as ERP, then refresh on demand.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Starting from scratch? Resource Manager-DB features a clean
                  and simple way to create master item lists and dynamically
                  create bills-of-resources. Resource Manager-DB is designed to
                  work seamlessly with Excel.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">
                    IMPORTANT TAKEAWAY #1:
                  </strong>{' '}
                  This provides great flexibility in rapid implementation
                  options as it allows you to load, edit, reload entire data
                  sets with the click of a button.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">
                    IMPORTANT TAKEAWAY #2:
                  </strong>{' '}
                  These output reports can be circulated, then imported right
                  back into Resource Manager-DB to update the system. These
                  reports run on any version of Excel anywhere — Cloud, tablet,
                  laptop, network, desktop, smart phone, on-site, off-site and
                  enterprise wide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Powerful Reporting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  With quick, powerful, and intuitive reporting, Resource
                  Manager-DB stands above the crowd in its ability to present
                  the important data in an easy and meaningful way. In addition
                  to the robust reports that are included with Resource
                  Manager-DB, the user can easily configure canned, custom
                  reports that become a permanent part of the system.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                      Gantt Report
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Top-level view of all activity with drill-down details
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                      Summary Report
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      What to buy or make, how much, and when
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                      Item Report
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      All requirements per part number
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                      Calendar Report
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Schedule in familiar wall calendar format
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                      Workcenter Report
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Real-time views of all critical workcenter activity
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                      Production Report
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Perfect for traveler or work order printout
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                      Routing & Tree Report
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Visual bill-of-resource verification
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                      Purchasing & Receiving
                    </h4>
                    <p className="text-sm">
                      Integrated purchasing with automatic PO generation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
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
      </section>
    </div>
  );
}
