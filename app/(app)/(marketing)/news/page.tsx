import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('News'),
  description:
    "View User Solutions' press announcements and media coverage to stay up-to-date on our innovative production planning and scheduling solutions and how they can help manufacturers become more competitive and profitable through efficient resource management."
};

const mediaCoverage = [
  {
    title: 'Top 10 Manufacturing KPIs in 2024',
    image: 'https://www.usersolutions.com/wp-content/uploads/2024/02/sdf.jpg',
    link: '/top-10-manufacturing-kpis-in-2024',
    sources: [
      { name: 'What is a manufacturing KPI?', url: '/top-10-manufacturing-kpis-in-2024' }
    ]
  },
  {
    title: 'User Solutions Joins COVID Fight with Production Scheduling Software',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/2020.png',
    link: 'https://www.todaysmedicaldevelopments.com/product/user-solutions-covid-free-rmx-software-quoting/',
    sources: [
      { name: "Today's Medical Developments", url: 'https://www.todaysmedicaldevelopments.com/product/user-solutions-covid-free-rmx-software-quoting/' },
      { name: 'Processing Magazine', url: 'https://www.processingmagazine.com/covid-19/article/21134726/user-solutions-joins-fight-against-covid-19-offers-free-production-scheduling-software' },
      { name: 'Eurocom PR', url: 'https://www.eurocompr.com/news/ripple-effect-offers-free-pr-for-us-companies-who-fight-covid-19' },
      { name: 'IEN', url: 'https://www.ien.com/software/news/21129098/user-solutions-joins-covid-fight-with-production-scheduling-software' }
    ]
  },
  {
    title: 'Production Scheduling System for Amish Woodshop Cuts Lead Time, Inefficiency',
    image: 'https://www.usersolutions.com/wp-content/uploads/2023/01/amish.png',
    link: 'https://www.woodworkingnetwork.com/',
    sources: [
      { name: 'Woodworking Network', url: 'https://www.woodworkingnetwork.com/' }
    ]
  },
  {
    title: 'User Solutions Named Top ERP Solutions Transforming Business 2016',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/2016.png',
    link: 'https://www.cioapplications.com/magazines/May/ERP2016/',
    sources: [
      { name: 'CIO Applications', url: 'https://www.cioapplications.com/magazines/May/ERP2016/' }
    ]
  },
  {
    title: 'Quick and Easy Excel-Based MRP Software for Small and Large Manufacturing',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/2018.png',
    link: 'http://www.orms-today.org/',
    sources: [
      { name: 'OR/MS Today', url: 'http://www.orms-today.org/' }
    ]
  },
  {
    title: 'APICS Profiles in Manufacturing',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/2015.png',
    link: 'https://www.ascm.org/',
    sources: [
      { name: 'APICS', url: 'https://www.ascm.org/' }
    ]
  },
  {
    title: 'Software Schedules Maintenance With Military Precision',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/2014.png',
    link: 'http://www.impomag.com/',
    sources: [
      { name: 'IMPO', url: 'http://www.impomag.com/' }
    ]
  },
  {
    title: 'Small Manufacturers Seek Best ERP Fit',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/image06.png',
    link: 'https://www.sme.org/',
    sources: [
      { name: 'SME-Manufacturing Engineering', url: 'https://www.sme.org/' }
    ]
  },
  {
    title: 'Fireproof Planning – Cool Scheduling Solution',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/2011.png',
    link: 'https://www.ascm.org/',
    sources: [
      { name: 'APICS', url: 'https://www.ascm.org/' }
    ]
  }
];

const pressReleases = [
  {
    title: 'FREE Webinar Hosted by Purdue MEP to Improve Production Scheduling',
    image: 'https://www.usersolutions.com/wp-content/uploads/2023/07/MEP_H-Full-CMYK_1-crop-1-1024x164.jpg',
    link: 'https://www.prnewswire.com/news-releases/free-webinar-hosted-by-purdue-mep-and-user-solutions-to-improve-production-scheduling-301874765.html'
  },
  {
    title: 'User Solutions, Inc. Announces Revolutionary Method for Production Planning and Scheduling Evaluations',
    date: 'October 29, 2023',
    image: 'https://www.usersolutions.com/wp-content/uploads/2023/12/simple_image.jpg',
    link: 'https://www.prnewswire.com/news-releases/user-solutions-inc-announces-revolutionary-method-for-production-planning-and-scheduling-evaluations-301970812.html'
  },
  {
    title: 'Forging Ahead Leveraging ERP Data for Enhanced Planning and Scheduling',
    date: 'October 28, 2023',
    image: 'https://www.usersolutions.com/wp-content/uploads/2023/12/VFEDGE.jpg',
    link: 'https://www.prnewswire.com/news-releases/forging-ahead-leveraging-erp-data-for-enhanced-planning-and-scheduling-301970725.html'
  },
  {
    title: "User Solutions Continues Partnerships with Multiple University's for Real-Life Experience on Launching a Production Scheduling Offering",
    date: 'October 28, 2023',
    image: 'https://www.usersolutions.com/wp-content/uploads/2023/12/2023-12-24-1-1024x537.png',
    link: 'https://www.prnewswire.com/news-releases/user-solutions-continues-partnerships-with-multiple-universitys-for-real-life-experience-on-launching-a-production-scheduling-offering-301970708.html'
  },
  {
    title: 'User Solution Unveils Revolutionary Manufacturing Software: Customized Solutions for Enhanced Scheduling and Planning',
    date: 'October 4, 2023',
    image: 'https://www.usersolutions.com/wp-content/uploads/2023/12/Screenshot-12-1024x561.png',
    link: 'https://www.prnewswire.com/news-releases/user-solution-unveils-revolutionary-manufacturing-software-customized-solutions-for-enhanced-scheduling-and-planning-301946707.html'
  }
];

