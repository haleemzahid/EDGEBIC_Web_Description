import * as React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Production Scheduling Consulting & APS Implementation Services',
  description:
    'Expert production scheduling consultants helping manufacturers implement finite-capacity APS software in 5 days. RMDB implementation, ERP integration, and scheduling process design since 1991.',
  path: '/consulting',
  keywords:
    'production scheduling consultant, production planning consultant USA, APS implementation services, manufacturing scheduling consultant, finite capacity scheduling implementation, RMDB implementation, production scheduling consulting, manufacturing software consultant Michigan'
});

export default function ConsultingPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-200">
              Manufacturing Scheduling Consultants · Michigan, USA · Since 1991
            </p>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Production Scheduling Consulting & APS Implementation
            </h1>
            <p className="mb-8 text-xl text-blue-100">
              We help manufacturers replace spreadsheet chaos with a live finite-capacity schedule — in 5 days, not 5 months. Our consultants have implemented production scheduling at 1,000+ facilities including GE, Cummins, and BAE Systems.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <Link href="/contact-us">Talk to a Scheduling Consultant</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/resource-manager-db-2">See RMDB Software</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Day Framework */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold">
              The 5-Day Implementation Framework
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              Most APS implementations take 6–18 months. Ours take 5 days. Here is exactly how.
            </p>
            <div className="grid gap-6 md:grid-cols-5">
              {[
                {
                  day: 'Day 1',
                  title: 'Data Import',
                  desc: 'Import your work centers, routings, work orders, and shift calendars. We do the heavy lifting — you correct edge cases.'
                },
                {
                  day: 'Day 2',
                  title: 'Routing Build',
                  desc: 'Convert your paper routings or ERP flat BOMs into real multi-step RMDB routings with setup times and alternate resources.'
                },
                {
                  day: 'Day 3',
                  title: 'First Schedule',
                  desc: 'Run your first finite-capacity schedule. See every bottleneck, every overload, every at-risk due date — on screen, not on paper.'
                },
                {
                  day: 'Day 4',
                  title: 'ERP Integration',
                  desc: 'Wire RMDB to your ERP (QuickBooks, Sage, Epicor, JobBOSS, SAP, or any system) for live two-way data sync.'
                },
                {
                  day: 'Day 5',
                  title: 'Go Live',
                  desc: 'Your schedulers run the real production floor from RMDB. We stay on-site for the first live reschedule.'
                }
              ].map((step) => (
                <Card key={step.day} className="text-center">
                  <CardHeader>
                    <p className="text-sm font-semibold text-blue-600">{step.day}</p>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Consulting Services
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'RMDB Implementation',
                  desc: 'Full 5-day deployment of Resource Manager DB — data import, routing build, ERP integration, scheduler training, and go-live support.'
                },
                {
                  title: 'APS Software Selection',
                  desc: 'Independent guidance on choosing between RMDB, PlanetTogether, Epicor APS, or other tools based on your shop complexity and budget.'
                },
                {
                  title: 'Scheduling Process Design',
                  desc: 'Redesign your scheduling workflow from the ground up — priority rules, sequencing logic, shift calendars, and dispatch list design.'
                },
                {
                  title: 'ERP + APS Integration',
                  desc: 'Connect your existing ERP (QuickBooks, Sage, Epicor, SAP, JobBOSS, NetSuite) to a dedicated finite-capacity scheduling layer.'
                },
                {
                  title: 'Excel-to-Software Migration',
                  desc: 'Audit your spreadsheet scheduling setup, identify failure points, and migrate your data and logic into RMDB or RMX without losing history.'
                },
                {
                  title: 'Scheduler Training',
                  desc: 'On-site or remote training for your production schedulers, planners, and operations managers — focused on daily workflows, not software menus.'
                }
              ].map((svc) => (
                <Card key={svc.title}>
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700">{svc.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{svc.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Why Manufacturers Choose User Solutions
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  stat: '35+',
                  label: 'Years of scheduling implementations',
                  detail: 'Founded in 1991, Michigan-based. We have seen every scheduling problem a US manufacturer can have.'
                },
                {
                  stat: '1,000+',
                  label: 'Manufacturers implemented',
                  detail: 'GE, Cummins, BAE Systems, and hundreds of job shops, machine shops, and make-to-order facilities.'
                },
                {
                  stat: '5 days',
                  label: 'Average implementation time',
                  detail: 'Not 5 months, not 18 months. Most RMDB deployments reach a live production schedule by end of week one.'
                },
                {
                  stat: '$5,000',
                  label: 'One-time license — no per-user fees',
                  detail: 'No subscription, no user count penalties, no annual ransoms. You own the software outright.'
                }
              ].map((item) => (
                <Card key={item.stat} className="flex flex-col items-center p-6 text-center">
                  <p className="mb-1 text-5xl font-bold text-blue-600">{item.stat}</p>
                  <p className="mb-3 font-semibold">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-3xl font-bold">
              Industries We Serve
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
              Our consultants have implemented production scheduling in every major manufacturing vertical.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                'Machine Shops & CNC',
                'Metal Fabrication',
                'Job Shop / Make-to-Order',
                'Aerospace & Defense',
                'Medical Device Manufacturing',
                'Food & Beverage',
                'Electronics Manufacturing',
                'Plastic & Rubber',
                'Furniture & Woodworking',
                'Textile & Garment',
                'Packaging',
                'Consumer Goods'
              ].map((ind) => (
                <div key={ind} className="flex items-center gap-2 rounded-md border bg-background px-4 py-3">
                  <div className="size-2 shrink-0 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium">{ind}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'How can implementation really take only 5 days?',
                  a: 'Because we have done it 1,000+ times and know exactly what data you need and in what order. Most of the time in a long implementation is wasted on requirements gathering for features you will never use, data cleanup for fields the scheduler does not need, and committee meetings. We skip all of that and go straight to a live schedule.'
                },
                {
                  q: 'Do you work with our existing ERP?',
                  a: 'Yes. RMDB integrates with QuickBooks, Sage, Microsoft Dynamics, Epicor, JobBOSS, SAP, NetSuite, Global Shop Solutions, E2 ShopTech, and virtually any other ERP via CSV import or direct database connection. You keep your ERP for accounting and inventory — we add the scheduling layer on top.'
                },
                {
                  q: 'What if we are still scheduling in Excel?',
                  a: 'Most of our customers come from Excel. We audit your spreadsheet, understand your scheduling logic, and migrate it into RMDB — including your priority rules, shift calendars, and work center definitions. Most Excel-to-RMDB migrations complete within the 5-day framework.'
                },
                {
                  q: 'Do you offer ongoing support after implementation?',
                  a: 'Yes. Annual support contracts include phone and email support, software updates, and access to our scheduling consultants for questions that come up as your shop evolves. Support is optional — the software works without it — but most customers renew.'
                },
                {
                  q: 'Where are you located? Do you do remote implementations?',
                  a: 'We are headquartered in Michigan. We do on-site implementations across the US and Canada, and remote implementations for customers where travel is impractical. Remote implementations work well when your team is technically comfortable; on-site is better for shops implementing scheduling software for the first time.'
                }
              ].map(({ q, a }) => (
                <div key={q} className="rounded-lg border p-6">
                  <p className="mb-2 font-semibold">{q}</p>
                  <p className="text-sm text-muted-foreground">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Replace Spreadsheet Chaos With a Live Schedule?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-blue-100">
            Talk to one of our production scheduling consultants. We will scope your implementation, answer your ERP integration questions, and tell you honestly whether RMDB is the right fit.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/contact-us">Schedule a Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/resource-manager-db-2">View RMDB Software</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
