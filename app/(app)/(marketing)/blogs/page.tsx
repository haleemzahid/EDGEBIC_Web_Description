import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

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
              Contact Us for Updates
            </Link>
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  width={1024}
                  height={128}
                  className="mx-auto h-auto max-w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