const blogArticles = [
  {
    title: 'Enhancing Supply Chain Visibility through Advanced Scheduling Solutions',
    date: 'May 26, 2024',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/usersolutionsimage-300x211.png',
    link: '/enhancing-supply-chain-visibility-through-advanced-scheduling-solutions/'
  },
  {
    title: 'The Role of Technology in Modern Production Planning and Scheduling',
    date: 'May 16, 2024',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/07/AirCraftMaint.jpg',
    link: '/erp-solutions-for-production-planning/'
  },
  {
    title: 'Implementing Lean Manufacturing Principles for Improved Production Efficiency',
    date: 'May 6, 2024',
    image: 'https://www.usersolutions.com/wp-content/uploads/2024/02/sdf.jpg',
    link: '/lean-manufacturing-solutions/'
  },
  {
    title: 'Li-ion Battery Production Scheduling Software',
    date: 'September 8, 2022',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/image04-300x163.png',
    link: '/li-ion-battery-production-scheduling-software/'
  },
  {
    title: 'Scheduling System Narrows Skills Gap for Fire-Rated Glass',
    date: 'September 8, 2022',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/image3-300x163.png',
    link: '/scheduling-system-narrows-skills-gap-for-fire-rated-glass/'
  },
  {
    title: 'Small Manufacturer and Job Shop Uses Planning, Scheduling, and Tracking Tools',
    date: 'September 8, 2022',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/image06-1-300x163.png',
    link: '/small-manufacturer-and-job-shop-uses-planning-scheduling-and-tracking-tools-from-user-solutions-inc-to-become-more-efficient-and-competitive/'
  },
  {
    title: 'User Solutions, Inc. Named as One of Top ERP Solutions Transforming Business 2016',
    date: 'September 8, 2022',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/09/image05-300x163.png',
    link: '/user-solutions-inc-named-as-one-of-top-erp-solutions-transforming-business-2016-by-cio-applications-as-they-celebrate-25-years-in-business/'
  },
  {
    title: 'Celebrating National Manufacturing Day',
    date: 'July 18, 2022',
    image: 'https://www.usersolutions.com/wp-content/uploads/2022/07/celebrating-300x163.png',
    link: '/random-events-and-covariance/'
  }
];

export default function NewsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 pt-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Latest News</h1>
          <p className="text-lg text-muted-foreground">
            View User Solutions' press announcements and media coverage to stay up-to-date on our innovative production planning and scheduling solutions and how they can help manufacturers become more competitive and profitable through efficient resource management
          </p>
        </div>

        {/* Sample Media Coverage */}
        <div className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Sample Media Coverage</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mediaCoverage.map((item, index) => (
              <div key={index} className="overflow-hidden rounded-lg border">
                <Link
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="h-40 w-full object-cover transition-opacity hover:opacity-80"
                    unoptimized
                  />
                </Link>
                <div className="p-3">
                  <Link
                    href={item.link}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-medium hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.sources.map((source, sourceIndex) => (
                      <Link
                        key={sourceIndex}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded bg-gray-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-gray-700"
                      >
                        {source.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Releases */}
        <div className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Press Releases</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {pressReleases.map((item, index) => (
              <div key={index} className={`overflow-hidden rounded-lg border ${index === 0 ? 'md:col-span-2' : ''}`}>
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={index === 0 ? 1024 : 400}
                    height={index === 0 ? 300 : 200}
                    className={`w-full object-contain transition-opacity hover:opacity-80 ${index === 0 ? 'h-auto max-h-96' : 'h-70 object-cover'}`}
                    unoptimized
                  />
                </Link>
                <div className="p-3">
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                  {item.date && <p className="mt-1 text-sm text-muted-foreground">{item.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Articles */}
        <div className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Blog Articles</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {blogArticles.map((article, index) => (
              <div key={index} className="overflow-hidden rounded-lg border">
                <Link
                  href={article.link}
                  target={article.link.startsWith('http') ? '_blank' : undefined}
                  rel={article.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={300}
                    height={163}
                    className="h-32 w-full object-cover transition-opacity hover:opacity-80"
                    unoptimized
                  />
                </Link>
                <div className="p-3">
                  <Link
                    href={article.link}
                    target={article.link.startsWith('http') ? '_blank' : undefined}
                    rel={article.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm font-medium hover:text-blue-600"
                  >
                    {article.title}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">{article.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
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
              unoptimized
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
