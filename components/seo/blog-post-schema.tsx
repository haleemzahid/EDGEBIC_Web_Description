import { AppInfo } from '@/constants/app-info';
import { getBaseUrl } from '@/lib/urls/get-base-url';

type BlogPostSchemaProps = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  heroImage?: string;
  category: string;
  keywords?: string[];
  wordCount?: number;
  authorName?: string;
  authorUrl?: string;
  faqQuestions?: { question: string; answer: string }[];
};

export function BlogPostSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  heroImage,
  category,
  keywords,
  wordCount,
  authorName,
  authorUrl,
  faqQuestions
}: BlogPostSchemaProps) {
  const baseUrl = getBaseUrl();
  const fullUrl = `${baseUrl}${url}`;
  const logoUrl = `${baseUrl}/logos/edgebic-logo.png`;

  const blogPosting = {
    '@type': 'BlogPosting',
    '@id': `${fullUrl}#article`,
    headline: title,
    description,
    datePublished,
    ...(dateModified && { dateModified }),
    author: {
      '@type': 'Organization',
      name: authorName ?? AppInfo.COMPANY_NAME,
      ...(authorUrl && { url: authorUrl })
    },
    publisher: {
      '@type': 'Organization',
      name: AppInfo.COMPANY_NAME,
      logo: {
        '@type': 'ImageObject',
        url: logoUrl
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl
    },
    ...(heroImage && {
      image: {
        '@type': 'ImageObject',
        url: `${baseUrl}${heroImage}`
      }
    }),
    ...(wordCount && { wordCount }),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
    articleSection: category
  };

  const breadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': `${fullUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/blogs`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category,
        item: `${baseUrl}/blogs?category=${encodeURIComponent(category)}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: title
      }
    ]
  };

  const graph: object[] = [blogPosting, breadcrumbList];

  if (faqQuestions && faqQuestions.length > 0) {
    const faqPage = {
      '@type': 'FAQPage',
      '@id': `${fullUrl}#faq`,
      mainEntity: faqQuestions.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer
        }
      }))
    };
    graph.push(faqPage);
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': graph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
