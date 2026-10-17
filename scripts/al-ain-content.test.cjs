const test = require('node:test');
const assert = require('node:assert/strict');
const { alAinContentModel } = require('../lib/alAinContentModel');
const { CONTENT } = require('../data/alAinContent');
const { pageModel, localSitemap } = require('../lib/localServices');
const provider = { id: 'test-only', slug: 'fixture', name: { ar: 'اختبار', en: 'Test' }, published: true, verified: true,
  visibility: { directory: true }, coverage: [{ emirate: 'abu-dhabi', city: 'al-ain', approved: true, areas: [] }],
  services: [{ id: 'test-card', entityId: 'test-entity', providerServiceId: 'test-service', slug: 'home-villa-cleaning', category: 'cleaning-services', published: true, provenance: 'provider_services', title: { ar: 'تنظيف', en: 'Cleaning' }, summary: { ar: 'نطاق اختبار', en: 'Test scope' } }] };
test('all sectors have distinct bilingual guidance, reciprocal paths and safe empty states', () => {
  for (const category of Object.keys(CONTENT)) for (const locale of ['ar', 'en']) {
    const model = alAinContentModel({ category, locale });
    assert.equal(model.indexable, false);
    assert.equal(model.providers.length, 0);
    assert.equal(model.schema.mainEntity.itemListElement.length, 0);
    assert.equal(model.dataStatus, 'awaiting_published_records');
    assert.ok(model.content.sections.length >= 2);
    assert.ok(model.content.checklist[locale].length >= 4);
    assert.ok(model.alternates.en.endsWith('/en/uae/abu-dhabi/al-ain/' + category));
    assert.ok(model.alternates.ar.endsWith('/uae/abu-dhabi/al-ain/' + category));
    assert.ok(model.sectorLinks.every(item => item.href.startsWith(locale === 'en' ? '/en/' : '/uae/')));
  }
  assert.equal(new Set(Object.values(CONTENT).map(item => item.intro.ar)).size, 3);
});
test('home guide works without records but cannot manufacture eligibility or sitemap entries', () => {
  const category = 'cleaning-services', service = 'home-villa-cleaning';
  const draft = alAinContentModel({ category, service });
  assert.equal(draft.indexable, false);
  assert.equal(localSitemap([]).length, 0);
  assert.equal(pageModel({ category, service }), null);
  const live = alAinContentModel({ category, service, providers: [provider] });
  assert.equal(live.indexable, true);
  assert.equal(live.schema.about['@type'], 'Service');
  for (const change of [{ verified: false }, { published: false }, { coverage: [] }, { services: [] }]) {
    const model = alAinContentModel({ category, service, providers: [{ ...provider, ...change }] });
    assert.equal(model.indexable, false);
    assert.equal(model.providers.length, 0);
  }
  const incomplete = { ...provider, services: provider.services.map(item => ({ ...item, entityId: null })) };
  assert.equal(alAinContentModel({ category, service, providers: [incomplete] }).indexable, false);
});
test('new sectors cannot cross-contaminate providers or inherit index approval', () => {
  for (const category of ['general-maintenance', 'general-contracting']) {
    assert.equal(alAinContentModel({ category, providers: [provider] }).providers.length, 0);
    const realShape = { ...provider, services: provider.services.map(item => ({ ...item, category })) };
    const model = alAinContentModel({ category, providers: [realShape] });
    assert.equal(model.providers.length, 1);
    assert.equal(model.indexable, false);
  }
});
test('unknown categories, services, prototype properties and locales cannot become pages', () => {
  for (const category of ['wrong', '__proto__', 'constructor', '../bad']) assert.equal(alAinContentModel({ category }), null);
  assert.equal(alAinContentModel({ category: 'general-contracting', service: 'villa-building' }), null);
  assert.equal(alAinContentModel({ category: 'cleaning-services', locale: 'fr' }), null);
});
