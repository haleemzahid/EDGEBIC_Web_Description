import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Operations Manager',
  description:
    'Production and Operations Management Templates for forecasting, inventory management, MRP, production planning, and quality control.'
};

export default function OperationsManagerPage(): React.JSX.Element {
  const categories = [
    {
      title: 'Forecasting',
      description:
        'Production and Operations Management Templates for forecasting and demand planning',
      items: [
        {
          title: 'Simple exponential smoothing',
          price: 'FREE',
          infoLink: '/operations-manager-simple'
        },
        {
          title: 'Smoothing linear, exponential, and damped trends',
          price: 'FREE',
          infoLink: '/operations-manager-trendsmooth'
        },
        {
          title: 'Ratio-to-moving-average seasonal adjustment',
          price: 'FREE',
          infoLink: '/operations-manager-multimon'
        },
        {
          title: 'Difference-to-moving-average seas. adj. for mo. data',
          price: 'FREE',
          infoLink: '/operations-manager-additmon'
        },
        {
          title: 'Complete Forecasting package',
          price: 'FREE',
          infoLink: '/docs/forecasting-package.pdf',
          isPackage: true
        }
      ]
    },
    {
      title: 'Inventory Management',
      description: 'Comprehensive inventory management solutions and tools',
      items: [
        {
          title: 'Economic order quantity',
          price: 'FREE',
          infoLink: '/operations-manager-eoq'
        },
        {
          title: 'EOQ with backorders',
          price: 'FREE',
          infoLink: '/operations-manager-eoqback'
        },
        {
          title: 'EOQ with quantity discounts',
          price: 'FREE',
          infoLink: '/operations-manager-eoqdisc'
        },
        {
          title: 'EOQ for production lot sizes',
          price: 'FREE',
          infoLink: '/operations-manager-eoqprod'
        },
        {
          title: 'Reorder points and safety stocks',
          price: 'FREE',
          infoLink: '/operations-manager-rop'
        },
        {
          title: 'Complete Inventory Management Package',
          price: 'FREE',
          infoLink: '/docs/inventory-management-package.pdf',
          isPackage: true
        }
      ]
    },
    {
      title: 'Material Requirements Planning',
      description:
        'MRP solutions for production planning and inventory control',
      items: [
        {
          title: 'MRP Inventory Plan',
          price: 'FREE',
          infoLink: '/operations-manager-mrp1'
        },
        {
          title: 'Period-Order-Quantity',
          price: 'FREE',
          infoLink: '/operations-manager-poq'
        },
        {
          title: 'Complete MRP Package',
          price: 'FREE',
          infoLink: '/docs/mrp-package.pdf',
          isPackage: true
        }
      ]
    },
    {
      title: 'Production Planning',
      description: 'Production planning and optimization tools',
      items: [
        {
          title: 'Aggregate production planning',
          price: 'FREE',
          infoLink: '/operations-manager-app'
        },
        {
          title: 'Run-Out Time production planning',
          price: 'FREE',
          infoLink: '/operations-manager-runout'
        },
        {
          title: 'Learning curves',
          price: 'FREE',
          infoLink: '/operations-manager-learn'
        },
        {
          title: 'Complete Production Planning Package',
          price: 'FREE',
          infoLink: '/docs/production-planning-package.pdf',
          isPackage: true
        }
      ]
    },
    {
      title: 'Facility Location',
      description:
        'Tools for optimal facility and distribution center location',
      items: [
        {
          title: 'Center-of-Gravity method for locating dist. cntrs',
          price: 'FREE',
          infoLink: '/#'
        },
        {
          title: 'Complete Facility Location Package',
          price: 'FREE',
          infoLink: '/docs/facility-location-package.pdf',
          isPackage: true
        }
      ]
    },
    {
      title: 'Scheduling',
      description: 'Job sequencing and scheduling optimization',
      items: [
        {
          title: 'Job sequencing for a single work station',
          price: 'FREE',
          infoLink: '/operations-manager-sked1aa'
        },
        {
          title: 'Job sequencing for 2 work stations in a series',
          price: 'FREE',
          infoLink: '/operations-manager-sked2a'
        },
        {
          title: 'Job sequencing for 3 work stations in a series',
          price: 'FREE',
          infoLink: '/operations-manager-sked3a'
        },
        {
          title: 'Complete Scheduling Package',
          price: 'FREE',
          infoLink: '/docs/scheduling-package.pdf',
          isPackage: true
        }
      ]
    },
    {
      title: 'Quality Control',
      description: 'Quality control and statistical process control tools',
      items: [
        {
          title: 'Acceptance Sampling',
          price: 'FREE',
          infoLink: '/operations-manager-acceptsa'
        },
        {
          title: 'Control chart for mean and range',
          price: 'FREE',
          infoLink: '/operations-manager-mr-chart'
        },
        {
          title: 'Control chart for individual observations',
          price: 'FREE',
          infoLink: '/operations-manager-i-chart'
        },
        {
          title: 'Control chart for perfect defective',
          price: 'FREE',
          infoLink: '/operations-manager-p-chart'
        },
        {
          title: 'Control chart for number of defects',
          price: 'FREE',
          infoLink: '/operations-manager-cu-chart'
        },
        {
          title: 'Control limit calculator',
          price: 'FREE',
          infoLink: '/operations-manager-limit'
        },
        {
          title: 'Complete Quality Control Package',
          price: 'FREE',
          infoLink: '/docs/quality-control-package.pdf',
          isPackage: true
        }
      ]
    },
    {
      title: 'Analysis of Waiting Lines',
      description: 'Queue theory and waiting line analysis tools',
      items: [
        {
          title: 'Single-Server Queues',
          price: 'FREE',
          infoLink: '/operations-manager-singleeq'
        },
        {
          title: 'Multi-Server Queues',
          price: 'FREE',
          infoLink: '/operations-manager-multiq'
        },
        {
          title: 'Complete Analysis of Waiting Lines',
          price: 'FREE',
          infoLink: '/docs/waiting-lines-package.pdf',
          isPackage: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Content */}
      <div className="container mx-auto px-4 pt-6">
        <div className="mx-auto max-w-7xl text-center">
          {/* Hero Section */}
          <h1 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
            Operations Manager
          </h1>
          <p className="mb-6 text-xl text-muted-foreground md:text-2xl">
            Production and Operations Management Templates ideal for
            introduction to Production Planning, Production Scheduling, Material
            Requirements Planning, Inventory Management and Quality Control
            techniques.
          </p>
          <p className="mb-6 text-lg text-muted-foreground">
            All formulas are in Excel with full documentation. You can view full
            documentation then order a single template, group per section, or
            entire package.
          </p>
        </div>

        {/* Categories */}
        <div className="mx-auto max-w-7xl space-y-6">
          {categories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-3xl ">
                  {category.title}
                </CardTitle>
                <p className="text-lg text-muted-foreground">
                  {category.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item, itemIndex) => (
                    <Card
                      key={itemIndex}
                      className={`border-2 ${item.isPackage ? 'border-orange-200 bg-orange-50' : 'border-gray-200'}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col space-y-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.title}
                            </h3>
                            {item.isPackage && (
                              <Badge
                                variant="secondary"
                                className="mt-2"
                              >
                                Complete Package
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold  ">
                              {item.price}
                            </span>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                              >
                                <Link href={item.infoLink}>
                                  {item.infoLink.includes('.pdf')
                                    ? 'Doc'
                                    : 'Info'}
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                asChild
                              >
                                <Link href="/contact-us">Request Free</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Awards Section */}
        <div className="mx-auto max-w-7xl">
          <section className="pt-6">
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
          </section>
        </div>
      </div>
    </div>
  );
}
