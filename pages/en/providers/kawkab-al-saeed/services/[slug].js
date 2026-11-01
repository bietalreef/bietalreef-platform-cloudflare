import KawkabServicePage,{kawkabServiceProps} from '../../../../../components/KawkabServicePage';
export default KawkabServicePage;
export async function getServerSideProps(ctx){return kawkabServiceProps('en',ctx.params.slug);}
