'use client';

import * as React from 'react';
import {
  // FileDownIcon,
  // MailIcon,
  // RefreshCwIcon,
  SearchIcon
} from 'lucide-react';

import { CustomersTable } from '@/components/dashboard/customers-table';
import { PaymentMethodsChart } from '@/components/dashboard/payment-methods-chart';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { StatsGrid } from '@/components/dashboard/stats-grid';
import { YouTubeVideo } from '@/components/dashboard/youtube-video';
// import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PurchaseStats } from '@/data/purchases/get-purchases';

interface DashboardOverviewProps {
  purchaseStats: PurchaseStats;
  youtubeVideoUrl?: string | null;
}

export function DashboardOverview({
  purchaseStats,
  youtubeVideoUrl
}: DashboardOverviewProps): React.JSX.Element {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edgebi Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your Edgebi sales, customers, and performance metrics
        </p>
      </div>

      {/* Quick Actions */}
      {/* <div className="flex flex-wrap gap-4">
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
          <MailIcon className="mr-2 size-4" />
          Send Bulk Installer
        </Button>
        <Button variant="outline">
          <FileDownIcon className="mr-2 size-4" />
          Export Report
        </Button>
        <Button variant="outline">
          <RefreshCwIcon className="mr-2 size-4" />
          Refresh Data
        </Button>
      </div> */}

      {/* Stats Grid */}

      <StatsGrid purchaseStats={purchaseStats} />

      {/* Charts Section */}
      <div className="!mt-0">
        {/* <div className="!mt-3 grid gap-4 lg:grid-cols-3"> */}
        <div className="!mt-3 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="lg:col-span-1">
            <YouTubeVideo
              videoUrl={youtubeVideoUrl}
              title="Featured Video"
              className="h-full"
            />
          </div>
        </div>
        {/* <div className="lg:col-span-1">
          <PaymentMethodsChart />
        </div> */}
      </div>

      {/* Customers Table */}
      <div className="!mt-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Recent Customers & Payments
          </h2>
          <div className="relative w-80">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <CustomersTable searchTerm={searchTerm} />
      </div>
    </div>
  );
}
