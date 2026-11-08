import {getLocalArea} from './localServices';
import {getGeographicPublishedServiceCards} from './platformPublishedServiceCards';
import {normalizeSector} from './geographicServiceModel.cjs';
import {UAE_MAIN_SECTORS} from '../data/directoryDiscovery';
import {directorySectorSeo} from '../data/abuDhabiSectorSeo';
import districtEditorial from '../data/alAinDistrictEditorial.json';
import {AL_AIN_DISTRICT_SECTOR_CONTEXTS} from '../data/alAinDistrictSectorContexts';
import {getSectorTaxonomy} from './sectorTaxonomyExplorer';

export async function alAinAreaSectorProps(locale,areaSlug,sectorSlug){
  const area=getLocalArea(areaSlug);
  const sector=UAE_MAIN_SECTORS.find(item=>item.slug===normalizeSector(sectorSlug));
  if(!area||!sector)return {notFound:true};
  const notes=areaSlug==='al-hili'?districtEditorial.hiliSectors[sector.slug]:AL_AIN_DISTRICT_SECTOR_CONTEXTS[areaSlug]?.[sector.slug];
  const localText=notes?.[locale]||districtEditorial.areas[areaSlug]?.[locale]||'';
  const cards=await getGeographicPublishedServiceCards(locale,{city:'al-ain',area:areaSlug,sector:sectorSlug}).catch(error=>{console.error('Unable to load Al Ain area services:',error?.message);return null;});
  const offers=await getGeographicPublishedServiceCards(locale,{city:'al-ain',area:areaSlug,sector:sectorSlug,cardType:'offer'}).catch(()=>null);
  const sectorTaxonomy=await getSectorTaxonomy(sectorSlug,locale,cards||[]).catch(()=>null);
  const seo=directorySectorSeo(sector.slug,locale,area);
  return {props:{alAinAreaSector:{locale,area,sector,sectorSlug,localText,cards,offers,seo,sectorTaxonomy}},revalidate:300};
}
