import {getGeographicPublishedServiceCards} from './platformPublishedServiceCards';

// Keep the directory order: place / sector / service / provider.
export async function geographicRouteProps(locale, {city = '', area = '', sector, service, provider = ''}) {
  const cards = await getGeographicPublishedServiceCards(locale, {sector, city, area});
  const item = cards.find(row => row.serviceSlug === service && (!provider || row.providerSlug === provider));
  if (!item) return {notFound:true};
  if (provider) return {props:{geographicService:true,item},revalidate:60};
  const matchedSlugs = new Set(item.taxonomyServices.map(row => row.slug));
  const matching = cards.filter(row => row.taxonomyServices.some(serviceRow => matchedSlugs.has(serviceRow.slug)));
  const path = item.href.slice(0, -(item.providerSlug.length + 1));
  return {props:{geographicServiceCollection:true,model:{item,cards:matching,locale,path}},revalidate:60};
}
