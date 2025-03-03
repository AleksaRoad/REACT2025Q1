import { type ReactNode } from 'react';

import '@/styles/globals.css';

import type { Metadata, Viewport } from 'next';

import { ThemeProvider, ReduxProvider } from '@/shared';

export const metadata: Metadata = {
  authors: [{ name: 'AleksaRoad', url: 'https://github.com/AleksaRoad/' }],
  icons: {
    apple: [
      {
        sizes: '180x180',
        type: 'image/webp',
        url: '/favicon/apple-touch-icon.webp',
      },
    ],
    icon: [
      {
        sizes: '96x96',
        type: 'image/webp',
        url: '/favicon/favicon-96x96.webp',
      },
      { type: 'image/svg+xml', url: '/favicon/favicon.svg' },
    ],
    shortcut: ['/favicon/favicon.ico'],
  },
  keywords: ['react', 'Next.js', 'Rick and Morty'],
  manifest: '/favicon/site.webmanifest',
  title: 'React Components',
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: 'device-width',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
