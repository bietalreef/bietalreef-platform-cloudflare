export { default } from '../../../../../../../../components/LocalServicesPage';
import { localProps } from '../../../../../../../../lib/localRouteProps';
import { districtCleaningProps } from '../../../../../../../../lib/districtCleaning';
export async function getStaticProps({params}) {
  if (params.category === 'cleaning-services') return districtCleaningProps('en',params.district,params.service,params.provider);
  if (params.category === 'general-maintenance' && params.provider === 'kawkab-al-saeed') {
    const result=await localProps('en',[params.district,params.category,params.service]);
    if (result.props?.model?.providers?.some(p=>p.slug===params.provider)) return {props:{model:{districtKawkabService:true,locale:'en',area:result.props.model.area,service:params.service}},revalidate:300};
  }
  return {notFound:true};
}
export function getStaticPaths() { return {paths:[],fallback:'blocking'}; }
