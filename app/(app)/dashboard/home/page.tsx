import type { Metadata } from 'next';

import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { getYouTubeVideo } from '@/data/organization/get-youtube-video';
import { getPurchaseStats } from '@/data/purchases/get-purchases';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Home - Dashboard')
};

export default async function DashboardHomePage(): Promise<React.JSX.Element> {
  const [purchaseStats, youtubeVideoUrl] = await Promise.all([
    getPurchaseStats(),
    getYouTubeVideo()
  ]);

  return (
    <DashboardOverview
      purchaseStats={purchaseStats}
      youtubeVideoUrl={youtubeVideoUrl}
    />
  );
}
