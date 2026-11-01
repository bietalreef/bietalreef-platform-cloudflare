import KawkabPresencePage from '../../../../components/provider/KawkabPresencePage';
import { getKawkabPageProps } from '../../../../lib/kawkabPresence';
export default KawkabPresencePage;
export async function getServerSideProps(context) { return getKawkabPageProps('en',context.params.section); }
