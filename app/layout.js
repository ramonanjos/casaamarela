import { Karla } from 'next/font/google';
import './globals.css';

const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-karla',
});

export const metadata = {
  title: 'Ramon Anjos',
  description: 'Ramon Anjos — Product and Design Language System.',
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
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
