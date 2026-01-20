import * as React from 'react';
import type { Metadata } from 'next';

import { TermsOfUse } from '@/components/marketing/sections/terms-of-use';

export const metadata: Metadata = {
  title: 'Terms of Use'
};

export default function TermsOfUsePage(): React.JSX.Element {
  return <TermsOfUse />;
}
