import { fetchTaxonomyTable } from './platformDirectoryCards';
import { companyPath } from './publishedCompanyPresence';
import { buildCardWhatsappUrl } from './providerWhatsapp';

/**
 * Publishes service discoverability ONLY from verified platform-channel records.
 * App/market provider_services.is_published is intentionally not used.
 */
export async function getPlatformChannelServiceCards(locale = 'ar', categorySlug = 'cleaning-services') {
  const en = locale === 'en';
  try {
    const [profiles, accounts, cards, categories, specialties, taxonomyServices, classified] = await Promise.all([
      fetchTaxonomyTable('provider_public_profiles?select=id,slug,name_ar,name_en,short_description_ar,short_description_en,whatsapp,logo_url,cover_image_url,verification_status,publication_status,landing_page_status,public_provider_code&publication_status=eq.published&landing_page_status=eq.published&verification_status=eq.verified'),
      fetchTaxonomyTable('platform_provider_accounts?select=id,provider_public_profile_id,status&status=eq.active'),
      fetchTaxonomyTable('platform_content_cards?select=id,platform_provider_account_id,card_type,title_ar,title_en,description_ar,description_en,image_urls,content,status,starts_at,expires_at&card_type=eq.service&status=eq.published'),
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
      const description=en?(c.description_en||c.description_ar):(c.description_ar||c.description_en);
      const providerName=en?(provider.name_en||provider.name_ar):provider.name_ar;
      const href=companyPath(provider.slug,locale,'services',slug);
      const providerHref=companyPath(provider.slug,locale);
      const providerSummary=en?(provider.short_description_en||provider.short_description_ar):provider.short_description_ar;
      return [{
        id:c.id,entityType:'service',locale,name,description,
        image:(c.image_urls||[]).find(u=>typeof u==='string'&&/^https:\/\//.test(u))||provider.cover_image_url||provider.logo_url,
        category:en?(category.name_en||category.name_ar):category.name_ar,
        href,providerHref,providerName,providerSlug:provider.slug,
        providerVerified:true,providerLogo:provider.logo_url,
        providerSummary,location:en?'United Arab Emirates':'الإمارات العربية المتحدة',
        providerWhatsapp:buildCardWhatsappUrl({
          phone:provider.whatsapp,locale,cardType:'service',providerName,
          providerCode:provider.public_provider_code,cardId:c.id,title:name,
          description,category:en?(category.name_en||category.name_ar):category.name_ar,
          pagePath:href
        }),
      }];
    });
  }catch(error){
    console.error('Unable to load public platform-channel service cards:',error?.message);
    return [];
  }
}
