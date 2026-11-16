# Customize Mr. Kinoow without touching complex code

### Colour palette (already applied)
- Forest-black base: `#07130e`
- Deep forest: `#102b1e`
- Cream ivory typography: `#f5ead1`
- Warm gold: `#ddb876`
- Citrus orange: `#f18b26`

These values are in `app/globals.css` under `:root`.

### Update founder identities
Edit `lib/siteConfig.js` > `founders`. The two roles are already configured as Founder & Executive Director and Co-Founder. Add actual names, approved bios and your own portrait photos.

### Change product prices
Edit `lib/siteConfig.js` > `products` > `price`. Currently showing placeholder prices from the visual reference. The shopping bag automatically uses those values.

### Put in actual cinematic photos
Replace these files while keeping filenames (or change matching src links):
- `public/images/hero-fruit.webp`: hero photography
- `public/images/fruit-layer.webp`: transparent, isolated cinematic fruit image
- `public/images/orchard-sunset.webp`: orchard background
- `public/images/peel-reveal.webp`: peeled fruit scene
- `public/images/citrus-splash.webp`: splash/fruit closeup
- `public/images/green-oranges.webp`: harvest fruit
- `public/images/box-3kg.svg`, `box-5kg.svg`, `box-10kg.svg`: illustrated packaging

Use permission-cleared assets and real product packaging for a live business.

### Static site behaviour
- **No backend, no API, no admin panel, no order database**.
- Bag contents live in the visitor's browser only.
- WhatsApp enquiry becomes available when `whatsapp` is configured.
- No automatic payment capture or order records are created by the website.

### Motion tuning
- Hero entrance, floating fruit, particle effects and card hover timings: `app/globals.css`.
- Scroll-scene fades/transform calculations: `components/ScrollNarrative.jsx`.
- Pointer movement intensity for the hero fruit: `components/HomeExperience.jsx` under `Hero`.
