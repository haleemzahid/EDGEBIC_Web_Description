'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ExternalLink, Quote } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Product2Page(): React.JSX.Element {
  const featureComparison = [
    {
      feature: 'Routings',
      description:
        'Workcenter Set-up and Cycle Times, Queue / Move Times, Linear and non-Linear.',
      jsl: true,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Finite Capacity',
      description:
        'Only schedules to what is available. Customizable Workcenter Calendars and Daily Calendar. Color coded. Graphics.',
      jsl: true,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Tracking Actuals',
      description:
        'Import Actuals. if available, or direct entry. Even drag-and-drop to track WIP.',
      jsl: false,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Bill of Materials',
      description:
        'Quantity per, Parent-child, Sub-Assemblies, Rev Control, much more.',
      jsl: false,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Mixed Mode Scheduling',
      description:
        'Forward based on start date or Reverse based on due date or even Time Fenced. Per job or group of orders. Prioritize at any level.',
      jsl: true,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Rescheduling',
      description:
        'Import Actuals. if available, or direct entry. Even drag-and-drop to track WIP.',
      jsl: false,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Inventory Management',
      description:
        'Low maintenance. Safety Stocks, Yield Factors, Purchasing UOM, ATP, Reporting.',
      jsl: false,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Material Planning Basic',
      description: 'What materials are required for what jobs and when.',
      jsl: false,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Customizable',
      description:
        'We specialize in enhancing any product, or combination, to meet your unique needs.',
      jsl: false,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Purchase Orders',
      description:
        'Easy, fast, accurate. Based on scheduled demand, stock replenishment, and more. Paperless option.',
      jsl: false,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Drag and Drop',
      description:
        'Visually change dates per job, per workcenter, or even drag job from one workcenter to another.',
      jsl: false,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Materials Planning Advanced',
      description:
        'MRP Calculations, Shortage Reports, Lot and Batch Sizing, much more.',
      jsl: false,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Integration with other systems',
      description:
        'Import and Export to Excel and direct importing via ODBC drivers. Integrates easily with most ERP and custom systems.',
      jsl: false,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Advanced Planning & Scheduling',
      description:
        'Alternate Routings, Multiple Constraints, Multiple Priorities, Rescheduling on demand, much more.',
      jsl: false,
      rmdb: true,
      edgebi: true
    },
    {
      feature: 'Heat Map Report',
      description:
        'Visual representation of capacity loading across your schedule.',
      jsl: false,
      rmdb: false,
      edgebi: true
    },
    {
      feature: 'Schedule Key Dates',
      description: 'Critical date tracking and reporting functionality.',
      jsl: false,
      rmdb: false,
      edgebi: true
    },
    {
      feature: 'Live embedded Excel',
      description:
        'Import and Export to Excel and direct importing via ODBC drivers. Integrates easily with most ERP and custom systems.',
      jsl: false,
      rmdb: false,
      edgebi: true
    },
    {
      feature: 'Advanced Drag and Drop',
      description:
        'Alternate Routings, Multiple Constraints, Multiple Priorities, Rescheduling on demand, much more.',
      jsl: false,
      rmdb: false,
      edgebi: true
    }
  ];

  const testimonials = [
    {
      quote: 'Best choice for MRP and project management software',
      company: 'Sleepmaster Ltd',
      link: '/sleepmaster-ltd'
    },
    {
      quote: 'Manufacturing scheduling software with fantastic support',
      company: 'Cook Compression',
      link: '/cook-compression'
    },
    {
      quote: 'Easy ERP add-on for manufacturing resource planning',
      company: 'Incon Incorporated',
      link: '/incon-incorporate'
    }
  ];

  return (
    <div className="min-h-screen bg-white py-6">
      {/* Hero Section */}
      <GridSection hideVerticalGridLines>
        <div className="container max-w-7xl">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 text-center">
              <SiteHeading
                title="Production Planning and Scheduling Solutions"
                description="Contact US to discuss which product is the best fit for your application and budget. From a simple Excel based job shop scheduling application to Advanced Planning and Scheduling software (APS) that works either standalone or integrates with your ERP, we look forward to resolving your manufacturing scheduling challenges."
              />
            </div>
          </div>
        </div>
      </GridSection>

      {/* Product Comparison Matrix */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Choose the Right Solution for Your Business
            </h2>
            <p className="mb-4 text-lg text-slate-600">
              Compare features across our product range to find the perfect fit
            </p>
          </div>

          {/* Expand/Collapse Controls */}
          <div className="mb-4 flex justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const details = document.querySelectorAll(
                  'details[data-feature]'
                );
                details.forEach((detail) =>
                  detail.setAttribute('open', 'true')
                );
              }}
              className="text-blue-600 hover:bg-blue-50"
            >
              Expand All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const details = document.querySelectorAll(
                  'details[data-feature]'
                );
                details.forEach((detail) => detail.removeAttribute('open'));
              }}
              className="text-blue-600 hover:bg-blue-50"
            >
              Close All
            </Button>
          </div>

          {/* Desktop Comparison Table with Expandable Features */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] rounded-lg border border-slate-200 bg-white">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 text-left font-semibold text-slate-900">
                    Features
                  </th>
                  <th className="p-4 text-center font-semibold text-blue-600">
                    EDGEBIC
                  </th>
                  <th className="p-4 text-center font-semibold text-orange-600">
                    Resource Manager DB
                  </th>
                  <th className="p-4 text-center font-semibold text-purple-600">
                    EDGEBI Suite
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, i) => (
                  <React.Fragment key={i}>
                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="p-4">
                        <details
                          data-feature={`feature-${i}`}
                          className="group"
                        >
                          <summary className="flex cursor-pointer items-center gap-2 font-medium text-slate-900 hover:text-blue-600">
                            <span className="text-sm transition-transform group-open:rotate-90">
                              ▶
                            </span>
                            {row.feature}
                          </summary>
                          <div className="mt-2 pl-6 text-sm text-slate-600">
                            {row.description}
                          </div>
                        </details>
                      </td>
                      <td className="p-4 text-center">
                        {row.jsl === true ? (
                          <CheckCircle className="mx-auto size-5 text-green-500" />
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.rmdb === true ? (
                          <CheckCircle className="mx-auto size-5 text-green-500" />
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.edgebi === true ? (
                          <CheckCircle className="mx-auto size-5 text-green-500" />
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <p className="mb-4 text-slate-600">
              Not sure which solution is right for you?
            </p>
            <Button
              size="lg"
              className="gap-2"
            >
              <Link href="/contact-us">Schedule a Live Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl-slate-900 py-1">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Trusted by manufacturers worldwide
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-6 shadow-lg"
              >
                <Quote className="mb-4 size-8 text-slate-400" />
                <blockquote className="mb-4 text-lg font-medium">
                  "{testimonial.quote}"
                </blockquote>
                <footer>
                  <div className="font-semibold">— {testimonial.company}</div>
                  <Button
                    variant="link"
                    className="h-auto p-0"
                  >
                    <Link
                      href={testimonial.link}
                      className="flex items-center gap-1 text-sm"
                    >
                      Read More
                      <ExternalLink className="size-3" />
                    </Link>
                  </Button>
                </footer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <div className="rounded-2xl border bg-slate-50 p-8">
            <h2 className="mb-4 text-3xl font-bold">
              Want to get your production in the groove?
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Watch this classic video and get your operations movin' and
              groovin' today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button>
                <Link
                  href="/product-downloads"
                  className="flex items-center gap-2"
                >
                  Free Trial & Sample
                </Link>
              </Button>
              <Button variant="outline">
                <Link
                  href="/contact-us"
                  className="flex items-center gap-2"
                >
                  Schedule Demo
                </Link>
              </Button>
            </div>
            <div className="mt-6">
              <Link
                href="/excel-applications"
                className="text-sm text-muted-foreground hover:underline"
              >
                Other Excel template solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
