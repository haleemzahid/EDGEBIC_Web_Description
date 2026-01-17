'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  HomeIcon,
  SearchIcon,
  FileTextIcon,
  PackageIcon,
  VideoIcon,
  CalendarIcon
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Routes } from '@/constants/routes';

export function NotFoundContent(): React.JSX.Element {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleGoBack = (): void => {
    router.back();
  };

  const handleBackToHome = (): void => {
    router.push(Routes.Root);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to home with search query or implement your search logic
      router.push(`${Routes.Root}?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularPages = [
    {
      title: 'Production Planning Solutions',
      description: 'Explore our production planning and scheduling solutions',
      href: Routes.ProductionPlanning,
      icon: PackageIcon
    },
    {
      title: 'Success Stories',
      description: 'See how customers achieve success',
      href: Routes.SuccessStories,
      icon: FileTextIcon
    },
    {
      title: 'Product Videos',
      description: 'Watch tutorials and product demos',
      href: Routes.ProductVideos,
      icon: VideoIcon
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with our team',
      href: Routes.Contact,
      icon: CalendarIcon
    }
  ];

  return (
    <main className="min-h-screen w-full bg-background">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-4xl text-center">
          {/* 404 Visual */}
          <div
            className="mb-8"
            role="img"
            aria-label="404 Error"
          >
            <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[8rem] font-extrabold leading-none text-transparent sm:text-[10rem] md:text-[12rem]">
              404
            </span>
          </div>

          {/* Main Message */}
          <h1 className="font-heading mb-4 text-3xl font-bold md:text-4xl">
            Oops! Page Not Found
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            The page you are looking for doesn&apos;t exist or has been moved.
            Don&apos;t worry, we&apos;re here to help you find what you need.
          </p>

          {/* Primary Actions */}
          <div className="mb-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={handleBackToHome}
              aria-label="Navigate to homepage"
            >
              <HomeIcon
                className="mr-2 size-5"
                aria-hidden="true"
              />
              Back to Home
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleGoBack}
              aria-label="Go back to previous page"
            >
              Go Back
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <form
              onSubmit={handleSearch}
              className="mx-auto max-w-md"
              role="search"
            >
              <label
                htmlFor="search-input"
                className="sr-only"
              >
                Search for content
              </label>
              <div className="relative">
                <SearchIcon
                  className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="search-input"
                  type="search"
                  placeholder="Search for content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-10 pr-4"
                  aria-label="Search input"
                />
              </div>
            </form>
          </div>

          {/* Popular Pages */}
          <div className="mb-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Explore Our Popular Pages</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {popularPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Card
                    key={page.href}
                    className="border-slate-200 transition-all hover:border-blue-300 hover:shadow-lg"
                  >
                    <CardContent className="p-6">
                      <Link
                        href={page.href}
                        className="group flex flex-col items-center text-center"
                        aria-label={`Navigate to ${page.title}`}
                      >
                        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-50 transition-colors group-hover:bg-blue-100">
                          <Icon
                            className="size-6 text-blue-600"
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="mb-2 font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                          {page.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {page.description}
                        </p>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <Link
              href={Routes.Contact}
              className="hover:text-foreground hover:underline"
            >
              Contact Support
            </Link>
            <span aria-hidden="true">•</span>
            <Link
              href={Routes.Docs}
              className="hover:text-foreground hover:underline"
            >
              Documentation
            </Link>
            <span aria-hidden="true">•</span>
            <Link
              href={Routes.Blog}
              className="hover:text-foreground hover:underline"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
