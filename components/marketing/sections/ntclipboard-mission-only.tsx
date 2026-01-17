'use client';

import React from 'react';
import Image from 'next/image';
import { TargetIcon, MailIcon, PhoneIcon } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';

export function NTClipboardMissionOnly(): React.JSX.Element {
  return (
    <GridSection hideVerticalGridLines>
      <div className="container py-6">
        <SiteHeading
          title="Make Manufacturing Great Again!"
          description="Empowering manufacturers since 1991 with solutions that fit like a glove"
        />

        {/* Logo Section */}
        <div className="mx-auto mt-6 flex justify-center">
          <Logo hideSymbol={false} hideWordmark={false} className="scale-150" />
        </div>

        {/* Mission Statement Section */}
        <div className="mx-auto mt-6 max-w-4xl">
          <div className="rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center md:p-12">
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

            <p className="mb-6 text-lg leading-relaxed text-slate-700">
              We look forward to hearing from you and learning of your
              challenges and the opportunity to deliver an affordable solution
              that fits you like a glove!
            </p>

            {/* Services Section */}
            <div className="mt-8 border-t pt-8">
              <h3 className="mb-4 text-xl font-bold text-slate-900">Our Solutions</h3>
              <div className="grid gap-4 text-left md:grid-cols-2">
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <h4 className="mb-2 font-semibold text-slate-900">Finite Capacity Scheduling</h4>
                    <p className="text-sm text-slate-600">Integrated with ERP systems for optimal production planning</p>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <h4 className="mb-2 font-semibold text-slate-900">Material Requirements Planning</h4>
                    <p className="text-sm text-slate-600">Perfect for smaller operations seeking efficiency</p>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <h4 className="mb-2 font-semibold text-slate-900">Job Shop Scheduling</h4>
                    <p className="text-sm text-slate-600">Tailored solutions for job shop environments</p>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <h4 className="mb-2 font-semibold text-slate-900">Educational Templates</h4>
                    <p className="text-sm text-slate-600">Production and Operations Management resources</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-8 border-t pt-8">
              <h3 className="mb-4 text-xl font-bold text-slate-900">Get in Touch</h3>
              <div className="flex flex-col items-center gap-3 text-slate-700">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="size-5 text-orange-600" />
                  <a href="tel:248.486.6365" className="hover:text-orange-600 transition-colors">
                    248.486.6365
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="size-5 text-orange-600" />
                  <a href="mailto:us@usersolutions.com" className="hover:text-orange-600 transition-colors">
                    us@usersolutions.com
                  </a>
                </div>
                <p className="text-sm text-slate-600">South Lyon, Michigan</p>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="mt-8 border-t pt-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 text-sm font-bold text-blue-800">
                🏆 35 Years of Award Winning Software
              </div>
            </div>
          </div>
        </div>
      </div>
    </GridSection>
  );
}
