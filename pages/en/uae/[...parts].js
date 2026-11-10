import DirectoryContextCompany from '../../../components/provider/DirectoryContextCompany';
import { getCompanyContextProps } from '../../../lib/publishedCompanyPresence';
import RehabPresencePage from '../../../components/provider/RehabPresencePage';
import { getRehabContextProps, REHAB_SLUG } from '../../../lib/rehabPresence';
import GeographicServicePage from '../../../components/GeographicServicePage';
import GeographicServiceDirectoryPage from '../../../components/GeographicServiceDirectoryPage';
import {getArea} from '../../../data/siteTaxonomy';
import {abuDhabiAreaCompanyProps} from '../../../lib/abuDhabiAreaCompanyContext';
import {geographicAreaCompanyProps} from '../../../lib/geographicCompanyContext';
import {UAE_MAIN_SECTORS} from '../../../data/directoryDiscovery';
import { geographicRouteProps } from '../../../lib/geographicRouteProps';
import {alNaeemDirectoryRedirect} from '../../../lib/alNaeemLocalSeo';

export default function ContextualDirectoryCompany(props) {
  if (props.geographicService) return <GeographicServicePage item={props.item} />;
  if (props.geographicServiceCollection) return <GeographicServiceDirectoryPage model={props.model} />;
  return props.companyContext ? <DirectoryContextCompany {...props} /> : <RehabPresencePage {...props} />;
}

export async function getServerSideProps(context) {
  const parts = context.params?.parts || [];
  const naeemDestination=alNaeemDirectoryRedirect(parts,'en');
  if(naeemDestination)return {redirect:{destination:naeemDestination,permanent:true}};
  if (['abu-dhabi','dubai'].includes(parts[0])) {
    const sectorSet = new Set(UAE_MAIN_SECTORS.map(item => item.slug));
    let args = null;
    if (parts.length === 4 && sectorSet.has(parts[1])) args = {emirate:parts[0],sector:parts[1],service:parts[2],provider:parts[3]};
    if ((parts.length === 4 || parts.length === 5) && getArea(parts[0], parts[1]) && sectorSet.has(parts[2])) args = {emirate:parts[0],area:parts[1],sector:parts[2],service:parts[3],provider:parts[4] || ''};
    if (args) {
      const result = await geographicRouteProps('en', args);
      if (result.props) { const {revalidate, ...serverResult} = result; return serverResult; }
    }
  }
  if (parts[0] === 'abu-dhabi' && parts.length >= 4 && getArea('abu-dhabi',parts[1]) && !UAE_MAIN_SECTORS.some(item=>item.slug===parts[2])) {
    const result = await abuDhabiAreaCompanyProps('en',parts[1],parts[2],parts.slice(3));
    if (result.props) { const {revalidate,...serverResult}=result; return serverResult; }
    return result;
  }
  if (parts[0] === 'dubai' && parts.length >= 4 && getArea('dubai',parts[1]) && !UAE_MAIN_SECTORS.some(item=>item.slug===parts[2])) {
    const result=await geographicAreaCompanyProps('en','dubai',parts[1],parts[2],parts.slice(3));
    if(result.props){const {revalidate,...serverResult}=result;return serverResult;}
    return result;
  }
  const index = parts.indexOf(REHAB_SLUG);
  if (index < 1) {
    if (parts[0] !== 'abu-dhabi' || parts.length < 2) return { notFound: true };
    return getCompanyContextProps(context, 'en', parts[1], parts.slice(2));
  }
  const basePath = '/uae/' + parts.slice(0, index).join('/');
  return getRehabContextProps(context, 'en', basePath, parts.slice(index + 1));
}
