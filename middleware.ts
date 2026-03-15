import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Legacy WordPress URLs → new equivalents
const LEGACY_REDIRECTS: Record<string, string> = {
  '/optimization-production-scheduling-techniques': '/production-scheduling-software',
  '/production-scheduling-software-trials': '/production-scheduling-products',
  '/production-scheduling-products-1': '/production-scheduling-products',
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

  // Redirect legacy WordPress URLs
  const pathname = request.nextUrl.pathname.replace(/\/+$/, '');
  const redirectTo = LEGACY_REDIRECTS[pathname];
  if (redirectTo) {
    return NextResponse.redirect(new URL(redirectTo, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
