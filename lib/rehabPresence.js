import { getPublishedPortfolio } from './publishedPortfolio';
import { publishedOffer } from './publishedOffer.cjs';
import { fetchTaxonomyTable } from './platformDirectoryCards';
import { AREAS } from '../data/localServices';
import { UAE_EMIRATES } from '../data/siteTaxonomy';
import { ABU_DHABI_AREAS } from '../data/directoryDiscovery';

export const REHAB_SLUG = 'alrehab-home-clean';
export const REHAB_CODE = 'BR-2000029';
export const REHAB_ORIGIN = 'https://bietalreef.ae';
// User-supplied link resolved to the real Al Rehab Home Clean Google business listing.
export const REHAB_MAP_URL = 'https://share.google/yAJZBrAutMAPOxEHx';
// Exact copies of the approved media uploaded to BR-2000029's app profile.
// These are not the illustrative assets from the retired directory template.
export const REHAB_ACCOUNT_AVATAR = '/images/providers/alrehab/account-avatar.webp';
export const REHAB_ACCOUNT_COVER = '/images/providers/alrehab/account-cover.webp';
const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const parseSlug = (value) => typeof value === 'string' && SAFE_SLUG.test(value) ? value : null;
const sortByName = (a, b) => (a.name_ar || '').localeCompare(b.name_ar || '', 'ar');

export function resolveRehabRoute(parts = []) {
  if (!Array.isArray(parts)) return null;
  if ((parts.length === 3 || parts.length === 5) && parts[0] === 'service-areas' && ['al-ain','abu-dhabi'].includes(parts[1]) && (parts.length === 3 || parts[3] === 'services')) {
    const citySlug = parts[1], districtSlug = parseSlug(parts[2]);
    const source = citySlug === 'al-ain' ? AREAS : (UAE_EMIRATES.find(item => item.slug === 'abu-dhabi')?.areas || []).filter(item => ABU_DHABI_AREAS.includes(item.slug));
    const district = source.find(item => item.slug === districtSlug);
    const serviceSlug = parts.length === 5 ? parseSlug(parts[4]) : null;
    if (!district || (parts.length === 5 && !serviceSlug)) return null;
    const districtArea = { slug:district.slug, name_ar:district.nameAr, name_en:district.nameEn };
    return parts.length === 3 ? {kind:'service-areas', slug:district.slug, citySlug, districtArea} : {kind:'services', slug:serviceSlug, areaSlug:district.slug, citySlug, districtArea};
  }
  if (parts.length === 4 && parts[0] === 'service-areas' && parts[2] === 'services') {
    const areaSlug = parseSlug(parts[1]);
    const serviceSlug = parseSlug(parts[3]);
    return areaSlug && serviceSlug ? { kind: 'services', slug: serviceSlug, areaSlug } : null;
  }
  if (parts.length > 2) return null;
  if (!parts.length) return { kind: 'home' };
  const [section, slug] = parts;
  if (!['services', 'offers', 'service-areas'].includes(section)) return null;
  if (parts.length === 1) return { kind: section };
  const validatedSlug = parseSlug(slug);
  return validatedSlug ? { kind: section, slug: validatedSlug } : null;
}

export function presencePath(locale, route = { kind: 'home' }) {
  const prefix = locale === 'en' ? '/en' : '';
  const base = route.contextBase
    ? `${prefix}${route.contextBase}/${REHAB_SLUG}`
    : `${prefix}/providers/${REHAB_SLUG}`;
  if (route.kind === 'home') return base;
  if (route.citySlug && route.districtArea) {
    const districtBase = `${base}/service-areas/${route.citySlug}/${route.districtArea.slug}`;
    return route.kind === 'services' && route.slug ? `${districtBase}/services/${route.slug}` : districtBase;
  }
  if (route.kind === 'services' && route.slug && route.areaSlug) return `${base}/service-areas/${route.areaSlug}/services/${route.slug}`;
  return `${base}/${route.kind}${route.slug ? `/${route.slug}` : ''}`;
}

