import './globals.css';

export const metadata = {
  title: { default: 'Mr. Kinoow | A Taste of Sunshine', template: '%s | Mr. Kinoow' },
  description: 'Experience the cinematic world of Mr. Kinoow, a premium kinnow brand from Punjab, Pakistan.',
  icons: { icon: '/images/favicon.svg' },
  openGraph: { title: 'Mr. Kinoow', description: 'From our orchards to your doorstep.', images: ['/images/hero-fruit.webp'] },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#07140e' };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
