import { Karla } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-karla',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ramonanjos.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'ramonanjos',
  description:
    'Ramon Anjos — Product and Design Language System. 15+ years of experience on UX and craft.',
  keywords: [
    'Graphic Design',
    'Design',
    'Product',
    'Communication',
    'UI',
    'UX',
    'Digital',
  ],
  authors: [{ name: 'Ramon Anjos' }],
  openGraph: {
    title: 'ramonanjos',
    description:
      'Ramon Anjos — Product and Design Language System. 15+ years of experience on UX and craft.',
    url: siteUrl,
    siteName: 'Ramon Anjos',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ramon Anjos — Product and Design Language System',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 1080,
        height: 1080,
        alt: 'Ramon Anjos — Product and Design Language System',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-story.jpg',
        width: 1080,
        height: 1920,
        alt: 'Ramon Anjos — Product and Design Language System',
        type: 'image/jpeg',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ramonanjos',
    description:
      'Ramon Anjos — Product and Design Language System. 15+ years of experience on UX and craft.',
    images: ['/og-image.jpg'],
  },
  other: {
    'Ramon Anjos': 'Graphic Design, Design, Product, Communication, UI, UX, Digital',
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
