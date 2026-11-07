import {getPublishedAbuDhabiAreaCompanies} from './abuDhabiAreaPublishedCompanies';
import {getRehabStaticContextProps} from './rehabPresence';
import {getCompanyStaticContextProps} from './publishedCompanyPresence';

// A geographic profile is shown only when the existing directory says that the
// verified, platform-published business serves the requested area.
export async function abuDhabiAreaCompanyProps(locale, areaSlug, providerSlug, parts = []) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(providerSlug || '')) return {notFound:true};
  const companies = await getPublishedAbuDhabiAreaCompanies([],locale,areaSlug);
  if (!companies.some(item => String(item.href || '').split('/').filter(Boolean).pop() === providerSlug)) return {notFound:true};
  const result = providerSlug === 'alrehab-home-clean'
    ? await getRehabStaticContextProps(locale,'/uae/abu-dhabi',parts)
    : await getCompanyStaticContextProps(locale,providerSlug,parts);
  if (!result.props) return result;
  const contextBase = `/uae/abu-dhabi/${areaSlug}`;
  return {...result,props:{...result.props,contextBase,...(result.props.route ? {route:{...result.props.route,contextBase}} : {})}};
}
