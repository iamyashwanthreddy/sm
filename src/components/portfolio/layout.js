const PAIRABLE = ['square', 'identity'];

/**
 * Groups projects into editorial rows based on their cover format:
 *   feature   – the first landscape project, full width
 *   pair      – two square / identity covers side by side, offset
 *   strip     – a panorama shown as a cinematic band
 *   editorial – one project beside its text; alternates sides
 * Works for any filtered subset, so /work and the homepage share it.
 */
export function buildRows(projects) {
  const rows = [];
  let flip = false;
  let index = 0;
  const take = (p) => ({ project: p, index: index++ });

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const next = projects[i + 1];
    if (PAIRABLE.includes(p.format) && next && PAIRABLE.includes(next.format)) {
      rows.push({ type: 'pair', items: [take(p), take(next)] });
      i++;
    } else if (p.format === 'panorama') {
      rows.push({ type: 'strip', items: [take(p)] });
    } else if (rows.length === 0 && p.format === 'landscape') {
      rows.push({ type: 'feature', items: [take(p)] });
    } else {
      rows.push({ type: 'editorial', flip, items: [take(p)] });
      flip = !flip;
    }
  }
  return rows;
}

export const variantFor = (row, k) => (row.type === 'pair' ? (k === 0 ? 'pair-main' : 'pair-side') : row.type);
