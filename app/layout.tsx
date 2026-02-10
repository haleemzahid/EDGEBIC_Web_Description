import '../app/(app)/globals.css';

import * as React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo';
import { AppInfo } from '@/constants/app-info';
import { getBaseUrl } from '@/lib/urls/get-base-url';

import { Providers } from './(app)/providers';

const preconnectUrls = [
  'https://www.usersolutions.com',
  'https://www.youtube.com',
  'https://i.ytimg.com'
];

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: 'white'
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    template: '%s - User Solutions',
    default: 'Production Planning Software'
  },
  description: AppInfo.APP_DESCRIPTION,
  keywords:
    'production planning, scheduling, manufacturing, operations, tracking, workflow, automation, planning software, scheduling solution',
  authors: [{ name: AppInfo.COMPANY_NAME }],
  icons: {
    icon: '/logos/edgebic-logo.png',
    shortcut: '/logos/edgebic-logo.png',
    apple: '/logos/edgebic-logo.png'
  },
  manifest: `${getBaseUrl()}/manifest`,
  robots: {
    index: true,
    follow: true
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || ''
    }
  },
  openGraph: {
    title: AppInfo.APP_NAME,
    description: AppInfo.APP_DESCRIPTION,
    type: 'website',
    siteName: AppInfo.APP_NAME,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'EDGEBI - Production Planning Solution'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: AppInfo.APP_NAME,
    description: AppInfo.APP_DESCRIPTION,
    images: ['/og.jpg']
  }
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children
}: React.PropsWithChildren): Promise<React.JSX.Element> {
  return (
    <html
      lang="en"
      className="size-full min-h-screen"
      suppressHydrationWarning
    >
      <head>
        {preconnectUrls.map((url) => (
          <React.Fragment key={url}>
            <link
              rel="preconnect"
              href={url}
            />
            <link
              rel="dns-prefetch"
              href={url}
            />
          </React.Fragment>
        ))}
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className={`${inter.className} size-full`}>
        <Providers>
          {children}
          <React.Suspense>
            <Toaster />
          </React.Suspense>
        </Providers>
      </body>
    </html>
  );
}
