import {getAbuDhabiSectorContent} from './abuDhabiSectorContent';

function comparableName(value){return String(value||'').normalize('NFKD').replace(/[\u064B-\u065F\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/^[\d\s.)-]+/,'').replace(/\s+/g,' ').trim().toLowerCase();}

function localize(body,place){const article=/^[AEIOU]/i.test(place)?'an':'a';return String(body||'').replace(/\b(?:a|an) Abu Dhabi\b/gi,article+' '+place).replace(/أبوظبي|ابوظبي/g,place).replace(/Abu Dhabi/gi,place);}

export function northernSectorGuides(slug,locale,place,taxonomy){
 const source=getAbuDhabiSectorContent(slug);
 if(!source||!Array.isArray(taxonomy))return null;
 const groups=new Map(taxonomy.map(x=>[x.slug,x]));
 const nameField=locale==='en'?'nameEn':'nameAr',bodyField=locale==='en'?'bodyEn':'bodyAr';
 return {sector:slug,specialties:source.specialties.flatMap(group=>{
  const active=groups.get(group.slug);if(!active)return [];
  const names=new Set((active.services||[]).map(entry=>comparableName(entry.name)));
  const services=group.services.filter(entry=>names.has(comparableName(entry[nameField])))
   .map(entry=>({...entry,[bodyField]:localize(entry[bodyField],place)}));
  return services.length?[{slug:group.slug,services}]:[];
 })};
}
