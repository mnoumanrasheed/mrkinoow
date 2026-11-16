'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from './Icons';
import { siteConfig } from '@/lib/siteConfig';

export function Header({ count = 0, onOpenCart = () => {}, story = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const cb = () => setScrolled(window.scrollY > 30);
    cb(); window.addEventListener('scroll', cb, { passive:true });
    return () => window.removeEventListener('scroll', cb);
  }, []);
  return <header className={`site-header ${scrolled?'is-scrolled':''}`}>
    <div className="nav-inner shell">
      <Link href="/" aria-label="Mr. Kinoow home" className="wordmark"><span>Mr. Kinoow</span><sup>®</sup><i className="wordmark-leaf"/></Link>
      <nav className={`nav-links ${mobileOpen?'mobile-active':''}`} aria-label="Primary navigation">
        <Link className={!story?'nav-active':''} href="/" onClick={()=>setMobileOpen(false)}>Home</Link>
        <Link className={story?'nav-active':''} href="/our-story" onClick={()=>setMobileOpen(false)}>Our Story</Link>
        <Link href="/#collection" onClick={()=>setMobileOpen(false)}>Collection</Link>
      </nav>
      <div className="nav-actions">
        {!story && <button type="button" onClick={onOpenCart} className="cart-button" aria-label={`Open shopping bag with ${count} items`}><Icon name="shopping" size={24}/><span className="cart-count">{count}</span></button>}
        <button className="mobile-menu" type="button" aria-label={mobileOpen?'Close menu':'Open menu'} aria-expanded={mobileOpen} onClick={()=>setMobileOpen(v=>!v)}><Icon name={mobileOpen?'close':'menu'} size={26}/></button>
      </div>
    </div>
  </header>;
}

export function Footer() {
  const year = new Date().getFullYear();
  return <footer className="footer"><div className="shell footer-top">
    <div><Link href="/" className="footer-brand">Mr. Kinoow<sup>®</sup></Link><p>Good things grow naturally.</p></div>
    <div className="footer-links"><Link href="/">Home</Link><Link href="/our-story">Our Story</Link><Link href="/#collection">Collection</Link>{siteConfig.instagram && <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}{siteConfig.facebook && <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}</div>
  </div><div className="shell footer-bottom"><span>© {year} Mr. Kinoow. A little sunshine, every day.</span><span>Made with love, inspired by nature.</span></div></footer>;
}
