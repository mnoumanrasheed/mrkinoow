# Mr. Kinoow SEO implementation report

## Initial audit — 17 November 2026

The local repository remote matches `mnoumanrasheed/mrkinoow`. The worktree was clean at the start of this implementation. The audit covers the local source and static export, not a deployed production website.

### Confirmed findings

- Only `/` and `/our-story` existed. Both render content in exported HTML, each has one H1, and ordinary navigation links are crawlable. A client component is not automatically an SEO problem: Next prerenders the homepage.
- There is no configured production origin or canonical URL. Relative sharing images currently resolve to localhost during a build.
- Our Story has a unique title/description but inherits homepage Open Graph/Twitter values.
- `public/robots.txt` allows crawling; no sitemap exists. No production crawl or index coverage has been verified.
- No JSON-LD exists. Product detail pages and educational citrus pages do not exist.
- The cart labels the configured PKR 2,499 and PKR 2,399 prices as demo prices. WhatsApp, email and social account fields are empty. Offer, shipping, returns, ratings and LocalBusiness markup cannot be substantiated.
- Malta's configured asset is `box-5kg.svg`, although its product is 10 kg. Both SVGs say PREMIUM KINNOW. They are illustrations, not verified photographs of actual Malta packaging. Preserve originals; do not claim these labels are accurate.
- Founder names are still placeholders in configuration. Do not invent identities or add Person markup.
- The Google Fonts CSS uses `display=swap`, but an external CSS import delays discovery. The Hero already has high loading priority and explicit dimensions.
- Original PNG files are large; the orchard is about 3.42 MB and each portrait about 1.70 MB. Cinematic asset loading remains protected. Existing image containers generally reserve space.
- `npm run lint` runs an asset/source checker, not ESLint. There are no existing browser tests or Lighthouse setup. Chrome and Edge executables are installed; browser automation packages are not installed.
- Existing CSS contains cumulative refinement layers and global overflow clipping. These are not proof of correct layout. Browser checks are required; protected selectors will not be rewritten for SEO.

### Implementation priorities

1. A validated production-origin setting shared by metadata, sitemap and JSON-LD; safe preview output when unset.
2. Distinct page intent and metadata; crawlable citrus and actual-ID product routes.
3. Accurate structured data, excluding unverified offers and merchant policies.
4. Static export, internal-link and generated-HTML tests, followed by browser checks and deployment guidance.

## Implemented system

- Shared `SITE_URL` parser and per-page Metadata API helper. Every public page has distinct title, description, Open Graph/Twitter values and a self-canonical when the origin is configured. No localhost fallback image URLs are emitted.
- Production origin remains unset: the user's proposed `mr.kinoow.com` is a planned subdomain, not verified ownership. `.env.example` documents launch settings. Unconfigured builds are noindex previews with no canonical, social image URL or URL-based JSON-LD. `SEO_REQUIRE_SITE_URL=true` makes a missing origin fail the build; `SEO_INDEXABLE=false` supports previews with an origin.
- Seven routes: existing `/` and `/our-story`, new `/oranges`, `/kinnow`, `/malta`, `/products/premium-kinnow-10kg` and `/products/malta-10kg`. Existing product IDs are preserved.
- New guide and product templates use the existing fonts and palette through a dedicated CSS module. Existing Collection labels now lead to `/oranges`; existing homepage product names link to their product details. Hero collection anchors and the shopping bag remain unchanged.
- All five new routes use static generation and server-rendered content. No content API, checkout service, analytics package or runtime schema fetch was introduced.
- App Router `sitemap.js` and `robots.js` use `force-static`. They export to actual XML/TXT files. The old fixed `public/robots.txt` was replaced to avoid conflicting routes. An indexable build lists exactly seven URLs; a preview lists none. No fabricated modification dates are added.
- On configured builds, homepage Organization/WebSite and guide/product BreadcrumbList are serialized in initial HTML. Product pages contain basic Product/Brand/weight data. Serialization escapes `<` to prevent JSON-LD script injection.
- No Offer, availability, rating/review, MerchantReturnPolicy, shipping policy, LocalBusiness, invented contact, or fake search action. Article markup was not added: these are shopping guides, with no invented author or publication history. Site configuration still describes illustrative prices and blank contact channels.
- Product rich-result eligibility is **not** claimed. Google requires qualifying offer/review/rating data for product snippets. Basic Product vocabulary is useful semantic description but is intentionally incomplete for rich-result eligibility. Generic/mislabeled box illustrations are omitted from structured product image fields pending real approved imagery.
- Font preconnections reduce connection discovery delay while retaining the exact font families, CSS and animations. Existing `display=swap` and Hero high-priority image are preserved.
- Lossless portrait WebP derivatives retain dimensions, every visible RGB pixel and every alpha value. The encoder discards only invisible RGB under fully transparent pixels. Original PNGs remain as fallbacks. Original cinematic images are untouched. New SVG product images remain resolution-independent and use explicit intrinsic dimensions/contain sizing; there is no runtime image optimizer.

