// Build script: render each SVG in website/public/logos/ to a 4x-scale PNG
// alongside it. Run with: node scripts/render-logo-pngs.mjs
//
// PNGs are committed to the repo so the /logos page can offer direct
// downloads (no client-side canvas conversion needed).

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SCALE = 4;
const __dirname = dirname(fileURLToPath(import.meta.url));
const LOGOS_DIR = join(__dirname, "..", "public", "logos");

const files = (await readdir(LOGOS_DIR)).filter(
  (f) => f.endsWith(".svg") && !f.includes("-v1")
);

for (const file of files) {
  const svgPath = join(LOGOS_DIR, file);
  const pngPath = join(LOGOS_DIR, file.replace(/\.svg$/, ".png"));
  const svg = await readFile(svgPath);

  const meta = await sharp(svg).metadata();
  const width = (meta.width ?? 300) * SCALE;

  const png = await sharp(svg, { density: 72 * SCALE })
    .resize({ width })
    .png()
    .toBuffer();

  await writeFile(pngPath, png);
  console.log(`✓ ${file} → ${file.replace(/\.svg$/, ".png")} (${width}px wide)`);
}

// Email signature variant: small + optimised, rendered from the standard
// colour mark. Display at width="240" in HTML for a crisp retina-quality
// logo at ~120px on standard screens.
const EMAIL_SOURCE = "logo.svg";
const EMAIL_WIDTH = 480;
const emailSvg = await readFile(join(LOGOS_DIR, EMAIL_SOURCE));
const emailPng = await sharp(emailSvg, { density: 72 * (EMAIL_WIDTH / 300) })
  .resize({ width: EMAIL_WIDTH })
  .png({ compressionLevel: 9, palette: true })
  .toBuffer();
await writeFile(join(LOGOS_DIR, "logo-email.png"), emailPng);
console.log(
  `✓ ${EMAIL_SOURCE} → logo-email.png (${EMAIL_WIDTH}px wide, ${(emailPng.length / 1024).toFixed(1)}KB)`
);
