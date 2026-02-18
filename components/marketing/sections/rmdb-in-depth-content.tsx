import Image from 'next/image';

export function RMDBInDepthContent() {
  return (
    <div className="space-y-12">
      {/* Overview Section */}
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Overview</h2>
          <p className="mb-4 text-slate-600">
            Resource Manager-DB (RMDB) is an affordable, flexible and
            quick-to-implement approach to resolve your production planning,
            scheduling and tracking challenges. Designed by customers just like
            you, Resource Manager-DB features a single, simple menu (dashboard)
            requiring minimal transactions to keep the system accurate.
          </p>
          <p className="text-slate-600">
            RMDB&apos;s unique, customer driven architecture allows you to start
            very simply, focusing on one area at a time, enabling you to provide
            minimal information in order to recognize immediate benefits.
          </p>
        </div>
        <div>
          <Image
            src="/images/Edgebic/2022-10/RMDB-MainMenu.png"
            alt="RMDB Main Menu Dashboard"
            width={600}
            height={400}
            className="w-full rounded-lg shadow-md"
            loading="lazy"
            quality={80}
          />
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <Image
            src="/images/Edgebic/2022-10/ERP_Scheduling-300x245-1.png"
            alt="ERP Scheduling Integration"
            width={300}
            height={245}
            className="w-full rounded-lg"
            loading="lazy"
            quality={80}
          />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            Why Choose Resource Manager-DB?
          </h2>
          <p className="mb-4 text-slate-600">
            If you find you are still using manual white boards and/or Excel for
            trying to manage your production scheduling, you will find RMDB a
            refreshing option. RMDB&apos;s intuitive and flexible structure and
            data integration, enables us to offer a no-risk, pre-sales,
            implementation walk-through to demonstrate exactly how the system
            can benefit your operations.
          </p>
          <p className="mb-4 text-slate-600">
            Since 1991, our mission has been to help manufacturers solve
            manufacturing and operations management problems with intuitive and
            easy-to-implement tools.
          </p>
          <p className="text-slate-600">
            The unique architecture facilitates custom configuration, in hours
            or days, vs. typical custom programming taking weeks or months. By
            driving our product development based on your requests, combined
            with the rapid custom configuration abilities of RMDB, the result is
            a solution that fits your operation like a glove, quickly and
            affordably. Featuring easy integration with Excel, ERP, accounting,
            custom or other legacy systems, RMDB will provide you unsurpassed
            improvements in production planning and scheduling and
            enterprise-wide communication.
          </p>
        </div>
      </div>

      {/* Works The Way You Do Section */}
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Works The Way You Do</h2>
          <p className="mb-6 text-slate-600">
            Resource Manager-DB is the only system that is designed to adapt to
            your specific operational needs and nuances. RMDB utilizes your
            existing data resulting in rapid implementation and acceptance
            success.
          </p>
          <ul className="flex flex-wrap gap-4">
            <li className="text-lg font-medium">Adapts to how you work</li>
            <li className="text-lg font-medium">Leverages existing data</li>
            <li className="text-lg font-medium">Quick to configure</li>
          </ul>
        </div>
        <div>
          <Image
            src="/images/Edgebic/2022-10/Manufacturing_Excel_Dashboard-1024x376.png"
            alt="Manufacturing Excel Dashboard"
            width={1024}
            height={376}
            className="w-full rounded-lg shadow-md"
            loading="lazy"
            quality={80}
          />
        </div>
      </div>

      {/* Cruise Control Section */}
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            Cruise Control Software for your Manufacturing Enterprise
            Fill&apos;er Up
          </h2>
          <p className="mb-4 text-slate-600">
            Resource Manager-DB lets you easily work with your current data. Do
            you have a product list somewhere? How about bills-of-material
            and/or routings? Sales orders, inventory levels, even
            work-in-process data. Import directly into Resource Manager-DB and
            let RMDB automatically fill in the details. You can even maintain
            this data in other systems, such as ERP, then refresh on demand.
            Starting from scratch? Resource Manager-DB features a clean and
            simple way to create master item lists and dynamically create
            bills-of-resources.
          </p>
          <p className="mb-4 text-slate-600">
            Resource Manager-DB is designed to work seamlessly with Excel.{' '}
            <strong>IMPORTANT TAKEAWAY #1:</strong> This provides great
            flexibility in rapid implementation options as it allows you to
            load, edit, reload entire data sets with the click of a button.
          </p>
          <p className="text-slate-600">
            <strong>IMPORTANT TAKEAWAY #2:</strong> Output reports can easily
            circulate throughout the organization in familiar Excel format for
            editing and reimporting back into Resource Manager-DB to update the
            system. Reports run on any version of Excel anywhere — Cloud,
            tablet, laptop, desktop, on-site, off-site and enterprise wide.
          </p>
        </div>
        <div>
          <Image
            src="/images/Edgebic/2022-10/RMDB-Data-Import.png"
            alt="RMDB Import Data Dialog"
            width={600}
            height={400}
            className="w-full rounded-lg shadow-md"
            loading="lazy"
            quality={80}
          />
        </div>
      </div>

      {/* Check the MAP Section */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">Check the &quot;MAP&quot;</h2>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="flex justify-center">
            <Image
              src="/images/Edgebic/2022-10/usmap.gif"
              alt="Treasure Map illustration"
              width={300}
              height={200}
              className="max-w-xs"
              loading="lazy"
              unoptimized
            />
          </div>
          <div>
            <p className="mb-4 text-slate-600">
              <span className="px-1">Where do you need to go?</span> Which
              orders need to be shipped when? Resource Manager features a
              simple, single, screen to control your whole operation.
            </p>
            <p className="mb-4 text-slate-600">
              Enter (or link with outside system), the quantities and due dates.
              Optionally add detailed customer or order information. Now
              schedule.
            </p>
            <p className="text-slate-600">
              Only Resource Manager gives you quick and easy top level control
              for recognizing the immediate benefits of an integrated
              manufacturing system
            </p>
          </div>
        </div>
      </div>

      {/* Relax, Cruise Control is on Section */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">Relax, Cruise Control is on</h2>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="mb-4 text-slate-600">
              That&apos;s it! You are in the driver&apos;s seat and cruise
              control is on. Enjoy the view. Check the production calendar for a
              quick view of finite-capacity loading on work centers and
              time-phased inventory levels. Bottlenecks are easy to spot by the
              red flags. Run your favorite report to view schedule data the way
              you like it.
            </p>
            <p className="text-slate-600">
              Need to correct a schedule? Quickly adjust working calendar, shift
              available resources, and click to reschedule. For effortless
              cruise control of your business, simply make the top level changes
              and regenerate the master schedule with a click of the mouse.
              Change delivery due dates, split up quantities, combine forward
              and reverse scheduling; all the options for a quick adjustment are
              under your immediate control.
            </p>
          </div>
          <div>
            <Image
              src="/images/Edgebic/2022-10/RMDB-MainMenu.png"
              alt="RMDB Main Menu Interface"
              width={600}
              height={400}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>
      </div>

      {/* Fine-Tuning Options Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Fine-Tuning Options</h2>
        <p className="mb-6 text-slate-600">
          Beyond basic cruise control, RMDB allows you to progressively
          implement detailed execution plans as your needs grow:
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
            <span className="text-slate-600">
              • Regenerate schedules with new priorities
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Sequence any time</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">
              • Complete inventory management
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">
              • Feedback actual manufacturing data
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Run adjusted net plans</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">
              • Instantly reconfigure systems
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">
              • Update BOMs and Routings to reflect reality
            </span>
          </div>
        </div>
      </div>

      {/* Reporting Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Powerful Reporting</h2>
        <p className="mb-8 text-slate-600">
          With quick, powerful, and intuitive reporting, Resource Manager-DB
          stands above the crowd in its ability to present the important data in
          an easy and meaningful way. In addition to the robust reports that are
          included with Resource Manager-DB, the user can easily configure
          canned, custom reports that become a permanent part of the system.
        </p>

        <div className="mb-8">
          <h3 className="mb-2 text-xl font-bold">Flexible Reporting</h3>
          <p className="mb-4 text-slate-600">
            Resource Manager-DB shines in its ability to present relevant data
            in an easy and meaningful way. Using Excel as report writer, RMDB
            offers 3 different report output options:
          </p>
          <ol className="mb-4 list-inside space-y-2 text-slate-800 font-semibold">
            <li>i. Customized reports via Data Export</li>
            <li>ii. Standard Reports off MAIN MENU</li>
            <li>iii. Direct Reports off key screens</li>
          </ol>
          <p className="text-slate-600">
            What is so very cool about using Excel as the report writer is all
            the fantastic Graphs, powerful formatting (including conditional
            formatting), Linking to other data sources, User custom formulas,
            even sharing reports via Excel 365 in Cloud. All customization in
            Excel becomes a permanent part of your system.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="mb-2 text-xl font-bold">
            I. Standard Reports off MAIN MENU
          </h3>
          <div className="grid items-start gap-8 md:grid-cols-2">
            <div>
              <p className="text-slate-600">
                Full set of preformatted Excel reports stored in RMRPT.xlsx. As
                the name implies, User Solutions seeks to provide exactly the
                reports that will provide the most value for you. Over 35 years
                - we keep adding YOUR good ideas as new, standard reports for
                all users. For every one of these reports, there are several
                options on how you might want it displayed, or printed out.
              </p>
              <Image
                src="/images/rmdb/reports/gantt-report.png"
                alt="Gantt Report - Spreadsheet Output"
                width={400}
                height={300}
                className="w-full rounded-lg"
                loading="lazy"
                quality={80}
              />
            </div>
            <div className="space-y-2">
              <Image
                src="/images/rmdb/reports/gantt-report-params.png"
                alt="Gantt Report - Select Parameters"
                width={400}
                height={200}
                className="w-full rounded-lg"
                loading="lazy"
                quality={80}
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Gantt Report */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-bold">Gantt Reports</h3>
              <p className="text-slate-600">
                A great top level view of all job activity, what&apos;s early,
                what&apos;s on time, what&apos;s late. Drill down for details on
                any selected jobs. Choose the time buckets (Days, weeks, months,
                even Hours). Choose planned jobs, actual jobs, or both. Final
                user formats in Excel that sticks.
              </p>
            </div>
            <div>
              <Image
                src="/images/Edgebic/2022-10/07b.jpg"
                alt="Gantt Report"
                width={400}
                height={300}
                className="w-full rounded-lg shadow-md"
                loading="lazy"
                quality={80}
              />
            </div>
          </div>

          {/* Summary Report */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-bold">Summary Report</h3>
              <p className="text-slate-600">
                The report will tell you what you need to buy or make, how much,
                and when – all consolidated on a single sheet. An instant, top
                level MRP Report for all products and workcenter loading. View
                over any time horizon – by day, week, or month.
              </p>
            </div>
            <div>
              <Image
                src="/images/Edgebic/2022-10/sumrpt.jpg"
                alt="Summary Report"
                width={400}
                height={300}
                className="w-full rounded-lg shadow-md"
                loading="lazy"
                quality={80}
              />
            </div>
          </div>

          {/* Item Report */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-bold">Item Report</h3>
              <p className="text-slate-600">
                Summarizes all requirements per part number. Ideal for
                WorkCenter Loading, listing each job with start/completion times
                and requirements.
              </p>
            </div>
            <div>
              <Image
                src="/images/Edgebic/2022-10/item.jpg"
                alt="Item Report"
                width={400}
                height={300}
                className="w-full rounded-lg shadow-md"
                loading="lazy"
                quality={80}
              />
            </div>
          </div>

          {/* Calendar Report */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-bold">Calendar Report</h3>
              <p className="text-slate-600">
                View and print the schedule in familiar &quot;wall
                calendar&quot; format.
              </p>
            </div>
            <div>
              <Image
                src="/images/Edgebic/2022-10/07b.jpg"
                alt="Calendar Report"
                width={400}
                height={300}
                className="w-full rounded-lg shadow-md"
                loading="lazy"
                quality={80}
              />
            </div>
          </div>

          {/* Workcenter Report */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-bold">Workcenter Report</h3>
              <p className="text-slate-600">
                Instant, real-time views of all critical workcenter activity by:
                daily loading, backlog, % utilization, hours available and
                bottlenecks. Allows for quick overtime scheduling and other
                detailed adjustments for any workcenter on any day. Also
                features a daily workcenter &quot;to-do&quot; list.
              </p>
            </div>
            <div>
              <Image
                src="/images/Edgebic/2022-10/RPT-DD1-300x241-1.png"
                alt="Workcenter Report"
                width={300}
                height={241}
                className="w-full rounded-lg shadow-md"
                loading="lazy"
                quality={80}
              />
            </div>
          </div>

          {/* Routing & Tree Report */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-bold">Routing & Tree Report</h3>
              <p className="text-slate-600">
                Intuitive reports for visual bill-of-resource verification,
                process flow and schedule feedback.
              </p>
            </div>
            <div>
              <Image
                src="/images/Edgebic/2022-10/tree.jpg"
                alt="Routing & Tree Report"
                width={400}
                height={300}
                className="w-full rounded-lg shadow-md"
                loading="lazy"
                quality={80}
              />
            </div>
          </div>

          {/* Production Report */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-bold">Production Report</h3>
              <p className="text-slate-600">
                Perfect for traveler or work order printout. Automatically
                reconciles inventory and capacity for a job and lists sequence
                of operations and products to fulfill order on time. Includes
                space for check off and actual feedback as well as job costing
                and variance reporting.
              </p>
            </div>
            <div>
              <Image
                src="/images/Edgebic/2022-10/prodrpt.jpg"
                alt="Production Report"
                width={400}
                height={300}
                className="w-full rounded-lg shadow-md"
                loading="lazy"
                quality={80}
              />
            </div>
          </div>

          {/* Purchasing & Receiving */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-bold">Purchasing & Receiving</h3>
              <p className="text-slate-600">
                Resource Manager-DB excels with its integrated purchasing and
                receiving module. Designed to meet the tough requirements for
                Lean Manufacturing. Generate purchase orders via Kanban or
                standard requirements with one click. Track received quantities,
                open/closed status, and adjust inventory automatically.
                Auto-email RFQs and POs to vendors.
              </p>
            </div>
            <div>
              <Image
                src="/images/Edgebic/2022-10/porpt.jpg"
                alt="Purchasing & Receiving Report"
                width={400}
                height={300}
                className="w-full rounded-lg shadow-md"
                loading="lazy"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Special Services & Partners Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">
          <span>Special</span> <span>Services & Partners</span>
        </h2>
        <p className="text-slate-600">
          User Solutions offers a variety of direct services to meet any special
          needs, including: automatic data integration with other systems,
          customized reports, on site training and configuration and much more.
          In addition, User Solutions has partnered with a number of
          complementary product and service companies to provide complete
          solutions focused on unique needs.
        </p>
      </div>
    </div>
  );
}
