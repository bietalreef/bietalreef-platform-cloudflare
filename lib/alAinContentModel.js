const { CONTENT, REVIEWED_AT } = require('../data/alAinContent');
const { CITY, CATEGORY, SERVICE_INTENTS } = require('../data/localServices');
const { pageModel, localPath, alternates, eligibleProviders, DOMAIN } = require('./localServices');

// Adapter boundary: provider/service identity and publication remain in the
// existing public loader. Editorial text cannot create a company or coverage.
function alAinContentModel({ locale = 'ar', category, service, providers = [] }) {
  if (!['ar', 'en'].includes(locale) || !Object.hasOwn(CONTENT, category)) return null;
  if (service && !(category === CATEGORY.slug && service === 'home-villa-cleaning')) return null;
  const en = locale === 'en';
  let content = CONTENT[category];
  if (service) content = { ...content,
    name: { ar: 'تنظيف المنازل والفلل', en: 'Home and villa cleaning' },
    intro: { ar: 'حدد مساحة المنزل أو الفيلا وحالته والغرف والأسطح المطلوبة. قارن نطاق التنظيف العميق قبل اختيار الشركة، وأرسل الصور والمنطقة لتأكيد التغطية وتقييم العمل.', en: 'Specify the size and condition of your home or villa and the rooms and surfaces to clean. Compare deep-cleaning scopes, then share photos and your district to confirm coverage and assess the work.' },
    queries: SERVICE_INTENTS.find(item => item.slug === service).queries,
  };
  const selected = eligibleProviders(providers, { category, service });
  const base = category === CATEGORY.slug ? pageModel({ locale, category, service, providers }) : null;
  const paths = alternates({ category, service });
  const canonical = paths[locale];
  const title = `${content.name[locale]} ${en ? 'in Al Ain' : 'في العين'} | ${en ? 'Biet Alreef' : 'بيت الريف'}`;
  const description = content.intro[locale];
  // Preserve the current cleaning gate. New sectors stay noindex until their
  // actual taxonomy/channel relations have received a separate production audit.
  const indexable = base?.indexable === true;
  const schema = base?.schema || {
    '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': canonical + '#page',
    url: canonical, name: title, description, inLanguage: en ? 'en-AE' : 'ar-AE',
    about: { '@type': 'City', name: en ? CITY.nameEn : CITY.nameAr },
    mainEntity: { '@type': 'ItemList', itemListElement: selected.map((provider, i) => ({
      '@type': 'ListItem', position: i + 1, name: provider.name[locale], url: `${DOMAIN}${en ? '/en' : ''}/providers/${provider.slug}`,
    })) },
  };
  return { ...base, locale, category, service: service || null, city: CITY,
    title, description, canonical, alternates: paths, indexable,
    schema: { ...schema, name: title, description }, providers: selected,
    breadcrumbs: base?.breadcrumbs || [
      { name: en ? 'Al Ain' : 'العين', href: localPath({ locale }) },
      { name: content.name[locale], href: localPath({ locale, category, service }) },
    ],
    content, contentReviewedAt: REVIEWED_AT,
    sectorLinks: Object.entries(CONTENT).map(([slug, item]) => ({ name: item.name[locale], href: localPath({ locale, category: slug }) })),
    // No placeholder counts, ratings, prices, presence or branches.
    dataStatus: selected.length ? 'published_records' : 'awaiting_published_records',
  };
}
module.exports = { alAinContentModel };