### Image results

| Asset | Original PNG bytes | Lossless WebP bytes | Saving |
| --- | ---: | ---: | ---: |
| Founder | 1,697,069 | 1,055,896 | 641,173 |
| Co-founder | 1,697,849 | 1,054,528 | 643,321 |
| Combined | 3,394,918 | 2,110,424 | 1,284,494 (37.8%) |

No lossy compression, new imagery or cropping changes were applied. The large cinematic PNGs remain a performance opportunity requiring a separate protected-asset decision. Image alt text on the new product pages correctly calls the artwork an illustration, not a photograph. Empty alt text on redundant linked guide images avoids repeating the adjacent product title.

## Validation performed

| Check | Result and limits |
| --- | --- |
| `npm run lint` | Passed existing asset/static-source checks. **Not ESLint**. No ESLint configured. |
| Production-shaped static build | Passed using reserved `https://seo-validation.invalid` solely as a test fixture. It is not a proposed deployment origin. |
| `npm run check:seo` with test origin | Passed all seven pages: unique metadata, title brand suffix, robots/canonical/OG relationships, H1 counts, local links/fragments, image files, JSON parsing and selected schema contracts. Sitemap and robots agree with route registry. |
| Final unconfigured build and `check:seo` | Passed. Final `out/` is a safe noindex preview with an empty sitemap and no canonical/social origin. The `.invalid` fixture is not left in deployment output. Rebuild with the confirmed origin for launch. |
| Crawl discovery | Local link traversal from homepage reaches all seven routes. No orphan pages, nonexistent internal URLs or broken anchor targets in the checked output. |
| Protected code | Source comparison against starting Git revision confirms entire `ScrollNarrative.jsx`, entire `app/globals.css`, `lib/siteConfig.js` and Hero function are unchanged. Cart implementation is unchanged in this phase. |
| Lossless images | Script checks dimensions, visible RGB and alpha equality before writing smaller derivatives. Both passed. |
| Chrome responsive tests | Passed 63 route/viewport combinations: all seven routes at 320, 360, 375, 390, 430, 768, 1024, 1440 and 1920 CSS pixels. Headless Chromium desktop engine resized to these widths, DPR 1; not a claim of real iOS/Android hardware testing. |
| Browser interactions | Passed adding both products, incrementing, totals PKR 4,998 and 7,397, persistence across reload, Escape/overlay/close, decrement to empty, mobile menu state/links and summary text. Clipboard writer was mocked to inspect text; actual OS clipboard/WhatsApp delivery not tested. |
| Narrative checks | Passed four visible untransformed mobile chapters; correct active chapter at four desktop scroll positions; reduced-motion transforms disabled. |
| Browser errors/assets | No uncaught JS exceptions and no HTTP errors captured. No broken image elements found. |
| Screenshots | Generated mobile/desktop oranges and Malta-product screenshots; mobile guide and desktop product inspected visually. Artifacts are local and gitignored. |
| External validators | Google Rich Results Test and Schema.org Validator **not executed**; local contracts are not substitutes for those services. Required live validation steps documented. |
| Search Console / Merchant Center | No verification, submission, indexing, account connection or feed publication performed. |
| Lighthouse / field CWV | No Lighthouse run, field data or INP measurement. Local PerformanceObserver samples below only. |

