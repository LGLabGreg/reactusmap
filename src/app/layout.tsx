import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { DM_Sans, Roboto_Mono } from 'next/font/google';

import MainHeader from '@/app/main-header';

import './globals.scss';

const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'React United States SVG Map',
  description:
    'Easily create stunning interactive maps of the United States using this React SVG component. The component is coded using Typescript but can be used in plain Javascript React projects.',
  openGraph: {
    title: 'React United States SVG Map',
    description:
      'Easily create stunning interactive maps of the United States using this React SVG component. The component is coded using Typescript but can be used in plain Javascript React projects.',
    url: 'https://reactusmap.vercel.app/',
    siteName: 'React United States Map',
    images: [
      {
        url: 'https://reactusmap.vercel.app/images/react-united-states-map.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dm_sans.variable} ${roboto_mono.variable}`}>
      <body>
        <MainHeader />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
