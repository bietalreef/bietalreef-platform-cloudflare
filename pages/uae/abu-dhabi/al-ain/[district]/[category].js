import LocalServicesPage from '../../../../../components/LocalServicesPage';
import AlNaeemPresencePage from '../../../../../components/provider/AlNaeemPresencePage';
import {AL_NAEEM_SLUG,getGeographicNaeemContextProps} from '../../../../../lib/alNaeemPresence';
import GeographicServiceDirectoryPage from '../../../../../components/GeographicServiceDirectoryPage';
import {localProps} from '../../../../../lib/localRouteProps';
import {geographicRouteProps} from '../../../../../lib/geographicRouteProps';
import {UAE_MAIN_SECTORS} from '../../../../../data/directoryDiscovery';
import AlAinAreaSectorPage from '../../../../../components/AlAinAreaSectorPage';
import {alAinAreaSectorProps} from '../../../../../lib/alAinAreaSectorProps';
import {getLocalArea} from '../../../../../lib/localServices';
export default function Page(props) {if(props.alNaeemContext)return <AlNaeemPresencePage data={props.data} locale="ar" route={props.route}/>;if(props.alAinAreaSector) return <AlAinAreaSectorPage model={props.alAinAreaSector}/>; return props.geographicServiceCollection ? <GeographicServiceDirectoryPage model={props.model}/> : <LocalServicesPage {...props}/>;}
export async function getStaticProps({params}) {
  if(params.district==='cleaning-services' && params.category===AL_NAEEM_SLUG) return {...await getGeographicNaeemContextProps('ar',{emirateSlug:'abu-dhabi',areaSlug:'al-ain'}),revalidate:3600};
  const existing = await localProps('ar', [params.district, params.category]);
  if (!existing.notFound) return existing;
  if (getLocalArea(params.district) && (UAE_MAIN_SECTORS.some(row=>row.slug===params.category)||['aluminium-wood-glass','factories-suppliers'].includes(params.category))) return alAinAreaSectorProps('ar',params.district,params.category);
  if (UAE_MAIN_SECTORS.some(row => row.slug === params.district) || ['aluminium-wood-glass','factories-suppliers'].includes(params.district)) return geographicRouteProps('ar', {city:'al-ain',sector:params.district,service:params.category});
  return existing;
}
export function getStaticPaths() {return {paths:[],fallback:'blocking'};}
