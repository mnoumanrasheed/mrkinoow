# Keyword and page intent map

No keyword volumes, ranking difficulty scores or ranking guarantees are assumed. Search Console data should refine this map after launch. Broad “oranges” visibility is a long-term outcome of useful content, accurate products, reputation and site performance, not repetition of the word.

| URL | Primary intent and focus | Supporting queries | Distinct role |
| --- | --- | --- | --- |
| `/` | Brand storefront; fresh oranges Pakistan | premium kinnow Pakistan; Mr. Kinoow; fresh citrus | Introduce brand and collection. Preserve cinematic narrative. |
| `/oranges` | Orange comparison, selection and storage | oranges; fresh oranges; how to select fresh oranges; how to store oranges; types of citrus fruits in Pakistan | Compare the two available citrus choices and answer buying/storage questions. Not an exhaustive citrus taxonomy. |
| `/kinnow` | Understand the fruit and season | what is kinnow; fresh kinnow; kinnow vs orange; kinnow season in Pakistan | Educational variety guide linking to the exact box. No independent competing purchase page. |
| `/malta` | Understand the Malta listing and compare choices | Malta oranges; Malta vs kinnow | Explain approximate fruit count, differences and packaging caveat. No unsupported cultivar claims. |
| `/products/premium-kinnow-10kg` | Specific product enquiry | buy kinnow online; 10 kg kinnow box; kinnow delivery Pakistan | Exact existing product ID, weight, approximate count, indicative PKR price and enquiry process. Delivery coverage must be confirmed. |
| `/products/malta-10kg` | Specific product enquiry | buy Malta oranges Pakistan; 10 kg Malta box | Exact existing ID is `malta-10kg`, not `premium-malta-10kg`. No duplicate alias page. |
| `/our-story` | Brand trust and background | Mr. Kinoow story; people behind Mr. Kinoow | Existing content retained. Founder identity placeholders need owner-supplied facts before launch. |

“Buy oranges online Pakistan” can lead to the homepage collection and specific box pages, but the visible text must explain that the current site prepares enquiries rather than accepting payment. Do not advertise instant checkout or nationwide fulfilment.

## Linking and cannibalization controls

- Header/footer Collection links lead to `/oranges` using the existing visible label. The homepage Hero collection CTA still points to the existing collection anchor.
- Existing homepage product names link to their specific detail pages without changing their text or styling.
- `/oranges` links to both product pages and both variety guides. Each variety guide links to its matching product.
- Product pages link to their variety guide, orange selection/storage advice, the story and the existing collection.
- Breadcrumbs represent the same hierarchy and are emitted in static HTML and JSON-LD when a canonical origin is configured.
- Self-canonicalize each distinct page. Do not canonicalize unique guides to the homepage. Do not create extra city pages or near-duplicate keyword variants.
- Expand a guide only when customer questions or Search Console evidence justify it. Avoid splitting this small catalogue into overlapping thin pages.

## Editorial policy

Use the current configuration for product facts. Approximate counts are not guarantees. Source general horticultural statements from the linked Punjab Agriculture Department and UC Davis material, with context for historical seasonal research. Do not imply these institutions endorse or certify the brand. Do not invent first-hand farm visits, health claims, harvest dates, author credentials, reviews, certifications or customer results.

Review each page against [Google’s people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). Reassess queries and landing pages monthly; improve intent alignment before publishing more pages.
