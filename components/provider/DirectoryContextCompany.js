import PublishedCompanyPresencePage from './PublishedCompanyPresencePage';
import KawkabPresencePage from './KawkabPresencePage';
import KawkabServicePage from '../KawkabServicePage';
import KawkabProjectPage from './KawkabProjectPage';

export default function DirectoryContextCompany(props) {
 if(props.kawkabContext==='section')return <KawkabPresencePage {...props}/>;
 if(props.kawkabContext==='service')return <KawkabServicePage {...props}/>;
 if(props.kawkabContext==='project')return <KawkabProjectPage {...props}/>;
 return <PublishedCompanyPresencePage {...props}/>;
}
