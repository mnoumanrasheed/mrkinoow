// Lossless encoding only; original assets and every cinematic asset remain untouched.
import sharp from 'sharp';
import { readFile, writeFile, stat } from 'node:fs/promises';

for (const name of ['founder', 'co-founder']) {
  const source = `public/images/${name}.png`;
  const target = `public/images/${name}-lossless.webp`;
  const original = await readFile(source);
  const output = await sharp(original).webp({ lossless: true, effort: 6 }).toBuffer();
  const pixels = async input => sharp(input).ensureAlpha().raw().toBuffer();
  const before = await pixels(original), after = await pixels(output);
  if (before.length !== after.length) throw new Error(`Dimension mismatch: ${name}`);
  for (let i = 0; i < before.length; i += 4) {
    // WebP discards irrelevant RGB under alpha=0; visible RGB and all alpha must match.
    if (before[i + 3] !== after[i + 3] || (before[i + 3] && !before.subarray(i, i + 3).equals(after.subarray(i, i + 3)))) throw new Error(`Visible pixel mismatch: ${name}`);
  }
  if (output.length >= original.length) throw new Error(`No size saving: ${name}`);
  await writeFile(target, output);
  console.log(`${name}: ${original.length} -> ${(await stat(target)).size} bytes; visible RGB and all alpha identical`);
}
