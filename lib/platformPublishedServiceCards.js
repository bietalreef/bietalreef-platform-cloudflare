import { fetchTaxonomyTable } from './platformDirectoryCards';
import { companyPath, getPublishedCompanySiteData } from './publishedCompanyPresence';
import { buildCardWhatsappUrl } from './providerWhatsapp';
import { rehabServiceImage } from './rehabServiceImages';
import { adwaaReviewMedia } from './adwaaReviewMedia';
import { kawkabServiceImage } from './kawkabPresence';
import { getArea } from '../data/siteTaxonomy';
import { getLocalArea } from './localServices';
import { buildGeographicServiceCards, isCovered, servicePath } from './geographicServiceModel.cjs';

// Read the same platform-channel records and taxonomy used elsewhere. Location
// selection is evaluated against the provider's actual active coverage.
export async function getGeographicPublishedServiceCards(locale = 'ar', {sector, emirate = 'abu-dhabi', city = '', area = '', cardType = 'service'} = {}) {
  const [profiles, accounts, cards, activities, categories, categoryMap, specialties, services, locations, emirates, cities, areas] = await Promise.all([
    fetchTaxonomyTable('provider_public_profiles?select=id,slug,name_ar,name_en,phone,whatsapp,logo_url,cover_image_url,verification_status,publication_status,landing_page_status,public_provider_code&publication_status=eq.published&landing_page_status=eq.published&verification_status=eq.verified'),
    fetchTaxonomyTable('platform_provider_accounts?select=id,provider_public_profile_id,status&status=eq.active'),
    fetchTaxonomyTable(`platform_content_cards?select=id,platform_provider_account_id,card_type,title_ar,title_en,description_ar,description_en,image_urls,content,status,starts_at,expires_at&card_type=eq.${cardType}&status=eq.published`),
    fetchTaxonomyTable('platform_main_activities?select=id,slug,name_ar,name_en&is_active=eq.true'),
    fetchTaxonomyTable('platform_categories?select=id,slug&is_active=eq.true'),
    fetchTaxonomyTable('platform_category_activity_map?select=activity_id,category_id'),
    fetchTaxonomyTable('platform_specialties?select=id,slug,name_ar,name_en,activity_id,audience_type,is_active&is_active=eq.true'),
    fetchTaxonomyTable('platform_services?select=id,slug,name_ar,name_en,specialty_id,is_active&is_active=eq.true'),
    fetchTaxonomyTable('provider_service_locations?select=provider_id,emirate_id,city_id,area_id,coverage_type,is_active&is_active=eq.true'),
    fetchTaxonomyTable('platform_emirates?select=id,slug&is_active=eq.true'),
    fetchTaxonomyTable('platform_cities?select=id,slug,name_ar,name_en,emirate_id&is_active=eq.true'),
    fetchTaxonomyTable('platform_areas?select=id,slug,name_ar,name_en,city_id&is_active=eq.true'),
  ]);
  const records = buildGeographicServiceCards({profiles, accounts, cards, activities, categories, categoryMap, specialties, services, locations, emirates, cities, areas,
    providerSlugOverrides:{'provider-3000485':'kawkab-al-saeed'}}, {locale, sector, emirate, city, area, cardType});
  return records.map(item => {
    const artwork = item.providerSlug === 'alrehab-home-clean' ? rehabServiceImage(item.serviceSlug)
      : item.providerSlug === 'kawkab-al-saeed' && cardType === 'service' ? kawkabServiceImage(item.serviceSlug)
      : adwaaReviewMedia(item.providerCode, item.id, cardType, item.serviceSlug, true);
    return {...item, image:artwork?.desktop || artwork?.url || item.image, imageMobile:artwork?.mobile || artwork?.mobile_url || null,
      imageIllustrative:artwork && item.providerCode === 'BR-3000530' ? true : item.imageIllustrative,
      providerWhatsapp:buildCardWhatsappUrl({phone:item.providerWhatsappNumber,locale,cardType,providerName:item.providerName,
        providerCode:item.providerCode,cardId:item.id,title:item.name,description:item.description,pagePath:item.href}) || null};
  });
}

// Build only routes for real, active provider coverage and known directory places.
export async function getGeographicServiceCoverage(item) {
  const [locations, emirates, cities, areas] = await Promise.all([
    fetchTaxonomyTable('provider_service_locations?select=provider_id,emirate_id,city_id,area_id,coverage_type,is_active&is_active=eq.true'),
    fetchTaxonomyTable('platform_emirates?select=id,slug&is_active=eq.true'),
    fetchTaxonomyTable('platform_cities?select=id,slug,name_ar,name_en,emirate_id&is_active=eq.true'),
    fetchTaxonomyTable('platform_areas?select=id,slug,name_ar,name_en,city_id&is_active=eq.true'),
  ]);
  const en = item.locale === 'en', result = [], seen = new Set();
  function add(name, city, area) {
    if (!isCovered(locations, item.providerId, emirates, cities, areas, city, area, item.emirate)) return;
    const href = servicePath({locale:item.locale, emirate:item.emirate, city, area, sector:item.sector, service:item.serviceSlug, provider:item.providerSlug});
    if (href && !seen.has(href)) { seen.add(href); result.push({name,href}); }
  }
  add(item.emirate === 'dubai' ? (en?'Dubai':'دبي') : (en?'Abu Dhabi Emirate':'إمارة أبوظبي'), '', '');
  const selectedEmirate = emirates.find(row => row.slug === item.emirate);
  const alAin = cities.find(row => row.slug === 'al-ain' && row.emirate_id === selectedEmirate?.id);
  if (alAin) add(en?'Al Ain':'العين', 'al-ain', '');
  for (const area of areas) {
    const city = cities.find(row => row.id === area.city_id && row.emirate_id === selectedEmirate?.id);
    if (!city) continue;
    if (city.slug === 'al-ain' && getLocalArea(area.slug)) add(en?area.name_en:area.name_ar, 'al-ain', area.slug);
    else if (getArea(item.emirate, area.slug)) add(en?area.name_en:area.name_ar, '', area.slug);
  }
  for (const city of cities) {
    if (city.emirate_id === selectedEmirate?.id && city.slug !== 'al-ain' && getArea(item.emirate,city.slug)) add(en?city.name_en:city.name_ar, '', city.slug);
  }
  return result;
}

