const assert = require('node:assert/strict');
const { test } = require('node:test');
const { alAinReviewedSitemapPairs } = require('../lib/alAinReviewedSitemap.cjs');

const sectors = ['general-contracting', 'aluminium-glass', 'general-maintenance', 'cleaning-services'].map(slug => ({ slug }));
const cityModel = ({ locale, category, providers }) => {
  assert.deepEqual(providers, [], 'editorial guides do not need a published company');
  return { indexable: true, canonicalPath: `${locale === 'en' ? '/en' : ''}/uae/abu-dhabi/al-ain/${category}` };
};
const input = {
  sectors, cityModel, districts: ['al-hili'],
  districtEditorial: () => 'Reviewed local context',
  districtGuides: () => ({ a: 'one', b: 'two', c: 'three' }),
  maintenanceTaxonomy: [[{ slug: 'maintenance' }], [{ slug: 'maintenance' }]],
};

test('reviewed city and district sectors use existing bilingual routes without a provider', () => {
  const pairs = alAinReviewedSitemapPairs(input);
  assert.equal(pairs.length, 6);
  assert.ok(pairs.some(pair => pair.ar.endsWith('/al-ain/aluminium-wood-glass')));
  assert.ok(pairs.some(pair => pair.ar.endsWith('/al-hili/aluminium-glass')));
  assert.ok(pairs.every(pair => pair.en === `/en${pair.ar}`));
  assert.ok(pairs.every(pair => !pair.ar.includes('cleaning-services')), 'cleaning has a separate sitemap owner');
});

test('missing language, reviewed content, or maintenance taxonomy excludes the affected pair', () => {
  const pairs = alAinReviewedSitemapPairs({
    ...input,
    cityModel: args => ({ ...cityModel(args), indexable: !(args.category === 'general-contracting' && args.locale === 'en') }),
    districtGuides: (_district, sector, locale) => sector === 'aluminium-glass' && locale === 'en' ? {} : { a: 1, b: 2, c: 3 },
    maintenanceTaxonomy: [[], [{ slug: 'maintenance' }]],
  });
  assert.ok(!pairs.some(pair => pair.ar === '/uae/abu-dhabi/al-ain/general-contracting'));
  assert.ok(!pairs.some(pair => pair.ar.endsWith('/al-hili/aluminium-glass')));
  assert.ok(!pairs.some(pair => pair.ar.endsWith('/al-hili/general-maintenance')));
  assert.ok(pairs.some(pair => pair.ar.endsWith('/al-hili/general-contracting')));
});
