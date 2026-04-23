import { createPageMetadata } from '@/lib/seo/metadata';

import { NTClipboardVideo } from '@/components/marketing/sections/ntclipboard-video';
import { Page } from '@/components/ui/page';

export const metadata = createPageMetadata({
  title: 'Product Videos',
  description:
    'Watch comprehensive video demonstrations of our award-winning manufacturing software solutions including Resource Manager DB, Workcenter Scheduler, and Excel-based planning tools.',
  path: '/videos',
  keywords: 'product videos, manufacturing software demos, RMDB demo, Resource Manager DB video, scheduling software tutorial'
});

export default function ProductVideosPage(): React.JSX.Element {
  const videoSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Resource Manager DB (RMDB) Overview',
      description: 'Complete overview of Resource Manager DB production planning and scheduling software.',
      thumbnailUrl: 'https://i.ytimg.com/vi/kn92TIHhbm8/maxresdefault.jpg',
      uploadDate: '2023-01-01',
      contentUrl: 'https://www.youtube.com/watch?v=kn92TIHhbm8',
      embedUrl: 'https://www.youtube.com/embed/kn92TIHhbm8',
      publisher: {
        '@type': 'Organization',
        name: 'User Solutions'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'RMDB Summary and Features',
      description: 'Detailed walkthrough of RMDB features including finite capacity scheduling, MRP, and drag-and-drop planning.',
      thumbnailUrl: 'https://i.ytimg.com/vi/6B4A-acolGk/maxresdefault.jpg',
      uploadDate: '2023-01-01',
      contentUrl: 'https://www.youtube.com/watch?v=6B4A-acolGk',
      embedUrl: 'https://www.youtube.com/embed/6B4A-acolGk',
      publisher: {
        '@type': 'Organization',
        name: 'User Solutions'
      }
    }
  ];

  return (
    <Page>
      {videoSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <NTClipboardVideo />
    </Page>
  );
}
