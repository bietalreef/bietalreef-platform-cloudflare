import { getRehabSiteData, REHAB_SLUG } from './rehabPresence';
import { getPublishedCompanySiteData } from './publishedCompanyPresence';
import { getAlNaeemData, AL_NAEEM_SLUG } from './alNaeemPresence';

// City views reuse each company's existing public profile and canonical URL.
export async function alAinCompanyProps(locale, slug) {
  if (!['ar','en'].includes(locale) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '')) return {notFound:true};
  if (slug === REHAB_SLUG) {
    const data=await getRehabSiteData();
    return data?.areas?.some(a=>a.slug==='al-ain') ? {props:{model:{cityCompany:'rehab',locale,data}},revalidate:60} : {notFound:true};
  }
  if (slug === AL_NAEEM_SLUG) {
    const data=await getAlNaeemData();
    return data?.areas?.some(a=>a.slug==='al-ain') ? {props:{model:{cityCompany:'naeem',locale,data}},revalidate:300} : {notFound:true};
  }
  const kawkab=slug==='kawkab-al-saeed';
  const data=await getPublishedCompanySiteData(kawkab?'provider-3000485':slug);
  const eligible=data?.areas?.some(a=>a.slug===(kawkab?'abu-dhabi':'al-ain'));
  if (!eligible) return {notFound:true};
  return {props:{model:{cityCompany:kawkab?'kawkab':'published',locale,data}},revalidate:60};
}
