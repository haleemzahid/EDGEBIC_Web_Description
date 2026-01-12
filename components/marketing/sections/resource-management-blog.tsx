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
  // {
  //   title:
  //     'Enhancing Supply Chain Visibility through Advanced Scheduling Solutions',
  //   description:
  //     "Supply Chain Visibility Solutions for Modern Manufacturers. Are your supply chain operations as transparent and efficient as they should be? In today's fast-paced market, full visibility into your supply chain is crucial for maintaining competitive advantage.",
  //   date: 'May 26, 2024',
  //   readTime: '5 min read',
  //   category: 'Supply Chain',
  //   image: '/images/Edgebic/2022-09/usersolutionsimage-300x211.png',
  //   href: '/enhancing-supply-chain-visibility-through-advanced-scheduling-solutions'
  // },
  // {
  //   title:
  //     'The Role of Technology in Modern Production Planning and Scheduling',
  //   description:
  //     'Have you ever wondered how technology can transform the traditional landscape of production planning and scheduling? In an era where efficiency dictates market leaders, the integration of advanced technology solutions is no longer optional.',
  //   date: 'May 16, 2024',
  //   readTime: '6 min read',
  //   category: 'Technology',
  //   image: '/images/Edgebic/2022-07/AirCraftMaint.jpg',
  //   href: '/erp-solutions-for-production-planning'
  // },
  // {
  //   title:
  //     'Implementing Lean Manufacturing Principles for Improved Production Efficiency',
  //   description:
  //     "Is your manufacturing process as streamlined and cost-effective as it could be? In today's competitive landscape, companies are constantly seeking methods to enhance efficiency and reduce waste through lean manufacturing principles.",
  //   date: 'May 6, 2024',
  //   readTime: '7 min read',
  //   category: 'Manufacturing',
  //   image: '/images/Edgebic/2024-02/sdf.jpg',
  //   href: '/lean-manufacturing-solutions'
  // },
  // {
  //   title: 'Li-ion Battery Production Scheduling Software',
  //   description:
  //     'Resource Manager-DB V6 Transforms Li-ion Battery Production Scheduling. User Solutions, a leader in flexible production scheduling and planning software, has released Resource Manager-DB (RM-DB) V6.',
  //   date: 'September 8, 2022',
  //   readTime: '4 min read',
  //   category: 'Software',
  //   image: '/images/Edgebic/2022-09/image04-300x163.png',
  //   href: '/li-ion-battery-production-scheduling-software'
  // },
  // {
  //   title: 'Scheduling System Narrows Skills Gap for Fire-Rated Glass',
  //   description:
  //     "Scheduling System Narrows Skills Gap for Fire-Rated Glass. User Solutions' Resource Manager-DB enables Technical Glass Products to strategically cross-train their way to optimization.",
  //   date: 'September 8, 2022',
  //   readTime: '5 min read',
  //   category: 'Case Study',
  //   image: '/images/Edgebic/2022-09/image3-300x163.png',
  //   href: '/scheduling-system-narrows-skills-gap-for-fire-rated-glass'
  // },
  // {
  //   title:
  //     'Small Manufacturer and Job Shop Uses Planning, Scheduling, and Tracking Tools from User Solutions, Inc. to Become More Efficient and Competitive',
  //   description:
  //     'Small Manufacturer and Job Shop Uses Planning, Scheduling, and Tracking Tools from User Solutions, Inc. to Become More Efficient and Competitive. Resource Manager for Excel transforms operations for growing businesses.',
  //   date: 'September 8, 2022',
  //   readTime: '6 min read',
  //   category: 'Success Story',
  //   image: '/images/Edgebic/2022-09/image06-1-300x163.png',
  //   href: '/small-manufacturer-and-job-shop-uses-planning-scheduling-and-tracking-tools-from-user-solutions-inc-to-become-more-efficient-and-competitive'
  // }
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

      {/* Three Image Sections */}
      <section className="pt-6">
        <div className="container">
          {/* RMDB Integrate MRP and capacity planning */}
          <div className="lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
            <div className="mt-6 space-y-4 lg:mt-0">
              <h3 className="text-xl font-bold text-[#003d5c] md:text-2xl">
                RMDB Integrate MRP and capacity planning
              </h3>
              <p className="text-base leading-relaxed text-slate-700">
                Manage material requirements, prevent bottlenecks with finite
                capacity scheduling, and optimize workcenter loading with visual
                heat maps and what-if analysis capabilities.
              </p>
              <div className="mt-6">
                <Link
                  href="/resource-manager-db-2"
                  className="inline-flex items-center justify-center rounded-md border-2 border-[#003d5c] bg-transparent px-5 py-2 text-sm font-medium text-[#003d5c] transition-all duration-200 hover:bg-[#003d5c] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#003d5c] focus:ring-offset-2]"
                >
                  View Details
                </Link>
              </div>
            </div>
            <div className="relative flex h-[300px] items-center justify-center lg:col-start-2">
              <Image
                src="/images/Edgebic/2022-07/rmdb11.png"
                alt="Integrated MRP and capacity planning dashboard"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Feature Section */}
          <div className="mt-6 lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
            <div className="relative flex h-[300px] items-center justify-center lg:col-start-2">
              <Image
                src="/images/Edgebic/2022-10/RMDB-Data-Import.png"
                alt="Data import features for production scheduling"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
                loading="lazy"
              />
            </div>

            <div className="mt-6 space-y-4 lg:mt-0">
              <h3 className="text-xl font-bold text-[#003d5c] md:text-2xl">
                Feature
              </h3>
              <ul className="space-y-2 text-base leading-relaxed text-slate-700">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-[#2FB8DE]">◉</span>
                  <span>Finite Planning & Scheduling</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-[#2FB8DE]">◉</span>
                  <span>MRP and Inventory Management</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-[#2FB8DE]">◉</span>
                  <span>Routings and Priority Scheduling</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-[#2FB8DE]">◉</span>
                  <span>Easy "what-if" analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-[#2FB8DE]">◉</span>
                  <span>Purchasing and Receiving</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-[#2FB8DE]">◉</span>
                  <span>Forecasting</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/resource-manager-db-in-depth"
                  className="inline-flex items-center justify-center rounded-md border-2 border-[#003d5c] bg-transparent px-5 py-2 text-sm font-medium text-[#003d5c] transition-all duration-200 hover:bg-[#003d5c] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#003d5c] focus:ring-offset-2]"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Real-time inventory overview */}
          <div className="mt-6 lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
            <div className="mt-6 space-y-4 lg:mt-0">
              <h3 className="text-xl font-bold text-[#003d5c] md:text-2xl">
                Real-time inventory overview
              </h3>
              <p className="text-base leading-relaxed text-slate-700">
                Prevent stock-outs, lower inventory levels, automate inventory
                transactions, view purchase requirements, track lots, and more.
              </p>
              <div className="mt-6">
                <Link
                  href="/production-scheduling-products"
                  className="inline-flex items-center justify-center rounded-md border-2 border-[#003d5c] bg-transparent px-5 py-2 text-sm font-medium text-[#003d5c] transition-all duration-200 hover:bg-[#003d5c] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#003d5c] focus:ring-offset-2]"
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className="relative flex h-[300px] items-center justify-center lg:col-start-2">
              <Image
                src="/images/Edgebic/2022-09/SQC-Pareto.png"
                alt="Real-time inventory overview"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Manufacturing Software Section */}
      <section className="pt-6">
        <div className="container">
          <div className="mt-6">
            <h2 className="text-center text-3xl font-bold text-[#003d5c] md:text-4xl">
              Integrated Manufacturing Software for Business Growth
            </h2>

            <div className="mt-6 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Production Planning */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex size-20 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="size-16"
                  >
                    <rect
                      x="12"
                      y="8"
                      width="40"
                      height="48"
                      rx="4"
                      fill="#5C77F1"
                    />
                    <rect
                      x="16"
                      y="16"
                      width="12"
                      height="8"
                      rx="1"
                      fill="#2FB8DE"
                    />
                    <rect
                      x="16"
                      y="28"
                      width="12"
                      height="8"
                      rx="1"
                      fill="#2FB8DE"
                    />
                    <rect
                      x="16"
                      y="40"
                      width="12"
                      height="8"
                      rx="1"
                      fill="#2FB8DE"
                    />
                    <rect
                      x="32"
                      y="16"
                      width="16"
                      height="4"
                      rx="1"
                      fill="#8CE6FF"
                    />
                    <rect
                      x="32"
                      y="24"
                      width="16"
                      height="4"
                      rx="1"
                      fill="#8CE6FF"
                    />
                    <rect
                      x="32"
                      y="32"
                      width="16"
                      height="4"
                      rx="1"
                      fill="#8CE6FF"
                    />
                    <rect
                      x="32"
                      y="40"
                      width="16"
                      height="4"
                      rx="1"
                      fill="#8CE6FF"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#003d5c]">
                  Production Planning
                </h3>
                <p className="text-base text-slate-700">
                  Generate reliable, detailed production plans. Balance materials
                  and capacity with actual demand. Effortlessly reschedule
                  production orders.
                </p>
              </div>

              {/* Inventory */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex size-20 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="size-16"
                  >
                    <rect
                      x="20"
                      y="12"
                      width="24"
                      height="16"
                      rx="2"
                      fill="#5C77F1"
                    />
                    <rect
                      x="20"
                      y="32"
                      width="24"
                      height="16"
                      rx="2"
                      fill="#2FB8DE"
                    />
                    <rect
                      x="16"
                      y="28"
                      width="32"
                      height="4"
                      fill="#003557"
                    />
                    <rect
                      x="16"
                      y="48"
                      width="32"
                      height="4"
                      fill="#003557"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#003d5c]">
                  Inventory
                </h3>
                <p className="text-base text-slate-700">
                  Always know what you have in stock. Easily avoid inventory
                  shortages and excess. Track inventory by lot or batch, use
                  serial numbers and barcodes.
                </p>
              </div>

              {/* Sales Management */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex size-20 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="size-16"
                  >
                    <rect
                      x="12"
                      y="16"
                      width="40"
                      height="6"
                      rx="1"
                      fill="#5C77F1"
                    />
                    <rect
                      x="12"
                      y="26"
                      width="40"
                      height="6"
                      rx="1"
                      fill="#2FB8DE"
                    />
                    <rect
                      x="12"
                      y="36"
                      width="40"
                      height="6"
                      rx="1"
                      fill="#8CE6FF"
                    />
                    <circle
                      cx="8"
                      cy="19"
                      r="2"
                      fill="#003557"
                    />
                    <circle
                      cx="8"
                      cy="29"
                      r="2"
                      fill="#003557"
                    />
                    <circle
                      cx="8"
                      cy="39"
                      r="2"
                      fill="#003557"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#003d5c]">
                  Sales Management
                </h3>
                <p className="text-base text-slate-700">
                  Calculate order costs and lead times in just a few clicks. Send
                  confirmed orders straight to production. Easily manage invoices,
                  shipping, and returns.
                </p>
              </div>

              {/* Workforce */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex size-20 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="size-16"
                  >
                    <circle
                      cx="32"
                      cy="20"
                      r="8"
                      fill="#5C77F1"
                    />
                    <path
                      d="M32 32 L20 44 L44 44 Z"
                      fill="#2FB8DE"
                    />
                    <circle
                      cx="18"
                      cy="24"
                      r="6"
                      fill="#5C77F1"
                      opacity="0.7"
                    />
                    <circle
                      cx="46"
                      cy="24"
                      r="6"
                      fill="#5C77F1"
                      opacity="0.7"
                    />
                    <path
                      d="M18 34 L10 44 L26 44 Z"
                      fill="#2FB8DE"
                      opacity="0.7"
                    />
                    <path
                      d="M46 34 L38 44 L54 44 Z"
                      fill="#2FB8DE"
                      opacity="0.7"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#003d5c]">
                  Workforce
                </h3>
                <p className="text-base text-slate-700">
                  Stay informed on your labor requirements and utilization.
                  Provide shop floor workers with a simple interface for reporting
                  orders and material use.
                </p>
              </div>

              {/* Procurement */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex size-20 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="size-16"
                  >
                    <rect
                      x="16"
                      y="16"
                      width="32"
                      height="32"
                      rx="2"
                      fill="#5C77F1"
                    />
                    <path
                      d="M24 28 L32 20 L40 28"
                      stroke="#2FB8DE"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="32"
                      y1="22"
                      x2="32"
                      y2="40"
                      stroke="#2FB8DE"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#003d5c]">
                  Procurement
                </h3>
                <p className="text-base text-slate-700">
                  Easily forecast your procurement requirements. Create pre-filled
                  purchase orders in one click. Manage supplier relationships.
                  Compare terms and reliability.
                </p>
              </div>

              {/* Finances */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex size-20 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="size-16"
                  >
                    <rect
                      x="12"
                      y="12"
                      width="40"
                      height="40"
                      rx="2"
                      fill="#5C77F1"
                    />
                    <path
                      d="M20 32 L28 24 L36 36 L44 20"
                      stroke="#2FB8DE"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="20"
                      cy="32"
                      r="2"
                      fill="#8CE6FF"
                    />
                    <circle
                      cx="28"
                      cy="24"
                      r="2"
                      fill="#8CE6FF"
                    />
                    <circle
                      cx="36"
                      cy="36"
                      r="2"
                      fill="#8CE6FF"
                    />
                    <circle
                      cx="44"
                      cy="20"
                      r="2"
                      fill="#8CE6FF"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#003d5c]">
                  Finances
                </h3>
                <p className="text-base text-slate-700">
                  Manage transactions, track income and expenses, and create
                  accurate reports. Streamline accounting tasks and make better
                  financial decisions.
                </p>
              </div>
            </div>
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
    </div>
  );
}
