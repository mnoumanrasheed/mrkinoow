import HomeExperience from '@/components/HomeExperience';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/lib/siteConfig';
import { absoluteUrl, pageMetadata, siteUrl } from '@/lib/seo.mjs';

export const metadata = pageMetadata({ title: 'Fresh Oranges & Premium Kinnow Pakistan', description: 'Explore fresh oranges, premium kinnow and Malta from Mr. Kinoow. Compare 10 kg citrus boxes and prepare an order enquiry in Pakistan.', path: '/' });

export default function HomePage() {
  const graph = siteUrl ? {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Organization', '@id': absoluteUrl('/#organization'), name: siteConfig.brand, url: absoluteUrl('/'), ...(siteConfig.email ? { email: siteConfig.email } : {}), sameAs: [siteConfig.instagram, siteConfig.facebook].filter(Boolean) },
      { '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: siteConfig.brand, url: absoluteUrl('/'), inLanguage: 'en-PK', publisher: { '@id': absoluteUrl('/#organization') } },
    ],
  } : null;
  return <><JsonLd data={graph}/><HomeExperience /></>;
}
