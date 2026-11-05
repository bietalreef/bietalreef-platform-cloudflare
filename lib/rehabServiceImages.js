// Supplied WebP artwork is matched to the supported service slugs.
const serviceSlugs = new Set([
  'sofa-cleaning', 'home-villa-cleaning', 'facade-glass-cleaning',
  'sanitization-pest-control', 'deep-cleaning', 'post-construction-cleaning',
  'pre-move-in-cleaning', 'carpet-rug-cleaning', 'majlis-cleaning',
  'courtyard-parking-cleaning', 'car-canopy-cleaning', 'tents-outdoor-majlis-cleaning',
]);
const alternates = { 'deep-cleaning':'deep-cleaning-alt', 'sanitization-pest-control':'sanitization-services-alt' };
function paths(slug) {
  const base = `/images/providers/alrehab/services/alrehab-home-clean-${slug}`;
  return { desktop:`${base}-desktop.webp`, mobile:`${base}-mobile.webp` };
}
export function rehabServiceImage(slug) { return serviceSlugs.has(slug) ? paths(slug) : null; }
export function rehabServiceAlternate(slug) { return alternates[slug] ? paths(alternates[slug]) : null; }
