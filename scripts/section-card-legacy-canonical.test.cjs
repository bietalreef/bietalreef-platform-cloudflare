const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Evaluate the existing pure route functions without loading the Next.js runtime.
const source = fs.readFileSync(path.join(__dirname, '../lib/sectionCardRoutes.js'), 'utf8');
const { getSectionCardHref, getSectionActivitySlug } = new Function(
  source.replace(/^export /gm, '') + '\nreturn { getSectionCardHref, getSectionActivitySlug };'
)();
const cases = [
  ['construction-contracting', 'general-contracting'],
  ['engineering-design', 'interior-design'],
  ['maintenance-finishing', 'general-maintenance'],
  ['aluminium-glass-wood', 'aluminium-glass'],
  ['building-materials-supply', 'building-materials'],
  ['cleaning-operations-equipment', 'cleaning-services'],
  ['factories-workshops-stores', 'equipment-rental'],
];

test('legacy activity cards point directly to the seven matching approved main sectors (AR/EN)', () => {
  for (const [legacy, current] of cases) {
    for (const section of ['providers', 'services_offers']) {
      for (const locale of ['ar', 'en']) {
        const root = section === 'providers'
          ? (locale === 'en' ? '/en/providers/specialty' : '/providers/specialty')
          : (locale === 'en' ? '/en/categories' : '/services');
        const actual = getSectionCardHref({ activity: { slug: legacy } }, section, locale);
        assert.equal(actual, root + '/' + current, [section, locale, legacy].join(':'));
        assert.equal(getSectionActivitySlug(section, current), legacy);
      }
    }
  }
});

test('published product category paths are kept separate from company and service sectors', () => {
  assert.equal(
    getSectionCardHref({ activity: { slug: 'building-materials-supply' } }, 'products_stores', 'ar'),
    '/marketplace/building-materials'
  );
  assert.equal(
    getSectionCardHref({ activity: { slug: 'building-materials-supply' } }, 'products_stores', 'en'),
    '/en/marketplace/building-materials'
  );
});
