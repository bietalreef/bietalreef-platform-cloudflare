import LocalServicesPage from '../../../../../../components/LocalServicesPage';
import AlNaeemPresencePage from '../../../../../../components/provider/AlNaeemPresencePage';
import {AL_NAEEM_SLUG,getGeographicNaeemContextProps} from '../../../../../../lib/alNaeemPresence';
import GeographicServicePage from '../../../../../../components/GeographicServicePage';
import {localProps} from '../../../../../../lib/localRouteProps';
import {geographicRouteProps} from '../../../../../../lib/geographicRouteProps';
import {UAE_MAIN_SECTORS} from '../../../../../../data/directoryDiscovery';
export default function Page(props) {if(props.alNaeemContext)return <AlNaeemPresencePage data={props.data} locale="ar" route={props.route}/>;return props.geographicService ? <GeographicServicePage item={props.item}/> : <LocalServicesPage {...props}/>;}
export async function getStaticProps({params}) {
  if(params.district==='cleaning-services' && params.category===AL_NAEEM_SLUG && ['services','offers','service-areas'].includes(params.service)) return {...await getGeographicNaeemContextProps('ar',{emirateSlug:'abu-dhabi',areaSlug:'al-ain',kind:params.service}),revalidate:3600};
  if (UAE_MAIN_SECTORS.some(row => row.slug === params.district) || ['aluminium-wood-glass','factories-suppliers'].includes(params.district)) return geographicRouteProps('ar', {city:'al-ain',sector:params.district,service:params.category,provider:params.service});
  const existing = await localProps('ar', [params.district, params.category, params.service]);
  if (!existing.notFound) return existing;
  if (UAE_MAIN_SECTORS.some(row=>row.slug===params.category)||['aluminium-wood-glass','factories-suppliers'].includes(params.category)) return geographicRouteProps('ar', {city:'al-ain',area:params.district,sector:params.category,service:params.service});
  return existing;
}
export function getStaticPaths() {return {paths:[],fallback:'blocking'};}
