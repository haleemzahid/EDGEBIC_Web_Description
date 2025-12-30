import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

export default function PressReleasePage() {
  const pressReleases = [
    {
      title:
        'User Solutions Joins Fight Against Covid – Free Production Scheduling Software',
      date: 'April 7, 2020',
      excerpt:
        'User Solutions announces free Resource Manager for Excel to manufacturers fighting coronavirus pandemic.',
      slug: 'user-solutions-joins-fight-against-covid-free-production-scheduling-software'
    },
    {
      title: "Let's Make Manufacturing Great: National Manufacturing Day 2020",
      date: 'October 2, 2020',
      excerpt:
        'Celebrating National Manufacturing Day with innovative production scheduling solutions.',
      slug: 'lets-make-manufacturing-great-national-manufacturing-day-2020'
    },
    {
      title:
        'RMDB v6 Innovates Production Scheduling for Cutting Edge Battery Technology',
      date: 'June 9, 2016',
      excerpt:
        "Enevate Corporation selects User Solutions' Resource Manager database for advanced Li-ion battery production.",
      slug: 'rmdb-v6-innovates-production-scheduling'
    },
    {
      title: 'Scheduling System Narrows Skills Gap for Fire-Rated Glass',
      date: 'August 31, 2016',
      excerpt:
        'Technical Glass Products expands use of Resource Manager-DB to optimize cross-trained workforce.',
      slug: 'scheduling-system-narrows-skills-gap'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 py-6 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-4xl font-bold">Press Releases</h1>
          <p className="mt-4 text-center text-xl">
            Stay updated with the latest news from User Solutions
          </p>
        </div>
      </div>

      {/* Press Releases Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8">
            {pressReleases.map((release, index) => (
              <article
                key={index}
                className="rounded-lg bg-gray-50 p-8 shadow-lg"
              >
                <header className="mb-4">
                  <h2 className="mb-2 text-2xl font-bold text-gray-800">
                    <Link
                      href={`/press_release/${release.slug}`}
                      className="transition-colors hover:text-blue-600"
                    >
                      {release.title}
                    </Link>
                  </h2>
                  <time className="text-gray-600">
                    {release.date}
                  </time>
                </header>

                <p className="mb-4 leading-relaxed text-gray-700">
                  {release.excerpt}
                </p>

                <Link
                  href={`/press_release/${release.slug}`}
                  className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                >
                  Read Full Release →
                </Link>
              </article>
            ))}
          </div>

          {/* Contact for Media */}
          <div className="mt-6 rounded-lg bg-blue-50 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
              Media Inquiries
            </h3>
            <p className="mb-6 text-gray-700">
              For press inquiries, interviews, or additional information, please
              contact our media team.
            </p>
            <div className="space-y-2">
              <p className="text-gray-800">
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:us@usersolutions.com"
                  className="text-blue-600 hover:underline"
                >
                  us@usersolutions.com
                </a>
              </p>
              <p className="text-gray-800">
                <strong>Phone:</strong>{' '}
                <a
                  href="tel:248.486.6365"
                  className="text-blue-600 hover:underline"
                >
                  248.486.6365
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h3>
                <Image
                  src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  width={1024}
                  height={128}
                  className="mx-auto h-auto max-w-full"
                  unoptimized
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
