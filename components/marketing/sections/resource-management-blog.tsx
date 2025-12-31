'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRightIcon, CalendarIcon, UserIcon } from 'lucide-react';

import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const blogPosts = [
  {
    title:
      'Enhancing Supply Chain Visibility through Advanced Scheduling Solutions',
    description:
      "Supply Chain Visibility Solutions for Modern Manufacturers. Are your supply chain operations as transparent and efficient as they should be? In today's fast-paced market, full visibility into your supply chain is crucial for maintaining competitive advantage.",
    date: 'May 26, 2024',
    readTime: '5 min read',
    category: 'Supply Chain',
    image:
      'https://www.usersolutions.com/wp-content/uploads/2022/09/usersolutionsimage-300x211.png',
    href: '/enhancing-supply-chain-visibility-through-advanced-scheduling-solutions'
  },
  {
    title:
      'The Role of Technology in Modern Production Planning and Scheduling',
    description:
      'Have you ever wondered how technology can transform the traditional landscape of production planning and scheduling? In an era where efficiency dictates market leaders, the integration of advanced technology solutions is no longer optional.',
    date: 'May 16, 2024',
    readTime: '6 min read',
    category: 'Technology',
    image:
      'https://www.usersolutions.com/wp-content/uploads/2022/07/AirCraftMaint.jpg',
    href: '/erp-solutions-for-production-planning'
  },
  {
    title:
      'Implementing Lean Manufacturing Principles for Improved Production Efficiency',
    description:
      "Is your manufacturing process as streamlined and cost-effective as it could be? In today's competitive landscape, companies are constantly seeking methods to enhance efficiency and reduce waste through lean manufacturing principles.",
    date: 'May 6, 2024',
    readTime: '7 min read',
    category: 'Manufacturing',
    image: 'https://www.usersolutions.com/wp-content/uploads/2024/02/sdf.jpg',
    href: '/lean-manufacturing-solutions'
  },
  {
    title: 'Li-ion Battery Production Scheduling Software',
    description:
      'Resource Manager-DB V6 Transforms Li-ion Battery Production Scheduling. User Solutions, a leader in flexible production scheduling and planning software, has released Resource Manager-DB (RM-DB) V6.',
    date: 'September 8, 2022',
    readTime: '4 min read',
    category: 'Software',
    image:
      'https://www.usersolutions.com/wp-content/uploads/2022/09/image04-300x163.png',
    href: '/li-ion-battery-production-scheduling-software'
  },
  {
    title: 'Scheduling System Narrows Skills Gap for Fire-Rated Glass',
    description:
      "Scheduling System Narrows Skills Gap for Fire-Rated Glass. User Solutions' Resource Manager-DB enables Technical Glass Products to strategically cross-train their way to optimization.",
    date: 'September 8, 2022',
    readTime: '5 min read',
    category: 'Case Study',
    image:
      'https://www.usersolutions.com/wp-content/uploads/2022/09/image3-300x163.png',
    href: '/scheduling-system-narrows-skills-gap-for-fire-rated-glass'
  },
  {
    title:
      'Small Manufacturer and Job Shop Uses Planning, Scheduling, and Tracking Tools from User Solutions, Inc. to Become More Efficient and Competitive',
    description:
      'Small Manufacturer and Job Shop Uses Planning, Scheduling, and Tracking Tools from User Solutions, Inc. to Become More Efficient and Competitive. Resource Manager for Excel transforms operations for growing businesses.',
    date: 'September 8, 2022',
    readTime: '6 min read',
    category: 'Success Story',
    image:
      'https://www.usersolutions.com/wp-content/uploads/2022/09/image06-1-300x163.png',
    href: '/small-manufacturer-and-job-shop-uses-planning-scheduling-and-tracking-tools-from-user-solutions-inc-to-become-more-efficient-and-competitive'
  }
];

export function ResourceManagementBlog() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6">
        <div className="container relative">
          <div className="mx-auto max-w-7xl text-center">
            <SiteHeading
              title={
                <>
                  Resource Management
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {' '}
                    Blog
                  </span>
                </>
              }
              description="Discover insights, tips, and best practices for resource management in manufacturing, production planning, and scheduling solutions."
            />
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="pt-6">
        <div className="container">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold">Latest Insights</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Stay updated with the latest trends, technologies, and best
              practices in resource management
            </p>
          </div>

          {/* Category Filter */}
          {/* <div className="mb-6 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div> */}

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Link key={index} href={post.href} className="block">
                <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="mb-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="size-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <UserIcon className="size-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="mb-3 w-fit"
                  >
                    {post.category}
                  </Badge>
                  <CardTitle className="line-clamp-2 transition-colors group-hover:text-blue-600">
                    <Link href={post.href}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-4 line-clamp-3">
                    {post.description}
                  </CardDescription>
                  <Link href={post.href}>
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

      {/* Awards Banner */}
      <section>
        <div className=" mx-auto container">
          <div className="">
            <Card className="mt-6 rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 text-card-foreground shadow">
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
                  loading="lazy"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
