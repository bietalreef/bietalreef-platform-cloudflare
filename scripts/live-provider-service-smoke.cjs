const assert = require('node:assert/strict');
const { test } = require('node:test');

const urls = [
  ['https://bietalreef.ae/providers/alrehab-home-clean/services/deep-cleaning', 'تنظيف عميق'],
  ['https://bietalreef.ae/providers/alrehab-home-clean/services/post-construction-cleaning', 'تنظيف بعد المقاولات'],
  ['https://bietalreef.ae/providers/alrehab-home-clean/services/pre-move-in-cleaning', 'تنظيف قبل السكن'],
  ['https://bietalreef.ae/providers/alrehab-home-clean/services/sofa-cleaning', 'الرحاب'],
  ['https://bietalreef.ae/providers/al-naeem-cleaning-services/services/home-villa-cleaning', 'النعيم'],
];

for (const [url, token] of urls) {
  test('Public HTML: ' + url, async () => {
    const response = await fetch(url, { headers: { 'User-Agent': 'BietAlReef-PublicPageQA/1.0' }, signal: AbortSignal.timeout(20000) });
    assert.equal(response.status, 200, 'must return HTTP 200');
    const html = await response.text();
    assert.ok(html.includes(token), 'must SSR-render expected service or company name');
    assert.ok(html.includes('tel:'), 'must include a click-to-call link');
    assert.ok(html.includes('<h1'), 'must include an SSR h1');
  });
}
