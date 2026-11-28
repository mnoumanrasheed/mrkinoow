'use client';
import { useEffect, useRef } from 'react';

export default function StoryJournalMotion({ children, className = '' }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const parallaxItems = [...root.querySelectorAll('[data-story-parallax]')];
    const timeline = root.querySelector('[data-story-timeline]');
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight || 1;
      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (viewport * .5 - (rect.top + rect.height * .5)) / viewport));
        item.style.setProperty('--story-parallax', `${progress * 18}px`);
      });
      if (timeline) {
        const rect = timeline.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport * .72 - rect.top) / Math.max(rect.height, 1)));
        timeline.style.setProperty('--timeline-progress', progress.toFixed(3));
      }
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return <main ref={rootRef} className={className}>{children}</main>;
}
