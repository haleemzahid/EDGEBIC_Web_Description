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
import type { TrafficSource } from '@/data/analytics/get-analytics';

interface TrafficSourcesChartProps {
  data: TrafficSource[];
}

const COLORS = [
  '#3b82f6',
  '#10b981',
  '#f97316',
  '#8b5cf6',
  '#ef4444',
  '#06b6d4',
  '#ec4899',
  '#eab308'
];

export function TrafficSourcesChart({
  data
}: TrafficSourcesChartProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>Where your visitors come from</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            {data.slice(0, 6).map((entry, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <div
                  className="size-4 rounded"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length]
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{entry.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {entry.value.toLocaleString()} ({entry.percentage.toFixed(1)}%)
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
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
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
