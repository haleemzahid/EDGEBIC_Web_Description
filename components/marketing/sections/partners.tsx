'use client';

import React from 'react';
import Image from 'next/image';
import {
  Award,
  Building,
  Globe,
  HandshakeIcon,
  Mail,
  MapPin,
  Phone,
  Users
} from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface Partner {
  name: string;
  region: string;
  description: string;
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  logo?: string;
  website?: string;
}

export function PartnersSection(): React.JSX.Element {
  const partners: Partner[] = [
    {
      name: 'Stabilios Sistem OS',
      region: 'Europe (Eastern)',
      description:
        'Europe (UK): Lodge Consultancy, Contact: Bob Russell br@usersolutions.mystagingwebsite.com Asia: Intelligent Information, Contact: Jeff Nagle, jn@usersolutions.mystagingwebsite.com',
      logo: 'https://www.usersolutions.com/wp-content/uploads/2023/02/sistemosstabilios-596684c7ec506.png'
    },
    {
      name: 'Europe (Poland): Mashik',
      region: 'Europe (UK)',
      description:
        'Contact: Dariusz Siwek ul. W. Bartniaka 25C, 05-825 Grodzisk Mazowiecki Warsaw M: +48 502 416 387 dariusz.siwek@siweklogistics.com Europe (Eastern): UAB Stabilios sistemos, Contact: Aldevinas Katkus',
      logo: 'https://www.usersolutions.com/wp-content/uploads/2023/02/MashikLogo-59668408d9aaf.png'
    },
    {
      name: 'Mideast (Israel): Mashik',
      region: 'Asia',
      description:
        'Mashik aims to improve supply chain organizations and acquisitions through technologies And innovative and groundbreaking methodologies. Mashik operates through four divisions: the Supply Chain Division,',
      logo: 'https://www.usersolutions.com/wp-content/uploads/2023/02/MashikLogo-59668408d9aaf.png'
    },
    {
      name: 'Resource Manager Virtual Solutions Group',
      region: 'Europe (Poland)',
      description:
        'Many of our Business Partners were in the same situation you are in today. Responsible for managing a strategic area for planning, scheduling , tracking',
      logo: 'https://www.usersolutions.com/wp-content/uploads/2023/02/Exact.png'
    },
    {
      name: 'Exact Software',
      region: 'Mideast (Israel)',
      description:
        'User Solutions, Inc., an authorized Exact Solution Partner since 2001, has announced Resource Manager-DB with Exact / MacolaTM Link. For the first time, Macola Customers',
      logo: 'https://www.usersolutions.com/wp-content/uploads/2023/02/Sage.png'
    },
    {
      name: 'Sage Software',
      region: 'Global',
      description:
        'Enhancements for the Manufacturing Market Are your manufacturing clients looking for additional planning, scheduling, and tracking solutions? Would you like to have a more competitive',
      logo: 'https://www.usersolutions.com/wp-content/uploads/2023/02/NistMepLogo-300x109.jpg'
    },
    {
      name: 'NIST MEP Consortium',
      region: 'Global',
      description:
        'Since 1988, the Hollings Manufacturing Extension Partnership (MEP) has worked to strengthen U.S. manufacturing. Their mission is to enhance the productivity and technological performance of',
      logo: 'https://www.usersolutions.com/wp-content/uploads/2023/02/Microsoft.png'
    }
  ];

  const partnerStats = [
    {
      icon: <HandshakeIcon className="size-8" />,
      number: '10+',
      label: 'Global Partners',
      description: 'Strategic partnerships worldwide'
    },
    {
      icon: <Globe className="size-8" />,
      number: '15+',
      label: 'Countries',
      description: 'Partner presence across continents'
    },
    {
      icon: <Award className="size-8" />,
      number: '25+',
      label: 'Years Experience',
      description: 'Combined partner expertise'
    }
  ];

  const partnershipBenefits = [
    {
      icon: <Building className="size-6" />,
      title: 'Local Expertise',
      description:
        'Partners provide local market knowledge and cultural understanding for better customer service.'
    },
    {
      icon: <Users className="size-6" />,
      title: 'Extended Support',
      description:
        'Comprehensive support network ensuring customers receive help in their local language and time zone.'
    },
    {
      icon: <Globe className="size-6" />,
      title: 'Global Reach',
      description:
        'Worldwide presence enabling User Solutions to serve manufacturers across all major markets.'
    }
  ];

  return (
    <GridSection hideVerticalGridLines>
      <div className="container pt-6">
        <SiteHeading
          title="Manufacturing Software Partners"
          description="Our global network of certified partners helping manufacturers worldwide implement advanced planning, scheduling, and tracking solutions"
        />

        {/* Partnership Stats */}
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          {partnerStats.map((stat, index) => (
            <div
              key={index}
              className="rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-center"
            >
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-white text-primary shadow-lg">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-primary">
                {stat.number}
              </div>
              <div className="mt-2 font-semibold">{stat.label}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <div className="mx-auto mt-16 max-w-4xl">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Why Partner With Us?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {partnershipBenefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-2"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        <div className="mx-auto mt-16 max-w-7xl">
          <h2 className="mb-6 text-center text-2xl font-bold">Our Partners</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner, index) => (
              <Card
                key={index}
                className="h-full transition-shadow hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  {partner.logo && (
                    <div className="mb-4 flex items-center justify-center">
                      <div className="relative h-20 w-40">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          fill
                          className="object-contain"
                          onError={(e) => {
                            // Hide image on error and show placeholder
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <CardDescription>{partner.description}</CardDescription>
                  {partner.contact && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">
                        Contact Information
                      </h4>
                      {partner.contact.name && (
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="size-4 text-muted-foreground" />
                          <span>{partner.contact.name}</span>
                        </div>
                      )}
                      {partner.contact.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="size-4 text-muted-foreground" />
                          <a
                            href={`mailto:${partner.contact.email}`}
                            className="text-primary hover:underline"
                          >
                            {partner.contact.email}
                          </a>
                        </div>
                      )}
                      {partner.contact.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="size-4 text-muted-foreground" />
                          <a
                            href={`tel:${partner.contact.phone}`}
                            className="text-primary hover:underline"
                          >
                            {partner.contact.phone}
                          </a>
                        </div>
                      )}
                      {partner.contact.address && (
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="mt-0.5 size-4 text-muted-foreground" />
                          <span>{partner.contact.address}</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold">Become a Partner</h2>
          <p className="mb-6 text-muted-foreground">
            Interested in partnering with User Solutions? We're always looking
            for qualified partners to help expand our reach and better serve
            manufacturers worldwide.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
            >
              <a href="mailto:us@usersolutions.com">
                <Mail className="mr-2 size-4" />
                Contact Partnership Team
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
            >
              <a href="tel:248.486.6365">
                <Phone className="mr-2 size-4" />
                248.486.6365
              </a>
            </Button>
          </div>
        </div>

        {/* Awards Section - Moved to end */}
        <div className="mx-auto mt-16 max-w-7xl">
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
                unoptimized
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </GridSection>
  );
}
