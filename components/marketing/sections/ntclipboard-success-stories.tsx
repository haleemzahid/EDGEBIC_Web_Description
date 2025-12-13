'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const successStories = [
  {
    id: 1,
    title:
      'Resource Manager-DB Innovates Li-ion Battery Production Scheduling for ENEVATE',
    description:
      'Resource Manager-DB product provided a unique combination of planning, scheduling, and tracking functionality within a single, yet flexible system.',
    quote:
      'Resource Manager-DB product provided a unique combination of planning, scheduling, and tracking functionality within a single, yet flexible system.',
    author: 'Scott Bennett, Enevate',
    logo: 'https://www.usersolutions.com/wp-content/uploads/2022/07/01-300x300.png',
    href: '/success_stories/resource-manager-db-innovates-li-ion-battery-production-scheduling-for-enevate'
  },
  {
    id: 2,
    title:
      'Amish Easily Adopt & Rapidly Amortize New Production Scheduling System',
    description:
      "Nestled quietly in the heart of Ohio's Amish countryside is a furniture destination, offering an eclectic showroom of hand-crafted selections in the modern, rustic, traditional, transitional styles.",
    quote:
      'The system was incredibly easy to adopt and we saw immediate returns on our investment.',
    author: 'Ohio Furniture Manufacturer',
    logo: 'https://www.usersolutions.com/wp-content/uploads/2022/07/02-300x300.png',
    href: '/success_stories/amish-easily-adopt-rapidly-amortize-new-production-scheduling-system'
  },
  {
    id: 3,
    title: 'Capacity and Production Planning add on for ERP',
    description:
      'BAE Systems/Ordinance Systems Inc. set out to design and implement a process that would enable our manufacturing personnel to systematically identify process, equipment, labor constraints.',
    quote:
      'This solution enabled us to systematically identify and resolve bottlenecks in our production process.',
    author: 'BAE Systems/Ordinance Systems Inc.',
    logo: 'https://www.usersolutions.com/wp-content/uploads/2022/07/03-300x300.png',
    href: '/success_stories/capacity-and-production-planning-add-on-for-erp'
  },
  {
    id: 4,
    title:
      'Affordable, Easy-to-Implement MRP for Smaller Manufacturer (<$50M USD)',
    description:
      'Our situation is that we are a relatively small organization (AUD$50M of sales) and we have an outdated MRP system. The current system needed a complete overhaul.',
    quote:
      'Perfect solution for smaller manufacturers looking for affordable, flexible MRP systems.',
    author: 'Sleepmasters',
    logo: 'https://www.usersolutions.com/wp-content/uploads/2022/07/04-300x300.png',
    href: '/success_stories/affordable-easy-to-implement-mrp-for-smaller-manufacturer'
  },
  {
    id: 5,
    title: 'Complements traditional MRP and Shop Control systems',
    description:
      'Arnold Quesenberry, Senior Consultant for A.G. Raymond & Co. Inc. has been using Resource Manager in conjunction with consulting projects.',
    quote:
      'We have found these products complement traditional MRP and Shop Control systems perfectly.',
    author: 'A.G. Raymond & Company',
    logo: 'https://www.usersolutions.com/wp-content/uploads/2022/07/AGRaymond33f-161208-5849d765f1422.jpg',
    href: '/success_stories/complements-traditional-mrp-and-shop-control-systems'
  },
  {
    id: 6,
    title: 'Finite Capacity / Resource Scheduling for Consulting Projects',
    description:
      'GEMS Healthcare Solutions a wholly-owned subsidiary of GE Medical Systems headquartered in San Ramon, California, provides integrated data mining, Internet-based benchmarking and consulting solutions.',
    quote:
      'Integrated scheduling solutions have transformed our consulting project delivery capabilities.',
    author: 'GEMS Healthcare Solutions',
    logo: 'https://www.usersolutions.com/wp-content/uploads/2022/07/07-300x300.png',
    href: '/success_stories/finite-capacity-resource-scheduling-for-consulting-projects'
  },
  {
    id: 7,
    title:
      'Quick and Easy Production Scheduling Replaces Complex, Custom Excel Program',
    description:
      'We were looking for a way to schedule three in-line departments and various machines. Scheduling was being completed by the respective department supervisors with no coordination.',
    quote:
      'The new scheduling system replaced our complex Excel program with an intuitive, coordinated solution.',
    author: 'Kyocera Corporation',
    logo: 'https://www.usersolutions.com/wp-content/uploads/2022/07/06-300x300.png',
    href: '/success_stories/quick-and-easy-production-scheduling-replaces-complex-custom-excel-program'
  },
  {
    id: 8,
    title: 'Repair Shops Triple On-Time Shipping Percentage – from 30% to >90%',
    description:
      'GE Railcar Services Corporation, a unit of General Electric Corporation manages a fleet of over 180,000 railcars throughout North America and has successfully deployed Workcenter solutions.',
    quote: 'We tripled our on-time shipping percentage from 30% to over 90%.',
    author: 'GE Railcar Services Corporation',
    logo: 'https://www.usersolutions.com/wp-content/uploads/2022/07/GE-Rail-Services-Logoghj-161208-5849e6633a5d5-58e6958736b16.jpg',
    href: '/success_stories/repair-shops-triple-on-time-shipping-percentage-from-30-to-90'
  },
  {
    id: 9,
    title: 'Job Shop increases throughput while improving shipping on time',
    description:
      'Technical Glass Products in Snoqualmie, WA started out reviewing the Resource Manager for Excel product line but quickly settled on Resource Manager-DB for multi-user support.',
    quote:
      'We significantly increased throughput while improving our on-time shipping performance.',
    author: 'Technical Glass Products',
    logo: 'https://www.usersolutions.com/wp-content/uploads/2022/07/logo-tgpa-blue0-161208-5849d3ed255df.jpg',
    href: '/success_stories/job-shop-increases-throughput-while-improving-shipping-on-time'
  },
  {
    id: 10,
    title:
      "Finite Capacity Scheduling of World's Largest Aircraft Carrier Nimitz",
    description:
      'The USS Nimitz is one of the Navy\'s nuclear-powered aircraft carriers, classified as a "super carrier" and the lead ship of its class.',
    quote:
      "Successfully implemented finite capacity scheduling for one of the world's most complex manufacturing environments.",
    author: 'US Navy',
    logo: 'https://www.usersolutions.com/wp-content/uploads/2022/07/GrayAmNavy-Taglogo00-1634-58c6b882c5bd7.jpg',
    href: '/success_stories/finite-capacity-scheduling-of-worlds-largest-aircraft-carrier-nimitz'
  },
  {
    id: 11,
    title:
      'ERP Vendor and Manufacturer Both Turn to RM-DB for Flexible Scheduling',
    description:
      'Plastilite Corporation, located in Omaha Nebraska, provides insulated and protective packing solutions to companies worldwide.',
    quote:
      'RM-DB provides the flexible scheduling solution we needed for our complex manufacturing processes.',
    author: 'Plastilite Corporation',
    logo: 'https://www.usersolutions.com/wp-content/uploads/2022/07/Plastilite-161208-5849e7913fd3c.jpg',
    href: '/success_stories/erp-vendor-and-manufacturer-both-turn-to-rm-db-for-flexible-scheduling'
  },
  {
    id: 12,
    title:
      'Scheduling Labor out Several Months Increases Customer Satisfaction',
    description:
      'Joe Van Wagner, Production Manager for Cummins Engine, selected a Resource Manager to assist in scheduling labor and machine resources.',
    quote:
      'We are now able to schedule labor resources several months in advance, greatly increasing customer satisfaction.',
    author: 'Joe Van Wagner, Cummins Engine',
    logo: 'https://www.usersolutions.com/wp-content/uploads/2022/07/cumminslogo-59492683dd7a2.png',
    href: '/success_stories/scheduling-labor-out-several-months-increases-customer-satisfaction'
  }
];

