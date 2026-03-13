import type { Metadata } from 'next';

import { AnalyticsOverview } from '@/components/dashboard/analytics-overview';
import {
  getAnalyticsOverview,
  getDeviceBreakdown,
  getTopPages,
  getTrafficOverTime,
  getTrafficSources
} from '@/data/analytics/get-analytics';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Website Analytics - Dashboard')
};

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage(): Promise<React.JSX.Element> {
  const [overview, trafficData, topPages, trafficSources, deviceBreakdown] =
    await Promise.all([
      getAnalyticsOverview(),
      getTrafficOverTime(),
      getTopPages(),
      getTrafficSources(),
      getDeviceBreakdown()
    ]);

  return (
    <AnalyticsOverview
      overview={overview}
      trafficData={trafficData}
      topPages={topPages}
      trafficSources={trafficSources}
      deviceBreakdown={deviceBreakdown}
    />
  );
}
