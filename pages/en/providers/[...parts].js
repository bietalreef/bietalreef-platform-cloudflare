import RehabPresencePage from '../../../components/provider/RehabPresencePage';
import { getRehabServerProps, REHAB_SLUG } from '../../../lib/rehabPresence';

export default RehabPresencePage;
export async function getServerSideProps(context) {
  const [slug, ...sections] = context.params.parts || [];
  if (slug !== REHAB_SLUG || !sections.length) return { notFound: true };
  if (sections[0] === 'coverage' && sections.length === 1) {
    return { redirect: { destination: `/en/providers/${slug}/service-areas`, permanent: true } };
  }
  return getRehabServerProps(context, 'en', sections);
}
