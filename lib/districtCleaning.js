import { AREAS } from '../data/localServices';
import { getRehabSiteData, REHAB_SLUG } from './rehabPresence';

// Geographic directory views use the same published company and service records.
// City coverage is not represented as proof of an individual district booking.
export async function districtCleaningProps(locale, districtSlug, serviceSlug = null, providerSlug = null) {
  const area = AREAS.find(item => item.slug === districtSlug);
  if (!area || !['ar','en'].includes(locale)) return {notFound:true};
  const data = await getRehabSiteData();
  if (!data || !data.categories.some(item=>item.slug==='cleaning-services') || !data.areas.some(item=>item.slug==='al-ain')) return {notFound:true};
  const providerOnly = serviceSlug === REHAB_SLUG && !providerSlug;
  const service = !providerOnly && serviceSlug ? data.services.find(item=>item.slug===serviceSlug) : null;
  if (serviceSlug && !providerOnly && !service) return {notFound:true};
  if (providerSlug && (providerSlug !== REHAB_SLUG || !service)) return {notFound:true};
  const directoryArea={slug:area.slug,name_ar:area.nameAr,name_en:area.nameEn};
  if (providerOnly || providerSlug) {
    const route=service ? {kind:'services',slug:service.slug,directoryArea} : {kind:'home',directoryArea};
    return {props:{model:{districtCompany:true,data,locale,route}},revalidate:60};
  }
  return {props:{model:{districtCleaning:true,locale,area,data,service:service||null}},revalidate:60};
}
