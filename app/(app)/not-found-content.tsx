'use client';

import * as React from 'react';
import Link from 'next/link';
import { HomeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Routes } from '@/constants/routes';

export function NotFoundContent(): React.JSX.Element {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        {/* 404 Visual */}
        <div
          className="mb-8"
          role="img"
          aria-label="404 Error"
        >
          <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-[6rem] font-extrabold leading-none text-transparent sm:text-[8rem]">
            404
          </span>
        </div>

        {/* Main Message */}
        <h1 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
          404 – Page Not Found
        </h1>
        <p className="mb-8 text-base text-muted-foreground sm:text-lg">
          The page you are looking for does not exist.
        </p>

        {/* Homepage Button */}
        <Button
          asChild
          size="lg"
          className="min-w-[200px]"
        >
          <Link
            href={Routes.Root}
            aria-label="Navigate to homepage"
          >
            <HomeIcon
              className="mr-2 size-5"
              aria-hidden="true"
            />
            Go to Homepage
          </Link>
        </Button>

        {/* Recovery links — help people and crawlers find the right place
            instead of a dead end. */}
        <nav
          aria-label="Helpful links"
          className="mt-10 border-t pt-6 text-left"
        >
          <p className="mb-3 text-sm font-semibold text-foreground">
            Where to look instead
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/blogs" className="hover:text-foreground hover:underline">
                Blog &amp; knowledge base
              </Link>{' '}
              — 2,400+ articles at /blog/&#123;slug&#125;
            </li>
            <li>
              <Link href="/edgebic" className="hover:text-foreground hover:underline">
                EDGEBIC product overview
              </Link>
            </li>
            <li>
              <Link href="/docs" className="hover:text-foreground hover:underline">
                Documentation
              </Link>{' '}
              and{' '}
              <Link href="/developers" className="hover:text-foreground hover:underline">
                developer resources
              </Link>
            </li>
            <li>
              <a href="/sitemap.xml" className="hover:text-foreground hover:underline">
                sitemap.xml
              </a>{' '}
              — every URL on this site
            </li>
            <li>
              <a href="/llms.txt" className="hover:text-foreground hover:underline">
                llms.txt
              </a>{' '}
              — site guide for AI agents
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-foreground hover:underline">
                Contact us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
