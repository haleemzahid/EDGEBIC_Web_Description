'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpDown,
  BarChart3,
  Calendar,
  Database,
  Eye,
  LineChart,
  MapPin,
  Maximize2,
  MousePointer,
  Phone,
  RefreshCw,
  Settings,
  Shield
} from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Button } from '@/components/ui/button';

// Video Player Component
function VideoPlayer({
  videoUrl,
  title,
  thumbnail,
  onPlayStateChange
}: {
  videoUrl: string;
  title: string;
  thumbnail: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    onPlayStateChange?.(true);
  };

  const handlePause = () => {
    onPlayStateChange?.(false);
  };

  const handleEnded = () => {
    onPlayStateChange?.(false);
  };

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      title={title}
      className="absolute inset-0 size-full rounded-lg object-cover"
      controls
      playsInline
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
    >
      Your browser does not support the video tag.
    </video>
  );
}

export default function EDGEBIPage(): React.JSX.Element {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  const navigationItems = [
    {
      label: 'Summary',
      href: '#summary',
      description: 'Overview of EDGEBIC capabilities'
    },
    {
      label: 'RMDB',
      href: '/resource-manager-db-2',
      description: 'Resource Manager Database foundation'
    },
    {
      label: 'Live Demo',
      href: '/contact',
      external: true,
      description: 'Schedule a personalized demonstration'
    }
  ];

  const features = [
    {
      icon: MousePointer,
      title: 'Enhanced Drag-n-drop Environment',
      description: 'Intuitive graphical interface for easy schedule management'
    },
    {
      icon: BarChart3,
      title: 'Business Intelligence Integration',
      description: 'Advanced analytics and reporting capabilities built-in'
    },
    {
      icon: Eye,
      title: 'Color-coded Schedule Visualization',
      description: 'Up-to-the-minute status display with intuitive color coding'
    },
    {
      icon: ArrowUpDown,
      title: 'Drag & Drop Job Segments',
      description:
        'Move any job segment between workcenters with simple mouse clicks'
    },
    {
      icon: Maximize2,
      title: 'Real-time Segment Resizing',
      description: 'Adjust job duration based on real-time production issues'
    },
    {
      icon: Calendar,
      title: 'Capacity Blocking',
      description: 'Block out capacity for downtime or maintenance events'
    },
    {
      icon: MapPin,
      title: 'Heat Map Visualization',
      description: 'View capacity loading for entire schedule at a glance'
    },
    {
      icon: LineChart,
      title: 'Schedule Key Dates Reports',
      description: 'Export detailed activity reports to Excel for analysis'
    },
    {
      icon: Settings,
      title: 'Customized Reporting',
      description: 'Tailored reports configured per your specific requests'
    },
    {
      icon: Shield,
      title: 'Advanced Security Options',
      description:
        'Configure view-only users or power users with edit permissions'
    },
    {
      icon: Database,
      title: 'Shared Database Architecture',
      description:
        'Installs separately from RMDB while sharing the same database'
    },
    {
      icon: RefreshCw,
      title: 'Real-time Schedule Updates',
      description:
        'Press update button to reschedule and reflect reality instantly'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <GridSection hideVerticalGridLines>
        <div className="container pt-6">
          <div className="mx-auto max-w-7xl">
            {/* Hero Header */}
            <div className="mb-6 text-center">
              <SiteHeading
                badge="Advanced Scheduling"
                title="Welcome to EDGEBIC"
                description="EDGEBIC stands for Enhanced Drag-n-drop Graphical Environment with Business Intelligence. A graphical overlay for Resource Manager DB. Finally, you can manage your production scheduling with an intuitive graphical approach that can be easily customized."
              />
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800"
                >
                  <Link
                    href="/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Phone className="size-5" />
                    Contact US for Demo
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                >
                  <Link
                    href="/resource-manager-db-2"
                    className="flex items-center gap-2"
                  >
                    <Database className="size-5" />
                    View RMDB
                  </Link>
                </Button>
              </div>
            </div>

            {/* Video Section */}
            <div className="mb-6">
              <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border bg-slate-100 shadow-2xl dark:bg-slate-800">
                <div className="relative aspect-video">
                  <VideoPlayer
                    videoUrl="https://www.usersolutions.com/wp-content/uploads/2022/12/EDGEBIC%20updated%20thumbnail.mp4"
                    title="EDGE Suite Demo"
                    thumbnail="https://www.usersolutions.com/wp-content/uploads/2022/11/Premium-1.png"
                    onPlayStateChange={setIsVideoPlaying}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </GridSection>

      {/* Overview Section */}
      <section
        id="summary"
        className="bg-slate-50 py-6 dark:bg-slate-900"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Overview</h2>
            <p className="text-xl text-muted-foreground">
              EDGEBIC is the ideal interface for managing the schedule produced
              by Resource Manager DB
            </p>
          </div>

          <div className="space-y-16">
            {/* First Feature */}
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">
                  Enhanced Drag-n-drop Graphical Environment
                </h3>
                <p className="text-lg leading-relaxed">
                  EDGEBIC can be installed and configured per user preferences.
                  EDGEBIC installs separately from RMDB but they share the same
                  database with advanced security options, its easy to configure
                  view only users or power users who can make direct changes to
                  schedule.
                </p>
                <p className="text-lg leading-relaxed">
                  Finally, you can manage your production scheduling with an
                  intuitive graphical approach that can be easily customized.
                </p>
              </div>
              <div>
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/f1.png"
                  alt="Screenshot of a project management software interface"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Second Feature */}
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="space-y-6 lg:order-2">
                <h3 className="text-2xl font-bold">
                  Color-coded Schedule Management
                </h3>
                <p className="text-lg leading-relaxed">
                  Check out the color-coded schedule for up to the minute status
                  on any job. Drag and drop any job segment from one workcenter
                  to another workcenter with a simple click of a mouse, resize
                  any segment based on real time issues – taking longer than
                  planned, or shorter.
                </p>
                <p className="text-lg leading-relaxed">
                  You can even block out capacity for any downtime or
                  maintenance event. Check out capacity utilization graph,
                  finally press update button and reschedule to have schedule
                  reflect reality.
                </p>
              </div>
              <div className="lg:order-1">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/f2.png"
                  alt="Colorful project management Gantt chart with timeline"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Third Feature */}
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Heat Map Visualization</h3>
                <p className="text-lg leading-relaxed">
                  View the Heat Map to see your capacity loading, for entire
                  schedule, at a glance. Run the Schedule Key Dates reports,
                  with an export to Excel to view all activity the way you want.
                </p>
                <p className="text-lg leading-relaxed">
                  Other reporting can be customized per your requests. EDGEBIC
                  is the perfect, interactive, view for your application.
                </p>
              </div>
              <div>
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/f3.png"
                  alt="Color-coded project timeline chart with percentage completion"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Fourth Feature */}
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="space-y-6 lg:order-2">
                <h3 className="text-2xl font-bold">
                  Advanced Scheduling Interface
                </h3>
                <p className="text-lg leading-relaxed">
                  EDGEBIC is the perfect, interactive, view for your
                  application. Contact US to discuss your specific application
                  and challenges and let us prove out the solution with a free
                  Proof Of Concept using your data!
                </p>
                <p className="text-lg leading-relaxed">
                  With solutions for any application and budget, from job shops
                  on up, better production scheduling is only a click away.
                </p>
              </div>
              <div className="lg:order-1">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/f4.png"
                  alt="Color-coded project scheduling Gantt chart screenshot"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Key Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive capabilities for enhanced production scheduling
              management
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-slate-800"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-purple-200 text-purple-600 dark:from-purple-900 dark:to-purple-800 dark:text-purple-400">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="bg-slate-50 py-6 dark:bg-slate-900">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              EDGEBIC Capabilities
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <Settings className="size-8" />
                </div>
                <h3 className="mb-4 text-xl font-bold">User Configuration</h3>
                <ul className="space-y-2 text-left text-sm text-muted-foreground">
                  <li>• Change length of any job segment</li>
                  <li>• Block out capacity for planned/unplanned events</li>
                  <li>• Create custom reporting</li>
                  <li>• Add notes to any job at any workcenter</li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <Eye className="size-8" />
                </div>
                <h3 className="mb-4 text-xl font-bold">Visual Management</h3>
                <ul className="space-y-2 text-left text-sm text-muted-foreground">
                  <li>• Color-coded schedule status</li>
                  <li>• Heat map capacity visualization</li>
                  <li>• Capacity utilization graphs</li>
                  <li>• Interactive drag-and-drop interface</li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <BarChart3 className="size-8" />
                </div>
                <h3 className="mb-4 text-xl font-bold">
                  Reporting & Analytics
                </h3>
                <ul className="space-y-2 text-left text-sm text-muted-foreground">
                  <li>• Schedule Key Dates reports</li>
                  <li>• Excel export capabilities</li>
                  <li>• Customized reporting options</li>
                  <li>• Business intelligence integration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center dark:from-blue-900/20 dark:to-blue-800/20">
              <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
              </h3>
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                alt="Collection of industry and business awards logos"
                width={1024}
                height={128}
                className="mx-auto h-auto max-w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
