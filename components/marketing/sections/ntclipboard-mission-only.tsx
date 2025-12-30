'use client';

import React from 'react';
import { TargetIcon } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Card, CardContent } from '@/components/ui/card';

export function NTClipboardMissionOnly(): React.JSX.Element {
  return (
    <GridSection hideVerticalGridLines>
      <div className="container py-6">
        <SiteHeading
          title="Make Manufacturing Great Again!"
          description="Empowering manufacturers since 1991 with solutions that fit like a glove"
        />

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

            <p className="text-lg leading-relaxed text-slate-700">
              We look forward to hearing from you and learning of your
              challenges and the opportunity to deliver an affordable solution
              that fits you like a glove!
            </p>
          </div>
        </div>

        {/* Awards Section */}
        <Card className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-8 text-center">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
            </h3>
            <div className="flex justify-center">
              <img
                src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                alt="Collection of industry and business awards logos"
                className="h-auto max-w-full rounded-lg shadow-md"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </GridSection>
  );
}
