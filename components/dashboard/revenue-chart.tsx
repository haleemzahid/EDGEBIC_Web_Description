'use client';

import * as React from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export function RevenueChart(): React.JSX.Element {
  const [data, setData] = React.useState<{ month: string; revenue: number }[]>(
    []
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchRevenueData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/purchases/revenue-chart');
        if (!response.ok) {
          throw new Error('Failed to fetch revenue data');
        }

        const result = await response.json();
        const chartData = result.months.map((month: string, index: number) => ({
          month,
          revenue: result.revenues[index]
        }));
        setData(chartData);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        setError(
          'Failed to load revenue data. Please check your database connection.'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchRevenueData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Over Time</CardTitle>
        <CardDescription>Monthly revenue from Edgebi sales</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[200px] items-center justify-center">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        ) : error ? (
          <div className="flex h-[200px] items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={150}
          >
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value) => [`$${value}`, 'Revenue']}
                labelStyle={{ color: '#374151' }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
