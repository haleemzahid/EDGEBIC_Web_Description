import * as React from 'react';
import Image from 'next/image';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ServiceModelPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6">
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              ServiceModel
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Service system modeling and optimization for superior customer
              experience
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Request Free Product
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ServiceModel Overview */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Service System Modeling & Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  ServiceModel is a specialized simulation software designed for
                  service organizations to model, analyze, and optimize
                  customer-facing operations. It provides comprehensive tools
                  for understanding service delivery processes, customer
                  journeys, and resource allocation to enhance customer
                  satisfaction while maximizing operational efficiency.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  From call centers to retail outlets, ServiceModel helps
                  organizations design superior customer experiences, optimize
                  service capacity, and reduce operational costs through
                  data-driven insights and advanced modeling capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Case Study: Multi-Channel Contact Center
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    The Challenge
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    TelecomGlobal's contact center was struggling with
                    inconsistent service levels across phone, chat, and email
                    channels. Long wait times, agent burnout, and varying
                    customer satisfaction scores indicated the need for
                    comprehensive optimization of their multi-channel service
                    delivery model.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-green-600">
                    The Solution
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Using ServiceModel, the operations team modeled their entire
                    contact center ecosystem, including agent skills, routing
                    algorithms, and channel-specific workflows. They analyzed
                    customer arrival patterns, service time distributions, and
                    resource allocation to optimize performance across all
                    channels.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-purple-600">
                    Results Achieved
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-green-500" />
                        <span className="text-sm">
                          45% reduction in average wait time
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-blue-500" />
                        <span className="text-sm">
                          35% improvement in first-call resolution
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-purple-500" />
                        <span className="text-sm">
                          50% increase in agent productivity
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-orange-500" />
                        <span className="text-sm">
                          90% customer satisfaction score
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-red-500" />
                        <span className="text-sm">
                          25% reduction in operational costs
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-teal-500" />
                        <span className="text-sm">
                          Optimized cross-channel routing
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Service-Specific Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Customer Journey Mapping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Model complete customer journeys from initial contact to
                    resolution
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Multi-Channel Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Simulate phone, chat, email, and social media service
                    channels
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Agent Scheduling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Optimize agent schedules based on demand patterns and skills
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Service Level Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Monitor and optimize service level agreements and KPIs
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Queue Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Advanced queue modeling with priority handling and routing
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Comprehensive reporting on service metrics and customer
                    satisfaction
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Service Organization Types
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Contact Centers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Inbound and outbound call handling</li>
                    <li>• Multi-skill agent routing</li>
                    <li>• Real-time adherence monitoring</li>
                    <li>• Workforce management optimization</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    Retail Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Store layout and traffic flow</li>
                    <li>• Checkout optimization</li>
                    <li>• Staff scheduling and allocation</li>
                    <li>• Customer service point analysis</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">
                    Financial Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Branch operations modeling</li>
                    <li>• Teller line optimization</li>
                    <li>• Loan processing workflows</li>
                    <li>• Customer advisory services</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">
                    Government Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Citizen service centers</li>
                    <li>• Permit and licensing processes</li>
                    <li>• Social services delivery</li>
                    <li>• Public assistance programs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Service Excellence Benefits
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Customer Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Reduced wait times and queues</li>
                    <li>• Improved service consistency</li>
                    <li>• Enhanced customer satisfaction</li>
                    <li>• Personalized service delivery</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    Operational Efficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Optimized resource allocation</li>
                    <li>• Improved agent productivity</li>
                    <li>• Reduced operational costs</li>
                    <li>• Enhanced capacity utilization</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">
                    Performance Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• SLA compliance monitoring</li>
                    <li>• KPI optimization</li>
                    <li>• Quality assurance improvement</li>
                    <li>• Performance benchmarking</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">
                    Strategic Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Capacity planning and forecasting</li>
                    <li>• Service expansion analysis</li>
                    <li>• Technology investment ROI</li>
                    <li>• Risk assessment and mitigation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
