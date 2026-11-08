import {getGeographicPublishedServiceCards, getGeographicServiceCoverage} from './platformPublishedServiceCards';

// Keep the directory order: place / sector / service / provider.
export async function geographicRouteProps(locale, {emirate = 'abu-dhabi', city = '', area = '', sector, service, provider = ''}) {
  const cards = await getGeographicPublishedServiceCards(locale, {emirate, sector, city, area});
  const item = cards.find(row => row.serviceSlug === service && (!provider || row.providerSlug === provider));
  if (!item) return {notFound:true};
  if (provider) {
    const [coverage, offers] = await Promise.all([
      getGeographicServiceCoverage(item).catch(() => []),
      getGeographicPublishedServiceCards(locale, {emirate,sector,city,area,cardType:'offer'}).catch(() => []),
    ]);
    const taxonomy = new Set(item.taxonomyServices.map(row => row.slug));
    const relatedServices = cards.filter(row => row.providerSlug === item.providerSlug && row.id !== item.id).slice(0,6);
    const otherProviders = cards.filter(row => row.providerSlug !== item.providerSlug && row.taxonomyServices.some(s => taxonomy.has(s.slug))).slice(0,6);
    const otherOffers = offers.filter(row => row.providerSlug !== item.providerSlug).slice(0,6);
    return {props:{geographicService:true,item:{...item,coverage,relatedServices,otherProviders,otherOffers}},revalidate:60};
  }
  const matchedSlugs = new Set(item.taxonomyServices.map(row => row.slug));
  const matching = cards.filter(row => row.taxonomyServices.some(serviceRow => matchedSlugs.has(serviceRow.slug)));
  const path = item.href.slice(0, -(item.providerSlug.length + 1));
  return {props:{geographicServiceCollection:true,model:{item,cards:matching,locale,path}},revalidate:60};
}