export function NTClipboardSuccessStories(): React.JSX.Element {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge
              variant="outline"
              className="mb-4 h-8 rounded-full px-3 text-sm font-medium shadow-sm"
            >
              Customer Success
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Customer Success Stories
            </h1>
            <p className="mx-auto mt-4 max-w-4xl text-lg text-muted-foreground">
              Click on logos or Read More to view just a sample of our customers' success stories. You too can realize great success by working with <strong>US</strong>!
            </p>
            <p className="mx-auto mt-2 max-w-4xl text-lg text-muted-foreground">
              Contact <strong>US</strong> today to discover how easy and affordable it is to become even more competitive and profitable through efficient production planning, scheduling, tracking, combined with improved communications.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl  font-bold text-foreground">
              Discover How Easy and Affordable It Is
            </h2>
            <p className="mt-4 text-[18px] text-muted-foreground">
              To become even more competitive and profitable through efficient
              production planning, scheduling, tracking, combined with improved
              communications.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {successStories.map((story) => (
              <Link key={story.id} href={story.href} className="block">
                <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                <div className="aspect-video overflow-hidden bg-muted">
                  <Image
                    src={story.logo}
                    alt={`${story.author} logo`}
                    width={400}
                    height={225}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-4">
                  <Link href={story.href}>
                    <CardTitle className="line-clamp-2 cursor-pointer text-lg transition-colors hover:text-blue-600 group-hover:text-blue-600">
                      {story.title}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-4 line-clamp-3">
                    {story.description}
                  </CardDescription>
                  <blockquote className="mb-4 border-l-4 border-blue-500 pl-4">
                    <p className="text-sm italic text-foreground">
                      "{story.quote}"
                    </p>
                    <footer className="mt-2 text-xs text-muted-foreground">
                      — {story.author}
                    </footer>
                  </blockquote>
                  <Link href={story.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 font-medium text-blue-600 hover:text-blue-700"
                    >
                      Read more
                      <ArrowUpRightIcon className="ml-1 size-4" />
                    </Button>
                  </Link>
                </CardContent>
                </Card>
              </Link>
            ))}
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
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
