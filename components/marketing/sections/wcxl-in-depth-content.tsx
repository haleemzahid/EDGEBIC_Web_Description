'use client';

import Image from 'next/image';

export function WCXLInDepthContent() {
  return (
    <div className="space-y-12">
      {/* Overview Section */}
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Overview</h2>
          <p className="mb-4 text-slate-600">
            Workcenter Scheduler XL (WCXL) is a high performance planning and scheduling
            offering for Job Shops, Fabricators, Service/Repair Shops, and others where
            customer service and shipping on time is vital. WCXL will enhance the
            effectiveness, efficiency and consistency of your Workcenter based planning
            and scheduling, including cycle time reduction.
          </p>
          <p className="text-slate-600">
            WCXL features an easy-to-use method to enter resource definitions, then to
            build/define jobs, or projects, with additional considerations such as labor
            and workcenter operations and routings. Next, WCXL allows you to perform
            &apos;what-ifs&apos; with different plans — resulting in feasible and effective
            production schedules.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/Edgebic/2022-07/wCXL-1024x342.png"
            alt="Workcenter Scheduler XL interface"
            width={500}
            height={170}
            className="rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      </div>

      {/* With WCXL Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">With WCXL, you will know:</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Daily schedules for Workcenters</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Capacity requirements</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Bottlenecks and Backlogs</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-600">• Strategic management information for optimizing on-time performance</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">Simple, familiar interface</h3>
            <p className="text-slate-600">
              One step menus, on-screen buttons, or sheet tabs make navigation a snap
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">Easy to configure and run</h3>
            <p className="text-slate-600">
              Quick, intuitive layout and prompts allows you to focus on your business
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">Finite capacity planning</h3>
            <p className="text-slate-600">
              Global and/or detailed workcenter configuration can be made and applied instantly
            </p>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">How it Works</h2>
        <p className="mb-6 text-slate-600">
          The most common processing of the WCXL system works in three simple stages:
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-xl font-bold">1. Default & System Definition</h3>
            <p className="text-slate-600">
              The first stage consists of default definition, including: Global daily defaults,
              Holidays, Workcenters defined, and exceptions list (for automatic reporting on
              delays at workcenters).
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-bold">2. Build & Schedule Jobs</h3>
            <p className="mb-4 text-slate-600">
              Then Jobs are &apos;Built&apos; with Customer name, Job Number, start date, and a super
              easy method for sequencing workcenters. Next, the newly built Jobs are sequenced
              and schedules are created.
            </p>
            <p className="mb-4 text-slate-600">
              The user has the freedom to try various quantities, with alternate start dates,
              and view the resultant summaries of resource requirements and schedule dates.
              It is in this phase that capacity constraints are revealed — as well as when
              labor and machine resources should be scheduled.
            </p>
            <p className="text-slate-600">
              Each schedule can either be viewed on screen or printed. The result of this
              second phase is an accurate production plan start and stop dates, and critical
              time path to successfully meet due dates.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-bold">3. Execution</h3>
            <p className="mb-4 text-slate-600">
              The third and final stage consists of using and reporting on the schedules
              created in stage two.
            </p>
            <p className="mb-4 text-slate-600">
              By design, WCXL does not require updates to actual schedule – but allows you
              &apos;by exception&apos; to flag jobs that are delayed and report on the cumulative
              effects of all delays.
            </p>
            <p className="text-slate-600">
              When the exceptions (or any other event) warrant that some Jobs need to be
              rescheduled, WCXL features an easy single click method to remove one or more
              Jobs from existing schedule, arrange new priority, and reschedule. Easy shipping
              and comprehensive reporting round out the WCXL system.
            </p>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Powerful and Extensive Reports</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">Defaults Report</h3>
            <p className="text-slate-600">
              Shows capacity defaults for each workcenter per configuration date
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">Routing Report</h3>
            <p className="text-slate-600">
              Job sequence, time at each workcenter, estimated completion date
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">WIP Report</h3>
            <p className="text-slate-600">
              Jobs by workcenter with date in, hours remaining, date out
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">ERD Report</h3>
            <p className="text-slate-600">
              Estimated Release Date - estimated ship date for all jobs
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">Backlog Report</h3>
            <p className="text-slate-600">
              Number of active Jobs in the system
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">Shipping Report</h3>
            <p className="text-slate-600">
              Performance data on Jobs shipped with Pareto chart
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">Throughput Report</h3>
            <p className="text-slate-600">
              Number of Jobs passing through each workstation daily
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">Exceptions Report</h3>
            <p className="text-slate-600">
              Exception-Based Tracking - compile list of exceptions and delays
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">Utilization Report</h3>
            <p className="text-slate-600">
              Performance data of utilization combined with backlogs
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-bold">Calendar Report</h3>
            <p className="text-slate-600">
              View and print schedule in familiar &quot;wall calendar&quot; format
            </p>
          </div>
        </div>
      </div>

      {/* Advanced Features Section */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">Advanced Features</h2>

        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-xl font-bold">Job Interruption Tracking</h3>
            <p className="text-slate-600">
              The Job Interruption sheet includes columns for Job ID, Workcenter, Interrupt Date,
              Resume Date, and Comments. This documents any jobs interrupted by higher-priority
              scheduling.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-bold">Freezing A Job</h3>
            <p className="mb-4 text-slate-600">
              To allow for an accurate, up-to-date schedule, the user can now call up any Job
              and update when complete. This feature, called &apos;freezing a Job at a Workcenter&apos;
              enables the user to track exactly when a workcenter has completed a job and then
              is able to reschedule WCXL.
            </p>
            <p className="text-slate-600">
              Rescheduling WCXL containing jobs with a frozen workcenters locks in the hour
              assignments in the resource calendar for workcenters previous to and including
              the frozen one. Then, the remaining workcenters are rescheduled according to
              priority order, capacity available, etc.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-bold">Priority List & Workcenter Tracking</h3>
            <p className="text-slate-600">
              In summary, with the Priority List, Workcenter Tracking, and ability to Unschedule
              and/or Reschedule any Jobs with a click of the mouse, WCXL will exceed your
              expectations for a planning and scheduling system that is powerful, accurate, and
              easy-to-use. WCXL now combines the quick planning capabilities with the ability to
              track actual Jobs, define priority lists, and reschedule as necessary to adjust to
              actual day-to-day interruptions to planned schedules.
            </p>
          </div>
        </div>

        <p className="mt-6 text-sm italic text-slate-600">
          <strong className="font-semibold">Note:</strong> If your routings are not linear
          (one after another, single branch), or if you have more advanced scheduling and
          tracking requirements, or need more flexibility for data integration with other
          systems, or need multi-user access (instead of one person with edit control and
          others with read only), we highly recommend you take a look at Resource Manager-DB.
        </p>
      </div>
    </div>
  );
}
