import AlNaeemPresencePage from '../../components/provider/AlNaeemPresencePage';
import { getAlNaeemProps, AL_NAEEM_SLUG } from '../../lib/alNaeemPresence';

export default AlNaeemPresencePage;
export async function getServerSideProps(context) {
  if (context.params?.slug !== AL_NAEEM_SLUG) return { notFound: true };
  return getAlNaeemProps(context, 'ar', []);
}
