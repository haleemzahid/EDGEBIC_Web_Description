import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function MissionPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Make Manufacturing Great Again!
            </h1>
            <p className="text-gray-700">
              Empowering manufacturers since 1991 with solutions that fit like
              a glove
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="text-center">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Mission Statement
              </h2>
              <blockquote className="mb-6 text-xl font-bold leading-relaxed text-slate-900 md:text-2xl">
                &quot;Empower manufacturers to become more competitive and
                profitable through efficient resource management tools that are
                affordable, adaptable, and easily implemented.&quot;
              </blockquote>
              <p className="mb-6 leading-relaxed text-gray-700">
                Since 1991, what makes US unique is we work with you to solve
                production planning, scheduling, and tracking challenges your
                way.
              </p>
              <p className="mb-6 text-lg font-semibold text-orange-700">
                User Solutions: LISTEN and DELIVER. LISTEN to the customer,
                understand their needs, and DELIVER a solution.
              </p>
              <p className="leading-relaxed text-gray-700">
                We look forward to hearing from you and learning of your
                challenges and the opportunity to deliver an affordable
                solution that fits you like a glove!
              </p>
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
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
