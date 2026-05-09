import { withContentCollections } from '@content-collections/next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { createSecureHeaders } from 'next-secure-headers';

const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZER === 'true'
});

const svgLoader = {
  loader: '@svgr/webpack',
  options: {
    svgoConfig: {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false // Preserve the viewBox attribute
            }
          }
        }
      ]
    }
  }
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: [svgLoader],
          as: '*.js'
        }
      }
    },
    staticGenerationMaxConcurrency: 4,
    staticGenerationMinPagesPerWorker: 1
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me'
      },
      {
        protocol: 'https',
        hostname: 'usersolutions.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'lifecore.com'
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com'
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com'
      },
      {
        protocol: 'https',
        hostname: 'www.viking-forge.com'
      },
      {
        protocol: 'https',
        hostname: 'www.dawloom.com'
      },
      {
        protocol: 'https',
        hostname: 'payloadcms-theta.vercel.app'
      }
    ]
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/llms.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400'
          }
        ]
      },
      {
        source: '/llms-full.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400'
          }
        ]
      },
      {
        locale: false,
        source: '/(.*)',
        headers: [
          ...createSecureHeaders({
            frameGuard: 'deny',
            noopen: 'noopen',
            nosniff: 'nosniff',
            xssProtection: 'sanitize',
            forceHTTPSRedirect: [
              true,
              { maxAge: 60 * 60 * 24 * 360, includeSubDomains: true }
            ],
            referrerPolicy: 'strict-origin-when-cross-origin'
          }),
          // Cross-Origin-Opener-Policy for better security
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          },
          // Cross-Origin-Embedder-Policy
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none'
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://calendly.com https://www.google.com https://www.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://*.vercel.app https://www.google.com https://www.googleapis.com",
              "media-src 'self' https://usersolutions.com",
              "frame-src 'self' https://calendly.com https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://www.google.com https://recaptcha.google.com",
              "manifest-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        // Evergreen URL refresh: year-locked URL → evergreen slug so the post
        // can be refreshed annually without losing backlinks or SERP equity.
        source: '/top-10-manufacturing-kpis-in-2024',
        destination: '/top-10-manufacturing-kpis',
        permanent: true
      },
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true
      },
      {
        source: '/incon-incorporate',
        destination: '/incon-incorporated',
        permanent: true
      },
      {
        source: '/job-scheduler-lite',
        destination: '/jsl-job-scheduler-lite',
        permanent: false
      },
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: false
      },
      {
        source: '/dashboard',
        destination: '/dashboard/home',
        permanent: false
      },
      {
        source: '/dashboard/settings',
        destination: '/dashboard/settings/account/profile',
        permanent: false
      },
      {
        source: '/dashboard/settings/account',
        destination: '/dashboard/settings/account/profile',
        permanent: false
      },
      {
        source: '/dashboard/settings/organization',
        destination: '/dashboard/settings/organization/information',
        permanent: false
      },
      // Fix redirect pages that were incorrectly in sitemap
      {
        source: '/privacy-policy',
        destination: '/privacy-policy3',
        permanent: true
      },
      {
        source: '/product-2',
        destination: '/production-scheduling-products',
        permanent: true
      },
      {
        source: '/resource-manager-db-in-depth',
        destination: '/resource-manager-db-2',
        permanent: true
      },
      {
        source: '/workcenter-scheduler-xl-in-depth',
        destination: '/workcenter-schedulerxl',
        permanent: true
      },
      {
        source: '/small-manufacturer-and-job-shop-uses-planning-scheduling-and-tracking-tools-from-user-solutions-inc-to-become-more-efficient-and-competitive',
        destination: '/success-stories',
        permanent: true
      },
      // Fix glossary canonical conflicts: Google chose /blog/glossary-X over /blog/glossary/X
      // Redirect hyphen form → slash form so Google consolidates to the sitemap canonical
      {
        source: '/blog/glossary-engineer-to-order',
        destination: '/blog/glossary/engineer-to-order',
        permanent: true
      },
      {
        source: '/blog/glossary-inbound-logistics',
        destination: '/blog/glossary/inbound-logistics',
        permanent: true
      },
      {
        source: '/blog/glossary-preventive-action',
        destination: '/blog/glossary/preventive-action',
        permanent: true
      },
      {
        source: '/blog/glossary-priority-rules',
        destination: '/blog/glossary/priority-rules',
        permanent: true
      },
      {
        source: '/blog/glossary-pull-system',
        destination: '/blog/glossary/pull-system',
        permanent: true
      },
      {
        source: '/blog/glossary-r-chart',
        destination: '/blog/glossary/r-chart',
        permanent: true
      },
      {
        source: '/blog/glossary-split-operations',
        destination: '/blog/glossary/split-operations',
        permanent: true
      },
      {
        source: '/blog/glossary-time-phased-order',
        destination: '/blog/glossary/time-phased-order',
        permanent: true
      },
      {
        source: '/blog/glossary-unplanned-downtime',
        destination: '/blog/glossary/unplanned-downtime',
        permanent: true
      }
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [svgLoader]
    });
    return config;
  }
};

// Apply all wrappers
const wrappedConfig = withContentCollections(bundleAnalyzerConfig(nextConfig));

// Force images configuration to prevent wrappers from overriding it
wrappedConfig.images = nextConfig.images;

console.log(
  'Next.js images config:',
  JSON.stringify(wrappedConfig.images, null, 2)
);

export default wrappedConfig;
