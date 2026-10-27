import { fetchTaxonomyTable } from './platformDirectoryCards';

export const AL_NAEEM_SLUG = 'al-naeem-cleaning-services';
export const AL_NAEEM_ORIGIN = 'https://bietalreef.ae';
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const allowedSections = ['services', 'offers', 'service-areas'];

export function alNaeemPath(locale = 'ar', route = { kind: 'home' }) {
  const prefix = locale === 'en' ? '/en' : '';
  const base = prefix + '/providers/' + AL_NAEEM_SLUG;
  return route.kind === 'home' ? base : base + '/' + route.kind + (route.slug ? '/' + route.slug : '');
}

export function resolveAlNaeemRoute(parts = []) {
  if (!Array.isArray(parts) || parts.length > 2) return null;
  if (!parts.length) return { kind: 'home' };
  const [kind, slug] = parts;
  if (!allowedSections.includes(kind)) return null;
  if (parts.length === 1) return { kind };
  return typeof slug === 'string' && SLUG_PATTERN.test(slug) ? { kind, slug } : null;
}

function normalizeCard(row) {
  const slug = row.content && row.content.slug;
  if (typeof slug !== 'string' || !SLUG_PATTERN.test(slug)) return null;
  if (!['service', 'offer'].includes(row.card_type)) return null;
  if (!row.title_ar?.trim() || !row.title_en?.trim()) return null;
  return {
    id: row.id, slug, name_ar: row.title_ar, name_en: row.title_en,
    description_ar: row.description_ar || '', description_en: row.description_en || '',
    image: (row.image_urls || []).find(x => /^https:\/\//i.test(x)) || null,
    type: row.card_type,
  };
}

/**
 * Read-only public publication contract.
 * Never inherit BR-2000030 (the separately verified Shams Al Bustan entity).
 * A DISTINCT, approved Al Nuaim profile and live platform channel are required.
 */
export async function getAlNaeemData() {
  const profiles = await fetchTaxonomyTable(
    'provider_public_profiles?select=id,slug,public_provider_code,name_ar,name_en,description_ar,description_en,short_description_ar,short_description_en,phone,whatsapp,logo_url,cover_image_url,verification_status,publication_status,landing_page_status' +
    '&slug=eq.' + AL_NAEEM_SLUG +
    '&public_provider_code=neq.BR-2000030' +
    '&verification_status=eq.verified&publication_status=eq.published&landing_page_status=eq.published&limit=1'
  );
  const profile = profiles[0];
  if (!profile) return null;

  const accounts = await fetchTaxonomyTable(
    'platform_provider_accounts?select=id,provider_public_profile_id,status' +
    '&provider_public_profile_id=eq.' + profile.id + '&status=eq.active&limit=1'
  );
  if (!accounts[0]) return null;
  const [rawCards, locations, emirates] = await Promise.all([
    fetchTaxonomyTable('platform_content_cards?select=id,card_type,title_ar,title_en,description_ar,description_en,image_urls,content,status,starts_at,expires_at' +
      '&platform_provider_account_id=eq.' + accounts[0].id + '&status=eq.published&order=created_at.asc'),
    fetchTaxonomyTable('provider_service_locations?select=id,emirate_id,city_id,area_id,coverage_notes_ar,coverage_notes_en,is_active' +
      '&provider_id=eq.' + profile.id + '&is_active=eq.true'),
    fetchTaxonomyTable('platform_emirates?select=id,slug,name_ar,name_en&is_active=eq.true'),
  ]);
  const now = Date.now();
  const cards = rawCards.filter(r => (!r.starts_at || Date.parse(r.starts_at) <= now) &&
    (!r.expires_at || Date.parse(r.expires_at) > now)).map(normalizeCard).filter(Boolean);
  const emirateMap = new Map(emirates.map(x => [x.id, x]));
  const areas = Array.from(new Map(locations.map(l => {
    const e = emirateMap.get(l.emirate_id);
    return e && !l.city_id && !l.area_id ? {
      id: l.id, slug: e.slug, name_ar: e.name_ar, name_en: e.name_en,
      description_ar: l.coverage_notes_ar || '', description_en: l.coverage_notes_en || '',
    } : null;
  }).filter(Boolean).map(x => [x.slug, x])).values());
  return {
    profile,
    services: cards.filter(x => x.type === 'service'),
    offers: cards.filter(x => x.type === 'offer'),
    areas,
  };
}

export async function getAlNaeemProps(context, locale, parts = []) {
  const route = resolveAlNaeemRoute(parts);
  if (!route) return { notFound: true };
  try {
    const data = await getAlNaeemData();
    if (!data) return { notFound: true };
    const collection = route.kind === 'services' ? data.services : route.kind === 'offers' ? data.offers : route.kind === 'service-areas' ? data.areas : null;
    if (route.slug && !collection?.some(x => x.slug === route.slug)) return { notFound: true };
    context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=180');
    return { props: { data, route, locale } };
  } catch (error) {
    console.error('Al Nuaim presence read failed:', error?.message);
    context.res.statusCode = 503;
    context.res.setHeader('Cache-Control', 'no-store');
    context.res.setHeader('Retry-After', '60');
    return { props: { unavailable: true, route, locale } };
  }
}
