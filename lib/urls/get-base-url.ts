import { DEFAULT_LOCALE } from '@/lib/i18n/locale';

function resolveBaseUrl(): string {
  // NEXT_PUBLIC_BASE_URL takes precedence
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // Vercel deployment URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Default fallback for local development and build time
  const port = process.env.PORT ?? 3000;
  return `http://localhost:${port}`;
}

export function shouldAppendLocale(locale?: string | null): boolean {
  return !!locale && locale !== DEFAULT_LOCALE && locale !== 'default';
}

export function getBaseUrl(locale?: string | null): string {
  const baseUrl = resolveBaseUrl();
  return shouldAppendLocale(locale) ? `${baseUrl}/${locale}` : baseUrl;
}
