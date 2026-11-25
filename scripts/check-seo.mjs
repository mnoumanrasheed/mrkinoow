import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd());
const { siteUrl, indexable, parseSiteUrl } = await import('../lib/seo.mjs');
const { seoRoutes } = await import('../lib/seoRoutes.js');
const { siteConfig } = await import('../lib/siteConfig.js');
const htmlFor = route => readFileSync(`out/${route === '/' ? 'index' : route.slice(1)}.html`, 'utf8');
const decode = text => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(match => attributes(match[0]));
const titles = new Set(), descriptions = new Set(), edges = new Map();
for (const route of seoRoutes) {
  const html = htmlFor(route);
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] || '');
  const metas = tags(html, 'meta');
  const meta = name => metas.find(item => item.name === name || item.property === name)?.content;
  const description = meta('description');
  assert(title.endsWith(' | Mr. Kinoow'), `${route}: title brand suffix`);
  assert(!titles.has(title), `${route}: duplicate title`); titles.add(title);
  assert(description && !descriptions.has(description), `${route}: missing/duplicate description`); descriptions.add(description);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: H1 count`);
  assert.equal(meta('og:title'), title); assert.equal(meta('twitter:title'), title);
  assert.equal(meta('og:description'), description); assert.equal(meta('twitter:description'), description);
  assert.equal(meta('og:locale'), 'en_PK');
  assert(meta('robots')?.includes(indexable ? 'index, follow' : 'noindex, follow'), `${route}: robots`);
  const canonicals = tags(html, 'link').filter(item => item.rel === 'canonical');
  assert.equal(canonicals.length, siteUrl ? 1 : 0, `${route}: canonical count`);
  if (siteUrl) {
    assert.equal(new URL(canonicals[0].href).href, new URL(route, siteUrl).href);
    assert.equal(new URL(meta('og:url')).href, new URL(canonicals[0].href).href);
    assert(meta('og:image')?.startsWith(siteUrl + '/images/'));
  } else {
    assert.equal(meta('og:url'), undefined); assert.equal(meta('og:image'), undefined);
    assert(!html.includes('http://localhost:3000'), `${route}: localhost metadata leak`);
  }
  const localLinks = tags(html, 'a').map(item => item.href).filter(href => href?.startsWith('/'));
  edges.set(route, localLinks.map(href => href.split('#')[0] || '/'));
  for (const href of localLinks) {
    const [path, fragment] = href.split('#');
    assert(seoRoutes.includes(path), `${route}: unknown internal link ${href}`);
    if (fragment) assert(htmlFor(path).includes(`id="${fragment}"`), `${route}: missing anchor ${href}`);
  }
  for (const img of tags(html, 'img')) {
    assert('alt' in img, `${route}: missing alt`);
    if (img.src.startsWith('/')) assert(existsSync(`public${img.src}`), `${route}: missing image ${img.src}`);
    for (const candidate of (img.srcSet || img.srcset || '').split(',')) {
      const src = candidate.trim().split(' ')[0];
      if (src.startsWith('/')) assert(existsSync(`public${src}`), `${route}: missing responsive image ${src}`);
    }
  }
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  if (!siteUrl) assert.equal(schemas.length, 0);
  for (const schema of schemas) {
    assert.equal(schema['@context'], 'https://schema.org');
    assert(!/"(offers|aggregateRating|review|availability|shippingDetails|hasMerchantReturnPolicy)"/.test(JSON.stringify(schema)), 'Unverified merchant data');
    if (schema['@type'] === 'BreadcrumbList') schema.itemListElement.forEach((item, i) => { assert.equal(item.position, i + 1); assert(item.item.startsWith(siteUrl)); });
    if (schema['@type'] === 'Product') { assert(route.startsWith('/products/')); assert(schema.name); assert.equal(schema.weight.unitCode, 'KGM'); assert.equal(schema.weight.value, 10); }
  }
  if (siteUrl && route.startsWith('/products/')) assert(schemas.some(schema => schema['@type'] === 'Product'));
  if (siteUrl && route === '/') assert(schemas.some(schema => schema['@graph']?.some(node => node['@type'] === 'WebSite')));
  console.log(`PASS ${route}: metadata, headings, internal links, images, JSON-LD contracts`);
}
const visited = new Set();
function crawl(route) { if (visited.has(route)) return; visited.add(route); for (const next of edges.get(route) || []) crawl(next); }
crawl('/'); assert.equal(visited.size, seoRoutes.length, 'Orphan pages');
const sitemap = readFileSync('out/sitemap.xml', 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decode(match[1]));
assert.deepEqual(locations.sort(), (indexable ? seoRoutes.map(route => new URL(route, siteUrl).href) : []).sort());
const robots = readFileSync('out/robots.txt', 'utf8');
assert(/Allow: \//.test(robots));
assert.equal(robots.includes('Sitemap:'), indexable);
if (indexable) assert(robots.includes(`${siteUrl}/sitemap.xml`));
assert(/noindex/.test(readFileSync('out/404.html', 'utf8')), '404 must be noindex');
for (const value of ['https//broken', 'http://example.com', 'https://example.com/path', 'https://user:pass@example.com', 'https://example.com?x=1']) assert.throws(() => parseSiteUrl(value));
assert.equal(parseSiteUrl(''), null);
assert.equal(parseSiteUrl('https://seo-validation.invalid/'), 'https://seo-validation.invalid');
assert.equal(siteConfig.products.reduce((sum, p) => sum + p.price, 0), 5098);
assert.equal(siteConfig.products[0].price, 2599);
assert.equal(siteConfig.products[1].price, 2499);
assert.equal(siteConfig.products[0].weight, '10 KG');
assert.equal(siteConfig.products[1].weight, '10 KG');
assert.equal(siteConfig.products[0].title, 'The Royal Kinnow Collection');
assert.equal(siteConfig.products[1].title, 'The Golden Kinnow Collection');
assert.equal(siteConfig.products[0].categoryEyebrow, 'LARGER FRUIT SELECTION');
assert.equal(siteConfig.products[1].categoryEyebrow, 'CLASSIC FRUIT SELECTION');
assert(siteConfig.products.every(product => product.netWeightNotice === '10 KG NET FRUIT WEIGHT'));
assert(siteConfig.products.every(product => product.packagingNote === 'Packaging weight excluded.'));
const activeProductCopy = JSON.stringify(siteConfig.products);
for (const prohibited of [/malta/i, /export/i, /\b\d+\s*[–-]\s*\d+\s+fruit/i, /naturally sweet/i]) assert(!prohibited.test(activeProductCopy), `Prohibited product claim: ${prohibited}`);
const normalize = text => text.replaceAll('\r\n', '\n');
const homeSrc = normalize(readFileSync('components/HomeExperience.jsx', 'utf8'));
assert(homeSrc.includes('className="hero-title-main">Mr. Kinoow</span>'), 'Hero must contain clean Mr. Kinoow brand without registered trademark');
assert(!homeSrc.includes('hero-title-main">Mr. Kinoow<sup>'), 'Hero must not contain registered trademark symbol');
assert(homeSrc.includes('function Hero()'), 'Hero component must be present');
console.log(`PASS ${seoRoutes.length} discoverable routes; sitemap/robots; no invented offers; Hero and product configuration verified. Mode: ${indexable ? 'indexable' : 'preview/noindex'}.`);
console.log('This checks local JSON-LD contracts, not Google Rich Results Test or Schema.org Validator.');
