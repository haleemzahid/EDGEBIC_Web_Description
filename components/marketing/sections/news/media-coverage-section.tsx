import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface MediaCoverageItem {
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  links?: Array<{
    text: string;
    url: string;
  }>;
  singleLink?: string;
}

export interface MediaCoverageSectionProps {
  title: string;
  items: MediaCoverageItem[];
  className?: string;
}

export function MediaCoverageSection({
  title,
  items,
  className = ''
}: MediaCoverageSectionProps): React.JSX.Element {
  return (
    <section className={`mb-20 ${className}`}>
      <h2 className="mb-10 text-3xl font-semibold">{title}</h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <div className="relative aspect-video">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
              {item.description && (
                <p className="mb-4 text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}

              {/* Single link */}
              {item.singleLink && (
                <Link
                  href={item.singleLink}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More →
                </Link>
              )}

              {/* Multiple links */}
              {item.links && (
                <div className="space-y-2">
                  {item.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.url}
                      className="block text-sm text-blue-600 hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
