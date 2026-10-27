import RehabPresencePage from '../../components/provider/RehabPresencePage';
import { getRehabServerProps } from '../../lib/rehabPresence';

export default RehabPresencePage;
export async function getServerSideProps(context) {
  return getRehabServerProps(context, 'ar', []);
}
