import Link from 'next/link';

import { RMDBFeatureList } from '@/components/marketing/sections/rmdb-feature-list';

export default function ResourceManagerDBInDepthPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl font-bold">
            Resource Manager DB: In Depth
          </h1>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="pt-6">
        <div className="container flex items-center justify-center mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-6 text-lg">
            <Link href="/resource-manager-db-2#summary" className="text-slate-700 hover:text-cyan-500">
              Summary
            </Link>
            <Link href="/resource-manager-db-in-depth" className="text-slate-700 hover:text-cyan-500">
              In Depth
            </Link>
            <Link
              href="https://www.usersolutions.com/wp-content/uploads/2022/10/rmdbquickstart23.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-cyan-500"
            >
              Quick Start
            </Link>
            <Link href="/edgebi" className="text-slate-700 hover:text-cyan-500">
              EDGEBI
            </Link>
            <Link href="/contact-us" className="text-slate-700 hover:text-cyan-500">
              Live Demo
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
              <p className="mb-4 text-slate-600">
                Resource Manager-DB (RMDB) is an affordable, flexible and
                quick-to-implement approach to resolve your production planning,
                scheduling and tracking challenges. Designed by customers just
                like you, Resource Manager-DB features a single, simple menu
                (dashboard) requiring minimal transactions to keep the system
                accurate.
              </p>
              <p className="text-slate-600">
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

      {/* Make Manufacturing Great Again Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex justify-center">
            <img
              src="https://www.usersolutions.com/wp-content/uploads/2022/10/MMGAsmall_Colver.png"
              alt="Make Manufacturing Great Again - Vintage Car"
              className="max-w-md rounded-lg"
            />
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
              <p className="mb-4 text-slate-600">
                If you find you are still using manual white boards and/or Excel
                for trying to manage your production scheduling, you will find
                RMDB a refreshing option. RMDB's intuitive and flexible
                structure and data integration, enables us to offer a no-risk,
                pre-sales, implementation walk-through to demonstrate exactly
                how the system can benefit your operations.
              </p>
              <p className="mb-4 text-slate-600">
                Since 1991, our mission has been to help manufacturers solve
                manufacturing and operations management problems with intuitive
                and easy-to-implement tools.
              </p>
              <p className="text-slate-600">
                The unique architecture facilitates custom configuration, in
                hours or days, vs. typical custom programming taking weeks or
                months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <RMDBFeatureList />

      {/* Works The Way You Do Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Works The Way You Do</h2>
              <p className="mb-6 text-slate-600">
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
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/Manufacturing_Excel_Dashboard-1024x376.png"
                alt="Manufacturing Excel Dashboard"
                className="w-full rounded-lg shadow-md"
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
              <h2 className="mb-4 text-2xl font-bold">
                Cruise Control Software for your Manufacturing Enterprise Fill'er Up
              </h2>
              <p className="mb-4 text-slate-600">
                Resource Manager-DB lets you easily work with your current data. Do you have
                a product list somewhere? How about bills-of-material and/or routings? Sales
                orders, inventory levels, even work-in-process data. Import directly into
                Resource Manager-DB and let RMDB automatically fill in the details. You can
                even maintain this data in other systems, such as ERP, then refresh on demand.
                Starting from scratch? Resource Manager-DB features a clean and simple way to
                create master item lists and dynamically create bills-of-resources.
              </p>
              <p className="mb-4 text-slate-600">
                Resource Manager-DB is designed to work seamlessly with Excel. <strong>IMPORTANT
                  TAKEAWAY #1:</strong> This provides great flexibility in rapid implementation
                options as it allows you to load, edit, reload entire data sets with the click
                of a button.
              </p>
              <p className="text-slate-600">
                <strong>IMPORTANT TAKEAWAY #2:</strong> Output reports can easily circulate
                throughout the organization in familiar Excel format for editing and reimporting
                back into Resource Manager-DB to update the system. Reports run on any version
                of Excel anywhere — Cloud, tablet, laptop, desktop, on-site, off-site and
                enterprise wide.
              </p>
            </div>
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/RMDB-Data-Import.png"
                alt="RMDB Import Data Dialog"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Relax, Cruise Control is on Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/rmscreen2.jpg"
                alt="RMDB Schedule Interface"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold">Relax, Cruise Control is on</h2>
              <p className="mb-4 text-slate-600">
                That's it! You are in the driver's seat and cruise control is on. Enjoy the
                view. Check the production calendar for a quick view of finite-capacity loading
                on work centers and time-phased inventory levels. Bottlenecks are easy to spot
                by the red flags. Run your favorite report to view schedule data the way you like it.
              </p>
              <p className="text-slate-600">
                Need to correct a schedule? Quickly adjust working calendar, shift available
                resources, and click to reschedule. For effortless cruise control of your
                business, simply make the top level changes and regenerate the master schedule
                with a click of the mouse. Change delivery due dates, split up quantities,
                combine forward and reverse scheduling; all the options for a quick adjustment
                are under your immediate control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fine-Tuning Options Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Fine-Tuning Options</h2>
          <p className="mb-6 text-slate-600">
            Beyond basic cruise control, RMDB allows you to progressively implement
            detailed execution plans as your needs grow:
          </p>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-2">
              <span className="text-slate-600">• Prioritize job sequences</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-600">• Adjust inventory levels</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-600">• Track receiving activities</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-600">• Generate purchase orders</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-600">• Regenerate schedules with new priorities</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-600">• Sequence any time</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-600">• Complete inventory management</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-600">• Feedback actual manufacturing data</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-600">• Run adjusted net plans</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-600">• Instantly reconfigure systems</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-600">• Update BOMs and Routings to reflect reality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Powerful Reporting</h2>
          <p className="mb-8 text-slate-600">
            With quick, powerful, and intuitive reporting, Resource Manager-DB
            stands above the crowd in its ability to present the important data
            in an easy and meaningful way. In addition to the robust reports
            that are included with Resource Manager-DB, the user can easily
            configure canned, custom reports that become a permanent part of the
            system.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Gantt Report */}
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/07b.jpg"
                alt="Gantt Report"
                className="mb-3 w-full rounded-lg"
              />
              <h3 className="mb-2 text-lg font-bold">Gantt Report</h3>
              <p className="text-slate-600">
                A great top-level view of all activity with details only a click
                away. Instantly check the due dates of all jobs in schedule,
                drill down to find bottlenecks, adjust capacity and schedule to
                meet critical dates.
              </p>
            </div>

            {/* Summary Report */}
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/sumrpt.jpg"
                alt="Summary Report"
                className="mb-3 w-full rounded-lg"
              />
              <h3 className="mb-2 text-lg font-bold">Summary Report</h3>
              <p className="text-slate-600">
                The report will tell you what you need to buy or make, how much,
                and when – all consolidated on a single sheet. An instant, top
                level MRP Report for all products and workcenter loading. View
                over any time horizon – by day, week, or month.
              </p>
            </div>

            {/* Item Report */}
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/item.jpg"
                alt="Item Report"
                className="mb-3 w-full rounded-lg"
              />
              <h3 className="mb-2 text-lg font-bold">Item Report</h3>
              <p className="text-slate-600">
                Summarizes all requirements per part number. Ideal for
                WorkCenter Loading, listing each job with start/completion times
                and requirements.
              </p>
            </div>

            {/* Calendar Report */}
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/07b.jpg"
                alt="Calendar Report"
                className="mb-3 w-full rounded-lg"
              />
              <h3 className="mb-2 text-lg font-bold">Calendar Report</h3>
              <p className="text-slate-600">
                View and print the schedule in familiar "wall calendar" format.
              </p>
            </div>

            {/* Workcenter Report */}
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/RPT-DD1-300x241-1.png"
                alt="Workcenter Report"
                className="mb-3 w-full rounded-lg"
              />
              <h3 className="mb-2 text-lg font-bold">Workcenter Report</h3>
              <p className="text-slate-600">
                Instant, real-time views of all critical workcenter activity by:
                daily loading, backlog, % utilization, hours available and
                bottlenecks. Allows for quick overtime scheduling and other
                detailed adjustments for any workcenter on any day. Also
                features a daily workcenter "to-do" list.
              </p>
            </div>

            {/* Routing & Tree Report */}
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/tree.jpg"
                alt="Routing & Tree Report"
                className="mb-3 w-full rounded-lg"
              />
              <h3 className="mb-2 text-lg font-bold">Routing & Tree Report</h3>
              <p className="text-slate-600">
                Intuitive reports for visual bill-of-resource verification,
                process flow and schedule feedback.
              </p>
            </div>

            {/* Production Report */}
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/prodrpt.jpg"
                alt="Production Report"
                className="mb-3 w-full rounded-lg"
              />
              <h3 className="mb-2 text-lg font-bold">Production Report</h3>
              <p className="text-slate-600">
                Perfect for traveler or work order printout. Automatically
                reconciles inventory and capacity for a job and lists sequence
                of operations and products to fulfill order on time. Includes
                space for check off and actual feedback as well as job costing
                and variance reporting.
              </p>
            </div>

            {/* Purchasing & Receiving */}
            <div>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/porpt.jpg"
                alt="Purchasing & Receiving Report"
                className="mb-3 w-full rounded-lg"
              />
              <h3 className="mb-2 text-lg font-bold">Purchasing & Receiving</h3>
              <p className="text-slate-600">
                Resource Manager-DB excels with its integrated purchasing and
                receiving module. Designed to meet the tough requirements for
                Lean Manufacturing. Generate purchase orders via Kanban or
                standard requirements with one click. Track received quantities,
                open/closed status, and adjust inventory automatically. Auto-email
                RFQs and POs to vendors.
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
              <ul className="space-y-2 text-slate-600">
                <li>• Job shops</li>
                <li>• Small-medium manufacturers</li>
                <li>• Multi-nationals</li>
              </ul>
              <p className="mt-4 text-slate-600">
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

      {/* Special Services & Partners Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-4 text-2xl font-bold">
            <span>Special</span>{' '}
            <span>Services & Partners</span>
          </h2>
          <p className="text-slate-600">
            User Solutions offers a variety of direct services to meet any special needs,
            including: automatic data integration with other systems, customized reports,
            on site training and configuration and much more. In addition, User Solutions
            has partnered with a number of complementary product and service companies to
            provide complete solutions focused on unique needs.
          </p>
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
