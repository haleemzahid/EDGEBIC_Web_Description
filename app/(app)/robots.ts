import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/urls/get-base-url';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/',
          // Test/demo pages
          '/test',
          '/test-home',
          '/navigation-demo',
          // Thank you pages
          '/thankyou',
          '/thankyou-for-downloading-*',
          '/thankyoudownload-*',
          // Transactional pages
          '/cart',
          '/checkout',
          // Old/archived versions
          '/excel-applications-old',
          '/production-scheduling-products_old',
          '/privacy-policy3',
          '/product-downloads-3',
          // Duplicate pages (canonical versions exist)
          '/aboutus',
          '/success_stories',
          '/mission',
          // Hidden sections
          '/author/',
          '/category/',
          '/press_release/',
          '/products/'
        ]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
