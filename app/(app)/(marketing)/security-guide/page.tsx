import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Security Guide'),
  description:
    'Step-by-step guide to improve security for windows, anti-virus programs and excel macros. Know how to unblock files and enable VBA Macros now.'
};

export default function SecurityGuidePage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      {/* Content */}
      <div className="container mx-auto px-4 pt-6">
        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="mb-6 text-center">
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-center text-5xl font-bold text-transparent md:text-6xl">
            Security Guide
          </h1>
          <p className="mb-6 text-center text-xl text-muted-foreground md:text-2xl">
            Step-by-step guide to improve security for Windows, anti-virus
            programs and Excel macros
          </p>

          {/* Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-3xl">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Due to heightened security from both Windows and Anti-Virus
                programs, you may have to do some\all of the following steps
                after downloading:
              </p>
            </CardContent>
          </Card>

          {/* Step 1 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">
                Step 1: Unblock Downloaded Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid items-start gap-8 md:grid-cols-2">
                <div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Wherever you save file, using windows explorer, right click
                    on said file and choose properties and unblock for security.
                    Press APPLY and that option should disappear.
                  </p>
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="https://www.usersolutions.com/wp-content/uploads/2023/01/s1.png"
                    alt="Screenshot of Excel file properties with unlock option highlighted."
                    className="h-auto w-full"
                    width={485}
                    height={505}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">
                Step 2: Enable Developer Tab in Excel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Next, if you open up file and still can't run macros, check to
                  see if Developer is option on main menu for Excel. If not,
                  then go to File, Options, and add Developer to ribbon.
                </p>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src="https://www.usersolutions.com/wp-content/uploads/2023/01/s2.png"
                      alt="Screenshot of Excel Macro Security options menu."
                      className="h-auto w-full"
                      width={591}
                      height={756}
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src="https://www.usersolutions.com/wp-content/uploads/2023/01/s3.png"
                      alt="Excel options menu showing Customize Ribbon interface."
                      className="h-auto w-full"
                      width={624}
                      height={387}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">
                Step 3: Enable VBA Macros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Finally, choose Developer, Macro Security, Enable VBA Macros,
                  Save, and Reopen Excel file.
                </p>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src="https://www.usersolutions.com/wp-content/uploads/2023/01/s4.png"
                      alt="Excel Developer tab with Macro Security settings highlighted."
                      className="h-auto w-full"
                      width={624}
                      height={268}
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src="https://www.usersolutions.com/wp-content/uploads/2023/01/s5.png"
                      alt="Screenshot of Excel Trust Center Macro Settings window."
                      className="h-auto w-full"
                      width={624}
                      height={235}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Awards Section */}
          <section className="pt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <div className="flex justify-center">
                  <Image
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos."
                    className="mx-auto h-auto max-w-full"
                    width={1024}
                    height={128}
                  />
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
