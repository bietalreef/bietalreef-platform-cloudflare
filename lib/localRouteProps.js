import { alAinHubModel } from './alAinHubModel';
import { findAlAinSector } from '../data/alAinHub';
import { alAinCleaningModel } from './alAinCleaningModel';
import { CLEANING_SERVICES } from '../data/alAinCleaningGuide';
import { alAinContentModel } from './alAinContentModel';
import { CONTENT } from '../data/alAinContent';
import { CATEGORY, SERVICE_INTENTS } from '../data/localServices';
import { pageModel, getLocalArea } from './localServices';
import { getLocalProviders } from './localProviderData';
import { KAWKAB_AL_AIN_AREAS, KAWKAB_PROFILE_ID } from './kawkabPresence';
export async function localProps(locale, segments = []) {
  if (!Array.isArray(segments) || segments.length > 3) return { notFound: true };
  // Existing Al Ain / district / sector route: derive eligible businesses from the same
  // published provider and coverage relations used by the city directory.
  if (segments.length===2 && segments[1]==='general-maintenance') {
    const district=KAWKAB_AL_AIN_AREAS.find(area=>area.slug===segments[0]);
    if (district) {
      const providers=(await getLocalProviders()).filter(p=>
        p.published && p.verified && p.visibility?.directory &&
        p.coverage?.some(c=>c.approved && c.city==='al-ain' && c.areas.includes(district.slug)) &&
        (p.categories?.includes('general-maintenance') || p.services?.some(s=>s.published && ['general-maintenance','ac-technicians','plumbing','painting-insulation','carpentry','finishing-works'].includes(s.category)))
      );
      return {props:{model:{maintenanceArea:true,locale,area:district,providers}},revalidate:300};
    }
  }
  if (!segments.length || segments.length === 1 && segments[0] !== CATEGORY.slug && findAlAinSector(segments[0])) {
    return {props: {model: alAinHubModel({locale, category:segments[0], providers:await getLocalProviders()})}, revalidate:3600};
  }
  if (segments[0] === CATEGORY.slug && segments.length <= 2 && (!segments[1] || CLEANING_SERVICES.some(item => item.slug === segments[1]))) {
    const model = alAinCleaningModel({ locale, service: segments[1], providers: await getLocalProviders() });
    return { props: { model }, revalidate: 3600 };
  }
  if (Object.hasOwn(CONTENT, segments[0]) && segments.length <= 2 && (segments.length === 1 || segments[0] === CATEGORY.slug && segments[1] === 'home-villa-cleaning')) {
    const model = alAinContentModel({ locale, category: segments[0], service: segments[1], providers: await getLocalProviders() });
    return model ? { props: { model }, revalidate: 3600 } : { notFound: true };
  }
  let area, category, service;
  if (segments[0] === CATEGORY.slug && segments.length <= 2) { [category, service] = segments; }
  else if (segments.length) {
    if (!getLocalArea(segments[0]) || segments[1] && segments[1] !== CATEGORY.slug) return { notFound: true };
    [area, category, service] = segments;
  }
  const alias = SERVICE_INTENTS.find(item => item.sourceSlugs.includes(service));
  if (alias && !area) {
    const model = pageModel({ locale, category, service: alias.slug, providers: await getLocalProviders() });
    return model ? { redirect: { destination: model.canonical.replace('https://bietalreef.ae', ''), permanent: true } } : { notFound: true };
  }
  const model = pageModel({ locale, area, category, service, providers: await getLocalProviders() });
  return model ? { props: { model }, revalidate: 3600 } : { notFound: true };
}
