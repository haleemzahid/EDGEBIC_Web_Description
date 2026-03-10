'use client';

import * as React from 'react';
import { RefreshCwIcon, SearchIcon } from 'lucide-react';

import { ActivationTrendChart } from '@/components/dashboard/activation-trend-chart';
import { InventoryStatsGrid } from '@/components/dashboard/inventory-stats-grid';
import { LicenseInventoryTable } from '@/components/dashboard/license-inventory-table';
import { LicenseStatusChart } from '@/components/dashboard/license-status-chart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Page,
  PageActions,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import type {
  InventoryStats,
  LicenseInventoryItem
} from '@/data/inventory/get-inventory';

interface InventoryOverviewProps {
  inventoryStats: InventoryStats;
  allLicenses: LicenseInventoryItem[];
  activationTrendData: {
    months: string[];
    activations: number[];
  };
  licenseStatusData: {
    name: string;
    value: number;
    percentage: number;
  }[];
}

export function InventoryOverview({
  inventoryStats,
  allLicenses,
  activationTrendData,
  licenseStatusData
}: InventoryOverviewProps): React.JSX.Element {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');

  // Filter licenses based on search and status
  const filteredLicenses = React.useMemo(() => {
    return allLicenses.filter((license) => {
      const matchesSearch =
        license.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.licenseKey?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || license.licenseStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [allLicenses, searchTerm, statusFilter]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Real-Time Inventory Overview</PageTitle>
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
          {/* Header */}
          <div>
            <p className="text-muted-foreground">
              Monitor software licenses, activations, and product distribution in
              real-time
            </p>
          </div>

      {/* Stats Grid */}
      <InventoryStatsGrid inventoryStats={inventoryStats} />

      {/* Charts Section */}
      <div className="!mt-3 grid gap-4 lg:grid-cols-2">
        <ActivationTrendChart data={activationTrendData} />
        <LicenseStatusChart data={licenseStatusData} />
      </div>

      {/* License Inventory Table */}
      <div className="!mt-3 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            License Management
          </h2>
          <div className="flex gap-2">
            <div className="relative w-full sm:w-80">
              <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search licenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <LicenseInventoryTable licenses={filteredLicenses} />
      </div>
        </div>
      </PageBody>
    </Page>
  );
}
