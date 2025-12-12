import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 py-6 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-center text-4xl font-bold">Teams</h1>
          <p className="text-center text-xl">
            About US Providing Advanced Planning Scheduling and Tracking
            Software
          </p>
        </div>
      </div>

      {/* Team Leaders Section */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          TEAM LEADERS (PRODUCT SUPPORT AND SALES)
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Jim Convis */}
          <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
            <div className="mb-4 text-center">
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/09/jim.png"
                alt="Jim Convis"
                width={150}
                height={150}
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold text-gray-800">Jim Convis</h3>
              <p className="text-sm text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-sm leading-relaxed text-gray-700">
              <p className="mb-3">
                In 1991, Jim Convis spun off User Solutions from Lotus where he
                was adapting Lotus 1-2-3 to better serve the manufacturing
                market. Starting with a series of simple templates (found in
                Operations Manager, still available today), he found folks
                wanted to use familiar tools (such as the spreadsheet) as the
                preferred method to solve common production scheduling issues.
              </p>
              <p className="mb-3">
                For over 25 years, Jim has tried to listen to what customers
                were asking for and developing an architecture to support all
                types of challenges in all sorts of environments. Jim has a BS
                in Applied Mathematics/Physics from University of Colorado and
                worked at GM/EDS implementing the first Micro-Processor Cell
                Controller back in the 80's.
              </p>
              <p>
                Prior to that, Jim worked as an Oil Driller in Oklahoma, Ranch
                Hand, Carpenter, and other interesting endeavors. With a vision
                statement of "Listen and Deliver" you could add 'guaranteed' to
                complete our philosophy on making you successful.
              </p>
            </div>
          </div>

          {/* Dennis */}
          <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
            <div className="mb-4 text-center">
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/09/Dennis.png"
                alt="Dennis"
                width={150}
                height={150}
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold text-gray-800">Dennis</h3>
              <p className="text-sm text-gray-600">Sales & Support</p>
            </div>
            <div className="text-sm leading-relaxed text-gray-700">
              <p className="mb-3">
                Dennis graduated from the University of Arkansas at Fayetteville
                with a degree in Industrial Management. The first twenty years
                of his career were in Industrial Engineering and manufacturing
                management. He learned the needs and requirements of various
                industries and sectors.
              </p>
              <p>
                The last twenty years of his career have been spent in the
                manufacturing software industry where he applied many different
                experiences of solutions for selecting, selling, implementing,
                training, consulting and using software. Dennis' primary goal
                through the years has been to combine Texas Hospitality with
                industry expertise to help customers tackle their most pressing
                issues and have as much fun as possible doing it.
              </p>
            </div>
          </div>

          {/* Bob Russell */}
          <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
            <div className="mb-4 text-center">
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/09/Russell.png"
                alt="Bob Russell"
                width={150}
                height={150}
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold text-gray-800">Bob Russell</h3>
              <p className="text-sm text-gray-600">Operations</p>
            </div>
            <div className="text-sm leading-relaxed text-gray-700">
              <p>
                Jeff graduated Summa Cum Laude (with highest honors) from
                California State University San Francisco after serving four
                years in the US Navy. For many decades, Jeff has been engaged
                exclusively in the manufacturing industry as buyer, production
                control manager, material planner, quality control manager,
                controller, operations manager, vice president of operations,
                and chief executive officer.
              </p>
            </div>
          </div>

          {/* Jeff */}
          <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
            <div className="mb-4 text-center">
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/09/Jeff.png"
                alt="Jeff"
                width={150}
                height={150}
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold text-gray-800">Jeff</h3>
              <p className="text-sm text-gray-600">Asia Operations Manager</p>
            </div>
            <div className="text-sm leading-relaxed text-gray-700">
              <p className="mb-3">
                Jeff graduated Summa Cum Laude (with highest honors) from
                California State University San Francisco after serving four
                years in the US Navy. For many decades, Jeff has been engaged
                exclusively in the manufacturing industry.
              </p>
              <p>
                In 1995, Jeff started his own business consulting company
                specializing in advising companies on how to best to apply
                computer systems in their operations as well as developing
                custom software solutions when necessary. Jeff manages the User
                Solutions SolverLution offering, which blends Higher Level
                Optimization techniques with Production Scheduling techniques.
                Jeff also directly manages customer sales and support throughout
                Asia.
              </p>
            </div>
          </div>

          {/* Jack Convis */}
          <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
            <div className="mb-4 text-center">
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/11/IMG_5910-1-150x150.png"
                alt="Jack Convis"
                width={150}
                height={150}
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold text-gray-800">Jack Convis</h3>
              <p className="text-sm text-gray-600">Social Media Manager</p>
            </div>
            <div className="text-sm leading-relaxed text-gray-700">
              <p>
                Jack graduated highschool in 2020 and has since been accepted
                into an exclusive software engineering program at Grand Circus
                in Detroit -- the program Jack is enrolled in had a narrow,
                eight-percent acceptance rate. Having built a subscriber base on
                YouTube of 7,000+ over a few years, he is an accomplished video
                editor & producer for various businesses.
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
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
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
