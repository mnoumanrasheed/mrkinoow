import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig, generateWhatsAppOrderMessage } from '@/lib/siteConfig';
import { productDetails } from '@/lib/seoContent';
import { absoluteUrl, pageMetadata, siteUrl } from '@/lib/seo.mjs';
import { CitrusShell, Breadcrumbs, RelatedCitrus } from '@/components/CitrusPage';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icons';
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
  return pageMetadata({ title: details.title, description: details.description, path: `/products/${product.id}` });
}
export default async function ProductPage({ params }) {
  const { id } = await params;
  const { product, details } = findProduct(id);
  const guideName = 'Kinnow';
  const phone = (siteConfig.whatsapp || '').replace(/\D/g, '');
  const singleOrderText = generateWhatsAppOrderMessage([{ ...product, qty: 1 }], product.price);
  const waProductUrl = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(singleOrderText)}` : null;

  const schema = siteUrl ? {
    '@context': 'https://schema.org', '@type': 'Product', '@id': absoluteUrl(`/products/${id}#product`),
    name: product.title, url: absoluteUrl(`/products/${id}`), description: product.description,
    brand: { '@type': 'Brand', name: siteConfig.brand }, weight: { '@type': 'QuantitativeValue', value: 10, unitCode: 'KGM' },
  } : null;

  return <CitrusShell>
    <JsonLd data={schema}/>
    <Breadcrumbs items={[["Home", '/'], ['Oranges', '/oranges'], [guideName, `/${details.guide}`], [product.title, `/products/${id}`]]}/>
    <article>
      <div className={styles.product}>
        <figure><img src={product.image} alt={`Illustration of Mr. Kinoow citrus box for ${product.title}`} width="700" height="530" decoding="async" fetchPriority="high"/><figcaption>{details.imageNote}</figcaption></figure>
        <div>
          <span className="eyebrow">{product.categoryEyebrow}</span>
          <h1>{product.title}</h1>
          <p className={styles.descriptor}>{product.sizeDescription}</p>
          <div className="product-net-weight-badge">{product.netWeightNotice}</div>
          <p>{product.packagingNote}</p>
          <p>{product.description}</p>
          <dl>
            <div><dt>Net fruit weight</dt><dd>10 KG (packaging weight excluded)</dd></div>
            <div><dt>Fruit selection</dt><dd>{product.sizeDescription}</dd></div>
            <div><dt>Price</dt><dd>Rs. {product.price.toLocaleString('en-PK')} per box</dd></div>
            <div><dt>Delivery</dt><dd>Complimentary nationwide delivery via {siteConfig.courier.partner}</dd></div>
            <div><dt>Farm and presentation</dt><dd>From our own farm &middot; No artificial polishing or added preservatives</dd></div>
            <div><dt>Video</dt><dd>Harvesting and packing video shared with every order via WhatsApp</dd></div>
          </dl>
          <p className={styles.notice}>Free delivery across Pakistan via Leopards Courier. Confirm availability and order details directly on WhatsApp.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
            {waProductUrl && (
              <a className={`btn btn-solid ${styles.action}`} href={waProductUrl} target="_blank" rel="noopener noreferrer">
                Order {product.title} on WhatsApp <Icon name="arrow" size={18}/>
              </a>
            )}
            <Link className={`btn btn-outline ${styles.action}`} href="/#collection">
              Select in collection or customize bag <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
      <section className={styles.details}>
        <h2>From Our Own Farm</h2>
        <p>Grown and selected at our own farm.</p>

        <h2>Complimentary Nationwide Delivery</h2>
        <p>Free delivery across Pakistan via Leopards Courier.</p>

        <h2>See Your Order Prepared</h2>
        <p>A harvesting and packing video is shared with every order via WhatsApp.</p>

        <h2>Planning your citrus purchase</h2>
        <p>{details.use}</p>
        <p><Link className={styles.inlineLink} href={`/${details.guide}`}>Read the {guideName.toLowerCase()} guide</Link> or <Link className={styles.inlineLink} href="/oranges">compare and store oranges</Link>.</p>

        <h2>How direct WhatsApp ordering works</h2>
        <ol>
          <li>Click &ldquo;Order on WhatsApp&rdquo; above, or add boxes to the shopping bag in our collection.</li>
          <li>Review your box count, unit price and estimated total in Pakistani rupees.</li>
          <li>Provide your details in the WhatsApp order message: Name, City, Full Delivery Address and Contact Number.</li>
          <li>Confirm fruit availability, order details and delivery arrangements directly with Mr. Kinoow.</li>
          <li>Receive your harvesting and packing reference video shared via WhatsApp along with courier dispatch updates.</li>
        </ol>
      </section>
    </article>
    <RelatedCitrus current={details.guide}/>
  </CitrusShell>;
}
