const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = fs.readFileSync('pages/preview/al-ain-responsive.js', 'utf8');
const output = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS } }).outputText;
const sandbox = { exports: {}, require: () => ({}), URLSearchParams };
vm.runInNewContext(output, sandbox);
const getProps = sandbox.exports.getServerSideProps;
test('responsive diagnostic route is unavailable on production and unrelated hosts', () => {
  for (const host of ['bietalreef.ae', 'www.bietalreef.ae', 'example.com', 'workers.dev.example.com']) {
    assert.equal(getProps({ req: { headers: { host } }, res: {}, query: {} }).notFound, true);
  }
});
test('staging preview validates frame size, locale, sector and sets noindex/no-store', () => {
  const headers = {};
  const res = { setHeader: (k, v) => { headers[k] = v; } };
  const request = query => getProps({ req: { headers: { host: 'bietalreef-platform-staging.bietalreef.workers.dev' } }, res, query });
  const safe = request({ width: '360', category: 'general-maintenance', locale: 'en', view: 'sector' });
  assert.equal(safe.props.width, 360);
  assert.equal(safe.props.locale, 'en');
  assert.equal(safe.props.category, 'general-maintenance');
  assert.ok(headers['X-Robots-Tag'].includes('noindex'));
  assert.equal(headers['Cache-Control'], 'no-store');
  const invalid = request({ width: '9999999', locale: '<script>', category: '../api', view: 'https://example.com' });
  assert.equal(invalid.props.width, 390);
  assert.equal(invalid.props.category, 'cleaning-services');
  assert.equal(invalid.props.view, 'city');
});
test('embedding exception is restricted to exact staging host and diagnostic query', async () => {
  const rules = await require('../next.config').headers();
  assert.equal(rules[0].headers.find(h => h.key === 'X-Frame-Options').value, 'DENY');
  const frameRule = rules.find(r => r.headers.some(h => h.key === 'X-Frame-Options' && h.value === 'SAMEORIGIN'));
  assert.equal(frameRule.has.find(h => h.type === 'host').value, 'bietalreef-platform-staging.bietalreef.workers.dev');
  assert.equal(frameRule.has.find(h => h.type === 'query').key, '__responsive');
  assert.equal(frameRule.has.find(h => h.type === 'query').value, '1');
  const policy = frameRule.headers.find(h => h.key === 'Content-Security-Policy').value;
  assert.ok(policy.includes("frame-ancestors 'self'"));
  assert.ok(policy.includes("object-src 'none'"));
  assert.ok(policy.includes("default-src 'self'"));
});
