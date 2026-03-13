import { DEFAULT_LOCALE } from '@/lib/i18n/locale';

function resolveBaseUrl(): string {
  let url: string;

  // NEXT_PUBLIC_BASE_URL takes precedence
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    url = process.env.NEXT_PUBLIC_BASE_URL;
  } else if (process.env.VERCEL_URL) {
    // Vercel deployment URL
    url = `https://${process.env.VERCEL_URL}`;
  } else {
    // Default fallback for local development and build time
    const port = process.env.PORT ?? 3000;
    return `http://localhost:${port}`;
  }

  // Normalize: strip www. to ensure canonical URL consistency
  return url.replace('://www.', '://');
}

export function shouldAppendLocale(locale?: string | null): boolean {
  return !!locale && locale !== DEFAULT_LOCALE && locale !== 'default';
}

export function getBaseUrl(locale?: string | null): string {
  const baseUrl = resolveBaseUrl().replace(/\/+$/, '');
  return shouldAppendLocale(locale) ? `${baseUrl}/${locale}` : baseUrl;
}
