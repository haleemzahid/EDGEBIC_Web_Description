import { AppInfo } from '@/constants/app-info';
import { getBaseUrl } from '@/lib/urls/get-base-url';

type OrganizationSchema = {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  sameAs?: string[];
};

type WebSiteSchema = {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  publisher: {
    '@type': 'Organization';
    name: string;
  };
};

type SoftwareApplicationSchema = {
  '@context': 'https://schema.org';
  '@type': 'SoftwareApplication';
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  url: string;
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
};

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbSchema = {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
};

type ArticleSchema = {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  author: {
    '@type': 'Organization';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
};

type FAQSchema = {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
};

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd({
  socialLinks = []
}: {
  socialLinks?: string[];
}) {
  const baseUrl = getBaseUrl();

  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: AppInfo.COMPANY_NAME,
    url: baseUrl,
    logo: `${baseUrl}/logos/edgebic-logo.png`,
    description: AppInfo.APP_DESCRIPTION,
    email: AppInfo.CONTACT_EMAIL,
    ...(socialLinks.length > 0 && { sameAs: socialLinks })
  };

  return <JsonLdScript data={schema} />;
}

export function WebSiteJsonLd() {
  const baseUrl = getBaseUrl();

  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: AppInfo.APP_NAME,
    url: baseUrl,
    description: AppInfo.APP_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: AppInfo.COMPANY_NAME
    }
  };

  return <JsonLdScript data={schema} />;
}

export function SoftwareApplicationJsonLd({
  name,
  description,
  url,
  price,
  priceCurrency = 'USD'
}: {
  name: string;
  description: string;
  url: string;
  price?: string;
  priceCurrency?: string;
}) {
  const schema: SoftwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url,
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency
      }
    })
  };

  return <JsonLdScript data={schema} />;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema: BreadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return <JsonLdScript data={schema} />;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  const baseUrl = getBaseUrl();

  const schema: ArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Organization',
      name: AppInfo.COMPANY_NAME
    },
    publisher: {
      '@type': 'Organization',
      name: AppInfo.COMPANY_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logos/edgebic-logo.png`
      }
    },
    datePublished,
    ...(dateModified && { dateModified }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  };

  return <JsonLdScript data={schema} />;
}

export function FAQJsonLd({
  questions
}: {
  questions: { question: string; answer: string }[];
}) {
  const schema: FAQSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  };

  return <JsonLdScript data={schema} />;
}
