import DirectoryContextCompany from '../../../components/provider/DirectoryContextCompany';
import { getCompanyContextProps } from '../../../lib/publishedCompanyPresence';
import RehabPresencePage from '../../../components/provider/RehabPresencePage';
import { getRehabContextProps, REHAB_SLUG } from '../../../lib/rehabPresence';

export default function ContextualDirectoryCompany(props) {
  return props.companyContext ? <DirectoryContextCompany {...props} /> : <RehabPresencePage {...props} />;
}

export async function getServerSideProps(context) {
  const parts = context.params?.parts || [];
  const index = parts.indexOf(REHAB_SLUG);
  if (index < 1) {
    if (parts[0] !== 'abu-dhabi' || parts.length < 2) return { notFound: true };
    return getCompanyContextProps(context, 'en', parts[1], parts.slice(2));
  }
  const basePath = '/uae/' + parts.slice(0, index).join('/');
  return getRehabContextProps(context, 'en', basePath, parts.slice(index + 1));
}
