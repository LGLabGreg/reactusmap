import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
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
  title: 'Next.js Tailwind',
  description: 'Next.js Tailwind',
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
      </body>
    </html>
  );
}
