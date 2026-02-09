import { NextRequest } from 'next/server';

import { handlers } from '@/lib/auth';
import { getBaseUrl } from '@/lib/urls/get-base-url';

const reqWithOrigin = (req: NextRequest): NextRequest => {
  const { href, origin } = req.nextUrl;
  return new NextRequest(
    href.replace(
      origin,
      new URL(getBaseUrl()).origin
    ),
    req
  );
};

export const GET = (req: NextRequest) => {
  return handlers.GET(reqWithOrigin(req));
};

export const POST = (req: NextRequest) => {
  return handlers.POST(reqWithOrigin(req));
};
