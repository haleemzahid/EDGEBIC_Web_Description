import Link from 'next/link';

import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Blog',
  description:
    'Read the latest insights on manufacturing software, production scheduling, lean manufacturing, and industry best practices from EDGEBI Solutions.',
  path: '/blogs',
  keywords:
    'manufacturing blog, production scheduling insights, lean manufacturing, industry news, manufacturing software tips'
});

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 py-6 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-4xl font-bold">Our Blog</h1>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <div className="rounded-lg bg-gray-50 p-12 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              No posts found!
            </h2>
            <p className="mb-6 text-gray-600">
              We're working on bringing you valuable content about manufacturing
              software, production scheduling, and industry insights. Check back
              soon for updates!
            </p>
            <Link
              href="/contact-us"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              Contact <strong><em>Us</em></strong> for Updates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
