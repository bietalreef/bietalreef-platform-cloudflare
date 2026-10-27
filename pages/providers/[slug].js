import PublishedCompanyPresencePage from '../../components/provider/PublishedCompanyPresencePage';
import { getCompanyServerProps } from '../../lib/publishedCompanyPresence';
export default PublishedCompanyPresencePage;
export async function getServerSideProps(context){
 return getCompanyServerProps(context,'ar',context.params.slug,[]);
}
