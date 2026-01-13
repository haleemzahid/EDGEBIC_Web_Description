import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

interface ProductProps {
  name: string;
  singleUserPrice: string;
  fiveUserPrice: string;
  icon: string;
  link: string;
  description?: string;
}

const ProductCard = ({
  name,
  singleUserPrice,
  fiveUserPrice,
  icon,
  link,
  description
}: ProductProps) => (
  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
    <div className="mb-4 text-center">
      <Image
        src={icon}
        alt="Excel icon"
        width={48}
        height={48}
        className="mx-auto mb-3"
      />
      <h3 className="mb-2 text-xl font-bold text-gray-800">{name}</h3>
      {description && (
        <p className="mb-4 text-sm text-gray-600">{description}</p>
      )}
    </div>

    <div className="space-y-4">
      <div className="rounded border p-4">
        <h4 className="font-semibold text-gray-700">Single User</h4>
        <p className="text-2xl font-bold text-blue-600">{singleUserPrice}</p>
      </div>

      <div className="rounded border p-4">
        <h4 className="font-semibold text-gray-700">Five Users</h4>
        <p className="text-2xl font-bold text-blue-600">{fiveUserPrice}</p>
      </div>
    </div>

    <div className="mt-6">
      <Link
        href={link}
        className="block w-full rounded bg-blue-600 px-4 py-3 text-center text-white transition-colors hover:bg-blue-700"
      >
        Info/Buy
      </Link>
    </div>
  </div>
);

export default function ShopPage() {
  const products = [
    {
      name: 'Spreadsheet Scheduler',
      singleUserPrice: '$39',
      fiveUserPrice: '$78',
      icon: '/images/Edgebic/2022-09/excelicon.png',
      link: '/spreadsheet-scheduler'
    },
    {
      name: 'Spreadsheet QC',
      singleUserPrice: '$39',
      fiveUserPrice: '$78',
      icon: '/images/Edgebic/2022-09/excelicon.png',
      link: '/spreadsheet-qc'
    },
    {
      name: 'Workcell Planner',
      singleUserPrice: '$39',
      fiveUserPrice: '$78',
      icon: '/images/Edgebic/2022-09/excelicon.png',
      link: '/workcell-planner'
    },
    {
      name: 'Operations Manager',
      singleUserPrice: '$5-$39',
      fiveUserPrice: '$10-$78',
      icon: '/images/Edgebic/2022-09/excelicon.png',
      link: '/operations-manager'
    },
    // {
    //   name: 'Workcenter for XL',
    //   singleUserPrice: '$5-$39',
    //   fiveUserPrice: '$10-$78',
    //   icon: '/images/Edgebic/2022-09/excelicon.png',
    //   link: '/workcenter-schedulerxl'
    // },
    {
      name: 'Resource Manager for Excel',
      singleUserPrice: '$5-$39',
      fiveUserPrice: '$10-$78',
      icon: '/images/Edgebic/2022-09/excelicon.png',
      link: '/resource-manager-for-excel-2'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 py-6 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-center text-4xl font-bold">
            Excel Applications
          </h1>
          <p className="mb-6 text-center text-xl">
            Choose the product that best suits your companies needs by using our
            product matrix.
          </p>
          <div className="text-center">
            <Link
              href="/product-downloads"
              className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
            >
              Free Trial & Samples
            </Link>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
            />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-6 shadow">
              <h3 className="mb-2 font-bold text-gray-800">
                "Best choice for MRP and project management software"
              </h3>
              <p className="mb-4 text-gray-600">– Sleepmaster Ltd</p>
              <Link
                href="/sleepmaster-ltd"
                className="text-blue-600 hover:underline"
              >
                Read More
              </Link>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 shadow">
              <h3 className="mb-2 font-bold text-gray-800">
                "Manufacturing scheduling software with fantastic support"
              </h3>
              <p className="mb-4 text-gray-600">– Cook Compression</p>
              <Link
                href="/cook-compression"
                className="text-blue-600 hover:underline"
              >
                Read More
              </Link>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 shadow">
              <h3 className="mb-2 font-bold text-gray-800">
                "Easy ERP add-on for manufacturing resource planning"
              </h3>
              <p className="mb-4 text-gray-600">– Incon Incorporated</p>
              <Link
                href="/incon-incorporate"
                className="text-blue-600 hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-blue-50 py-6">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            Want to get your production in the groove?
          </h2>
          <p className="mb-6 text-xl text-gray-600">
            Watch this classic video and get your operations movin' and groovin'
            today!
          </p>
          <div className="mx-auto max-w-3xl">
            {/* Video placeholder - you can add actual video embed here */}
            <div className="flex h-64 items-center justify-center rounded-lg bg-gray-200">
              <p className="text-gray-600">
                Video content will be embedded here
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-blue-600 py-6 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">ABOUT US</h2>
          <p className="mb-2">us@usersolutions.com</p>
          <p className="mb-6">248.486.6365</p>

          <h3 className="mb-4 text-xl font-bold">PRODUCTS</h3>
          <div className="space-y-2">
            <Link
              href="/jsl-job-scheduler-lite"
              className="block hover:underline"
            >
              EDGEBIC
            </Link>
            <Link
              href="/resource-manager-db-2"
              className="block hover:underline"
            >
              Resource Manager DB
            </Link>
            <Link
              href="/edgebi"
              className="block hover:underline"
            >
              EDGEBIC
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
