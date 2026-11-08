// Geographic views use the existing published platform cards and taxonomy.
// No separate catalogue or provider publication state is introduced here.
const {publishedOffer}=require('./publishedOffer.cjs');
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALIASES = Object.freeze({
  'aluminium-wood-glass': 'aluminium-glass',
  'factories-suppliers': 'equipment-rental',
});
const normalizeSector = value => ALIASES[value] || value;
const validSlug = value => typeof value === 'string' && VALID_SLUG.test(value);

function servicePath({locale = 'ar', emirate = 'abu-dhabi', city = '', area = '', sector, service, provider}) {
  if (!['ar', 'en'].includes(locale) || !['abu-dhabi','dubai'].includes(emirate) || ![sector, service, provider].every(validSlug) || (city && (city !== 'al-ain' || emirate !== 'abu-dhabi')) || (area && !validSlug(area))) return null;
  const root = `${locale === 'en' ? '/en' : ''}/uae/${emirate}${city ? '/al-ain' : ''}${area ? `/${area}` : ''}`;
  return `${root}/${sector}/${service}/${provider}`;
}

function isCovered(locations, profileId, emirates, cities, areas, citySlug, areaSlug = '', emirateSlug = 'abu-dhabi') {
  const emirate = emirates.find(row => row.slug === emirateSlug);
  const city = citySlug ? cities.find(row => row.slug === citySlug && row.emirate_id === emirate?.id) : null;
  if (!emirate || (citySlug && !city)) return false;
  const area = areaSlug ? areas.find(row => row.slug === areaSlug && cities.some(c => c.id === row.city_id && c.emirate_id === emirate.id && (!city || c.id === city.id))) : null;
  const areaAsCity = areaSlug && !citySlug ? cities.find(row => row.slug === areaSlug && row.emirate_id === emirate.id) : null;
  if (areaSlug && !area && !areaAsCity) return false;
  return locations.some(row => {
    if (row.provider_id !== profileId || row.is_active !== true) return false;
    if (row.coverage_type === 'nationwide') return true;
    const rowArea = areas.find(item => item.id === row.area_id);
    const locationCity = cities.find(item => item.id === row.city_id) || cities.find(item => item.id === rowArea?.city_id);
    if ((row.emirate_id || locationCity?.emirate_id) !== emirate.id) return false;
    if (row.coverage_type === 'emirate' && !row.city_id && !row.area_id) return true;
    if (areaSlug) {
      if (row.area_id) return row.area_id === area?.id;
      return !!locationCity && (locationCity.id === area?.city_id || locationCity.id === areaAsCity?.id);
    }
    if (city) return locationCity?.id === city.id;
    return true;
  });
}

