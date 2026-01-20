import * as React from 'react';
import type { Metadata } from 'next';

import { PrivacyPolicy } from '@/components/marketing/sections/privacy-policy';

export const metadata: Metadata = {
  title: 'Privacy Policy'
};

export default function PrivacyPolicyPage(): React.JSX.Element {
  return <PrivacyPolicy />;
}
