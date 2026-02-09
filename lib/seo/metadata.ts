import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import { AppInfo } from '@/constants/app-info';

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
      siteName: AppInfo.APP_NAME,
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
      title,
      description,
      images: [image]
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
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
      `${name}, production planning, scheduling software, manufacturing`
  });
}

export function createArticleMetadata({
  title,
  description,
  path,
  publishedTime,
  modifiedTime
}: {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: AppInfo.APP_NAME,
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
      title,
      description,
      images: ['/og.jpg']
    }
  };
}
