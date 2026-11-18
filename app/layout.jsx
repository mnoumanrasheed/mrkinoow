import './globals.css';
import { siteUrl, indexable } from '@/lib/seo.mjs';

export const metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: 'Mr. Kinoow', template: '%s | Mr. Kinoow' },
  applicationName: 'Mr. Kinoow',
  robots: { index: indexable, follow: true },
  icons: { icon: '/images/favicon.svg' },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#07140e' };

export default function RootLayout({ children }) {
  return <html lang="en-PK"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/></head><body>{children}</body></html>;
}
