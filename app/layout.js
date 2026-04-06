import './globals.css';

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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
