import { absoluteUrl, indexable } from '@/lib/seo.mjs';

export const dynamic = 'force-static';
export default function robots() {
  // Leave crawling allowed so preview noindex directives can be read.
  return { rules: { userAgent: '*', allow: '/' }, ...(indexable ? { sitemap: absoluteUrl('/sitemap.xml') } : {}) };
}
