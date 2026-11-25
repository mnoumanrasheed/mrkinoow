import './globals.css';
import { siteUrl, indexable } from '@/lib/seo.mjs';
import PremiumLoader from '@/components/PremiumLoader';

export const metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: 'Mr. Kinoow', template: '%s | Mr. Kinoow' },
  applicationName: 'Mr. Kinoow',
  robots: { index: indexable, follow: true },
  icons: { icon: '/images/favicon.svg' },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#07140e' };

export default function RootLayout({ children }) {
  const loaderBootstrap = `try{document.documentElement.dataset.loader=sessionStorage.getItem('mrkinoow-premium-loader')?'seen':'show'}catch(e){document.documentElement.dataset.loader='show'}`;
  return <html lang="en-PK" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:loaderBootstrap}}/><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/></head><body><PremiumLoader/>{children}</body></html>;
}
