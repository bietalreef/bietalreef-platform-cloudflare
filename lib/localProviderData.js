import { PROVIDER_PUBLICATION_ENABLED } from './providerPublication';
import { normalizeUaePhone } from './localServices';
import { fetchTaxonomyTable } from './platformDirectoryCards';
import { alrehabTemplate } from '../data/providerTemplates/alrehab';
import { getRehabSiteData } from './rehabPresence';
import { getAlNaeemData } from './alNaeemPresence';
import { AREAS, CITY, CATEGORY, SERVICE_INTENTS } from '../data/localServices';

const readLocalTable = path => fetchTaxonomyTable(path, { timeoutMs: 20000 });

/** Editorial directory bridge for the independently published Al Nuaim website.
 * It does not inherit verification, billing or entitlements from BR-2000030.
 * Approved coverage is at Al Ain city level only, not individual districts.
 */
async function getAlNaeemLocalListing() {
  const data = await getAlNaeemData();
  const alAin = data.areas.some(area => area.slug === 'al-ain');
  if (!alAin || !data.services.length) return [];
  const serviceAliases = {
    'home-villa-cleaning': ['home-villa-cleaning'],
    'steam-carpet-sofa-cleaning': ['sofa-cleaning','carpet-rug-cleaning'],
    'curtains-upholstery-majlis-cleaning': ['majlis-cleaning'],
    'water-tank-cleaning-sanitization': ['water-tank-cleaning-sanitization'],
  };
  return [{
    id: data.profile.id, slug: data.profile.slug,
    name: { ar: data.profile.name_ar, en: data.profile.name_en },
    phone: normalizeUaePhone(data.profile.phone), whatsapp: normalizeUaePhone(data.profile.whatsapp),
    image: data.profile.logo_url, published: true, verified: false, editorialListing: true,
    visibility: {directory: true,requiresSubscription: false}, subscription: {active: false},
    coverage: [{ emirate:'abu-dhabi', city:'al-ain', areas:[], approved:true, source:'company_editorial_published' }],
    categories: ['cleaning-services'], mapsUrl: '', placements: [],
    services: data.services.flatMap(service => (serviceAliases[service.slug] || []).map(slug => ({
      id: service.id + '-' + slug, sourceSlug: service.slug, slug,
      title: { ar: service.name_ar, en: service.name_en },
      summary: { ar: service.description_ar, en: service.description_en },
      image: service.image, category:'cleaning-services', published:true,
      provenance:'company_editorial_published',
      pagePath: '/providers/' + data.profile.slug + '/services/' + service.slug,
    }))),
  }];
}

