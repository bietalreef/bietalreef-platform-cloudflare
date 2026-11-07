import LocalServicesPage from '../../../../../../../components/LocalServicesPage';
import GeographicServicePage from '../../../../../../../components/GeographicServicePage';
import {localProps} from '../../../../../../../lib/localRouteProps';
import {geographicRouteProps} from '../../../../../../../lib/geographicRouteProps';
import {UAE_MAIN_SECTORS} from '../../../../../../../data/directoryDiscovery';
export default function Page(props) {return props.geographicService ? <GeographicServicePage item={props.item}/> : <LocalServicesPage {...props}/>;}
export async function getStaticProps({params}) {
  if (UAE_MAIN_SECTORS.some(row => row.slug === params.district) || ['aluminium-wood-glass','factories-suppliers'].includes(params.district)) return geographicRouteProps('en', {city:'al-ain',sector:params.district,service:params.category,provider:params.service});
  const existing = await localProps('en', [params.district, params.category, params.service]);
  if (!existing.notFound) return existing;
  if (UAE_MAIN_SECTORS.some(row=>row.slug===params.category)||['aluminium-wood-glass','factories-suppliers'].includes(params.category)) return geographicRouteProps('en', {city:'al-ain',area:params.district,sector:params.category,service:params.service});
  return existing;
}
export function getStaticPaths() {return {paths:[],fallback:'blocking'};}
