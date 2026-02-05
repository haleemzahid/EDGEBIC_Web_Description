'use client';

import React from 'react';
import {
  AwardIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TargetIcon,
  UsersIcon
} from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';

export function NTClipboardMission(): React.JSX.Element {
  return (
    <GridSection hideVerticalGridLines>
      <div
        id="mission"
        className="container pt-6"
      >
        <SiteHeading
          title="Make Manufacturing Great Again!"
          description="Empowering manufacturers since 1991 with solutions that fit like a glove."
        />

        {/* Content Sections */}
        <div className="mx-auto mt-6 max-w-7xl space-y-12">
          {/* Mission Section */}
          <div
            id="mission-statement"
            className="rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center md:p-12"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-6 py-3 text-sm font-medium text-orange-800">
              <TargetIcon className="size-4" />
              Mission Statement
            </div>

            <blockquote className="mb-6 text-2xl font-bold leading-relaxed text-slate-900 md:text-3xl">
              "Empower manufacturers to become more competitive and profitable
              through efficient resource management tools that are affordable,
              adaptable, and easily implemented."
            </blockquote>

            <p className="mb-6 text-lg text-slate-700">
              Since 1991, what makes US unique is we work with you to solve
              production planning, scheduling, and tracking challenges your way.
            </p>

            <p className="mb-6 text-xl font-semibold text-orange-700">
              User Solutions: LISTEN and DELIVER. LISTEN to the customer,
              understand their needs, and DELIVER a solution.
            </p>

            <p className="text-lg leading-relaxed text-slate-700">
              We look forward to hearing from you and learning of your
              challenges and the opportunity to deliver an affordable solution
              that fits you like a glove!
            </p>
          </div>

          {/* Solutions Section */}
          <div
            id="solutions"
            className="rounded-3xl border bg-gradient-to-br from-orange-50 to-red-50 p-8 md:p-12"
          >
            <h3 className="mb-6 text-center text-2xl font-bold text-slate-900 md:text-3xl">
              Complete Manufacturing Solutions Portfolio
            </h3>
            <p className="mb-6 text-center text-lg text-slate-700">
              From adding a Finite Capacity Scheduling capability to any ERP
              system, or providing Material Requirements Planning for smaller
              operations who only have a simple accounting solution, or
              delivering simple Job Shop Scheduling Solutions, or even providing
              educational templates for Production and Operations Management, we
              are grateful for the opportunity to work with you to Make
              Manufacturing Great Again!
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-orange-200 bg-white/50 p-6">
                <h4 className="mb-3 text-xl font-semibold text-orange-700">
                  ERP Enhancement
                </h4>
                <p className="text-slate-600">
                  Add Finite Capacity Scheduling capability to any existing ERP
                  system without disrupting current operations.
                </p>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-white/50 p-6">
                <h4 className="mb-3 text-xl font-semibold text-orange-700">
                  Small Business Solutions
                </h4>
                <p className="text-slate-600">
                  Material Requirements Planning for smaller operations with
                  simple accounting solutions - no complex ERP required.
                </p>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-white/50 p-6">
                <h4 className="mb-3 text-xl font-semibold text-orange-700">
                  Job Shop Scheduling
                </h4>
                <p className="text-slate-600">
                  Simple, effective Job Shop Scheduling Solutions designed for
                  custom manufacturing environments.
                </p>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-white/50 p-6">
                <h4 className="mb-3 text-xl font-semibold text-orange-700">
                  Educational Templates
                </h4>
                <p className="text-slate-600">
                  Production and Operations Management educational templates for
                  learning and training purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div
            id="values"
            className="rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 p-8 md:p-12"
          >
            <h3 className="mb-6 text-center text-2xl font-bold text-slate-900 md:text-3xl">
              Our Core Values
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="group text-center">
                <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white transition-transform group-hover:scale-105">
                  <UsersIcon className="size-10" />
                </div>
                <h3 className="mb-4 text-xl font-bold">Customer-Centric</h3>
                <p className="text-muted-foreground">
                  We listen to understand your unique challenges and deliver
                  solutions that fit your specific manufacturing environment.
                </p>
              </div>

              <div className="group text-center">
                <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white transition-transform group-hover:scale-105">
                  <TargetIcon className="size-10" />
                </div>
                <h3 className="mb-4 text-xl font-bold">Adaptable Solutions</h3>
                <p className="text-muted-foreground">
                  Every business is unique. Our solutions are designed to adapt
                  to your processes, not force you to change yours.
                </p>
              </div>

              <div className="group text-center">
                <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white transition-transform group-hover:scale-105">
                  <AwardIcon className="size-10" />
                </div>
                <h3 className="mb-4 text-xl font-bold">Quality Excellence</h3>
                <p className="text-muted-foreground">
                  30+ years of delivering affordable, high-quality solutions
                  that help manufacturers achieve their goals.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div
            id="contact-info"
            className="rounded-3xl border bg-gradient-to-br from-blue-50 to-slate-50 p-8 md:p-12"
          >
            <h3 className="mb-6 text-center text-2xl font-bold text-slate-900 md:text-3xl">
              Get in Touch
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <PhoneIcon className="size-8" />
                </div>
                <h4 className="mb-2 text-lg font-semibold">Phone</h4>
                <p className="text-muted-foreground">248.486.6365</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <MailIcon className="size-8" />
                </div>
                <h4 className="mb-2 text-lg font-semibold">Email</h4>
                <p className="text-muted-foreground">us@usersolutions.com</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <MapPinIcon className="size-8" />
                </div>
                <h4 className="mb-2 text-lg font-semibold">Location</h4>
                <p className="text-muted-foreground">
                  South Lyon, MI
                  <br />
                  United States
                </p>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div
            id="history"
            className="rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 p-8 md:p-12"
          >
            <h3 className="mb-6 text-center text-2xl font-bold text-slate-900 md:text-3xl">
              Our Journey: 30+ Years of Manufacturing Excellence
            </h3>

            <div className="space-y-8">
              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-orange-500 to-red-500 md:left-1/2" />

                {/* 1991 */}
                <div className="relative flex items-center md:justify-center">
                  <div className="flex w-full items-center md:w-1/2 md:pr-8">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 font-bold text-white">
                      91
                    </div>
                    <div className="ml-6 md:ml-0 md:mr-6 md:text-right">
                      <h4 className="text-xl font-bold text-slate-900">
                        1991: Foundation
                      </h4>
                      <p className="text-slate-600">
                        User Solutions was founded with a vision to empower
                        manufacturers through innovative resource management
                        solutions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1995 */}
                <div className="relative mt-6 flex items-center md:justify-center">
                  <div className="flex w-full items-center md:w-1/2 md:flex-row-reverse md:pl-8">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 font-bold text-white">
                      95
                    </div>
                    <div className="ml-6 md:ml-0 md:mr-6">
                      <h4 className="text-xl font-bold text-slate-900">
                        1995: First ERP Integration
                      </h4>
                      <p className="text-slate-600">
                        Developed our first Finite Capacity Scheduling solution
                        integrated with major ERP systems.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2000 */}
                <div className="relative mt-6 flex items-center md:justify-center">
                  <div className="flex w-full items-center md:w-1/2 md:pr-8">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 font-bold text-white">
                      00
                    </div>
                    <div className="ml-6 md:ml-0 md:mr-6 md:text-right">
                      <h4 className="text-xl font-bold text-slate-900">
                        2000: Small Business Focus
                      </h4>
                      <p className="text-slate-600">
                        Launched specialized Material Requirements Planning
                        solutions for smaller manufacturing operations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2010 */}
                <div className="relative mt-6 flex items-center md:justify-center">
                  <div className="flex w-full items-center md:w-1/2 md:flex-row-reverse md:pl-8">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 font-bold text-white">
                      10
                    </div>
                    <div className="ml-6 md:ml-0 md:mr-6">
                      <h4 className="text-xl font-bold text-slate-900">
                        2010: Job Shop Revolution
                      </h4>
                      <p className="text-slate-600">
                        Introduced simple but powerful Job Shop Scheduling
                        Solutions for custom manufacturing environments.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2020 */}
                <div className="relative mt-6 flex items-center md:justify-center">
                  <div className="flex w-full items-center md:w-1/2 md:pr-8">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 font-bold text-white">
                      20
                    </div>
                    <div className="ml-6 md:ml-0 md:mr-6 md:text-right">
                      <h4 className="text-xl font-bold text-slate-900">
                        2020: Digital Transformation
                      </h4>
                      <p className="text-slate-600">
                        Embraced digital transformation with cloud-ready
                        solutions and educational templates for the next
                        generation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Today */}
                <div className="relative mt-6 flex items-center md:justify-center">
                  <div className="flex w-full items-center md:w-1/2 md:flex-row-reverse md:pl-8">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-sm font-bold text-white">
                      NOW
                    </div>
                    <div className="ml-6 md:ml-0 md:mr-6">
                      <h4 className="text-xl font-bold text-slate-900">
                        Today: Innovation Continues
                      </h4>
                      <p className="text-slate-600">
                        Still listening, still delivering. Ready to help you
                        Make Manufacturing Great Again with solutions that fit
                        like a glove.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-6 py-3 text-orange-800">
                  <AwardIcon className="size-5" />
                  30+ Years of Innovation Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GridSection>
  );
}
