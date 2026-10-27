import AlNaeemPresencePage from '../../../components/provider/AlNaeemPresencePage';
import { getAlNaeemProps } from '../../../lib/alNaeemPresence';

export default AlNaeemPresencePage;
export async function getServerSideProps(context) {
  return getAlNaeemProps(context, 'en', []);
}
