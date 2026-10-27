import PublishedCompanyPresencePage from '../../../components/provider/PublishedCompanyPresencePage';
import { getCompanyServerProps } from '../../../lib/publishedCompanyPresence';
import RehabPresencePage from '../../../components/provider/RehabPresencePage';
import AlNaeemPresencePage from '../../../components/provider/AlNaeemPresencePage';
import { getRehabServerProps, REHAB_SLUG } from '../../../lib/rehabPresence';
import { getAlNaeemProps, AL_NAEEM_SLUG } from '../../../lib/alNaeemPresence';
export default function ProviderDynamicRoute(props){
 return props.alNaeem ? <AlNaeemPresencePage {...props} /> : props.rehab ? <RehabPresencePage {...props} /> : <PublishedCompanyPresencePage {...props} />;
}
export async function getServerSideProps(context){
 const [slug,...sections]=context.params.parts||[];
 if(!slug||!sections.length)return {notFound:true};
 if(slug===AL_NAEEM_SLUG){
   const response=await getAlNaeemProps(context,'en',sections);
   return response.props?{...response,props:{...response.props,alNaeem:true}}:response;
 }
 if(slug===REHAB_SLUG){
   if(sections[0]==='coverage'&&sections.length===1)return {redirect:{destination:'/en/providers/'+slug+'/service-areas',permanent:true}};
   const response=await getRehabServerProps(context,'en',sections);
   return response.props?{...response,props:{...response.props,rehab:true}}:response;
 }
 return getCompanyServerProps(context,'en',slug,sections);
}
