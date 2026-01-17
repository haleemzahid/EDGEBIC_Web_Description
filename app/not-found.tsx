import * as React from 'react';
import type { Metadata } from 'next';

import { AppInfo } from '@/constants/app-info';

import { NotFoundContent } from './(app)/not-found-content';

export const metadata: Metadata = {
  title: `404 – Page Not Found | ${AppInfo.APP_NAME}`,
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: true
  }
};

export default function NotFound(): React.JSX.Element {
  return <NotFoundContent />;
}
