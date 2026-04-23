'use client';

import * as React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import type { DeviceCategory } from '@/data/analytics/get-analytics';

interface DeviceBreakdownChartProps {
  data: DeviceCategory[];
}

const COLORS: Record<string, string> = {
  Desktop: '#3b82f6',
  Mobile: '#10b981',
  Tablet: '#f97316'
};

export function DeviceBreakdownChart({
  data
}: DeviceBreakdownChartProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Breakdown</CardTitle>
        <CardDescription>Sessions by device type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            {data.map((entry, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <div
                  className="size-4 rounded"
                  style={{
                    backgroundColor: COLORS[entry.name] || '#6b7280'
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{entry.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {entry.value.toLocaleString()} ({entry.percentage.toFixed(1)}
                    %)
                  </span>
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer
            width="60%"
            height={250}
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name] || '#6b7280'}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => [
                  `${value.toLocaleString()} sessions`,
                  'Sessions'
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
