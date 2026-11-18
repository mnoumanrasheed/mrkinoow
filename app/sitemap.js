import { absoluteUrl, indexable } from '@/lib/seo.mjs';
import { seoRoutes } from '@/lib/seoRoutes';

export const dynamic = 'force-static';
export default function sitemap() {
  return indexable ? seoRoutes.map(path => ({ url: absoluteUrl(path) })) : [];
}
