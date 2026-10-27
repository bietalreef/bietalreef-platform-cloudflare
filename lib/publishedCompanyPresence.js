import { fetchTaxonomyTable } from './platformDirectoryCards';

const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ORIGIN = 'https://bietalreef.ae';
const safeSlug = x => typeof x === 'string' && SAFE_SLUG.test(x) ? x : null;
export function companyPath(slug, locale='ar', kind='home', itemSlug='') {
  const base = (locale==='en'?'/en':'')+'/providers/'+slug;
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
 return {id:row.id,slug,type:row.card_type,name_ar:row.title_ar,name_en:row.title_en,description_ar:row.description_ar||'',description_en:row.description_en||'',image,seo:row.content?.seo||null,discount_percent:Number(row.content?.discount_percent)===10?10:null,linked_service_slug:safeSlug(row.content?.service_slug)};
}
export async function getPublishedCompanySiteData(slug) {
 if(!safeSlug(slug)) return null;
 const rows=await fetchTaxonomyTable('provider_public_profiles?select=id,slug,public_provider_code,name_ar,name_en,short_description_ar,short_description_en,description_ar,description_en,phone,whatsapp,logo_url,cover_image_url,public_email,working_hours_ar,working_hours_en,founded_year,provider_type,verification_status,publication_status,landing_page_status,created_at&slug=eq.'+encodeURIComponent(slug)+'&verification_status=eq.verified&publication_status=eq.published&landing_page_status=eq.published&limit=1');
 const profile=rows[0]; if(!profile)return null;
 const accounts=await fetchTaxonomyTable('platform_provider_accounts?select=id,status&provider_public_profile_id=eq.'+profile.id+'&status=eq.active&limit=1');
 if(!accounts[0])return null;
 const [cardRows,locationRows,emirates,cities,categories,classified]=await Promise.all([
   fetchTaxonomyTable('platform_content_cards?select=id,card_type,title_ar,title_en,description_ar,description_en,image_urls,content,status,starts_at,expires_at&platform_provider_account_id=eq.'+accounts[0].id+'&status=eq.published&order=created_at.asc'),
   fetchTaxonomyTable('provider_service_locations?select=id,emirate_id,city_id,area_id,is_active,coverage_notes_ar,coverage_notes_en&provider_id=eq.'+profile.id+'&is_active=eq.true'),
   fetchTaxonomyTable('platform_emirates?select=id,slug,name_ar,name_en&is_active=eq.true'),
   fetchTaxonomyTable('platform_cities?select=id,slug,name_ar,name_en&is_active=eq.true'),
   fetchTaxonomyTable('platform_categories?select=id,name_ar,name_en,slug&is_active=eq.true'),
   fetchTaxonomyTable('provider_categories?select=category_id,is_primary&provider_id=eq.'+profile.id),
 ]);
 const now=Date.now();
 const cards=cardRows.filter(r=>(!r.starts_at||Date.parse(r.starts_at)<=now)&&(!r.expires_at||Date.parse(r.expires_at)>now)).map(localizedCard).filter(Boolean);
 const eMap=new Map(emirates.map(e=>[e.id,e]));
 const cMap=new Map(cities.map(c=>[c.id,c]));
 const areas=locationRows.map(l=>{
   const emirate=eMap.get(l.emirate_id);
   const city=l.city_id?cMap.get(l.city_id):null;
   if(!emirate||l.area_id||(l.city_id&&!city))return null;
   const value=city||emirate;
   return {id:l.id,slug:value.slug,name_ar:value.name_ar,name_en:value.name_en,description_ar:l.coverage_notes_ar||'',description_en:l.coverage_notes_en||''};
 }).filter(Boolean);
 const uniqueAreas=[...new Map(areas.map(x=>[x.slug,x])).values()];
 const selected=new Set(classified.map(c=>c.category_id));
 const chosenCategory=categories.filter(c=>selected.has(c.id)).map(c=>({name_ar:c.name_ar,name_en:c.name_en,slug:c.slug}));
 return { profile, categories:chosenCategory, services:cards.filter(c=>c.type==='service'), offers:cards.filter(c=>c.type==='offer'), areas:uniqueAreas, origin:ORIGIN };
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
export async function getPublishedCompanySitemapRoutes() {
 const profiles=await fetchTaxonomyTable('provider_public_profiles?select=id,slug,verification_status,publication_status,landing_page_status&publication_status=eq.published&landing_page_status=eq.published&verification_status=eq.verified');
 const accounts=await fetchTaxonomyTable('platform_provider_accounts?select=id,provider_public_profile_id,status&status=eq.active');
 const valid=new Map(accounts.map(a=>[a.provider_public_profile_id,a.id]));
 const out=[];
 for(const p of profiles){
   if(!safeSlug(p.slug)||!valid.has(p.id))continue;
   const data=await getPublishedCompanySiteData(p.slug);
   if(!data)continue;
   const routes=[{kind:'home'}];
   for(const [kind,items] of [['services',data.services],['offers',data.offers],['service-areas',data.areas]]){
     if(!items.length)continue;
     routes.push({kind});
     for(const item of items)routes.push({kind,slug:item.slug});
   }
   out.push({slug:p.slug,cover:data.profile.cover_image_url,routes});
 }
 return out;
}
