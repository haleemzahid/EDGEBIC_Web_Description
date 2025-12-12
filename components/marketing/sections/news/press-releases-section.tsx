import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface PressReleaseItem {
  title: string;
  date: string;
  url: string;
  description?: string;
}

export interface FeaturedPress {
  title: string;
  description?: string;
  url: string;
  imageUrl: string;
  imageAlt: string;
}

export interface PressReleasesSectionProps {
  title: string;
  featured?: FeaturedPress;
  releases: PressReleaseItem[];
  className?: string;
}

export function PressReleasesSection({
  title,
  featured,
  releases,
  className = ''
}: PressReleasesSectionProps): React.JSX.Element {
  return (
    <section className={`mb-20 ${className}`}>
      <h2 className="mb-10 text-3xl font-semibold">{title}</h2>

      {/* Featured Press Release */}
      {featured && (
        <div className="mb-6 rounded-lg bg-blue-50 p-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row">
            <div className="flex-1">
              <h3 className="mb-4 text-2xl font-semibold">{featured.title}</h3>
              {featured.description && (
                <p className="mb-4 text-muted-foreground">
                  {featured.description}
                </p>
              )}
              <Link
                href={featured.url}
                className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More →
              </Link>
            </div>
            <div className="w-full lg:w-auto">
              <Image
                src={featured.imageUrl}
                alt={featured.imageAlt}
                width={400}
                height={200}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Press Release Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {releases.map((release, index) => (
          <div
            key={index}
            className="rounded-lg border p-6"
          >
            <h4 className="mb-3 text-lg font-semibold">{release.title}</h4>
            {release.description && (
              <p className="mb-3 text-muted-foreground">
                {release.description}
              </p>
            )}
            <p className="mb-3 text-sm text-muted-foreground">{release.date}</p>
            <Link
              href={release.url}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
