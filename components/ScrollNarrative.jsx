'use client';
import {useEffect, useRef, useState} from 'react';
import Icon from './Icons';

const scenes = [
  {number:'01',small:'THE ORIGIN',title:<>Rooted <i>in</i><br/>Nature.</>, text:'Where warmth, good soil and patience bring our favourite citrus to life.',image:'/images/orchard-sunset-premium.png',alt:'Sunset over citrus orchards in Punjab',className:'orchard',cap:'GROWN WITH THE SEASONS'},
  {number:'02',small:'THE FRUIT',title:<>Meet the<br/><i>Kinnow.</i></>,text:'A bright burst of flavour. A moment worth slowing down for.',image:'/images/peel-reveal-premium.png',alt:'Cinematic peeled citrus fruit with glossy sections',className:'peel',cap:'NATURALLY FULL OF LIFE'},
  {number:'03',small:'THE SENSATION',title:<>A little<br/><i>Sunshine.</i></>,text:'The colour. The fragrance. That first, unforgettable juicy bite.',image:'/images/citrus-splash.webp',alt:'Juicy kinnow segments in dramatic warm light',className:'splash',cap:'TASTE THE MOMENT'},
  {number:'04',small:'THE PROMISE',title:<>Made to<br/><i>Delight.</i></>,text:'Beautifully presented. Thoughtfully selected. Ready to be shared.',image:'/images/green-oranges.webp',alt:'Fresh oranges presented with dark green leaves',className:'harvest',cap:'THE MR. KINOOW EXPERIENCE'},
];

export default function ScrollNarrative(){
  const root=useRef(null), layers=useRef([]), metering=useRef(null), scrolling=useRef(null),frame=useRef(0);
  const [current,setCurrent]=useState(0);
  useEffect(()=>{
    const mobile=window.matchMedia('(max-width: 760px)');
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
    const draw=()=>{
      frame.current=0;
      if(!root.current)return;
      if(mobile.matches||reduce.matches){layers.current.forEach(s=>{if(s){s.style.removeProperty('opacity');s.style.removeProperty('transform');s.style.removeProperty('pointer-events')}});return;}
      const rect=root.current.getBoundingClientRect();
      const range=Math.max(1,rect.height-window.innerHeight);
      const progress=Math.max(0,Math.min(1,-rect.top/range));
      const exact=progress*(scenes.length-1);
      const closest=Math.min(scenes.length-1,Math.max(0,Math.round(exact)));
      setCurrent(v=>v===closest?v:closest);
      layers.current.forEach((layer,i)=>{
        if(!layer)return;
        const distance=Math.abs(exact-i);
        const visible=Math.max(0,1-distance);
        const eased=visible*visible*(3-2*visible);
        layer.style.opacity=String(eased);
        layer.style.pointerEvents=visible>.7?'auto':'none';
        const vertical=(i-exact)*14;
        layer.style.transform=`translate3d(0,${vertical}vh,0) scale(${.93+.07*eased})`;
        const art=layer.querySelector('.chapter-art');
        if(art)art.style.transform=`translate3d(${(exact-i)*-6}%,0,0) rotateY(${(exact-i)*-9}deg) scale(${1.10+.1*(1-eased)})`;
      });
      if(metering.current)metering.current.style.transform=`scaleX(${Math.max(.03,progress)})`;
      if(scrolling.current)scrolling.current.textContent=`0${closest+1} / 0${scenes.length}`;
    };
    const onScroll=()=>{if(!frame.current)frame.current=requestAnimationFrame(draw)};
    draw(); window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
    mobile.addEventListener?.('change',onScroll);reduce.addEventListener?.('change',onScroll);
    return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);mobile.removeEventListener?.('change',onScroll);reduce.removeEventListener?.('change',onScroll);if(frame.current)cancelAnimationFrame(frame.current)};
  },[]);
  return <section className="narrative" ref={root} aria-label="The Mr. Kinoow experience">
    <div className="narrative-sticky">
      <div className="chapter-guide" aria-hidden="true"><span>THE JOURNEY</span><div className="guide-track"><i ref={metering}/></div><span ref={scrolling}>01 / 04</span></div>
      {scenes.map((scene,i)=><article className={`chapter chapter-${scene.className}`} key={scene.number} ref={el=>layers.current[i]=el} style={{opacity:i===0?1:0,pointerEvents:i===0?'auto':'none'}}>
        <div className="chapter-bg" style={{backgroundImage:`linear-gradient(90deg,rgba(5,14,10,.94) 0%,rgba(5,14,10,.30) 64%,rgba(5,14,10,.2) 100%),url('${scene.image}')`}}/>
        <div className="chapter-art-wrap" aria-hidden="true"><img className="chapter-art" src={scene.image} alt="" /></div>
        <div className="shell chapter-copy"><div className="eyebrow"><span className="small-index">{scene.number} / 04</span>{scene.small}</div><h2>{scene.title}</h2><div className="line-gold"/><p>{scene.text}</p><a href="#collection" className="circle-link" aria-label="Discover the collection"><Icon name="arrow" size={25}/></a></div>
        <div className="chapter-caption">{scene.cap}</div>
      </article>)}
      <div className="scene-indicator" aria-hidden="true">{scenes.map((s,i)=><span key={s.number} className={current===i?'active':''}/>)}</div>
    </div>
  </section>;
}
