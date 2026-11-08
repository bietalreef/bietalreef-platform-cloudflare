const aliases = {'aluminium-wood-glass':'aluminium-glass','factories-suppliers':'equipment-rental'};
const safeSlug = value => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

// Data is read from the current catalogue; no provider or service is invented.
function buildSectorTaxonomy(data, {sector, locale='ar', cards=[]} = {}) {
  const categorySlug=aliases[sector]||sector;
  const category=(data.categories||[]).find(row=>row.slug===categorySlug && row.is_active!==false);
  if(!category)return [];
  const activityIds=new Set((data.categoryMap||[]).filter(row=>row.category_id===category.id).map(row=>row.activity_id));
  return (data.specialties||[])
    .filter(row=>activityIds.has(row.activity_id) && row.is_active!==false && row.is_selectable===true && row.audience_type==='company' && safeSlug(row.slug))
    .map(specialty=>({
      id:specialty.id,slug:specialty.slug,
      name:(locale==='en'?specialty.name_en:specialty.name_ar)||specialty.name_ar||'',
      description:(locale==='en'?specialty.description_en:specialty.description_ar)||'',
      services:(data.services||[]).filter(service=>service.specialty_id===specialty.id&&service.is_active!==false&&safeSlug(service.slug)).map(service=>{
        const matching=(cards||[]).find(card=>card.serviceSlug===service.slug && card.taxonomyServices?.some(item=>item.slug===service.slug) && typeof card.href==='string' && card.href.endsWith('/'+card.providerSlug));
        return {id:service.id,slug:service.slug,name:(locale==='en'?service.name_en:service.name_ar)||service.name_ar||'',description:(locale==='en'?service.short_description_en:service.short_description_ar)||'',href:matching?matching.href.slice(0,-matching.providerSlug.length-1):null};
      }).filter(service=>service.name),
    }))
    .filter(specialty=>specialty.name && specialty.services.length);
}
module.exports={buildSectorTaxonomy};
