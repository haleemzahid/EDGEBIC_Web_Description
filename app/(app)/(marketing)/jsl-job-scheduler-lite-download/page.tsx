import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

import { JSLDownloadForm } from '@/components/marketing/sections/jsl-download-form';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('EDGEBIC   Download'),
  description:
    'Download EDGEBIC   - 60 day fully functional trial. Production scheduling software with Excel integration and .NET framework support.'
};

export default function JSLDownloadPage(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4 pt-6">
      {/* Page Badge */}
      <div className="mb-6 text-center">
        <Badge
          variant="outline"
          className="h-8 rounded-full px-3 text-sm font-medium shadow-sm"
        >
          Download
        </Badge>
      </div>
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h1 className="mb-6 text-4xl font-bold">
          <a
            href="https://www.usersolutions.com/wp-content/uploads/2022/10/JSLsetup.zip"
            download="JSLsetup.zip"
            className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
          >
            EDGEBIC Download
          </a>
        </h1>
        <p className="text-xl font-semibold text-green-600">
          60 day fully functional trial
        </p>
      </div>

      {/* System Requirements */}
      <div className="mb-6 text-center">
        <div className="inline-block rounded-lg bg-blue-50 px-6 py-4">
          <p className="text-sm font-medium text-blue-800">
            <strong>System Requirements:</strong> Excel installed (used as
            report writer).
          </p>
        </div>
      </div>

      {/* Form Introduction */}
      <div className="mb-6 text-center">
        <p className="text-lg text-muted-foreground">
          Please fill the form to go to download link page.
        </p>
      </div>

      {/* Download Form */}
      <div className="mb-6">
        <JSLDownloadForm />
      </div>

      {/* Installation Instructions */}
      <div className="mb-6 rounded-lg bg-gray-50 p-8">
        <h2 className="mb-6 text-2xl font-semibold">
          Installation Instructions
        </h2>

        <div className="space-y-4 text-gray-700">
          <p>
            Then, download and install <strong>JSLsetup.exe</strong> this
            installs to C:\ProgramFiles In this part of installation, it checks
            to see your current .Net framework and stops until you upgrade to
            more current .Net framework (this is automatically installed with
            windows 10 so you are probably fine.
          </p>

          <p>
            At the end of installing JSL the system will automatically run and
            add shortcut to desktop. There will be sample data in JSL preloaded
            but you will be able to edit, add, delete directly and/or use data
            import to configure JSL. That is what the{' '}
            <strong>ImportsBack.xlsx</strong> is for, showing you the format for
            creating and importing content quickly.
          </p>
        </div>

        {/* Folder Structure Image */}
        <div className="mt-8 text-center">
          <Image
            src="https://www.usersolutions.com/wp-content/uploads/2022/10/blck.png"
            alt="Screenshot of EDGEBIC folder with files"
            width={600}
            height={400}
            className="mx-auto rounded-lg border shadow-md"
          />
          <p className="mt-4 text-sm text-muted-foreground">
            EDGEBIC folder structure after installation
          </p>
        </div>

        <div className="mt-6 space-y-4 text-gray-700">
          <p>
            The database will default to <strong>C:\ProgramData\EDGEBIC</strong>
          </p>

          <p>
            The third file is an Excel file for quickly loading data. That can
            be saved anywhere you choose. Also, you can save the database (or
            you might have more than one anywhere you have read write access
            to).
          </p>
        </div>
      </div>

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
                alt="Collection of industry and business awards logos"
                width={1024}
                height={128}
                className="mx-auto h-auto max-w-full"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
