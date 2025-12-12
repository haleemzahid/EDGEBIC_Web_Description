import './globals.css';

import * as React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { AppInfo } from '@/constants/app-info';
import { getBaseUrl } from '@/lib/urls/get-base-url';

import { Providers } from './providers';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: 'white'
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: {
    template: '%s | EDGEBIC',
    default: 'EDGEBIC - Production Planning Software'
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
        alt: 'EDGEBIC - Production Planning Solution'
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
