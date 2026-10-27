import PublishedCompanyPresencePage from '../../components/provider/PublishedCompanyPresencePage';
import { getCompanyServerProps } from '../../lib/publishedCompanyPresence';
import RehabPresencePage from '../../components/provider/RehabPresencePage';
import { getRehabServerProps, REHAB_SLUG } from '../../lib/rehabPresence';
export default function ProviderDynamicRoute(props){
 return props.rehab ? <RehabPresencePage {...props} /> : <PublishedCompanyPresencePage {...props} />;
}
export async function getServerSideProps(context){
 const [slug,...sections]=context.params.parts||[];
 if(!slug||!sections.length)return {notFound:true};
 if(slug===REHAB_SLUG){
   if(sections[0]==='coverage'&&sections.length===1)return {redirect:{destination:'/providers/'+slug+'/service-areas',permanent:true}};
   const response=await getRehabServerProps(context,'ar',sections);
   return response.props?{...response,props:{...response.props,rehab:true}}:response;
 }
 return getCompanyServerProps(context,'ar',slug,sections);
}