// Contextual URLs render the same published company data and retain the
// existing provider URLs as canonicals. A location is eligible only when the
// account's published coverage includes it.
export async function getRehabContextProps(context, locale, basePath, parts = []) {
  if (!['/uae/abu-dhabi', '/uae/abu-dhabi/cleaning-services'].includes(basePath)) {
    return { notFound: true };
  }
  const response = await getRehabServerProps(context, locale, parts);
  if (!response.props || response.props.unavailable) return response;
  const { data, route } = response.props;
  if (!data.areas.some(area => area.slug === 'abu-dhabi')) return { notFound: true };
  if (basePath.endsWith('/cleaning-services') && !data.categories.some(c => c.slug === 'cleaning-services')) return { notFound: true };
  return { props: { ...response.props, route: { ...route, contextBase: basePath }, rehabContext: true } };
}

export async function getRehabStaticContextProps(locale, basePath, parts = []) {
  const context = { res: { statusCode: 200, setHeader() {} } };
  const response = await getRehabContextProps(context, locale, basePath, parts);
  if (response.props?.unavailable) throw new Error('Published company data is temporarily unavailable');
  return response.props ? { ...response, revalidate: 60 } : response;
}

function normalizeCard(row) {
  const slug = parseSlug(row.content?.slug);
  if (!slug || !['service', 'offer'].includes(row.card_type)) return null;
  if (!row.title_ar?.trim() || !row.title_en?.trim()) return null;
  return {
    id: row.id, slug, type: row.card_type, updated_at:row.updated_at||null,
    name_ar: row.title_ar, name_en: row.title_en,
    description_ar: row.description_ar || '', description_en: row.description_en || '',
    image: (row.image_urls || []).find((url) => /^https:\/\//i.test(url) && !/^https:\/\/drive\.google\.com\/uc\?/i.test(url)) || null,
    sourceId: row.content?.source_id || null,
    offer: row.card_type==='offer'?publishedOffer(row.content,row.expires_at):null,
  };
}

/** Public rendering only. All queries run with the public Supabase key and obey RLS. */
export async function getRehabSiteData() {
  const profiles = await fetchTaxonomyTable(
    `provider_public_profiles?select=id,slug,public_provider_code,name_ar,name_en,short_description_ar,short_description_en,description_ar,description_en,phone,whatsapp,logo_url,cover_image_url,public_email,working_hours_ar,working_hours_en,founded_year,years_experience,provider_type,languages,created_at,updated_at,verification_status,publication_status,landing_page_status&slug=eq.${REHAB_SLUG}&public_provider_code=eq.${REHAB_CODE}&publication_status=eq.published&landing_page_status=eq.published&verification_status=eq.verified&limit=1`,
  );
  const profile = profiles[0];
  if (!profile) return null;

  const [accounts, locations, emirates, faqs, projects, classifications, taxonomy, cities, portfolioProjects] = await Promise.all([
    fetchTaxonomyTable(`platform_provider_accounts?select=id,provider_public_profile_id,status&provider_public_profile_id=eq.${profile.id}&status=eq.active&limit=1`),
    fetchTaxonomyTable(`provider_service_locations?select=id,emirate_id,city_id,area_id,coverage_notes_ar,coverage_notes_en,is_active,updated_at&provider_id=eq.${profile.id}&is_active=eq.true`),
    fetchTaxonomyTable('platform_emirates?select=id,slug,name_ar,name_en,display_order&is_active=eq.true&order=display_order.asc'),
    fetchTaxonomyTable(`provider_faqs?select=id,question_ar,question_en,answer_ar,answer_en,display_order&provider_id=eq.${profile.id}&is_published=eq.true&order=display_order.asc`),
    fetchTaxonomyTable(`provider_public_projects?select=id,slug,title_ar,title_en,description_ar,description_en,cover_image_url&provider_id=eq.${profile.id}&publication_status=eq.published&order=display_order.asc`),
    fetchTaxonomyTable(`provider_categories?select=category_id,is_primary&provider_id=eq.${profile.id}`),
    fetchTaxonomyTable('platform_categories?select=id,slug,name_ar,name_en&is_active=eq.true'),
    fetchTaxonomyTable('platform_cities?select=id,slug,name_ar,name_en&is_active=eq.true'),
    getPublishedPortfolio(REHAB_SLUG),
  ]);
  const accountId = accounts[0]?.id;
  const rows = accountId ? await fetchTaxonomyTable(
    `platform_content_cards?select=id,card_type,title_ar,title_en,description_ar,description_en,image_urls,content,status,starts_at,expires_at,updated_at&platform_provider_account_id=eq.${accountId}&status=eq.published&order=created_at.asc`,
  ) : [];
  const now = Date.now();
  const cards = rows.filter((r) => r.content?.channel === 'platform' && (!r.starts_at || Date.parse(r.starts_at) <= now) && (!r.expires_at || Date.parse(r.expires_at) > now)).map(normalizeCard).filter(Boolean);
  const emirateMap = new Map(emirates.map((e) => [e.id, e]));
  const cityMap = new Map(cities.map(c => [c.id,c]));
  const areas = locations.map((l) => {
    const e = l.city_id ? cityMap.get(l.city_id) : emirateMap.get(l.emirate_id);
    return e && !l.area_id ? { id: l.id, slug: e.slug, name_ar: e.name_ar, name_en: e.name_en, notes_ar: l.coverage_notes_ar || '', notes_en: l.coverage_notes_en || '', updated_at:l.updated_at||null } : null;
  }).filter(Boolean).sort(sortByName);
  const uniqueAreas = Array.from(new Map(areas.map((x) => [x.slug, x])).values());
  const taxonomyById = new Map(taxonomy.map((row) => [row.id, row]));
  const categories = classifications.map((row) => ({ ...taxonomyById.get(row.category_id), primary: row.is_primary }))
    .filter((row) => row.slug).sort((a, b) => Number(b.primary) - Number(a.primary));
  // The source cover is a Google Drive view URL (not usable as a public <img>).
  // Only render the approved asset snapshot if the account still references it.
  const media = {
    avatar: REHAB_ACCOUNT_AVATAR,
    cover: profile.cover_image_url?.includes('1sic4rPHUTfvK58yXRxP59XYzd242bkTc') ? REHAB_ACCOUNT_COVER : null,
    logo: profile.logo_url || null,
  };
  return { profile, media, categories, services: cards.filter((r) => r.type === 'service'), offers: cards.filter((r) => r.type === 'offer'), areas: uniqueAreas, faqs, projects, portfolioProjects };
}

export async function getRehabServerProps(context, locale, parts) {
  const route = resolveRehabRoute(parts);
  if (!route) return { notFound: true };
  try {
    const data = await getRehabSiteData();
    if (!data) return { notFound: true };
    const collection = route.kind === 'services' ? data.services : route.kind === 'offers' ? data.offers : route.kind === 'service-areas' ? data.areas : null;
    if (route.districtArea && !data.areas.some((area) => area.slug === route.citySlug)) return {notFound:true};
    if (route.slug && !(route.districtArea && route.kind === 'service-areas') && !collection?.some((item) => item.slug === route.slug)) return { notFound: true };
    if (route.areaSlug && !route.districtArea && !data.areas.some((area) => area.slug === route.areaSlug)) return { notFound: true };
    context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=180');
    return { props: { data, locale, route } };
  } catch (error) {
    console.error('Public provider presence data unavailable:', error?.message);
    // An unavailable source is not evidence that a company or its pages do not exist.
    context.res.statusCode = 503;
    context.res.setHeader('Retry-After', '60');
    context.res.setHeader('Cache-Control', 'no-store');
    return { props: { unavailable: true, locale, route } };
  }
}
