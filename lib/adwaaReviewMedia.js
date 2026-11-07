import media from '../data/adwaaReviewMedia.json';

// These supplied creatives are attached only to matching cards. Callers must
// explicitly opt in for published views; the database and identity stay unchanged.
export function adwaaReviewMedia(providerCode, id, type, slug, allowPublished = false) {
  if ((!allowPublished && process.env.NEXT_PUBLIC_ISOLATED_REVIEW !== 'true') || providerCode !== 'BR-3000530') return null;
  const item=media[id];
  return item && item.type===type && item.slug===slug ? item : null;
}
