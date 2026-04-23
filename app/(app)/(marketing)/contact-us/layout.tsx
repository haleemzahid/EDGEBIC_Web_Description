import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/urls/get-base-url';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with User Solutions for production planning and scheduling software inquiries. Schedule a demo or discuss your manufacturing needs.',
  alternates: {
    canonical: `${getBaseUrl()}/contact-us`
  }
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
