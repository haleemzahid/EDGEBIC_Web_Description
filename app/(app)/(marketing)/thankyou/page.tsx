import Link from 'next/link';
import Image from 'next/image';

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-start gap-8 md:flex-row">
          {/* Image on left */}
          <div className="w-full md:w-1/2">
            <Image
              src="/images/Edgebic/2022-10/thankyou.jpg"
              alt="Thank You"
              width={500}
              height={375}
              className="h-auto w-full"
              loading="lazy"
            />
          </div>

          {/* Text on right */}
          <div className="w-full md:w-1/2">
            <h1 className="mb-4 text-3xl font-bold">
              Thank you for your interest
            </h1>

            <p className="mb-4">
              We will contact you to discuss your scheduling application in complete detail.
            </p>

            <p className="mb-4">
              You are welcome to send sample data at anytime to take advantage of our unique demoing approach – proving the solution.
            </p>

            <p className="mb-4">
              Send data or post questions anytime to{' '}
              <Link
                href="mailto:US@usersolutions.mystagingwebsite.com"
                className="text-sky-500 hover:underline"
              >
                US@usersolutions.mystagingwebsite.com
              </Link>{' '}
              or at{' '}
              <Link
                href="tel:248.486.1934"
                className="text-sky-500 hover:underline"
              >
                248.486.1934
              </Link>
            </p>

            <p className="mb-4">Kindest Regards,</p>

            <p className="text-sky-500">User Solutions, Inc.</p>
            <p className="text-sky-500">Since 1991 – Manufacturing Software made easy!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
