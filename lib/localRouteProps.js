import { alAinHubModel } from './alAinHubModel';
import { findAlAinSector } from '../data/alAinHub';
import { alAinCleaningModel } from './alAinCleaningModel';
import { CLEANING_SERVICES } from '../data/alAinCleaningGuide';
import { alAinContentModel } from './alAinContentModel';
import { CONTENT } from '../data/alAinContent';
import { CATEGORY, SERVICE_INTENTS } from '../data/localServices';
import { pageModel, getLocalArea } from './localServices';
import { getLocalProviders } from './localProviderData';
import { KAWKAB_AL_AIN_AREAS, KAWKAB_SPECIALTIES, KAWKAB_SLUG } from './kawkabPresence';
import { allowsDistrictListing } from './locationCoveragePolicy';
import { districtCleaningProps } from './districtCleaning';
import { getRehabSiteData, REHAB_SLUG } from './rehabPresence';
export async function localProps(locale, segments = []) {
  if (!Array.isArray(segments) || segments.length > 3) return { notFound: true };
  const district = getLocalArea(segments[0]);
  if (district && segments[1] === CATEGORY.slug && segments.length <= 3) return districtCleaningProps(locale, district.slug, segments[2]);
  if (district && segments.length === 2 && segments[1] === REHAB_SLUG) return districtCleaningProps(locale, district.slug, REHAB_SLUG);
  if (district && ((segments.length === 2 && segments[1] === KAWKAB_SLUG) || (segments.length === 3 && segments[1] === 'general-maintenance' && segments[2] === KAWKAB_SLUG))) {
    const provider = (await getLocalProviders()).find(p=>p.slug===KAWKAB_SLUG && p.published && p.verified && p.visibility?.directory && p.coverage?.some(c=>c.approved && c.city==='al-ain'));
    return provider ? {props:{model:{districtKawkabCompany:true,locale,area:district}},revalidate:300} : {notFound:true};
  }
  // Existing Al Ain / district / sector route: derive eligible businesses from the same
  // published provider and coverage relations used by the city directory.
  if ((segments.length===2 || segments.length===3) && segments[1]==='general-maintenance') {
    const selectedService = segments.length===3 ? KAWKAB_SPECIALTIES.find(item=>item.id===segments[2]) : null;
    if (segments.length===3 && !selectedService) return { notFound:true };
    const district=KAWKAB_AL_AIN_AREAS.find(area=>area.slug===segments[0]);
    if (district) {
      const providers=(await getLocalProviders()).filter(p=>
        p.published && p.verified && p.visibility?.directory && allowsDistrictListing(p.slug) &&
        p.coverage?.some(c=>c.approved && c.city==='al-ain' && (c.areas.includes(district.slug) || p.slug===KAWKAB_SLUG && c.areas.length===0)) &&
        (p.categories?.includes('general-maintenance') || p.services?.some(s=>s.published && ['general-maintenance','ac-technicians','plumbing','painting-insulation','carpentry','finishing-works'].includes(s.category))) &&
        (!selectedService || p.services?.some(s=>s.published && (s.slug===selectedService.id || s.pagePath?.endsWith('/services/'+selectedService.id))))
      );
      return {props:{model:{maintenanceArea:true,locale,area:district,providers,service:selectedService?.id||null}},revalidate:300};
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
  const allProviders = await getLocalProviders();
  const model = pageModel({ locale, area, category, service, providers: allProviders });
  if (model && area && !category) {
    const rehab = await getRehabSiteData().catch(() => null);
    if (rehab?.areas?.some(item => item.slug === 'al-ain')) model.directoryRehab = {slug:rehab.profile.slug, name_ar:rehab.profile.name_ar, name_en:rehab.profile.name_en, image:rehab.media?.avatar || rehab.profile.logo_url, cover:rehab.media?.cover || rehab.profile.cover_image_url, phone:rehab.profile.phone, whatsapp:rehab.profile.whatsapp, verified:rehab.profile.verification_status==='verified'};
    const kawkab = allProviders.find(p=>p.slug===KAWKAB_SLUG && p.published && p.verified && p.visibility?.directory && p.coverage?.some(c=>c.approved && c.city==='al-ain'));
    if (kawkab) model.directoryKawkab = {slug:kawkab.slug,name_ar:kawkab.name.ar,name_en:kawkab.name.en,image:kawkab.image,cover:kawkab.cover,phone:kawkab.phone,whatsapp:kawkab.whatsapp};
  }
  return model ? { props: { model }, revalidate: 3600 } : { notFound: true };
}
