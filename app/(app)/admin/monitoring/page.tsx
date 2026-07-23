import * as React from 'react';
import type { Metadata } from 'next';

import { MonitoringDashboard } from '@/components/admin/monitoring/monitoring-dashboard';

export const metadata: Metadata = {
  title: 'Competitor monitoring'
};

// Admin-only: the parent app/(app)/admin/layout.tsx enforces the role gate.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminMonitoringPage(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4 py-6">
      <MonitoringDashboard />
    </div>
  );
}
