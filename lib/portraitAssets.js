// Keep portrait dimensions explicit so the browser can reserve space before loading.
export function portraitAttributes(src, sizes) {
  if (!['/images/founder.png', '/images/co-founder.png'].includes(src)) return {};
  return { width: 1122, height: 1402, sizes };
}
