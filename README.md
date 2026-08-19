# blent

Marketing site for [blent](https://blentgroup.com) — water-based, bio-derived
industrial cleaning chemistry.

## Repository layout

```
blent/
├── website/      ← the actual Next.js site that gets deployed
├── assets/       ← original / source design files (NOT served by the site)
├── prototypes/   ← early HTML mockups, kept for reference
└── netlify.toml  ← Netlify deployment config (builds website/, publishes website/out/)
```

The two folders that get confused most often:

| Folder | What lives here | Used by the live site? |
| --- | --- | --- |
| `assets/` | Originals from the designer — high-res images, source SVGs | **No** — reference only |
| `website/public/` | Optimised / renamed copies that the site actually serves | **Yes** |

If you want to update an image on the site, edit (or add) the file in
`website/public/images/` — not `assets/images/`.

## website/

A [Next.js 16](https://nextjs.org) app using the App Router, exported as a
static site (`output: "export"` in `next.config.ts`).

```
website/
├── public/                 ← static files served at /
│   ├── images/             ← photos used on the site (industries, founders, products)
│   ├── logos/              ← all logo variants (svg + downloadable from /logos)
│   └── videos/             ← background videos
├── src/
│   ├── app/                ← Next.js app router
│   │   ├── page.tsx        ← homepage
│   │   ├── layout.tsx      ← root layout
│   │   ├── globals.css     ← Tailwind + global styles
│   │   └── logos/page.tsx  ← /logos — download the brand mark as SVG or PNG
│   ├── components/         ← React components used by pages
│   └── lib/
│       └── content.ts      ← all marketing copy in one place
├── package.json
├── next.config.ts
└── tsconfig.json
```

### Running locally

```bash
cd website
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to website/out/
```

## Logos / brand mark

Every variant of the logo lives in `website/public/logos/`:

| File | Use |
| --- | --- |
| `logo.svg` | Default mark (light on dark) |
| `logo-large.svg` | Larger / scalable variant |
| `logo-green.svg` | Green colourway |
| `logo-black.svg` | Black on light backgrounds |
| `logo-white.svg` | White on dark backgrounds |

A 4×-scale PNG sits next to each SVG (e.g. `logo.png` next to `logo.svg`),
plus a small `logo-email.png` (480×144, ~10KB) optimised for email
signatures. PNGs are rendered from the SVGs by
`website/scripts/render-logo-pngs.mjs` — re-run after editing any SVG with:

```bash
cd website
npm run render-logos
```

The site exposes both formats at **`/logos`** with direct download buttons
(SVG = vector, PNG = high-res 4× raster).

To add a new variant: drop the SVG into `website/public/logos/`, run
`npm run render-logos` to generate the matching PNG, then add a row to the
`LOGOS` array in `website/src/app/logos/page.tsx`.

The two original master SVGs from the designer are kept in `assets/logos/`
for reference (`blent-logo.svg`, `blent-logo-v1.svg`).

### Using the logo in a Gmail signature

Once this branch is merged and Netlify has rebuilt, the email-optimised PNG
will be live at:

```
https://www.blentgroup.com/logos/logo-email.png
```

Paste this into Gmail → Settings → Signature (use the "insert image → Web
address" option), or use HTML if you're editing a signature in a tool that
supports it:

```html
<img src="https://www.blentgroup.com/logos/logo-email.png"
     alt="blent"
     width="240"
     style="display:block;border:0">
```

The source is 480px wide so it stays crisp on retina screens when displayed
at 240px. Use `logo-black.png` instead if you want the full 1200px version.

## assets/

Source / unprocessed design files. Nothing here is served by the live site —
think of it as the "design archive". Filenames have been normalised to
kebab-case so they're safe to use anywhere.

```
assets/
├── images/    ← raw photos (originals)
└── logos/     ← original master SVGs
```

When something from `assets/` should appear on the site, copy it (resized /
optimised as needed) into `website/public/images/` and reference it from
there.

## prototypes/

Early HTML mockups, kept as a record of where the design came from. Not
deployed and not linked from anywhere. Open the files directly in a browser
to view.

## Deployment

Netlify (`netlify.toml`):

- Build base: `website/`
- Build command: `npm run build`
- Publish directory: `website/out/` (Next.js static export)
