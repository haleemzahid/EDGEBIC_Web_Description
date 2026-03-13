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
  inLanguage: string;
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

type IndustryPageSchema = {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  name: string;
  description: string;
  url: string;
  about: {
    '@type': 'Thing';
    name: string;
    description: string;
  };
  provider: {
    '@type': 'Organization';
    name: string;
  };
  mentions?: {
    '@type': 'Organization';
    name: string;
  }[];
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
  socialLinks
}: {
  socialLinks?: string[];
} = {}) {
  const baseUrl = getBaseUrl();

  const defaultSocialLinks = [
    AppInfo.SOCIAL_LINKS.LINKEDIN,
    AppInfo.SOCIAL_LINKS.FACEBOOK,
    AppInfo.SOCIAL_LINKS.X,
    AppInfo.SOCIAL_LINKS.YOUTUBE
  ];

  const links = socialLinks && socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: AppInfo.COMPANY_NAME,
    url: baseUrl,
    logo: `${baseUrl}/logos/edgebic-logo.png`,
    description: AppInfo.APP_DESCRIPTION,
    email: AppInfo.CONTACT_EMAIL,
    sameAs: links
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
    inLanguage: 'en-US',
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

export function FeaturePageJsonLd({
  title,
  description,
  url,
  featureDescription,
  featureList,
  customerNames
}: {
  title: string;
  description: string;
  url: string;
  featureDescription: string;
  featureList?: string[];
  customerNames?: string[];
}) {
  const baseUrl = getBaseUrl();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${baseUrl}${url}`,
    about: {
      '@type': 'SoftwareApplication',
      name: 'RMDB - Resource Manager DB',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Windows',
      description: featureDescription,
      ...(featureList &&
        featureList.length > 0 && {
          featureList: featureList.join(', ')
        }),
      provider: {
        '@type': 'Organization',
        name: AppInfo.COMPANY_NAME
      }
    },
    provider: {
      '@type': 'Organization',
      name: AppInfo.COMPANY_NAME
    },
    ...(customerNames &&
      customerNames.length > 0 && {
        mentions: customerNames.map((name) => ({
          '@type': 'Organization' as const,
          name
        }))
      })
  };

  return <JsonLdScript data={schema} />;
}

export function IndustryPageJsonLd({
  title,
  description,
  url,
  industryName,
  industryDescription,
  customerNames
}: {
  title: string;
  description: string;
  url: string;
  industryName: string;
  industryDescription: string;
  customerNames?: string[];
}) {
  const baseUrl = getBaseUrl();

  const schema: IndustryPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${baseUrl}${url}`,
    about: {
      '@type': 'Thing',
      name: industryName,
      description: industryDescription
    },
    provider: {
      '@type': 'Organization',
      name: AppInfo.COMPANY_NAME
    },
    ...(customerNames &&
      customerNames.length > 0 && {
        mentions: customerNames.map((name) => ({
          '@type': 'Organization' as const,
          name
        }))
      })
  };

  return <JsonLdScript data={schema} />;
}
