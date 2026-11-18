# SEO deployment checklist

## 1. Confirm origin and business facts

The user supplied `https//mr.kinoow.com` as a planned address while indicating the domain still needs to be purchased. It is not configured as a verified production host. `mr.kinoow.com` is a subdomain of `kinoow.com`; control of the parent domain or delegated DNS is necessary. Confirm the final hostname, HTTPS and ownership before setting `SITE_URL`.

- Copy `.env.example` to an ignored local environment file, or set equivalent variables in the hosting build job.
- Set `SITE_URL` to the **confirmed HTTPS origin**, without a subpath, query, port or credentials.
- For a public production build set `SEO_INDEXABLE=true` and `SEO_REQUIRE_SITE_URL=true`.
- For a preview set `SEO_INDEXABLE=false`. An unset `SITE_URL` automatically emits noindex, no canonical/social image URLs, no URL-based JSON-LD, and an empty sitemap. Crawling stays allowed so bots can read noindex.
- Do not deploy the final preview build as indexable production. Rebuild after changing environment values: the files are static.
- Do not rely on noindex for privacy. Protect private staging with host authentication if needed.
- Confirm price status: current bag copy says demo prices. No Offer is emitted. Confirm actual product/packing photographs, Malta labels, founder names, contact channel, delivery coverage and any commercial promises already in the homepage configuration.

## 2. Build and serve static files

Run `npm run lint`, `npm run build`, and `npm run check:seo` with the **same environment**. The lint command is an asset checker, not ESLint. No ESLint configuration was added.

Publish `out/`. This remains a frontend-only static export. Do not use `next start` to serve `output: 'export'`; use a static host.

- Confirm the host resolves extensionless URLs such as `/oranges` to `oranges.html`, and `/products/malta-10kg` to `products/malta-10kg.html`.
- Return a real 404 status for nonexistent paths; do not serve the homepage with 200 for every URL.
- Redirect HTTP and alternate hosts to the chosen HTTPS host. Set one consistent policy for `.html` aliases and trailing slashes, redirecting them to the extensionless canonical path. Root slash/no-slash serialization represents the same origin.
- Confirm `/robots.txt` and `/sitemap.xml` return 200 with the right content types. App Router metadata routes are explicitly `force-static` and were exported successfully.
- The production sitemap must contain exactly the seven current public routes, no fragments/query strings and no fabricated last-modified dates.
- Canonicals, Open Graph URLs, JSON-LD IDs and sitemap URLs must all use the same origin. See [Google’s canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
- Serve hashed `/_next/static/` files with long-lived immutable caching. Use revalidation or a shorter TTL for HTML and unversioned image files. Enable host gzip/Brotli. Do not apply immutable caching indiscriminately to every file.
- Preserve origin image files. Committed lossless portrait WebP copies are selected by `srcSet`; the PNG paths remain fallbacks. Re-running `node scripts/optimize-portraits.mjs` requires the existing installed Sharp build dependency and verifies visible pixels.

## 3. Validate live metadata and structured data

- View source (not just the browser inspector) on every route: unique title/description, one H1, absolute self-canonical and index/follow when public.
- Organization and WebSite appear on the homepage when `SITE_URL` is set. No fake address, telephone, logo, SearchAction or business location is emitted.
- BreadcrumbList appears on guides and product pages. Basic Product entities contain accurate names, weight, URL and brand. **They are not currently eligible for Google product rich results**: no offers, reviews or ratings are supplied. The generic/mislabeled artwork is not asserted as a structured product image.
- Google product snippets need qualifying offer/review/rating data; valid Schema.org vocabulary alone does not establish Google eligibility. See [product snippet requirements](https://developers.google.com/search/docs/appearance/structured-data/product-snippet).
- Run the [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema.org Validator](https://validator.schema.org/) on the actual public homepage, guide and both product pages. Record results. These external validators were not executed during local implementation; the script checks JSON parsing and selected contracts only.
- Do not fill missing structured-data fields with invented reviews, stock, prices or policies to silence validation warnings. Follow [structured data quality guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- Test social sharing images from the public host; existing brand imagery is used, without asserting it is a photograph of actual delivered products.

## 4. Search Console

1. Add a Domain property for the domain you control and verify using the requested DNS TXT record. A URL-prefix property is an alternative when domain-level access is unavailable.
2. Inspect the live homepage, one guide and each product page. Confirm rendering, canonical selection and that production noindex is absent.
3. Submit the real `/sitemap.xml` in Sitemaps and monitor processing errors.
4. Request indexing of a small number of priority pages after launch. Submission is not confirmation of indexing; see [Google’s sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
5. Check Page Indexing, HTTPS, manual actions, and enhancement reports as data becomes available. Investigate Google-selected canonical discrepancies before adding more content.

No Search Console verification, submission, indexing or ranking result is claimed by this implementation.

## 5. Merchant Center and local visibility

Current readiness: **not established**. The website prepares an enquiry, contact details are blank, prices are flagged illustrative, no shipping/returns policy exists, and images are illustrative. Do not upload a live product feed or claim merchant eligibility yet.

Review actual order completion, current prices, stock, supported payment method, customer contact, fulfilment and return policies against [Merchant Center checkout requirements](https://support.google.com/merchants/answer/10249082?hl=en) and [Google merchant listing documentation](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing). A payment gateway is not the only permitted payment method, but a functioning, eligible purchase flow must exist; copying an enquiry is not proof of one.

Publish genuine policies and product details before considering Offer/shipping/return markup. Do not add city landing pages or LocalBusiness schema based only on “Punjab, Pakistan.” If there is a real eligible customer-facing or service-area business, review Google Business Profile eligibility and verify the actual business; an online-only brand must not invent a public location.

## 6. Monitoring and maintenance

- First week: verify route status codes, image loading, canonical hosts, noindex removal, sitemap processing and enquiry functionality on mobile.
- Weekly during launch: inspect Search Console coverage, query/page pairs, clicks, impressions and CTR. Compare equivalent periods, avoiding promises of rank improvement.
- Monthly: review keyword overlap, broken links, price/policy accuracy, source freshness and customer questions. Update content because facts change, not just to alter dates.
- Collect real field Core Web Vitals from Search Console/CrUX when traffic qualifies. No field LCP/INP/CLS or Lighthouse score is inferred from a local build. Use mobile and desktop Lighthouse or PageSpeed Insights after deployment and preserve the cinematic experience while addressing evidenced bottlenecks.
- Run `npm run check:browser` with installed Chrome (`CHROME_PATH` can override its Windows location). Screenshots, local timing samples and layout findings go to ignored `.seo-artifacts/`. Tests use a temporary profile under that folder, with no personal browser profile access.
