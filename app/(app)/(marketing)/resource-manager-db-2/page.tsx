'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  DollarSign,
  ExternalLink,
  FileText,
  Layers,
  Mail,
  Network,
  Phone,
  PieChart,
  Play,
  Settings,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Wrench,
  Zap
} from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Button } from '@/components/ui/button';
import { Routes } from '@/constants/routes';

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

export default function ResourceManagerDBPage(): React.JSX.Element {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  const features = [
    {
      icon: Calendar,
      title: 'Finite Capacity Planning & Scheduling',
      description:
        'Advanced planning with real-time capacity constraints and resource optimization'
    },
    {
      icon: BarChart3,
      title: 'Advanced Planning and Scheduling',
      description:
        'Sophisticated APS functionality for complex operations and multi-resource coordination'
    },
    {
      icon: Settings,
      title: 'MRP and Inventory Management',
      description:
        'Complete material requirements planning integration with inventory tracking'
    },
    {
      icon: Zap,
      title: 'Routings and Priority Scheduling',
      description:
        'Flexible routing options with priority-based scheduling and alternate workcenters'
    },
    {
      icon: CheckCircle,
      title: "Easy 'what-if' Analysis",
      description:
        'Quick scenario planning and impact analysis for better decision making'
    },
    {
      icon: Shield,
      title: 'Purchasing and Receiving',
      description:
        'Streamlined procurement and receiving processes with vendor management'
    },
    {
      icon: Activity,
      title: 'Downtime Analysis and Reporting',
      description:
        'Comprehensive downtime tracking, analysis and performance reporting'
    },
    {
      icon: Wrench,
      title: 'Simple Maintenance and Updating',
      description:
        'Easy system maintenance with minimal downtime and quick updates'
    },
    {
      icon: DollarSign,
      title: 'Costing and Estimating',
      description:
        'Accurate cost calculations, project estimating and financial tracking'
    },
    {
      icon: Network,
      title: 'Integrating with All Systems',
      description:
        'Seamless integration with existing ERP systems and third-party software'
    },
    {
      icon: Database,
      title: 'Running Stand Alone or Networked',
      description:
        'Flexible deployment options for single users or multi-location organizations'
    },
    {
      icon: Target,
      title: 'Production Planning',
      description:
        'Comprehensive production planning capabilities with capacity management'
    },
    {
      icon: Layers,
      title: 'Dragging and Dropping Adjustments',
      description:
        'Intuitive drag-and-drop interface for quick schedule changes and adjustments'
    },
    {
      icon: Cpu,
      title: 'Concurrent and Intuitive Scheduling',
      description:
        'Multi-resource scheduling of Material, Workcenter and Labor Requirements simultaneously'
    },
    {
      icon: TrendingUp,
      title: 'Optional LP Optimization Integration',
      description:
        'Linear programming optimization for complex scenarios and constraint solving'
    },
    {
      icon: PieChart,
      title: 'Customized Reports',
      description:
        'Tailored reporting to meet your specific business needs and requirements'
    }
  ];

  const navigationItems = [
    {
      label: 'Summary',
      href: '#summary',
      description: 'Overview of Resource Manager DB capabilities'
    },
    {
      label: 'In Depth',
      href: '/resource-manager-db-in-depth',
      description: 'Detailed feature exploration'
    },
    {
      label: 'Quick Start',
      href: '/docs/rmdbquickstart23.pdf',
      description: 'PDF guide to get started quickly'
    },
    {
      label: 'EDGEBIC',
      href: '/edgebi',
      description: 'Business intelligence integration'
    },
    {
      label: 'Live Demo',
      href: Routes.Contact,
      description: 'Schedule a personalized demonstration'
    }
  ];

  const companyInfo = {
    name: 'EDGEBIC',
    tagline: 'Manufacturing software made easy',
    phone: '248.486.6365',
    email: 'support@edgebic.com',
    location: 'South Lyon MI',
    establishedYear: '1999', // Based on 25 years celebration
    socialLinks: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      youtube: '#'
    }
  };

  const products = [
    {
      name: 'EDGEBIC  ',
      href: '/jsl-job-scheduler-lite',
      description: 'Simple scheduling solution for small operations'
    },
    {
      name: 'Resource Manager DB',
      href: '/resource-manager-db',
      description: 'Advanced production planning and scheduling',
      current: true
    },
    {
      name: 'EDGEBIC',
      href: '/edgebi',
      description: 'Business intelligence and analytics platform'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Top Banner */}

      {/* Hero Section */}
      <GridSection hideVerticalGridLines>
        <div className="container pt-6">
          <div className="mx-auto max-w-7xl">
            {/* Navigation Pills */}
            {/* <div className="mb-6 flex flex-wrap justify-center gap-3">
                            {navigationItems.map((item, index) => (
                                <Button
                                    key={index}
                                    variant={item.label === "Summary" ? "default" : "outline"}
                                    size="sm"
                                    className="group relative"
                                    asChild
                                >
                                    <Link 
                                        href={item.href}
                                        {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                                        className="flex items-center gap-1"
                                    >
                                        {item.label}
                                        {item.external && <ExternalLink className="size-3" />}
                                    </Link>
                                </Button>
                            ))}
                        </div> */}

            {/* Hero Header */}
            <div className="mb-6 text-center">
              <SiteHeading
                badge="Production Planning"
                title="Resource Manager DB"
                description="Resource Manager-DB (RMDB) is a flexible and affordable production planning, scheduling, and tracking solution that is designed to adapt to your operations. We can work with whatever data you have to achieve better production scheduling, just easier and quicker than you ever thought possible. Give US a chance to prove it by scheduling a Live Demo today!"
              />
            </div>

            {/* Video Section */}
            <div className="mb-6">
              <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border bg-slate-100 shadow-2xl dark:bg-slate-800">
                <div className="relative aspect-video">
                  <VideoPlayer
                    videoUrl="https://www.usersolutions.com/wp-content/uploads/2022/12/RMDB%20updated%20thumbnail.mp4"
                    title="Resource Manager DB Demo"
                    thumbnail="https://www.usersolutions.com/wp-content/uploads/2022/11/advanced-1.png"
                    onPlayStateChange={setIsVideoPlaying}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </GridSection>

      {/* Summary Section */}
      <section
        id="summary"
        className="bg-slate-50 py-6 dark:bg-slate-900"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              RESOURCE MANAGER DB: SUMMARY
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                If you have tried to use your ERP for creating a viable
                Production Schedule, and still end up with a tangle of custom
                Excel Reports, messy whiteboard or worse yet, late shipments, we
                can help.
              </p>
              <p className="text-lg leading-relaxed">
                If you don't even have an ERP system, and are struggling with
                production scheduling, we can help. Resource Manager-DB (RMDB)
                was specifically architected to easily adapt to the way you
                work, using your existing data.
              </p>
              <p className="text-lg leading-relaxed">
                RMDB is easily configured, and/or reconfigured, on the fly to
                address your most pressing issues, whenever and however they
                surface! This is a truly unique advantage of RMDB and working
                with US.
              </p>
              <p className="text-lg leading-relaxed">
                We can focus and resolve your most pressing issues quickly —
                letting you reap immediate ROI. Then, delve deeper without
                having to spend more! This approach is proven to succeed where
                so many others don't.
              </p>
            </div>
            <div className="space-y-6">
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png"
                alt="Screenshot of production scheduling software interface"
                width={1024}
                height={483}
                className="rounded-lg shadow-lg"
              />
              <p className="text-lg leading-relaxed">
                RMDB contains deep functionality to address a multitude of
                challenges for production planning and scheduling: alternate
                workcenters, complex routings & processes, discrete and/or
                batch, multiple constraints (labor, machines, materials, etc.),
                advanced drag and drop graphical calendar screens, downtime
                management, sub-assemblies, optimization, and much more.
              </p>
              <p className="text-lg leading-relaxed">
                To see first-hand how RMDB can help you with efficient and easy
                Production Planning, Scheduling and Capacity Planning, schedule
                a live demo, even using your data in its current form – RISK
                FREE!!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Features</h2>
            <p className="text-xl text-muted-foreground">
              RMDB contains deep functionality to address a multitude of
              challenges for production planning and scheduling
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-slate-800"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 dark:from-orange-900 dark:to-red-900 dark:text-orange-400">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <img
              src="https://www.usersolutions.com/wp-content/uploads/2022/07/rmdb11.png"
              alt="Color-coded production job schedule spreadsheet"
              className="h-auto max-w-full rounded-lg shadow-lg"
            />
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

      {/* Contact CTA Section */}
    </div>
  );
}
