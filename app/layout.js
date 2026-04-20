import { Karla } from 'next/font/google';
import './globals.css';

const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-karla',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`)
  || 'https://casaamarela-inky.vercel.app';

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
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ramon Anjos — Product and Design Language System',
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
    images: ['/og-image.png'],
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
      </head>
      <body>{children}</body>
    </html>
  );
}
