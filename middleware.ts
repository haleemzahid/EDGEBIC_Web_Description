import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Legacy WordPress URLs → new equivalents (301 redirects for SEO)
const LEGACY_REDIRECTS: Record<string, string> = {
  // Old WordPress nested paths → new flat paths
  '/production-scheduling-products/excel-applications': '/excel-applications',
  '/production-scheduling-products/workcenter-schedulerxl': '/workcenter-schedulerxl',
  '/production-scheduling-products-1/workcenter-schedulerxl': '/workcenter-schedulerxl',
  '/home': '/',
  '/home-2/product-downloads': '/product-downloads',

  // About section restructure
  '/about-us/team': '/about',
  '/about-us/company-history': '/company-history',
  '/about-us/mission-statement': '/mission-statement',
  '/team': '/about',
  '/aboutus': '/about',

  // Contact typo
  '/contact-': '/contact-us',

  // Product pages
  '/product': '/production-scheduling-products',
  '/product-2': '/production-scheduling-products',
  '/checkout/operations-manager': '/buy-now-operations-manager',
  '/resource-manager-db-in-depth': '/resource-manager-db-2',
  '/resource-manager-for-excel-in-depth': '/resource-manager-for-excel-2',
  '/workcenter-scheduler-xl-in-depth': '/workcenter-schedulerxl',

  // Old success story URL patterns
  '/small-manufacturer-and-job-shop-uses-planning-scheduling-and-tracking-tools-from-user-solutions-inc-to-become-more-efficient-and-competitive': '/success-stories',

  // Alternate success story URL patterns → canonical
  '/story/incon-incorporate': '/incon-incorporated',
  '/success-story/incon-incorporate': '/incon-incorporated',
  '/incon-inc': '/incon-incorporated',
  '/incon-incorporate': '/incon-incorporated',
  '/story/sleepmaster-ltd': '/success-stories',
  '/success-story/resource-manager-db-innovates-li-ion-battery-production-scheduling-for-enevate': '/success-stories/resource-manager-db-innovates-li-ion-battery-production-scheduling-for-enevate',

  // Press releases
  '/press_release/user-solutions-joins-fight-against-covid-free-production-scheduling-software': '/press_release',
  '/press_release/lets-make-manufacturing-great-national-manufacturing-day-2020': '/press_release',
  '/press_release/rmdb-v6-innovates-production-scheduling': '/press_release',

  // Dead WordPress content → closest equivalent
  '/yasai_daijiten/company': '/',
  '/wp-content/uploads/2022/11/INVENTORY-MANAGEMENT-D.doc': '/product-downloads',
  '/wp-content/uploads/2022/11/quality-d.doc': '/product-downloads',
  '/wp-content/uploads/2022/11/PRODUCTION-PLANNING-D.doc': '/product-downloads',
  '/wp-content/uploads/2022/11/LOCATION-D.doc': '/product-downloads',
  '/wp-content/uploads/2014/07/WCXLQuickStart.pdf': '/product-downloads',

  // Previous 404 fixes
  '/optimization-production-scheduling-techniques': '/production-scheduling-software',
  '/production-scheduling-software-trials': '/production-scheduling-products',
  '/production-scheduling-products-1': '/production-scheduling-products',

  // 404 fixes — April 2026
  '/production-scheduling-products/resource-manager-db': '/resource-manager-db-2',
  '/my-account': '/auth/login',
  '/press_release/user-solutions-inc-announces-resource-manager-for-excel-v-2013-production-scheduling-made-easy': '/press_release',
  '/our-privacy-policy': '/privacy-policy',
  '/ws': '/',
  '/workcenter-scheduler-xl': '/workcenter-schedulerxl',
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';

  // Redirect www to non-www
  if (hostname.startsWith('www.')) {
    const newUrl = new URL(request.url);
    newUrl.hostname = hostname.replace('www.', '');
    // Remove internal port that can leak through reverse proxies
    newUrl.port = '';
    return NextResponse.redirect(newUrl, 301);
  }

  const { pathname, searchParams } = request.nextUrl;

  // Block spam/junk WordPress URLs with 410 Gone (tells Google to permanently remove)
  const isSpamWpPath = pathname.startsWith('/wp-content') ||
    pathname.startsWith('/wp-admin') ||
    pathname.startsWith('/wp-includes') ||
    pathname.startsWith('/wp-login') ||
    pathname.startsWith('/wp-json') ||
    pathname.startsWith('/xmlrpc') ||
    pathname === '/page-sitemap.xml' ||
    pathname === '/post-sitemap.xml' ||
    pathname === '/category-sitemap.xml';
  const isSpamParam = searchParams.has('mitra') ||
    searchParams.has('s') && pathname === '/';

  if (isSpamWpPath || isSpamParam) {
    // Check if this specific path has a legitimate redirect first
    const normalizedSpamPath = pathname.replace(/\/+$/, '');
    if (LEGACY_REDIRECTS[normalizedSpamPath] && !isSpamParam) {
      return NextResponse.redirect(new URL(LEGACY_REDIRECTS[normalizedSpamPath], request.url), 301);
    }
    // Otherwise return 410 Gone — permanently removed
    return new NextResponse(null, { status: 410, statusText: 'Gone' });
  }

  // Strip trailing slashes (except root /) to prevent duplicate URLs
  if (pathname !== '/' && pathname.endsWith('/')) {
    const cleanPath = pathname.replace(/\/+$/, '');
    const newUrl = new URL(cleanPath, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl, 301);
  }

  // Redirect legacy WordPress URLs
  const normalizedPath = pathname.replace(/\/+$/, '');
  const redirectTo = LEGACY_REDIRECTS[normalizedPath];
  if (redirectTo) {
    return NextResponse.redirect(new URL(redirectTo, request.url), 301);
  }

  // Redirect /blogs/slug → /blog/slug (plural → singular for blog detail pages)
  if (normalizedPath.startsWith('/blogs/') && normalizedPath.length > '/blogs/'.length) {
    const slug = normalizedPath.slice('/blogs/'.length);
    return NextResponse.redirect(new URL(`/blog/${slug}`, request.url), 301);
  }

  // Redirect old /success_stories paths to /success-stories (underscore → hyphen)
  if (normalizedPath.startsWith('/success_stories')) {
    const newPath = normalizedPath.replace('/success_stories', '/success-stories');
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
