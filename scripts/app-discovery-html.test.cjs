const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const read = path => fs.readFileSync(`.next/server/pages/${path}.html`, 'utf8');
for (const locale of ['', 'en/']) {
  for (const edition of ['app', 'android', 'web-app', 'ios']) {
    test(`${locale}${edition}: HTML, canonical, language alternatives and launch status`, () => {
      const html = read(`${locale}${edition}`);
      assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
      assert.ok(html.includes(`href="https://bietalreef.ae/${locale}${edition}"`));
      for (const lang of ['ar-AE', 'en-AE', 'x-default']) assert.ok(html.includes(`hrefLang="${lang}"`) || html.includes(`hreflang="${lang}"`));
      assert.ok(html.includes(`https://bietalreef.ae/en/${edition}`));
      assert.ok(html.includes(`https://bietalreef.ae/${edition}`));
      assert.ok(!html.includes('apps.apple.com'));
      if (edition === 'ios') {
        assert.ok(html.includes('content="noindex, follow"'));
        assert.ok(!html.includes('"@type":"SoftwareApplication"'));
      }
      if (edition === 'android') {
        assert.ok(html.includes('"installUrl":"https://play.google.com/store/apps/details?id=ae.bietalreef.app"'));
      }
      if (edition === 'app') for (const route of ['android', 'web-app', 'ios']) assert.ok(html.includes(`href="/${locale}${route}"`));
    });
  }
}
test('home customer cards expose concrete destinations in HTML', () => {
  const ar = read('index');
  const en = read('en');
  assert.ok(ar.includes('اختر موقع الخدمة'));
  assert.ok(ar.includes('استعرض الشركات'));
  assert.ok(!ar.includes('قابل للنمو'));
  assert.ok(!ar.includes('هوية عربية'));
  assert.ok(en.includes('Choose a service location'));
  assert.ok(en.includes('Explore businesses'));
});
