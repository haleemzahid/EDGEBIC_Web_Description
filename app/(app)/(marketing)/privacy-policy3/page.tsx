import Image from 'next/image';
import Link from 'next/link';


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicy3Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              User Solutions, Inc.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Who we are */}
            <Card>
              <CardHeader>
                <CardTitle>Who We Are</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="mb-4 text-muted-foreground">
                  User Solutions, Inc. is a leading provider of manufacturing
                  software solutions, specializing in production planning,
                  scheduling, and resource management tools. Since 1991, we have
                  been helping manufacturers of all sizes streamline their
                  operations with affordable, easy-to-implement software.
                </p>
                <p className="text-muted-foreground">
                  Our products include EDGEBIC , Resource Manager for Excel,
                  Resource Manager DB, and EDGEBIC – designed to work the way
                  you do, adapting to your specific needs without the complexity
                  and cost of traditional enterprise systems.
                </p>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="mb-4 text-muted-foreground">
                  When visitors leave comments on the site we collect the data
                  shown in the comments form, and also the visitor's IP address
                  and browser user agent string to help spam detection.
                </p>
                <p className="text-muted-foreground">
                  An anonymized string created from your email address (also
                  called a hash) may be provided to the Gravatar service to see
                  if you are using it. The Gravatar service privacy policy is
                  available here:
                  <a
                    href="https://automattic.com/privacy/"
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://automattic.com/privacy/
                  </a>
                  . After approval of your comment, your profile picture is
                  visible to the public in the context of your comment.
                </p>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-muted-foreground">
                  If you upload images to the website, you should avoid
                  uploading images with embedded location data (EXIF GPS)
                  included. Visitors to the website can download and extract any
                  location data from images on the website.
                </p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="mb-4 text-muted-foreground">
                  If you leave a comment on our site you may opt-in to saving
                  your name, email address and website in cookies. These are for
                  your convenience so that you do not have to fill in your
                  details again when you leave another comment. These cookies
                  will last for one year.
                </p>
                <p className="mb-4 text-muted-foreground">
                  If you visit our login page, we will set a temporary cookie to
                  determine if your browser accepts cookies. This cookie
                  contains no personal data and is discarded when you close your
                  browser.
                </p>
                <p className="mb-4 text-muted-foreground">
                  When you log in, we will also set up several cookies to save
                  your login information and your screen display choices. Login
                  cookies last for two days, and screen options cookies last for
                  a year. If you select "Remember Me", your login will persist
                  for two weeks. If you log out of your account, the login
                  cookies will be removed.
                </p>
                <p className="text-muted-foreground">
                  If you edit or publish an article, an additional cookie will
                  be saved in your browser. This cookie includes no personal
                  data and simply indicates the post ID of the article you just
                  edited. It expires after 1 day.
                </p>
              </CardContent>
            </Card>

            {/* Embedded content */}
            <Card>
              <CardHeader>
                <CardTitle>Embedded Content from Other Websites</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="mb-4 text-muted-foreground">
                  Articles on this site may include embedded content (e.g.
                  videos, images, articles, etc.). Embedded content from other
                  websites behaves in the exact same way as if the visitor has
                  visited the other website.
                </p>
                <p className="text-muted-foreground">
                  These websites may collect data about you, use cookies, embed
                  additional third-party tracking, and monitor your interaction
                  with that embedded content, including tracking your
                  interaction with the embedded content if you have an account
                  and are logged in to that website.
                </p>
              </CardContent>
            </Card>

            {/* Who we share data with */}
            <Card>
              <CardHeader>
                <CardTitle>Who We Share Your Data With</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-muted-foreground">
                  If you request a password reset, your IP address will be
                  included in the reset email.
                </p>
              </CardContent>
            </Card>

            {/* Data retention */}
            <Card>
              <CardHeader>
                <CardTitle>How Long We Retain Your Data</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="mb-4 text-muted-foreground">
                  If you leave a comment, the comment and its metadata are
                  retained indefinitely. This is so we can recognize and approve
                  any follow-up comments automatically instead of holding them
                  in a moderation queue.
                </p>
                <p className="text-muted-foreground">
                  For users that register on our website (if any), we also store
                  the personal information they provide in their user profile.
                  All users can see, edit, or delete their personal information
                  at any time (except they cannot change their username).
                  Website administrators can also see and edit that information.
                </p>
              </CardContent>
            </Card>

            {/* Your rights */}
            <Card>
              <CardHeader>
                <CardTitle>What Rights You Have Over Your Data</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-muted-foreground">
                  If you have an account on this site, or have left comments,
                  you can request to receive an exported file of the personal
                  data we hold about you, including any data you have provided
                  to us. You can also request that we erase any personal data we
                  hold about you. This does not include any data we are obliged
                  to keep for administrative, legal, or security purposes.
                </p>
              </CardContent>
            </Card>

            {/* Where data is sent */}
            <Card>
              <CardHeader>
                <CardTitle>Where Your Data Is Sent</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-muted-foreground">
                  Visitor comments may be checked through an automated spam
                  detection service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Email:</strong>{' '}
                    <Link
                      href="mailto:us@usersolutions.com"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      us@usersolutions.com
                    </Link>
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Phone:</strong>{' '}
                    <Link
                      href="tel:248.486.6365"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      248.486.6365
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h3>
                <div className="flex justify-center">
                  <img
                    src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos"
                    className="h-auto max-w-full rounded-lg shadow-md"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
