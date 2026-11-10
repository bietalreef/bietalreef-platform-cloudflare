import LocalServicesPage from '../../../../../../../components/LocalServicesPage';
import AlNaeemPresencePage from '../../../../../../../components/provider/AlNaeemPresencePage';
import {AL_NAEEM_SLUG,getGeographicNaeemContextProps} from '../../../../../../../lib/alNaeemPresence';
import GeographicServicePage from '../../../../../../../components/GeographicServicePage';
import {geographicRouteProps} from '../../../../../../../lib/geographicRouteProps';
import {UAE_MAIN_SECTORS} from '../../../../../../../data/directoryDiscovery';
export default function Page(props) {if(props.alNaeemContext)return <AlNaeemPresencePage data={props.data} locale="ar" route={props.route}/>; return props.geographicService ? <GeographicServicePage item={props.item}/> : <LocalServicesPage {...props}/>; }
import { localProps } from '../../../../../../../lib/localRouteProps';
import { districtCleaningProps } from '../../../../../../../lib/districtCleaning';
export async function getStaticProps({params}) {
  if(params.district==='cleaning-services' && params.category===AL_NAEEM_SLUG && ['services','offers','service-areas'].includes(params.service)) return {...await getGeographicNaeemContextProps('ar',{emirateSlug:'abu-dhabi',areaSlug:'al-ain',kind:params.service,slug:params.provider}),revalidate:3600};
  if (params.category === 'cleaning-services') {
    const existing = await districtCleaningProps('ar',params.district,params.service,params.provider);
    if (!existing.notFound) return existing;
  }
  if (params.category === 'general-maintenance' && params.provider === 'kawkab-al-saeed') {
    const result=await localProps('ar',[params.district,params.category,params.service]);
    if (result.props?.model?.providers?.some(p=>p.slug===params.provider)) return {props:{model:{districtKawkabService:true,locale:'ar',area:result.props.model.area,service:params.service}},revalidate:300};
  }
  if (UAE_MAIN_SECTORS.some(row=>row.slug===params.category)||['aluminium-wood-glass','factories-suppliers'].includes(params.category)) return geographicRouteProps('ar', {city:'al-ain',area:params.district,sector:params.category,service:params.service,provider:params.provider});
  return {notFound:true};
}
export function getStaticPaths() { return {paths:[],fallback:'blocking'}; }
