import { BetaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = process.env.GA4_PROPERTY_ID;

function getAnalyticsClient(): BetaAnalyticsDataClient {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    '\n'
  );

  if (!clientEmail || !privateKey) {
    throw new Error(
      'Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY'
    );
  }

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey
    }
  });
}

export interface AnalyticsOverview {
  totalUsers: number;
  totalPageViews: number;
  totalSessions: number;
  bounceRate: number;
  usersTrend: number;
  pageViewsTrend: number;
  sessionsTrend: number;
  bounceRateTrend: number;
}

export interface TrafficDataPoint {
  date: string;
  users: number;
  pageViews: number;
}

export interface TopPage {
  path: string;
  pageViews: number;
  users: number;
}

export interface TrafficSource {
  name: string;
  value: number;
  percentage: number;
}

export interface DeviceCategory {
  name: string;
  value: number;
  percentage: number;
}

export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  if (!propertyId) {
    return {
      totalUsers: 0,
      totalPageViews: 0,
      totalSessions: 0,
      bounceRate: 0,
      usersTrend: 0,
      pageViewsTrend: 0,
      sessionsTrend: 0,
      bounceRateTrend: 0
    };
  }

  const client = getAnalyticsClient();

  const [currentResponse] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      { startDate: '30daysAgo', endDate: 'today' },
      { startDate: '60daysAgo', endDate: '31daysAgo' }
    ],
    metrics: [
      { name: 'totalUsers' },
      { name: 'screenPageViews' },
      { name: 'sessions' },
      { name: 'bounceRate' }
    ]
  });

  const current = currentResponse.rows?.[0]?.metricValues ?? [];
  const previous = currentResponse.rows?.[1]?.metricValues ?? [];

  const currentUsers = Number(current[0]?.value ?? 0);
  const currentPageViews = Number(current[1]?.value ?? 0);
  const currentSessions = Number(current[2]?.value ?? 0);
  const currentBounceRate = Number(current[3]?.value ?? 0);

  const previousUsers = Number(previous[0]?.value ?? 0);
  const previousPageViews = Number(previous[1]?.value ?? 0);
  const previousSessions = Number(previous[2]?.value ?? 0);
  const previousBounceRate = Number(previous[3]?.value ?? 0);

  const calcTrend = (curr: number, prev: number): number =>
    prev > 0 ? ((curr - prev) / prev) * 100 : 0;

  return {
    totalUsers: currentUsers,
    totalPageViews: currentPageViews,
    totalSessions: currentSessions,
    bounceRate: currentBounceRate * 100,
    usersTrend: calcTrend(currentUsers, previousUsers),
    pageViewsTrend: calcTrend(currentPageViews, previousPageViews),
    sessionsTrend: calcTrend(currentSessions, previousSessions),
    bounceRateTrend: calcTrend(currentBounceRate, previousBounceRate)
  };
}

export async function getTrafficOverTime(): Promise<TrafficDataPoint[]> {
  if (!propertyId) return [];

  const client = getAnalyticsClient();

  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'date' }],
    metrics: [{ name: 'totalUsers' }, { name: 'screenPageViews' }],
    orderBys: [{ dimension: { dimensionName: 'date', orderType: 'ALPHANUMERIC' } }]
  });

  return (response.rows ?? []).map((row) => {
    const dateStr = row.dimensionValues?.[0]?.value ?? '';
    const formatted = `${dateStr.slice(4, 6)}/${dateStr.slice(6, 8)}`;
    return {
      date: formatted,
      users: Number(row.metricValues?.[0]?.value ?? 0),
      pageViews: Number(row.metricValues?.[1]?.value ?? 0)
    };
  });
}

export async function getTopPages(): Promise<TopPage[]> {
  if (!propertyId) return [];

  const client = getAnalyticsClient();

  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 10
  });

  return (response.rows ?? []).map((row) => ({
    path: row.dimensionValues?.[0]?.value ?? '',
    pageViews: Number(row.metricValues?.[0]?.value ?? 0),
    users: Number(row.metricValues?.[1]?.value ?? 0)
  }));
}

export async function getTrafficSources(): Promise<TrafficSource[]> {
  if (!propertyId) return [];

  const client = getAnalyticsClient();

  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }]
  });

  const rows = response.rows ?? [];
  const total = rows.reduce(
    (sum, row) => sum + Number(row.metricValues?.[0]?.value ?? 0),
    0
  );

  return rows.map((row) => {
    const value = Number(row.metricValues?.[0]?.value ?? 0);
    return {
      name: row.dimensionValues?.[0]?.value ?? 'Unknown',
      value,
      percentage: total > 0 ? (value / total) * 100 : 0
    };
  });
}

export async function getDeviceBreakdown(): Promise<DeviceCategory[]> {
  if (!propertyId) return [];

  const client = getAnalyticsClient();

  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'deviceCategory' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }]
  });

  const rows = response.rows ?? [];
  const total = rows.reduce(
    (sum, row) => sum + Number(row.metricValues?.[0]?.value ?? 0),
    0
  );

  return rows.map((row) => {
    const value = Number(row.metricValues?.[0]?.value ?? 0);
    const rawName = row.dimensionValues?.[0]?.value ?? 'Unknown';
    return {
      name: rawName.charAt(0).toUpperCase() + rawName.slice(1),
      value,
      percentage: total > 0 ? (value / total) * 100 : 0
    };
  });
}
