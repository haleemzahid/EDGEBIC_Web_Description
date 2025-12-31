import Image from 'next/image';
import Link from 'next/link';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WorkcenterSchedulerXLInDepthPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              : In Depth
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Complete Finite Capacity Planning and Job Scheduling
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
                  (WCXL) is a high performance planning
                  and scheduling offering for Job Shops, Fabricators,
                  Service/Repair Shops, and others where customer service and
                  shipping on time is vital. WCXL will enhance the
                  effectiveness, efficiency and consistency of your Workcenter
                  based planning and scheduling, including cycle time reduction.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  WCXL features an easy-to-use method to enter resource
                  definitions, then to build/define jobs, or projects, with
                  additional considerations such as labor and workcenter
                  operations and routings. Next, WCXL allows you to perform
                  'what-ifs' with different plans — resulting in feasible and
                  effective production schedules.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* With WCXL, you will know Section */}
      <section className="  pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  With WCXL, you will know:
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul>
                  <li>Daily schedules for Workcenters</li>
                  <li>Capacity requirements</li>
                  <li>Bottlenecks and Backlogs</li>
                  <li>
                    Strategic management information, such as on-time shipments
                    and 'late' reports to assist in optimizing operations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Simple, familiar interface
                  </h3>
                  <p className="text-muted-foreground">
                    One step menus, on-screen buttons, or sheet tabs make
                    navigation a snap
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Easy to configure and run
                  </h3>
                  <p className="text-muted-foreground">
                    Quick, intuitive layout and prompts allows you to focus on
                    your business
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Finite capacity planning
                  </h3>
                  <p className="text-muted-foreground">
                    Global and/or detailed workcenter configuration can be made
                    and applied instantly
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="  pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  How it Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The most common processing of the WCXL system works in three
                  simple stages:
                </p>

                <h3 className="text-2xl font-semibold text-foreground">
                  1. Default & System Definition
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The first stage consists of default definition, including:
                  Global daily defaults, Holidays, Workcenters defined, and
                  exceptions list (for automatic reporting on delays at
                  workcenters).
                </p>

                <h3 className="text-2xl font-semibold text-foreground">
                  2. Build & Schedule Jobs
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Then Jobs are 'Built' with Customer name, Job Number, start
                  date, and a super easy method for sequencing workcenters.
                  Next, the newly built Jobs are sequenced and schedules are
                  created.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The user has the freedom to try various quantities, with
                  alternate start dates, and view the resultant summaries of
                  resource requirements and schedule dates. It is in this phase
                  that capacity constraints are revealed — as well as when labor
                  and machine resources should be scheduled.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Each schedule can either be viewed on screen or printed. The
                  result of this second phase is an accurate production plan
                  start and stop dates, and critical time path to successfully
                  meet due dates.
                </p>

                <h3 className="text-2xl font-semibold text-foreground">
                  3. Execution
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The third and final stage consists of using and reporting on
                  the schedules created in stage two.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  By design, WCXL does not require updates to actual schedule –
                  but allows you 'by exception' to flag jobs that are delayed
                  and report on the cumulative effects of all delays.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  When the exceptions (or any other event) warrant that some
                  Jobs need to be rescheduled, WCXL features an easy single
                  click method to remove one or more Jobs from existing
                  schedule, arrange new priority, and reschedule. Easy shipping
                  and comprehensive reporting round out the WCXL system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Powerful and Extensive Reports
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Routing Report
                  </h3>
                  <p className="text-muted-foreground">
                    Job sequence, time at each workcenter, estimated completion
                    date
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    WIP Report
                  </h3>
                  <p className="text-muted-foreground">
                    Jobs by workcenter with date in, hours remaining, date out
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    ERD Report
                  </h3>
                  <p className="text-muted-foreground">
                    Estimated Release Date - estimated ship date for all jobs
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Backlog Report
                  </h3>
                  <p className="text-muted-foreground">
                    Number of active Jobs in the system
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Shipping Report
                  </h3>
                  <p className="text-muted-foreground">
                    Performance data on Jobs shipped with Pareto chart
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Throughput Report
                  </h3>
                  <p className="text-muted-foreground">
                    Number of Jobs passing through each workstation daily
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Exceptions Report
                  </h3>
                  <p className="text-muted-foreground">
                    Exception-Based Tracking - compile list of exceptions and
                    delays
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Utilization Report
                  </h3>
                  <p className="text-muted-foreground">
                    Performance data of utilization combined with backlogs
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Calendar Report
                  </h3>
                  <p className="text-muted-foreground">
                    View and print schedule in familiar "wall calendar" format
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="  pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Advanced Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground">
                  Freezing A Job
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  To allow for an accurate, up-to-date schedule, the user can
                  now call up any Job and update when complete. This feature,
                  called 'freezing a Job at a Workcenter' enables the user to
                  track exactly when a workcenter has completed a job and then
                  is able to reschedule WCXL.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Rescheduling WCXL containing jobs with a frozen workcenters
                  locks in the hour assignments in the resource calendar for
                  workcenters previous to and including the frozen one. Then,
                  the remaining workcenters are rescheduled according to
                  priority order, capacity available, etc.
                </p>

                <h3 className="text-2xl font-semibold text-foreground">
                  Priority List & Workcenter Tracking
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  In summary, with the Priority List, Workcenter Tracking, and
                  ability to Unschedule and/or Reschedule any Jobs with a click
                  of the mouse, WCXL will exceed your expectations for a
                  planning and scheduling system that is powerful, accurate, and
                  easy-to-use. WCXL now combines the quick planning capabilities
                  with the ability to track actual Jobs, define priority lists,
                  and reschedule as necessary to adjust to actual day-to-day
                  interruptions to planned schedules.
                </p>

                <p className="text-sm italic">
                  <strong className="font-semibold text-foreground">
                    Note:
                  </strong>{' '}
                  If your routings are not linear (one after another, single
                  branch), or if you have more advanced scheduling and tracking
                  requirements, or need more flexibility for data integration
                  with other systems, or need multi-user access (instead of one
                  person with edit control and others with read only), we highly
                  recommend you take a look at Resource Manager-DB. We'd be glad
                  to meet with you and run through that system with YOUR data
                  and solve your most pressing challenges in the easiest way
                  possible!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <Image
                  src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  width={1024}
                  height={128}
                  className="mx-auto h-auto max-w-full"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