function buildGeographicServiceCards(data, {locale = 'ar', emirate = 'abu-dhabi', city = '', area = '', sector, cardType = 'service', now = Date.now()} = {}) {
  if (!['service','offer'].includes(cardType) || !['ar', 'en'].includes(locale) || !['abu-dhabi','dubai'].includes(emirate) || (city && (city !== 'al-ain' || emirate !== 'abu-dhabi')) || (area && !validSlug(area)) || !validSlug(sector)) return [];
  const categories = data.categories || [];
  const anchor = categories.find(row => row.slug === normalizeSector(sector));
  if (!anchor) return [];
  const activityIds = new Set((data.categoryMap || []).filter(row => row.category_id === anchor.id).map(row => row.activity_id));
  const activities = new Map((data.activities || []).map(row => [row.id, row]));
  const specialties = new Map((data.specialties || []).filter(row => row.audience_type === 'company' && row.is_active !== false).map(row => [row.id, row]));
  const services = new Map((data.services || []).filter(row => row.is_active !== false).map(row => [row.id, row]));
  const accounts = new Map((data.accounts || []).filter(row => row.status === 'active').map(row => [row.id, row]));
  const profiles = new Map((data.profiles || []).filter(row => row.publication_status === 'published' && row.landing_page_status === 'published' && row.verification_status === 'verified').map(row => [row.id, row]));
  return (data.cards || []).flatMap(card => {
    const content = card.content || {};
    if (card.card_type !== cardType || card.status !== 'published' || content.channel !== 'platform') return [];
    if ((card.starts_at && Date.parse(card.starts_at) > now) || (card.expires_at && Date.parse(card.expires_at) <= now)) return [];
    const account = accounts.get(card.platform_provider_account_id);
    const provider = account && profiles.get(account.provider_public_profile_id);
    if (!provider || !isCovered(data.locations || [], provider.id, data.emirates || [], data.cities || [], data.areas || [], city, area, emirate)) return [];
    const ids = [...new Set([content.taxonomy_service_id, ...(Array.isArray(content.taxonomy_service_ids) ? content.taxonomy_service_ids : [])].filter(Boolean))];
    const matches = ids.map(id => services.get(id)).filter(Boolean).map(service => ({service, specialty:specialties.get(service.specialty_id)})).filter(pair => pair.specialty && activityIds.has(pair.specialty.activity_id) && activities.has(pair.specialty.activity_id));
    if (!matches.length) return [];
    const providerSlug = (data.providerSlugOverrides || {})[provider.slug] || provider.slug;
    const slug = content.slug;
    const serviceHref = servicePath({locale, emirate, city, sector, service:cardType==='offer' ? content.service_slug : slug, provider:providerSlug, area});
    const href = cardType==='offer' && validSlug(slug) ? `${locale === 'en' ? '/en' : ''}/providers/${providerSlug}/offers/${slug}` : serviceHref;
    if (!href || !card.title_ar || !card.title_en) return [];
    const name = locale === 'en' ? card.title_en : card.title_ar;
    const providerName = locale === 'en' ? provider.name_en || provider.name_ar : provider.name_ar;
    const selectedEmirate=(data.emirates||[]).find(row=>row.slug===emirate);
    const placeRecord = area ? (data.areas || []).find(row => row.slug === area && (data.cities || []).some(c => c.id === row.city_id && c.emirate_id===selectedEmirate?.id && (!city || c.slug === city))) || (data.cities || []).find(row => row.slug === area && row.emirate_id===selectedEmirate?.id) : null;
    const emirateName = emirate === 'dubai' ? (locale === 'en' ? 'Dubai' : 'دبي') : (locale === 'en' ? 'Abu Dhabi' : 'أبوظبي');
    const placeName = placeRecord ? (locale === 'en' ? placeRecord.name_en : placeRecord.name_ar) : city ? (locale === 'en' ? 'Al Ain' : 'العين') : emirateName;
    return [{id:card.id, name, description:(locale === 'en' ? card.description_en : card.description_ar) || '', image:(card.image_urls || []).find(url => typeof url === 'string' && /^https:\/\//.test(url)) || null, imageMobile:typeof content.image_mobile_url==='string' && /^https:\/\//.test(content.image_mobile_url)?content.image_mobile_url:null,
      imageIllustrative:content.media_is_illustrative === true, providerName, providerSlug, providerId:provider.id, providerCode:provider.public_provider_code || '', providerLogo:provider.logo_url || null,
      providerPhone:provider.phone || null, providerWhatsappNumber:provider.whatsapp || null, providerVerified:true, href,
      providerHref:`${locale === 'en' ? '/en' : ''}/uae/${emirate}${city ? '/al-ain' : ''}${area ? `/${area}` : ''}/${providerSlug}`,
      serviceSlug:slug, cardType, linkedServiceHref:cardType==='offer'?serviceHref:null, discountPercent:cardType==='offer'?publishedOffer(content,card.expires_at).discountPercent:null, sector, emirate, city, area, locale, placeName, location:area ? `${placeName}, ${city ? (locale === 'en' ? 'Al Ain' : 'العين') : emirateName}` : city ? (locale === 'en' ? 'Al Ain, Abu Dhabi' : 'العين، أبوظبي') : emirateName,
      specialties:matches.map(({specialty}) => ({slug:specialty.slug, name:locale === 'en' ? specialty.name_en : specialty.name_ar})),
      taxonomyServices:matches.map(({service}) => ({slug:service.slug, name:locale === 'en' ? service.name_en : service.name_ar}))}];
  });
}

module.exports = { normalizeSector, servicePath, isCovered, buildGeographicServiceCards };
