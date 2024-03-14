import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.scss';
import MainHeader from '@/components/main-header';

const font = DM_Sans({ subsets: ['latin'] });

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
    <html lang="en">
      <body className={font.className}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
