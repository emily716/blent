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

const files = (await readdir(LOGOS_DIR)).filter((f) => f.endsWith(".svg"));

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
