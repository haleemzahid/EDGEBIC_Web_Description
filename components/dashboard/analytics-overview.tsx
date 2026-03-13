'use client';

import * as React from 'react';
import { RefreshCwIcon } from 'lucide-react';

import { AnalyticsStatsGrid } from '@/components/dashboard/analytics-stats-grid';
import { CountryBreakdownChart } from '@/components/dashboard/country-breakdown-chart';
import { DeviceBreakdownChart } from '@/components/dashboard/device-breakdown-chart';
import { TopPagesTable } from '@/components/dashboard/top-pages-table';
import { TrafficChart } from '@/components/dashboard/traffic-chart';
import { TrafficSourcesChart } from '@/components/dashboard/traffic-sources-chart';
import { Button } from '@/components/ui/button';
import {
  Page,
  PageActions,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import type {
  AnalyticsOverview as AnalyticsOverviewData,
  CountryBreakdown,
  DeviceCategory,
  TopPage,
  TrafficDataPoint,
  TrafficSource
} from '@/data/analytics/get-analytics';

interface AnalyticsOverviewProps {
  overview: AnalyticsOverviewData;
  trafficData: TrafficDataPoint[];
  topPages: TopPage[];
  trafficSources: TrafficSource[];
  deviceBreakdown: DeviceCategory[];
  countryBreakdown: CountryBreakdown[];
}

export function AnalyticsOverview({
  overview,
  trafficData,
  topPages,
  trafficSources,
  deviceBreakdown,
  countryBreakdown
}: AnalyticsOverviewProps): React.JSX.Element {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Website Analytics</PageTitle>
          <PageActions>
            <Button
              onClick={handleRefresh}
              variant="outline"
            >
              <RefreshCwIcon className="mr-2 size-4" />
              Refresh Data
            </Button>
          </PageActions>
        </PagePrimaryBar>
      </PageHeader>

      <PageBody>
        <div className="space-y-8 p-6">
          <div>
            <p className="text-muted-foreground">
              Monitor website traffic, page views, and visitor behavior from
              Google Analytics
            </p>
          </div>

          {/* Stats Grid */}
          <AnalyticsStatsGrid overview={overview} />

          {/* Traffic Over Time */}
          <div className="!mt-3">
            <TrafficChart data={trafficData} />
          </div>

          {/* Charts Row: Sources + Devices */}
          <div className="!mt-3 grid gap-4 lg:grid-cols-2">
            <TrafficSourcesChart data={trafficSources} />
            <DeviceBreakdownChart data={deviceBreakdown} />
          </div>

          {/* Country Breakdown */}
          <div className="!mt-3">
            <CountryBreakdownChart data={countryBreakdown} />
          </div>

          {/* Top Pages Table */}
          <div className="!mt-3">
            <TopPagesTable data={topPages} />
          </div>
        </div>
      </PageBody>
    </Page>
  );
}
