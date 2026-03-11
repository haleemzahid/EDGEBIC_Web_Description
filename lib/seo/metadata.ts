import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/urls/get-base-url';

const TWITTER_HANDLE = '@UserSolutionsUS';
const SITE_NAME = 'User Solutions';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  image = '/og.jpg',
  noIndex = false
}: PageMetadataOptions): Metadata {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [image]
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false
          }
        }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              'max-video-preview': -1,
              'max-image-preview': 'large' as const,
              'max-snippet': -1
            }
          }
        })
  };
}

export function createProductMetadata({
  name,
  description,
  path,
  keywords
}: {
  name: string;
  description: string;
  path: string;
  keywords?: string;
}): Metadata {
  return createPageMetadata({
    title: name,
    description,
    path,
    keywords:
      keywords ||
      `${name}, production planning, scheduling software, manufacturing, RMDB`
  });
}

export function createArticleMetadata({
  title,
  description,
  path,
  keywords,
  publishedTime,
  modifiedTime
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      images: [
        {
          url: '/og.jpg',
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: ['/og.jpg']
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1
      }
    }
  };
}
