import * as React from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import {
  BookIcon,
  CalendarIcon,
  // BookOpenIcon,
  DownloadIcon,
  FileTextIcon,
  // MapIcon,
  MonitorIcon,
  NewspaperIcon,
  PackageIcon,
  VideoIcon,
  ZapIcon
} from 'lucide-react';

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon
} from '@/components/ui/brand-icons';
import { Routes } from '@/constants/routes';

export const MENU_LINKS = [
  {
    title: 'Home',
    description: 'Return to homepage',
    icon: <MonitorIcon className="size-5 shrink-0" />,
    href: Routes.Root,
    external: false
  },
  {
    title: 'Product',
    description: 'Our product offerings',
    icon: <PackageIcon className="size-5 shrink-0" />,
    href: Routes.ProductionPlanning,
    external: false
  },
  {
    title: 'Success Stories',
    description: 'Customer testimonials and case studies',
    icon: <ZapIcon className="size-5 shrink-0" />,
    href: Routes.SuccessStories,
    external: false
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'Applications/Solutions',
        description: 'Resource management insights and best practices',
        icon: <BookIcon className="size-5 shrink-0" />,
        href: Routes.ResourceManagement,
        external: false
      },
      // {
      //   title: 'Blog',
      //   description: 'Insights, articles, and updates',
      //   icon: <BookIcon className="size-5 shrink-0" />,
      //   href: Routes.Blog,
      //   external: false
      // },
      {
        title: 'Product Video',
        description: 'Watch product demonstrations and tutorials',
        icon: <VideoIcon className="size-5 shrink-0" />,
        href: Routes.ProductVideos,
        external: false
      }
    ]
  },
  {
    title: 'About',
    items: [
      {
        title: 'Mission',
        description: 'Our mission and vision for the future',
        icon: <BookIcon className="size-5 shrink-0" />,
        href: Routes.Mission,
        external: false
      },
      {
        title: 'Team',
        description: 'Meet the people behind our success',
        icon: <BookIcon className="size-5 shrink-0" />,
        href: Routes.About,
        external: false
      },
      {
        title: 'History',
        description: 'Our journey and company heritage',
        icon: <BookIcon className="size-5 shrink-0" />,
        href: Routes.History,
        external: false
      }
    ]
  },
  // {
  //   title: 'News',
  //   description: 'Latest news and updates',
  //   icon: <NewspaperIcon className="size-5 shrink-0" />,
  //   href: Routes.News,
  //   external: false
  // },
  // {
  //   title: 'Excel Templates',
  //   description: 'Excel applications for manufacturing scheduling',
  //   icon: <FileTextIcon className="size-5 shrink-0" />,
  //   href: Routes.ExcelTemplates,
  //   external: false
  // },
  // {
  //   title: 'Free Trial and Samples',
  //   description: 'Download free trials and samples of our software',
  //   icon: <DownloadIcon className="size-5 shrink-0" />,
  //   href: Routes.ProductDownloads,
  //   external: false
  // },
  {
    title: 'Contact US',
    description: 'Reach out for assistance',
    icon: <PaperPlaneIcon className="size-5 shrink-0" />,
    href: Routes.Contact,
    external: false
  }
];

export const FOOTER_LINKS: Array<{
  title: string;
  links: Array<{
    name: string;
    href: string;
    external: boolean;
  }>;
}> = [
    {
      title: 'Success Stories',
      links: [
        {
          name: 'All Success Stories',
          href: Routes.SuccessStories,
          external: false
        },
        { name: 'Sleepmaster Ltd', href: Routes.SleepmasterLtd, external: false },
        {
          name: 'Cook Compression',
          href: Routes.CookCompression,
          external: false
        },
        {
          name: 'Incon Incorporated',
          href: Routes.InconIncorporated,
          external: false
        }
      ]
    },
    {
      title: 'Products',
      links: [
        { name: 'EDGEBI', href: Routes.Edgebi, external: false },
        // {
        //   name: 'Operations Manager',
        //   href: Routes.OperationsManager,
        //   external: false
        // },
        // { name: 'Excel Templates', href: Routes.ExcelTemplates, external: false },
        // {
        //   name: 'Product Downloads',
        //   href: Routes.ProductDownloads,
        //   external: false
        // },
        { name: 'Product Videos', href: Routes.ProductVideos, external: false }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: Routes.About, external: false },
        { name: 'Mission Statement', href: Routes.Mission, external: false },
        { name: 'Values', href: Routes.Values, external: false },
        { name: 'Company History', href: Routes.History, external: false }
        // { name: 'Partners', href: Routes.Partners, external: false }
      ]
    }
  ];
export const SOCIAL_LINKS = [
  {
    name: 'X (formerly Twitter)',
    href: '#',
    icon: <XIcon className="size-4 shrink-0" />
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: <LinkedInIcon className="size-4 shrink-0" />
  },
  {
    name: 'Facebook',
    href: '#',
    icon: <FacebookIcon className="size-4 shrink-0" />
  },
  {
    name: 'Instagram',
    href: '#',
    icon: <InstagramIcon className="size-4 shrink-0" />
  },
  {
    name: 'TikTok',
    href: '#',
    icon: <TikTokIcon className="size-4 shrink-0" />
  }
];

export const DOCS_LINKS = [
  {
    title: 'Getting Started',
    icon: <PackageIcon className="size-4 shrink-0 text-muted-foreground" />,
    items: [
      {
        title: 'Introduction',
        href: '/docs',
        items: []
      },
      {
        title: 'Dependencies',
        href: '/docs/dependencies',
        items: []
      }
    ]
  },
  {
    title: 'Guides',
    icon: <BookIcon className="size-4 shrink-0 text-muted-foreground" />,
    items: [
      {
        title: 'Using MDX',
        href: '/docs/using-mdx',
        items: []
      }
    ]
  }
];
