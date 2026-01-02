'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// import { toast } from 'sonner';

import { ExternalLink } from '@/components/marketing/fragments/external-link';
import {
  FOOTER_LINKS,
  SOCIAL_LINKS
} from '@/components/marketing/marketing-links';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { AppInfo } from '@/constants/app-info';

const awards = [
  {
    name: 'Capterra',
    link: 'https://www.capterra.com/p/9402/Resource-Manager-DB/',
    image: '/images/shortlist-capterra.png',
    alt: 'Capterra Reviews'
  },
  {
    name: 'G2 Best Meets Requirements',
    link: 'https://www.g2.com/products/resource-manager-db-rmdb/competitors/alternatives',
    image: '/images/g2-best-meets-requirements.png',
    alt: 'G2 Best Meets Requirements'
  },
  {
    name: 'Top Performer Software',
    link: 'https://www.capterra.com/p/9402/Resource-Manager-DB/',
    image: '/images/top-performer-software-1.png',
    alt: 'Top Performer Software'
  },
  {
    name: 'ERP Leader',
    link: 'https://www.capterra.com/p/9402/Resource-Manager-DB/',
    image: '/images/erp-leader.png',
    alt: 'ERP Leader'
  },
  {
    name: 'G2',
    link: 'https://www.g2.com/products/resource-manager-db-rmdb/competitors/alternatives',
    image:
      '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 557 572" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M497,168.7l-85.4,0c2.3,-13.4 10.6,-20.9 27.4,-29.4l15.7,-8c28.1,-14.4 43.1,-30.7 43.1,-57.3c0,-16.7 -6.5,-29.9 -19.4,-39.4c-12.9,-9.5 -28.1,-14.2 -45.9,-14.2c-13.769,-0.162 -27.29,3.696 -38.9,11.1c-11.7,7.2 -20.4,16.5 -25.8,28.1l24.7,24.8c9.6,-19.4 23.5,-28.9 41.8,-28.9c15.5,0 25,8 25,19.1c-0,9.3 -4.6,17 -22.4,26l-10.1,4.9c-21.9,11.1 -37.1,23.8 -45.9,38.2c-8.8,14.4 -13.1,32.5 -13.1,54.4l-0,6l129.2,0l-0,-35.4Z" style="fill:#ff492c;fill-rule:nonzero;"/><path d="M485.6,244.9l-141.4,0l-70.7,122.4l141.4,0l70.7,122.5l70.7,-122.5l-70.7,-122.4Z" style="fill:#ff492c;fill-rule:nonzero;"/><path d="M285.7,449c-90,0 -163.3,-73.3 -163.3,-163.3c0,-90 73.3,-163.3 163.3,-163.3l55.9,-116.9c-18.408,-3.661 -37.131,-5.503 -55.9,-5.5c-157.8,0 -285.7,127.9 -285.7,285.7c0,157.8 127.9,285.7 285.7,285.7c60.462,0.113 119.408,-19.092 168.2,-54.8l-61.8,-107.2c-29.558,25.533 -67.341,39.595 -106.4,39.6Z" style="fill:#ff492c;fill-rule:nonzero;"/></svg>',
    alt: 'G2'
  },
  {
    name: 'Capterra',
    link: 'https://www.capterra.com/p/9402/Resource-Manager-DB/',
    image:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 344.983"><path d="m8.905 127.38 135.181.027 82.199.014v-81.434z" fill="#ff9d28"/><path d="m226.285 45.987v287.503l102.665-325.956z" fill="#68c5ed"/><path d="m226.285 127.421-82.199-.014 82.199 206.083z" fill="#044d80"/><path d="m8.905 127.38 156.26 52.905-21.079-52.878z" fill="#e54747"/></svg>',
    alt: 'Capterra'
  },
  {
    name: 'Software Advice',
    link: 'https://sourceforge.net/software/product/Resource-Manager-DB/#',
    image:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50"><text x="10" y="35" font-family="Arial" font-size="24" font-weight="bold" fill="#2c294b">Software Advice</text><circle cx="180" cy="20" r="10" fill="#fd810b"/></svg>',
    alt: 'Software Advice'
  }
];

export function Footer(): React.JSX.Element {
  return (
    <footer className="mt-6 bg-background">
      {/* Awards Section */}
      <div className="w-full px-6 pt-6">
        <h2 className="mb-6 text-center text-2xl font-bold text-black md:text-3xl">
          CELEBRATING 35 YEARS OF Award-winning Manufacturing Software
        </h2>
        <div className="relative overflow-hidden pb-4">
          <style jsx>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="flex animate-marquee gap-6 lg:gap-10">
            {[...awards, ...awards].map((award, index) => (
              <a
                key={index}
                href={award.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center justify-center transition-transform hover:scale-105"
              >
                {award.image.startsWith('<svg') ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: award.image }}
                    className="h-12 w-auto max-w-[150px] lg:h-16"
                  />
                ) : (
                  <Image
                    src={award.image}
                    alt={award.alt}
                    width={150}
                    height={64}
                    className="h-12 w-auto max-w-[150px] object-contain lg:h-16"
                    loading="lazy"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-6">
          {/* Single Row: Success Stories, Products, Company, Follow Us */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Footer Links - Success Stories, Products, Company */}
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-sm font-semibold text-foreground">
                  {group.title}
                </h3>
                <ul
                  role="list"
                  className="space-y-3"
                >
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        title={link.name}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.name}
                        {link.external && <ExternalLink className="opacity-60" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Follow Us Section */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    title={link.name}
                    href={link.href}
                    className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{link.name}</span>
                    {link.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section: Copyright and Language Selector */}
          <div className="mt-12 border-t pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                    />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  eng
                </span>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} {AppInfo.APP_NAME}. All rights
                reserved.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  LinkedIn
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Facebook
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  X
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  YouTube
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
