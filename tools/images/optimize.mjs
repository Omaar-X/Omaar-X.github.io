// Build the optimised site images from the master files.
//
//   assets/source/images/**   original screenshots and portrait (not imported by the site)
//   assets/images/**          WebP files the site imports — generated, do not edit by hand
//
// The static export (GitHub Pages) has no image optimiser (`images.unoptimized`), so every image is
// shipped exactly as it sits in assets/images. Optimise here, once, at the size it is displayed.
//
// Usage: npm run images

import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import sharp from "sharp";

const sourceRoot = "assets/source/images";
const outputRoot = "assets/images";
const quality = 82;

/** Per-file overrides; everything else keeps its size and is re-encoded as WebP. */
const overrides = {
  // Shown at most ~400 CSS px wide (≈800 device px), usually far smaller.
  "profile/omar-faruk-portrait": { width: 800 },
};

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(png|jpe?g)$/i.test(entry.name)) yield path;
  }
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
let before = 0;
let after = 0;

for await (const source of walk(sourceRoot)) {
  const key = relative(sourceRoot, source).replaceAll("\\", "/").replace(extname(source), "");
  const output = join(outputRoot, `${key}.webp`);
  await mkdir(dirname(output), { recursive: true });

  const { width } = overrides[key] ?? {};
  const info = await sharp(source)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(output);

  const original = (await stat(source)).size;
  before += original;
  after += info.size;
  console.log(
    `${key.padEnd(40)} ${kb(original).padStart(9)} → ${kb(info.size).padStart(8)}  ${info.width}×${info.height}`,
  );
}

console.log(`${"total".padEnd(40)} ${kb(before).padStart(9)} → ${kb(after).padStart(8)}`);
