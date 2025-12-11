import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Newspaper, Award, Megaphone } from 'lucide-react';

import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('News'),
  description:
    "View User Solutions' press announcements and media coverage to stay up-to-date on our innovative production planning and scheduling solutions."
};

// Press Releases Data
const pressReleases = [
  {
    title: 'FREE Webinar Hosted by Purdue MEP to Improve Production Scheduling',
    date: '2023',
    link: 'https://www.prnewswire.com/news-releases/free-webinar-hosted-by-purdue-mep-and-user-solutions-to-improve-production-scheduling-301874765.html',
    featured: true,
    image: 'https://www.usersolutions.com/wp-content/uploads/2023/07/MEP_H-Full-CMYK_1-crop-1-1024x164.jpg'
  },
  {
    title: 'User Solutions announces revolutionary method for Production Planning and Scheduling evaluations',
    date: 'Oct 29, 2023',
    link: 'https://www.prnewswire.com/news-releases/user-solutions-inc-announces-revolutionary-method-for-production-planning-and-scheduling-evaluations-301970812.html'
  },
  {
    title: 'Forging Ahead: Leveraging ERP Data for Enhanced Planning and Scheduling',
    date: 'Oct 28, 2023',
    link: 'https://www.prnewswire.com/news-releases/forging-ahead-leveraging-erp-data-for-enhanced-planning-and-scheduling-301970725.html'
  },
  {
    title: 'User Solutions continues University partnerships for real-life Production Scheduling experience',
    date: 'Oct 28, 2023',
    link: 'https://www.prnewswire.com/news-releases/user-solutions-continues-partnerships-with-multiple-universitys-for-real-life-experience-on-launching-a-production-scheduling-offering-301970708.html'
  },
  {
    title: 'User Solutions Unveils Revolutionary Manufacturing Software',
    date: 'Oct 4, 2023',
    link: 'https://www.prnewswire.com/news-releases/user-solution-unveils-revolutionary-manufacturing-software-customized-solutions-for-enhanced-scheduling-and-planning-301946707.html'
  }
];

// Media Coverage Data
const mediaCoverage = [
  {
    title: 'Top 10 Manufacturing KPIs in 2024',
    source: 'Industry Publication',
    image: 'https://www.usersolutions.com/wp-content/uploads/2024/02/sdf.jpg',
    link: '/top-10-manufacturing-kpis-in-2024'
  },
  {
    title: 'User Solutions Joins COVID Fight with Production Scheduling Software',
    source: "Today's Medical Developments, Processing Magazine, IEN",
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/2020.png',
    links: [
      { name: "Today's Medical Developments", url: 'https://www.todaysmedicaldevelopments.com/product/user-solutions-covid-free-rmx-software-quoting/' },
      { name: 'Processing Magazine', url: 'https://www.processingmagazine.com/covid-19/article/21134726/user-solutions-joins-fight-against-covid19-offers-free-production-scheduling-software' },
      { name: 'IEN', url: 'https://www.ien.com/software/news/21129098/user-solutions-joins-covid-fight-with-production-scheduling-software' }
    ]
  },
  {
    title: 'Production Scheduling System for Amish Woodshop Cuts Lead Time',
    source: 'Woodworking Network',
    image: 'https://www.usersolutions.com/wp-content/uploads/2023/01/amish.png',
    link: '#'
  },
  {
    title: 'User Solutions named Top ERP Solutions Transforming Business 2016',
    source: 'CIO Applications',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/2016.png',
    link: 'https://www.cioapplications.com/magazines/May/ERP2016/'
  },
  {
    title: 'Quick and Easy Excel-based MRP Software',
    source: 'OR/MS Today',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/2018.png',
    link: 'http://www.orms-today.org/'
  },
  {
    title: 'Software Schedules Maintenance with Military Precision',
    source: 'IMPO',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/2014.png',
    link: 'http://www.impomag.com/'
  }
];

// Recent Articles Data
const recentArticles = [
  {
    title: 'Enhancing Supply Chain Visibility through Advanced Scheduling Solutions',
    date: 'May 26, 2024',
    category: 'Supply Chain',
    link: '/enhancing-supply-chain-visibility-through-advanced-scheduling-solutions',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/usersolutionsimage-300x211.png'
  },
  {
    title: 'The Role of Technology in Modern Production Planning and Scheduling',
    date: 'May 16, 2024',
    category: 'Technology',
    link: '/erp-solutions-for-production-planning',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/07/AirCraftMaint.jpg'
  },
  {
    title: 'Implementing Lean Manufacturing Principles for Improved Production Efficiency',
    date: 'May 6, 2024',
    category: 'Manufacturing',
    link: '/lean-manufacturing-solutions',
    image: 'https://www.usersolutions.com/wp-content/uploads/2024/02/sdf.jpg'
  },
  {
    title: 'Li-ion Battery Production Scheduling Software',
    date: 'Sep 8, 2022',
    category: 'Software',
    link: '/li-ion-battery-production-scheduling-software',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/image04-300x163.png'
  },
  {
    title: 'Scheduling System Narrows Skills Gap for Fire-Rated Glass',
    date: 'Sep 8, 2022',
    category: 'Case Study',
    link: '/scheduling-system-narrows-skills-gap-for-fire-rated-glass',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/image3-300x163.png'
  },
  {
    title: 'Small Manufacturer Success with Planning & Scheduling Tools',
    date: 'Sep 8, 2022',
    category: 'Success Story',
    link: '/small-manufacturer-and-job-shop-uses-planning-scheduling-and-tracking-tools-from-user-solutions-inc-to-become-more-efficient-and-competitive',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/image06-1-300x163.png'
  }
];

export default async function NewsPage(): Promise<React.JSX.Element> {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="container mx-auto max-w-7xl px-4 pt-6">
        <SiteHeading
          badge="News & Updates"
          title="Latest News"
          description="Stay up-to-date with our press announcements, media coverage, and industry insights"
        />
      </div>


      {/* Press Releases */}
      <section className="container mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Megaphone className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold">Press Releases</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {pressReleases.map((item, index) => (
            <Card key={index} className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-5">
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  {item.date}
                </div>
                <h3 className="mb-3 font-semibold transition-colors group-hover:text-blue-600">
                  {item.title}
                </h3>
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Read More <ArrowRight className="size-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section className="bg-slate-50 py-6 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <Newspaper className="size-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">Recent Articles</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentArticles.map((article, index) => (
              <Card key={index} className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute left-3 top-3">
                    <Badge variant="secondary" className="bg-white/90 text-xs">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    {article.date}
                  </div>
                  <h3 className="mb-3 line-clamp-2 font-semibold transition-colors group-hover:text-blue-600">
                    {article.title}
                  </h3>
                  <Link
                    href={article.link}
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Read More <ArrowRight className="size-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="container mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
            <Award className="size-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold">Media Coverage</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mediaCoverage.map((item, index) => (
            <Card key={index} className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <CardContent className="p-5">
                <p className="mb-2 text-xs font-medium text-purple-600 dark:text-purple-400">
                  {item.source}
                </p>
                <h3 className="mb-3 line-clamp-2 font-semibold transition-colors group-hover:text-blue-600">
                  {item.title}
                </h3>
                {item.links ? (
                  <div className="flex flex-wrap gap-2">
                    {item.links.map((link, i) => (
                      <Link
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.link!}
                    target={item.link!.startsWith('http') ? '_blank' : undefined}
                    rel={item.link!.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Read More <ArrowRight className="size-3" />
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section className="container mx-auto max-w-7xl px-4">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
              CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
            </h2>
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
      </section>
    </div>
  );
}
