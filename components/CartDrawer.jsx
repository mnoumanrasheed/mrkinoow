'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icons';
import { siteConfig, formatPrice } from '@/lib/siteConfig';

export default function CartDrawer({ open, setOpen, cart, setCart }) {
  const [copied, setCopied] = useState(false);
  const closeRef = useRef(null);
  const previousFocusRef = useRef(null);
  const entries = siteConfig.products.filter(p=>cart[p.id]>0).map(p=>({...p, qty:cart[p.id]}));
  const total = entries.reduce((t,e)=>t+e.price*e.qty,0);
  const count = entries.reduce((t,e)=>t+e.qty,0);
  const orderText = `Hello Mr. Kinoow! I would like to enquire about:\n${entries.map(p=>`${p.weightLabel} x ${p.qty} — ${formatPrice(p.price*p.qty)}`).join('\n')}\nEstimated total: ${formatPrice(total)}\nPlease confirm final prices and availability.`;
  const phone = (siteConfig.whatsapp||'').replace(/\D/g,'');
  useEffect(()=>{
    if(!open)return;
    previousFocusRef.current=document.activeElement;
    const old=document.body.style.overflow;
    document.body.style.overflow='hidden';
    closeRef.current?.focus();
    const key=(e)=>{if(e.key==='Escape')setOpen(false)};
    window.addEventListener('keydown',key);
    return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',key);previousFocusRef.current?.focus?.()};
  },[open,setOpen]);
  const setQty=(id,value)=>setCart(previous=>({...previous,[id]:Math.min(99,Math.max(0,value))}));
  const copyOrder=async()=>{
    try { await navigator.clipboard.writeText(orderText); setCopied(true); window.setTimeout(()=>setCopied(false),2500); }
    catch { window.prompt('Copy your order summary:',orderText); }
  };
  return <>{open&&<button className="cart-overlay" type="button" aria-label="Close shopping bag" onClick={()=>setOpen(false)} />}
    <aside className={`cart-drawer ${open?'drawer-open':''}`} role="dialog" aria-modal={open} aria-hidden={!open} aria-label="Shopping bag" inert={!open?true:undefined}>
      <div className="cart-heading"><div><span className="eyebrow">YOUR SELECTION</span><h2>Shopping bag <em>({count})</em></h2></div><button ref={closeRef} className="icon-button" onClick={()=>setOpen(false)} aria-label="Close"><Icon name="close"/></button></div>
      <div className="cart-content">
        {!count?<div className="cart-empty"><Icon name="shopping" size={44}/><h3>A little empty in here.</h3><p>Discover the taste of sunshine. Your next favourite box is waiting.</p><button className="btn btn-solid" onClick={()=>{setOpen(false);document.getElementById('collection')?.scrollIntoView({behavior:'smooth'})}}>Explore the collection <Icon name="arrow"/></button></div>
        :<div className="cart-products">{entries.map(p=><div className="cart-item" key={p.id}><img src={p.image} alt="" width="120" height="100" loading="lazy" decoding="async"/><div className="cart-item-meta"><h3>{p.title}</h3><span>{p.weight} / {formatPrice(p.price)}</span><div className="stepper" aria-label={`Quantity for ${p.title}`}><button type="button" onClick={()=>setQty(p.id,p.qty-1)} aria-label={`Remove one ${p.weightLabel}`}><Icon name="minus" size={15}/></button><span aria-live="polite">{p.qty}</span><button type="button" onClick={()=>setQty(p.id,p.qty+1)} aria-label={`Add one ${p.weightLabel}`}><Icon name="plus" size={15}/></button></div></div><strong>{formatPrice(p.price*p.qty)}</strong></div>)}</div>}
      </div>
      {count>0&&<div className="cart-bottom"><div className="total-row"><span>Estimated total</span><strong>{formatPrice(total)}</strong></div><p className="cart-note">Demo prices only. Final price, stock and delivery must be confirmed.</p>{phone?<a className="btn btn-solid checkout-btn" href={`https://wa.me/${phone}?text=${encodeURIComponent(orderText)}`} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <Icon name="arrow"/></a>:<button className="btn btn-solid checkout-btn" type="button" onClick={copyOrder}><Icon name={copied?'check':'copy'}/>{copied?'Order summary copied':'Copy order enquiry'}</button>}<p className="helper-message">No backend or online payment is connected to this static website.</p></div>}
    </aside>
  </>;
}
