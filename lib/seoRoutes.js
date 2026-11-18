import { siteConfig } from './siteConfig.js';
import { citrusPages } from './seoContent.js';

export const seoRoutes = ['/', '/our-story', ...Object.keys(citrusPages).map(slug => `/${slug}`), ...siteConfig.products.map(product => `/products/${product.id}`)];
