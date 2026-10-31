const assert = require('node:assert/strict');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const ar = require('../.next/server/pages/providers/alrehab-home-clean.js').default;
const en = require('../.next/server/pages/en/providers/alrehab-home-clean.js').default;
const profile = {
  id: '471b909d-3481-4df2-a82e-739e786511d3',
  name_ar: 'الرحاب هوم كلين', name_en: 'Al Rehab Home Clean',
  short_description_ar: 'خدمات تنظيف موثقة', short_description_en: 'Verified cleaning services',
  description_ar: 'خدمات تنظيف حسب التقييم', description_en: 'Cleaning services after assessment',
  phone: '0547761290', whatsapp: '0547761290',
};
const service = { id: 'approved-platform-service', slug: 'sofa-cleaning', name_ar: 'تنظيف الكنب', name_en: 'Sofa cleaning', description_ar: 'تنظيف الأقمشة حسب حالتها', description_en: 'Cleaning according to the fabric', image: null };
const area = { id: 'approved-area', slug: 'abu-dhabi', name_ar: 'أبوظبي', name_en: 'Abu Dhabi' };
const data = { profile, services: [service], offers: [], areas: [area], projects: [], faqs: [] };

test('Bilingual company page includes real-data cards, navigation and contact in SSR HTML', () => {
  for (const [locale, page] of [['ar', ar], ['en', en]]) {
    const html = renderToStaticMarkup(React.createElement(page, { data, locale, route: { kind: 'home' } }));
    const prefix = locale === 'en' ? '/en' : '';
    assert.match(html, /<h1[^>]*>/);
    assert.ok(html.includes('href="tel:0547761290"'), 'phone CTA must be real');
    assert.ok(html.includes('href="https://wa.me/971547761290?text='), 'WhatsApp CTA must be real');
    assert.ok(html.includes(`${prefix}/providers/alrehab-home-clean/services/sofa-cleaning`));
    assert.ok(html.includes(`${prefix}/providers/alrehab-home-clean/service-areas/abu-dhabi`));
    assert.ok(!html.includes('BR-SRV-ALR-001'), 'old mock template IDs must not leak');
  }
});

test('Detail pages render the service content in server HTML, not client-only fragments', () => {
  const html = renderToStaticMarkup(React.createElement(ar, { data, locale: 'ar', route: { kind: 'services', slug: 'sofa-cleaning' } }));
  assert.ok(html.includes('تنظيف الأقمشة حسب حالتها'));
  assert.ok(html.includes('تنظيف الكنب'));
});

test('Area-specific Rehab service links keep geographic context in SSR markup (Arabic and English)', () => {
  for (const [locale, page] of [['ar', ar], ['en', en]]) {
    const areaSlug = 'abu-dhabi';
    const prefix = locale === 'en' ? '/en' : '';
    const nested = `${prefix}/providers/alrehab-home-clean/service-areas/${areaSlug}/services/sofa-cleaning`;
    const areaPage = renderToStaticMarkup(React.createElement(page, { data, locale, route: { kind: 'service-areas', slug: areaSlug } }));
    assert.ok(areaPage.includes(nested), 'service cards in area must keep the selected area');
    const servicePage = renderToStaticMarkup(React.createElement(page, { data, locale, route: { kind: 'services', slug: 'sofa-cleaning', areaSlug } }));
    assert.ok(servicePage.includes(nested), 'service page must preserve its nested canonical URL');
    assert.ok(servicePage.includes(locale === 'ar' ? 'تنظيف الكنب في أبوظبي' : 'Sofa cleaning in Abu Dhabi'), 'localized service and area should appear together');
    assert.ok(servicePage.includes(`${prefix}/providers/alrehab-home-clean/service-areas/abu-dhabi`), 'service page must link back to the area');
  }
});
