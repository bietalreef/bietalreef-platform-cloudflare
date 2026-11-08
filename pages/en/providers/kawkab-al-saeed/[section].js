import {getPublishedPortfolio} from '../../../../lib/publishedPortfolio';
import KawkabPresencePage from '../../../../components/provider/KawkabPresencePage';
import { getKawkabPageProps } from '../../../../lib/kawkabPresence';
export default KawkabPresencePage;
export async function getServerSideProps(context) { const result=getKawkabPageProps('en',context.params.section); if(result.props) result.props.portfolioProjects=await getPublishedPortfolio('provider-3000485'); return result; }
