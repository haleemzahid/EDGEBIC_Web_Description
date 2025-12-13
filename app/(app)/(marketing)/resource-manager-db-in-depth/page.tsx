import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function ResourceManagerDBInDepthPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Resource Manager DB: In Depth
          </h1>
          <p className="mb-6 text-lg text-muted-foreground">
            Production Planning, Scheduling and Tracking System
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/product-downloads">
              <Button variant="outline">Live Demo</Button>
            </Link>
            <Link href="/pricing">
              <Button>Request Free Product</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Overview</h2>
              <p className="mb-4 text-muted-foreground">
                Resource Manager-DB (RMDB) is an affordable, flexible and
                quick-to-implement approach to resolve your production planning,
                scheduling and tracking challenges. Designed by customers just
                like you, Resource Manager-DB features a single, simple menu
                (dashboard) requiring minimal transactions to keep the system
                accurate.
              </p>
              <p className="text-muted-foreground">
                RMDB's unique, customer driven architecture allows you to start
                very simply, focusing on one area at a time, enabling you to
                provide minimal information in order to recognize immediate
                benefits.
              </p>
            </div>
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/RMDB-MainMenu.png"
                alt="RMDB Main Menu Dashboard"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/ERP_Scheduling-300x245-1.png"
                alt="ERP Scheduling Integration"
                className="w-full rounded-lg"
              />
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold">
                Why Choose Resource Manager-DB?
              </h2>
              <p className="mb-4 text-muted-foreground">
                If you find you are still using manual white boards and/or Excel
                for trying to manage your production scheduling, you will find
                RMDB a refreshing option. RMDB's intuitive and flexible
                structure and data integration, enables us to offer a no-risk,
                pre-sales, implementation walk-through to demonstrate exactly
                how the system can benefit your operations.
              </p>
              <p className="mb-4 text-muted-foreground">
                Since 1991, our mission has been to help manufacturers solve
                manufacturing and operations management problems with intuitive
                and easy-to-implement tools.
              </p>
              <p className="text-muted-foreground">
                The unique architecture facilitates custom configuration, in
                hours or days, vs. typical custom programming taking weeks or
                months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-2xl font-bold">Core Features</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="font-medium  text-lg">Finite Planning & Scheduling</p>
              <p className="text-[18px] text-muted-foreground">Realistic schedules based on actual capacity</p>
            </div>
            <div>
              <p className="font-medium text-lg">MRP and Inventory Management</p>
              <p className="text-[18px] text-muted-foreground">Complete material requirements planning</p>
            </div>
            <div>
              <p className="font-medium text-lg">Routings and Priority Scheduling</p>
              <p className="text-[18px] text-muted-foreground">Detailed production workflows with priorities</p>
            </div>
            <div>
              <p className="font-medium text-lg">Easy "what-if" analysis</p>
              <p className="text-[18px] text-muted-foreground">Test scenarios before implementation</p>
            </div>
            <div>
              <p className="font-medium text-lg">Purchasing and Receiving</p>
              <p className="text-[18px] text-muted-foreground">Integrated procurement management</p>
            </div>
            <div>
              <p className="font-medium text-lg">Forecasting</p>
              <p className="text-[18px] text-muted-foreground">Plan for future demand</p>
            </div>
            <div>
              <p className="font-medium text-lg">Costing and Estimating</p>
              <p className="text-[18px] text-muted-foreground">Accurate job cost tracking</p>
            </div>
            <div>
              <p className="font-medium text-lg">Integrates with ALL systems</p>
              <p className="text-[18px] text-muted-foreground">Works with Excel, ERP, accounting, and legacy systems</p>
            </div>
            <div>
              <p className="font-medium text-lg">APS and Lean Manufacturing</p>
              <p className="text-[18px] text-muted-foreground">Advanced planning optimized for lean operations</p>
            </div>
            <div>
              <p className="font-medium text-lg">Run stand alone or networked</p>
              <p className="text-[18px] text-muted-foreground">Flexible deployment options</p>
            </div>
            <div>
              <p className="font-medium text-lg">Production Planning</p>
              <p className="text-[18px] text-muted-foreground">Comprehensive manufacturing planning tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* Works The Way You Do Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Works The Way You Do</h2>
              <p className="mb-6 text-muted-foreground">
                Resource Manager-DB is the only system that is designed to adapt
                to your specific operational needs and nuances. RMDB utilizes
                your existing data resulting in rapid implementation and
                acceptance success.
              </p>
              <ul className="flex flex-wrap gap-4">
                <li className="font-medium text-lg">Adapts to how you work</li>
                <li className="font-medium text-lg">Leverages existing data</li>
                <li className="font-medium text-lg">Quick to configure</li>
              </ul>
            </div>
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/RMDB-Data-Import.png"
                alt="RMDB Data Import"
                className="w-full h-[400px] rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cruise Control Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/Manufacturing_Excel_Dashboard-1024x376.png"
                alt="Manufacturing Excel Dashboard"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold">
                Cruise Control Software for your Manufacturing Enterprise
              </h2>
              <h3 className="mb-3 text-xl font-semibold">Fill'er Up</h3>
              <p className="mb-4 text-muted-foreground">
                Resource Manager-DB lets you easily work with your current data.
                Import directly into Resource Manager-DB and let RMDB
                automatically fill in the details. You can even maintain this
                data in other systems, such as ERP, then refresh on demand.
              </p>
              <p className="mb-4 text-muted-foreground">
                <strong>IMPORTANT TAKEAWAY #1:</strong> Load, edit, reload
                entire data sets with the click of a button.
              </p>
              <p className="text-muted-foreground">
                <strong>IMPORTANT TAKEAWAY #2:</strong> Reports run on any
                version of Excel anywhere — Cloud, tablet, laptop, desktop,
                on-site, off-site and enterprise wide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Powerful Reporting</h2>
          <p className="mb-8 text-muted-foreground">
            With quick, powerful, and intuitive reporting, Resource Manager-DB
            stands above the crowd in its ability to present the important data
            in an easy and meaningful way.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/rmscreen2.jpg"
                alt="Gantt Report"
                className="mb-3 w-full rounded-lg"
              />
              <p className="font-medium text-lg">Gantt Report</p>
              <p className="text-[18px] text-muted-foreground">
                Top-level view with drill-down
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/sumrpt.jpg"
                alt="Summary Report"
                className="mb-3 w-full rounded-lg"
              />
              <p className="font-medium text-lg">Summary Report</p>
              <p className="text-[18px] text-muted-foreground">
                What to buy or make, when
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/item.jpg"
                alt="Item Report"
                className="mb-3 w-full rounded-lg"
              />
              <p className="font-medium text-lg">Item Report</p>
              <p className="text-[18px] text-muted-foreground">
                All requirements per part
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/07b.jpg"
                alt="Calendar Report"
                className="mb-3 w-full rounded-lg"
              />
              <p className="font-medium text-lg">Calendar Report</p>
              <p className="text-[18px] text-muted-foreground">
                Familiar wall calendar format
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/tree.jpg"
                alt="Routing & Tree Report"
                className="mb-3 w-full rounded-lg"
              />
              <p className="font-medium text-lg">Routing & Tree Report</p>
              <p className="text-[18px] text-muted-foreground">
                Visual bill-of-resource
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/prodrpt.jpg"
                alt="Production Report"
                className="mb-3 w-full rounded-lg"
              />
              <p className="font-medium text-lg">Production Report</p>
              <p className="text-[18px] text-muted-foreground">
                Traveler or work order printout
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/porpt.jpg"
                alt="Purchasing Report"
                className="mb-3 w-full rounded-lg"
              />
              <p className="font-medium text-lg">Purchasing & Receiving</p>
              <p className="text-[18px] text-muted-foreground">Automatic PO generation</p>
            </div>
            <div className="text-center">
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/RPT-DD1-300x241-1.png"
                alt="Workcenter Report"
                className="mb-3 w-full rounded-lg"
              />
              <p className="font-medium text-lg">Workcenter Report</p>
              <p className="text-[18px] text-muted-foreground">
                Real-time workcenter activity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Markets */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Who Uses RMDB?</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Job shops</li>
                <li>• Small-medium manufacturers</li>
                <li>• Multi-nationals</li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                Featuring easy integration with Excel, ERP, accounting, custom
                or other legacy systems, RMDB will provide you unsurpassed
                improvements in production planning and scheduling and
                enterprise-wide communication.
              </p>
            </div>
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/usmap.gif"
                alt="US Map showing customer locations"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
            </h2>
            <img
              src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
              alt="Collection of industry and business awards logos"
              className="mx-auto h-auto max-w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