The Node-only check commands emit a module-type detection warning because the existing project uses ES module syntax in `.js` without a package-wide `type` declaration. Next.js builds complete successfully. No package-wide module-mode refactor was introduced for this test-only warning. The earlier robots static-export issue was checked through the full completed export; generated files are present in `out/`.

### Local performance samples

Chrome headless, local static HTTP server, no network or CPU throttling, DPR 1, cold browser cache per sample. Each sample uses a fixed viewport with no scrolling. Fonts still load externally, so timings vary. These are observations, not before/after improvements, Lighthouse scores or field CWV conclusions.

| Page | Width | Observed LCP | Observed CLS |
| --- | ---: | ---: | ---: |
| Homepage | 390 | 6,708 ms | 0.00938 |
| Homepage | 1440 | 2,080 ms | 0.00553 |
| Oranges | 390 | 452 ms | 0.00296 |
| Oranges | 1440 | 292 ms | 0.01242 |

The mobile homepage sample merits real deployed/mobile investigation. The protected entrance animation, large eager cinematic imagery and external font loading remain possible contributors; this run does not isolate causality. No animation was removed or retimed. Build first-load JS remains approximately 112 kB homepage and 107 kB for story/guides/products; no dependency was added.

### Remaining layout observations

The script detected child overflow on the existing collection section (oversized decorative watermark) at all widths and on the homepage navigation container (cart count badge) at desktop widths. No new-page clipping was detected. These flags alone are not evidence that visible text is cut off or that the document scrolls horizontally. Existing homepage CSS and protected scenes were preserved. Screenshot/device review of the existing design remains appropriate before launch.

## Files changed or added

- `.env.example`: documented origin/indexing controls.
- `.gitignore`: ignores local browser profiles/reports/screenshots.
- `app/layout.jsx`: metadata base/index policy, en-PK language and font preconnections.
- `app/page.jsx`: home metadata and conditional Organization/WebSite JSON-LD.
- `app/our-story/page.jsx`: unique full metadata and lossless portrait source selection.
- `app/[citrus]/page.jsx`: three statically generated guide routes.
- `app/products/[id]/page.jsx`: exact-ID product detail routes and basic Product JSON-LD.
- `app/robots.js`, `app/sitemap.js`: static metadata routes.
- `public/robots.txt`: removed; replaced by the generated static robots route.
- `components/HomeExperience.jsx`: existing product-title links and lossless portrait source selection only.
- `components/BrandShell.jsx`: Collection links to the guide hub; catalog header variant with no nonfunctional bag button.
- `components/CitrusPage.jsx`, `components/CitrusPage.module.css`: guide/product shell, breadcrumb navigation and scoped responsive styles.
- `components/JsonLd.jsx`: safely serialized structured data.
- `lib/seo.mjs`, `lib/seoContent.js`, `lib/seoRoutes.js`: configuration, metadata/schema helpers, content and public route registry.
- `lib/portraitAssets.js`: intrinsic dimensions and lossless source selection for known portraits.
- `public/images/founder-lossless.webp`, `public/images/co-founder-lossless.webp`: lossless derivatives; originals retained.
- `scripts/check-seo.mjs`, `scripts/check-browser.mjs`, `scripts/optimize-portraits.mjs`: reproducible export, browser and image checks.
- `package.json`: check commands only; dependencies unchanged.
- `SEO_IMPLEMENTATION_REPORT.md`, `SEO_KEYWORD_MAP.md`, `SEO_DEPLOYMENT_CHECKLIST.md`: audit, intent map and operational handoff.

## Official guidance used

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Canonical URL consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Sitemap construction](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Image SEO](https://developers.google.com/search/docs/appearance/google-images)
- [Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization) and [site names](https://developers.google.com/search/docs/appearance/site-names)
- [Product snippets](https://developers.google.com/search/docs/appearance/structured-data/product-snippet), [merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing), and [structured data quality](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Page experience](https://developers.google.com/search/docs/appearance/page-experience)

The deployment checklist covers final domain confirmation, host routing/caching, live validators, Search Console, Merchant Center readiness and monitoring. No ranking or indexation outcome is promised.
