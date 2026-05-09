'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, CheckCircle, ExternalLink, Star, X } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { Button } from '@/components/ui/button';

export default function CompareProductsPage(): React.JSX.Element {
  const features = [
    'Shop Scheduling',
    'Forward Scheduling',
    'Reverse Scheduling',
    'Finite Capacity',
    'MRP/BOM',
    'Multi-user',
    'Security',
    'SQL Database',
    'Advanced Drag & Drop',
    'Heat Map Reports',
    'Schedule Key Dates',
    'Live Embedded Excel',
    'Business Intelligence',
    'Advanced Analytics',
    'ERP Integration'
  ];

  const products = [
    {
      name: 'EDGEBI  ',
      tier: 'Starter',
      price: '$1,000+',
      description: 'Perfect for Job Shops & Small Manufacturers',
      image: '/images/Edgebic/2022-10/starter.png',
      link: '/jsl-job-scheduler-lite',
      features: {
        'Shop Scheduling': false,
        'Forward Scheduling': false,
        'Reverse Scheduling': false,
        'Finite Capacity': false,
        'MRP/BOM': false,
        'Multi-user': false,
        Security: false,
        'SQL Database': false,
        'Advanced Drag & Drop': false,
        'Heat Map Reports': false,
        'Schedule Key Dates': false,
        'Live Embedded Excel': false,
        'Business Intelligence': false,
        'Advanced Analytics': false,
        'ERP Integration': false
      }
    },
    {
      name: 'Resource Manager DB',
      tier: 'Advanced',
      price: '$5,000+',
      description: 'Ideal for Growing SMBs & Mid-Size Companies',
      image: '/images/Edgebic/2022-11/advanced-1.png',
      link: '/resource-manager-db-2',
      features: {
        'Shop Scheduling': true,
        'Forward Scheduling': true,
        'Reverse Scheduling': true,
        'Finite Capacity': true,
        'MRP/BOM': true,
        'Multi-user': true,
        Security: true,
        'SQL Database': true,
        'Advanced Drag & Drop': false,
        'Heat Map Reports': false,
        'Schedule Key Dates': false,
        'Live Embedded Excel': false,
        'Business Intelligence': false,
        'Advanced Analytics': false,
        'ERP Integration': true
      }
    },
    {
      name: 'EDGEBI (Bundled w/ RMDB)',
      tier: 'Premium',
      price: '$25,000+',
      description: 'Enterprise-Grade for Multi-Nationals',
      image: '/images/Edgebic/2022-11/Premium-1.png',
      link: '/edgebi',
      features: {
        'Shop Scheduling': true,
        'Forward Scheduling': true,
        'Reverse Scheduling': true,
        'Finite Capacity': true,
        'MRP/BOM': true,
        'Multi-user': true,
        Security: true,
        'SQL Database': true,
        'Advanced Drag & Drop': true,
        'Heat Map Reports': true,
        'Schedule Key Dates': true,
        'Live Embedded Excel': true,
        'Business Intelligence': true,
        'Advanced Analytics': true,
        'ERP Integration': true
      }
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
      link: '/incon-incorporated'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <GridSection hideVerticalGridLines>
        <div className="container pt-6">
          <div className="mx-auto max-w-7xl">
            {/* Hero Header */}
            <div className="mb-6 text-center">
              <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl">
                Production Planning and Scheduling Solutions
              </h1>
              <p className="mb-6 text-xl text-muted-foreground">
                Contact <strong><em>us</em></strong> to discuss which product is the best fit for your
                application and budget
              </p>
              <p className="text-lg text-muted-foreground">
                From a simple Excel based job shop scheduling application to
                Advanced Planning and Scheduling software (APS) that works
                either standalone or integrates with your ERP, we look forward
                to resolving your manufacturing scheduling challenges.
              </p>
            </div>
          </div>
        </div>
      </GridSection>

      {/* Product Comparison Table */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Choose the Best Solution for Your Needs
            </h2>
            <p className="text-xl text-muted-foreground">
              Compare features across our three product tiers
            </p>
          </div>

          {/* Responsive Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg border border-slate-200 bg-white">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="border-r border-slate-200 p-6 text-left">
                    <span className="text-lg font-semibold">Features</span>
                  </th>
                  {products.map((product, index) => (
                    <th
                      key={index}
                      className="border-r border-slate-200 p-6 text-center last:border-r-0"
                    >
                      <div className="space-y-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={120}
                          height={60}
                          className="mx-auto rounded"
                        />
                        <div>
                          <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            {product.tier}
                          </div>
                          <h3 className="mb-2 text-lg font-bold">
                            {product.name}
                          </h3>
                          <p className="mb-3 text-sm text-muted-foreground">
                            {product.description}
                          </p>
                          <div className="mb-4 text-2xl font-bold">
                            {product.price}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link href={product.link}>
                              Details
                              <ExternalLink className="ml-2 size-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, featureIndex) => (
                  <tr
                    key={featureIndex}
                    className="border-b border-slate-200 last:border-b-0"
                  >
                    <td className="border-r border-slate-200 p-4 font-medium">
                      {feature}
                    </td>
                    {products.map((product, productIndex) => (
                      <td
                        key={productIndex}
                        className="border-r border-slate-200 p-4 text-center last:border-r-0"
                      >
                        {product.features[
                          feature as keyof typeof product.features
                        ] ? (
                          <CheckCircle className="mx-auto size-5 text-green-600" />
                        ) : (
                          <X className="mx-auto size-5 text-slate-400" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Free vs Paid Section */}
      <section className="border-t bg-white py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Free vs Paid Production Scheduling Software: What&apos;s the Difference?
          </h2>
          <p className="mb-6 text-gray-600">
            Not sure whether to upgrade from spreadsheets? Here&apos;s what changes when you move to dedicated scheduling software.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-cyan-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Feature</th>
                  <th className="px-4 py-3 text-center font-semibold">Free / Spreadsheet</th>
                  <th className="px-4 py-3 text-center font-semibold">RMDB (Paid)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Finite capacity scheduling', 'Manual only', 'Automated'],
                  ['Real-time rescheduling', 'Rebuild from scratch', 'Drag-and-drop'],
                  ['Workcenter loading visibility', 'None', 'Visual Gantt + heat map'],
                  ['ERP integration', 'Copy-paste', 'Direct data link'],
                  ['Setup time optimization', 'Manual grouping', 'Automatic sequencing'],
                  ['Multi-user access', 'File conflicts', 'Concurrent users'],
                ].map(([feature, free, paid], i) => (
                  <tr key={feature} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-medium text-slate-900">{feature}</td>
                    <td className="px-4 py-3 text-center text-slate-500">{free}</td>
                    <td className="px-4 py-3 text-center font-medium text-emerald-700">{paid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            <strong>RMX Free Trial:</strong> Download RMX — our Excel-based scheduling tool — free. It handles basic production scheduling for shops with fewer than 20 active jobs. For larger operations, RMDB adds finite capacity, multi-workcenter scheduling, and ERP integration.
          </p>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="bg-slate-50 py-6">
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
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="mb-4 text-lg font-medium">
                  "{testimonial.quote}"
                </blockquote>
                <footer className="flex items-center justify-between">
                  <cite className="font-semibold not-italic">
                    — {testimonial.company}
                  </cite>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <Link href={testimonial.link}>
                      Read More
                      <ExternalLink className="ml-2 size-4" />
                    </Link>
                  </Button>
                </footer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare RMDB to other vendors */}
      <section className="py-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              Compare RMDB to other manufacturing software
            </h2>
            <p className="text-lg text-muted-foreground">
              Honest, side-by-side comparisons against the tools buyers most often
              evaluate alongside RMDB.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              // 9 long-form blog comparisons (part of the competitor-comparisons cluster
              // with pillar /blog/production-scheduling-software-comparison) — these are
              // 2,000+ word posts with FAQ schema, hero images, and full sidebar treatment.
              {
                href: '/blog/rmdb-vs-mrpeasy',
                title: 'RMDB vs MRPeasy',
                description:
                  'Cloud MRP for very small shops vs. finite-capacity APS for real production floors.'
              },
              {
                href: '/blog/rmdb-vs-katana',
                title: 'RMDB vs Katana',
                description:
                  'Ecommerce-led product brands vs. multi-step manufacturing with bottlenecks.'
              },
              {
                href: '/blog/rmdb-vs-planettogether',
                title: 'RMDB vs PlanetTogether',
                description:
                  'Enterprise APS with long deployments vs. one-week implementation and one-time licensing.'
              },
              {
                href: '/blog/rmdb-vs-jobboss',
                title: 'RMDB vs JobBOSS',
                description:
                  'Job-shop ERP with light scheduling vs. dedicated finite-capacity APS.'
              },
              {
                href: '/blog/rmdb-vs-asprova',
                title: 'RMDB vs Asprova',
                description:
                  'High-end Japanese APS vs. mid-market manufacturer-friendly scheduling.'
              },
              {
                href: '/blog/rmdb-vs-siemens-opcenter',
                title: 'RMDB vs Siemens Opcenter',
                description:
                  'Enterprise MES/APS suite vs. focused finite-capacity scheduling.'
              },
              {
                href: '/blog/rmdb-vs-delmia-ortems',
                title: 'RMDB vs DELMIA Ortems',
                description:
                  'Dassault enterprise APS vs. SMB-friendly scheduling and ERP integration.'
              },
              {
                href: '/blog/rmdb-vs-epicor-aps',
                title: 'RMDB vs Epicor APS',
                description:
                  'Epicor scheduling add-on vs. ERP-agnostic scheduling that works with any backend.'
              },
              {
                href: '/blog/rmdb-vs-infor-aps',
                title: 'RMDB vs Infor APS',
                description:
                  'Infor enterprise scheduling vs. focused finite-capacity APS for SMB manufacturers.'
              },
              // Marketing-page comparisons — competitors without blog posts use the
              // shared comparison-page.tsx component for full schema + UX treatment.
              {
                href: '/compare-products/rmdb-vs-fishbowl',
                title: 'RMDB vs Fishbowl',
                description:
                  'Inventory-first software with QuickBooks vs. dedicated production scheduling.'
              },
              {
                href: '/compare-products/rmdb-vs-preactor',
                title: 'RMDB vs Preactor',
                description:
                  'Enterprise APS inside Siemens Opcenter vs. focused mid-market scheduling.'
              },
              {
                href: '/compare-products/rmdb-vs-proshop',
                title: 'RMDB vs ProShop ERP',
                description:
                  'Paperless ERP for AS9100 shops vs. dedicated finite-capacity scheduler.'
              },
              {
                href: '/compare-products/rmdb-vs-netsuite',
                title: 'RMDB vs NetSuite Manufacturing',
                description:
                  'Enterprise cloud ERP suite vs. focused finite-capacity scheduling layer.'
              },
              {
                href: '/compare-products/rmdb-vs-odoo',
                title: 'RMDB vs Odoo Manufacturing',
                description:
                  'Open-source modular ERP vs. dedicated finite-capacity scheduling.'
              },
              {
                href: '/compare-products/rmdb-vs-quickbooks',
                title: 'RMDB vs QuickBooks for Manufacturing',
                description:
                  'Accounting-first software vs. dedicated production scheduling — most shops keep both.'
              }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-cyan-300 hover:shadow-md"
              >
                <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-cyan-700">
                  {item.title}
                </h3>
                <p className="mb-4 flex-1 text-sm text-slate-600">
                  {item.description}
                </p>
                <span className="inline-flex items-center text-sm font-semibold text-cyan-700">
                  Read the comparison
                  <ExternalLink className="ml-1.5 size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <div className="rounded-2xl border bg-slate-50 p-8">
            <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Schedule a Live Demo Today! Choose the product that best suits
              your company's needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                asChild
              >
                <Link href="/contact-us">Schedule Demo</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <Link href="/product-downloads">Free Trial & Sample</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
