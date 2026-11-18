// Build-time only. Never infer the public origin from preview hosting or GitHub.
export function parseSiteUrl(value = '') {
  if (!value.trim()) return null;
  let url;
  try { url = new URL(value.trim()); } catch { throw new Error('SITE_URL must be a complete HTTPS origin.'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.port || url.pathname !== '/' || url.search || url.hash || !url.hostname.includes('.') || /^(localhost|127\.)/.test(url.hostname)) {
    throw new Error('SITE_URL must be an HTTPS origin without a path, port, credentials, query or fragment.');
  }
  return url.origin;
}

export const siteUrl = parseSiteUrl(process.env.SITE_URL);
export const indexable = Boolean(siteUrl) && process.env.SEO_INDEXABLE !== 'false';
if (process.env.SEO_REQUIRE_SITE_URL === 'true' && !siteUrl) {
  throw new Error('Set the confirmed SITE_URL before building for public deployment.');
}
export const absoluteUrl = (path) => siteUrl ? new URL(path, `${siteUrl}/`).href : undefined;

export function pageMetadata({ title, description, path, image = '/images/hero-fruit.webp', imageAlt = 'Citrus fruit with green leaves — Mr. Kinoow brand imagery' }) {
  const fullTitle = `${title} | Mr. Kinoow`;
  const url = absoluteUrl(path);
  const images = siteUrl ? [{ url: absoluteUrl(image), alt: imageAlt }] : [];
  return {
    title: { absolute: fullTitle }, description,
    alternates: url ? { canonical: url } : {},
    robots: { index: indexable, follow: true, ...(indexable ? { googleBot: { index: true, follow: true, 'max-image-preview': 'large' } } : {}) },
    openGraph: { type: 'website', locale: 'en_PK', siteName: 'Mr. Kinoow', title: fullTitle, description, ...(url ? { url } : {}), images },
    twitter: { card: images.length ? 'summary_large_image' : 'summary', title: fullTitle, description, images: images.map(item => item.url) },
  };
}

export function breadcrumbs(items) {
  if (!siteUrl) return null;
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, path], index) => ({ '@type': 'ListItem', position: index + 1, name, item: absoluteUrl(path) })) };
}
