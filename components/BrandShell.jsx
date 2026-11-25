'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from './Icons';
import { siteConfig } from '@/lib/siteConfig';

export function Header({ count = 0, onOpenCart = () => {}, story = false, catalog = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const cb = () => setScrolled(window.scrollY > 30);
    cb(); window.addEventListener('scroll', cb, { passive: true });
    return () => window.removeEventListener('scroll', cb);
  }, []);
  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  const phone = (siteConfig.whatsapp || '').replace(/\D/g, '');
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="nav-inner shell">
      <Link href="/" aria-label="Mr. Kinoow home" className="wordmark">
        <span>Mr. Kinoow</span><i className="wordmark-leaf"/>
      </Link>
      <nav id="primary-navigation" className={`nav-links ${mobileOpen ? 'mobile-active' : ''}`} aria-label="Primary navigation">
        <Link className={story ? 'nav-active' : ''} aria-current={story ? 'page' : undefined} href="/our-story" onClick={() => setMobileOpen(false)}>Our Story</Link>
        <Link className={catalog ? 'nav-active' : ''} aria-current={catalog ? 'page' : undefined} href="/oranges" onClick={() => setMobileOpen(false)}>Collection</Link>
      </nav>
      <div className="nav-actions">
        {phone && (
          <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="nav-whatsapp-btn" aria-label={`Contact Mr. Kinoow on WhatsApp at ${siteConfig.whatsappDisplay}`} title={`WhatsApp: ${siteConfig.whatsappDisplay}`}>
            <Icon name="whatsapp" size={19}/>
          </a>
        )}
        {!story && !catalog && <button type="button" onClick={onOpenCart} className="cart-button" aria-label={`Open shopping bag with ${count} items`}><Icon name="shopping" size={24}/><span className="cart-count">{count}</span></button>}
        <button className="mobile-menu" type="button" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-controls="primary-navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(v => !v)}><Icon name={mobileOpen ? 'close' : 'menu'} size={26}/></button>
      </div>
    </div>
  </header>;
}

export function Footer() {
  const year = new Date().getFullYear();
  const phone = (siteConfig.whatsapp || '').replace(/\D/g, '');
  return <footer className="footer">
    <div className="shell footer-luxury-grid">
      <div className="footer-brand-col">
        <Link href="/" className="footer-brand" aria-label="Mr. Kinoow home">
          <span>Mr. Kinoow</span><i className="wordmark-leaf"/>
        </Link>
        <p className="footer-tagline">&ldquo;From Our Farm to Your Doorstep.&rdquo;</p>
        <p className="footer-promise">&ldquo;From our own farm. Thoughtfully selected and packed.&rdquo;</p>
      </div>
      <div className="footer-col">
        <span className="footer-col-title">Explore</span>
        <div className="footer-col-links">
          <Link href="/our-story">Our Story</Link>
          <Link href="/oranges">Collection</Link>
          <Link href="/kinnow">Kinnow Guide</Link>
        </div>
      </div>
      <div className="footer-col">
        <span className="footer-col-title">Connect</span>
        <div className="footer-col-links">
          {phone && (
            <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" aria-label={`Direct WhatsApp ${siteConfig.whatsappDisplay}`}>
              <Icon name="whatsapp" size={15}/> <span>WhatsApp</span>
            </a>
          )}
          {siteConfig.instagram && (
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Mr. Kinoow on Instagram">
              <Icon name="instagram" size={15}/> <span>Instagram</span>
            </a>
          )}
          {siteConfig.tiktok && (
            <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Mr. Kinoow on TikTok">
              <Icon name="tiktok" size={15}/> <span>TikTok</span>
            </a>
          )}
          {siteConfig.facebook && (
            <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" aria-label="Mr. Kinoow on Facebook">
              <Icon name="facebook" size={15}/> <span>Facebook</span>
            </a>
          )}
          {siteConfig.linkedin && (
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Mr. Kinoow on LinkedIn">
              <Icon name="linkedin" size={15}/> <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>
      <div className="footer-col footer-assurance-col">
        <span className="footer-col-title">Delivery Assurance</span>
        <p className="footer-delivery-tag">Complimentary Nationwide Delivery via <strong>{siteConfig.courier.partner}</strong>.</p>
        <div className="footer-video-notice">
          <Icon name="check" size={14}/>
          <span>Harvesting and packing reference video included with every order through WhatsApp.</span>
        </div>
      </div>
    </div>
    <div className="shell footer-bottom-luxury">
      <span>&copy; {year} Mr. Kinoow. All rights reserved.</span>
      <span className="footer-origin-note">Own Farm &middot; Thoughtfully Packed &middot; Free Delivery Across Pakistan</span>
    </div>
  </footer>;
}
