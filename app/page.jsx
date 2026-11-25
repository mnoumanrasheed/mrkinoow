import HomeExperience from '@/components/HomeExperience';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/lib/siteConfig';
import { absoluteUrl, pageMetadata, siteUrl } from '@/lib/seo.mjs';

export const metadata = pageMetadata({ title: 'Royal & Golden Kinnow Collections', description: 'Discover Mr. Kinoow’s two 10 kg kinnow collections from our own farm, thoughtfully packed with free delivery across Pakistan.', path: '/' });

export default function HomePage() {
  const graph = siteUrl ? {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Organization', '@id': absoluteUrl('/#organization'), name: siteConfig.brand, url: absoluteUrl('/'), ...(siteConfig.email ? { email: siteConfig.email } : {}), sameAs: [siteConfig.instagram, siteConfig.facebook].filter(Boolean) },
      { '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: siteConfig.brand, url: absoluteUrl('/'), inLanguage: 'en-PK', publisher: { '@id': absoluteUrl('/#organization') } },
    ],
  } : null;
  return <><JsonLd data={graph}/><HomeExperience /></>;
}
