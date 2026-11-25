'use client';

import { useEffect, useState } from 'react';
import styles from './PremiumLoader.module.css';

const STORAGE_KEY = 'mrkinoow-premium-loader';

export default function PremiumLoader() {
  const [phase, setPhase] = useState('visible');

  useEffect(() => {
    const alreadySeen = document.documentElement.dataset.loader === 'seen';
    if (alreadySeen) {
      setPhase('hidden');
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const leaveTimer = window.setTimeout(() => setPhase('leaving'), reducedMotion ? 180 : 1250);
    const hideTimer = window.setTimeout(() => {
      setPhase('hidden');
      document.body.style.overflow = previousOverflow;
      document.documentElement.dataset.loader = 'seen';
      try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
    }, reducedMotion ? 260 : 1900);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div className={`${styles.loader} ${phase === 'leaving' ? styles.leaving : ''}`} role="status" aria-label="Loading Mr. Kinoow">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.mark} aria-hidden="true">
          <span className={styles.orbit} />
          <span className={styles.fruit} />
          <span className={styles.leaf} />
        </div>
        <div className={styles.wordmark}>Mr. Kinoow<span className={styles.wordmarkLeaf} aria-hidden="true" /></div>
        <p>From orchard to doorstep</p>
        <div className={styles.progress} aria-hidden="true"><span /></div>
      </div>
      <div className={styles.meta} aria-hidden="true"><span>Punjab, Pakistan</span><span>Est. with purpose</span></div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
