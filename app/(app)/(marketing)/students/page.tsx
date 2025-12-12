'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Database,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  LineChart,
  MousePointer,
  Play,
  Settings,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Video
} from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function StudentsPage(): React.JSX.Element {
  const features = [
    {
      icon: BookOpen,
      title: 'Excel Add-On',
      description:
        'Seamlessly integrates with Microsoft Excel for familiar interface'
    },
    {
      icon: Calendar,
      title: 'Routings and Job Scheduling',
      description: 'Complete routing management and job scheduling capabilities'
    },
    {
      icon: Target,
      title: 'Finite Capacity Scheduling',
      description: 'Advanced scheduling considering resource constraints'
    },
    {
      icon: TrendingUp,
      title: 'Forward & Reverse Scheduling',
      description: 'Flexible scheduling options for optimal planning'
    },
    {
      icon: Settings,
      title: 'Bills-Of-Material',
      description: 'Comprehensive BOM management and tracking'
    },
    {
      icon: LineChart,
      title: 'Robust Routings',
      description: 'Detailed routing definitions and management'
    },
    {
      icon: BarChart3,
      title: 'Basic MRP',
      description: 'Material Requirements Planning functionality'
    },
    {
      icon: Database,
      title: 'Large Data Model Support',
      description: 'Supports up to a million rows of data'
    },
    {
      icon: Clock,
      title: 'Powerful Scheduling Engine',
      description: 'Fast and efficient scheduling algorithms'
    }
  ];

  const benefits = [
    {
      title: 'Immediate, Guaranteed Benefits',
      description:
        "Resource Manager delivers the help you need to effectively plan and schedule your company's resources, without the time, money and upkeep of traditional options.",
      details:
        'Finally, you can quit struggling with time consuming decisions such as what to buy, what to make, when to buy it, and when to make it.'
    },
    {
      title: 'Works The Way You Do',
      description:
        'Resource Manager is the only solution that is designed to adapt to your specific needs, addressing the key issues facing your operation.',
      details:
        'Adaptable and flexible solution that easily adapts to the way people are running their business today.'
    },
    {
      title: 'Best of All',
      description:
        'Resource Manager runs with Microsoft Office, so you are already familiar with entering data, printing reports, graphing, and more!',
      details:
        'Leverage your existing Excel knowledge for powerful manufacturing planning and scheduling.'
    }
  ];

  const studentResources = [
    {
      title: 'Free Trial',
      description: 'Fully functional trial available for immediate download',
      icon: Download,
      link: '/students-free-trial'
    },
    {
      title: 'User Manual',
      description: 'Complete documentation and guides',
      icon: FileText,
      link: '#'
    },
    {
      title: 'Quick Start Tutorial',
      description: 'Get started quickly with step-by-step guidance',
      icon: Play,
      link: 'https://www.usersolutions.com/wp-content/uploads/2022/10/RMXQuickStart.pdf'
    },
    {
      title: 'Training Videos',
      description: 'Full set of instructional videos',
      icon: Video,
      link: '/videos/#resource-manager-excel'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <GridSection hideVerticalGridLines>
        <div className="container pt-6">
          <div className="mx-auto max-w-7xl">
            {/* Hero Header */}
            <div className=" text-center">
              <SiteHeading
                badge={
                  <>
                    <GraduationCap className="size-4" />
                    STUDENT RESOURCES
                  </>
                }
                title="Resource Manager For Excel"
                description="MRP and Shop Scheduling on a flexible and powerful platform. Ambitious Operations Management students can use RMX to gain valuable hands-on experience in mastering important skills in many areas of Manufacturing Planning, Scheduling, and Execution."
              />
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button size="lg">
                  <Link
                    href="/students-free-trial"
                    className="flex items-center gap-2"
                  >
                    <Download className="size-5" />
                    Get Free Trial
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                >
                  <Link
                    href="/contact-us"
                    className="flex items-center gap-2"
                  >
                    <Users className="size-5" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>

            {/* Student Overview Image */}
            <div className="mt-6">
              <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border bg-slate-100 shadow-2xl">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/ops-1024x768.png"
                  alt="Operations Management textbook with cruise ship photo"
                  width={1024}
                  height={768}
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </GridSection>

      {/* Summary Section */}
      <section className="bg-slate-50 py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Resource Manager for Excel: Summary
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive manufacturing planning and scheduling solution for
              students
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Resource Manager for Excel (RMX) features a Bill Of Resource
                (BOR) that allows any combination of Workcenters and/or
                Products. RMX is ideal for companies who have no formal systems
                (ERP, MRP, etc.) as tool to plan for and implement those
                systems, or to use to fill in any existing gaps for production
                scheduling.
              </p>
              <p className="text-lg leading-relaxed">
                With the BOR concept, you can manage both Material Requirements
                Planning as well as Production Planning and Scheduling
                considering Finite Capacity. For those applications that have a
                need for multiple concurrent users, improved security (over
                Excel), seamless integration with other systems, and advanced
                planning and scheduling options, Resource Manager-DB (RMDB) is
                the best choice.
              </p>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-xl font-bold">Educational Benefits</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Hands-on experience with manufacturing planning</li>
                  <li>• Skills in scheduling and execution</li>
                  <li>• Up to a million rows of data support</li>
                  <li>• Excel 365 and cloud compatibility</li>
                  <li>• Big data applications with web sharing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <blockquote className="border-l-4 border-slate-300 bg-white p-6 text-lg italic">
              "Adaptable and Flexible - Resource Manager for Excel is a great
              solution for manufacturers who are not ready for a full-blown
              MRPII, ERP, or Shop Management System but realize the value of
              effective scheduling and planning. Resource Manager for Excel is
              unique in that it easily adapts to the way people are running
              their business today."
              <footer className="mt-4 text-sm font-semibold">
                — Mike Parks, Director of Georgia Tech's CMIT, an affiliate of
                the NIST Manufacturing Extension Partnership
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Features</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive capabilities for manufacturing planning and
              scheduling
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-600">
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

      {/* Student Resources Section */}
      <section className="bg-slate-50 py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Student Resources
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to get started with Resource Manager for Excel
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {studentResources.map((resource, index) => (
              <div
                key={index}
                className="group rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <resource.icon className="size-6" />
                </div>
                <h3 className="mb-2 font-semibold">{resource.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {resource.description}
                </p>
                <Button
                  size="sm"
                  className="w-full"
                >
                  <Link
                    href={resource.link}
                    className="flex items-center gap-2"
                    target={
                      resource.link.startsWith('http') ? '_blank' : '_self'
                    }
                    rel={
                      resource.link.startsWith('http')
                        ? 'noopener noreferrer'
                        : ''
                    }
                  >
                    Access
                    <ExternalLink className="size-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Why Choose Resource Manager?
            </h2>
            <p className="text-xl text-muted-foreground">
              Proven benefits for manufacturing planning and scheduling
            </p>
          </div>

          <div className="space-y-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-8 shadow-lg"
              >
                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="mb-4 text-lg leading-relaxed">
                  {benefit.description}
                </p>
                <p className="text-muted-foreground">{benefit.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-slate-50 py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Overview</h2>
            <p className="text-xl text-muted-foreground">
              The only low-cost, planning and scheduling solution for all
              manufacturing enterprises
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">
                Resource Manager for Excel (RM-X)
              </h3>
              <p className="text-lg leading-relaxed">
                RM-X is an add-on to Excel (version 97 and greater) and is
                designed for single concurrent users who are familiar with
                Excel. A fully functional trial is available for immediate
                download.
              </p>
              <p className="text-lg leading-relaxed">
                By combining ease-of-use for small to medium sized manufacturing
                operations with powerful reporting and open integration for
                larger operations, Resource Manager guarantees the power and
                productivity of high-end systems without the complications and
                failure rate.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Resource Manager-DB (RMDB)</h3>
              <p className="text-lg leading-relaxed">
                Also, Resource Manager-DB (RMDB), an elegant upgrade from RMX,
                written in Visual Basic, utilizes and includes a run-time
                version of Microsoft Access database and is also available with
                SQL Server compatibility.
              </p>
              <p className="text-lg leading-relaxed">
                Resource Manager DB (RMDB) contains all the functionality of
                RM-X. Just like RM-X, Resource Manager DB leverages Excel for
                reporting.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg leading-relaxed">
              These combined offerings provide you unsurpassed flexibility for
              leveraging Excel on local PCs, and sharing data across a network.
              Finally, you can achieve your goals of an affordable planning and
              scheduling solution that quickly adapts to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Student Trial Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <div className="rounded-2xl border bg-slate-50 p-8">
            <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              With RMX supporting up to a million rows of data, and with Excel
              360 fully cloud compatible, you can even tackle big data
              applications and share results on the web.
            </p>
            <p className="mb-6 text-lg text-muted-foreground">
              Keep US in mind when you are fully engaged at work and looking for
              tools to improve your production scheduling. Resource Manager-DB
              is a wonderful upgrade of RMX and is a strategic complement to
              other plant systems for APS and MES applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">
                <Link
                  href="/students-free-trial"
                  className="flex items-center gap-2"
                >
                  <Download className="size-5" />
                  Download Free Trial
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
              >
                <Link
                  href="/videos/#resource-manager-excel"
                  className="flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Video className="size-5" />
                  Watch Videos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h3>
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  width={1024}
                  height={128}
                  className="mx-auto h-auto max-w-full"
                  unoptimized
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
