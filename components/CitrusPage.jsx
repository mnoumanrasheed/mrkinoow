import Link from 'next/link';
import { Header, Footer } from './BrandShell';
import JsonLd from './JsonLd';
import { breadcrumbs } from '@/lib/seo.mjs';
import { siteConfig } from '@/lib/siteConfig';
import styles from './CitrusPage.module.css';

export function Breadcrumbs({ items }) {
  return <><JsonLd data={breadcrumbs(items)}/><nav aria-label="Breadcrumb" className={styles.breadcrumbs}><ol>{items.map(([name, href], i) => <li key={href}>{i === items.length - 1 ? <span aria-current="page">{name}</span> : <Link href={href}>{name}</Link>}</li>)}</ol></nav></>;
}

export function CitrusShell({ children }) {
  return <><Header catalog/><main id="main-content" className={`${styles.page} shell`}>{children}</main><Footer/></>;
}

export default function CitrusPage({ slug, content }) {
  const products = siteConfig.products.filter(product => content.productIds.includes(product.id));
  const items = slug === 'oranges' ? [['Home', '/'], ['Collection', '/oranges']] : [['Home', '/'], ['Collection', '/oranges'], [slug === 'malta' ? 'Collection update' : 'Kinnow', `/${slug}`]];
  return <CitrusShell>
    <Breadcrumbs items={items}/>
    <header className={styles.intro}><span className="eyebrow">MR. KINOOW / {content.legacy ? 'COLLECTION UPDATE' : 'CITRUS NOTES'}</span><h1>{content.heading}</h1><p>{content.intro}</p></header>
    <div className={styles.editorial}>
      <div className={styles.sections}>{content.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}</div>
      <aside className={styles.aside} aria-label="Citrus collection"><h2>Explore the boxes</h2>{products.map(product => <article key={product.id} className={styles.card}>
        <Link href={`/products/${product.id}`} tabIndex={-1} aria-hidden="true"><img src={product.image} width="700" height="530" alt={`Box illustration for ${product.title}`} loading="lazy" decoding="async"/></Link>
        <span className="eyebrow">{product.categoryEyebrow}</span><h3><Link href={`/products/${product.id}`}>{product.title}</Link></h3><p>{product.sizeDescription} 10 KG net fruit weight; packaging excluded.</p><Link className={styles.inlineLink} href={`/products/${product.id}`}>View box details</Link>
      </article>)}</aside>
    </div>
    {content.sources.length > 0 && <section className={styles.sources}><h2>Further reading</h2><ul>{content.sources.map(([name, href]) => <li key={href}><a href={href}>{name}</a></li>)}</ul><p>These sources explain citrus generally; they do not certify Mr. Kinoow products or confirm current stock.</p></section>}
    <RelatedCitrus current={slug}/>
  </CitrusShell>;
}

export function RelatedCitrus({ current }) {
  return <nav aria-label="Explore citrus" className={styles.related}><h2>Continue exploring</h2><div>{[['oranges', 'Explore both collections'], ['kinnow', 'Compare kinnow sizes']].filter(([slug]) => slug !== current).map(([slug, label]) => <Link key={slug} href={`/${slug}`}>{label} <span aria-hidden="true">↗</span></Link>)}<Link href="/our-story">The story behind Mr. Kinoow <span aria-hidden="true">↗</span></Link><Link href="/#collection">Shop the collection <span aria-hidden="true">↗</span></Link></div></nav>;
}
