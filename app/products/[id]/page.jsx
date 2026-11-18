import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';
import { productDetails } from '@/lib/seoContent';
import { absoluteUrl, pageMetadata, siteUrl } from '@/lib/seo.mjs';
import { CitrusShell, Breadcrumbs, RelatedCitrus } from '@/components/CitrusPage';
import JsonLd from '@/components/JsonLd';
import styles from '@/components/CitrusPage.module.css';

export const dynamicParams = false;
export function generateStaticParams() { return siteConfig.products.map(({ id }) => ({ id })); }
function findProduct(id) {
  const product = siteConfig.products.find(item => item.id === id);
  if (!product || !productDetails[id]) notFound();
  return { product, details: productDetails[id] };
}
export async function generateMetadata({ params }) {
  const { id } = await params;
  const { product, details } = findProduct(id);
  // Existing photographic brand image works across social crawlers; SVG box illustrations remain on-page.
  return pageMetadata({ title: details.title, description: details.description, path: `/products/${product.id}` });
}
export default async function ProductPage({ params }) {
  const { id } = await params;
  const { product, details } = findProduct(id);
  const guideName = details.guide === 'kinnow' ? 'Kinnow' : 'Malta';
  const schema = siteUrl ? {
    '@context': 'https://schema.org', '@type': 'Product', '@id': absoluteUrl(`/products/${id}#product`),
    name: product.title, url: absoluteUrl(`/products/${id}`), description: details.intro,
    // The current illustration is generic and Malta's printed label is inaccurate; omit a schema product image until verified.
    brand: { '@type': 'Brand', name: siteConfig.brand }, weight: { '@type': 'QuantitativeValue', value: 10, unitCode: 'KGM' },
  } : null;
  return <CitrusShell>
    <JsonLd data={schema}/>
    <Breadcrumbs items={[["Home", '/'], ['Oranges', '/oranges'], [guideName, `/${details.guide}`], [product.title, `/products/${id}`]]}/>
    <article>
      <div className={styles.product}>
        <figure><img src={product.image} alt="Illustration of a Mr. Kinoow citrus box with fruit and leaves" width="700" height="530" decoding="async" fetchPriority="high"/><figcaption>{details.imageNote}</figcaption></figure>
        <div><span className="eyebrow">MR. KINOOW / {product.weight}</span><h1>{product.title} — 10 kg box</h1><p>{details.intro}</p>
          <dl><div><dt>Listed weight</dt><dd>{product.weight}</dd></div><div><dt>Fruit count</dt><dd>{details.count}</dd></div><div><dt>Indicative price</dt><dd>PKR {product.price.toLocaleString('en-PK')} per box</dd></div></dl>
          <p className={styles.notice}>This is the illustrative price currently shown in the collection. Confirm the final price, stock and delivery for your address before ordering. Adding to the bag prepares an enquiry; it is not a checkout or a stock reservation.</p>
          <Link className={`btn btn-solid ${styles.action}`} href="/#collection">Select a box in the collection <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <section className={styles.details}><h2>Planning your citrus purchase</h2><p>{details.use}</p><p><Link className={styles.inlineLink} href={`/${details.guide}`}>Read the {guideName.toLowerCase()} guide</Link> or <Link className={styles.inlineLink} href="/oranges">compare and store oranges</Link>.</p><h2>How the order enquiry works</h2><ol><li>Choose your box in the collection and add it to the bag.</li><li>Adjust quantities and review the estimated total in Pakistani rupees.</li><li>Copy your enquiry summary, or use WhatsApp if the brand has enabled it. Copying a summary alone does not send an order.</li><li>Confirm the current price, availability and delivery arrangement directly with Mr. Kinoow before making any payment.</li></ol><p>Contact details are not currently published on this website. Until a contact channel is available, a copied summary can be saved but cannot be submitted through the site.</p></section>
    </article>
    <RelatedCitrus current={details.guide}/>
  </CitrusShell>;
}
