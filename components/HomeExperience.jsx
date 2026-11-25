'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import Icon from './Icons';
import ScrollNarrative from './ScrollNarrative';
import CartDrawer from './CartDrawer';
import {Header,Footer} from './BrandShell';
import {siteConfig,formatPrice,productIdAliases} from '@/lib/siteConfig';
import {portraitAttributes} from '@/lib/portraitAssets';
import collectionStyles from './Collection.module.css';

function Hero(){
  return <section className="hero" id="home">
    <div className="hero-glow hero-glow-one"/><div className="hero-glow hero-glow-two"/>
    <img className="hero-background" src="/images/hero-home.webp" alt="" width="1672" height="941" fetchPriority="high" decoding="async"/>
    <div className="hero-particles" aria-hidden="true">{Array.from({length:12},(_,i)=><span className="particle" key={i} style={{left:`${57+i*3}%`,top:`${15+(i*11)%60}%`,animationDelay:`${(i%6)*-.9}s`}}/>)}</div>
    <div className="shell hero-inner"><div className="hero-content">
      <span className="eyebrow hero-eyebrow"><span className="eyebrow-stroke"/>FROM OUR ORCHARDS TO YOUR DOORSTEP</span>
      <h1><span className="hero-title-main">Mr. Kinoow</span><span className="hero-title-italic">A taste of sunshine.</span></h1>
      <p className="hero-description">Nature&apos;s most vibrant gift, beautifully brought to you.</p>
      <div className="hero-buttons"><a className="btn btn-solid" href="#collection">Explore Collection <Icon name="arrow" size={20}/></a><Link className="btn btn-outline" href="/our-story">Our Story <Icon name="arrow" size={20}/></Link></div>
    </div></div>
    <a className="hero-scroll" href="#the-experience"><span className="scroll-circle"><Icon name="arrowDown" size={17}/></span><span>SCROLL TO EXPERIENCE</span><i/></a>
    <div className="hero-side-label">NATURE, BEAUTIFULLY DELIVERED <span>01 / 05</span></div>
    <div className="hero-frame-number" aria-hidden="true">01</div>
  </section>;
}

const featureList=[
  {icon:'leaf',title:'From Our Own Farm',text:'Grown and selected at our own farm.'},
  {icon:'sun',title:'Complimentary Delivery',text:'Free delivery across Pakistan via Leopards Courier.'},
  {icon:'star',title:'Farm Transparency',text:'Every order includes a harvesting & packing reference video shared through WhatsApp.'},
  {icon:'box',title:'Naturally Presented',text:'No artificial polishing or added preservatives.'}
];

function ArtSection(){
 return <section className="craft-section"><div className="craft-photo"><img src="/images/orchard-sunset-premium.png" alt="Citrus orchard in golden evening sunlight" loading="lazy" decoding="async"/><span>THE LAND THAT INSPIRES US</span></div><div className="craft-content"><span className="eyebrow">OUR ROOTS / 01</span><h2>Grown with care.<br/><em>Packed with purpose.</em></h2><p>Our Royal and Golden collections come from our own farm. Every box is selected and packed without artificial polishing or added preservatives.</p><Link href="/our-story" className="text-link">Read our story <Icon name="arrow" size={21}/></Link><div className="fine-mark">MK <small>EST. WITH PURPOSE</small></div></div></section>;
}

function ProductSection({onAdd}){
  const benefits=[
    {icon:'leaf',title:'FROM OUR OWN FARM',text:'Grown and selected at our own farm.'},
    {icon:'star',title:'NATURALLY PRESENTED',text:'No artificial polishing or added preservatives.'},
    {icon:'truck',title:'COMPLIMENTARY DELIVERY',text:'Free delivery across Pakistan via Leopards Courier.'},
    {icon:'check',title:'SEE YOUR ORDER PREPARED',text:'A harvesting and packing video shared with every order via WhatsApp.'},
  ];
  return (
    <section className={collectionStyles.section} id="collection">
      <div className={`shell ${collectionStyles.shell}`}>
        <div className={collectionStyles.heading}>
          <div>
            <span className={collectionStyles.eyebrow}>04 / THE COLLECTION</span>
            <h2>Sunshine, <em>beautifully boxed.</em></h2>
          </div>
          <p>Two thoughtfully selected kinnow collections, grown on our own farm and delivered fresh to your doorstep.</p>
        </div>
        <div className={collectionStyles.grid}>
          {siteConfig.products.map((p)=>(
            <article className={collectionStyles.card} key={p.id}>
              <div className={collectionStyles.topline}>
                <span>COLLECTION {p.collectionNumber}</span>
                <span>{p.categoryEyebrow}</span>
              </div>
              <div className={collectionStyles.imageWrap}>
                <img src={p.image} alt={p.imageAlt} loading="lazy" decoding="async" width="600" height="490" />
              </div>
              <div className={collectionStyles.content}>
                <div className={collectionStyles.titleRow}>
                  <h3><Link href={`/products/${p.id}`}>{p.title}</Link></h3>
                  <div className={collectionStyles.price} aria-label={`${formatPrice(p.price)} per box`}>
                    <strong>{formatPrice(p.price)}</strong><span>PER BOX</span>
                  </div>
                </div>
                <p className={collectionStyles.description}>{p.description}</p>
                <ul className={collectionStyles.highlights}>{p.highlights.map(item=><li key={item}><Icon name="check" size={13}/>{item}</li>)}</ul>
                <div className={collectionStyles.weight}>
                  <strong>{p.netWeightNotice}</strong><span>{p.packagingNote}</span>
                </div>
              </div>
              <button type="button" className={collectionStyles.add} onClick={()=>onAdd(p.id)} aria-label={`Add ${p.weightLabel} to bag`}>
                <span>Add to Bag</span><Icon name="plus" size={16}/>
              </button>
            </article>
          ))}
        </div>
        <div className={collectionStyles.benefits} aria-label="Collection benefits">
          {benefits.map(benefit=><article key={benefit.title}><Icon name={benefit.icon} size={21}/><div><h3>{benefit.title}</h3><p>{benefit.text}</p></div></article>)}
        </div>
      </div>
    </section>
  );
}

