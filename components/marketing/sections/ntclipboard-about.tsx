'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Card, CardContent } from '@/components/ui/card';

export function NTClipboardAbout(): React.JSX.Element {
  const teamMembers = [
    {
      name: 'Jim Convis',
      title: 'Founder & CEO',
      image:
        '/images/Edgebic/2022-09/jim-150x150.png',
      description:
        "In 1991, Jim Convis spun off User Solutions from Lotus where he was adapting Lotus 1-2-3 to better serve the manufacturing market. Starting with a series of simple templates (found in Operations Manager, still available today), he found folks wanted to use familiar tools (such as the spreadsheet) as the preferred method to solve common production scheduling issues. For over 30+ years, Jim has tried to listen to what customers were asking for and developing an architecture to support all types of challenges in all sorts of environments. Jim has a BS in Applied Mathematics/Physics from University of Colorado and worked at GM/EDS implementing the first Micro-Processor Cell Controller back in the 80's.",
      philosophy:
        'With a vision statement of "Listen and Deliver" you could add \'guaranteed\' to complete our philosophy on making you successful.'
    },
    {
      name: 'Haleem Khan',
      title: 'Development Manager at User Solutions | CEO at Dawloom',
      link: 'https://www.dawloom.com/',
      fiverr: 'https://www.fiverr.com/haleemzahid',
      linkedin: 'https://www.linkedin.com/in/haleemzahid35/',
      facebook: 'https://www.facebook.com/haleem.zahid',
      image: '/images/Edgebic/partners/haleem-khan.png',
      description:
        'Haleem brings over a decade of software development experience and leads the company with expertise in .NET and custom software solutions. His deep technical knowledge combined with business acumen helps drive innovation and deliver high-quality solutions to clients.',
      philosophy:
        'Haleem believes in building robust, scalable software that solves real business problems and delivers lasting value to customers.'
    },
    {
      name: 'Mudasir Nadeem',
      title: 'Web Developer',
      image: '/images/MudasirNadeem.png',
      description:
        'Mudasir Nadeem is a versatile web developer with expertise in front-end and back-end technologies, helping businesses build dynamic, responsive websites. His skills span modern frameworks and technologies that enable seamless user experiences.',
      philosophy:
        'Mudasir Nadeem is passionate about creating clean, efficient code and staying current with the latest web development trends and best practices.'
    },
    {
      name: 'Shahid Khan',
      title: '.NET Senior Developer',
      image: '/images/Edgebic/partners/shahid-khan.png',
      description:
        'Shahid is a highly skilled .NET developer with extensive experience building scalable and high-performance applications for businesses of all sizes.',
      philosophy:
        'Shahid believes in writing clean, maintainable code that stands the test of time and delivers exceptional value to clients.'
    },
    {
      name: 'Hamza Khan',
      title: '.NET Desktop & Mobile Developer',
      image: '/images/Edgebic/partners/hamza-khan.jpg',
      description:
        'Hamza brings 5+ years of experience in developing desktop and mobile applications using .NET technologies, providing seamless user experiences.',
      philosophy:
        'Hamza is dedicated to creating intuitive applications that bridge the gap between powerful functionality and user-friendly design.'
    },
    {
      name: 'Dennis Johnson',
      title: 'Senior Solutions Consultant',
      image:
        '/images/Edgebic/2022-09/Dennis-150x150.png',
      description:
        'Dennis graduated from the University of Arkansas at Fayetteville with a degree in Industrial Management. The first twenty years of his career were in Industrial Engineering and manufacturing management. He learned the needs and requirements of various industries and sectors. The last twenty years of his career have been spent in the manufacturing software industry where he applied many different experiences of solutions for selecting, selling, implementing, training, consulting and using software.',
      philosophy:
        "Dennis' primary goal through the years has been to combine professional expertise with industry knowledge to help customers tackle their most pressing issues."
    },
    {
      name: 'Bob Russell',
      title: 'Operations Manager',
      image:
        '/images/Edgebic/2022-09/Russell-150x150.png',
      description:
        'Bob graduated Summa Cum Laude (with highest honors) from California State University San Francisco after serving four years in the US Navy. For many decades, Bob has been engaged exclusively in the manufacturing industry as buyer, production control manager, material planner, quality control manager, controller, operations manager, vice president of operations, and chief executive officer.',
      philosophy:
        'In 1995, Bob started his own business consulting company specializing in advising companies on how to best apply computer systems in their operations as well as developing custom software solutions when necessary.'
    },
    {
      name: 'Jeff Martinez',
      title: 'Technical Director & Asia Operations',
      image:
        '/images/Edgebic/2022-09/Jeff-150x150.png',
      description:
        'Jeff graduated Summa Cum Laude (with highest honors) from California State University San Francisco after serving four years in the US Navy. For many decades, Jeff has been engaged exclusively in the manufacturing industry across various roles from buyer to chief executive officer. Jeff manages the User Solutions SolverLution offering, which blends Higher Level Optimization techniques with Production Scheduling techniques.',
      philosophy:
        'Jeff also directly manages customer sales and support throughout Asia, bringing global perspective to manufacturing solutions.'
    },
    {
      name: 'Jack Convis',
      title: 'Social Media Manager',
      image:
        '/images/Edgebic/2022-11/IMG_5910-1-100x100.png',
      description:
        'Jack graduated high school in 2020 and has since been accepted into an exclusive software engineering program at Grand Circus in Detroit -- the program Jack is enrolled in had a narrow, eight-percent acceptance rate. Having built a subscriber base on YouTube of 7,000+ over a few years, he is an accomplished video editor & producer for various businesses.',
      philosophy:
        'Jack brings fresh digital marketing perspective and technical skills to help User Solutions connect with the next generation of manufacturing professionals.'
    }
  ];

  return (
    <GridSection hideVerticalGridLines>
      <div className="container pt-6">
        <SiteHeading
          title="Meet Our Team"
          description="The experts behind 30+ years of manufacturing software excellence"
        />

        {/* Team Members Section */}
        <div className="mt-8">
          <div className="space-y-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`!mt-5 flex flex-col items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
              >
                {/* Profile Image */}
                <div className="w-full lg:w-1/3">
                  <div className="mx-auto size-80 overflow-hidden rounded-full">
                    <div className="flex size-full items-center justify-center rounded-full bg-slate-200">
                      {member.image && (member.image.startsWith('http') || member.image.startsWith('/')) ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={300}
                          height={300}
                          className="size-full rounded-full object-cover"
                          unoptimized={member.image.startsWith('http')}
                        />
                      ) : (
                        <Users className="size-24 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="w-full text-center lg:w-2/3 lg:text-left">
                  <div className="rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 p-8">
                    <h3 className="mb-2 text-2xl font-bold text-slate-900">
                      {member.name}
                    </h3>
                    <p className="mb-4 text-lg font-medium text-orange-600">
                      {member.title}
                      {member.link && (
                        <>
                          {' '}
                          <Link
                            href={member.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            dawloom.com
                          </Link>
                        </>
                      )}
                      {member.fiverr && (
                        <>
                          {' | '}
                          <Link
                            href={member.fiverr}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline"
                          >
                            Fiverr
                          </Link>
                        </>
                      )}
                      {member.linkedin && (
                        <>
                          {' | '}
                          <Link
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline"
                          >
                            LinkedIn
                          </Link>
                        </>
                      )}
                      {member.facebook && (
                        <>
                          {' | '}
                          <Link
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Facebook
                          </Link>
                        </>
                      )}
                    </p>
                    <p className="mb-4 text-slate-700">
                      {member.description}
                    </p>
                    {member.philosophy && (
                      <blockquote className="border-l-4 border-orange-500 bg-orange-50 p-4 italic text-slate-800">
                        {member.philosophy}
                      </blockquote>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GridSection>
  );
}
