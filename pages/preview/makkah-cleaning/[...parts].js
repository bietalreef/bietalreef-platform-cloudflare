import MakkahDraftDetailPage from '../../../components/provider/MakkahDraftDetailPage';
import draft from '../../../data/providerTemplates/makkah-cleaning-visual-launch.draft.json';
export default MakkahDraftDetailPage;
export async function getServerSideProps({ params, res }) {
  const parts = params.parts || [];
  if (parts.length!==2 || !['services','offers'].includes(parts[0])) return {notFound:true};
  const collection = parts[0]==='services'?draft.services:draft.offers;
  if (!collection.some(entry=>entry.slug===parts[1])) return {notFound:true};
  res.setHeader('Cache-Control','private, no-store');
  res.setHeader('X-Robots-Tag','noindex,nofollow,noarchive');
  return {props:{locale:'ar',section:parts[0],slug:parts[1]}};
}
