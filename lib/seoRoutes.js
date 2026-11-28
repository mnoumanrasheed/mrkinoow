import { siteConfig } from './siteConfig.js';
import { citrusPages } from './seoContent.js';

export const seoRoutes = ['/', '/our-story', ...Object.entries(citrusPages).filter(([, page]) => !page.legacy).map(([slug]) => `/${slug}`), ...siteConfig.products.map(product => `/products/${product.id}`)];
