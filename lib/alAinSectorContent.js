import {getAbuDhabiSectorContent} from './abuDhabiSectorContent';

// Reuse the eight reviewed Abu Dhabi service guides; only the location is adapted.
// Service/specialty membership remains controlled by active Supabase taxonomy.
export function normalizeDirectoryServiceName(value) {
  return String(value||'').normalize('NFKD')
    .replace(/^[\s\d\u0660-\u0669]+[.)\-–]?\s*/,'')
    .replace(/[\u064B-\u065F\u0670]/g,'').replace(/[أإآ]/g,'ا')
    .replace(/ى/g,'ي').replace(/[.،؟!?]/g,'')
    .replace(/\s+/g,' ').trim().toLowerCase();
}

function localizeGuide(text,locale,place) {
  const value=String(text||'');
  return locale==='en' ? value.replace(/Abu Dhabi/gi,place) : value.replace(/أبوظبي|ابوظبي/g,place);
}

export function getAlAinSectorContent(sectorSlug,locale,place,sectorTaxonomy) {
  if(!['ar','en'].includes(locale) || !place || !Array.isArray(sectorTaxonomy))return null;
  const source=getAbuDhabiSectorContent(sectorSlug);
  if(!source)return null;
  const sectorGroups=new Map(sectorTaxonomy.map(group=>[group.slug,group]));
  const specialties=source.specialties.flatMap(group=>{
    const allowed=sectorGroups.get(group.slug);
    if(!allowed)return [];
    const approved=new Set((allowed.services||[]).map(service=>normalizeDirectoryServiceName(service.name)));
    const nameKey=locale==='en'?'nameEn':'nameAr', bodyKey=locale==='en'?'bodyEn':'bodyAr';
    const services=group.services.filter(entry=>approved.has(normalizeDirectoryServiceName(entry[nameKey])))
      .map(entry=>({...entry,[bodyKey]:localizeGuide(entry[bodyKey],locale,place)}));
    return services.length?[{slug:group.slug,services}]:[];
  });
  return {sector:sectorSlug,specialties};
}
