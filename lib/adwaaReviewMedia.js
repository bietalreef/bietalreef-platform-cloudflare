import media from '../data/adwaaReviewMedia.json';

// These supplied creatives are attached only to the matching published cards
// in the isolated review. The live database and company identity stay unchanged.
export function adwaaReviewMedia(providerCode, id, type, slug) {
  if (process.env.NEXT_PUBLIC_ISOLATED_REVIEW !== 'true' || providerCode !== 'BR-3000530') return null;
  const item=media[id];
  return item && item.type===type && item.slug===slug ? item : null;
}
