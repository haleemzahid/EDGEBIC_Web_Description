'use client';

import React from 'react';
import Image from 'next/image';
import {
  Award,
  Handshake,
  Heart,
  Lightbulb,
  Shield,
  Users
} from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Card, CardContent } from '@/components/ui/card';

export function NTClipboardCoreValues(): React.JSX.Element {
  const values = [
    {
      icon: <Heart className="size-8" />,
      title: 'Customer-Centric',
      description:
        'Your success is our priority. We listen, understand, and deliver solutions that truly fit your needs.',
      color: 'from-red-100 to-pink-100',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      icon: <Users className="size-8" />,
      title: 'Partnership Approach',
      description:
        'We work alongside you as partners, not just vendors. Your challenges become our challenges to solve together.',
      color: 'from-blue-100 to-cyan-100',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: <Lightbulb className="size-8" />,
      title: 'Innovation & Adaptability',
      description:
        'We embrace new technologies while respecting proven methods, creating solutions that evolve with your business.',
      color: 'from-yellow-100 to-orange-100',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      icon: <Shield className="size-8" />,
      title: 'Reliability & Trust',
      description:
        'Over 30 years of consistent delivery. When we commit, we deliver. Your trust is our most valuable asset.',
      color: 'from-green-100 to-emerald-100',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: <Award className="size-8" />,
      title: 'Quality Excellence',
      description:
        "We don't just meet standards, we set them. Every solution reflects our commitment to manufacturing excellence.",
      color: 'from-purple-100 to-violet-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: <Handshake className="size-8" />,
      title: 'Integrity & Transparency',
      description:
        'Honest communication, fair pricing, and transparent processes. We build relationships based on mutual respect.',
      color: 'from-indigo-100 to-blue-100',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    }
  ];

  return (
    <GridSection hideVerticalGridLines>
      <div className="container py-6">
        <SiteHeading
          title="What Drives Us Forward"
          description="The principles that have guided EDGEBI for over three decades"
        />

        <div className="mx-auto mt-8 max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={index}
                className={`rounded-3xl border bg-gradient-to-br p-8 ${value.color}`}
              >
                <div
                  className={`mb-4 inline-flex items-center justify-center rounded-full p-3 ${value.iconBg}`}
                >
                  <div className={value.iconColor}>{value.icon}</div>
                </div>

                <h3 className="mb-4 text-xl font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="text-slate-700">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 p-8">
              <blockquote className="text-xl font-semibold text-slate-900 md:text-2xl">
                "Our values aren't just words on a wall – they're the foundation
                of every solution we create and every relationship we build."
              </blockquote>
              <p className="mt-4 text-lg text-orange-600">— The EDGEBI Team</p>
            </div>
          </div>
        </div>
      </div>
    </GridSection>
  );
}