async function loadLocalProviders() {
  // Read the same public relations used by the existing directory. Never use
  // service-role credentials or make database writes from a directory page.
  if (!process.env.SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL) return getAlNaeemLocalListing();
  try {
    const [profiles, accounts, rows, emirates, cities, areas, categories, membership, serviceCards, serviceDefinitions] = await Promise.all([
      readLocalTable('provider_public_profiles?select=id,slug,name_ar,name_en,phone,whatsapp,logo_url,cover_image_url,verification_status,publication_status,landing_page_status&verification_status=eq.verified&publication_status=eq.published&landing_page_status=eq.published'),
      readLocalTable('platform_provider_accounts?select=id,provider_public_profile_id,status&status=eq.active'),
      readLocalTable('provider_service_locations?select=provider_id,emirate_id,city_id,area_id,coverage_type&is_active=eq.true'),
      readLocalTable('platform_emirates?select=id,slug&is_active=eq.true'),
      readLocalTable('platform_cities?select=id,slug,emirate_id&is_active=eq.true'),
      readLocalTable('platform_areas?select=id,slug,city_id&is_active=eq.true'),
      readLocalTable('platform_categories?select=id,slug&is_active=eq.true'),
      readLocalTable('provider_categories?select=provider_id,category_id'),
      readLocalTable('platform_content_cards?select=id,platform_provider_account_id,card_type,title_ar,title_en,description_ar,description_en,image_urls,content,published_at&card_type=eq.service&status=eq.published'),
      readLocalTable('platform_services?select=id,slug,category_id&is_active=eq.true'),
    ]);
    const activeAccount = Object.fromEntries(accounts.map(row => [row.provider_public_profile_id, row.id]));
    const lookup = records => Object.fromEntries(records.map(row => [row.id, row.slug]));
    const emirateById = lookup(emirates), cityById = lookup(cities), areaById = lookup(areas), categoryById = lookup(categories);
    const publishedProfiles = profiles.filter(row => activeAccount[row.id] && row.verification_status === 'verified').map(row => {
      const pilot = row.slug === alrehabTemplate.slug ? { phone: alrehabTemplate.contact.phone, whatsapp: alrehabTemplate.contact.whatsapp, image: alrehabTemplate.media.logo } : null;
      const categories = membership.filter(item => item.provider_id === row.id).map(item=>categoryById[item.category_id]).filter(Boolean);
      const services = serviceCards.filter(item => item.platform_provider_account_id === activeAccount[row.id]).flatMap(item => {
        const definition = serviceDefinitions.find(def => def.id === item.content?.taxonomy_service_id);
        if (!definition || !categoryById[definition.category_id]) return [];
        const intent = SERVICE_INTENTS.find(entry => entry.sourceSlugs.includes(definition.slug));
        return [{ id: item.id, entityId: definition.id, providerServiceId: item.content?.source_id || item.id,
          sourceSlug: definition.slug, slug: intent?.slug || definition.slug,
          title: { ar: item.title_ar || item.title_en, en: item.title_en || item.title_ar },
          summary: { ar: item.description_ar || '', en: item.description_en || '' },
          image: (item.image_urls || []).find(url => typeof url === 'string' && /^https:\/\//i.test(url)) || '', category: categoryById[definition.category_id], published: true, provenance: 'platform_content_cards', updatedAt: item.published_at }];
      });
      const coverage = rows.filter(item => item.provider_id === row.id).flatMap(item => {
        const broad = item.coverage_type === 'nationwide' || item.coverage_type === 'emirate' && emirateById[item.emirate_id] === CITY.emirate || cityById[item.city_id] === CITY.slug && !item.area_id;
        const district = areaById[item.area_id];
        const areaCity = areas.find(area => area.id === item.area_id)?.city_id;
        if (!broad && (cityById[item.city_id || areaCity] !== CITY.slug || !AREAS.some(area => area.slug === district))) return [];
        return [{ emirate: CITY.emirate, city: CITY.slug, areas: broad ? AREAS.map(area => area.slug) : [district], approved: true, source: 'provider_service_locations' }];
      });
      // Brand artwork/contact fallback is reused; services and coverage are live relations.
      return { id: row.id, slug: row.slug, name: { ar: row.name_ar || row.name_en, en: row.name_en || row.name_ar },
        mapsUrl: pilot ? 'https://share.google/IFGGGyVTMhwW0x8N6' : '', phone: normalizeUaePhone(row.phone || row.whatsapp) || pilot?.phone || '', whatsapp: normalizeUaePhone(row.whatsapp || row.phone) || pilot?.whatsapp || '', image: pilot?.image || row.logo_url || '/logo.png',
        published: row.publication_status === 'published', verified: row.verification_status === 'verified',
        visibility: { directory: true, requiresSubscription: false }, subscription: { active: false }, placements: [],
        services, categories, coverage };
    });
    const editorial = await getAlNaeemLocalListing();
    return [...publishedProfiles.filter(row => row.slug !== 'al-naeem-cleaning-services'), ...editorial];
  } catch (error) {
    console.error('Local directory public data unavailable:', error.message);
    throw new Error('Local directory data unavailable'); // Abort a build/revalidation rather than cache an incomplete page.
  }
}

let localProviderCache = null;
export async function getLocalProviders() {
  if (!PROVIDER_PUBLICATION_ENABLED) {
    // The legacy directory publication switch remains off for all other accounts.
    // Al Rehab alone has an approved, published platform channel. Its listing is
    // generated from that channel, not from the app/market service publication flags.
    const [data, editorial] = await Promise.all([getRehabSiteData(), getAlNaeemLocalListing()]);
    if (!data?.categories?.some((item) => item.slug === CATEGORY.slug) ||
        !data.areas.some((item) => item.slug === CITY.emirate) || !data.services.length) return editorial;
    const p = data.profile;
    const phone = normalizeUaePhone(p.phone || p.whatsapp);
    const whatsapp = normalizeUaePhone(p.whatsapp);
    return [{
      id: p.id, slug: p.slug,
      name: { ar: p.name_ar, en: p.name_en },
      phone, whatsapp, image: data.media?.avatar || p.logo_url || '/logo.png',
      published: true, verified: p.verification_status === 'verified',
      visibility: { directory: true, requiresSubscription: false },
      subscription: { active: false }, placements: [], mapsUrl: '',
      categories: data.categories.map((item) => item.slug),
      coverage: [{ emirate: CITY.emirate, city: CITY.slug, areas: AREAS.map((item) => item.slug), approved: true, source: 'provider_service_locations' }],
      services: data.services.map((item) => ({
        id: item.id, entityId: item.sourceId, providerServiceId: item.sourceId,
        sourceSlug: item.slug, slug: item.slug,
        title: { ar: item.name_ar, en: item.name_en },
        summary: { ar: item.description_ar, en: item.description_en },
        image: item.image || data.media?.cover || '', category: CATEGORY.slug,
        published: true, provenance: 'platform_content_cards',
      })),
    }, ...editorial];
  }
  if (localProviderCache && localProviderCache.expiresAt > Date.now()) return localProviderCache.promise;
  const promise = loadLocalProviders();
  localProviderCache = { promise, expiresAt: Date.now() + 300000 };
  try { return await promise; } catch (error) {
    if (localProviderCache?.promise === promise) localProviderCache = null;
    throw error;
  }
}
