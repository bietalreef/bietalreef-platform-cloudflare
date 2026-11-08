import { getPublishedPortfolio } from './publishedPortfolio';
import { fetchTaxonomyTable } from './platformDirectoryCards';
import { latestContentDate } from './contentDates.cjs';
import { publishedOffer } from './publishedOffer.cjs';
import { KAWKAB_SECTIONS, KAWKAB_SPECIALTIES, KAWKAB_PROJECT, KAWKAB_PROFILE, KAWKAB_HERO, KAWKAB_LOGO } from './kawkabPresence';

const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ORIGIN = 'https://bietalreef.ae';
const safeSlug = x => typeof x === 'string' && SAFE_SLUG.test(x) ? x : null;
export function companyPath(slug, locale='ar', kind='home', itemSlug='', contextBase='') {
  const base = (locale==='en'?'/en':'')+(contextBase?contextBase+'/':'/providers/')+slug;
  return kind==='home'?base:base+'/'+kind+(itemSlug?'/'+itemSlug:'');
}
export function resolveCompanyRoute(parts=[]) {
  if (!Array.isArray(parts)||parts.length>2) return null;
  if(!parts.length) return {kind:'home'};
  const [kind,slug] = parts;
  if(!['services','offers','service-areas'].includes(kind)) return null;
  return parts.length===1 ? {kind} : safeSlug(slug) ? {kind,slug}:null;
}
const label = (r,k) => r?.[k+'_ar']||r?.[k+'_en']||'';
function localizedCard(row){
 const slug=safeSlug(row.content?.slug);
 if(!slug||!['service','offer'].includes(row.card_type)||!row.title_ar?.trim()||!row.title_en?.trim())return null;
 const image=(row.image_urls||[]).find(x=>typeof x==='string'&&/^https:\/\//i.test(x))||null;
 const mobile=typeof row.content?.image_mobile_url==='string'&&/^https:\/\//i.test(row.content.image_mobile_url)?row.content.image_mobile_url:null;
 const offer=row.card_type==='offer'?publishedOffer(row.content,row.expires_at):null;
 return {id:row.id,slug,type:row.card_type,name_ar:row.title_ar,name_en:row.title_en,description_ar:row.description_ar||'',description_en:row.description_en||'',image,image_mobile:mobile,updated_at:row.updated_at||null,seo:row.content?.seo||null,offer,discount_percent:offer?.discountPercent||null,linked_service_slug:safeSlug(row.content?.service_slug),image_illustrative:row.content?.media_is_illustrative===true,image_attribution:row.content?.media_attribution||null};
}
export async function getPublishedCompanySiteData(slug) {
 if(!safeSlug(slug)) return null;
 const rows=await fetchTaxonomyTable('provider_public_profiles?select=id,slug,public_provider_code,name_ar,name_en,short_description_ar,short_description_en,description_ar,description_en,phone,whatsapp,logo_url,cover_image_url,public_email,working_hours_ar,working_hours_en,founded_year,provider_type,verification_status,publication_status,landing_page_status,created_at,updated_at&slug=eq.'+encodeURIComponent(slug)+'&verification_status=eq.verified&publication_status=eq.published&landing_page_status=eq.published&limit=1');
 const profile=rows[0]; if(!profile)return null;
 const accounts=await fetchTaxonomyTable('platform_provider_accounts?select=id,status&provider_public_profile_id=eq.'+profile.id+'&status=eq.active&limit=1');
 if(!accounts[0])return null;
 const [cardRows,locationRows,emirates,cities,districts,categories,classified,portfolioProjects]=await Promise.all([
   fetchTaxonomyTable('platform_content_cards?select=id,card_type,title_ar,title_en,description_ar,description_en,image_urls,content,status,starts_at,expires_at,updated_at&platform_provider_account_id=eq.'+accounts[0].id+'&status=eq.published&order=created_at.asc'),
   fetchTaxonomyTable('provider_service_locations?select=id,emirate_id,city_id,area_id,is_active,coverage_notes_ar,coverage_notes_en,updated_at&provider_id=eq.'+profile.id+'&is_active=eq.true'),
   fetchTaxonomyTable('platform_emirates?select=id,slug,name_ar,name_en&is_active=eq.true'),
   fetchTaxonomyTable('platform_cities?select=id,slug,name_ar,name_en,emirate_id&is_active=eq.true'),
   fetchTaxonomyTable('platform_areas?select=id,slug,name_ar,name_en,city_id&is_active=eq.true'),
   fetchTaxonomyTable('platform_categories?select=id,name_ar,name_en,slug&is_active=eq.true'),
   fetchTaxonomyTable('provider_categories?select=category_id,is_primary&provider_id=eq.'+profile.id),
   getPublishedPortfolio(slug),
 ]);
 // A company may have a distinct cover for its public PLATFORM channel.
 // Never modify or reuse app/market images; the approved profile identity remains canonical.
 const platformCoverCard=cardRows.find(row=>row.card_type==='provider'&&row.content?.channel==='platform'&&typeof row.content?.cover_url==='string'&&/^https:\/\//i.test(row.content.cover_url));
 const platformProfile=platformCoverCard?{...profile,cover_image_url:platformCoverCard.content.cover_url,cover_media_is_illustrative:platformCoverCard.content.cover_media_is_illustrative===true}:profile;
 const now=Date.now();
 const cards=cardRows.filter(r=>r.content?.channel==='platform'&&(!r.starts_at||Date.parse(r.starts_at)<=now)&&(!r.expires_at||Date.parse(r.expires_at)>now)).map(localizedCard).filter(Boolean);
 const eMap=new Map(emirates.map(e=>[e.id,e]));
 const cMap=new Map(cities.map(c=>[c.id,c]));
 const areas=locationRows.map(l=>{
   const district=l.area_id?districts.find(a=>a.id===l.area_id):null;
   const city=(l.city_id||district?.city_id)?cMap.get(l.city_id||district.city_id):null;
   const emirate=eMap.get(l.emirate_id||city?.emirate_id);
   if(!emirate||(l.city_id&&!city)||(l.area_id&&!district))return null;
   const value=district||city||emirate;
   return {id:l.id,slug:value.slug,emirate_slug:emirate.slug,city_slug:city?.slug||null,name_ar:value.name_ar,name_en:value.name_en,description_ar:l.coverage_notes_ar||'',description_en:l.coverage_notes_en||'',updated_at:l.updated_at||null};
 }).filter(Boolean);
 const uniqueAreas=[...new Map(areas.map(x=>[x.slug,x])).values()];
 const selected=new Set(classified.map(c=>c.category_id));
 const chosenCategory=categories.filter(c=>selected.has(c.id)).map(c=>({name_ar:c.name_ar,name_en:c.name_en,slug:c.slug}));
 return { profile:platformProfile, portfolioProjects, categories:chosenCategory, services:cards.filter(c=>c.type==='service'), offers:cards.filter(c=>c.type==='offer'), areas:uniqueAreas, origin:ORIGIN };
}
export async function getCompanyServerProps(ctx,locale,slug,parts=[]) {
 const route=resolveCompanyRoute(parts);
 if(!route||!safeSlug(slug))return {notFound:true};
 try{
   const data=await getPublishedCompanySiteData(slug);
   if(!data)return {notFound:true};
   const items=route.kind==='services'?data.services:route.kind==='offers'?data.offers:route.kind==='service-areas'?data.areas:null;
   if(route.slug&&!items.some(item=>item.slug===route.slug))return {notFound:true};
   ctx.res.setHeader('Cache-Control','public, s-maxage=60, stale-while-revalidate=180');
   return {props:{data,locale,route}};
 }catch(e){
   console.error('Published company read error:',e?.message);
   ctx.res.statusCode=503;
   ctx.res.setHeader('Retry-After','60');
   ctx.res.setHeader('Cache-Control','no-store');
   return {props:{unavailable:true,locale,route,slug}};
 }
}

// Contextual copies keep the company's canonical page while retaining the
// directory path for navigation. Coverage must come from published records.
export async function getCompanyContextProps(ctx, locale, slug, parts=[], emirate='abu-dhabi') {
 if(slug==='kawkab-al-saeed'){
   if(parts.length===1&&parts[0]==='service-areas')return {redirect:{destination:(locale==='en'?'/en':'')+'/providers/kawkab-al-saeed/service-areas',permanent:false}};
   try {
     const data=await getPublishedCompanySiteData('provider-3000485');
     if(!data||!data.areas.some(area=>area.slug===emirate||area.emirate_slug===emirate))return {notFound:true};
     let kind='section',section='home',serviceId=null;
     if(parts.length===1&&KAWKAB_SECTIONS.includes(parts[0]))section=parts[0];
     else if(parts.length===2&&parts[0]==='services'&&KAWKAB_SPECIALTIES.some(item=>item.id===parts[1])){kind='service';serviceId=parts[1];}
     else if(parts.length===2&&parts[0]==='projects'&&parts[1]===KAWKAB_PROJECT.slug)kind='project';
     else if(parts.length)return {notFound:true};
     return {props:{companyContext:true,kawkabContext:kind,locale,section,serviceId,portfolioProjects:data.portfolioProjects,contextBase:`/uae/${emirate}`}};
   }catch(error){console.error('Published company read error:',error?.message);ctx.res.statusCode=503;ctx.res.setHeader('Cache-Control','no-store');return {props:{companyContext:true,unavailable:true,locale}};}
 }
 const response=await getCompanyServerProps(ctx,locale,slug,parts);
 if(!response.props)return response;
 if(response.props.unavailable)return {props:{...response.props,companyContext:true}};
 if(!response.props.data.areas.some(area=>area.slug===emirate||area.emirate_slug===emirate))return {notFound:true};
 return {props:{...response.props,route:{...response.props.route,contextBase:`/uae/${emirate}`},companyContext:true}};
}
export async function getCompanyStaticContextProps(locale, slug, parts=[], emirate='abu-dhabi') {
 const response=await getCompanyContextProps({res:{statusCode:200,setHeader(){}}},locale,slug,parts,emirate);
 if(response.props?.unavailable)throw new Error('Published company data is temporarily unavailable');
 return response.props?{...response,revalidate:60}:response;
}

export async function getAbuDhabiDirectoryCompanies() {
 const profiles=await fetchTaxonomyTable('provider_public_profiles?select=id,slug,verification_status,publication_status,landing_page_status&publication_status=eq.published&landing_page_status=eq.published&verification_status=eq.verified');
 // Al Rehab has its own data source and dedicated directory card.
 const candidates=profiles.filter(p=>p.slug!=='alrehab-home-clean');
 const companies=await Promise.all(candidates.map(p=>getPublishedCompanySiteData(p.slug)));
 return companies.filter(data=>data&&data.areas.some(area=>area.emirate_slug==='abu-dhabi')).map(data=>data.profile.slug==='provider-3000485'?{...data,profile:{...data.profile,slug:'kawkab-al-saeed',name_en:KAWKAB_PROFILE.nameEn,short_description_en:KAWKAB_PROFILE.descriptionEn,cover_image_url:KAWKAB_HERO.url,logo_url:KAWKAB_LOGO.url}}:data);
}
export async function getPublishedCompanySitemapRoutes() {
 const profiles=await fetchTaxonomyTable('provider_public_profiles?select=id,slug,verification_status,publication_status,landing_page_status&publication_status=eq.published&landing_page_status=eq.published&verification_status=eq.verified');
 const accounts=await fetchTaxonomyTable('platform_provider_accounts?select=id,provider_public_profile_id,status&status=eq.active');
 const valid=new Map(accounts.map(a=>[a.provider_public_profile_id,a.id]));
 const out=[];
 for(const p of profiles){
   if(!safeSlug(p.slug)||!valid.has(p.id))continue;
   const data=await getPublishedCompanySiteData(p.slug);
   if(!data)continue;
   const baseDates=[data.profile.updated_at,...data.areas.map(item=>item.updated_at)];
   // The public portfolio source does not expose its edit timestamp yet.
   const routes=[{kind:'home'}];
   for(const [kind,items] of [['services',data.services],['offers',data.offers],['service-areas',data.areas]]){
     if(!items.length)continue;
     routes.push({kind,lastmod:latestContentDate(baseDates,items.map(item=>item.updated_at))});
     for(const item of items)routes.push({kind,slug:item.slug,lastmod:latestContentDate(baseDates,item.updated_at)});
   }
   out.push({slug:p.slug,cover:data.profile.cover_image_url,routes});
 }
 return out;
}