function StoryTeaser(){
 return <section className="story-teaser"><div className="shell story-teaser-layout"><div><span className="eyebrow">05 / THE PEOPLE</span><h2>Two minds.<br/><em>One vision.</em></h2><p>Every remarkable journey begins with people who believe in it. Meet the two founders shaping Mr. Kinoow from a simple idea into a meaningful experience.</p><Link className="btn btn-outline" href="/our-story">Meet our founders <Icon name="arrow" size={18}/></Link></div><div className="story-teaser-visual"><span className="story-ghost-text">OUR STORY</span><div className="founder-tiles">{siteConfig.founders.map((p,i)=><div className="founder-tile" key={i}><div className="founder-portrait">{p.image?<img src={p.image} alt={p.name} loading="lazy" decoding="async" {...portraitAttributes(p.image, "(max-width: 760px) 42vw, 24vw")}/>:<><span className="founder-monogram">{p.initials}</span><span className="founder-photo-label">PORTRAIT COMING SOON</span></>}</div><div className="founder-tile-caption"><span className="founder-tile-name">{p.name}</span><span className="founder-tile-role">{p.role}</span></div></div>)}</div></div></div></section>
}

function Closing(){
 return <section className="closing-section"><div className="closing-photo"><img src="/images/citrus-splash.webp" alt="Citrus glowing in dramatic warm light" loading="lazy" decoding="async"/></div><div className="closing-shade"/><div className="shell closing-copy"><div className="closing-message"><span className="eyebrow">FROM OUR FARM TO YOUR DOORSTEP</span><h2>Bring home<br/><em>the harvest.</em></h2></div><div className="closing-action"><p className="closing-description">Selected on our own farm, thoughtfully packed, and delivered to your doorstep.</p><a href="#collection" className="btn btn-solid closing-button">Explore the collection <Icon name="arrow" size={18}/></a></div></div><div className="closing-watermark" aria-hidden="true">MR. KINOOW</div></section>
}

export default function HomeExperience(){
  const [cart,setCart]=useState({});
  const [drawer,setDrawer]=useState(false);
  const [toast,setToast]=useState('');
  const [cartReady,setCartReady]=useState(false);
  const count=Object.values(cart).reduce((t,v)=>t+v,0);
  useEffect(()=>{try{const existing=JSON.parse(localStorage.getItem('mrkinoow-bag')||'{}');if(existing&&typeof existing==='object'&&!Array.isArray(existing)){const sanitized={};for(const [savedId,savedQty] of Object.entries(existing)){const id=productIdAliases[savedId]||savedId;const product=siteConfig.products.find(item=>item.id===id);const qty=Number(savedQty);if(product&&Number.isInteger(qty)&&qty>0)sanitized[id]=Math.min((sanitized[id]||0)+qty,99)}setCart(sanitized)}}catch{} finally{setCartReady(true)}},[]);
  useEffect(()=>{if(!cartReady)return;try{localStorage.setItem('mrkinoow-bag',JSON.stringify(cart))}catch{}},[cart,cartReady]);
  const add=(id)=>{setCart(prev=>({...prev,[id]:Math.min(99,(prev[id]||0)+1)}));setToast('Added to your selection');setDrawer(true)};
  return <><Header count={count} onOpenCart={()=>setDrawer(true)}/><main><Hero/><div id="the-experience"><ScrollNarrative/></div><ArtSection/><section className="values-section"><div className="shell values-row"><div className="values-intro"><span className="eyebrow">A LITTLE EXTRA CARE</span><h2>Nature is<br/><em>our luxury.</em></h2></div>{featureList.map(f=><article key={f.title} className="value-card"><Icon name={f.icon} size={32} strokeWidth={1.2}/><h3>{f.title}</h3><p>{f.text}</p></article>)}</div></section><ProductSection onAdd={add}/><StoryTeaser/><Closing/></main><Footer/><CartDrawer open={drawer} setOpen={setDrawer} cart={cart} setCart={setCart}/><div className="sr-only" aria-live="polite">{toast}</div></>;
}
