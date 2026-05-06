import { Karla } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import SeoJsonLd from './components/SeoJsonLd.js';
import { siteUrl, siteDescription, siteTagline } from '../lib/site.js';

const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-karla',
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTagline,
    template: '%s | Ramon Anjos',
  },
  description: siteDescription,
  keywords: [
    'Ramon Anjos',
    'design de produto',
    'UX',
    'UI',
    'design system',
    'language system',
    'Graphic Design',
    'Nubank',
    'product design',
    'Digital',
    'Brasil',
  ],
  authors: [{ name: 'Ramon Anjos', url: siteUrl }],
  creator: 'Ramon Anjos',
  publisher: 'Ramon Anjos',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: siteTagline,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Ramon Anjos',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ramon Anjos — product, UX & design language system',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 1080,
        height: 1080,
        alt: 'Ramon Anjos — product, UX & design language system',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-story.jpg',
        width: 1080,
        height: 1920,
        alt: 'Ramon Anjos — product, UX & design language system',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTagline,
    description: siteDescription,
    images: ['/og-image.jpg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbf8f3',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={karla.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "if('scrollRestoration' in history) history.scrollRestoration='manual';",
          }}
        />
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link
          rel="preload"
          href="/fonts/ABCArizonaText-Thin-Trial.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SeoJsonLd />
        <svg
          aria-hidden="true"
          focusable="false"
          style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        >
          <defs>
            <filter id="sharpen" x="0" y="0" width="100%" height="100%">
              <feConvolveMatrix
                order="3"
                preserveAlpha="true"
                kernelMatrix="0 -0.3 0 -0.3 2.2 -0.3 0 -0.3 0"
              />
            </filter>
          </defs>
        </svg>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
