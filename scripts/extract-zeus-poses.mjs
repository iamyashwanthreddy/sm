// Cuts individual transparent Zeus poses out of the flattened pose sheet.
// Background = near-black pixels connected to the crop border (flood fill),
// so the black visor (enclosed by the white helmet) is preserved.
//
// Usage (sharp is not a project dependency; install it temporarily):
//   npm i --no-save sharp
//   node scripts/extract-zeus-poses.mjs <pose-sheet.png> src/assets/zeus [debug-sheet.png]
// Output is 2x-upscaled WebP; the site only imports the poses it uses.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const [, , sheetPath, outDir, debugPath] = process.argv;
fs.mkdirSync(outDir, { recursive: true });

// [name, x0, y0, x1, y1] in sheet pixels (1536x1024). Bottoms stop above the labels.
const POSES = [
  ['neutral', 20, 55, 155, 248],
  ['wave', 158, 60, 325, 248],
  ['happy', 328, 60, 520, 248],
  ['jump', 495, 30, 690, 240],
  ['thumbs-up', 683, 60, 815, 248],
  ['pointing', 832, 60, 1005, 248],
  ['thinking', 1022, 75, 1150, 250],
  ['confused', 1162, 85, 1350, 250],
  ['idea', 1368, 75, 1505, 250],
  ['laptop', 25, 335, 202, 503],
  ['typing', 202, 335, 362, 503],
  ['reading', 378, 330, 548, 503],
  ['thinking-seated', 568, 330, 725, 503],
  ['notes', 728, 340, 890, 503],
  ['searching', 905, 325, 1080, 503],
  ['investigating', 1090, 350, 1260, 503],
  ['whiteboard', 1278, 310, 1525, 503],
  ['creative-idea', 22, 580, 190, 738],
  ['designing', 198, 580, 350, 738],
  ['presenting', 358, 555, 590, 738],
  ['working', 583, 580, 795, 740],
  ['coffee', 812, 565, 935, 740],
  ['celebrating', 940, 550, 1170, 740],
  ['high-five', 1168, 575, 1330, 740],
  ['walking', 1335, 565, 1510, 740],
  ['launching', 0, 800, 192, 982],
  ['megaphone', 202, 815, 385, 982],
  ['social', 372, 800, 525, 982],
  ['running', 512, 830, 668, 985],
  ['victory', 680, 775, 870, 985],
  ['sitting', 858, 835, 1035, 985],
  ['tired', 1035, 810, 1190, 985],
  ['heart', 1205, 825, 1360, 985],
  ['cheering', 1365, 815, 1510, 985],
];

const DARK_PROPS = new Set(['laptop','typing','creative-idea','designing','social']);

const sheet = sharp(sheetPath).ensureAlpha();
const meta = await sheet.metadata();
const { data: full } = await sheet.raw().toBuffer({ resolveWithObject: true });
const W = meta.width;

const debugTiles = [];

for (const [name, x0, y0, x1, y1] of POSES) {
  const T0 = DARK_PROPS.has(name) ? 6 : 22; // fully transparent at/below
  const T1 = DARK_PROPS.has(name) ? 40 : 70; // fully opaque at/above
  const SPREAD = DARK_PROPS.has(name) ? 4 : 14;
  const w = x1 - x0;
  const h = y1 - y0;
  const px = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = ((y + y0) * W + (x + x0)) * 4;
      const di = (y * w + x) * 4;
      px[di] = full[si]; px[di + 1] = full[si + 1]; px[di + 2] = full[si + 2]; px[di + 3] = 255;
    }
  }
  const maxc = (i) => Math.max(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]);

  // Flood fill background from the border through dark pixels.
  const bg = new Uint8Array(w * h);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const i = y * w + x;
    if (bg[i] || maxc(i) >= T1) return;
    bg[i] = 1; stack.push(i);
  };
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
  while (stack.length) {
    const i = stack.pop();
    const x = i % w, y = (i / w) | 0;
    // Only continue spreading through genuinely dark pixels; ramp pixels are edges.
    if (maxc(i) > T0 + SPREAD) continue;
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
  }
  for (let i = 0; i < w * h; i++) {
    if (!bg[i]) continue;
    const a = Math.min(1, Math.max(0, (maxc(i) - T0) / (T1 - T0)));
    px[i * 4 + 3] = Math.round(a * 255);
    if (a > 0) for (let c = 0; c < 3; c++) px[i * 4 + c] = Math.min(255, px[i * 4 + c] / a);
  }

  // Keep the dominant connected component(s); drop doodles, sparkles and stray marks.
  const label = new Int32Array(w * h).fill(-1);
  const sizes = [];
  for (let s = 0; s < w * h; s++) {
    if (label[s] !== -1 || px[s * 4 + 3] < 40) continue;
    const id = sizes.length; let n = 0; const st = [s]; label[s] = id;
    while (st.length) {
      const i = st.pop(); n++;
      const x = i % w, y = (i / w) | 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const j = ny * w + nx;
        if (label[j] === -1 && px[j * 4 + 3] >= 40) { label[j] = id; st.push(j); }
      }
    }
    sizes.push(n);
  }
  const biggest = Math.max(...sizes);
  const keep = new Set(sizes.map((n, i) => (n >= biggest * 0.12 ? i : -1)).filter((i) => i >= 0));
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let i = 0; i < w * h; i++) {
    const keepIt = label[i] !== -1 ? keep.has(label[i]) : false;
    if (!keepIt) {
      // faint halo pixels adjacent to kept components survive; others are cleared
      if (px[i * 4 + 3] >= 40 || !nearKept(i)) px[i * 4 + 3] = 0;
    }
    if (px[i * 4 + 3] > 8) {
      const x = i % w, y = (i / w) | 0;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
  }
  function nearKept(i) {
    const x = i % w, y = (i / w) | 0;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const l = label[ny * w + nx];
      if (l !== -1 && keep.has(l)) return true;
    }
    return false;
  }

  const pad = 2;
  minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad); maxY = Math.min(h - 1, maxY + pad);
  const cw = maxX - minX + 1, ch = maxY - minY + 1;

  const img = sharp(Buffer.from(px.buffer), { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: minX, top: minY, width: cw, height: ch });
  const up = await img.resize({ width: cw * 2, height: ch * 2, kernel: 'lanczos3' }).png().toBuffer();
  await sharp(up).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(path.join(outDir, `${name}.webp`));
  console.log(name, `${cw * 2}x${ch * 2}`);

  if (debugPath) {
    const tile = await sharp(up).resize({ width: 300, height: 340, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    debugTiles.push(tile);
  }
}

if (debugPath) {
  // Checkerboard behind tiles so transparency problems are visible.
  const cols = 7, tw = 300, th = 360;
  const rows = Math.ceil(debugTiles.length / cols);
  const cb = Buffer.alloc(cols * tw * rows * th * 4);
  for (let y = 0; y < rows * th; y++) for (let x = 0; x < cols * tw; x++) {
    const v = ((x >> 4) + (y >> 4)) % 2 ? 90 : 160;
    const i = (y * cols * tw + x) * 4; cb[i] = v; cb[i + 1] = 60; cb[i + 2] = v; cb[i + 3] = 255;
  }
  await sharp(cb, { raw: { width: cols * tw, height: rows * th, channels: 4 } })
    .composite(debugTiles.map((t, i) => ({ input: t, left: (i % cols) * tw, top: Math.floor(i / cols) * th })))
    .png().toFile(debugPath);
}
