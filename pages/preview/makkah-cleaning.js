import MakkahReviewPage from '../../components/provider/MakkahReviewPage';
export default MakkahReviewPage;
export async function getServerSideProps({res}) {
  res.setHeader('Cache-Control','private, no-store');
  res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');
  return {props:{locale:'ar'}};
}
