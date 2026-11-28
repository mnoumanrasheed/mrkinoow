'use client';
import { useEffect, useRef } from 'react';

/**
 * Lightweight scroll-triggered reveal wrapper.
 * Applies a gentle fade-up + translate animation when the element enters the viewport.
 * Respects prefers-reduced-motion by rendering without animation.
 */
export default function StoryReveal({ children, tag: Tag = 'div', className = '', delay = 0, variant = 'rise', ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.dataset.revealReady = 'true';
    el.style.setProperty('--story-delay', `${delay}ms`);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = 'true';
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return <Tag ref={ref} className={className} data-story-reveal={variant} {...rest}>{children}</Tag>;
}

