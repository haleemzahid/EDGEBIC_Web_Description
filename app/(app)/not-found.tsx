import * as React from 'react';
import type { Metadata } from 'next';

import { AppInfo } from '@/constants/app-info';

import { NotFoundContent } from './not-found-content';

export const metadata: Metadata = {
  title: `404 - Page Not Found | ${AppInfo.APP_NAME}`,
  description:
    'The page you are looking for does not exist. Navigate back to the homepage or explore our popular pages.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: `404 - Page Not Found | ${AppInfo.APP_NAME}`,
    description:
      'The page you are looking for does not exist. Navigate back to the homepage or explore our popular pages.',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: `404 - Page Not Found | ${AppInfo.APP_NAME}`,
    description:
      'The page you are looking for does not exist. Navigate back to the homepage or explore our popular pages.'
  }
};

export default function NotFound(): React.JSX.Element {
  return <NotFoundContent />;
}
