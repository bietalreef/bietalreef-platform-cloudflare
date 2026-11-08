import { getArea } from '../data/siteTaxonomy';
import { fetchTaxonomyTable } from './platformDirectoryCards';
import { getCompanyServerProps, getCompanyStaticContextProps } from './publishedCompanyPresence';
import { isCovered } from './geographicServiceModel.cjs';

// The existing profile, active account and location records remain authoritative.
export async function geographicAreaCompanyProps(locale, emirate, area, slug, parts = []) {
  if (!['abu-dhabi','dubai'].includes(emirate) || !getArea(emirate,area) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug||'')) return {notFound:true};
  const sourceSlug = slug === 'kawkab-al-saeed' ? 'provider-3000485' : slug;
  const [profiles, locations, emirates, cities, areas] = await Promise.all([
    fetchTaxonomyTable(`provider_public_profiles?select=id,slug&slug=eq.${encodeURIComponent(sourceSlug)}&publication_status=eq.published&landing_page_status=eq.published&verification_status=eq.verified&limit=1`),
    fetchTaxonomyTable('provider_service_locations?select=provider_id,emirate_id,city_id,area_id,coverage_type,is_active&is_active=eq.true'),
    fetchTaxonomyTable('platform_emirates?select=id,slug&is_active=eq.true'),
    fetchTaxonomyTable('platform_cities?select=id,slug,name_ar,name_en,emirate_id&is_active=eq.true'),
    fetchTaxonomyTable('platform_areas?select=id,slug,name_ar,name_en,city_id&is_active=eq.true'),
  ]);
  const profile = profiles[0];
  if (!profile || !isCovered(locations,profile.id,emirates,cities,areas,'',area,emirate)) return {notFound:true};
  const ctx = {res:{statusCode:200,setHeader(){}}};
  const result = slug === 'kawkab-al-saeed'
    ? await getCompanyStaticContextProps(locale,slug,parts,emirate)
    : await getCompanyServerProps(ctx,locale,sourceSlug,parts);
  if (!result.props) return result;
  if (result.props.unavailable) throw new Error('Published company data is temporarily unavailable');
  const contextBase = `/uae/${emirate}/${area}`;
  return {props:{...result.props,companyContext:true,contextBase,...(result.props.route ? {route:{...result.props.route,contextBase}} : {})},revalidate:60};
}
