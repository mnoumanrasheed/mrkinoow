import React from 'react';

export default function Icon({ name, size = 20, strokeWidth = 1.5, ...props }) {
  const paths = {
    arrow: <><path d="M4 12h16"/><path d="m14 6 6 6-6 6"/></>,
    arrowDown: <><path d="M12 4v16"/><path d="m6 14 6 6 6-6"/></>,
    shopping: <><path d="M4 7h16l-1.2 14H5.2L4 7Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    minus: <path d="M5 12h14"/>,
    plus: <><path d="M5 12h14"/><path d="M12 5v14"/></>,
    close: <><path d="M5 5l14 14M19 5 5 19"/></>,
    menu: <><path d="M4 8h16M4 16h16"/></>,
    leaf: <><path d="M20 3C11 2 4 7 4 14a7 7 0 0 0 7 7C18 21 22 13 20 3Z"/><path d="M4 20C9 14 11 11 19 7"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    box: <><path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3Z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/></>,
    truck: <><path d="M2 6h12v12H2zM14 10h4l4 4v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
    check: <path d="m5 12 5 5L20 7"/>,
    star: <><path d="m12 2 3.1 6.3 7 .9-5.1 5 .9 7-5.9-3.3-6.2 3.3 1.2-7-5-5 7-.9L12 2Z"/></>,
    instagram: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
    whatsapp: <><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></>,
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>,
    tiktok: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}
