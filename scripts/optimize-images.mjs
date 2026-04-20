#!/usr/bin/env node
/**
 * Recompress JPG assets in public/imgs/ in-place.
 *
 * - Resizes any image wider than MAX_WIDTH down to MAX_WIDTH (preserving aspect).
 * - Re-encodes with mozjpeg at QUALITY.
 * - Skips files that would get larger (keeps original).
 * - Prints a per-file and total byte delta.
 *
 * Visual output is kept close to the originals (QUALITY=82 is virtually
 * indistinguishable for photographs). Designed to be run before commits or
 * once when swapping assets.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = path.join(ROOT, 'public/imgs');
const MAX_WIDTH = 2000;
const QUALITY = 82;

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (entry.isFile() && /\.jpe?g$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function fmtKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function processOne(file) {
  const original = await fs.readFile(file);
  const meta = await sharp(original).metadata();

  let pipeline = sharp(original).rotate();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  const compressed = await pipeline
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toBuffer();

  if (compressed.length >= original.length) {
    return { file, before: original.length, after: original.length, skipped: true };
  }
  await fs.writeFile(file, compressed);
  return { file, before: original.length, after: compressed.length, skipped: false };
}

async function main() {
  const files = await walk(TARGET_DIR);
  if (files.length === 0) {
    console.log(`No JPG files found under ${TARGET_DIR}`);
    return;
  }
  console.log(`Optimizing ${files.length} files under ${path.relative(ROOT, TARGET_DIR)}`);

  let totalBefore = 0;
  let totalAfter = 0;
  for (const file of files) {
    const { before, after, skipped } = await processOne(file);
    totalBefore += before;
    totalAfter += after;
    const rel = path.relative(ROOT, file);
    if (skipped) {
      console.log(`  = ${rel} (kept ${fmtKB(before)})`);
    } else {
      const pct = (((before - after) / before) * 100).toFixed(1);
      console.log(`  ↓ ${rel}: ${fmtKB(before)} → ${fmtKB(after)} (−${pct}%)`);
    }
  }

  const saved = totalBefore - totalAfter;
  const pct = ((saved / totalBefore) * 100).toFixed(1);
  console.log(
    `\nTotal: ${fmtKB(totalBefore)} → ${fmtKB(totalAfter)} (saved ${fmtKB(saved)}, −${pct}%)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
