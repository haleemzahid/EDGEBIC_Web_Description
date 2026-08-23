import { AppInfo } from '@/constants/app-info';
import { getBaseUrl } from '@/lib/urls/get-base-url';

type OrganizationSchema = {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  '@id': string;
  name: string;
  legalName: string;
  alternateName: string[];
  url: string;
  logo: string;
  description: string;
  email: string;
  telephone: string;
  foundingDate: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': 'ContactPoint';
    contactType: string;
    telephone: string;
    email: string;
    areaServed: string;
    availableLanguage: string;
  }[];
  knowsAbout: string[];
  award: string[];
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
    '@id': string;
  };
};

type SoftwareApplicationSchema = {
  '@context': 'https://schema.org';
  '@type': 'SoftwareApplication';
  name: string;
  description: string;
  applicationCategory: string;
  applicationSubCategory?: string;
  operatingSystem: string;
  url: string;
  publisher: {
    '@id': string;
  };
  featureList?: string[];
  softwareRequirements?: string;
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
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
    AppInfo.SOCIAL_LINKS.YOUTUBE,
    // Review directories carry more weight than social profiles when an
    // answer engine is confirming the vendor exists and is established.
    AppInfo.PROFILE_LINKS.CAPTERRA,
    AppInfo.PROFILE_LINKS.G2
  ];

  const links = socialLinks && socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    // Stable node id so every other schema on the site can point at one
    // company entity instead of describing a new one per page.
    '@id': `${baseUrl}/#organization`,
    name: AppInfo.COMPANY_NAME,
    legalName: AppInfo.COMPANY_LEGAL_NAME,
    alternateName: [...AppInfo.COMPANY_ALTERNATE_NAMES],
    url: baseUrl,
    logo: `${baseUrl}/logos/edgebic-logo.png`,
    description: AppInfo.APP_DESCRIPTION,
    email: AppInfo.CONTACT_EMAIL,
    telephone: AppInfo.PHONE,
    foundingDate: AppInfo.FOUNDING_YEAR,
    address: {
      '@type': 'PostalAddress',
      addressLocality: AppInfo.ADDRESS.LOCALITY,
      addressRegion: AppInfo.ADDRESS.REGION,
      postalCode: AppInfo.ADDRESS.POSTAL_CODE,
      addressCountry: AppInfo.ADDRESS.COUNTRY
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: AppInfo.PHONE,
        email: AppInfo.SALES_EMAIL,
        areaServed: 'Worldwide',
        availableLanguage: 'English'
      },
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        telephone: AppInfo.PHONE,
        email: AppInfo.SUPPORT_EMAIL,
        areaServed: 'Worldwide',
        availableLanguage: 'English'
      }
    ],
    knowsAbout: [...AppInfo.KNOWS_ABOUT],
    award: [...AppInfo.AWARDS],
    sameAs: links
  };

  return <JsonLdScript data={schema} />;
}

export function WebSiteJsonLd() {
  const baseUrl = getBaseUrl();

  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    // The site is the company's, not a single product's. Naming it after the
    // product made every page claim the site itself was called RMDB.
    name: AppInfo.COMPANY_NAME,
    url: baseUrl,
    description: AppInfo.APP_DESCRIPTION,
    inLanguage: 'en-US',
    publisher: {
      '@id': `${baseUrl}/#organization`
    }
  };

  return <JsonLdScript data={schema} />;
}

export function SoftwareApplicationJsonLd({
  name,
  description,
  url,
  price,
  priceCurrency = 'USD',
  operatingSystem = 'Windows',
  applicationSubCategory,
  featureList,
  softwareRequirements,
  offerUrl
}: {
  name: string;
  description: string;
  url: string;
  price?: string;
  priceCurrency?: string;
  operatingSystem?: string;
  applicationSubCategory?: string;
  featureList?: string[];
  softwareRequirements?: string;
  offerUrl?: string;
}) {
  const baseUrl = getBaseUrl();
  const absoluteUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  const schema: SoftwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: 'BusinessApplication',
    // No default: this varies per product. The simulation products are not
    // scheduling software, so a shared default would misdescribe them.
    ...(applicationSubCategory && { applicationSubCategory }),
    // These are installed Windows applications, not web apps. Declaring
    // 'Web' told every crawler the wrong thing about what the product is.
    operatingSystem,
    url: absoluteUrl,
    publisher: {
      '@id': `${baseUrl}/#organization`
    },
    ...(featureList && { featureList }),
    ...(softwareRequirements && { softwareRequirements }),
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency,
        availability: 'https://schema.org/InStock',
        // Defaults to the product's own page. Only EDGEBIC is bought from
        // /pricing, so a hardcoded pricing URL would be wrong elsewhere.
        url: offerUrl
          ? offerUrl.startsWith('http')
            ? offerUrl
            : `${baseUrl}${offerUrl}`
          : absoluteUrl
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
      offers: {
        '@type': 'Offer',
        price: '4000',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      },
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

export function VideoObjectJsonLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  embedUrl,
  contentUrl
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  embedUrl?: string;
  contentUrl?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    ...(embedUrl && { embedUrl }),
    ...(contentUrl && { contentUrl })
  };

  return <JsonLdScript data={schema} />;
}
