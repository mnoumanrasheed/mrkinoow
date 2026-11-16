'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import Icon from './Icons';
import ScrollNarrative from './ScrollNarrative';
import CartDrawer from './CartDrawer';
import {Header,Footer} from './BrandShell';
import {siteConfig,formatPrice} from '@/lib/siteConfig';

function Hero(){
  return <section className="hero" id="home">
    <div className="hero-glow hero-glow-one"/><div className="hero-glow hero-glow-two"/>
    <img className="hero-background" src="/images/hero-home.webp" alt="" width="1672" height="941" fetchPriority="high"/>
    <div className="hero-particles" aria-hidden="true">{Array.from({length:12},(_,i)=><span className="particle" key={i} style={{left:`${57+i*3}%`,top:`${15+(i*11)%60}%`,animationDelay:`${(i%6)*-.9}s`}}/>)}</div>
    <div className="shell hero-inner"><div className="hero-content">
      <span className="eyebrow hero-eyebrow"><span className="eyebrow-stroke"/>FROM OUR ORCHARDS TO YOUR DOORSTEP</span>
      <h1><span className="hero-title-main">Mr. Kinoow<sup>®</sup></span><span className="hero-title-italic">A taste of sunshine.</span></h1>
      <p className="hero-description">Nature&apos;s most vibrant gift, beautifully brought to you.</p>
      <div className="hero-buttons"><a className="btn btn-solid" href="#collection">Explore Collection <Icon name="arrow" size={20}/></a><Link className="btn btn-outline" href="/our-story">Our Story <Icon name="arrow" size={20}/></Link></div>
    </div></div>
    <a className="hero-scroll" href="#the-experience"><span className="scroll-circle"><Icon name="arrowDown" size={17}/></span><span>SCROLL TO EXPERIENCE</span><i/></a>
    <div className="hero-side-label">NATURE, BEAUTIFULLY DELIVERED <span>01 / 05</span></div>
    <div className="hero-frame-number" aria-hidden="true">01</div>
  </section>;
}

const featureList=[
  {icon:'leaf',title:'Naturally Brilliant',text:'A celebration of what nature does best.'},
  {icon:'sun',title:'Sun-Kissed Goodness',text:'Inspired by the warmth of our orchards.'},
  {icon:'star',title:'The Finest Experience',text:'Thoughtful details, beautifully presented.'},
  {icon:'box',title:'Made to Share',text:'A memorable gift, from one home to another.'}
];

function ArtSection(){
 return <section className="craft-section"><div className="craft-photo"><img src="/images/orchard-sunset.webp" alt="Citrus orchard in golden evening sunlight" loading="lazy"/><span>THE LAND THAT INSPIRES US</span></div><div className="craft-content"><span className="eyebrow">OUR ROOTS / 01</span><h2>Born from<br/><em>the earth.</em></h2><p>Some stories start with a simple idea. Ours starts with an extraordinary fruit and the belief that everyday freshness deserves to feel exceptional.</p><Link href="/our-story" className="text-link">Read our story <Icon name="arrow" size={21}/></Link><div className="fine-mark">MK <small>EST. WITH PURPOSE</small></div></div></section>;
}

function ProductSection({onAdd}){
 return <section className="products-section" id="collection"><div className="shell"><div className="products-heading"><div><span className="eyebrow"><span className="small-index">04 /</span> THE COLLECTION</span><h2>Sunshine, <em>boxed.</em></h2></div><p>Two premium 10 kg boxes, freshly picked from our own farm and delivered free to your door.</p></div><div className="product-grid">{siteConfig.products.map((p,i)=><article className="product-card" key={p.id}><div className="product-topline"><span>NO. 0{i+1}</span><span>MR. KINOOW SELECTION</span></div><div className="product-image-wrap"><div className="product-orbit"/><img src={p.image} alt={`Illustration of ${p.weightLabel}`} loading="lazy" width="600" height="490" /></div><div className="product-meta"><div><span className="product-weight">{p.weight}</span><h3>{p.title}</h3><p>{p.subtitle}</p></div><strong>{formatPrice(p.price)}</strong></div><button type="button" className="product-add" onClick={()=>onAdd(p.id)}>Add to bag <Icon name="plus" size={18}/></button></article>)}</div></div></section>
}

function StoryTeaser(){
 return <section className="story-teaser"><div className="shell story-teaser-layout"><div><span className="eyebrow">05 / THE PEOPLE</span><h2>Two minds.<br/><em>One vision.</em></h2><p>Every remarkable journey begins with people who believe in it. Meet the two founders shaping Mr. Kinoow from a simple idea into a meaningful experience.</p><Link className="btn btn-outline" href="/our-story">Meet our founders <Icon name="arrow" size={18}/></Link></div><div className="story-teaser-visual"><span className="story-ghost-text">OUR STORY</span><div className="founder-tiles">{siteConfig.founders.map((p,i)=><div className="founder-tile" key={i}><div className="founder-portrait">{p.image?<img src={p.image} alt={p.name} loading="lazy"/>:<><span className="founder-monogram">{p.initials}</span><span className="founder-photo-label">PORTRAIT COMING SOON</span></>}</div><span className="founder-tile-title">{p.role}</span></div>)}</div></div></div></section>
}

function Closing(){
 return <section className="closing-section"><div className="closing-photo"><img src="/images/citrus-splash.webp" alt="Citrus glowing in dramatic warm light" loading="lazy"/></div><div className="closing-shade"/><div className="closing-copy"><span className="eyebrow">EVERY BOX. A BRIGHTER DAY.</span><h2>Feel the<br/><em>freshness.</em></h2><a href="#collection" className="btn btn-solid">Explore the collection <Icon name="arrow"/></a></div><div className="closing-watermark">MR. KINOOW</div></section>
}

export default function HomeExperience(){
  const [cart,setCart]=useState({});
  const [drawer,setDrawer]=useState(false);
  const [toast,setToast]=useState('');
  const count=Object.values(cart).reduce((t,v)=>t+v,0);
  useEffect(()=>{try{const existing=JSON.parse(localStorage.getItem('mrkinoow-bag')||'{}');if(existing&&typeof existing==='object'&&!Array.isArray(existing)){const sanitized={}; for(const p of siteConfig.products){const x=Number(existing[p.id]);if(Number.isInteger(x)&&x>0)sanitized[p.id]=Math.min(x,99)}setCart(sanitized)}}catch{}},[]);
  useEffect(()=>{try{localStorage.setItem('mrkinoow-bag',JSON.stringify(cart))}catch{}},[cart]);
  const add=(id)=>{setCart(prev=>({...prev,[id]:Math.min(99,(prev[id]||0)+1)}));setToast('Added to your selection');setDrawer(true)};
  return <><Header count={count} onOpenCart={()=>setDrawer(true)}/><main><Hero/><div id="the-experience"><ScrollNarrative/></div><ArtSection/><section className="values-section"><div className="shell values-row"><div className="values-intro"><span className="eyebrow">A LITTLE EXTRA CARE</span><h2>Nature is<br/><em>our luxury.</em></h2></div>{featureList.map(f=><article key={f.title} className="value-card"><Icon name={f.icon} size={32} strokeWidth={1.2}/><h3>{f.title}</h3><p>{f.text}</p></article>)}</div></section><ProductSection onAdd={add}/><StoryTeaser/><Closing/></main><Footer/><CartDrawer open={drawer} setOpen={setDrawer} cart={cart} setCart={setCart}/><div className="sr-only" aria-live="polite">{toast}</div></>;
}
