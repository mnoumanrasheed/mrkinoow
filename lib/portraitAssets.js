// Original PNG remains the fallback; lossless WebP preserves the decoded pixels.
export function portraitAttributes(src, sizes) {
  if (!['/images/founder.png', '/images/co-founder.png'].includes(src)) return {};
  return { width: 1122, height: 1402, srcSet: `${src.replace('.png', '-lossless.webp')} 1122w`, sizes };
}
