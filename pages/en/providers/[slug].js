import PublishedCompanyPresencePage from '../../../components/provider/PublishedCompanyPresencePage';
import RehabPresencePage from '../../../components/provider/RehabPresencePage';
import { getRehabServerProps, REHAB_SLUG } from '../../../lib/rehabPresence';
import { getCompanyServerProps } from '../../../lib/publishedCompanyPresence';
export default function ProviderLandingPage(props) {
  return props.rehab ? <RehabPresencePage {...props}/> : <PublishedCompanyPresencePage {...props}/>;
}
export async function getServerSideProps(context) {
  if(context.params.slug===REHAB_SLUG){
    const response=await getRehabServerProps(context,'en',[]);
    return response.props?{...response,props:{...response.props,rehab:true}}:response;
  }
  return getCompanyServerProps(context,'en',context.params.slug,[]);
}
