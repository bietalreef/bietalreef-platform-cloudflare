import Head from 'next/head';

const WIDTHS = [360, 390, 768, 1024, 1440];
const CATEGORIES = ['cleaning-services', 'general-maintenance', 'general-contracting'];
// Read-only staging QA surface. Never available on the production domain.
export default function ResponsivePreview({ width, locale, category, view }) {
  const base = locale === 'en' ? '/en' : '';
  const src = view === 'sector' ? `${base}/${locale === 'en' ? 'categories' : 'services'}/${category}` : `${base}/uae/abu-dhabi/al-ain/${category}`;
  const query = new URLSearchParams({ locale, category, view });
  return <><Head><title>Al Ain responsive QA</title><meta name="robots" content="noindex,nofollow,noarchive" /></Head>
    <main style={{ margin: 0, padding: 16, background: '#e5e9e5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav aria-label="Preview widths" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>{WIDTHS.map(value => <a key={value} href={`?${query}&width=${value}`} aria-current={width === value ? 'page' : undefined}>{value}px</a>)}</nav>
      <div style={{ overflow: 'auto', maxWidth: '100%' }}><iframe title={`${locale} ${category} ${width}px`} src={src} width={width} height={1050} style={{ display: 'block', border: '1px solid #abb9ab', background: 'white', marginInline: 'auto', maxWidth: 'none' }} /></div>
    </main></>;
}
export function getServerSideProps({ req, res, query }) {
  const host = (req.headers.host || '').split(':')[0];
  if (!host.endsWith('.workers.dev') && !['127.0.0.1', 'localhost'].includes(host)) return { notFound: true };
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.setHeader('Cache-Control', 'no-store');
  const width = Number(query.width);
  return { props: { width: WIDTHS.includes(width) ? width : 390, locale: query.locale === 'en' ? 'en' : 'ar', category: CATEGORIES.includes(query.category) ? query.category : CATEGORIES[0], view: query.view === 'sector' ? 'sector' : 'city' } };
}
