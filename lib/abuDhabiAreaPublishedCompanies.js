import {fetchTaxonomyTable} from './platformDirectoryCards';
import {buildProviderWhatsappUrl} from './providerWhatsapp';
import {isCovered} from './geographicServiceModel.cjs';
import {REHAB_ACCOUNT_AVATAR,REHAB_ACCOUNT_COVER} from './rehabPresence';
import {KAWKAB_HERO,KAWKAB_LOGO} from './kawkabPresence';

// Company cards depend on platform publication, verification and actual coverage,
// rather than on the older seven-card display configuration.
export async function getPublishedAbuDhabiAreaCompanies(_directoryCards,locale='ar',areaSlug){
  const [profiles,accounts,locations,emirates,cities,areas]=await Promise.all([
    fetchTaxonomyTable('provider_public_profiles?select=id,slug,name_ar,name_en,short_description_ar,short_description_en,phone,whatsapp,logo_url,cover_image_url,verification_status,publication_status,landing_page_status,public_provider_code&verification_status=eq.verified&publication_status=eq.published&landing_page_status=eq.published'),
    fetchTaxonomyTable('platform_provider_accounts?select=provider_public_profile_id,status&status=eq.active'),
    fetchTaxonomyTable('provider_service_locations?select=provider_id,emirate_id,city_id,area_id,coverage_type,is_active&is_active=eq.true'),
    fetchTaxonomyTable('platform_emirates?select=id,slug&is_active=eq.true'),
    fetchTaxonomyTable('platform_cities?select=id,slug,emirate_id&is_active=eq.true'),
    fetchTaxonomyTable('platform_areas?select=id,slug,city_id&is_active=eq.true'),
  ]);
  const active=new Set(accounts.filter(row=>row.status==='active').map(row=>row.provider_public_profile_id));
  const en=locale==='en',prefix=en?'/en':'';
  return profiles.filter(p=>active.has(p.id)&&p.verification_status==='verified'&&p.publication_status==='published'&&p.landing_page_status==='published'&&isCovered(locations,p.id,emirates,cities,areas,'',areaSlug)).map(p=>{
    const slug=p.slug==='provider-3000485'?'kawkab-al-saeed':p.slug;
    const name=(en?p.name_en:p.name_ar)||p.name_ar;
    const summary=(en?p.short_description_en:p.short_description_ar)||p.short_description_ar||'';
    const href=`${prefix}/uae/abu-dhabi/${areaSlug}/${slug}`;
    const rehab=slug==='alrehab-home-clean',kawkab=slug==='kawkab-al-saeed';
    return {id:p.id,slug,entityType:'provider',name,summary,description:summary,href,verified:true,
      logoImage:rehab?REHAB_ACCOUNT_AVATAR:kawkab?KAWKAB_LOGO.url:p.logo_url||null,
      coverImage:rehab&&p.cover_image_url?.includes('1sic4rPHUTfvK58yXRxP59XYzd242bkTc')?REHAB_ACCOUNT_COVER:kawkab?KAWKAB_HERO.url:p.cover_image_url||null,
      city:en?'Abu Dhabi Emirate':'إمارة أبوظبي',phone:p.phone||null,
      whatsapp:buildProviderWhatsappUrl({phone:p.whatsapp,locale,providerName:name,providerCode:p.public_provider_code,profilePath:href})||null};
  });
}
