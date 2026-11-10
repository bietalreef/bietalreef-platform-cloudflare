import {getAbuDhabiSectorContent} from './abuDhabiSectorContent';

// Reuse reviewed technical service guidance already aligned with the platform's
// Supabase taxonomy. Only general geographic references are broadened; no new
// taxonomy or provider/service publication is created.
function nationalize(text,locale) {
  const value=String(text||'');
  if(locale==='en') return value
    .replace(/\bin Abu Dhabi\b/gi,'in the UAE')
    .replace(/\bAbu Dhabi\b/gi,'the UAE');
  return value
    .replace(/بأبوظبي/g,'في الإمارات')
    .replace(/في أبوظبي/g,'في الإمارات')
    .replace(/أبوظبي/g,'الإمارات');
}

export function getNationalSectorContent(sectorSlug) {
  const source=getAbuDhabiSectorContent(sectorSlug);
  if(!source)return null;
  return {
    sector:sectorSlug,
    specialties:source.specialties.map(group=>({
      slug:group.slug,
      services:group.services.map(service=>({
        ...service,
        bodyAr:nationalize(service.bodyAr,'ar'),
        bodyEn:nationalize(service.bodyEn,'en'),
      })),
    })),
  };
}
