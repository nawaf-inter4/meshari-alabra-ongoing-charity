#!/usr/bin/env node
/**
 * Generates iOS apple-touch-startup-image assets for common iPhone sizes.
 *
 * Usage: node scripts/generate-apple-splash.mjs
 * Output: public/splash/apple-splash-*.png
 *
 * Regenerate after changing brand colors or the source PWA icon.
 */
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "splash");
const iconPath = path.join(root, "public", "icons", "icon-512x512.png");

/** Portrait logical CSS sizes × device pixel ratio → physical splash pixels. */
const SPLASHES = [
  { width: 1290, height: 2796, file: "apple-splash-1290x2796.png" }, // 14/15/16 Pro Max
  { width: 1179, height: 2556, file: "apple-splash-1179x2556.png" }, // 14/15/16 Pro
  { width: 1284, height: 2778, file: "apple-splash-1284x2778.png" }, // 12/13 Pro Max, 14 Plus
  { width: 1170, height: 2532, file: "apple-splash-1170x2532.png" }, // 12/13/14/15/16
  { width: 1125, height: 2436, file: "apple-splash-1125x2436.png" }, // X / XS / 11 Pro / 12/13 mini
  { width: 1242, height: 2688, file: "apple-splash-1242x2688.png" }, // XS Max / 11 Pro Max
  { width: 828, height: 1792, file: "apple-splash-828x1792.png" }, // XR / 11
  { width: 750, height: 1334, file: "apple-splash-750x1334.png" }, // SE / 8 / 7
  { width: 1242, height: 2208, file: "apple-splash-1242x2208.png" }, // 8 Plus
  { width: 2048, height: 2732, file: "apple-splash-2048x2732.png" }, // iPad Pro 12.9
];

const BG = { r: 15, g: 23, b: 42, alpha: 1 }; // --color-background-dark / slate-900
const ACCENT = { r: 212, g: 175, b: 55, alpha: 0.18 }; // islamic gold wash

async function buildSplash(width, height, iconBuffer) {
  const iconSize = Math.round(Math.min(width, height) * 0.22);
  const icon = await sharp(iconBuffer)
    .resize(iconSize, iconSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const ringSize = Math.round(iconSize * 1.28);
  const ringSvg = Buffer.from(`
    <svg width="${ringSize}" height="${ringSize}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${ringSize / 2}" cy="${ringSize / 2}" r="${ringSize / 2 - 2}"
        fill="none" stroke="rgba(212,175,55,0.45)" stroke-width="3"/>
    </svg>
  `);

  const left = Math.round((width - iconSize) / 2);
  const top = Math.round((height - iconSize) / 2 - height * 0.04);
  const ringLeft = Math.round((width - ringSize) / 2);
  const ringTop = Math.round((height - ringSize) / 2 - height * 0.04);

  const glow = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: await sharp({
          create: {
            width: Math.round(width * 0.7),
            height: Math.round(height * 0.35),
            channels: 4,
            background: ACCENT,
          },
        })
          .blur(80)
          .png()
          .toBuffer(),
        left: Math.round(width * 0.15),
        top: Math.round(height * 0.28),
      },
    ])
    .png()
    .toBuffer();

  return sharp({
    create: { width, height, channels: 4, background: BG },
  })
    .composite([
      { input: glow, left: 0, top: 0 },
      { input: ringSvg, left: ringLeft, top: ringTop },
      { input: icon, left, top },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const iconBuffer = await readFile(iconPath);

  for (const splash of SPLASHES) {
    const buffer = await buildSplash(splash.width, splash.height, iconBuffer);
    const dest = path.join(outDir, splash.file);
    await sharp(buffer).toFile(dest);
    console.log(`Wrote ${path.relative(root, dest)} (${splash.width}×${splash.height})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
