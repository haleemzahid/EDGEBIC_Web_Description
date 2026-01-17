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
      </div>
    </main>
  );
}
