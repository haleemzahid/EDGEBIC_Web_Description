import '../app/(app)/globals.css';

import * as React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import { Toaster } from '@/components/ui/sonner';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo';
import { AppInfo } from '@/constants/app-info';
import { getBaseUrl } from '@/lib/urls/get-base-url';

import { Providers } from './(app)/providers';

const preconnectUrls = [
  'https://usersolutions.com',
  'https://www.youtube.com',
  'https://i.ytimg.com',
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com'
];

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: 'white'
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    template: '%s | User Solutions',
    default: 'RMDB - Production Planning & Scheduling Software | User Solutions'
  },
  description: AppInfo.APP_DESCRIPTION,
  keywords:
    'production planning, scheduling, manufacturing, RMDB, Resource Manager DB, EDGEBI, operations, tracking, workflow, automation, planning software, scheduling solution',
  authors: [{ name: AppInfo.COMPANY_NAME }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/logos/edgebic-logo.png'
  },
  manifest: '/manifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || ''
    }
  },
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'RMDB - Production Planning & Scheduling Software | User Solutions',
    description: AppInfo.APP_DESCRIPTION,
    type: 'website',
    siteName: 'User Solutions',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'RMDB by User Solutions - Production Planning & Scheduling Software'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@UserSolutionsUS',
    creator: '@UserSolutionsUS',
    title: 'RMDB - Production Planning & Scheduling Software',
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PVSG7NPJL5"
          strategy="lazyOnload"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PVSG7NPJL5');
            `
          }}
        />
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
