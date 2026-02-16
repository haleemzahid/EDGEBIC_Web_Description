import Image from 'next/image';

export function RMDBInDepthContent() {
  return (
    <div className="space-y-12">
      {/* Flexible Reporting Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Flexible Reporting</h2>
        <p className="mb-4 text-slate-600">
          Resource Manager-DB shines in its ability to present relevant data in an easy
          and meaningful way. Using Excel as report writer, RMDB offers 3 different report
          output options:
        </p>
        <ol className="mb-4 list-decimal pl-6 space-y-1 text-slate-600">
          <li>Standard Reports off MAIN MENU</li>
          <li>Direct Reports of key screens</li>
          <li>Completely customized reports via Data Export</li>
        </ol>
        <p className="text-slate-600">
          What is so very cool about using Excel as the report writer is all the fantastic
          Graphs, powerful formatting (including conditional formatting), Linking to other
          data sources, User custom formulas, even sharing reports via Excel 365 in Cloud.
          All customization in Excel becomes a permanent part of your system.
        </p>
      </div>

      {/* i. Standard Reports Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">
          i. Full set of preformatted Excel reports stored in RMRPT.xlsx
        </h2>
        <p className="mb-8 text-slate-600">
          As the name implies, User Solutions seeks to provide exactly the reports that
          will provide the most value for you. Over 35 years - we keep adding YOUR good
          ideas as new, standard reports for all users. For every one of these reports,
          there are several options on how you might want it displayed, or printed out.
        </p>

        {/* Gantt Reports */}
        <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-bold">Gantt Reports</h3>
            <p className="text-slate-600">
              A great top level view of all job activity, what&apos;s early, what&apos;s on time,
              what&apos;s late. Drill down for details on any selected jobs. Choose the time
              buckets (Days, weeks, months, even Hours). Choose planned jobs, actual jobs,
              or both. Final user formats in Excel that sticks.
            </p>
          </div>
          <div className="space-y-4">
            <Image
              src="/images/rmdb/reports/gantt-report-menu.png"
              alt="Gantt Report Menu and Parameters"
              width={600}
              height={400}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
            <Image
              src="/images/rmdb/reports/gantt-report.png"
              alt="Gantt Report Output"
              width={600}
              height={200}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>

        {/* Summary Report */}
        <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-bold">Summary Report</h3>
            <p className="text-slate-600">
              The report will tell you what you need to buy or make, how much, and when
              &ndash; all consolidated on a single sheet. An instant, top level Report for
              all products and workcenter loading. View over any time horizon &ndash; by
              day, week, or month. Blends in any actuals!
            </p>
          </div>
          <div className="space-y-4">
            <Image
              src="/images/rmdb/reports/summary-report-params.png"
              alt="Summary Report Parameters"
              width={600}
              height={400}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
            <Image
              src="/images/rmdb/reports/summary-report.png"
              alt="Summary Report Output"
              width={600}
              height={200}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>

        {/* Item Report */}
        <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-bold">Item Report</h3>
            <p className="text-slate-600">
              Summarizes all requirements per part number for both materials and finished
              goods as well as simple WorkCenter dispatch list showing each job with
              start/completion times and requirements in a simple block format.
            </p>
          </div>
          <div>
            <Image
              src="/images/rmdb/reports/item-report.png"
              alt="Item Report Output"
              width={600}
              height={400}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>

        {/* PickList and Open POs Report */}
        <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-bold text-red-600">PickList and Open POs Report</h3>
            <p className="text-slate-600">
              For those who need help managing materials, RMDB can manage all basic
              requirements for an MRP/Inventory system and/or simply complement what you
              already have.
            </p>
          </div>
          <div>
            <Image
              src="/images/rmdb/reports/picklist-report.png"
              alt="PickList and Open POs Report"
              width={600}
              height={400}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>

        {/* Routing Report */}
        <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-bold">Routing Report</h3>
            <p className="text-slate-600">
              Quickly generate your workcenter job lists in Excel, automatic print macros
              to print out one page for every workcenter, or simple export out to
              standalone Excel, update completions, and import back in!
            </p>
          </div>
          <div className="space-y-4">
            <Image
              src="/images/rmdb/reports/routing-menu.png"
              alt="Routing Report Menu"
              width={600}
              height={400}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
            <Image
              src="/images/rmdb/reports/routing-report.png"
              alt="Routing Report Output"
              width={600}
              height={200}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>

        {/* Production Report */}
        <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-bold">Production Report</h3>
            <p className="text-slate-600">
              Perfect for traveler or work order printout. Automatically reconciles
              inventory and capacity for a job and lists sequence of operations and
              products to fulfill order on time. Includes space for check off and actual
              feedback as well as job costing and variance reporting.
            </p>
          </div>
          <div className="space-y-4">
            <Image
              src="/images/rmdb/reports/production-report-params.png"
              alt="Production Report Parameters"
              width={600}
              height={400}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>

        {/* Shipping Report */}
        <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-bold text-red-600">Shipping Report</h3>
            <p className="text-slate-600">
              Quickly run by Customer full history of all shipments.
            </p>
          </div>
          <div>
            <Image
              src="/images/rmdb/reports/reports-menu.png"
              alt="Reports Menu showing Shipping option"
              width={300}
              height={300}
              className="w-auto rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>

        {/* Wall Calendar Report */}
        <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-bold">Wall Calendar Report</h3>
            <p className="text-slate-600">
              View and print the schedule in familiar &quot;wall calendar&quot; format.
            </p>
          </div>
          <div>
            <Image
              src="/images/rmdb/reports/wall-calendar-report.png"
              alt="Wall Calendar Report"
              width={600}
              height={400}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>

        {/* Production Calendar */}
        <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-bold">Production Calendar</h3>
            <p className="text-slate-600">
              A simple screen to see production requirements and allow for an easy manual update!
            </p>
          </div>
          <div>
            <Image
              src="/images/rmdb/reports/production-calendar.png"
              alt="Production Calendar"
              width={600}
              height={400}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>
      </div>

      {/* ii. Direct Screen to Excel Reporting */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">ii. Direct Screen to Excel Reporting</h2>
        <p className="mb-6 text-slate-600">
          Throughout the system, there are direct reports readily available. For example,
          in the Resource Calendar there are 6 tabs with various valuable KPIs always
          visible and an extensive selection of reports. So easy to use this for annual
          planning and so much more!
        </p>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <Image
              src="/images/rmdb/reports/resource-calendar.png"
              alt="Resource Calendar with KPI tabs"
              width={600}
              height={300}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
          <div>
            <Image
              src="/images/rmdb/reports/resource-calendar-reports.png"
              alt="Resource Calendar Report Options"
              width={300}
              height={400}
              className="w-auto rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>
      </div>

      {/* iii. Data Export */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">iii. Data Export</h2>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-slate-600">
              The Data Export module is a most powerful and flexible report generator. Most
              all of our &apos;custom&apos; reports for Clients are housed here. You can create ANY
              custom report, using data from ANY tables throughout system, and export to
              Excel. We have seen a couple of powerful and interesting applications therein.
              The first is for on-going, week to week, production KPI analysis. By creating
              a Job Status Report (which jobs are early, by how much, which ones are late,
              and by how much, etc.), then appending each week Job Status report - it&apos;s a
              wonderful way to track key KPIs throughout time.
            </p>
            <p className="text-slate-600">
              Another very cool aspect of using Excel and the RMDB Data Export is being able
              to export out a custom production sheet to Excel 365 in Cloud, then anyone with
              Excel 365 can view AND update schedule completely in Excel!
            </p>
            <p className="text-slate-600">
              RMDB Exports out the schedule. Production Supervisor updates status - and even
              includes other QC parameters all entered into Excel but stored permanently in RMDB.
            </p>
          </div>
          <div>
            <Image
              src="/images/rmdb/reports/data-export.png"
              alt="RMDB Data Export Module"
              width={600}
              height={500}
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>

        {/* FC Modular Case Study */}
        <div className="mt-8">
          <p className="mb-4 text-slate-600">
            Check out what we did for FC Modular building the first high rise, residential
            living, using commercial modular construction - this was for the Dean Street
            project abutting the Barclay Center in Brooklyn.
          </p>
          <p className="mb-6 text-slate-600">
            We added a simple dashboard so each supervisor could quickly call up their area
            and see which tasks are ready for them and at a glance see what tasks are ON TIME
            (green), which are POTENTIALLY LATE (Yellow, the scheduled start date has passed
            and we don&apos;t have an actual update) and finally which are LATE (red where actual
            finish dates &gt; scheduled finish dates).
          </p>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Image
                src="/images/rmdb/reports/fc-modular-dashboard.png"
                alt="FC Modular Factory Information System Dashboard"
                width={600}
                height={400}
                className="w-full rounded-lg shadow-md"
                loading="lazy"
                quality={80}
              />
            </div>
            <div>
              <Image
                src="/images/rmdb/reports/qc-inspection.png"
                alt="QC Inspection Steps Dashboard"
                width={600}
                height={400}
                className="w-full rounded-lg shadow-md"
                loading="lazy"
                quality={80}
              />
            </div>
          </div>
          <p className="mt-4 text-slate-600">
            And wait - there&apos;s more! We even added the QC/Inspection Steps to comply with
            Commercial Building Codes.
          </p>
          <p className="mt-2 text-slate-600">
            All we needed was ONE license for RMDB - even though there were dozens of
            &apos;users&apos; - well, Excel users.
          </p>
        </div>

        {/* RMDB Excel Cloud Integration */}
        <div className="mt-8 flex justify-center">
          <Image
            src="/images/rmdb/reports/rmdb-excel-cloud.png"
            alt="RMDB and Excel 365 Cloud Integration"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
            loading="lazy"
            quality={80}
          />
        </div>
      </div>

      {/* Special Services & Partners Section */}
      <div>
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
    </div>
  );
}
