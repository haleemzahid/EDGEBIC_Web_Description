import * as React from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  MousePointerClickIcon,
  UsersIcon,
  ActivityIcon
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import type { AnalyticsOverview } from '@/data/analytics/get-analytics';

interface AnalyticsStatsGridProps {
  overview: AnalyticsOverview;
}

export function AnalyticsStatsGrid({
  overview
}: AnalyticsStatsGridProps): React.JSX.Element {
  const stats = [
    {
      title: 'Total Users',
      value: overview.totalUsers.toLocaleString(),
      trend: overview.usersTrend,
      icon: <UsersIcon className="size-6 text-white" />,
      iconColor:
        'bg-gradient-to-br w-[40px] rounded-md h-[40px] items-center justify-center flex from-blue-500 to-blue-600'
    },
    {
      title: 'Page Views',
      value: overview.totalPageViews.toLocaleString(),
      trend: overview.pageViewsTrend,
      icon: <EyeIcon className="size-6 text-white" />,
      iconColor:
        'bg-gradient-to-br w-[40px] rounded-md h-[40px] items-center justify-center flex from-green-500 to-green-600'
    },
    {
      title: 'Sessions',
      value: overview.totalSessions.toLocaleString(),
      trend: overview.sessionsTrend,
      icon: <MousePointerClickIcon className="size-6 text-white" />,
      iconColor:
        'bg-gradient-to-br w-[40px] rounded-md h-[40px] items-center justify-center flex from-purple-500 to-purple-600'
    },
    {
      title: 'Bounce Rate',
      value: `${overview.bounceRate.toFixed(1)}%`,
      trend: overview.bounceRateTrend,
      invertTrend: true,
      icon: <ActivityIcon className="size-6 text-white" />,
      iconColor:
        'bg-gradient-to-br w-[40px] rounded-md h-[40px] items-center justify-center flex from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="!mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const isPositive = stat.invertTrend
          ? stat.trend < 0
          : stat.trend > 0;
        return (
          <Card key={index}>
            <CardHeader className="py-2">{stat.title}</CardHeader>
            <CardContent className="py-2">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{stat.value}</h1>
                <p className={stat.iconColor}>{stat.icon}</p>
              </div>
            </CardContent>
            <CardFooter className="pb-3">
              <p
                className="flex items-center gap-1 text-sm"
                style={{ color: isPositive ? '#68a34a' : '#ef4444' }}
              >
                {isPositive ? (
                  <ArrowUpIcon className="size-3" />
                ) : (
                  <ArrowDownIcon className="size-3" />
                )}
                {Math.abs(stat.trend).toFixed(1)}% vs last 30 days
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
