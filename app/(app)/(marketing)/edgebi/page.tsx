'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
      href: '/contact-us',
      external: true,
      description: 'Schedule a personalized demonstration'
    }
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left - Text Content */}
            <div>
              <h1 className="mb-6 text-3xl font-bold  md:text-4xl">
                Welcome to EDGEBI
              </h1>
              <p className="mb-6 text-lg leading-relaxed text-slate-600">
                EDGEBI can be installed and configured per user preferences. EDGEBI installs
                separately from RMDB but they share the same database with advanced security
                options, its easy to configure view only users or power users who can make
                direct changes to schedule. Such as: Change length of any job segment, block
                out capacity due to any event either planned or unplanned, create custom
                reporting, add notes to any job, at any workcenter, as desired, and so much
                more. Contact <em className="font-semibold">US</em> for a demo focused on your operations.
              </p>

              {/* Navigation Links */}
              <div className="flex flex-wrap gap-6">
                <Link
                  href="#summary"
                  className="text-lg text-slate-700  decoration-slate-300 underline-offset-4 hover:text-cyan-500 hover:decoration-cyan-500"
                >
                  Summary
                </Link>
                <Link
                  href="/resource-manager-db-2"
                  className="text-lg text-slate-700  decoration-slate-300 underline-offset-4 hover:text-cyan-500 hover:decoration-cyan-500"
                >
                  RMDB
                </Link>
                <Link
                  href="/contact-us"
                  className="text-lg text-slate-700  decoration-slate-300 underline-offset-4 hover:text-cyan-500 hover:decoration-cyan-500"
                >
                  Live Demo
                </Link>
              </div>
            </div>

            {/* Right - Video */}
            <div>
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <div className="relative aspect-video">
                  <VideoPlayer
                    videoUrl="https://www.usersolutions.com/wp-content/uploads/2022/12/EDGEBI%20updated%20thumbnail.mp4"
                    title="EDGEBI Demo"
                    thumbnail="https://www.usersolutions.com/wp-content/uploads/2022/11/Premium-1.png"
                    onPlayStateChange={setIsVideoPlaying}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section
        id="summary"
        className="py-6"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6">
            <h2 className="mb-4 text-3xl font-bold text-cyan-500 md:text-4xl">Overview</h2>
            <p className="text-xl text-slate-600">
              Welcome to EDGEBI – A graphical overlay for Resource Manager DB EDGEBI stands for Enhanced Drag-n-drop Graphical Environment with Business Intelligence
            </p>
          </div>

          {/* First Image */}
          <div className="mb-16 flex justify-center">
            <Image
              src="https://www.usersolutions.com/wp-content/uploads/2022/10/f1.png"
              alt="EDGEBI Screenshot - Resource Manager DB interface"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
            />
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
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/f2.png"
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


      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center">
              <h3 className="mb-6 text-2xl font-bold text-slate-900">
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
