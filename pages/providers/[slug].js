import AlNaeemPresencePage from '../../components/provider/AlNaeemPresencePage';
import PublishedCompanyPresencePage from '../../components/provider/PublishedCompanyPresencePage';
import { getAlNaeemProps, AL_NAEEM_SLUG } from '../../lib/alNaeemPresence';
import { getCompanyServerProps } from '../../lib/publishedCompanyPresence';

export default function PublicCompanyPage(props) {
  return props.alNaeem ? <AlNaeemPresencePage {...props} /> : <PublishedCompanyPresencePage {...props} />;
}
export async function getServerSideProps(context) {
  const slug = context.params?.slug;
  if (slug === AL_NAEEM_SLUG) {
    const r = await getAlNaeemProps(context, 'ar', []);
    return r.props ? {...r, props: {...r.props, alNaeem:true}} : r;
  }
  return getCompanyServerProps(context, 'ar', slug, []);
}
