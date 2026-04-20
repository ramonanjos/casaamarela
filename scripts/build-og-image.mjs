#!/usr/bin/env node
/**
 * Builds the social sharing images (Open Graph / Twitter / Instagram / Stories)
 * from the FR01 pattern.
 *
 * Strategy: the source pattern is resized to fit each target canvas by its
 * longest-matching axis and then tiled until the canvas is fully covered,
 * followed by a center-crop to the exact output size. This guarantees there
 * are no white margins at any edge, regardless of aspect ratio.
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SRC = path.join(ROOT, 'public/imgs/FR/FR01.jpg');

const TARGETS = [
  // Facebook / Twitter / LinkedIn / Telegram / WhatsApp link preview.
  { out: 'public/og-image.jpg', width: 1200, height: 630 },
  // Instagram feed, WhatsApp status still, generic square.
  { out: 'public/og-image-square.jpg', width: 1080, height: 1080 },
  // Instagram / Facebook / WhatsApp stories, TikTok, Reels cover.
  { out: 'public/og-image-story.jpg', width: 1080, height: 1920 },
];

async function buildOne({ out, width, height }) {
  const meta = await sharp(SRC).metadata();
  const srcAspect = meta.width / meta.height;
  const targetAspect = width / height;

  // Decide tile orientation: we want the pattern to always cover the canvas
  // after tiling on one axis only. If the target is wider than the source,
  // scale by height and tile horizontally. Otherwise scale by width and tile
  // vertically. This keeps each "F" square visually similar across outputs.
  let tileW, tileH, axis;
  if (targetAspect >= srcAspect) {
    tileH = height;
    tileW = Math.ceil(srcAspect * tileH);
    axis = 'x';
  } else {
    tileW = width;
    tileH = Math.ceil(tileW / srcAspect);
    axis = 'y';
  }

  const tile = await sharp(SRC)
    .resize({ width: tileW, height: tileH, fit: 'cover' })
    .toBuffer();

  const tilesNeeded =
    axis === 'x'
      ? Math.ceil(width / tileW) + 1
      : Math.ceil(height / tileH) + 1;

  const canvasW = axis === 'x' ? tileW * tilesNeeded : tileW;
  const canvasH = axis === 'y' ? tileH * tilesNeeded : tileH;

  const composites = Array.from({ length: tilesNeeded }, (_, i) => ({
    input: tile,
    top: axis === 'y' ? i * tileH : 0,
    left: axis === 'x' ? i * tileW : 0,
  }));

  const cropLeft = Math.floor((canvasW - width) / 2);
  const cropTop = Math.floor((canvasH - height) / 2);

  await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite(composites)
    .extract({ left: cropLeft, top: cropTop, width, height })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(ROOT, out));

  console.log(`Wrote ${out} (${width}×${height})`);
}

async function main() {
  for (const target of TARGETS) {
    await buildOne(target);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
