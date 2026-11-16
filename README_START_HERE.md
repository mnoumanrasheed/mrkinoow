# MR. KINOOW | Cinematic Next.js Website

A real, editable **Next.js App Router** website built around the user's dark forest-green / ivory / orange reference artwork. This is a **frontend-only static site**, not a mockup image or a server-backed e-commerce application.

## Quick start (Windows / macOS / Linux)

1. Install **Node.js 20.9 or later** (recommended: latest Node.js LTS) from https://nodejs.org/.
2. Extract the ZIP and open the `MrKinoow_NextJS_Cinematic` folder itself in VS Code.
3. Open VS Code Terminal > New Terminal and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open **http://localhost:3000**.
5. View **http://localhost:3000/our-story** for the founders' page.


## What works

- Cinematic full-screen home hero featuring fruit photography, atmospheric lighting, floating movement, pointer-tracked perspective and smooth entry animation.
- **Four desktop sticky scroll chapters** with responsive scene fades, scroll-controlled photo transforms, giant editorial typography and progress indication.
- Mobile layout with **separate full-screen narrative chapters**, avoiding cropped/stuck scroll scenes on small displays.
- Orchard/editorial section, quality/brand values section, closing experience section and footer.
- Static three-product showcase with original illustrated 3D-style boxes.
- Functional **frontend-only shopping bag**: add/remove, quantities, totals, localStorage persistence. No database involved.
- Copyable order enquiry; if configured, an optional WhatsApp enquiry link prefilled with bag items. This is *not* a payment or checkout service.
- Dedicated `/our-story` page with two founder portrait slots and editable biographies.
- Keyboard-focus styles and reduced-motion support.

## Edit your brand details

Open `lib/siteConfig.js`. Set:

- `products[].price`, `title`, `subtitle`, `weight`
- `founders[].name`, `role`, `bio`, `image`
- optional WhatsApp number, email, Instagram and Facebook

**The Rs. 799 / Rs. 1,299 / Rs. 2,499 prices are illustrative placeholders from the visual concept. They are not verified store prices. Update or remove before launch.**

To use founder photographs, place them in `public/images/`, e.g.:

```text
public/images/founder.jpg
public/images/cofounder.jpg
```

Then configure `image: '/images/founder.jpg'`, etc. The two founder illustrations are intentionally placeholders and do not invent real people.

## Static deployment

The website has `output: 'export'` in `next.config.mjs`. Build with:

```bash
npm run build
```

The generated `out/` folder is a **static website** suitable for Netlify (publish directory `out`), Cloudflare Pages, GitHub Pages (with correct basePath) or ordinary static web hosting. Vercel can also import the Next.js project directly. No Node server is required after a static export.

**Netlify**: build command `npm run build`, publish directory `out`.

## Notes on animation and imagery

The design uses **photographic layered 3D-style parallax, 3D-perspective CSS transforms and scroll sequencing**. It is not a true interactive WebGL 3D scanned fruit model. For physical 3D rotations or peel simulations, a separate GLB model/Three.js scene would be needed. We intentionally kept the site lightweight and without a 3D runtime to improve mobile performance.

The visual assets are illustrative creative assets; replace them with real Mr. Kinoow orchard/product/packaging photographs before commercial launch..

## Folder map

```text
MrKinoow_NextJS_Cinematic/
├── app/
│   ├── page.jsx               # homepage
│   ├── layout.jsx             # metadata + global layout
│   ├── globals.css            # ALL colours, typography and animations
│   └── our-story/page.jsx     # dedicated founders page
├── components/
│   ├── HomeExperience.jsx     # homepage sections + interactions
│   ├── ScrollNarrative.jsx    # cinematic desktop scroll engine
│   ├── BrandShell.jsx         # navigation + footer
│   ├── CartDrawer.jsx         # frontend-only bag
│   └── Icons.jsx
├── lib/siteConfig.js          # MAIN EDITABLE BRAND CONFIG
├── public/images/             # included image assets
├── next.config.mjs            # static export
├── package.json
```

## Troubleshooting

- `npm not recognized` → install Node.js, restart VS Code.
- Port 3000 in use → Next.js may choose 3001. Use the address printed in the terminal.
- Photos not updating → verify files exist under `public/images` and URL starts `/images/`.
- Empty WhatsApp order option → configure `whatsapp` in `lib/siteConfig.js`, or use **Copy order enquiry**.
- First development launch slow → dependencies must be installed once through `npm install`.

This environment could not reach the npm registry, so a full Next.js compilation and real browser visual QA were **not** completed here. Source structure and local asset presence were checked. Run `npm install` and `npm run build` on your internet-connected machine to validate the full build.
