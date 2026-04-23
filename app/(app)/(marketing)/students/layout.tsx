import type { Metadata } from 'next';
import { VideoObjectJsonLd } from '@/components/seo';
import { getBaseUrl } from '@/lib/urls/get-base-url';

export const metadata: Metadata = {
  title: 'For Students',
  description:
    'Educational resources and information about User Solutions manufacturing software for students and universities.',
  alternates: {
    canonical: `${getBaseUrl()}/students`
  }
};

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <VideoObjectJsonLd
        name="Resource Manager for Excel — Student Training Video"
        description="Learn how to use Resource Manager for Excel (RMX) for production planning and scheduling. Educational training video for students and universities."
        thumbnailUrl="https://img.youtube.com/vi/74uO2H-eevc/maxresdefault.jpg"
        uploadDate="2022-10-01"
        embedUrl="https://www.youtube.com/embed/74uO2H-eevc"
      />
      {children}
    </>
  );
}