/**
 * Publishes service discoverability ONLY from verified platform-channel records.
 * App/market provider_services.is_published is intentionally not used.
 */
export async function getPlatformChannelServiceCards(locale = 'ar', categorySlug = 'cleaning-services') {
  return getPlatformChannelCards(locale,categorySlug,'service');
}
export async function getPlatformChannelOfferCards(locale = 'ar', categorySlug = 'cleaning-services') {
  return getPlatformChannelCards(locale,categorySlug,'offer');
}
// Shared publication eligibility: only live, approved platform cards are eligible.
async function getPlatformChannelCards(locale,categorySlug,cardType) {
  const en = locale === 'en';
  try {
    const [profiles, accounts, cards, categories, specialties, taxonomyServices, classified] = await Promise.all([
      fetchTaxonomyTable('provider_public_profiles?select=id,slug,name_ar,name_en,short_description_ar,short_description_en,whatsapp,logo_url,cover_image_url,verification_status,publication_status,landing_page_status,public_provider_code&publication_status=eq.published&landing_page_status=eq.published&verification_status=eq.verified'),
      fetchTaxonomyTable('platform_provider_accounts?select=id,provider_public_profile_id,status&status=eq.active'),
      fetchTaxonomyTable(`platform_content_cards?select=id,platform_provider_account_id,card_type,title_ar,title_en,description_ar,description_en,image_urls,content,status,starts_at,expires_at&card_type=eq.${cardType}&status=eq.published`),
      fetchTaxonomyTable('platform_categories?select=id,slug,name_ar,name_en&is_active=eq.true'),
      fetchTaxonomyTable('platform_specialties?select=id,category_id&is_active=eq.true'),
      fetchTaxonomyTable('platform_services?select=id,specialty_id&is_active=eq.true'),
      fetchTaxonomyTable('provider_categories?select=provider_id,category_id'),
    ]);
    const category=categories.find(c=>c.slug===categorySlug);
    if(!category)return [];
    const profileById=new Map(profiles.map(p=>[p.id,p]));
    const profileCategory=new Set(classified.filter(c=>c.category_id===category.id).map(c=>c.provider_id));
    const accountsById=new Map(accounts.map(a=>[a.id,a]));
    const specialtyToCategory=new Map(specialties.map(s=>[s.id,s.category_id]));
    const serviceToCategory=new Map(taxonomyServices.map(s=>[s.id,specialtyToCategory.get(s.specialty_id)]));
    const now=Date.now();
    return cards.flatMap(c=>{
      if(!c.content||c.content.channel!=='platform')return [];
      if(c.starts_at&&Date.parse(c.starts_at)>now)return [];
      if(c.expires_at&&Date.parse(c.expires_at)<=now)return [];
      const account=accountsById.get(c.platform_provider_account_id);
      const provider=account&&profileById.get(account.provider_public_profile_id);
      if(!provider||!profileCategory.has(provider.id))return [];
      const taxonomyId=c.content.taxonomy_service_id;
      if(taxonomyId&&serviceToCategory.get(taxonomyId)!==category.id)return [];
      const slug=c.content.slug;
      if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(slug||''))||!c.title_ar||!c.title_en)return [];
      const name=en?c.title_en:c.title_ar;
      const description=(en?(c.description_en||c.description_ar):(c.description_ar||c.description_en))||'';
      const providerName=en?(provider.name_en||provider.name_ar):provider.name_ar;
      const href=companyPath(provider.slug,locale,cardType==='offer'?'offers':'services',slug);
      const providerHref=companyPath(provider.slug,locale);
      const providerSummary=(en?(provider.short_description_en||provider.short_description_ar):provider.short_description_ar)||'';
      return [{
        id:c.id,entityType:cardType,locale,name,description,
        discountPercent:cardType==='offer'&&Number(c.content.discount_percent)===10?10:null,
        imageIllustrative:c.content.media_is_illustrative===true,photoAttribution:c.content.media_attribution||null,
        linkedServiceHref:cardType==='offer'&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.content.service_slug||'')?companyPath(provider.slug,locale,'services',c.content.service_slug):null,
        image:(c.image_urls||[]).find(u=>typeof u==='string'&&/^https:\/\//.test(u))||provider.cover_image_url||provider.logo_url||null,
        category:en?(category.name_en||category.name_ar):category.name_ar,
        href,providerHref,providerName,providerSlug:provider.slug,
        providerVerified:true,providerLogo:provider.logo_url||null,
        providerSummary,location:en?'United Arab Emirates':'الإمارات العربية المتحدة',
        providerWhatsapp:buildCardWhatsappUrl({
          phone:provider.whatsapp,locale,cardType,providerName,
          providerCode:provider.public_provider_code,cardId:c.id,title:name,
          description,category:en?(category.name_en||category.name_ar):category.name_ar,
          pagePath:href
        }),
      }];
    });
  }catch(error){
    console.error(`Unable to load public platform-channel ${cardType} cards:`,error?.message);
    return [];
  }
}
