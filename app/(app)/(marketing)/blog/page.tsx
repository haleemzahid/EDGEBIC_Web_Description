import * as React from 'react';
import type { Metadata } from 'next';

import { BlogPosts } from '@/components/marketing/sections/blog-posts';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Blog')
};

export default function BlogPage(): React.JSX.Element {
  return (
    <>
      <BlogPosts />
      {/* Awards Section */}
      <section className="pb-6 mt-12">
        <div className="mx-auto max-w-7xl">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="p-8 text-center">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
              </h2>
              <img
                src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                alt="Collection of industry and business awards logos"
                className="mx-auto h-auto max-w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
