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
      name: 'EDGEBIC  ',
      tier: 'Starter',
      price: '$1,000+',
      description: 'Perfect for Job Shops & Small Manufacturers',
      image:
        'https://www.usersolutions.com/wp-content/uploads/2022/10/starter.png',
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
      image:
        'https://www.usersolutions.com/wp-content/uploads/2022/11/advanced-1.png',
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
      name: 'EDGEBIC (Bundled w/ RMDB)',
      tier: 'Premium',
      price: '$25,000+',
      description: 'Enterprise-Grade for Multi-Nationals',
      image:
        'https://www.usersolutions.com/wp-content/uploads/2022/11/Premium-1.png',
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
      link: '/incon-incorporate'
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
                Contact us to discuss which product is the best fit for your
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

      {/* Awards Section */}
      <section className="bg-slate-50 py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h3 className="mb-6 text-2xl font-bold">
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
          </div>
        </div>
      </section>
    </div>
  );
}
