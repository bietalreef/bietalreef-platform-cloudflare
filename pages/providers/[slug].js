export default function UnpublishedListing() { return null; }
export async function getServerSideProps() { return { notFound: true }; }
