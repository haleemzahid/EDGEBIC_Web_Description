import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function SpreadsheetSchedulerPage() {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Spreadsheet Scheduler
            </h1>
            <p className="text-gray-700">
              Gantt Charting and Project Management with Excel
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-12">
            {/* Overview Section - Text Left, Menu Image Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Overview</h2>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Gantt Charting and Project Management Customizable Templates
                  for all versions of Excel (including the expansive 2007+ and
                  tablet supporting Office 365). Low cost and easy-to-use
                  spreadsheet templates for Project Management, Simple
                  Production Planning and Scheduling, Critical Path Method
                  (CPM), Critical Path Analysis, Customer Job Scheduling,
                  Generating Calendars and Gantt Charts with hourly, daily or
                  weekly time buckets.
                </p>
                <p className="leading-relaxed text-gray-700">
                  This collection can be used as a set of building blocks to
                  develop custom applications because it uses simple formulas
                  (source code provided), easily understood by the casual Excel
                  user.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/09/SS-Menu.png"
                  alt="Spreadsheet software interface for project scheduling and management"
                  width={800}
                  height={600}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Gantt Chart Section - Image Left, Text Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="order-2 flex justify-center md:order-1">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/09/SS-GanttDay-300x90-1.png"
                  alt="Color-coded Gantt chart spreadsheet"
                  width={300}
                  height={90}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Gantt Charts & Scheduling</h2>
                <p className="mb-4 leading-relaxed text-gray-700">
                  The Spreadsheet Scheduler includes simple Gantt Charting and
                  CPM (Critical Path Management) models for hourly, daily, or
                  weekly time units. By determining early and late starting
                  points for each task, as well as task duration and precedence
                  relationships, the template generates a Gantt Chart showing
                  which tasks are critical.
                </p>
                <p className="leading-relaxed text-gray-700">
                  Tasks that are critical must be done on time, otherwise the
                  entire schedule will slip.
                </p>
              </div>
            </div>

            {/* Critical Path Section - Text Left, Image Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Critical Path Analysis</h2>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Work flow and work-in-process models provide techniques for
                  scheduling customer jobs through single workstations,
                  workstations in series, or workstations in parallel. These
                  models enable more efficient planning and accurate customer
                  deliveries.
                </p>
                <p className="leading-relaxed text-gray-700">
                  Minimize average flow time, reduce the number of days late
                  for jobs, and decrease the total number of late jobs with
                  proper critical path planning.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/09/SS-CPathDay-300x204-1.png"
                  alt="Project schedule spreadsheet with early and late start times"
                  width={300}
                  height={204}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>

            {/* What-If Analysis Section - Image Left, Text Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="order-2 flex justify-center md:order-1">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/09/SS-4WC-296x300-1.png"
                  alt="Spreadsheet with production schedule and Gantt chart"
                  width={296}
                  height={300}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">What-If Analysis</h2>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Functionality includes the ability to do "what-if" analysis
                  to accommodate changes without missing deadlines. Perfect for
                  those looking to learn or teach project management concepts
                  or be introduced to formal project management systems.
                </p>
                <p className="leading-relaxed text-gray-700">
                  The 14 spreadsheet-based programs provide an easy-to-use set
                  of tools to help any organization manage projects more
                  efficiently and improve customer deliveries.
                </p>
              </div>
            </div>

            {/* Scheduling Techniques Include */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                The scheduling techniques include:
              </h2>
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                  <li>Job & task sequencing</li>
                  <li>Gantt charts</li>
                  <li>Due-date assignment</li>
                </ul>
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                  <li>Development of calendars</li>
                  <li>Computation of lateness and other performance measures</li>
                  <li>Scheduling of work according to precedence relationships</li>
                </ul>
              </div>
            </div>

            {/* Applications Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Applications</h2>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <strong className="text-slate-900">Projects:</strong>{' '}
                  Activities are the components (tasks) of a project. Use
                  Gantt chart and CPM to schedule tasks and determine project
                  completion time and critical activities.
                </li>
                <li>
                  <strong className="text-slate-900">Manufacturing Shop Jobs:</strong>{' '}
                  Jobs coming into a shop consist of several operations.
                  Operations may require precedence restrictions (e.g., cannot
                  drill hole in a part until the metal casting is made).
                  Assign sequence to jobs to determine the overall flow or
                  queue of jobs and schedule of operation.
                </li>
                <li>
                  <strong className="text-slate-900">Work Flow Models:</strong>{' '}
                  Use in creating work flow diagrams showing events and
                  activities in a work process and the time requirements at
                  each step. Can be used to spot process improvement
                  opportunities and estimate process cycle time prior to
                  implementation.
                </li>
              </ul>
            </div>

            {/* Scheduling Techniques Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Scheduling Techniques</h2>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <strong className="text-slate-900">Job (or task) sequencing:</strong>{' '}
                  The dispatching or releasing of jobs through the shop (or
                  tasks within a project) in a pre-determined order, using one
                  of several techniques (priority rules) such as first come
                  first served, shortest processing time, earliest due date.
                </li>
                <li>
                  <strong className="text-slate-900">Due-date assignment:</strong>{' '}
                  Assigning due dates to jobs based on date in, processing
                  time, capacity.
                </li>
                <li>
                  <strong className="text-slate-900">Gantt Chart:</strong>{' '}
                  A horizontal bar chart used in scheduling. Tasks are listed
                  on the vertical axis and task start and completion dates are
                  reflected on the horizontal scale by bar positions and
                  lengths.
                </li>
                <li>
                  <strong className="text-slate-900">Precedence Relationships:</strong>{' '}
                  Certain tasks in a project may have to be completed before
                  others can be started. These precedence requirements can be
                  input and critical paths determined.
                </li>
                <li>
                  <strong className="text-slate-900">CPM:</strong>{' '}
                  The critical path method is a network based technique of
                  determining project makespan (or duration) and critical
                  activities, as well as project slack.
                </li>
              </ul>
            </div>

            {/* Awards Banner */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
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
