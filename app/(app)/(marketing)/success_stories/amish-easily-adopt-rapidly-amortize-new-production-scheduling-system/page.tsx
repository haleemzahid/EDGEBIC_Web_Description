import type { Metadata } from 'next';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Amish Easily Adopt, Rapidly Amortize New Production Scheduling System | User Solutions',
  description:
    'See how Homestead Furniture successfully implemented modern production scheduling while honoring traditional Amish values.',
  openGraph: {
    title:
      'Amish Easily Adopt, Rapidly Amortize New Production Scheduling System | User Solutions',
    description:
      'See how Homestead Furniture successfully implemented modern production scheduling while honoring traditional Amish values.',
    url: 'https://www.usersolutions.com/success-stories/amish-easily-adopt-rapidly-amortize-new-production-scheduling-system'
  }
};

export default function AmishProductionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Badge
              variant="outline"
              className="mb-6 h-8 rounded-full px-4 text-sm font-medium shadow-sm"
            >
              Success Story
            </Badge>
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Amish Easily Adopt, Rapidly Amortize New Production Scheduling
              System
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-muted-foreground">
              Discover how traditional Amish craftsmanship meets modern
              production scheduling at Homestead Furniture.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
              {/* Content Column */}
              <div className="space-y-6">
                <p className="text-[18px] leading-relaxed text-gray-700">
                  Nestled quietly in the heart of Ohio's Amish countryside is a
                  furniture destination, offering an eclectic showroom of
                  hand-crafted selections in the modern, rustic, traditional,
                  transitional, live edge, and contemporary styles, a tour of the
                  factory to witness Amish artisans using the 'heirloom' approach
                  to woodcraft, and relaxation by the tranquil waterfall in their
                  gardens, to see the trees from which they build their American
                  hardwood furniture.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Homestead Furniture's core values reflect the local culture of
                  craftsmanship and fair business dealings. They are surrounded by
                  people who turn, bend, stain, carve and otherwise craft
                  hardwoods to create fine furniture. And when they talk business,
                  they talk about improving methodologies and techniques to make
                  better furniture, in lieu of ways to set up offshore
                  manufacturing.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  Improvements
                </h2>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  <strong>On the fabrication technique side:</strong> AmishBilt™
                  heirloom approach, proprietary Protekt™ finishing, cutting edge
                  color lab for proprietary paint and stain shades, advanced
                  stressing operations.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  <strong>On the manufacturing methodological side:</strong>
                  Implementing the Kaizen cell method of manufacturing, lean
                  inventory management, continuous improvement principles, Six
                  Sigma tactics.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  Last Hurdle
                </h2>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  With all these advanced techniques and methodologies in place,
                  the antiquated production scheduling system surfaced as a
                  bottleneck holding them back. The current process was a full
                  time job, highly susceptible to human error due to a myriad of
                  disparate and disconnected spreadsheets and workbooks. But with
                  no Internet access or factory computers not any replacement
                  would do.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  The article published in FDMC Magazine describes how a 40
                  hr/week production scheduling task, requiring an experienced
                  production scheduler, was reduced to a mere 2 hour task by the
                  office clerk for the basic weekly schedule, leaving only a 4 – 6
                  hour task for the production scheduler to address the typical
                  unexpected changes that occur in process. Of added interest, the
                  article tells the story of how the software implementation alone
                  identified a manufacturing bottleneck. Addressing it not only
                  optimized their processing, but also they were able to
                  reconfigure the new system 'on-the-fly' to match the new
                  routings. And last, but not least, the flexibility of the system
                  facilitated their maintaining their familiar way of doing
                  things, insuring rapid adoption.
                </p>
              </div>

              {/* Image Column */}
              <div className="space-y-6 lg:sticky lg:top-6">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/image001-150x150-1.png"
                  alt="Homestead Furniture craftsmanship"
                  width={150}
                  height={150}
                  className="h-auto w-full rounded-lg shadow-md"
                  unoptimized
                />
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/image002-150x138-1.jpg"
                  alt="Amish furniture manufacturing process"
                  width={150}
                  height={138}
                  className="h-auto w-full rounded-lg shadow-md"
                  unoptimized
                />
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/image003-150x112-1.jpg"
                  alt="Advanced manufacturing methodologies"
                  width={150}
                  height={112}
                  className="h-auto w-full rounded-lg shadow-md"
                  unoptimized
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
